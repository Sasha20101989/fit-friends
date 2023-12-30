import { useState } from 'react';
import Image from '../image/image';

type CertificateCardProps = {
  certificate: string;
}

function CertificateCard({ certificate }: CertificateCardProps): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCertificate, setEditedCertificate] = useState(certificate);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleChangeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setEditedCertificate(event.currentTarget.value);
  };

  const handleTrachClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setEditedCertificate(event.currentTarget.value);
  };

  return (
    <li className="personal-account-coach__item">
      <div className="certificate-card certificate-card--edit">
        <Image imageSrc={editedCertificate} sourceName={'certificate-card__image'} width={294} height={360} alt={'сертификат'}/>
        <div className="certificate-card__buttons">
          {isEditing ? (
            <>
              <button className="btn-flat btn-flat--underlined certificate-card__button" onClick={handleSaveClick} type="button">
                <svg width="12" height="12" aria-hidden="true">
                  <use xlinkHref="#icon-edit"></use>
                </svg><span>Сохранить</span>
              </button>
              <button className="btn-flat btn-flat--underlined certificate-card__button" onClick={() => setIsEditing(false)} type="button">
                <svg width="12" height="12" aria-hidden="true">
                  <use xlinkHref="#icon-edit"></use>
                </svg><span>Отмена</span>
              </button>
            </>
          ) : (
            <button className="btn-flat btn-flat--underlined certificate-card__button" onClick={handleEditClick} type="button">
              <svg width="12" height="12" aria-hidden="true">
                <use xlinkHref="#icon-edit"></use>
              </svg><span>Изменить</span>
            </button>
          )}
          <div className="certificate-card__controls">
            <button className="btn-icon certificate-card__control" type="button" aria-label="next" onClick={handleChangeClick}>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-change"></use>
              </svg>
            </button>
            <button className="btn-icon certificate-card__control" type="button" aria-label="next" onClick={handleTrachClick}>
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
