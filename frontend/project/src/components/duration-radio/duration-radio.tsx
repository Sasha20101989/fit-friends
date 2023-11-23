import useRegisterForm from '../../hooks/use-register-form/use-register-form';
import { WorkoutDuration } from '../../types/workout-duration.enum';

function DurationRadio(): JSX.Element {
  const { selectedDuration, handleDurationChange } = useRegisterForm();

  return (
    <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Сколько времени вы готовы уделять на тренировку в день</span>
      <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
        {Object.values(WorkoutDuration).map((duration) => (
          <div key={duration} className="custom-toggle-radio__block">
            <label>
              <input
                type="radio"
                name="time"
                value={duration}
                checked={selectedDuration === duration}
                onChange={handleDurationChange}
              />
              <span className="custom-toggle-radio__icon"></span>
              <span className="custom-toggle-radio__label">{duration}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DurationRadio;
