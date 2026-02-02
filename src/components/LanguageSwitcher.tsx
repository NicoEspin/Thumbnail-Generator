import { useTranslation } from "react-i18next";

type Lang = "es" | "en";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const setLang = (lng: Lang) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
  };

  const isEs = i18n.language?.startsWith("es");
  const isEn = i18n.language?.startsWith("en");

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => setLang("es")}
        className={isEs ? "font-bold" : ""}
        aria-pressed={isEs}
      >
        ES
      </button>

      <button
        type="button"
        onClick={() => setLang("en")}
        className={isEn ? "font-bold" : ""}
        aria-pressed={isEn}
      >
        EN
      </button>
    </div>
  );
}
