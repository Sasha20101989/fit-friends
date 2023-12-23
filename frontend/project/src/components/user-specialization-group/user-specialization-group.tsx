import { WorkoutType } from '../../types/workout-type.enum';
import { useAppDispatch } from '../../hooks/index';
import { ChangeEvent } from 'react';
import { MAX_SPECIALIZATIONS_COUNT } from '../../const';
import { User } from '../../types/user.interface';
import { Trainer } from '../../types/trainer.interface';
import { addCurrentUserSpecialization, removeCurrentUserSpecialization } from '../../store/user-process/user-process.slice';

type UserSpecializationGroupProps = {
  isFormEditable: boolean;
  currentUser: User | Trainer;
}

function UserSpecializationGroup({isFormEditable, currentUser}: UserSpecializationGroupProps):JSX.Element | null {
  const dispatch = useAppDispatch();

  if(!currentUser){
    return null;
  }

  const handleSpecializationChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if(isFormEditable){
      const selectedType = evt.target.value as WorkoutType;

      if (evt.target.checked) {
        dispatch(addCurrentUserSpecialization(selectedType));
      } else {
        dispatch(removeCurrentUserSpecialization(selectedType));
      }
    }
  };

  const isDisabled = (type: WorkoutType): boolean => {
    if (currentUser) {
      if (currentUser.workoutTypes.length >= MAX_SPECIALIZATIONS_COUNT) {
        return !currentUser.workoutTypes.includes(type);
      }
    }

    return false;
  };

  return (
    <div className={`user-info${isFormEditable ? '-edit' : ''}__section`}>
      <h2 className={`user-info${isFormEditable ? '-edit' : ''}__title user-info${isFormEditable ? '-edit' : ''}__title--specialization`}>Специализация</h2>
      <div className={`specialization-checkbox user-info${isFormEditable ? '-edit' : ''}__specialization`}>
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
      </div>
    </div>
  );
}

export default UserSpecializationGroup;
