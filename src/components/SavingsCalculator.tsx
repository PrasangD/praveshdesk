"use client";

import { useId, useMemo, useState } from "react";
import { inr } from "@/lib/pricing";
import type { CalculatorSnapshot } from "@/lib/request-options";
import { AUTOMATED_SHARE, computeSavings, verdict } from "@/lib/savings";
import { RequestForm } from "./RequestForm";

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

export function SavingsCalculator() {
  const [hoursPerWeek, setHoursPerWeek] = useState(6);
  const [people, setPeople] = useState(2);
  const [monthlySalary, setMonthlySalary] = useState(35000);
  const [buildCost, setBuildCost] = useState(30000);

  const result = useMemo(
    () => computeSavings({ hoursPerWeek, people, monthlySalary, buildCost }),
    [hoursPerWeek, people, monthlySalary, buildCost],
  );

  const snapshot: CalculatorSnapshot = {
    hoursPerWeek,
    people,
    monthlySalary,
    buildCost,
    hoursPerYear: Math.round(result.hoursPerYear),
    yearlyCost: Math.round(result.yearlyCost),
    paybackMonths: result.paybackMonths === null ? null : Math.round(result.paybackMonths * 10) / 10,
  };

  const payback = result.paybackMonths;

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
      <div className="space-y-7">
        <Slider
          label="Hours the job takes each week"
          hint="Across everyone who touches it, including the checking and the chasing."
          value={hoursPerWeek}
          onChange={setHoursPerWeek}
          min={1}
          max={60}
          step={1}
          format={(v) => `${v} h`}
        />
        <Slider
          label="People involved"
          hint="Anyone who does part of it, approves it, or fixes it afterwards."
          value={people}
          onChange={setPeople}
          min={1}
          max={20}
          step={1}
          format={(v) => String(v)}
        />
        <div>
          <label htmlFor="calc-salary" className="field-label">Average monthly cost of one of those people</label>
          <p className="field-hint">Salary plus whatever you add on top. A rough figure is fine.</p>
          <div className="relative mt-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink">₹</span>
            <input
              id="calc-salary"
              type="number"
              inputMode="numeric"
              min={5000}
              max={1000000}
              step={5000}
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(Math.max(0, Number(e.target.value) || 0))}
              className="field pl-7 tabular-nums"
            />
          </div>
        </div>
        <div>
          <label htmlFor="calc-build" className="field-label">What the automation would cost to build</label>
          <p className="field-hint">
            A quick win is usually {inr(18000)} to {inr(45000)}. Start there and adjust once you have a quote.
          </p>
          <div className="relative mt-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink">₹</span>
            <input
              id="calc-build"
              type="number"
              inputMode="numeric"
              min={0}
              max={5000000}
              step={5000}
              value={buildCost}
              onChange={(e) => setBuildCost(Math.max(0, Number(e.target.value) || 0))}
              className="field pl-7 tabular-nums"
            />
          </div>
        </div>
      </div>

      <div>
        <div
          className="rounded-md border-2 border-ink bg-white p-6"
          aria-live="polite"
        >
          <dl className="divide-y divide-rule">
            <div className="flex items-baseline justify-between gap-4 pb-3">
              <dt className="text-lg">Time spent on it a year</dt>
              <dd className="text-2xl font-extrabold tabular-nums text-ink-deep">
                {Math.round(result.hoursPerYear).toLocaleString("en-IN")} hours
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 py-3">
              <dt className="text-lg">Which is</dt>
              <dd className="text-xl font-bold tabular-nums text-ink-deep">
                {Math.round(result.daysPerYear).toLocaleString("en-IN")} working days
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 py-3">
              <dt className="text-lg">What those hours cost you a year</dt>
              <dd className="text-2xl font-extrabold tabular-nums text-ink-deep">
                <span className="bg-highlight px-1">{inr(Math.round(result.yearlyCost))}</span>
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 py-3">
              <dt className="text-lg">
                Realistically recovered
                <span className="block text-base text-muted">Assuming {Math.round(AUTOMATED_SHARE * 100)}% of the job goes away, not all of it</span>
              </dt>
              <dd className="text-xl font-bold tabular-nums text-ink-deep">
                {inr(Math.round(result.conservativeYearly))}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 pt-3">
              <dt className="text-lg font-bold text-ink-deep">The build pays for itself in</dt>
              <dd className="text-2xl font-extrabold tabular-nums text-ink-deep">
                {payback === null ? "—" : payback < 1 ? "under a month" : `${payback.toFixed(1)} months`}
              </dd>
            </div>
          </dl>
        </div>

        <p className="mt-4 border-l-2 border-stamp pl-4 text-lg">{verdict(result)}</p>

        <p className="mt-3 text-sm text-muted">
          This uses only the numbers you enter, an eight-hour day and a twenty-two-day month. It ignores the things
          hardest to price and easiest to feel: mistakes, delays, and what it does to someone to spend every Monday this
          way.
        </p>

        <div className="mt-10 border-t border-rule pt-8">
          <h2 className="text-2xl font-bold">Get this job quoted</h2>
          <p className="mt-2 max-w-prose">
            Send the numbers above with a line about what the job actually is. You will get an honest answer about
            whether it is worth building — including &ldquo;no&rdquo; when that is the answer.
          </p>
          <div className="mt-6">
            <RequestForm
              source="calculator"
              calculator={snapshot}
              submitLabel="Send my numbers"
              id="calc-form"
              messageLabel="What is the job?"
              messageHint="What happens today, who does it, and how often."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
