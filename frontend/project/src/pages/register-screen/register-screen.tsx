import BackgroundLogo from '../../components/background-logo/background-logo';
import { Location } from '../../types/location.enum';
import { Gender } from '../../types/gender.enum';
import { Role } from '../../types/role.enum';
import DropdownSelect from '../../components/dropdown-select/dropdown-select';
import LabeledInput from '../../components/labeled-input/labeled-input';
import RadioSelect from '../../components/radio-select/radio-select';
import Layout from '../../components/layout/layout';
import { AppRoute, PASSWORD_CONSTRAINTS, USERNAME_CONSTRAINTS, capitalizeFirstLetter } from '../../const';
import { redirectToRoute } from '../../store/main-process/main-process.slice';
import { setCurrentUserBirthday, setCurrentUserEmail, setCurrentUserGender, setCurrentUserLocation, setCurrentUserName, setCurrentUserPassword, setCurrentUserRegisterData, setCurrentUserRole } from '../../store/user-process/user-process.slice';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { getCurrentUser } from '../../store/user-process/user-process.selectors';
import { useState } from 'react';
import { RegisterUserTransferData } from '../../types/register-transfer-data.js';
const errorStyle = {
  color: '#e4001b',
  opacity: 1,
  marginTop: '6px'
};

function RegisterScreen() : JSX.Element {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(getCurrentUser);

  const [locationError, setLocationError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [agreementError, setAgreementError] = useState('');

  const [selectedGender, setGender] = useState<Gender>(Gender.Unknown);
  const [selectedRole, setRole] = useState<Role>(Role.Unknown);

  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleGoQuestion = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if(currentUser){
      if(currentUser.location === null){
        setLocationError('Выберите локацию');
        return;
      }

      if(selectedGender === null){
        setGenderError('Выберите пол');
        return;
      }

      if(selectedRole === null){
        setRoleError('Выберите роль');
        return;
      }

      if(!isAgreementChecked){
        setAgreementError('Подтвердите согласие с политикой конфиденциальности');
        return;
      }

      if(currentUser.name !== '' &&
          currentUser.password !== undefined &&
          currentUser.email !== '' &&
          currentUser.birthDate !== undefined
      ){

        const formData: RegisterUserTransferData = {
          name: currentUser.name,
          email: currentUser.email,
          password: currentUser.password,
          location: currentUser.location,
          gender: selectedGender,
          role: selectedRole,
          birthDate: currentUser.birthDate
        };

        dispatch(setCurrentUserRegisterData(formData));

        if(formData.role === Role.Trainer){
          dispatch(redirectToRoute(AppRoute.RegisterTrainer));
        }else if(formData.role === Role.User){
          dispatch(redirectToRoute(AppRoute.RegisterUser));
        }
      }
    }
  };

  const handleLocationChange = (evt: React.MouseEvent<HTMLLIElement>) => {
    const location: Location = evt.currentTarget.textContent as Location;
    setLocationError('');
    dispatch(setCurrentUserLocation(location));
    setIsDropdownOpen(false);
  };

  const handleRoleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const role: Role = evt.target.value as Role;
    setRoleError('');
    dispatch(setCurrentUserRole(role));
    setRole(role);
  };

  const handleNameChange = (name: string) => {
    dispatch(setCurrentUserName(name));
  };

  const handleEmailChange = (email: string) => {
    dispatch(setCurrentUserEmail(email));
  };

  const handleBirthdayChange = (date: string) => {
    dispatch(setCurrentUserBirthday(date));
  };

  const handlePasswordChange = (password: string) => {
    dispatch(setCurrentUserPassword(password));
  };

  const handleSexChange = (evt: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLLIElement>) => {
    const gender = 'value' in evt.target ?
      (evt.target as HTMLInputElement).value as Gender :
        (evt.target as HTMLLIElement).dataset.value as Gender;
    setGenderError('');
    dispatch(setCurrentUserGender(gender));
    setGender(gender);
  };

  const handleAgreementChange = () => {
    setAgreementError('');
    setIsAgreementChecked(!isAgreementChecked);
  };

  const handleToggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return(
    <Layout includeHeader={false}>
      <BackgroundLogo/>
      <div className="popup-form popup-form--sign-up">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__title-wrapper">
              <h1 className="popup-form__title">Регистрация</h1>
            </div>
            <div className="popup-form__form">
              <form method="get" onSubmit={handleGoQuestion}>
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

                    <LabeledInput classType={'custom-input'} type={'text'} label={'Имя'} inputName="name" minLength={USERNAME_CONSTRAINTS.MIN_LENGTH} maxLength={USERNAME_CONSTRAINTS.MAX_LENGTH} onChange={handleNameChange}/>
                    <LabeledInput classType={'custom-input'} type={'email'} label={'E-mail'} inputName="email" onChange={handleEmailChange}/>
                    <LabeledInput classType={'custom-input'} type={'date'} max={'2099-12-31'} label={'Дата рождения'} inputName="birthday" onChange={handleBirthdayChange}/>
                    <DropdownSelect
                      classType={`custom-select ${!isDropdownOpen ? 'select--not-selected' : 'is-open'} ${locationError && 'is-invalid'}`}
                      label={'Ваша локация'}
                      onValueChange={handleLocationChange}
                      selectedValue={currentUser && currentUser.location !== Location.Unknown ? capitalizeFirstLetter(currentUser.location) : ''}
                      object={Object.values(Location).filter((location) => location !== Location.Unknown)}
                      onToggleDropdown={handleToggleDropdown}
                      error={locationError}
                    />
                    <LabeledInput classType={'custom-input'} type={'password'} autoComplete='off' label={'Пароль'} inputName="password" minLength={PASSWORD_CONSTRAINTS.MIN_LENGTH} maxLength={PASSWORD_CONSTRAINTS.MAX_LENGTH} onChange={handlePasswordChange}/>
                    <RadioSelect
                      name={'gender'}
                      classType={'sign-up__radio'}
                      classChildType={'custom-toggle-radio custom-toggle-radio--big'}
                      classLabelType={'sign-up__label'}
                      label={'Пол'}
                      selectedValue={selectedGender}
                      onValueChange={handleSexChange}
                      object={Object.values(Gender).filter((gender) => gender !== Gender.Unknown)}
                      error={genderError}
                    />
                  </div>
                  <div className="sign-up__role">
                    <h2 className="sign-up__legend">Выберите роль</h2>
                    <div className="role-selector sign-up__role-selector">
                      {Object.values(Role)
                        .filter((role) => role !== Role.Unknown)
                        .map((role) => (
                          <div key={role} className="role-btn">
                            <label>
                              <input
                                className="visually-hidden"
                                type="radio"
                                name="role"
                                value={role}
                                checked={selectedRole === role ?? false}
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
                    {roleError && <span style={errorStyle}>{roleError}</span>}
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
                    {agreementError && <span style={errorStyle}>{agreementError}</span>}
                  </div>
                  <button className="btn sign-up__button" type="submit">Продолжить</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default RegisterScreen;
