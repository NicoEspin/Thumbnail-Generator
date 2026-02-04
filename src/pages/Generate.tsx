import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  colorSchemes,
  dummyThumbnails,
  type AspectRatio,
  type IThumbnail,
  type ThumbnailStyle,
} from "../assets/assets";
import SoftBackdrop from "../components/SoftBackdrop";
import AspectRatioSelector from "../components/Selectors/AspectRatioSelector";
import StyleSelector from "../components/Selectors/StyleSelector";
import ColorSchemeSelector from "../components/Selectors/ColorSchemeSelector";
import PreviewPanel from "../components/PreviewPanel";

const Generate = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null);
  const [loading, setLoading] = useState(false);

  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("1:1");
  const [colorSchemeId, setColorSchemeId] = useState<string>(
    colorSchemes[0].id,
  );
  const [style, setStyle] = useState<ThumbnailStyle>("Bold & Graphic");

  const [styleDropdownOpen, setStyleDropdownOpen] = useState(false);

  const handleGenerate = async () => {
    // TODO: tu lógica real de generación
  };

  const fetchThumbnail = async () => {
    if (!id) return;

    const found: any = dummyThumbnails.find((tmb) => tmb._id === id);
    if (!found) return;

    setThumbnail(found);
    setAdditionalDetails(found.user_prompt ?? "");
    setTitle(found.title ?? "");
    setColorSchemeId(found.colorSchemeId ?? colorSchemes[0].id);
    setAspectRatio(found.aspect_ratio ?? "1:1");
    setStyle(found.style ?? "Bold & Graphic");
    setLoading(false);
  };

  useEffect(() => {
    if (id) fetchThumbnail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <SoftBackdrop />

      <div className="pt-24 min-h-screen">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8">
          <div className="grid lg:grid-cols-[400px_1fr] gap-8">
            {/* Left */}
            <div className={`space-y-6 ${id ? "pointer-events-none" : ""}`}>
              <div className="p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-zinc-100 mb-1">
                    {t("generate.heading")}
                  </h2>
                  <p className="text-sm text-zinc-400">
                    {t("generate.subheading")}
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      {t("generate.form.titleLabel")}
                    </label>

                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      maxLength={100}
                      className="w-full px-4 py-3 rounded-lg border border-white/12 bg-black/20 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder={t("generate.form.titlePlaceholder")}
                    />

                    <div className="flex justify-end">
                      <span className="text-xs text-zinc-400">
                        {title.length}/100
                      </span>
                    </div>
                  </div>

                  {/* Aspect Ratio */}
                  <AspectRatioSelector
                    value={aspectRatio}
                    onChange={setAspectRatio}
                  />

                  {/* Style */}
                  <StyleSelector
                    value={style}
                    onChange={setStyle}
                    isOpen={styleDropdownOpen}
                    setIsOpen={setStyleDropdownOpen}
                  />

                  {/* Colors */}
                  <ColorSchemeSelector
                    value={colorSchemeId}
                    onChange={setColorSchemeId}
                  />

                  {/* Details */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      {t("generate.form.additionalLabel")}{" "}
                      <span className="text-zinc-400 text-xs">
                        {t("generate.form.optional")}
                      </span>
                    </label>

                    <textarea
                      value={additionalDetails}
                      onChange={(e) => setAdditionalDetails(e.target.value)}
                      rows={3}
                      placeholder={t("generate.form.additionalPlaceholder")}
                      className="w-full px-4 py-3 rounded-lg border border-white/12 bg-white/6 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                    />
                  </div>
                </div>

                {/* Button */}
                {!id && (
                  <button
                    className="text-[15px] w-full py-3.5 rounded-xl font-medium bg-linear-to-b from-pink-500 to-pink-600 hover:from-pink-700 disabled:cursor-not-allowed transition-colors"
                    onClick={handleGenerate}
                    disabled={loading}
                  >
                    {loading
                      ? t("generate.button.generating")
                      : t("generate.button.generate")}
                  </button>
                )}
              </div>
            </div>

            {/* Right */}
            <div>
              <div className="p-6 rounded-2xl bg-white/8 border border-white/10 shadow-xl">
                <h2 className="text-lg font-semibold text-zinc-100 mb-4">
                  {t("generate.preview.title")}
                </h2>

                <PreviewPanel
                  thumbnail={thumbnail}
                  isLoading={loading}
                  aspectRatio={aspectRatio}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Generate;
