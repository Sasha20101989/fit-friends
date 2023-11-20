import BackgroundLogo from '../../components/background-logo/background-logo';
import Layout from '../../components/layout/layout';
import { useAppSelector } from '../../hooks/index';
import useLoginForm from '../../hooks/use-login-form/use-login-form';
import { getSubmittingStatus } from '../../store/user-process/user-process.selectors';

function LoginScreen() : JSX.Element {
  const { loginRef, passwordRef, handleSubmit } = useLoginForm();
  const isSubmitting = useAppSelector(getSubmittingStatus);
  return(
    <Layout>
      <BackgroundLogo/>
      <div className="popup-form popup-form--sign-in">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__title-wrapper">
              <h1 className="popup-form__title">Вход</h1>
            </div>
            <div className="popup-form__form">
              <form method="post" onSubmit={handleSubmit}>
                <div className="sign-in">
                  <div className="custom-input sign-in__input">
                    <label>
                      <span className="custom-input__label">E-mail</span>
                      <span className="custom-input__wrapper">
                        <input type="email" name="email" id="email" ref={loginRef} required/>
                      </span>
                    </label>
                  </div>
                  <div className="custom-input sign-in__input">
                    <label>
                      <span className="custom-input__label">Пароль</span>
                      <span className="custom-input__wrapper">
                        <input type="password" name="password" id="passwordLogin" ref={passwordRef}/>
                      </span>
                    </label>
                  </div>
                  <button className="btn sign-in__button" type="submit" disabled={isSubmitting}>Продолжить</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default LoginScreen;
