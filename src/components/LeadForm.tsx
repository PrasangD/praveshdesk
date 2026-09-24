"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { cities, type CitySlug } from "@/lib/cities";
import {
  ENQUIRY_OPTIONS,
  METHOD_OPTIONS,
  ROLE_OPTIONS,
  STUDENT_OPTIONS,
  type CalculatorSnapshot,
  type LeadSource,
} from "@/lib/lead-options";
import { site, whatsappLink } from "@/lib/site";
import { Turnstile } from "./Turnstile";
import { readAttribution } from "./UtmCapture";

const ENDPOINT = process.env.NEXT_PUBLIC_LEADS_ENDPOINT ?? "";
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

function newLeadId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Quick checks in the browser; the Apps Script repeats them before saving. */
function checkFields(p: { name: string; institute: string; city: string; phone: string; email: string; consent: boolean }) {
  const errors: Record<string, string> = {};
  if (p.name.length < 2) errors.name = "Enter your name";
  if (p.institute.length < 2) errors.institute = "Enter your institute's name";
  if (!p.city) errors.city = "Choose your area";
  let digits = p.phone.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  if (!/^[6-9]\d{9}$/.test(digits)) errors.phone = "Enter a 10-digit mobile number";
  if (p.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) errors.email = "Enter a valid email, or leave it blank";
  if (!p.consent) errors.consent = "Tick the box so we can contact you about your request";
  return errors;
}

type Props = {
  source: LeadSource;
  defaultCity?: CitySlug;
  calculator?: CalculatorSnapshot;
  submitLabel?: string;
  showPreferredTime?: boolean;
  id?: string;
};

type Status = "idle" | "sending" | "error";

export function LeadForm({
  source,
  defaultCity,
  calculator,
  submitLabel = "Book my free demo",
  showPreferredTime = true,
  id = "lead-form",
}: Props) {
  const router = useRouter();
  const startedAt = useRef(Date.now());
  // Same ID across retries, so a request that reached the Sheet but lost its
  // response is not saved twice (the Apps Script skips IDs it has seen).
  const leadId = useRef(newLeadId());
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
      id: leadId.current,
      name: text("name"),
      role: text("role") || "owner",
      institute: text("institute"),
      city: text("city"),
      phone: text("phone"),
      email: text("email"),
      students: text("students") || "not-sure",
      enquiries: text("enquiries") || "not-sure",
      method: text("method"),
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
        console.info("[lead] NEXT_PUBLIC_LEADS_ENDPOINT is empty; this lead was not sent:", payload);
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
    errors[name]
      ? { "aria-invalid": true as const, "aria-describedby": `${id}-${name}-error` }
      : {};
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
        <label htmlFor={`${id}-institute`} className="field-label">Institute name</label>
        <input id={`${id}-institute`} name="institute" className="field" autoComplete="organization" required maxLength={120} {...err("institute")} />
        {errorText("institute")}
      </div>

      <div>
        <label htmlFor={`${id}-city`} className="field-label">Area</label>
        <select id={`${id}-city`} name="city" className="field" required defaultValue={defaultCity ?? ""} {...err("city")}>
          <option value="" disabled>Choose your area</option>
          {cities.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
          <option value="other">Somewhere else</option>
        </select>
        {errorText("city")}
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
        <label htmlFor={`${id}-students`} className="field-label">Students at your institute</label>
        <select id={`${id}-students`} name="students" className="field" defaultValue="not-sure">
          {STUDENT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${id}-enquiries`} className="field-label">Enquiries in a busy month</label>
        <select id={`${id}-enquiries`} name="enquiries" className="field" defaultValue="not-sure">
          {ENQUIRY_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${id}-method`} className="field-label">Where you note enquiries today</label>
        <select id={`${id}-method`} name="method" className="field" defaultValue="">
          <option value="">Choose one (optional)</option>
          {METHOD_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
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
          Anything we should know? <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea id={`${id}-message`} name="message" rows={3} maxLength={1000} className="field min-h-24" />
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
            {site.name} may call or WhatsApp me about this request. My details are used only for this, as described in the{" "}
            <a href="/privacy" className="text-ink underline">privacy policy</a>.
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
            <a className="font-semibold text-ink underline" href={whatsappLink(`Hi, I tried to book a ${site.name} demo on the website.`)}>
              Message us on WhatsApp
            </a>
          </div>
        )}
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : submitLabel}
        </button>
        <p className="mt-3 text-sm text-muted">{site.replyPromise} No spam, no sales calls you did not ask for.</p>
      </div>
    </form>
  );
}
