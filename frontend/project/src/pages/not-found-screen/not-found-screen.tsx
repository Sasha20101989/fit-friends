import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/layout';
import { AppRoute } from '../../const';

function NotFoundScreen() : JSX.Element {
  const navigate = useNavigate();

  const handleButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    navigate(AppRoute.Main);
  };

  return(
    <Layout includeHeader={false}>
      <section className="error">
        <h1 className="error__title">404</h1>
        <span className="error__subtitle">Страница не найдена.</span>
        <p className="error__text"> Возможно, страница была удалена или<br/>её вовсе не существовало.</p>
        <button className="button button__error button--small button--black-border" onClick={handleButtonClick}>Продолжить покупки</button>
      </section>
    </Layout>
  );
}
export default NotFoundScreen;
