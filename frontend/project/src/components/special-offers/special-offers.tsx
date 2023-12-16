import { memo } from 'react';
import { Training } from '../../types/training.type.js';
import PromoSlider from '../promo-slider/promo-slider';
import ThumbnailSpecGym from '../thumbnail-spec-gym/thumbnail-spec-gym';

type SpecialOffersProps = {
  specialTrainings: Training[];
  activeSlide: number;
  onDotClick: (index: number) => void;
}

function SpecialOffers({specialTrainings, activeSlide, onDotClick}: SpecialOffersProps):JSX.Element {
  return (
    <section className="special-offers">
      <div className="container">
        <div className="special-offers__wrapper">
          <h2 className="visually-hidden">Специальные предложения</h2>
          {specialTrainings.length > 0 ?
            <PromoSlider specialTrainings={specialTrainings} activeSlide={activeSlide} onDotClick={onDotClick}/> :
            <ThumbnailSpecGym />}
        </div>
      </div>
    </section>
  );
}

export default memo(SpecialOffers);
