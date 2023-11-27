import { Fragment } from 'react';
import { WorkoutType } from '../../types/workout-type.enum';
import useRegisterForm from '../../hooks/use-register-form/use-register-form';

function UserSpecializationGroup():JSX.Element {
  const { specializations, isDisabled, handleSpecializationChange } = useRegisterForm();
  return (
    <Fragment>
      <h2 className="user-info-edit__title user-info-edit__title--specialization">Специализация</h2>
      <div className="specialization-checkbox user-info-edit__specialization">
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
    </Fragment>
  );
}

export default UserSpecializationGroup;
