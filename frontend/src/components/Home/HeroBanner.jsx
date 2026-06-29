import { ui } from "../../styles/ui";

export default function HeroBanner({ slides = [] }) {
  if (!slides.length) return null;

  return (
    <section className={ui.heroGrid}>
      {slides.map((slide, i) => (
        <article
          key={slide.id || i}
          className={ui.heroCard}
          style={{ backgroundColor: slide.accentColor || undefined }}
        >
          <div className={ui.heroCardImgWrap}>
            <img src={slide.image} alt={slide.title} className={ui.heroCardImg} />
          </div>

          <div className={ui.heroCardBody}>
            <h3 className={ui.heroCardTitle}>{slide.title}</h3>
            <p className={ui.heroCardDesc}>{slide.description}</p>
            {slide.tags ? <p className={ui.heroCardTag}>{slide.tags}</p> : null}

            <a href={slide.href || "#"} className={ui.heroCardBtn}>
              Now Read!
            </a>
          </div>
        </article>
      ))}
    </section>
  );
}