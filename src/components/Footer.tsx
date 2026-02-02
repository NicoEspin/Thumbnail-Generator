import { GithubIcon, Globe, LinkedinIcon } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getFooterData } from "../data/footer";
import type { IFooter, IFooterLink } from "../types";

export default function Footer() {
  const { t } = useTranslation();
  const footerData: IFooter[] = getFooterData(t);

  return (
    <footer className="flex flex-wrap justify-center md:justify-between overflow-hidden gap-10 md:gap-20 mt-40 py-6 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-500">
      <motion.div
        className="flex flex-wrap items-start gap-10 md:gap-35"
        initial={{ x: -150, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
      >
        <Link to={"/"}>
          <img
            className="size-8 aspect-square"
            src="/favicon.svg"
            alt={t("footer.logoAlt")}
            width={32}
            height={32}
          />
        </Link>

        {footerData.map((section, index) => (
          <div key={index}>
            <p className="text-slate-100 font-semibold">{section.title}</p>
            <ul className="mt-2 space-y-2">
              {section.links.map((link: IFooterLink, index: number) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="hover:text-pink-600 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="flex flex-col max-md:items-center max-md:text-center gap-2 items-end"
        initial={{ x: 150, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
      >
        <p className="max-w-60">{t("footer.tagline")}</p>

        <div className="flex items-center gap-4 mt-3">
          <a
            href="https://github.com/NicoEspin"
            target="_blank"
            rel="noreferrer"
            aria-label={t("footer.social.github")}
            title={t("footer.social.github")}
          >
            <GithubIcon className="size-5 hover:text-pink-500" />
          </a>

          <a
            href="https://www.linkedin.com/in/nicol%C3%A1s-espin/"
            target="_blank"
            rel="noreferrer"
            aria-label={t("footer.social.linkedin")}
            title={t("footer.social.linkedin")}
          >
            <LinkedinIcon className="size-5 hover:text-pink-500" />
          </a>

          <a
            href="https://portfolio-nicoespins-projects.vercel.app/"
            target="_blank"
            rel="noreferrer"
            aria-label={t("footer.social.portfolio")}
            title={t("footer.social.portfolio")}
          >
            <Globe className="size-6 hover:text-pink-500" />
          </a>
        </div>

        <p className="mt-3 text-center">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://portfolio-nicoespins-projects.vercel.app/"
          >
            &copy; {new Date().getFullYear()} Nicolás Espin
          </a>
        </p>
      </motion.div>
    </footer>
  );
}
