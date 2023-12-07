import { useState } from 'react';
import { WorkoutDuration } from '../../types/workout-duration.enum';
import { WorkoutType } from '../../types/workout-type.enum';
import { TrainingLevel } from '../../types/training-level.enum';
import { capitalizeFirstLetter } from '../../const';
import { Location } from '../../types/location.enum';

type DropdownSelectProps = {
  label: string;
  selectedValue: WorkoutDuration | WorkoutType | TrainingLevel | Location | null;
  object: WorkoutDuration[] | WorkoutType[] | TrainingLevel[] | Location[];
  onValueChange: (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

function DropdownSelect({label, selectedValue, onValueChange, object}: DropdownSelectProps): JSX.Element {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleToggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleValueChange = (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    onValueChange(evt);
    handleToggleDropdown();
  };

  return(
    <div className={`custom-select ${!isDropdownOpen ? 'select--not-selected' : 'is-open'}`}>
      <span className="custom-select__label">{label}</span>
      <div className="custom-select__placeholder">{selectedValue ? capitalizeFirstLetter(selectedValue) : ''}</div>
      <button className="custom-select__button" type="button" onClick={handleToggleDropdown} aria-label="Выберите одну из опций">
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
