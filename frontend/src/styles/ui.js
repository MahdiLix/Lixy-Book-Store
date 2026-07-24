export const ui = {
  // New global container – adds side padding only between 400px and 639px,
  // and removes it completely on very small screens (<400px)
  globalContainer: "mx-auto w-full max-w-[1600px] px-10 sm:px-[50px]",

  // Merged layout styles here (removed duplicates from bottom)
  page: "min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100",
  container: "mx-auto w-full max-w-7xl px-10 sm:px-8 lg:px-10",
  fixedHeader:
    "fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95",
  pageTopSpace: "pt-24 sm:pt-28 flex-grow",

  card: "rounded-2xl bg-white shadow-soft ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800",
  cardBody: "p-4 sm:p-6",
  sectionTitle: "text-xl font-bold text-slate-900 dark:text-white",
  sectionSub: "mt-1 text-sm text-slate-500 dark:text-slate-400",
  input:
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100",
  select:
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100",
  primaryBtn:
    "inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-500",
  secondaryBtn:
    "inline-flex items-center justify-center rounded-xl bg-slate-200 px-4 py-3 font-medium text-slate-900 transition hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700",
  dangerBtn:
    "inline-flex items-center justify-center rounded-xl bg-rose-600 px-4 py-3 font-medium text-white transition hover:bg-rose-500",
  ghostBtn:
    "inline-flex items-center justify-center rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800",
  iconBtn:
    "inline-flex h-10 items-center justify-center rounded-xl border border-slate-300 px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800",
  notice:
    "rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200",
  success:
    "rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200",
  error:
    "rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200",
  overlay:
    "fixed inset-0 z-20 pointer-events-none bg-slate-950/20 backdrop-blur-[2px] dark:bg-black/30",
  rowWrap: "flex justify-center",
  tableWrap:
    "w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900",
  table: "min-w-[980px] w-full border-separate border-spacing-y-3 px-3",
  th: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400",
  td: "px-4 py-4 text-sm text-slate-800 dark:text-slate-200",
  tr: "bg-slate-50 dark:bg-slate-950/50",
  headerGrid: "grid h-20 grid-cols-[auto_1fr_auto] items-center gap-3",
  headerTitle:
    "text-lg font-bold tracking-wide text-slate-900 dark:text-white sm:text-2xl",

  // Book card grid - Added horizontal padding at 600px and 930px to prevent stretching
  booksGrid:
    "grid grid-cols-1 min-[600px]:grid-cols-2 min-[930px]:grid-cols-3 lg:grid-cols-4 gap-5 min-[600px]:px-15  min-[400px]:px-8 min-[930px]:px-16 lg:px-0",

  // Search results grid - Added horizontal padding at 600px and 930px to prevent stretching
  searchResultsGrid:
    "grid grid-cols-1 min-[600px]:grid-cols-2 min-[930px]:grid-cols-3 lg:grid-cols-4 gap-5  min-[600px]:px-15  min-[400px]:px-8 min-[930px]:px-16 lg:px-0",

  //  Added h-full so all cards in a row stretch to the same height
  bookCard:
    "group relative flex flex-col h-full overflow-hidden rounded-2xl bg-white p-4 shadow-soft ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-slate-900 dark:ring-slate-800",
  bookCardBadge:
    "absolute top-3 left-3 z-10 rounded-full bg-rose-600 px-3 py-1 text-[11px] font-bold text-white shadow",

  //  p-0 + bg-transparent to remove free space around book images
  bookCardCoverWrap:
    "mb-4 flex items-center justify-center rounded-xl bg-transparent aspect-[3/4] w-full overflow-hidden p-0",

  // Added min-h-[2.5rem] to reserve space for exactly 2 lines of text
  bookCardTitle:
    "line-clamp-2 text-sm font-semibold text-slate-900 dark:text-slate-100 min-h-[2.5rem]",

  // Added line-clamp-1 to prevent long author names from wrapping
  bookCardSub: "mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-1",

  bookCardMetaRow:
    "mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400",
  bookCardRating: "flex items-center gap-1 text-amber-500",

  //  Added mt-auto to push the footer (price) to the bottom of the card
  bookCardFooter: "mt-auto pt-3 flex items-end justify-between gap-2",
  bookCardPriceWrap: "flex flex-col",
  bookCardOldPrice: "text-xs text-slate-400 line-through dark:text-slate-500",
  bookCardPrice: "text-base font-bold text-slate-900 dark:text-white",
  bookCardDiscountPill:
    "rounded-lg bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",

  //   Added w-fit so the badge doesn't stretch the full width of the card
  bookCardStock:
    "mt-2 inline-flex items-center gap-1 rounded-lg bg-indigo-50 px-2 py-1 text-[11px] font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 w-fit",
  bookCardOutOfStock:
    "mt-2 inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400 w-fit",

  // Home page container – uses the same responsive breakpoints (0px, 400px, 640px)
  homeContainer: "mx-auto w-full max-w-[1600px] px-10 sm:px-[50px]",

  // New Home header (now theme-aware: light + dark)
  homeHeader:
    "fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950",
  homeHeaderRow: "flex h-20 items-center gap-4 sm:gap-6 px-10 sm:px-[50px]",
  homeLogoLink: "flex items-center gap-3 shrink-0",
  homeLogoImg: "h-10 w-10 object-contain",
  homeLogoText:
    "hidden md:inline text-2xl font-semibold text-slate-900 dark:text-white whitespace-nowrap",
  homeSearchWrap: "relative flex-1 max-w-3xl mx-auto w-full",
  homeSearchInput:
    "w-full rounded-xl bg-slate-100 border border-slate-200 px-10 sm:px-11 py-2.5 sm:py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:placeholder-slate-500",
  homeSearchIcon:
    "absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500",
  homeHeaderActions: "flex items-center gap-1 sm:gap-3 shrink-0",
  homeIconBtn:
    "flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
  homeLoginBtn:
    "rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800",
  homeAvatarBtn:
    "flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-700 ring-2 ring-slate-300 transition hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:ring-slate-600 dark:hover:bg-slate-600",

  // Genre bar — left-aligned on mobile, centered on desktop, scrollable
  genreBar:
    "flex items-center justify-start sm:justify-center gap-6 sm:gap-8 overflow-x-auto px-10 sm:px-[50px] py-4 sm:py-5 bg-white dark:bg-slate-950 whitespace-nowrap",
  genreItem:
    "text-sm font-medium text-slate-500 whitespace-nowrap transition hover:text-slate-900 cursor-pointer dark:text-slate-400 dark:hover:text-white",
  genreItemActive:
    "text-sm font-semibold text-slate-900 whitespace-nowrap cursor-pointer dark:text-white",

  // Hero banner - keep the same card style from 400px to 800px
  heroGrid: "grid grid-cols-1 gap-5 min-[800px]:grid-cols-3",

  // Card stays horizontal from 400px up to 800px
  heroCard:
    "relative flex flex-col w-full h-auto overflow-hidden rounded-2xl   min-[400px]:flex-row min-[400px]:h-64",

  // Image becomes left side from 400px and keeps the same look
  heroCardImgWrap:
    "relative w-full h-48 min-[400px]:w-2/5 min-[400px]:h-full shrink-0 overflow-hidden",

  heroCardImg: "h-full w-full object-cover",

  heroCardBody: "flex flex-1 flex-col justify-center gap-3 p-5",

  heroCardTitle: "text-2xl font-bold text-white",

  heroCardDesc: "text-xs leading-relaxed text-white/80 line-clamp-4",

  heroCardTag: "text-xs text-white/70",

  heroCardBtn:
    "mt-1 inline-flex w-fit items-center justify-center rounded-lg border border-white/70 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10",

  // ===== Promo banner (Hidden on small screens) =====
  promoBanner:
    "relative overflow-hidden rounded-2xl w-full max-w-[1700px] mx-auto h-[350px] hidden md:block",
  promoBannerImg: "absolute inset-0 w-full h-full rounded-2xl object-cover",
  promoBannerOverlay:
    "absolute inset-0 flex flex-col items-start justify-center gap-2 bg-gradient-to-r from-slate-950/70 via-slate-950/30 to-transparent px-8 rounded-2xl",
  promoBannerTitle: "text-2xl sm:text-3xl font-bold text-white",
  promoBannerSub: "text-sm text-white/80 max-w-md",

  // Book carousel — FIXED: Show 2 books between 450px and 640px
  carouselSection: "",
  carouselHeadingRow: "mb-4 flex items-center justify-between",
  carouselHeading:
    "text-lg sm:text-xl font-bold text-slate-900 dark:text-white",
  carouselViewAll:
    "flex items-center gap-1 text-sm font-medium text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300",
  carouselTrack:
    "flex gap-4 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
  carouselItem:
    "snap-start shrink-0 w-[85%] min-[450px]:w-[48%] sm:w-[31%] md:w-[23%] lg:w-[18%] min-w-[150px]",
  carouselArrowBtn:
    "absolute top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-md ring-1 ring-slate-200 transition hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-700",

  // Search results page layout - stack on mobile
  searchPageLayout: "flex flex-col lg:flex-row gap-4 lg:gap-8 items-start",
  searchSidebar:
    "hidden lg:block w-64 shrink-0 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900",
  searchSidebarSearch:
    "mb-5 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-950",
  searchSidebarSearchInput:
    "w-full bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none dark:text-slate-200 dark:placeholder-slate-500",
  searchSidebarGroupTitle:
    "mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400",
  searchSidebarGroupTitleUnderline:
    "mb-3 border-b border-slate-200 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:text-slate-400",
  searchSidebarRow:
    "flex items-center gap-2 py-1.5 text-sm text-slate-700 dark:text-slate-300",
  searchSidebarCheckbox:
    "h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800",
  searchResultsHeading:
    "mb-5 text-lg font-semibold text-slate-900 dark:text-white",
  //  1 column on mobile
  // searchResultsGrid:
  //   "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5",

  // Book detail page
  detailLayout: "flex flex-col gap-10 md:flex-row md:items-start",
  detailCoverWrap: "w-full max-w-[400px] shrink-0",
  detailInfoList: "flex flex-col gap-5",
  detailInfoRow: "text-base text-slate-700 dark:text-slate-200",
  detailInfoLabel: "font-medium text-slate-900 dark:text-white",
  detailSectionHeading:
    "mt-10 text-lg font-semibold text-slate-900 dark:text-white",
  detailIntroText:
    "mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300",

  // ===== Cart =====
  cartIconBtn:
    "relative flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
  cartBadge:
    "absolute -top-0.5 -right-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-rose-600 px-1 text-[11px] font-bold text-white ring-2 ring-white dark:ring-slate-950",

  addToCartBtn:
    "inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-400",
  addToCartSuccess:
    "inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white dark:bg-emerald-500",

  cartLayout: "grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]",
  cartItems: "flex flex-col gap-4",
  cartItem:
    "flex gap-4 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800",
  cartItemCover: "h-28 w-20 shrink-0",
  cartItemInfo: "flex flex-1 flex-col gap-1",
  cartItemTitle:
    "line-clamp-2 text-sm font-semibold text-slate-900 dark:text-white",
  cartItemSub: "text-xs text-slate-500 dark:text-slate-400",
  cartItemPrice: "text-sm font-bold text-indigo-600 dark:text-indigo-400",
  cartQtyControl: "flex items-center gap-2 self-end",
  cartQtyBtn:
    "flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800",
  cartQtyValue:
    "min-w-[24px] text-center text-sm font-medium text-slate-900 dark:text-white",
  cartRemoveBtn:
    "flex h-9 w-9 items-center justify-center self-end rounded-lg text-rose-500 transition hover:bg-rose-50 dark:hover:bg-rose-950/40",
  cartSummary:
    "rounded-2xl bg-white p-5 shadow-soft ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800 lg:sticky lg:top-28 h-fit",
  cartSummaryRow: "flex items-center justify-between py-2",
  cartSummaryValue: "text-sm font-medium text-slate-900 dark:text-white",
  cartSummaryTotal:
    "mt-2 border-t border-slate-200 py-3 text-base font-bold text-slate-900 dark:border-slate-800 dark:text-white",
  cartEmptyIcon:
    "flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500",

  // ===== Book Detail Page Additions =====
  detailPrice: "text-3xl font-extrabold text-slate-900 dark:text-white",
  detailOldPrice: "text-lg text-slate-400 line-through dark:text-slate-500",
  detailDiscountPill:
    "rounded-lg bg-emerald-50 px-2 py-1 text-sm font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",

  detailCartControls: "flex items-center gap-3 flex-wrap",
  detailRemoveBtn:
    "flex h-10 w-10 items-center justify-center rounded-xl border border-rose-300 text-rose-600 transition hover:bg-rose-50 dark:border-rose-900 dark:text-rose-400 dark:hover:bg-rose-950/40",

  // ===== User Dropdown =====
  dropdownPanel:
    "w-56 sm:w-64 rounded-2xl bg-white shadow-lg ring-1 ring-slate-200 p-2 dark:bg-slate-900 dark:ring-slate-800 absolute right-0 mt-2 z-40",
  dropdownHeader: "px-3 py-2",
  dropdownName: "text-sm font-semibold text-slate-900 dark:text-white",
  dropdownEmail: "text-xs text-slate-500 dark:text-slate-400 truncate",
  dropdownDivider: "my-1 border-t border-slate-200 dark:border-slate-800",

  dropdownItem:
    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-700 transition w-full text-left cursor-pointer",

  // ===== Pagination =====
  paginationWrap: "flex justify-center items-center gap-2 mt-10 flex-wrap",
  pageBtn:
    "flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent dark:disabled:hover:bg-transparent",
  pageBtnActive:
    "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:border-indigo-500 dark:hover:bg-indigo-400",

  // ===== Footer =====
  footer:
    "bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 mt-10",
  footerHeading:
    "text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white",
  footerLink:
    "text-sm text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition",
  footerSocialIcon:
    "flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-indigo-600 hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-indigo-600 dark:hover:text-white",
};
