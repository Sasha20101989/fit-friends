import PromoSliderItem from '../promo-slider-item/promo-slider-item';
import ThumbnailSpecGym from '../thumbnail-spec-gym/thumbnail-spec-gym';

function SpecialOffers():JSX.Element {
  return (
    <section className="special-offers">
      <div className="container">
        <div className="special-offers__wrapper">
          <h2 className="visually-hidden">Специальные предложения</h2>
          <ul className="special-offers__list">
            <PromoSliderItem
              title="Fitball"
              imageSrc="img/content/promo-1.png"
              text="Горячие предложения на тренировки на фитболе"
              price={1600}
              sup="за занятие"
              oldPrice={2000}
            />
            <PromoSliderItem
              title="Fleksbend"
              imageSrc="img/content/promo-2.png"
              text="Горячие предложения на&nbsp;Тренировки с&nbsp;резинкой для фитнеса"
              price={2400}
              sup="за занятие"
              oldPrice={2800}
            />
            <PromoSliderItem
              title="Full Body Stretch"
              imageSrc="img/content/promo-3.png"
              text="Горячие предложения на&nbsp;Комплекс упражнений на&nbsp;растяжку всего тела для новичков"
              price={1800}
              sup="за занятие"
              oldPrice={2200}
            />
          </ul>
          <ThumbnailSpecGym />
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
