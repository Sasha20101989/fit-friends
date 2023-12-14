import { Gender } from '../../types/gender.enum';
import { TrainingLevel } from '../../types/training-level.enum';
import { WorkoutDuration } from '../../types/workout-duration.enum';

type RadioItemProps = {
  classType: string;
  name: string;
  value: Gender | TrainingLevel | WorkoutDuration;
  selectedValue: Gender | TrainingLevel | WorkoutDuration | null;
  onValueChange: (evt: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLLIElement>) => void;
}

function RadioItem({ classType, name, value, selectedValue, onValueChange }: RadioItemProps): JSX.Element {
  const handleValueChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(evt);
  };

  return (
    <div className={classType}>
      <label>
        <input
          type="radio"
          name={name}
          value={value}
          checked={selectedValue === value}
          onChange={handleValueChange}
        />
        <span className="custom-toggle-radio__icon"></span>
        <span className="custom-toggle-radio__label">{value}</span>
      </label>
    </div>
  );
}

export default RadioItem;
