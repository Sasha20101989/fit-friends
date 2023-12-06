import { capitalizeFirstLetter } from '../../const';
import { useAppDispatch } from '../../hooks/index';
import useRegisterForm from '../../hooks/use-register-form/use-register-form';
import { setGender } from '../../store/main-process/main-process.slice';
import { Gender } from '../../types/gender.enum';

type UserGenderSelectProps = {
  isFormEditable: boolean;
}

function UserGenderSelect({isFormEditable}: UserGenderSelectProps):JSX.Element {
  const dispatch = useAppDispatch();
  const {
    selectedGender,
    isDropdownOpen,
    handleToggleDropdown} = useRegisterForm();

  const handleSexChange = (evt: React.MouseEvent<HTMLLIElement>) => {
    const gender: Gender = evt.currentTarget.textContent as Gender;
    dispatch(setGender(gender));
    handleToggleDropdown();
  };

  return (
    <div className={`${!isFormEditable ? '-custom-select--readonly' : ''} custom-select user-info${!isFormEditable ? '-edit' : ''}__select ${isDropdownOpen ? 'is-open' : ''}`}>
      <span className="custom-select__label">Пол</span>
      <div className="custom-select__placeholder">{selectedGender ? capitalizeFirstLetter(selectedGender) : ''}</div>
      <button className="custom-select__button" type="button" aria-label="Выберите одну из опций" disabled={!isFormEditable} onClick={handleToggleDropdown}>
        <span className="custom-select__text"></span>
        <span className="custom-select__icon">
          <svg width="15" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-down"></use>
          </svg>
        </span>
      </button>
      <ul className="custom-select__list" role="listbox">
        {Object.values(Gender).map((gender) => (
          <li
            key={gender}
            value={gender}
            onClick={handleSexChange}
            style={{cursor: 'pointer'}}
          >
            {gender}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserGenderSelect;
