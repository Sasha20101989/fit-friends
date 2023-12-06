import { capitalizeFirstLetter } from '../../const';
import useRegisterForm from '../../hooks/use-register-form/use-register-form';
import { Location } from '../../types/location.enum';

type UserLocationSelectProps = {
  isFormEditable: boolean;
}

function UserLocationSelect({isFormEditable}: UserLocationSelectProps):JSX.Element {
  const {
    selectedLocation,
    isDropdownOpen,
    handleToggleDropdown,
    handleLocationChange } = useRegisterForm();

  return (
    <div className={`${!isFormEditable ? '-custom-select--readonly' : ''} custom-select user-info${!isFormEditable ? '-edit' : ''}__select ${isDropdownOpen ? 'is-open' : ''}`}>
      <span className="custom-select__label">Локация</span>
      <div className="custom-select__placeholder">{`ст. м. ${selectedLocation ? capitalizeFirstLetter(selectedLocation) : ''}`}</div>
      <button className="custom-select__button" type="button" aria-label="Выберите одну из опций" disabled={!isFormEditable} onClick={handleToggleDropdown}>
        <span className="custom-select__text"></span>
        <span className="custom-select__icon">
          <svg width="15" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-down"></use>
          </svg>
        </span>
      </button>
      <ul className="custom-select__list" role="listbox">
        {Object.values(Location).map((loc) => (
          <li
            key={loc}
            value={loc}
            onClick={handleLocationChange}
            style={{cursor: 'pointer'}}
          >
            {loc}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserLocationSelect;
