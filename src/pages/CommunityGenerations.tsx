import { ArrowRight, DownloadIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { type IThumbnail } from "../assets/assets";
import SoftBackdrop from "../components/SoftBackdrop";
import api from "../configs/api";

const CommunityGenerations = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const aspectRatioClassMap: Record<string, string> = {
    "16:9": "16 / 9",
    "1:1": "1 / 1",
    "9:16": "9 / 16",
  };

  const [thumbnails, setThumbnails] = useState<IThumbnail[]>([]);
  const [loading, setLoading] = useState(false);

  // paginación simple
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPage = async (nextPage: number, mode: "replace" | "append") => {
    try {
      setLoading(true);
      const { data } = await api.get(
        `/api/thumbnail/community?page=${nextPage}&limit=24`,
      );

      const items = (data?.thumbnails || []) as IThumbnail[];
      const totalPages = Number(data?.totalPages || 1);

      setHasMore(nextPage < totalPages);
      setPage(nextPage);

      setThumbnails((prev) => (mode === "append" ? [...prev, ...items] : items));
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (image_url: string) => {
    const link = document.createElement("a");
    link.href = image_url.replace("/upload", "/upload/fl_attachment");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  useEffect(() => {
    fetchPage(1, "replace");
  }, []);

  return (
    <>
      <SoftBackdrop />

      <div className="mt-32 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-200">
            {t("communityGenerations.heading")}
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            {t("communityGenerations.subheading")}
          </p>
        </div>

        {/* Loading skeleton (first load) */}
        {loading && thumbnails.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/6 border border-white/10 animate-pulse h-[260px]"
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && thumbnails.length === 0 && (
          <div className="text-center py-24">
            <h3 className="text-lg font-semibold text-zinc-200">
              {t("communityGenerations.empty.title")}
            </h3>
            <p className="text-sm text-zinc-400 mt-2">
              {t("communityGenerations.empty.subtitle")}
            </p>
          </div>
        )}

        {/* Thumbnails */}
        {thumbnails.length > 0 && (
          <>
            <div className="columns-1 sm:columns-2 lg:columns-3 2xl:columns-4 gap-4">
              {thumbnails.map((thumbnail: IThumbnail) => {
                const aspectClass =
                  aspectRatioClassMap[thumbnail.aspect_ratio || "16:9"];

                const previewUrl = `/preview?thumbnail_url=${encodeURIComponent(
                  thumbnail.image_url ?? "",
                )}&title=${encodeURIComponent(thumbnail.title ?? "")}`;

                return (
                  <div
                    key={thumbnail._id}
                    onClick={() => navigate(previewUrl)}
                    className="mb-8 group relative cursor-pointer rounded-2xl bg-white/6 border border-white/10 transition shadow-xl break-inside-avoid"
                  >
                    {/* Image */}
                    <div
                      className={`relative overflow-hidden rounded-t-2xl ${aspectClass} bg-black`}
                    >
                      {thumbnail.image_url ? (
                        <img
                          src={thumbnail.image_url}
                          alt={thumbnail.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm text-zinc-400">
                          {t("communityGenerations.states.noImage")}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-2">
                      <h3 className="text-sm font-semibold text-zinc-100 line-clamp-2">
                        {thumbnail.title}
                      </h3>

                      <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
                        {thumbnail.style && (
                          <span className="px-2 py-0.5 rounded bg-white/8">
                            {thumbnail.style}
                          </span>
                        )}
                        {thumbnail.color_scheme && (
                          <span className="px-2 py-0.5 rounded bg-white/8">
                            {thumbnail.color_scheme}
                          </span>
                        )}
                        {thumbnail.aspect_ratio && (
                          <span className="px-2 py-0.5 rounded bg-white/8">
                            {thumbnail.aspect_ratio}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-zinc-500">
                        {thumbnail.createdAt
                          ? new Date(thumbnail.createdAt).toDateString()
                          : ""}
                      </p>
                    </div>

                    {/* Actions */}
                    <div
                      className="absolute bottom-2 right-2 max-sm:flex sm:hidden group-hover:flex gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {!!thumbnail.image_url && (
                        <DownloadIcon
                          onClick={() => handleDownload(thumbnail.image_url!)}
                          className="size-6 bg-black/50 p-1 rounded hover:bg-pink-600 transition-all"
                          aria-label={t("communityGenerations.actions.download")}
                        />
                      )}

                      <Link
                        target="_blank"
                        to={previewUrl}
                        aria-label={t("communityGenerations.actions.openPreview")}
                        title={t("communityGenerations.actions.openPreview")}
                      >
                        <ArrowRight className="size-6 bg-black/50 p-1 rounded hover:bg-pink-600 transition-all" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load more */}
            <div className="flex justify-center pb-16">
              {hasMore ? (
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => fetchPage(page + 1, "append")}
                  className="px-6 py-2.5 rounded-full bg-white/8 border border-white/12 text-zinc-100 hover:bg-white/10 active:scale-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading
                    ? t("communityGenerations.button.loading")
                    : t("communityGenerations.button.loadMore")}
                </button>
              ) : (
                <p className="text-xs text-zinc-500">
                  {t("communityGenerations.button.end")}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CommunityGenerations;
