"use client";

import SectionTitle from "../components/SectionTitle";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { featuresData } from "../data/features";
import type { IFeature } from "../types";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function FeaturesSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div id="features" className="px-4 md:px-16 lg:px-24 xl:px-32">
      <SectionTitle
        text1={t("features.sectionTitle.text1")}
        text2={t("features.sectionTitle.text2")}
        text3={t("features.sectionTitle.text3")}
      />

      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-4 mt-16 px-6">
        {featuresData.map((feature: IFeature, index: number) => {
          const isCenter = index === 1;

          return (
            <motion.div
              key={index}
              className={
                isCenter
                  ? "relative p-[2px] rounded-[13px] overflow-hidden"
                  : ""
              }
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
              {/* ✅ ROTATING BORDER LAYER - Extended beyond container */}
              {isCenter && (
                <motion.div
                  className="absolute inset-[-100%] pointer-events-none"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #db2777, #1e293b, #db2777)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 4,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                />
              )}

              {/* ✅ CONTENT LAYER */}
              <div className="relative z-10 p-6 rounded-[11px] space-y-4 bg-slate-950 max-w-80 w-full">
                <img
                  src={feature.icon}
                  alt={t("features.cards.iconAlt", { title: feature.title })}
                />
                <h3 className="text-base font-medium text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-400 line-clamp-2 pb-4">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-40 relative mx-auto max-w-5xl">
        <div className="absolute -z-50 size-100 -top-10 -left-20 aspect-square rounded-full bg-pink-500/40 blur-3xl"></div>

        <motion.p
          className="text-slate-300 text-lg text-left max-w-3xl"
          initial={{ y: 150, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
        >
          {t("features.midCopy")}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-10">
          <motion.div
            className="md:col-span-2"
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 70,
              mass: 1,
            }}
          >
            <img
              className="h-full w-auto"
              src="/assets/features-showcase-1.png"
              alt={t("features.showcase.image1Alt")}
              width={1000}
              height={500}
            />
          </motion.div>

          <motion.div
            className="md:col-span-1"
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.15,
              type: "spring",
              stiffness: 320,
              damping: 70,
              mass: 1,
            }}
          >
            <img
              src="/assets/features-showcase-2.png"
              alt={t("features.showcase.image2Alt")}
              width={1000}
              height={500}
              className="hover:-translate-y-0.5 transition duration-300"
            />

            <h3 className="text-[24px]/7.5 text-slate-300 font-medium mt-6">
              {t("features.showcase.title")}
            </h3>

            <p className="text-slate-300 mt-2">
              {t("features.showcase.description")}
            </p>

            <a
             onClick={() => navigate("/generate")}
              className="group flex items-center gap-2 mt-4 text-pink-600 hover:text-pink-700 transition cursor-pointer"
            >
              {t("features.showcase.linkText")}
              <ArrowUpRight className="size-5 group-hover:translate-x-0.5 transition duration-300" />
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
