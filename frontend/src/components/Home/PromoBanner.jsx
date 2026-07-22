import { useNavigate } from "react-router-dom";
import { ui } from "../../styles/ui";

export default function PromoBanner({ image, title, subtitle }) {
  const navigate = useNavigate();
  const hasTitle = title && subtitle;

  return (
    <section
      className={`${ui.promoBanner} cursor-pointer`}
      onClick={() => navigate("/books")}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        // Allows keyboard navigation: tab then (Enter or Space) for accessibility
        if (e.key === "Enter" || e.key === " ") {
          navigate("/books");
        }
      }}
    >
      <img
        src={image}
        alt={title || "Promo Banner"}
        className={ui.promoBannerImg}
      />

      {hasTitle && (
        <div className={ui.promoBannerOverlay}>
          <h2 className={ui.promoBannerTitle}>{title}</h2>
          <p className={ui.promoBannerSub}>{subtitle}</p>
        </div>
      )}
    </section>
  );
}
