import { Training } from '../../types/training.type';
import IconButton from '../icon-button/icon-button';
import { memo } from 'react';
import SpecialForYouList from './special-for-you-list';

type SpecialForYouProps = {
  specialForUserTrainings: Training[];
  isPreviousButtonDisabled: boolean;
  isNextButtonDisabled: boolean;
  onPreviousClick: (value: React.SetStateAction<number>) => void;
  onNextClick: (value: React.SetStateAction<number>) => void;
}

function SpecialForYou({specialForUserTrainings, isPreviousButtonDisabled, isNextButtonDisabled, onPreviousClick, onNextClick}: SpecialForYouProps): JSX.Element {
  const handlePreviousClick = () => {
    onPreviousClick((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    onNextClick((prevPage) => prevPage + 1);
  };

  return (
    <section className="special-for-you">
      <div className="container">
        <div className="special-for-you__wrapper">
          <div className="special-for-you__title-wrapper">
            <h2 className="special-for-you__title">Специально подобрано для вас</h2>
            <div className="special-for-you__controls">
              <IconButton sourceName={'btn-icon special-for-you__control'} direction="left" onClick={handlePreviousClick} ariaLabel="previous" width={16} height={14} disabled={isPreviousButtonDisabled}/>
              <IconButton sourceName={'btn-icon special-for-you__control'} direction="right" onClick={handleNextClick} ariaLabel="next" width={16} height={14} disabled={isNextButtonDisabled}/>
            </div>
          </div>
          <SpecialForYouList specialForUserTrainings={specialForUserTrainings}/>
        </div>
      </div>
    </section>
  );
}

export default memo(SpecialForYou);
