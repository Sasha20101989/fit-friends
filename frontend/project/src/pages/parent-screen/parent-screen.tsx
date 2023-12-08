import { useGoToLogin } from '../../hooks/use-go-to-login/use-go-to-login';
import { useGoToRegister } from '../../hooks/use-go-to-register/use-go-to-register';
import IntroIcon from '../../components/intro/intro-icon';
import IntroButtons from '../../components/intro/intro-buttons';
import Image from '../../components/image/image';
import Layout from '../../components/layout/layout';

function ParentScreen(): JSX.Element {
  const handleGoToRegisterClick = useGoToRegister();
  const handleGoToLoginClick = useGoToLogin();

  return(
    <Layout includeHeader={false}>
      <div className="intro">
        <Image sourceName={'intro__background'} imageSrc={'img/content/sitemap//background.jpg'} width={1440} height={1024} alt={'Фон с бегущей девушкой'}/>
        <div className="intro__wrapper">
          <IntroIcon/>
          <Image sourceName={'intro__title-logo'} imageSrc={'img/content/sitemap//title-logo.png'} width={934} height={455} alt={'Логотип Fit Friends'}/>
          <IntroButtons handleGoToRegisterClick={handleGoToRegisterClick} handleGoToLoginClick={handleGoToLoginClick} />
        </div>
      </div>
    </Layout>
  );
}

export default ParentScreen;
