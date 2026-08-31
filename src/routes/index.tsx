import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, BadgeCheck, Eye, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { Stepper } from "@/components/Stepper";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TrustPulse — Build your Financial Resume" },
      {
        name: "description",
        content:
          "Start your Financial Identity with TrustPulse: turn everyday financial evidence into a credible Financial Resume.",
      },
      { property: "og:title", content: "TrustPulse — Build your Financial Resume" },
      {
        property: "og:description",
        content: "Your financial story already exists. TrustPulse makes it visible.",
      },
    ],
  }),
  component: IdentityPage,
});

function IdentityPage() {
  const { t } = useI18n();
  const { profile, setProfile } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState(profile);
  const [errors, setErrors] = useState<Record<string, string>>({});


  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.fullName.trim()) next["fullName"] = t("identity.error.name");
    if (!form.occupation.trim()) next["occupation"] = t("identity.error.occupation");
    if (!/^\d{1,2}(\.\d)?$/.test(form.yearsInBusiness.trim())) next["yearsInBusiness"] = t("identity.error.years");
    if (!form.location.trim()) next["location"] = t("identity.error.location");
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setProfile({
      fullName: form.fullName.trim(),
      occupation: form.occupation.trim(),
      yearsInBusiness: form.yearsInBusiness.trim(),
      location: form.location.trim(),
      aadhaar: form.aadhaar?.trim() ?? "",
      pan: form.pan?.trim().toUpperCase() ?? "",
      kycVerified: !!form.kycVerified,
    });
    navigate({ to: "/evidence" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      {gateWarning && (
        <div
          role="alert"
          className="tp-rise mb-6 flex items-start gap-3 rounded-2xl border border-danger/40 bg-danger/10 px-4 py-3.5 text-sm font-medium text-danger"
        >
          <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden />
          <div>
            <p className="font-semibold">{t("gate.title")}</p>
            <p>{t("gate.warning")}</p>
          </div>
        </div>
      )}
      <Stepper current={1} />

      <div className="mt-10 grid items-start gap-10 lg:mt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="tp-rise">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold-soft px-3 py-1.5 text-xs font-semibold tracking-wide text-brown uppercase">
            <Sparkles className="size-3.5" aria-hidden />
            {t("brand.statement")}
          </span>
          <h1 className="mt-5 text-4xl leading-tight font-semibold text-balance sm:text-5xl lg:text-6xl">
            {t("identity.headline")}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">{t("identity.support")}</p>

          <div className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-soft">
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              {t("identity.greeting")}
            </p>
            {form.fullName.trim() || form.occupation.trim() || form.location.trim() ? (
              <div className="mt-3 flex items-start gap-4">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-gold-soft font-display text-xl font-semibold text-brown">
                  {(form.fullName.trim() || "?").charAt(0).toUpperCase()}
                </span>
                <div>
                  <p className="font-display text-xl font-semibold">
                    {form.fullName.trim() || t("identity.value.name")}
                  </p>
                  {form.occupation.trim() && (
                    <p className="mt-1 text-sm font-medium text-foreground">{form.occupation}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {[form.location.trim(), form.yearsInBusiness.trim() && `${form.yearsInBusiness} ${t("identity.years.suffix")}`]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
              </div>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">{t("identity.preview.empty")}</p>
            )}
            <p className="mt-4 text-xs text-muted-foreground">{t("identity.preview.hint")}</p>
          </div>


          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { icon: Eye, text: t("brand.sub") },
              { icon: ShieldCheck, text: t("common.prototype") },
              { icon: Lock, text: t("common.privacy") },
            ].map(({ icon: Icon, text }, i) => (
              <li key={i} className="rounded-xl bg-surface p-4 text-sm text-muted-foreground">
                <Icon className="mb-2 size-5 text-primary" aria-hidden />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={submit} noValidate className="tp-card tp-rise p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold">{t("resume.identity")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{t("identity.explain")}</p>

          <div className="mt-6 space-y-5">
            <Field
              id="fullName"
              label={t("identity.field.name")}
              value={form.fullName}
              onChange={update("fullName")}
              error={errors["fullName"]}
              placeholder={t("identity.value.name")}
            />
            <Field
              id="occupation"
              label={t("identity.field.occupation")}
              value={form.occupation}
              onChange={update("occupation")}
              error={errors["occupation"]}
              placeholder={t("identity.value.occupation")}
            />
            <Field
              id="years"
              label={t("identity.field.years")}
              value={form.yearsInBusiness}
              onChange={update("yearsInBusiness")}
              error={errors["yearsInBusiness"]}
              placeholder="6"
              inputMode="numeric"
              suffix={t("identity.years.suffix")}
            />
            <Field
              id="location"
              label={t("identity.field.location")}
              value={form.location}
              onChange={update("location")}
              error={errors["location"]}
              placeholder={t("identity.value.location")}
            />
          </div>

          <KycBlock
            aadhaar={form.aadhaar ?? ""}
            pan={form.pan ?? ""}
            verified={!!form.kycVerified}
            onChange={(patch) => setForm((f) => ({ ...f, ...patch }))}
          />


          <button
            type="submit"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground transition-transform hover:brightness-110 active:scale-[0.99]"
          >
            {t("common.continue")}
            <ArrowRight className="size-4" aria-hidden />
          </button>
          <p className="mt-4 text-center text-xs text-muted-foreground">{t("common.privacy")}</p>
        </form>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  inputMode,
  suffix,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | undefined;
  placeholder?: string | undefined;
  inputMode?: "numeric" | undefined;
  suffix?: string | undefined;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold">
        {label}
      </label>
      <div className="relative mt-2">
        <input
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          inputMode={inputMode}
          aria-invalid={!!error}
          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none transition-shadow focus:border-primary focus:ring-4 focus:ring-primary/12 aria-[invalid=true]:border-danger"
        />
        {suffix && (
          <span className="absolute inset-y-0 right-4 flex items-center text-sm text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>
      {error && <p className="mt-1.5 text-sm font-medium text-danger">{error}</p>}
    </div>
  );
}

function KycBlock({
  aadhaar,
  pan,
  verified,
  onChange,
}: {
  aadhaar: string;
  pan: string;
  verified: boolean;
  onChange: (patch: { aadhaar?: string; pan?: string; kycVerified?: boolean }) => void;
}) {
  const { t } = useI18n();
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const sendOtp = () => {
    if (!/^\d{12}$/.test(aadhaar.replace(/\s/g, ""))) return setError(t("kyc.error.aadhaar"));
    if (!/^[A-Z]{5}\d{4}[A-Z]$/.test(pan.trim().toUpperCase())) return setError(t("kyc.error.pan"));
    setError("");
    setOtp("");
    setOtpSent(true);
  };

  const verify = () => {
    if (otp.trim() !== "123456") return setError(t("kyc.error.otp"));
    setError("");
    setOtpSent(false);
    onChange({ kycVerified: true });
  };

  return (
    <div className="mt-6 rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gold-soft text-brown">
          <BadgeCheck className="size-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-lg font-semibold">{t("kyc.title")}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{t("kyc.desc")}</p>
        </div>
      </div>

      {verified ? (
        <p className="mt-4 inline-flex items-center gap-2 rounded-xl bg-success-soft px-3 py-2 text-sm font-semibold text-success">
          <ShieldCheck className="size-4" aria-hidden />
          {t("kyc.verified")}
        </p>
      ) : (
        <div className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="aadhaar" className="block text-sm font-semibold">
                {t("kyc.aadhaar")}
              </label>
              <input
                id="aadhaar"
                value={aadhaar}
                inputMode="numeric"
                maxLength={14}
                onChange={(e) => onChange({ aadhaar: e.target.value })}
                placeholder={t("kyc.aadhaar.ph")}
                className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none transition-shadow focus:border-primary focus:ring-4 focus:ring-primary/12"
              />
            </div>
            <div>
              <label htmlFor="pan" className="block text-sm font-semibold">
                {t("kyc.pan")}
              </label>
              <input
                id="pan"
                value={pan}
                maxLength={10}
                onChange={(e) => onChange({ pan: e.target.value.toUpperCase() })}
                placeholder={t("kyc.pan.ph")}
                className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-base uppercase outline-none transition-shadow focus:border-primary focus:ring-4 focus:ring-primary/12"
              />
            </div>
          </div>

          {otpSent && (
            <div>
              <p className="text-xs text-muted-foreground">{t("kyc.sent")}</p>
              <label htmlFor="otp" className="mt-3 block text-sm font-semibold">
                {t("kyc.otp")}
              </label>
              <input
                id="otp"
                value={otp}
                inputMode="numeric"
                maxLength={6}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-base tracking-[0.4em] outline-none transition-shadow focus:border-primary focus:ring-4 focus:ring-primary/12"
              />
            </div>
          )}

          {error && <p className="text-sm font-medium text-danger">{error}</p>}

          <div className="flex flex-col gap-3 sm:flex-row">
            {otpSent && (
              <button
                type="button"
                onClick={verify}
                className="flex-1 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:brightness-110"
              >
                {t("kyc.verify")}
              </button>
            )}
            <button
              type="button"
              onClick={sendOtp}
              className="rounded-xl border border-border px-5 py-3 font-semibold text-muted-foreground hover:bg-secondary"
            >
              {otpSent ? t("kyc.resend") : t("kyc.send")}
            </button>
          </div>
          <p className="text-xs text-muted-foreground">{t("kyc.disclaimer")}</p>
        </div>
      )}
    </div>
  );
}
