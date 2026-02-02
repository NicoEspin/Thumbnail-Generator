// Navbar.tsx
import { MenuIcon, XIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";

type NavItem = { to: string; label: string };

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const closeMenu = () => setIsOpen(false);

  const navItems: NavItem[] = useMemo(
    () => [
      { to: "/", label: t("nav.home") },
      { to: "/generate", label: t("nav.generate") },
      { to: "/my-generations", label: t("nav.myGenerations") },
      { to: "#", label: t("nav.contact") }
    ],
    [t],
  );

  const NavItemLink = ({
    to,
    label,
    onClick,
    className = "",
  }: {
    to: string;
    label: string;
    onClick?: () => void;
    className?: string;
  }) => (
    <Link
      to={to}
      onClick={onClick}
      className={["group relative inline-block pb-1 transition", className].join(
        " ",
      )}
    >
      <span className="relative z-10">{label}</span>

      {/* underline animado: escala en X de 0 -> 100% desde la izquierda */}
      <span className="pointer-events-none absolute left-0 -bottom-0.5 h-[2px] w-full origin-left scale-x-0 bg-pink-500 transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </Link>
  );

  return (
    <>
      <motion.nav
        className="fixed top-0 z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
      >
        <Link to={"/"}>
          <img src="/logo.svg" alt="Logo" className="h-8.5 w-auto" />
        </Link>

        {/* ✅ Desktop nav */}
        <div className="hidden md:flex items-center gap-8 transition duration-500">
          {navItems.map((item) => (
            <NavItemLink key={item.to} to={item.to} label={item.label} />
          ))}
        </div>

        {/* ✅ Desktop right actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* ✅ Language */}
          <div className="rounded-full border border-pink-900 bg-pink-950/30 px-3 py-1">
            <LanguageSwitcher />
          </div>

          {/* ✅ CTA */}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="px-6 py-2.5 bg-pink-600 hover:bg-pink-700 active:scale-95 transition-all rounded-full"
          >
            {t("nav.getStarted")}
          </button>
        </div>

        <button onClick={() => setIsOpen(true)} className="md:hidden">
          <MenuIcon size={26} className="active:scale-90 transition" />
        </button>
      </motion.nav>

      {/* ✅ Mobile overlay */}
      <div
        className={[
          "fixed inset-0 z-[100] md:hidden",
          "bg-black/90 backdrop-blur",
          "transition-transform duration-400",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        {/* ✅ Close button arriba derecha */}
        <button
          type="button"
          onClick={closeMenu}
          aria-label="Close menu"
          className="absolute right-5 top-5 active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-pink-600 hover:bg-pink-700 transition text-white rounded-md flex"
        >
          <XIcon />
        </button>

        {/* ✅ Mobile content */}
        <div className="h-full w-full flex flex-col items-center justify-center text-lg gap-8">
          {/* ✅ Language (mobile) */}
          <div className="rounded-full border border-pink-900 bg-pink-950/30 px-4 py-2">
            <LanguageSwitcher />
          </div>

          {/* ✅ Links */}
          {navItems.map((item) => (
            <NavItemLink
              key={item.to}
              to={item.to}
              label={item.label}
              onClick={closeMenu}
              className="text-white"
            />
          ))}

          {/* extra link login */}
          <NavItemLink
            to="/login"
            label={t("nav.login")}
            onClick={closeMenu}
            className="text-white"
          />
        </div>
      </div>
    </>
  );
}
