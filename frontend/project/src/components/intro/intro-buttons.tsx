import { Link } from 'react-router-dom';

type IntroButtonsProps = {
  handleGoToRegisterClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleGoToLoginClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

function IntroButtons({ handleGoToRegisterClick, handleGoToLoginClick }: IntroButtonsProps): JSX.Element {
  return (
    <div className="intro__buttons" data-testid="intro-buttons">
      <button className="btn intro__button" type="button" onClick={handleGoToRegisterClick}>Регистрация</button>
      <p className="intro__text">Есть аккаунт?
        <Link className="intro__link" to="" onClick={handleGoToLoginClick}>Вход</Link>
      </p>
    </div>
  );
}

export default IntroButtons;
