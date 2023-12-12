import PromoSlider from '../promo-slider/promo-slider';
import ThumbnailSpecGym from '../thumbnail-spec-gym/thumbnail-spec-gym';

function SpecialOffers():JSX.Element {
  return (
    <section className="special-offers">
      <div className="container">
        <div className="special-offers__wrapper">
          <h2 className="visually-hidden">Специальные предложения</h2>
          <PromoSlider/>
          <ThumbnailSpecGym />
        </div>
      </div>
    </section>
  );
}

export default SpecialOffers;
