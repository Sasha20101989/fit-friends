import { WorkoutType } from '../../types/workout-type.enum';
import { addSpecialization, removeSpecialization } from '../../store/main-process/main-process.slice';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { getSpecializations } from '../../store/main-process/main-process.selectors';
import { ChangeEvent } from 'react';
import { MAX_SPECIALIZATIONS_COUNT } from '../../const';

type UserSpecializationGroupProps = {
  isFormEditable: boolean;
}

function UserSpecializationGroup({isFormEditable}: UserSpecializationGroupProps):JSX.Element {
  const dispatch = useAppDispatch();

  const specializations = useAppSelector(getSpecializations);

  const handleSpecializationChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const selectedType = evt.target.value as WorkoutType;

    if (evt.target.checked) {
      dispatch(addSpecialization(selectedType));
    } else {
      dispatch(removeSpecialization(selectedType));
    }
  };

  const isDisabled = (type: WorkoutType): boolean => specializations.length >= MAX_SPECIALIZATIONS_COUNT && !specializations.includes(type);

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
                checked={specializations.includes(type)}
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
