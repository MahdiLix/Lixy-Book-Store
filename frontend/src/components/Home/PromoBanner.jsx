import { ui } from "../../styles/ui";

export default function PromoBanner({
  image,
  title = "This Week's Pick",
  subtitle = "Hand-picked stories our readers can't put down.",
}) {
  return (
    <section className={ui.promoBanner}>
      <img src={image} alt={title} className={ui.promoBannerImg} />
      <div className={ui.promoBannerOverlay}>
        <h2 className={ui.promoBannerTitle}>{title}</h2>
        <p className={ui.promoBannerSub}>{subtitle}</p>
      </div>
    </section>
  );
}