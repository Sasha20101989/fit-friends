import { WorkoutDuration } from '../../types/workout-duration.enum';
import useRegisterForm from '../../hooks/use-register-form/use-register-form';

type DurationItemProps = {
  duration: WorkoutDuration;
}

function DurationItem({ duration }: DurationItemProps):JSX.Element {
  const { selectedDuration, handleDurationChange } = useRegisterForm();

  return (
    <div className="custom-toggle-radio__block">
      <label>
        <input
          type="radio"
          name="time"
          value={duration}
          checked={selectedDuration === duration}
          onChange={() => handleDurationChange(duration)}
        />
        <span className="custom-toggle-radio__icon"></span>
        <span className="custom-toggle-radio__label">{duration}</span>
      </label>
    </div>
  );
}

export default DurationItem;
