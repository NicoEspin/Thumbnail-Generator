import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Wand2,
  Zap,
  Layers,
  BarChart3,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import SoftBackdrop from "../components/SoftBackdrop";

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

type Step = {
  index: string;
  title: string;
  description: string;
};

const AboutPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const features: Feature[] = useMemo(
    () => [
      {
        icon: <Sparkles className="size-5 text-pink-200" />,
        title: t("about.features.smart.title"),
        description: t("about.features.smart.description"),
      },
      {
        icon: <Zap className="size-5 text-pink-200" />,
        title: t("about.features.fast.title"),
        description: t("about.features.fast.description"),
      },
      {
        icon: <Layers className="size-5 text-pink-200" />,
        title: t("about.features.editable.title"),
        description: t("about.features.editable.description"),
      },
      {
        icon: <BarChart3 className="size-5 text-pink-200" />,
        title: t("about.features.optimized.title"),
        description: t("about.features.optimized.description"),
      },
      {
        icon: <ShieldCheck className="size-5 text-pink-200" />,
        title: t("about.features.reliable.title"),
        description: t("about.features.reliable.description"),
      },
      {
        icon: <Wand2 className="size-5 text-pink-200" />,
        title: t("about.features.creator.title"),
        description: t("about.features.creator.description"),
      },
    ],
    [t]
  );

  const steps: Step[] = useMemo(
    () => [
      {
        index: "01",
        title: t("about.how.steps.0.title"),
        description: t("about.how.steps.0.description"),
      },
      {
        index: "02",
        title: t("about.how.steps.1.title"),
        description: t("about.how.steps.1.description"),
      },
      {
        index: "03",
        title: t("about.how.steps.2.title"),
        description: t("about.how.steps.2.description"),
      },
    ],
    [t]
  );

  return (
    <div className="min-h-screen">
      <SoftBackdrop />

      <main className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-28">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/6 p-8 md:p-10">
          <div className="absolute -top-28 -right-24 h-64 w-64 rounded-full bg-pink-500/15 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
                <Sparkles className="size-4 text-pink-200" />
                {t("about.hero.badge")}
              </span>
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
                {t("about.hero.note")}
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {t("about.hero.title")}
              </h1>
              <p className="max-w-3xl text-pretty text-base leading-relaxed text-zinc-200 md:text-lg">
                {t("about.hero.subtitle")}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => navigate("/generate")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-pink-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-pink-700 active:scale-[0.98]"
              >
                {t("about.hero.ctaPrimary")}
                <ArrowRight className="size-4" />
              </button>

              <button
                type="button"
                onClick={() => navigate("/contact")}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-zinc-100 transition hover:bg-white/10 active:scale-[0.98]"
              >
                {t("about.hero.ctaSecondary")}
              </button>
            </div>

            <div className="grid gap-3 pt-2 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-medium text-white">
                  {t("about.hero.stats.0.title")}
                </p>
                <p className="mt-1 text-sm text-zinc-200">
                  {t("about.hero.stats.0.description")}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-medium text-white">
                  {t("about.hero.stats.1.title")}
                </p>
                <p className="mt-1 text-sm text-zinc-200">
                  {t("about.hero.stats.1.description")}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-medium text-white">
                  {t("about.hero.stats.2.title")}
                </p>
                <p className="mt-1 text-sm text-zinc-200">
                  {t("about.hero.stats.2.description")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/6 p-7">
            <p className="text-xs font-medium uppercase tracking-wider text-pink-200">
              {t("about.mission.kicker")}
            </p>
            <h2 className="mt-2 text-lg font-semibold text-white">
              {t("about.mission.title")}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-200">
              {t("about.mission.description")}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/6 p-7">
            <p className="text-xs font-medium uppercase tracking-wider text-pink-200">
              {t("about.vision.kicker")}
            </p>
            <h2 className="mt-2 text-lg font-semibold text-white">
              {t("about.vision.title")}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-200">
              {t("about.vision.description")}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/6 p-7">
            <p className="text-xs font-medium uppercase tracking-wider text-pink-200">
              {t("about.promise.kicker")}
            </p>
            <h2 className="mt-2 text-lg font-semibold text-white">
              {t("about.promise.title")}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-200">
              {t("about.promise.description")}
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="mt-12">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-white">
              {t("about.featuresTitle")}
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-zinc-200">
              {t("about.featuresSubtitle")}
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-white/10 bg-white/6 p-6 transition hover:bg-white/8"
              >
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-2xl border border-white/10 bg-white/5">
                    {f.icon}
                  </div>
                  <p className="text-sm font-semibold text-white">{f.title}</p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-200">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mt-12 rounded-3xl border border-white/10 bg-white/6 p-7 md:p-9">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-white">
              {t("about.how.title")}
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-zinc-200">
              {t("about.how.subtitle")}
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.index}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <p className="text-xs font-medium text-pink-200">{s.index}</p>
                <h3 className="mt-2 text-base font-semibold text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-200">
                  {s.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => navigate("/generate")}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/15 active:scale-[0.98]"
            >
              {t("about.how.cta")}
              <ArrowRight className="size-4" />
            </button>

            <p className="text-sm text-zinc-300">{t("about.how.note")}</p>
          </div>
        </section>

        {/* Founder / Story */}
        <section className="mt-12 grid gap-4 lg:grid-cols-5">
          <div className="rounded-3xl border border-white/10 bg-white/6 p-7 lg:col-span-3">
            <p className="text-xs font-medium uppercase tracking-wider text-pink-200">
              {t("about.story.kicker")}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              {t("about.story.title")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-200">
              {t("about.story.p1")}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-200">
              {t("about.story.p2")}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/6 p-7 lg:col-span-2">
            <p className="text-xs font-medium uppercase tracking-wider text-pink-200">
              {t("about.builder.kicker")}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-white">
              {t("about.builder.title")}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-200">
              {t("about.builder.description")}
            </p>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">
                {t("about.builder.name")}
              </p>
              <p className="mt-1 text-sm text-zinc-200">
                {t("about.builder.role")}
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-12 rounded-3xl border border-white/10 bg-white/6 p-8 md:p-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                {t("about.final.title")}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-200">
                {t("about.final.subtitle")}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate("/generate")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-pink-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-pink-700 active:scale-[0.98]"
              >
                {t("about.final.ctaPrimary")}
                <ArrowRight className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => navigate("/contact")}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-zinc-100 transition hover:bg-white/10 active:scale-[0.98]"
              >
                {t("about.final.ctaSecondary")}
              </button>
            </div>
          </div>
        </section>

        {/* Footer note */}
        <p className="mt-10 text-center text-xs text-zinc-400">
          {t("about.footer")}
        </p>
      </main>
    </div>
  );
};

export default AboutPage;
