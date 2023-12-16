import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';

type GoBackProps = {
  sourceName: string;
  width: number;
  height: number;
  route: AppRoute;
}

function GoBack({sourceName, width, height, route}: GoBackProps): JSX.Element {
  const navigate = useNavigate();

  function handleGoBack(evt: React.MouseEvent<HTMLButtonElement>): void {
    evt.preventDefault();
    navigate(route);
  }

  return(
    <button className={sourceName} type="button" onClick={handleGoBack}>
      <svg width={width} height={height} aria-hidden="true">
        <use xlinkHref="#arrow-left"></use>
      </svg><span>Назад</span>
    </button>
  );
}

export default GoBack;
