"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

type StageState = "idle" | "active" | "ok" | "retry" | "fail" | "skip";
type LogKind = "info" | "ok" | "warn" | "error";
type LogLine = { id: number; text: string; kind: LogKind };

const STAGES = ["Ingest", "Validate", "Transform", "Deliver"] as const;

const SCENARIOS = [
  { id: "happy", label: "Clean order", hint: "A well-formed payload from a healthy upstream." },
  { id: "duplicate", label: "Duplicate webhook", hint: "The same event delivered twice." },
  { id: "flaky", label: "Downstream 500s", hint: "The target ERP is throwing errors." },
  { id: "malformed", label: "Missing field", hint: "Required field absent from the payload." },
] as const;

type ScenarioId = (typeof SCENARIOS)[number]["id"];

const STATE_STYLES: Record<StageState, string> = {
  idle: "border-line text-muted",
  active: "border-accent text-ink",
  ok: "border-accent/60 text-accent",
  retry: "border-warn/70 text-warn",
  fail: "border-red-400/70 text-red-300",
  skip: "border-accent-2/60 text-accent-2",
};

export default function PipelinePlayground() {
  const [scenario, setScenario] = useState<ScenarioId>("happy");
  const [retries, setRetries] = useState(true);
  const [idempotency, setIdempotency] = useState(true);
  const [stages, setStages] = useState<StageState[]>(() => STAGES.map(() => "idle"));
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [running, setRunning] = useState(false);
  const [verdict, setVerdict] = useState<{ text: string; kind: LogKind } | null>(null);

  const runId = useRef(0);
  const timers = useRef<number[]>([]);
  const logSeq = useRef(0);
  const logEnd = useRef<HTMLDivElement>(null);

  useEffect(
    () => () => {
      runId.current += 1;
      timers.current.forEach(window.clearTimeout);
    },
    [],
  );

  useEffect(() => {
    logEnd.current?.scrollIntoView({ block: "nearest" });
  }, [logs]);

  const run = useCallback(async () => {
    runId.current += 1;
    const token = runId.current;
    timers.current.forEach(window.clearTimeout);
    timers.current = [];

    const alive = () => runId.current === token;
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.current.push(window.setTimeout(resolve, ms));
      });
    const log = (text: string, kind: LogKind = "info") => {
      if (!alive()) return;
      logSeq.current += 1;
      setLogs((prev) => [...prev.slice(-40), { id: logSeq.current, text, kind }]);
    };
    const mark = (i: number, state: StageState) => {
      if (!alive()) return;
      setStages((prev) => prev.map((s, idx) => (idx === i ? state : s)));
    };

    setRunning(true);
    setVerdict(null);
    setLogs([]);
    setStages(STAGES.map(() => "idle"));

    const corr = `ord_${Math.random().toString(36).slice(2, 8)}`;
    log(`POST /events  correlation_id=${corr}`, "info");
    await wait(320);

    // Ingest
    mark(0, "active");
    await wait(420);
    log("ingest · payload accepted, offset committed", "ok");
    mark(0, "ok");

    // Validate
    mark(1, "active");
    await wait(480);

    if (scenario === "malformed") {
      log("validate · required field `line_items[0].sku` is null", "error");
      await wait(360);
      mark(1, "fail");
      log(`quarantine · message parked with source payload (${corr})`, "warn");
      mark(2, "idle");
      mark(3, "idle");
      setVerdict({
        text: "Quarantined, not dropped. A human reviews it; nothing silently disappears.",
        kind: "warn",
      });
      setRunning(false);
      return;
    }

    if (scenario === "duplicate") {
      if (idempotency) {
        log(`validate · idempotency key ${corr} already processed`, "warn");
        await wait(380);
        mark(1, "skip");
        mark(2, "skip");
        mark(3, "skip");
        log("delivery skipped · returning the original 200 response", "ok");
        setVerdict({
          text: "Duplicate absorbed. The upstream can retry as often as it likes.",
          kind: "ok",
        });
        setRunning(false);
        return;
      }
      log("validate · no idempotency key checked", "warn");
    } else {
      log("validate · schema ok, contract version 3", "ok");
    }
    mark(1, "ok");

    // Transform
    mark(2, "active");
    await wait(460);
    log("transform · canonical order → ERP IDoc", "ok");
    mark(2, "ok");

    // Deliver
    mark(3, "active");
    await wait(420);

    if (scenario === "flaky") {
      if (!retries) {
        log("deliver · ERP responded 503 Service Unavailable", "error");
        await wait(360);
        mark(3, "fail");
        log("no retry policy · message lost downstream", "error");
        setVerdict({
          text: "One 503 and the order is gone. This is the failure mode retries exist for.",
          kind: "error",
        });
        setRunning(false);
        return;
      }
      for (const [attempt, backoff] of [
        [1, 400],
        [2, 700],
      ] as const) {
        log(`deliver · attempt ${attempt} → 503, backing off ${backoff}ms`, "warn");
        mark(3, "retry");
        await wait(backoff);
        if (!alive()) return;
      }
      log("deliver · attempt 3 → 201 Created", "ok");
      mark(3, "ok");
      setVerdict({
        text: "Recovered without a human. Exponential backoff plus an idempotent target.",
        kind: "ok",
      });
      setRunning(false);
      return;
    }

    if (scenario === "duplicate" && !idempotency) {
      log("deliver · 201 Created — second identical order written", "error");
      mark(3, "fail");
      setVerdict({
        text: "Two orders, one event. Idempotency is not optional on a webhook.",
        kind: "error",
      });
      setRunning(false);
      return;
    }

    log("deliver · 201 Created in 38ms", "ok");
    mark(3, "ok");
    setVerdict({ text: "Delivered. Correlation id logged end to end.", kind: "ok" });
    setRunning(false);
  }, [scenario, retries, idempotency]);

  const kindColor: Record<LogKind, string> = {
    info: "text-muted",
    ok: "text-accent",
    warn: "text-warn",
    error: "text-red-300",
  };

  return (
    <div className="mt-12 overflow-hidden rounded-3xl border border-line bg-panel/50">
      <div className="grid lg:grid-cols-[1fr_1.05fr]">
        {/* controls */}
        <div className="border-b border-line p-6 md:p-8 lg:border-r lg:border-b-0">
          <p className="eyebrow">Pick a payload</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setScenario(s.id)}
                aria-pressed={scenario === s.id}
                className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                  scenario === s.id
                    ? "border-accent/60 bg-accent/10 text-ink"
                    : "border-line text-muted hover:border-accent/30 hover:text-ink"
                }`}
              >
                <span className="block text-sm">{s.label}</span>
              </button>
            ))}
          </div>

          <p className="mt-4 min-h-10 text-sm text-muted">
            {SCENARIOS.find((s) => s.id === scenario)?.hint}
          </p>

          <p className="eyebrow mt-7">Guardrails</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              { on: retries, set: setRetries, label: "Retry with backoff" },
              { on: idempotency, set: setIdempotency, label: "Idempotency keys" },
            ].map((t) => (
              <button
                key={t.label}
                type="button"
                role="switch"
                aria-checked={t.on}
                onClick={() => t.set((v) => !v)}
                className={`flex items-center gap-2.5 rounded-full border px-3.5 py-2 font-mono text-[11px] tracking-[0.12em] uppercase transition-colors ${
                  t.on ? "border-accent/50 text-accent" : "border-line text-muted"
                }`}
              >
                <span
                  className={`relative h-3.5 w-6 rounded-full transition-colors ${
                    t.on ? "bg-accent/40" : "bg-white/10"
                  }`}
                >
                  <motion.span
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 32 }}
                    className={`absolute top-0.5 h-2.5 w-2.5 rounded-full ${
                      t.on ? "right-0.5 bg-accent" : "left-0.5 bg-muted"
                    }`}
                  />
                </span>
                {t.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={run}
            disabled={running}
            data-cursor={running ? "running" : "send"}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-50"
          >
            {running ? "Running…" : "Send the event"}
            <span aria-hidden>→</span>
          </button>
        </div>

        {/* pipeline + console */}
        <div className="p-6 md:p-8">
          <ol className="flex flex-wrap items-center gap-y-3">
            {STAGES.map((stage, i) => (
              <li key={stage} className="flex items-center">
                <motion.span
                  animate={
                    stages[i] === "active"
                      ? { scale: [1, 1.04, 1] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.6, repeat: stages[i] === "active" ? Infinity : 0 }}
                  className={`rounded-lg border bg-bg/60 px-3 py-2 font-mono text-[11px] tracking-[0.12em] uppercase transition-colors ${STATE_STYLES[stages[i]]}`}
                >
                  {stage}
                </motion.span>
                {i < STAGES.length - 1 && (
                  <span className="relative mx-2 h-px w-7 bg-line">
                    <motion.span
                      className="absolute inset-y-0 left-0 bg-accent"
                      animate={{ width: stages[i] === "ok" || stages[i] === "skip" ? "100%" : "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </span>
                )}
              </li>
            ))}
          </ol>

          <div className="mt-6 h-56 overflow-y-auto rounded-xl border border-line bg-bg/70 p-4 font-mono text-[11px] leading-relaxed">
            {logs.length === 0 && (
              <p className="text-muted">
                console idle · pick a payload and send it through the pipeline
              </p>
            )}
            <AnimatePresence initial={false}>
              {logs.map((l) => (
                <motion.p
                  key={l.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={kindColor[l.kind]}
                >
                  <span className="text-white/25">›</span> {l.text}
                </motion.p>
              ))}
            </AnimatePresence>
            <div ref={logEnd} />
          </div>

          <AnimatePresence mode="wait">
            {verdict && (
              <motion.p
                key={verdict.text}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-4 text-sm ${kindColor[verdict.kind]}`}
              >
                {verdict.text}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
