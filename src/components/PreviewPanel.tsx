import { DownloadIcon, ImageIcon, Loader2Icon } from "lucide-react";
import type { AspectRatio, IThumbnail } from "../assets/assets";

const PreviewPanel = ({
  thumbnail,
  isLoading,
  aspectRatio,
}: {
  thumbnail: IThumbnail | null;
  isLoading: boolean;
  aspectRatio: AspectRatio;
}) => {
  const ratioMap: Record<AspectRatio, string> = {
    "16:9": "16 / 9",
    "1:1": "1 / 1",
    "9:16": "9 / 16",
  };

  const onDownload = () => {
    if (!thumbnail?.image_url) return;
    const link = document.createElement("a");
    link.href = thumbnail?.image_url.replace(
      "/upload",
      "/upload/fl_attachment",
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const hasImage = !!thumbnail?.image_url;

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      {/* ✅ Frame con alto estable SIEMPRE */}
      <div
        className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-black/25"
        style={{ aspectRatio: ratioMap[aspectRatio] }}
      >
        {/* ✅ Imagen también absoluta (misma caja que el empty/loading) */}
        {hasImage && (
          <div className="group absolute inset-0">
            <img
              src={thumbnail!.image_url}
              alt={thumbnail?.title}
              className="block h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-end justify-center bg-black/10 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                type="button"
                className="mb-6 flex items-center gap-2 rounded-md px-5 py-2.5 text-xs font-medium transition bg-white/30 ring-2
                ring-white/40 backdrop-blur hover:scale-105 active:scale-95"
                onClick={onDownload}
              >
                <DownloadIcon className="h-4 w-4" />
                Download Thumbnail
              </button>
            </div>
          </div>
        )}

        {/* ✅ Empty (sin m-2 para que NO se vea más chico) */}
        {!isLoading && !hasImage && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="absolute inset-0 rounded-xl border-2 border-dashed border-white/20" />
            <div className="relative flex size-20 items-center justify-center rounded-full bg-white/10">
              <ImageIcon className="size-10 text-white opacity-50" />
            </div>
            <div className="relative px-4 text-center">
              <p className="text-zinc-200 font-medium">
                Generate your first thumbnail
              </p>
              <p className="text-xs mt-1 text-zinc-400">
                Fill out the form and click Generate
              </p>
            </div>
          </div>
        )}

        {/* ✅ Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 backdrop-blur-md">
            <div className="absolute inset-0 bg-black/25" />
            <Loader2Icon className="relative size-8 animate-spin text-zinc-400" />
            <div className="relative text-center">
              <p className="text-sm font-medium text-zinc-200">
                AI is creating your thumbnail
              </p>
              <p className="text-xs mt-1 text-zinc-400">
                This may take a few seconds
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
