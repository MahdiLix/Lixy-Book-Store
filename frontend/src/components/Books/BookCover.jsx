const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

// URLs that are already complete and must NOT be prefixed with the API
// base URL — includes blob: (local file previews via createObjectURL),
// data: (inline base64), and http(s): (absolute links).
const ABSOLUTE_URL_PATTERN = /^(blob:|data:|https?:\/\/)/;

function getImageSrc(bookImage) {
  if (!bookImage) return "";

  if (ABSOLUTE_URL_PATTERN.test(bookImage)) {
    return bookImage;
  }

  // Prevent double slashes when API_BASE_URL ends with '/'
  const base = API_BASE_URL.replace(/\/+$/, "");
  const path = bookImage.startsWith("/") ? bookImage : `/${bookImage}`;
  return `${base}${path}`;
}

export default function BookCover({ image, title, size = "sm" }) {
  const src = getImageSrc(image);

  // FIXED: removed max-h-52 from 'lg', and replaced w-18 with w-20
  const sizeClass =
    size === "xl"
      ? "h-full w-full max-h-[520px]"
      : size === "lg"
        ? "h-full w-full"
        : "h-24 w-20";

  if (!src) {
    return (
      <div
        className={`flex ${sizeClass} items-center justify-center border border-slate-200 bg-slate-100 text-[11px] text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500`}
      >
        No image
      </div>
    );
  }

  return (
    <div
      className={`${sizeClass} overflow-hidden border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800`}
    >
      <img
        src={src}
        alt={title ? `${title} cover` : "book cover"}
        className="h-full w-full object-contain"
        loading="lazy"
      />
    </div>
  );
}
