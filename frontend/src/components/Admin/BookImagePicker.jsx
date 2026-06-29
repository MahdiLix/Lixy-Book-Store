import { useEffect, useState } from "react";
import BookCover from "../Books/BookCover";

// Shared between AddBookForm (no existing image, required) and
// EditBookForm (existing image from the DB, optional replace).
// Shows: selected file preview > existing DB image > "No image" placeholder.
export default function BookImagePicker({
  currentImage = "",
  imageFile,
  setImageFile,
  fileInputKey,
  required = false,
  title = "",
}) {
  const [localPreviewUrl, setLocalPreviewUrl] = useState("");

  useEffect(() => {
    if (!imageFile) {
      setLocalPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(imageFile);
    setLocalPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const previewImage = localPreviewUrl || currentImage;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
        Book Image {required && <span className="text-rose-500">*</span>}
      </label>

      <div className="flex items-start gap-4">
        <BookCover image={previewImage} title={title} size="sm" />

        <div className="flex flex-1 flex-col gap-2">
          <input
            key={fileInputKey}
            type="file"
            accept="image/*"
            required={required}
            className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-white hover:file:bg-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />

          {imageFile ? (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Selected: {imageFile.name}
            </p>
          ) : currentImage ? (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Current image shown above — choose a file to replace it.
            </p>
          ) : (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {required ? "Image is required." : "No image set."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}