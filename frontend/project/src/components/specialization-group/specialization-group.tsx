import { Role } from '../../types/role.enum';
import { WorkoutType } from '../../types/workout-type.enum';
import useRegisterForm from '../../hooks/use-register-form/use-register-form';

type SpecializationGroupProps = {
  role: Role;
}

function SpecializationGroup({ role }: SpecializationGroupProps): JSX.Element {
  const name = role === Role.Trainer ? 'coach' : 'user';
  const { selectedSpecializations, isDisabled, handleSpecializationChange } = useRegisterForm();

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
                checked={selectedSpecializations.includes(type)}
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

export default SpecializationGroup;

