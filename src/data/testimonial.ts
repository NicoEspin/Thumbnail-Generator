import type { ITestimonial } from "../types";

type TFunction = (key: string, options?: Record<string, any>) => string;

export const getTestimonialsData = (t: TFunction): ITestimonial[] => [
  {
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    name: t("testimonials.items.0.name"),
    handle: t("testimonials.items.0.handle"),
    date: t("testimonials.items.0.date"),
    quote: t("testimonials.items.0.quote"),
  },
  {
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    name: t("testimonials.items.1.name"),
    handle: t("testimonials.items.1.handle"),
    date: t("testimonials.items.1.date"),
    quote: t("testimonials.items.1.quote"),
  },
  {
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
    name: t("testimonials.items.2.name"),
    handle: t("testimonials.items.2.handle"),
    date: t("testimonials.items.2.date"),
    quote: t("testimonials.items.2.quote"),
  },
  {
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
    name: t("testimonials.items.3.name"),
    handle: t("testimonials.items.3.handle"),
    date: t("testimonials.items.3.date"),
    quote: t("testimonials.items.3.quote"),
  },
];
