import { ui } from "../../styles/ui";

export default function PromoBanner({ image, title, subtitle }) {
  const hasTitle = title && subtitle;

  return (
    <section className={ui.promoBanner}>
      <img src={image} alt={title} className={ui.promoBannerImg} />
      {hasTitle && (
        <div className={ui.promoBannerOverlay}>
          <h2 className={ui.promoBannerTitle}>{title}</h2>
          <p className={ui.promoBannerSub}>{subtitle}</p>
        </div>
      )}
    </section>
  );
}
