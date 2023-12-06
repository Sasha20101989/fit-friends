import BackgroundLogo from '../../components/background-logo/background-logo';
import { Fragment } from 'react';
import useRegisterForm from '../../hooks/use-register-form/use-register-form';
import { Location } from '../../types/location.enum';
import { Gender } from '../../types/gender.enum';
import { Role } from '../../types/role.enum';
import { useAppSelector } from '../../hooks/index';
import { getSubmittingStatus } from '../../store/user-process/user-process.selectors';
import GenderItem from '../../components/gender-item/gender-item';
import { capitalizeFirstLetter } from '../../const';

function RegisterScreen() : JSX.Element {
  const isSubmitting = useAppSelector(getSubmittingStatus);

  const {
    nameRef,
    emailRef,
    passwordRef,
    birthdayRef,
    selectedLocation,
    selectedRole,
    isAgreementChecked,
    isDropdownOpen,
    handleRegister,
    handleRoleChange,
    handleAgreementChange,
    handleLocationChange,
    handleToggleDropdown } = useRegisterForm();

  return(
    <Fragment>
      <BackgroundLogo/>
      <div className="popup-form popup-form--sign-up">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__title-wrapper">
              <h1 className="popup-form__title">Регистрация</h1>
            </div>
            <div className="popup-form__form">
              <form method="get" onSubmit={handleRegister}>
                <div className="sign-up">
                  <div className="sign-up__load-photo">
                    <div className="input-load-avatar">
                      <label>
                        <input className="visually-hidden" type="file" accept="image/png, image/jpeg"/>
                        <span className="input-load-avatar__btn">
                          <svg width="20" height="20" aria-hidden="true">
                            <use xlinkHref="#icon-import"></use>
                          </svg>
                        </span>
                      </label>
                    </div>
                    <div className="sign-up__description">
                      <h2 className="sign-up__legend">Загрузите фото профиля</h2>
                      <span className="sign-up__text">JPG, PNG, оптимальный размер 100&times;100&nbsp;px</span>
                    </div>
                  </div>
                  <div className="sign-up__data">
                    <div className="custom-input">
                      <label>
                        <span className="custom-input__label">Имя</span>
                        <span className="custom-input__wrapper">
                          <input type="text" name="name" ref={nameRef} id="name" required/>
                        </span>
                      </label>
                    </div>
                    <div className="custom-input">
                      <label>
                        <span className="custom-input__label">E-mail</span>
                        <span className="custom-input__wrapper">
                          <input type="email" name="email" ref={emailRef} id="email" required/>
                        </span>
                      </label>
                    </div>
                    <div className="custom-input">
                      <label>
                        <span className="custom-input__label">Дата рождения</span>
                        <span className="custom-input__wrapper">
                          <input type="date" name="birthday" ref={birthdayRef} id="birthday" max="2099-12-31"/>
                        </span>
                      </label>
                    </div>
                    <div className={`custom-select ${!isDropdownOpen ? 'select--not-selected' : 'is-open'}`}>
                      <span className="custom-select__label">Ваша локация</span>
                      <div className="custom-select__placeholder">{selectedLocation ? capitalizeFirstLetter(selectedLocation) : ''}</div>
                      <button className="custom-select__button" type="button" onClick={handleToggleDropdown} aria-label="Выберите одну из опций">
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
                    <div className="custom-input">
                      <label>
                        <span className="custom-input__label">Пароль</span>
                        <span className="custom-input__wrapper">
                          <input type="password" name="password" ref={passwordRef} id="password" autoComplete="off" required/>
                        </span>
                      </label>
                    </div>
                    <div className="sign-up__radio">
                      <span className="sign-up__label">Пол</span>
                      <div className="custom-toggle-radio custom-toggle-radio--big">
                        {Object.values(Gender).map((gender) => (
                          <GenderItem key={gender} gender={gender}/>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="sign-up__role">
                    <h2 className="sign-up__legend">Выберите роль</h2>
                    <div className="role-selector sign-up__role-selector">
                      {Object.values(Role).map((role) => (
                        <div key={role} className="role-btn">
                          <label>
                            <input
                              className="visually-hidden"
                              type="radio"
                              name="role"
                              value={role}
                              checked={selectedRole === role}
                              onChange={handleRoleChange}
                            />
                            <span className="role-btn__icon">
                              <svg width="12" height="13" aria-hidden="true">
                                <use xlinkHref="#icon-cup"></use>
                              </svg>
                            </span>
                            <span className="role-btn__btn">
                              {role === Role.Trainer ? 'Я хочу тренировать' : 'Я хочу тренироваться'}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="sign-up__checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value="user-agreement"
                        name="user-agreement"
                        checked={isAgreementChecked}
                        onChange={handleAgreementChange}
                      />
                      <span className="sign-up__checkbox-icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg>
                      </span>
                      <span className="sign-up__checkbox-label">Я соглашаюсь с <span>политикой конфиденциальности</span> компании</span>
                    </label>
                  </div>
                  <button className="btn sign-up__button" type="submit" disabled={isSubmitting}>Продолжить</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default RegisterScreen;
