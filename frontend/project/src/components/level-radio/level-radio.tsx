import { Role } from '../../types/role.enum';
import { TrainingLevel } from '../../types/training-level.enum';
import LevelItem from '../level-item/level-item';

type LevelRadioProps = {
  role: Role;
}

function LevelRadio({ role }: LevelRadioProps): JSX.Element {
  const name = role === Role.Trainer ? 'coach' : 'user';

  return (
    <div className={`questionnaire-${name}__block`}>
      <span className={`questionnaire-${name}__legend`}>Ваш уровень</span>
      <div className={`custom-toggle-radio custom-toggle-radio--big questionnaire-${name}__radio`}>
        {Object.values(TrainingLevel).map((level) => (
          <LevelItem key={level} level={level}/>
        ))}
      </div>
    </div>
  );
}

export default LevelRadio;
