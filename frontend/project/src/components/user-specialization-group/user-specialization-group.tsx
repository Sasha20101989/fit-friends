import { WorkoutType } from '../../types/workout-type.enum';
import useRegisterForm from '../../hooks/use-register-form/use-register-form';

type UserSpecializationGroupProps = {
  isFormEditable: boolean;
}


function UserSpecializationGroup({isFormEditable}: UserSpecializationGroupProps):JSX.Element {
  const { specializations, isDisabled, handleSpecializationChange } = useRegisterForm();

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
