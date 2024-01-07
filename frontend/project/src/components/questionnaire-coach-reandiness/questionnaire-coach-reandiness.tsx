
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { getCurrentUser } from '../../store/user-process/user-process.selectors';
import { changeCurrentUserReadiessToWorkout } from '../../store/user-process/user-process.slice';
import { Trainer } from '../../types/trainer.interface';

function QuestionnaireCoachReandiness(): JSX.Element {
  const dispatch = useAppDispatch();

  const currentTrainer = useAppSelector(getCurrentUser) as Trainer;

  const handleReadinessForWorkoutChange = () => {
    dispatch(changeCurrentUserReadiessToWorkout(!currentTrainer.personalTraining));
  };

  return(
    <div className="questionnaire-coach__checkbox">
      <label>
        <input
          type="checkbox"
          value="individual-training"
          name="individual-training"
          checked={currentTrainer.personalTraining}
          onChange={handleReadinessForWorkoutChange}
        />
        <span className="questionnaire-coach__checkbox-icon">
          <svg width="9" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-check"></use>
          </svg>
        </span>
        <span className="questionnaire-coach__checkbox-label">Хочу дополнительно индивидуально тренировать</span>
      </label>
    </div>
  );
}

export default QuestionnaireCoachReandiness;
