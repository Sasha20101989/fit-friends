import { memo } from 'react';

type PopupCertificatesProps = {
  certificates: string[];
  onClose: () => void;
}

function PopupCertificates({certificates, onClose}: PopupCertificatesProps): JSX.Element {

  return (
    <div className="popup-form popup-form--membership">
      <section className="popup">
        <h2 className="visually-hidden">Слайдер с сертификатами.</h2>
        <div className="popup__wrapper">
          <div className="popup-head">
            <h2 className="popup-head__header">Сертификаты</h2>
            <button className="btn-icon btn-icon--outlined btn-icon--big" type="button" aria-label="close" onClick={onClose}>
              <svg width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-cross"></use>
              </svg>
            </button>
          </div>
          <div className="popup__content popup__content--certificates">
            <div className="popup__slider-buttons">
              <button className="btn-icon popup__slider-btn popup__slider-btn--prev" type="button" aria-label="prev">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button className="btn-icon popup__slider-btn popup__slider-btn--next" type="button" aria-label="next">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
            <ul className="popup__slider-list">
              <li className="popup__slide popup__slide--current">
                <div className="popup__slide-img">
                  <picture>
                    <source type="image/webp" srcSet="img/content/popup/popup-slide01.webp, img/content/popup/popup-slide01@2x.webp 2x"/>
                    <img src="img/content/popup/popup-slide01.jpg" srcSet="img/content/popup/popup-slide01@2x.jpg 2x" width="294" height="360" alt="Сертификат Ивановой Валерии, присвоена квалификация тренер по фитнесу."/>
                  </picture>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default memo(PopupCertificates);
