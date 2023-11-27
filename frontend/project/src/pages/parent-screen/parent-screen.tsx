import { useGoToLogin } from '../../hooks/use-go-to-login/use-go-to-login';
import { useGoToRegister } from '../../hooks/use-go-to-register/use-go-to-register';
import IntroBackground from '../../components/intro/intro-background';
import IntroIcon from '../../components/intro/intro-icon';
import IntroTitleLogo from '../../components/intro/intro-title-logo';
import IntroButtons from '../../components/intro/intro-buttons';

function ParentScreen(): JSX.Element {
  const handleGoToRegisterClick = useGoToRegister();
  const handleGoToLoginClick = useGoToLogin();

  return(
    <div className="intro">
      <IntroBackground/>
      <div className="intro__wrapper">
        <IntroIcon/>
        <IntroTitleLogo/>
        <IntroButtons handleGoToRegisterClick={handleGoToRegisterClick} handleGoToLoginClick={handleGoToLoginClick} />
      </div>
    </div>
  );
}

export default ParentScreen;
