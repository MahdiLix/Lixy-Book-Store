export default function PriceTag({ book, size = "md" }) {
  if (!book) return null;

  const price = book.price ?? 0;
  const discount = book.discount ?? 0;
  const discountedPrice = book.discountedPrice;

  const hasDiscount = discount > 0 && discountedPrice !== undefined && discountedPrice !== null;

  // Size mappings for reusability
  const sizes = {
    sm: {
      main: "text-sm font-bold text-indigo-600 dark:text-indigo-400",
      old: "text-xs text-slate-400 line-through dark:text-slate-500",
      pill: "rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
    },
    md: {
      main: "text-lg font-bold text-slate-900 dark:text-white",
      old: "text-sm text-slate-400 line-through dark:text-slate-500",
      pill: "rounded-lg bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
    },
    lg: {
      main: "text-3xl font-extrabold text-slate-900 dark:text-white",
      old: "text-lg text-slate-400 line-through dark:text-slate-500",
      pill: "rounded-lg bg-emerald-50 px-2 py-1 text-sm font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
    }
  };

  const activeSize = sizes[size] || sizes.md;

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {hasDiscount ? (
        <>
          <span className={activeSize.old}>${price.toFixed(2)}</span>
          <span className={activeSize.main}>${discountedPrice.toFixed(2)}</span>
          <span className={activeSize.pill}>-{discount}%</span>
        </>
      ) : (
        <span className={activeSize.main}>${price.toFixed(2)}</span>
      )}
    </div>
  );
}