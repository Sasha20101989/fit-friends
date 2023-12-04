import { capitalizeFirstLetter } from '../../const';
import { useAppSelector } from '../../hooks/index';
import { getLocation } from '../../store/main-process/main-process.selectors';

function UserLocationSelect():JSX.Element {
  const location = useAppSelector(getLocation);
  const isEdit = false;
  return (
    <div className={`${!isEdit && '-custom-select--readonly'} custom-select user-info${!isEdit && '-edit'}__select`}>
      <span className="custom-select__label">Локация</span>
      <div className="custom-select__placeholder">{`ст. м. ${location ? capitalizeFirstLetter(location) : ''}`}</div>
      <button className="custom-select__button" type="button" aria-label="Выберите одну из опций" disabled={!isEdit}>
        <span className="custom-select__text"></span>
        <span className="custom-select__icon">
          <svg width="15" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-down"></use>
          </svg>
        </span>
      </button>
      <ul className="custom-select__list" role="listbox">
      </ul>
    </div>
  );
}

export default UserLocationSelect;
