"use client";

import SectionTitle from "../components/SectionTitle";
import { getPricingData } from "../data/pricing";
import type { IPricing } from "../types";
import { CheckIcon } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

import SpotlightCard from "../components/SpotlightCard"; // ajustá la ruta si difiere

export default function PricingSection() {
  const { t } = useTranslation();

  const pricingData: IPricing[] = getPricingData(t);

  return (
    <div id="pricing" className="px-4 md:px-16 lg:px-24 xl:px-32">
      <SectionTitle
        text1={t("pricing.sectionTitle.text1")}
        text2={t("pricing.sectionTitle.text2")}
        text3={t("pricing.sectionTitle.text3")}
      />

      <div className="flex flex-wrap items-center justify-center gap-8 mt-20">
        {pricingData.map((plan: IPricing, index: number) => (
          <motion.div
            key={`${plan.name}-${index}`}
            className="relative w-72" // <- importante: relative acá
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.15,
              type: "spring",
              stiffness: 320,
              damping: 70,
              mass: 1,
            }}
          >
            {plan.mostPopular && (
              <p className="absolute z-50 px-3 text-sm -top-3.5 left-3.5 py-1 bg-pink-400 rounded-full">
                {t("pricing.badges.mostPopular")}
              </p>
            )}

            <SpotlightCard
              spotlightColor={
                plan.mostPopular
                  ? "rgba(236, 72, 153, 0.45)"
                  : "rgba(236, 72, 153, 0.30)"
              }
              className={[
                "w-full text-center border border-pink-950 rounded-xl",
                "p-6 pb-16",
                plan.mostPopular ? "bg-pink-950" : "bg-pink-950/30",
              ].join(" ")}
            >
              <p className="font-semibold">{plan.name}</p>

              <h1 className="text-3xl font-semibold">
                ${plan.price}
                <span className="text-gray-500 font-normal text-sm">
                  /{plan.period}
                </span>
              </h1>

              <ul className="list-none text-slate-300 mt-6 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckIcon className="size-4.5 text-pink-600" />
                    <p>{feature}</p>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={[
                  "w-full py-2.5 rounded-md font-medium mt-7 transition-all",
                  plan.mostPopular
                    ? "bg-white text-pink-600 hover:bg-slate-200"
                    : "bg-pink-500 hover:bg-pink-600",
                ].join(" ")}
              >
                {t("pricing.cta")}
              </button>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
