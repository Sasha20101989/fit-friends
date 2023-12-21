import { WorkoutType } from '../../types/workout-type.enum';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { ChangeEvent } from 'react';
import { MAX_SPECIALIZATIONS_COUNT } from '../../const';
import { getCurrentUser } from '../../store/user-process/user-process.selectors';
import { addSpecialization, removeSpecialization } from '../../store/user-process/user-process.slice';

type UserSpecializationGroupProps = {
  isFormEditable: boolean;
}

function UserSpecializationGroup({isFormEditable}: UserSpecializationGroupProps):JSX.Element | null {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(getCurrentUser);

  if(!currentUser){
    return null;
  }

  const handleSpecializationChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if(isFormEditable){
      const selectedType = evt.target.value as WorkoutType;

      if (evt.target.checked) {
        dispatch(addSpecialization(selectedType));
      } else {
        dispatch(removeSpecialization(selectedType));
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
