"use client";

import { useId, useMemo, useState } from "react";
import type { CalculatorSnapshot } from "@/lib/lead-options";
import { inr } from "@/lib/pricing";
import { LeadForm } from "./LeadForm";

function Slider({
  label,
  hint,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: {
  label: string;
  hint?: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
}) {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="field-label mb-0">{label}</label>
        <output htmlFor={id} className="text-xl font-extrabold text-ink tabular-nums">{format(value)}</output>
      </div>
      {hint && <p className="field-hint">{hint}</p>}
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-ink"
      />
    </div>
  );
}

export function LeakCalculator() {
  const [enquiries, setEnquiries] = useState(40);
  const [followUp, setFollowUp] = useState(70);
  const [join, setJoin] = useState(20);
  const [fee, setFee] = useState(30000);

  const result = useMemo(() => {
    const missedPerMonth = Math.round(enquiries * (1 - followUp / 100));
    const admissionsPerMonth = (missedPerMonth * join) / 100;
    const yearlyValue = Math.round(admissionsPerMonth * 12 * fee);
    return { missedPerMonth, admissionsPerMonth, yearlyValue, cautious: Math.round(yearlyValue / 4) };
  }, [enquiries, followUp, join, fee]);

  const snapshot: CalculatorSnapshot = {
    enquiriesPerMonth: enquiries,
    followUpRate: followUp,
    joinRate: join,
    averageFee: fee,
    missedPerMonth: result.missedPerMonth,
    yearlyValue: result.yearlyValue,
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
      <div className="space-y-7">
        <Slider
          label="Enquiries in an average month"
          hint="Walk-ins, calls, WhatsApp and ads together."
          value={enquiries}
          onChange={setEnquiries}
          min={5}
          max={300}
          step={5}
          format={(v) => String(v)}
        />
        <Slider
          label="Enquiries that get a proper follow-up"
          hint="At least one call back after the first conversation."
          value={followUp}
          onChange={setFollowUp}
          min={0}
          max={100}
          step={5}
          format={(v) => `${v}%`}
        />
        <Slider
          label="Followed-up enquiries that join"
          hint="Your usual conversion when someone does call back."
          value={join}
          onChange={setJoin}
          min={5}
          max={60}
          step={5}
          format={(v) => `${v}%`}
        />
        <div>
          <label htmlFor="calc-fee" className="field-label">Average fee per student per year</label>
          <div className="relative mt-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink">₹</span>
            <input
              id="calc-fee"
              type="number"
              inputMode="numeric"
              min={1000}
              max={500000}
              step={1000}
              value={fee}
              onChange={(e) => setFee(Math.max(0, Number(e.target.value) || 0))}
              className="field pl-7 tabular-nums"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="ruled margin-line rounded-md border border-rule py-[var(--line-register)] pl-[4.5rem] pr-5 leading-[var(--line-register)]" aria-live="polite">
          <p className="text-lg text-ink-deep">
            About <strong className="tabular-nums">{result.missedPerMonth}</strong> enquiries a month don&apos;t get a
            proper follow-up.
          </p>
          <p className="text-lg text-ink-deep">
            If they joined at your usual rate, that is about{" "}
            <strong className="tabular-nums">{result.admissionsPerMonth.toFixed(1)}</strong> more admissions a month, or{" "}
            <strong className="bg-highlight px-1 tabular-nums">{inr(result.yearlyValue)}</strong> in fees over a year.
          </p>
          <p className="text-lg text-ink-deep">
            Even if only a quarter of that is real: <strong className="tabular-nums">{inr(result.cautious)}</strong>.
          </p>
        </div>
        <p className="mt-3 text-sm text-muted">
          This uses only the numbers you enter. It is an estimate, not a promise, and it assumes enquiries you miss
          would join at the same rate as the ones you call back.
        </p>

        <div className="mt-10 border-t border-rule pt-8">
          <h2 className="text-2xl font-bold">Get a free follow-up check</h2>
          <p className="mt-2 max-w-prose">
            We will look at how enquiries move through your institute today and show you where they slip. Your
            calculator numbers are sent with the form.
          </p>
          <div className="mt-6">
            <LeadForm source="calculator" calculator={snapshot} submitLabel="Request my free check" showPreferredTime id="calc-form" />
          </div>
        </div>
      </div>
    </div>
  );
}
