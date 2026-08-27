import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Eye, Lock, ShieldCheck, Sparkles } from "lucide-react";
import rameshImg from "@/assets/ramesh.jpg";
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
    if (!form.fullName.trim()) next.fullName = t("identity.error.name");
    if (!form.occupation.trim()) next.occupation = t("identity.error.occupation");
    if (!/^\d{1,2}(\.\d)?$/.test(form.yearsInBusiness.trim())) next.yearsInBusiness = t("identity.error.years");
    if (!form.location.trim()) next.location = t("identity.error.location");
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setProfile({
      fullName: form.fullName.trim(),
      occupation: form.occupation.trim(),
      yearsInBusiness: form.yearsInBusiness.trim(),
      location: form.location.trim(),
    });
    navigate({ to: "/evidence" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
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

          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-5">
            <img
              src={rameshImg}
              alt="Illustration of Ramesh Kumar in his kirana store"
              width={1024}
              height={1024}
              className="size-24 shrink-0 rounded-xl object-cover sm:size-28"
            />
            <div>
              <p className="font-display text-xl font-semibold">{t("identity.greeting")}</p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {t("identity.persona.occupation")}
              </p>
              <p className="text-sm text-muted-foreground">{t("identity.persona.location")}</p>
              <p className="mt-3 text-sm text-muted-foreground">{t("identity.explain")}</p>
            </div>
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
              error={errors.fullName}
              placeholder={t("identity.value.name")}
            />
            <Field
              id="occupation"
              label={t("identity.field.occupation")}
              value={form.occupation}
              onChange={update("occupation")}
              error={errors.occupation}
              placeholder={t("identity.value.occupation")}
            />
            <Field
              id="years"
              label={t("identity.field.years")}
              value={form.yearsInBusiness}
              onChange={update("yearsInBusiness")}
              error={errors.yearsInBusiness}
              placeholder="6"
              inputMode="numeric"
              suffix={t("identity.years.suffix")}
            />
            <Field
              id="location"
              label={t("identity.field.location")}
              value={form.location}
              onChange={update("location")}
              error={errors.location}
              placeholder={t("identity.value.location")}
            />
          </div>

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
  error?: string;
  placeholder?: string;
  inputMode?: "numeric";
  suffix?: string;
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
