import { Role } from '../../types/role.enum';
import { WorkoutType } from '../../types/workout-type.enum';
import { MAX_SPECIALIZATIONS_COUNT } from '../../const';
import { User } from '../../types/user.interface';
import { Trainer } from '../../types/trainer.interface';
import { ChangeEvent } from 'react';

const errorStyle = {
  color: '#e4001b',
  opacity: 1,
  marginTop: '6px'
};

type SpecializationGroupProps = {
  currentUser: User | Trainer;
  error: string;
  onSpecializationChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
}

function SpecializationGroup({ currentUser, error, onSpecializationChange }: SpecializationGroupProps): JSX.Element {
  const name = currentUser.role === Role.Trainer ? 'coach' : 'user';

  const isDisabled = (type: WorkoutType): boolean => {
    if (currentUser) {
      if (currentUser.workoutTypes.length >= MAX_SPECIALIZATIONS_COUNT) {
        return !currentUser.workoutTypes.includes(type);
      }
    }

    return false;
  };

  return(
    <div className={`questionnaire-${name}__block`}><span className={`questionnaire-${name}__legend`}>Ваша специализация (тип) тренировок</span>
      <div className={`specialization-checkbox questionnaire-${name}__specializations`}>
        {Object.values(WorkoutType).map((type) => (
          <div key={type} className="btn-checkbox">
            <label>
              <input
                className="visually-hidden"
                type="checkbox"
                name="specialisation"
                value={type}
                checked={currentUser.workoutTypes.includes(type)}
                onChange={onSpecializationChange}
                disabled={isDisabled(type)}
              />
              <span className="btn-checkbox__btn">{type}</span>
            </label>
          </div>
        ))}
        {error && <span style={errorStyle}>{error}</span>}
      </div>
    </div>
  );
}

export default SpecializationGroup;
