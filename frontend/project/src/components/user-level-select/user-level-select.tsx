import { useAppDispatch } from '../../hooks/index';
import { capitalizeFirstLetter } from '../../const';
import useRegisterForm from '../../hooks/use-register-form/use-register-form';
import { TrainingLevel } from '../../types/training-level.enum';
import { changeLevel } from '../../store/main-process/main-process.slice';

type UserLevelSelectProps = {
  isFormEditable: boolean;
}

function UserLevelSelect({isFormEditable}: UserLevelSelectProps):JSX.Element {
  const dispatch = useAppDispatch();
  const {
    selectedLevel,
    isDropdownOpen,
    handleToggleDropdown} = useRegisterForm();

  const handleLevelChange = (evt: React.MouseEvent<HTMLLIElement>) => {
    const newLevel: TrainingLevel = evt.currentTarget.textContent as TrainingLevel;
    dispatch(changeLevel(newLevel));
    handleToggleDropdown();
  };

  return (
    <div className={`${!isFormEditable ? '-custom-select--readonly' : ''} custom-select user-info${!isFormEditable ? '-edit' : ''}__select ${isDropdownOpen ? 'is-open' : ''}`}>
      <span className="custom-select__label">Уровень</span>
      <div className="custom-select__placeholder">{selectedLevel ? capitalizeFirstLetter(selectedLevel) : ''}</div>
      <button className="custom-select__button" type="button" aria-label="Выберите одну из опций" disabled={!isFormEditable} onClick={handleToggleDropdown}>
        <span className="custom-select__text"></span>
        <span className="custom-select__icon">
          <svg width="15" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-down"></use>
          </svg>
        </span>
      </button>
      <ul className="custom-select__list" role="listbox">
        {Object.values(TrainingLevel).map((level) => (
          <li
            key={level}
            value={level}
            onClick={handleLevelChange}
            style={{cursor: 'pointer'}}
          >
            {level}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserLevelSelect;
