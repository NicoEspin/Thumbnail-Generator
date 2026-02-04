import { useTranslation } from "react-i18next";
import { colorSchemes } from "../../assets/assets";

const ColorSchemeSelector = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (color: string) => void;
}) => {
  const { t } = useTranslation();

  const selectedName = colorSchemes.find((s) => s.id === value)?.name ?? "";

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-zinc-200">
        {t("selectors.colorScheme.label")}
      </label>

      <div className="grid grid-cols-6 gap-3">
        {colorSchemes.map((schema) => (
          <button
            key={schema.id}
            onClick={() => onChange(schema.id)}
            className={`relative rounded-lg transition-all ${
              value === schema.id ? "ring-2 ring-pink-600" : ""
            }`}
            title={schema.name}
            type="button"
            aria-label={schema.name}
          >
            <div className="flex h-10 rounded-lg overflow-hidden">
              {schema.colors.map((color, i) => (
                <div
                  key={i}
                  className="flex-1"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </button>
        ))}
      </div>

      <p className="text-xs text-zinc-400">
        {t("selectors.colorScheme.selected", { name: selectedName })}
      </p>
    </div>
  );
};

export default ColorSchemeSelector;
