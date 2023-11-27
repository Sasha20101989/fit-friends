import CertificateList from '../certificate-list/certificate-list';

type Certificate = {
  webp: string;
  image: {
    src: string;
    highResolution: string;
  };
  alt: string;
}

function CoachAdditionalInfo(): JSX.Element {
  const certificates: Certificate[] = [
    {
      webp: 'img/content/certificates-and-diplomas/certificate-3.webp, img/content/certificates-and-diplomas/certificate-3@2x.webp 2x',
      image: {
        src: 'img/content/certificates-and-diplomas/certificate-3.jpg',
        highResolution: 'img/content/certificates-and-diplomas/certificate-3@2x.jpg 2x',
      },
      alt: 'Certificate 1',
    },
    {
      webp: 'img/content/certificates-and-diplomas/certificate-2.webp, img/content/certificates-and-diplomas/certificate-2@2x.webp 2x',
      image: {
        src: 'img/content/certificates-and-diplomas/certificate-2.jpg',
        highResolution: 'img/content/certificates-and-diplomas/certificate-2@2x.jpg 2x',
      },
      alt: 'Certificate 2',
    },
    {
      webp: 'img/content/certificates-and-diplomas/certificate-1.webp, img/content/certificates-and-diplomas/certificate-1@2x.webp 2x',
      image: {
        src: 'img/content/certificates-and-diplomas/certificate-1.jpg',
        highResolution: 'img/content/certificates-and-diplomas/certificate-1@2x.jpg 2x',
      },
      alt: 'Certificate 3',
    }
  ];

  return(
    <div className="personal-account-coach__additional-info">
      <div className="personal-account-coach__label-wrapper">
        <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
        <button className="btn-flat btn-flat--underlined personal-account-coach__button" type="button">
          <svg width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-import"></use>
          </svg><span>Загрузить</span>
        </button>
        <div className="personal-account-coach__controls">
          <button className="btn-icon personal-account-coach__control" type="button" aria-label="previous">
            <svg width="16" height="14" aria-hidden="true">
              <use xlinkHref="#arrow-left"></use>
            </svg>
          </button>
          <button className="btn-icon personal-account-coach__control" type="button" aria-label="next">
            <svg width="16" height="14" aria-hidden="true">
              <use xlinkHref="#arrow-right"></use>
            </svg>
          </button>
        </div>
      </div>
      <CertificateList certificates={certificates}/>
    </div>
  );
}

export default CoachAdditionalInfo;
