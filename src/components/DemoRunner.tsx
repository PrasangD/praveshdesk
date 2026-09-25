"use client";

import { useEffect, useRef, useState } from "react";
import { PIPELINE_STEPS, RAW_ROWS, runPipeline, type PipelineResult } from "@/lib/demo-pipeline";
import { inr } from "@/lib/pricing";

type Phase = "idle" | "running" | "done";

/** Enough delay to be watchable. The real work takes under a millisecond. */
const STEP_MS = 380;

export function DemoRunner() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [stepIndex, setStepIndex] = useState(-1);
  const [result, setResult] = useState<PipelineResult | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    return () => timers.current.forEach((t) => window.clearTimeout(t));
  }, []);

  function run() {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    setPhase("running");
    setStepIndex(-1);
    setResult(null);

    // The actual work, measured. Everything after this is presentation.
    const started = performance.now();
    const computed = runPipeline(RAW_ROWS);
    const took = performance.now() - started;

    PIPELINE_STEPS.forEach((_, i) => {
      timers.current.push(
        window.setTimeout(() => setStepIndex(i), i * STEP_MS),
      );
    });
    timers.current.push(
      window.setTimeout(() => {
        setResult(computed);
        setElapsed(took);
        setPhase("done");
      }, PIPELINE_STEPS.length * STEP_MS),
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
      {/* What four branches actually send */}
      <div>
        <h3 className="text-xl font-bold">What arrives</h3>
        <p className="mt-2 text-lg">
          Four branches, one file each, every day. Three date formats, branch names typed differently each time, amounts
          with rupee signs and thousands separators, one invoice sent twice, and a row with no branch at all.
        </p>
        <pre className="mt-5 overflow-x-auto rounded-md border border-rule bg-register p-4 font-mono text-[0.82rem] leading-relaxed text-ink-deep">
          {RAW_ROWS.join("\n")}
        </pre>
        <p className="mt-3 text-sm text-muted">
          This is the real input. Everything on the right is calculated from it in your browser when you press the
          button — nothing here is a recording.
        </p>
      </div>

      {/* The run */}
      <div>
        <div className="flex flex-wrap items-center gap-4">
          <button type="button" onClick={run} className="btn btn-primary" disabled={phase === "running"}>
            {phase === "running" ? "Running…" : phase === "done" ? "Run it again" : "Run the automation"}
          </button>
          {phase === "done" && (
            <p className="text-base text-muted">
              Real work took <strong className="tabular-nums text-ink-deep">{elapsed.toFixed(2)} ms</strong>
            </p>
          )}
        </div>

        <ol className="mt-6 space-y-2 rounded-md border-2 border-ink bg-ink-deep p-5 font-mono text-[0.88rem] text-white">
          {PIPELINE_STEPS.map((step, i) => {
            const state = phase === "idle" ? "waiting" : i <= stepIndex ? "done" : "waiting";
            return (
              <li key={step.id} className="flex items-baseline gap-3">
                <span className={state === "done" ? "text-[#3ddc97]" : "text-white/25"} aria-hidden="true">
                  {state === "done" ? "✓" : "·"}
                </span>
                <span className={`w-[8.5rem] shrink-0 ${state === "done" ? "text-white" : "text-white/35"}`}>
                  {step.label}
                </span>
                <span className={state === "done" ? "text-white/55" : "text-white/20"}>{step.detail}</span>
              </li>
            );
          })}
        </ol>

        <div aria-live="polite">
          {phase === "done" && result && <Report result={result} />}
          {phase !== "done" && (
            <p className="mt-6 text-lg text-muted">
              The report appears here, the way it would land in an inbox at six on Monday morning.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Report({ result }: { result: PipelineResult }) {
  return (
    <div className="mt-6 rounded-md border border-rule bg-white p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-ink pb-3">
        <h3 className="text-xl font-bold">Weekly branch report</h3>
        <span className="stamp">Sent</span>
      </div>

      <p className="mt-4 text-lg">
        <strong className="tabular-nums">{result.clean.length}</strong> invoices across{" "}
        <strong className="tabular-nums">{result.byBranch.length}</strong> branches and{" "}
        <strong className="tabular-nums">{result.days}</strong> days, totalling{" "}
        <strong className="bg-highlight px-1 tabular-nums">{inr(result.total)}</strong>.
      </p>

      <table className="mt-4 w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-rule text-base">
            <th scope="col" className="py-2 pr-4 font-bold text-ink-deep">Branch</th>
            <th scope="col" className="py-2 pr-4 text-right font-bold text-ink-deep">Invoices</th>
            <th scope="col" className="py-2 pr-4 text-right font-bold text-ink-deep">Qty</th>
            <th scope="col" className="py-2 text-right font-bold text-ink-deep">Amount</th>
          </tr>
        </thead>
        <tbody>
          {result.byBranch.map((b) => (
            <tr key={b.branch} className="border-b border-rule/60">
              <th scope="row" className="py-2 pr-4 font-medium text-ink-deep">{b.branch}</th>
              <td className="py-2 pr-4 text-right tabular-nums">{b.invoices}</td>
              <td className="py-2 pr-4 text-right tabular-nums">{b.qty}</td>
              <td className="py-2 text-right tabular-nums">{inr(b.amount)}</td>
            </tr>
          ))}
          <tr className="border-t-2 border-ink font-bold text-ink-deep">
            <th scope="row" className="py-2 pr-4">Total</th>
            <td className="py-2 pr-4 text-right tabular-nums">{result.clean.length}</td>
            <td className="py-2 pr-4 text-right tabular-nums">{result.totalQty}</td>
            <td className="py-2 text-right tabular-nums">{inr(result.total)}</td>
          </tr>
        </tbody>
      </table>

      <div className="mt-6 border-t border-rule pt-4">
        <h4 className="text-lg font-bold">
          Needs a human: {result.rejected.length + (result.duplicates > 0 ? 1 : 0)} things
        </h4>
        <p className="mt-1 text-base text-muted">
          This is the part that matters. The automation does not guess — it sets aside what it cannot trust and names
          the row, so somebody can fix it in a minute instead of finding it in an audit.
        </p>
        <ul className="mt-3 space-y-2">
          {result.rejected.map((r) => (
            <li key={r.invoice} className="flex gap-3 text-base">
              <svg viewBox="0 0 16 16" className="mt-1.5 h-4 w-4 shrink-0 text-margin" aria-hidden="true">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>
                <strong className="text-ink-deep">{r.invoice || "(no invoice number)"}</strong> — {r.reason}
              </span>
            </li>
          ))}
          {result.duplicates > 0 && (
            <li className="flex gap-3 text-base">
              <svg viewBox="0 0 16 16" className="mt-1.5 h-4 w-4 shrink-0 text-stamp" aria-hidden="true">
                <path
                  d="M3 8.5l3 3 7-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>
                <strong className="text-ink-deep">{result.duplicates} duplicate invoice</strong> dropped automatically —
                same number, same amount, sent twice.
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
