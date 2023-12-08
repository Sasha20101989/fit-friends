import Image from '../image/image';

type CertificateCardProps = {
  certificate: string;
}

function CertificateCard({ certificate }: CertificateCardProps): JSX.Element {
  return (
    <li className="personal-account-coach__item">
      <div className="certificate-card certificate-card--edit">
        <Image imageSrc={certificate} sourceName={'certificate-card__image'} width={294} height={360} alt={'сертификат'}/>
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
