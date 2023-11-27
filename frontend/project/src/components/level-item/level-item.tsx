import useRegisterForm from '../../hooks/use-register-form/use-register-form';
import { TrainingLevel } from '../../types/training-level.enum';

type LevelItemProps = {
  level: TrainingLevel;
}

function LevelItem({level}: LevelItemProps): JSX.Element{
  const { selectedLevel, handleLevelChange } = useRegisterForm();

  return(
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
  );
}

export default LevelItem;
