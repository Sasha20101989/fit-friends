import { Role } from '../../types/role.enum';
import { WorkoutType } from '../../types/workout-type.enum';
import { MAX_SPECIALIZATIONS_COUNT } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { ChangeEvent } from 'react';
import { getCurrentUser } from '../../store/user-process/user-process.selectors';
import { addSpecialization, removeSpecialization } from '../../store/user-process/user-process.slice';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';

const errorStyle = {
  color: '#e4001b',
  opacity: 1,
  marginTop: '6px'
};

type SpecializationGroupProps = {
  role: Role;
  error: string;
}

function SpecializationGroup({ role, error }: SpecializationGroupProps): JSX.Element {
  const dispatch = useAppDispatch();

  const name = role === Role.Trainer ? 'coach' : 'user';

  const currentUser = useAppSelector(getCurrentUser);

  const isDisabled = (type: WorkoutType): boolean => {
    if (currentUser) {
      if (currentUser.workoutTypes.length >= MAX_SPECIALIZATIONS_COUNT) {
        return !currentUser.workoutTypes.includes(type);
      }
    }

    return false;
  };

  const handleSpecializationChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const selectedType = evt.target.value as WorkoutType;
    if (evt.target.checked) {
      dispatch(addSpecialization(selectedType));
    } else {
      dispatch(removeSpecialization(selectedType));
    }
  };

  if(!currentUser){
    return(<NotFoundScreen/>);
  }

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
                onChange={handleSpecializationChange}
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
