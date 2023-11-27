import React from 'react';

function UserLocationSelect():JSX.Element {
  return (
    <div className="custom-select user-info-edit__select">
      <span className="custom-select__label">Локация</span>
      <div className="custom-select__placeholder">ст. м. Адмиралтейская</div>
      <button className="custom-select__button" type="button" aria-label="Выберите одну из опций">
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
