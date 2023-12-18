import { Gender } from '../../types/gender.enum';
import { ChangeEvent } from 'react';
import RadioItem from '../radio-item/radio-item';
import { WorkoutDuration } from '../../types/workout-duration.enum';
import { TrainingLevel } from '../../types/training-level.enum';

type RadioSelectProps = {
  name: string;
  classType: string;
  classChildType: string;
  classLabelType: string;
  label: string;
  selectedValue: Gender| WorkoutDuration | TrainingLevel | null;
  object: Gender[] | WorkoutDuration[] | TrainingLevel[];
  toNextLine?: boolean;
  error: string;
  onValueChange: (evt: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLLIElement>) => void;
}

const errorStyle = {
  color: '#e4001b',
  opacity: 1,
  marginTop: '6px'
};

function RadioSelect({name, classType, classChildType, classLabelType, label, selectedValue, onValueChange, object, toNextLine, error}: RadioSelectProps): JSX.Element {

  return(
    <div className={classType}>
      <span className={classLabelType}>{label}</span>
      {toNextLine && <br/>}
      <div className={classChildType}>
        {object.map((element) => (
          <RadioItem key={element} classType={'custom-toggle-radio__block'} name={name} value={element} selectedValue={selectedValue} onValueChange={onValueChange}/>
        ))}
      </div>
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  );
}

export default RadioSelect;
