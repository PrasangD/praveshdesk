"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { cities, type CitySlug } from "@/lib/cities";
import {
  AREA_OPTIONS,
  HOURS_OPTIONS,
  KIND_OPTIONS,
  ROLE_OPTIONS,
  SIZE_OPTIONS,
  type Area,
  type CalculatorSnapshot,
  type RequestSource,
} from "@/lib/request-options";
import { site, whatsappLink } from "@/lib/site";
import { Turnstile } from "./Turnstile";
import { readAttribution } from "./UtmCapture";

const ENDPOINT = process.env.NEXT_PUBLIC_LEADS_ENDPOINT ?? "";
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

function newRequestId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Quick checks in the browser; the Apps Script repeats them before saving. */
function checkFields(p: { name: string; organisation: string; city: string; phone: string; email: string; consent: boolean }) {
  const errors: Record<string, string> = {};
  if (p.name.length < 2) errors.name = "Enter your name";
  if (p.organisation.length < 2) errors.organisation = "Enter your organisation's name";
  if (!p.city) errors.city = "Choose where you are";
  let digits = p.phone.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  if (!/^[6-9]\d{9}$/.test(digits)) errors.phone = "Enter a 10-digit mobile number";
  if (p.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) errors.email = "Enter a valid email, or leave it blank";
  if (!p.consent) errors.consent = "Tick the box so I can reply to you";
  return errors;
}

type Props = {
  source: RequestSource;
  defaultCity?: CitySlug;
  calculator?: CalculatorSnapshot;
  submitLabel?: string;
  showPreferredTime?: boolean;
  id?: string;
  /** Pages about a specific job ask for the job itself, not "anything else". */
  messageLabel?: React.ReactNode;
  messageHint?: string;
  defaultArea?: Area;
};

type Status = "idle" | "sending" | "error";

