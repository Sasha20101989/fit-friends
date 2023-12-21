import { useAppSelector } from '../../hooks/index';
import { getCurrentUser } from '../../store/user-process/user-process.selectors';
import { Role } from '../../types/role.enum';
import { Trainer } from '../../types/trainer.interface';
import CertificateList from '../certificate-list/certificate-list';

function CoachAdditionalInfo(): JSX.Element | null {
  const currentUser = useAppSelector(getCurrentUser);

  if(!currentUser || currentUser.role !== Role.Trainer){
    return null;
  }

  const trainer = currentUser as Trainer;

  const certificates: string[] = [trainer.certificate];

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
