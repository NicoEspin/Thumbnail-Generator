import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  colorSchemes,
  type AspectRatio,
  type IThumbnail,
  type ThumbnailStyle,
} from "../assets/assets";
import PreviewPanel from "../components/PreviewPanel";
import AspectRatioSelector from "../components/Selectors/AspectRatioSelector";
import ColorSchemeSelector from "../components/Selectors/ColorSchemeSelector";
import StyleSelector from "../components/Selectors/StyleSelector";
import ReferenceImagesSelector, {
  type ReferenceRole,
} from "../components/Selectors/ReferenceImagesSelector";
import SoftBackdrop from "../components/SoftBackdrop";
import api from "../configs/api";
import { useAuth } from "../context/AuthContext";

const Generate = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [title, setTitle] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null);
  const [loading, setLoading] = useState(false);

  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
  const [colorSchemeId, setColorSchemeId] = useState<string>(
    colorSchemes[0].id,
  );
  const [style, setStyle] = useState<ThumbnailStyle>("Bold & Graphic");
  const [styleDropdownOpen, setStyleDropdownOpen] = useState(false);

  // ✅ Visibilidad
  const [isPublic, setIsPublic] = useState(true);
  const [savingVisibility, setSavingVisibility] = useState(false);

  // ✅ Referencias (solo para generación, no se editan una vez creado el doc)
  const [referenceFiles, setReferenceFiles] = useState<File[]>([]);
  const [referenceRoles, setReferenceRoles] = useState<ReferenceRole[]>([]);

  const isLocked = Boolean(id); // cuando hay id, no editamos prompts/selecciones

  const handleGenerate = async () => {
    try {
      if (!isLoggedIn)
        return toast.error("You must be logged in to generate a thumbnail");
      if (!title.trim()) return toast.error("Title is required");

      setLoading(true);

      const fd = new FormData();
      fd.append("title", title);
      fd.append("prompt", additionalDetails);
      fd.append("style", style);
      fd.append("aspect_ratio", aspectRatio);
      fd.append("color_scheme", colorSchemeId);
      fd.append("text_overlay", "true");
      fd.append("isPublic", String(isPublic));

      // reference_hint opcional: "img1=person,img2=background"
      const hintParts = referenceRoles
        .map((r, idx) => (r && r !== "auto" ? `img${idx + 1}=${r}` : null))
        .filter(Boolean) as string[];

      if (hintParts.length) {
        fd.append("reference_hint", hintParts.join(","));
      }

      // imágenes: field name exacto del backend
      for (const f of referenceFiles) {
        fd.append("reference_images", f);
      }

      const { data } = await api.post("/api/thumbnail/generate", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data?.thumbnail?._id) {
        navigate(`/generate/${data.thumbnail._id}`);
        toast.success("Thumbnail generated successfully");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchThumbnail = async () => {
    try {
      const { data } = await api.get(`/api/user/thumbnails/${id}`);

      const th = data?.thumbnail as IThumbnail | undefined;
      if (!th) return;

      setThumbnail(th);
      setLoading(!th.image_url);

      setAdditionalDetails(th.user_prompt || "");
      setTitle(th.title || "");
      setColorSchemeId(th.color_scheme || colorSchemes[0].id);
      setAspectRatio((th.aspect_ratio as AspectRatio) || "16:9");
      setStyle((th.style as ThumbnailStyle) || "Bold & Graphic");

      // ✅ si no viene del backend (por compat), default true
      setIsPublic(typeof th.isPublic === "boolean" ? th.isPublic : true);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const updateVisibility = async (next: boolean) => {
    if (savingVisibility) return;

    const prev = isPublic; // rollback exacto
    setIsPublic(next);

    // si todavía no existe en DB (no hay id), solo guardamos estado local
    if (!id) return;

    try {
      setSavingVisibility(true);
      await api.patch(`/api/thumbnail/${id}/visibility`, { isPublic: next });

      setThumbnail((p) => (p ? { ...p, isPublic: next } : p));
      toast.success(next ? "Now public" : "Now private");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message);

      // rollback UI
      setIsPublic(prev);
    } finally {
      setSavingVisibility(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn && id) fetchThumbnail();

    if (id && loading && isLoggedIn) {
      const interval = setInterval(() => {
        fetchThumbnail();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [id, loading, isLoggedIn]);

  useEffect(() => {
    if (!id && thumbnail) setThumbnail(null);
  }, [pathname]);

  // ✅ limpiar referencias al cambiar de pantalla (por ejemplo, volver a /generate sin id)
  useEffect(() => {
    if (!id) {
      setReferenceFiles([]);
      setReferenceRoles([]);
    }
  }, [pathname, id]);

  const publicBadge = useMemo(() => {
    return isPublic ? (
      <span className="text-[11px] px-2 py-0.5 rounded bg-pink-500/20 text-pink-200 border border-pink-500/20">
        {t("generate.publicBadge")}
      </span>
    ) : (
      <span className="text-[11px] px-2 py-0.5 rounded bg-white/10 text-zinc-200 border border-white/10">
        {t("generate.privateBadge")}
      </span>
    );
  }, [isPublic, t]);

  return (
    <>
      <SoftBackdrop />

      <div className="pt-24 min-h-screen">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8">
          <div className="grid lg:grid-cols-[400px_1fr] gap-8">
            {/* Left */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-zinc-100 mb-1">
                      {t("generate.heading")}
                    </h2>
                    <p className="text-sm text-zinc-400">
                      {t("generate.subheading")}
                    </p>
                  </div>

                  {publicBadge}
                </div>

                {/* ✅ Visibilidad (SIEMPRE editable) */}
                <div className="rounded-xl bg-white/6 border border-white/10 px-4 py-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-zinc-100">
                      {t("generate.form.publicLabel")}
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {t("generate.form.publicHint")}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center select-none">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={isPublic}
                      disabled={savingVisibility || (!isLoggedIn && !!id)}
                      onChange={(e) => updateVisibility(e.target.checked)}
                    />

                    <div
                      className={[
                        "relative h-6 w-11 rounded-full border border-white/12 bg-white/10 transition-colors",
                        "peer-checked:bg-pink-600 peer-checked:border-pink-500",
                        "peer-disabled:opacity-60",
                        // Thumb (centrado real)
                        "after:content-[''] after:absolute after:left-0.5 after:top-1/2 after:-translate-y-1/2",
                        "after:h-5 after:w-5 after:rounded-full after:bg-white/90 after:shadow-sm",
                        "after:transition-transform",
                        "peer-checked:after:translate-x-5",
                      ].join(" ")}
                    />
                  </label>
                </div>

                {/* Inputs bloqueados si hay id */}
                <div
                  className={isLocked ? "pointer-events-none opacity-60" : ""}
                >
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

                    <AspectRatioSelector
                      value={aspectRatio}
                      onChange={setAspectRatio}
                    />

                    <StyleSelector
                      value={style}
                      onChange={setStyle}
                      isOpen={styleDropdownOpen}
                      setIsOpen={setStyleDropdownOpen}
                    />

                    <ColorSchemeSelector
                      value={colorSchemeId}
                      onChange={setColorSchemeId}
                    />

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

                    {/* ✅ Referencias: solo cuando NO hay id */}
                    {!id && (
                      <ReferenceImagesSelector
                        files={referenceFiles}
                        onFilesChange={(next) => {
                          setReferenceFiles(next);
                          setReferenceRoles((prev) =>
                            prev.slice(0, next.length),
                          );
                        }}
                        roles={referenceRoles}
                        onRolesChange={setReferenceRoles}
                        disabled={loading}
                      />
                    )}
                  </div>

                  {/* Button */}
                  {!id && (
                    <button
                      className="mt-6 text-[15px] w-full py-3.5 rounded-xl font-medium bg-linear-to-b from-pink-500 to-pink-600 hover:from-pink-700 disabled:cursor-not-allowed transition-colors"
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

                {/* ✅ Mostrar referencias guardadas cuando hay id */}
                {!!id && (thumbnail?.reference_images?.length ?? 0) > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-zinc-100 mb-2">
                      {t("generate.form.referenceImages.savedLabel")}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {(thumbnail?.reference_images || [])
                        .slice(0, 2)
                        .map((u, i) => (
                          <div
                            key={`${u}-${i}`}
                            className="rounded-xl overflow-hidden border border-white/10 bg-black/20 aspect-video"
                          >
                            <img
                              src={u}
                              alt={`reference-${i + 1}`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Generate;
