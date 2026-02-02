import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { yt_html } from "../assets/assets";

const YTPreview = () => {
  const [searchParams] = useSearchParams();

  const thumbnail_url = searchParams.get("thumbnail_url");
  const title = searchParams.get("title");

  const new_html = useMemo(() => {
    if (!thumbnail_url || !title) return null;

    // OJO: searchParams.get() ya devuelve el valor decodificado normalmente
    return yt_html
      .replaceAll("%%THUMBNAIL_URL%%", thumbnail_url)
      .replaceAll("%%TITLE%%", title);
  }, [thumbnail_url, title]);

  if (!new_html) {
    return (
      <div className="fixed inset-0 z-100 bg-black text-white flex items-center justify-center">
        Missing query params: thumbnail_url / title
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-100 bg-black">
      <iframe
        srcDoc={new_html}
        width="100%"
        height="100%"
        allowFullScreen
        title="YT Preview"
      />
    </div>
  );
};

export default YTPreview;
