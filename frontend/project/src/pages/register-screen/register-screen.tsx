import BackgroundLogo from '../../components/background-logo/background-logo';
import useRegisterForm from '../../hooks/use-register-form/use-register-form';
import { Location } from '../../types/location.enum';
import { Gender } from '../../types/gender.enum';
import { Role } from '../../types/role.enum';
import { useAppSelector } from '../../hooks/index';
import { getSubmittingStatus } from '../../store/user-process/user-process.selectors';
import DropdownSelect from '../../components/dropdown-select/dropdown-select';
import LabeledInput from '../../components/labeled-input/labeled-input';
import RadioSelect from '../../components/radio-select/radio-select';
import Layout from '../../components/layout/layout';
import { PASSWORD_CONSTRAINTS, USERNAME_CONSTRAINTS, capitalizeFirstLetter } from '../../const';
import Loading from '../../components/loading/loading';
const errorStyle = {
  color: '#e4001b',
  opacity: 1,
  marginTop: '6px'
};

function RegisterScreen() : JSX.Element {
  const isSubmitting = useAppSelector(getSubmittingStatus);

  const {
    agreementError,
    roleError,
    genderError,
    locationError,
    currentUser,
    isAgreementChecked,
    isDropdownOpen,
    handlePasswordChange,
    handleBirthdayChange,
    handleNameChange,
    handleEmailChange,
    handleGoQuestion,
    handleRoleChange,
    handleAgreementChange,
    handleLocationChange,
    handleSexChange,
    handleToggleDropdown } = useRegisterForm();

  if(!currentUser){
    return <Loading/>;
  }

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
                      selectedValue={currentUser.location && capitalizeFirstLetter(currentUser.location)}
                      object={Object.values(Location)}
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
                      selectedValue={currentUser.gender}
                      onValueChange={handleSexChange}
                      object={Object.values(Gender)}
                      error={genderError}
                    />
                  </div>
                  <div className="sign-up__role">
                    <h2 className="sign-up__legend">Выберите роль</h2>
                    <div className="role-selector sign-up__role-selector">
                      {Object.values(Role)
                        .map((role) => (
                          <div key={role} className="role-btn">
                            <label>
                              <input
                                className="visually-hidden"
                                type="radio"
                                name="role"
                                value={role}
                                checked={currentUser ? currentUser.role === role : false}
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
                  <button className="btn sign-up__button" type="submit" disabled={isSubmitting}>Продолжить</button>
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
