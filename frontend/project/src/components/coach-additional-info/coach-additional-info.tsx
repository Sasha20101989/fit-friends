import CertificateList from '../certificate-list/certificate-list';
import IconButton from '../icon-button/icon-button';

type CoachAdditionalInfoProps = {
  certificates: string[];
  isPreviousButtonDisabled: boolean;
  isNextButtonDisabled: boolean;
  onPreviousClick: (value: React.SetStateAction<number>) => void;
  onNextClick: (value: React.SetStateAction<number>) => void;
}

function CoachAdditionalInfo({certificates, isPreviousButtonDisabled, isNextButtonDisabled, onPreviousClick, onNextClick}: CoachAdditionalInfoProps): JSX.Element {

  const handlePreviousClick = () => {
    onPreviousClick((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    onNextClick((prevPage) => prevPage + 1);
  };

  return(
    <div className="personal-account-coach__additional-info" data-testid="coach-additional-info">
      <div className="personal-account-coach__label-wrapper">
        <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
        <button className="btn-flat btn-flat--underlined personal-account-coach__button" type="button">
          <svg width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-import"></use>
          </svg><span>Загрузить</span>
        </button>
        <div className="personal-account-coach__controls">
          <IconButton sourceName={'btn-icon personal-account-coach__control'} direction="left" onClick={handlePreviousClick} ariaLabel="previous" width={16} height={14} disabled={isPreviousButtonDisabled}/>
          <IconButton sourceName={'btn-icon personal-account-coach__control'} direction="right" onClick={handleNextClick} ariaLabel="next" width={16} height={14} disabled={isNextButtonDisabled}/>
        </div>
      </div>
      <CertificateList certificates={certificates}/>
    </div>

  );
}

export default CoachAdditionalInfo;
