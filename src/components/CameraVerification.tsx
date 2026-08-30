import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, CheckCircle2, ShieldCheck, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";

type Phase = "prompt" | "verifying" | "success" | "done" | "dismissed";
type Step = "center" | "left" | "right";

const STEP_ORDER: Step[] = ["center", "left", "right"];

/**
 * Lightweight prototype identity-presence layer for the Evidence Vault.
 * Simulated liveness only — no biometric data is captured or stored.
 */
export function CameraVerification() {
  const { t } = useI18n();
  const [phase, setPhase] = useState<Phase>("prompt");
  const [step, setStep] = useState<Step>("center");
  const [error, setError] = useState("");
  const streamRef = useRef<MediaStream | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const pipVideoRef = useRef<HTMLVideoElement>(null);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((tr) => tr.stop());
    streamRef.current = null;
  }, []);

  // Stop the camera whenever this screen unmounts (navigating away from the vault).
  useEffect(() => stopStream, [stopStream]);

  const attach = useCallback((el: HTMLVideoElement | null) => {
    if (el && streamRef.current && el.srcObject !== streamRef.current) {
      el.srcObject = streamRef.current;
      void el.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (phase === "verifying") attach(modalVideoRef.current);
    if (phase === "done") attach(pipVideoRef.current);
  }, [phase, step, attach]);

  const allow = async () => {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      streamRef.current = stream;
      setStep("center");
      setPhase("verifying");
    } catch {
      setError(t("cam.error"));
    }
  };

  // Simulated liveness progression through the guided steps.
  useEffect(() => {
    if (phase !== "verifying") return;
    const idx = STEP_ORDER.indexOf(step);
    const timer = window.setTimeout(() => {
      const next = STEP_ORDER[idx + 1];
      if (next) setStep(next);
      else setPhase("success");
    }, 2200);
    return () => window.clearTimeout(timer);
  }, [phase, step]);

  if (phase === "dismissed") return null;

  if (phase === "done") {
    return (
      <div className="fixed right-4 bottom-4 z-40 w-36 sm:w-40">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lift">
          <video
            ref={pipVideoRef}
            muted
            playsInline
            autoPlay
            className="h-24 w-full scale-x-[-1] object-cover sm:h-28"
          />
          <div className="flex items-center gap-1.5 px-2.5 py-2">
            <span className="size-2 shrink-0 rounded-full bg-success" aria-hidden />
            <span className="truncate text-[11px] font-semibold text-muted-foreground">
              {t("cam.badge")}
            </span>
            <button
              type="button"
              aria-label={t("common.close")}
              onClick={() => {
                stopStream();
                setPhase("dismissed");
              }}
              className="ml-auto text-muted-foreground hover:text-foreground"
            >
              <X className="size-3.5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={t("cam.prompt.title")}
    >
      <div className="tp-rise w-full max-w-md rounded-t-3xl border border-border bg-card p-6 shadow-lift sm:rounded-3xl sm:p-8">
        {phase === "prompt" ? (
          <>
            <span className="flex size-12 items-center justify-center rounded-2xl bg-success-soft text-success">
              <ShieldCheck className="size-6" aria-hidden />
            </span>
            <h2 className="mt-4 font-display text-2xl font-semibold">{t("cam.prompt.title")}</h2>
            <p className="mt-2 text-muted-foreground">{t("cam.prompt.desc")}</p>
            {error && <p className="mt-3 text-sm font-medium text-danger">{error}</p>}
            <p className="mt-4 rounded-xl bg-gold-soft p-3 text-xs text-brown">
              {t("cam.disclaimer")}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={allow}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:brightness-110"
              >
                <Camera className="size-5" aria-hidden />
                {t("cam.allow")}
              </button>
              <button
                type="button"
                onClick={() => setPhase("dismissed")}
                className="rounded-xl border border-border px-5 py-3 font-semibold text-muted-foreground hover:bg-secondary"
              >
                {t("cam.later")}
              </button>
            </div>
          </>
        ) : phase === "success" ? (
          <>
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-success-soft text-success">
              <CheckCircle2 className="size-7" aria-hidden />
            </span>
            <h2 className="mt-4 text-center font-display text-2xl font-semibold">
              {t("cam.done.title")}
            </h2>
            <p className="mt-2 text-center text-muted-foreground">{t("cam.done.desc")}</p>
            <button
              type="button"
              onClick={() => setPhase("done")}
              className="mt-6 w-full rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:brightness-110"
            >
              {t("cam.continue")}
            </button>
          </>
        ) : (
          <>
            <h2 className="font-display text-2xl font-semibold">{t("cam.verify.title")}</h2>
            <div className="relative mx-auto mt-6 aspect-square w-56 max-w-full overflow-hidden rounded-full border-4 border-primary/40 bg-secondary">
              <video
                ref={modalVideoRef}
                muted
                playsInline
                autoPlay
                className="size-full scale-x-[-1] object-cover"
              />
            </div>
            <p className="mt-5 text-center text-lg font-semibold">{t(`cam.step.${step}`)}</p>
            <div className="mt-4 flex justify-center gap-2" aria-hidden>
              {STEP_ORDER.map((s) => (
                <span
                  key={s}
                  className={
                    "h-1.5 w-10 rounded-full " +
                    (STEP_ORDER.indexOf(s) <= STEP_ORDER.indexOf(step)
                      ? "bg-primary"
                      : "bg-border")
                  }
                />
              ))}
            </div>
            <p className="mt-5 text-center text-xs text-muted-foreground">{t("cam.disclaimer")}</p>
          </>
        )}
      </div>
    </div>
  );
}

export function VerifiedToast() {
  const { t } = useI18n();
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-success">
      <CheckCircle2 className="size-4" aria-hidden />
      {t("cam.done.title")}
    </span>
  );
}
