import type { IFooter } from "../types";

type TFunction = (key: string, options?: Record<string, any>) => string;

export const getFooterData = (t: TFunction): IFooter[] => [
  {
    title: t("footer.sections.product.title"),
    links: [
      { name: t("footer.sections.product.links.home"), href: "#" },
      { name: t("footer.sections.product.links.support"), href: "#support" },
      { name: t("footer.sections.product.links.pricing"), href: "#pricing" },
      {
        name: t("footer.sections.product.links.affiliate"),
        href: "#affiliate",
      },
    ],
  },
  {
    title: t("footer.sections.resources.title"),
    links: [
      { name: t("footer.sections.resources.links.company"), href: "#company" },
      { name: t("footer.sections.resources.links.blogs"), href: "#blogs" },
      {
        name: t("footer.sections.resources.links.community"),
        href: "#community",
      },
      { name: t("footer.sections.resources.links.careers"), href: "#careers" },
      { name: t("footer.sections.resources.links.about"), href: "#about" },
    ],
  },
  {
    title: t("footer.sections.legal.title"),
    links: [
      { name: t("footer.sections.legal.links.privacy"), href: "#privacy" },
      { name: t("footer.sections.legal.links.terms"), href: "#terms" },
    ],
  },
];
