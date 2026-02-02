import type { IPricing } from "../types";

type TFunction = (key: string, options?: Record<string, any>) => string;

export const getPricingData = (t: TFunction): IPricing[] => [
  {
    name: t("pricing.plans.basic.name"),
    price: 29,
    period: t("pricing.periods.month"),
    features: [
      t("pricing.plans.basic.features.0"),
      t("pricing.plans.basic.features.1"),
      t("pricing.plans.basic.features.2"),
      t("pricing.plans.basic.features.3"),
      t("pricing.plans.basic.features.4"),
    ],
    mostPopular: false,
  },
  {
    name: t("pricing.plans.pro.name"),
    price: 79,
    period: t("pricing.periods.month"),
    features: [
      t("pricing.plans.pro.features.0"),
      t("pricing.plans.pro.features.1"),
      t("pricing.plans.pro.features.2"),
      t("pricing.plans.pro.features.3"),
      t("pricing.plans.pro.features.4"),
      t("pricing.plans.pro.features.5"),
      t("pricing.plans.pro.features.6"),
    ],
    mostPopular: true,
  },
  {
    name: t("pricing.plans.enterprise.name"),
    price: 199,
    period: t("pricing.periods.month"),
    features: [
      t("pricing.plans.enterprise.features.0"),
      t("pricing.plans.enterprise.features.1"),
      t("pricing.plans.enterprise.features.2"),
      t("pricing.plans.enterprise.features.3"),
      t("pricing.plans.enterprise.features.4"),
    ],
    mostPopular: false,
  },
];