export function RequestForm({
  source,
  defaultCity,
  calculator,
  submitLabel = "Send my request",
  showPreferredTime = true,
  id = "request-form",
  messageLabel,
  messageHint,
  defaultArea,
}: Props) {
  const router = useRouter();
  const startedAt = useRef(Date.now());
  // Same ID across retries, so a request that reached the Sheet but lost its
  // response is not saved twice (the Apps Script skips IDs it has seen).
  const requestId = useRef(newRequestId());
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [token, setToken] = useState("");
  const [resetSignal, setResetSignal] = useState(0);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrors({});
    setFormError("");

    const fd = new FormData(e.currentTarget);
    const text = (k: string) => String(fd.get(k) ?? "").trim();
    const attribution = readAttribution();

    const payload = {
      id: requestId.current,
      name: text("name"),
      kind: text("kind") || "company",
      role: text("role") || "owner",
      organisation: text("organisation"),
      city: text("city"),
      phone: text("phone"),
      email: text("email"),
      size: text("size") || "not-sure",
      hours: text("hours") || "not-sure",
      area: text("area") || "not-sure",
      preferredTime: text("preferredTime"),
      message: text("message"),
      consent: fd.get("consent") === "on",
      source,
      pagePath: window.location.pathname,
      referrer: attribution?.referrer ?? "",
      utm: attribution?.utm,
      calculator,
      website: text("website"),
      startedAt: startedAt.current,
      turnstileToken: token,
    };

    const fail = (message: string, fieldErrs: Record<string, string> = {}) => {
      setErrors(fieldErrs);
      setFormError(message);
      setStatus("error");
    };
    const goToThanks = () => {
      const first = payload.name.split(/\s+/)[0] ?? "";
      router.push(`/thank-you?name=${encodeURIComponent(first)}`);
    };

    const localErrors = checkFields(payload);
    if (Object.keys(localErrors).length) return fail("Check the highlighted fields.", localErrors);
    if (TURNSTILE_SITE_KEY && !token) {
      return fail("The spam check is still running. Wait a moment, then press the button again.");
    }

    if (!ENDPOINT) {
      if (process.env.NODE_ENV === "development") {
        console.info("[request] NEXT_PUBLIC_LEADS_ENDPOINT is empty; this was not sent:", payload);
        return goToThanks();
      }
      return fail("The form is not connected yet.");
    }

    try {
      // text/plain keeps this a "simple" request, so the browser sends it straight
      // to Apps Script without a CORS preflight (which Apps Script can't answer).
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
        errors?: Record<string, string>;
      };
      if (data.ok) return goToThanks();
      setToken("");
      setResetSignal((n) => n + 1); // a Turnstile token works only once
      fail(data.message ?? "Your request could not be sent.", data.errors ?? {});
    } catch {
      fail("Your request could not be sent. Check your connection and try again.");
    }
  }

  const err = (name: string) =>
    errors[name] ? { "aria-invalid": true as const, "aria-describedby": `${id}-${name}-error` } : {};
  const errorText = (name: string) =>
    errors[name] ? (
      <p id={`${id}-${name}-error`} className="field-error">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form id={id} onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor={`${id}-name`} className="field-label">Your name</label>
        <input id={`${id}-name`} name="name" className="field" autoComplete="name" required maxLength={80} {...err("name")} />
        {errorText("name")}
      </div>

      <div>
        <label htmlFor={`${id}-phone`} className="field-label">Mobile number</label>
        <input
          id={`${id}-phone`}
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="98765 43210"
          className="field"
          required
          maxLength={16}
          {...err("phone")}
        />
        {errorText("phone")}
      </div>

      <div>
        <label htmlFor={`${id}-organisation`} className="field-label">Company or institute</label>
        <input
          id={`${id}-organisation`}
          name="organisation"
          className="field"
          autoComplete="organization"
          required
          maxLength={120}
          {...err("organisation")}
        />
        {errorText("organisation")}
      </div>

      <div>
        <label htmlFor={`${id}-city`} className="field-label">Where you are</label>
        <select id={`${id}-city`} name="city" className="field" required defaultValue={defaultCity ?? ""} {...err("city")}>
          <option value="" disabled>Choose an area</option>
          {cities.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
          <option value="other">Somewhere else</option>
        </select>
        {errorText("city")}
      </div>

      <div>
        <label htmlFor={`${id}-kind`} className="field-label">You are</label>
        <select id={`${id}-kind`} name="kind" className="field" defaultValue="company">
          {KIND_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${id}-role`} className="field-label">Your role</label>
        <select id={`${id}-role`} name="role" className="field" defaultValue="owner">
          {ROLE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${id}-size`} className="field-label">How many people</label>
        <select id={`${id}-size`} name="size" className="field" defaultValue="not-sure">
          {SIZE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${id}-hours`} className="field-label">Time the job takes now</label>
        <select id={`${id}-hours`} name="hours" className="field" defaultValue="not-sure">
          {HOURS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor={`${id}-area`} className="field-label">What would you like automated first?</label>
        <select id={`${id}-area`} name="area" className="field" defaultValue={defaultArea ?? "not-sure"}>
          {AREA_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <p className="field-hint mt-1">
          Anything on this list, or something that is not on it. Ask, and you will get a straight answer about whether
          it can be built.
        </p>
      </div>

      <div>
        <label htmlFor={`${id}-email`} className="field-label">
          Email <span className="font-normal text-muted">(optional)</span>
        </label>
        <input id={`${id}-email`} name="email" type="email" autoComplete="email" className="field" maxLength={120} {...err("email")} />
        {errorText("email")}
      </div>

      {showPreferredTime && (
        <div>
          <label htmlFor={`${id}-time`} className="field-label">
            Best time to call <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id={`${id}-time`} name="preferredTime" className="field" placeholder="e.g. weekdays after 7 pm" maxLength={80} />
        </div>
      )}

      <div className="sm:col-span-2">
        <label htmlFor={`${id}-message`} className="field-label">
          {messageLabel ?? (
            <>
              Describe the job <span className="font-normal text-muted">(optional, but it helps)</span>
            </>
          )}
        </label>
        {messageHint && <p className="field-hint mb-1">{messageHint}</p>}
        <textarea id={`${id}-message`} name="message" rows={messageHint ? 5 : 3} maxLength={1000} className="field min-h-24" />
      </div>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-base">
          <input type="checkbox" name="consent" required className="mt-1 h-5 w-5 shrink-0 accent-ink" {...err("consent")} />
          <span>
            {site.founderName} may call, email or WhatsApp me about this request. My details are used only for this, as
            described in the <a href="/privacy" className="text-ink underline">privacy policy</a>.
          </span>
        </label>
        {errorText("consent")}
      </div>

      {TURNSTILE_SITE_KEY && (
        <div className="sm:col-span-2">
          <Turnstile siteKey={TURNSTILE_SITE_KEY} onToken={setToken} resetSignal={resetSignal} />
        </div>
      )}

      <div className="sm:col-span-2">
        {formError && (
          <div role="alert" className="mb-4 rounded-md border border-margin/40 bg-margin/5 p-3 text-base text-ink-deep">
            {formError}{" "}
            <a className="font-semibold text-ink underline" href={whatsappLink("Hi, I tried to send a request on the website.")}>
              Message me on WhatsApp
            </a>
          </div>
        )}
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : submitLabel}
        </button>
        <p className="mt-3 text-sm text-muted">{site.replyPromise} No mailing list, no follow-up you did not ask for.</p>
      </div>
    </form>
  );
}
