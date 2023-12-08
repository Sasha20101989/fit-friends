import { WorkoutDuration } from '../../types/workout-duration.enum';
import { WorkoutType } from '../../types/workout-type.enum';
import { TrainingLevel } from '../../types/training-level.enum';
import { Location } from '../../types/location.enum';
import { Gender } from '../../types/gender.enum';

type DropdownSelectProps = {
  classType: string;
  label: string;
  selectedValue: string | null;
  object: WorkoutDuration[] | WorkoutType[] | TrainingLevel[] | Location[] | Gender[];
  onValueChange: (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  onToggleDropdown: () => void;
}

function DropdownSelect({classType, label, selectedValue, onValueChange, object, onToggleDropdown}: DropdownSelectProps): JSX.Element {
  const handleValueChange = (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    onValueChange(evt);
    onToggleDropdown();
  };

  return(
    <div className={classType}>
      <span className="custom-select__label">{label}</span>
      <div className="custom-select__placeholder">{selectedValue}</div>
      <button className="custom-select__button" type="button" onClick={onToggleDropdown} aria-label="Выберите одну из опций">
        <span className="custom-select__text"></span>
        <span className="custom-select__icon">
          <svg width="15" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-down"></use>
          </svg>
        </span>
      </button>
      <ul className="custom-select__list" role="listbox">
        {object.map((type) => (
          <li
            key={type}
            value={type}
            onClick={handleValueChange}
            style={{cursor: 'pointer'}}
          >
            {type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DropdownSelect;
