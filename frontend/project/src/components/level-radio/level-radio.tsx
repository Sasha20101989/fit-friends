import { Role } from '../../types/role.enum';
import { TrainingLevel } from '../../types/training-level.enum';
import useRegisterForm from '../../hooks/use-register-form/use-register-form';

type LevelRadioProps = {
  role: Role;
}

function LevelRadio({ role }: LevelRadioProps): JSX.Element {
  const name = role === Role.Trainer ? 'coach' : 'user';
  const { selectedLevel, handleLevelChange } = useRegisterForm();

  return (
    <div className={`questionnaire-${name}__block`}>
      <span className={`questionnaire-${name}__legend`}>Ваш уровень</span>
      <div className={`custom-toggle-radio custom-toggle-radio--big questionnaire-${name}__radio`}>
        {Object.values(TrainingLevel).map((level) => (
          <div key={level} className="custom-toggle-radio__block">
            <label>
              <input
                type="radio"
                name="level"
                value={level}
                checked={selectedLevel === level}
                onChange={handleLevelChange}
              />
              <span className="custom-toggle-radio__icon"></span>
              <span className="custom-toggle-radio__label">{level}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LevelRadio;
