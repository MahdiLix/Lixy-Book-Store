const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

function getImageSrc(bookImage) {
  if (!bookImage) return "";

  if (
    bookImage.startsWith("http://") ||
    bookImage.startsWith("https://") ||
    bookImage.startsWith("data:")
  ) {
    return bookImage;
  }

  if (bookImage.startsWith("/")) {
    return `${API_BASE_URL}${bookImage}`;
  }

  return `${API_BASE_URL}/${bookImage}`;
}

export default function BookCover({ image, title }) {
  const src = getImageSrc(image);

  if (!src) {
    return (
      <div className="flex h-24 w-18 items-center justify-center border border-slate-200 bg-slate-100 text-[11px] text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500">
        No image
      </div>
    );
  }

  return (
    <div className="h-24 w-18 overflow-hidden border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      <img
        src={src}
        alt={title ? `${title} cover` : "book cover"}
        className="h-full w-full object-contain"
        loading="lazy"
      />
    </div>
  );
}
