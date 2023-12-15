import { useEffect, useState } from 'react';
import SpecialForYouItem from './special-for-you-item';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { Training } from '../../types/training.type';
import { getSpecialForUserTrainings } from '../../store/main-data/main-data.selectors';
import { getUserId } from '../../store/main-process/main-process.selectors';
import { fetchUserAction } from '../../store/api-actions/user-api-actions/user-api-actions';
import { getUser } from '../../store/user-process/user-process.selectors';
import Loading from '../loading/loading';
import IconButton from '../icon-button/icon-button';
import { MAX_SPECIAL_TRAININGS_COUNT } from '../../const';
import { fetchTrainingsAction } from '../../store/api-actions/trainings-api-actions/trainings-api-actions';
import { TrainingCategory } from '../../types/training-category';

function SpecialForYou(): JSX.Element {
  const dispatch = useAppDispatch();

  const userId: string = useAppSelector(getUserId);
  const user = useAppSelector(getUser);
  const trainings: Training[] = useAppSelector(getSpecialForUserTrainings);

  const [selectedPage, setSpecialPage] = useState<number>(1);

  const isPreviousButtonDisabled = selectedPage === 1;
  const isNextButtonDisabled = MAX_SPECIAL_TRAININGS_COUNT !== trainings.length;

  const handlePreviousClick = () => {
    setSpecialPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setSpecialPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if(userId){
      dispatch(fetchUserAction(userId));
    }
  }, [dispatch , userId]);

  useEffect(() => {
    if(user && user.workoutTypes.length > 0){
      dispatch(fetchTrainingsAction({
        category: TrainingCategory.FOR_USER,
        page: selectedPage,
        limit: MAX_SPECIAL_TRAININGS_COUNT,
        workoutTypes: user.workoutTypes
      }));
    }
  }, [dispatch , user, selectedPage, userId]);

  if(!user){
    return (<Loading/>);
  }

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
          <ul className="special-for-you__list">
            {trainings.map((training, index) => (
              <SpecialForYouItem
                key={`${training.name}-${training.calories}-${training.price}`}
                trainingId={training.id}
                title={training.workoutType}
                imageSrc={`img/content/thumbnails/preview-0${index + 1}`}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default SpecialForYou;
