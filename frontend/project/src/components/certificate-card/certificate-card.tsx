type Certificate = {
  webp: string;
  image: {
    src: string;
    highResolution: string;
  };
  alt: string;
}

type CertificateCardProps = {
  certificate: Certificate;
  description: string;
}

function CertificateCard({ certificate, description }: CertificateCardProps): JSX.Element {
  return (
    <li className="personal-account-coach__item">
      <div className="certificate-card certificate-card--edit">
        <div className="certificate-card__image">
          <picture>
            <source type="image/webp" srcSet={certificate.webp} />
            <img src={certificate.image.src} srcSet={certificate.image.highResolution} width="294" height="360" alt={description} />
          </picture>
        </div>
        <div className="certificate-card__buttons">
          <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="#icon-edit"></use>
            </svg><span>Изменить</span>
          </button>
          <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button">
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="#icon-edit"></use>
            </svg><span>Сохранить</span>
          </button>
          <div className="certificate-card__controls">
            <button className="btn-icon certificate-card__control" type="button" aria-label="next">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-change"></use>
              </svg>
            </button>
            <button className="btn-icon certificate-card__control" type="button" aria-label="next">
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="#icon-trash"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CertificateCard;
