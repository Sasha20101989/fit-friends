import { WorkoutDuration } from '../../types/workout-duration.enum';
import DurationItem from '../duration-item/duration-item';

function DurationRadio(): JSX.Element {
  return (
    <div className="questionnaire-user__block">
      <span className="questionnaire-user__legend">Сколько времени вы готовы уделять на тренировку в день</span>
      <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
        {Object.values(WorkoutDuration).map((duration) => (
          <DurationItem key={duration} duration={duration}/>
        ))}
      </div>
    </div>
  );
}

export default DurationRadio;
