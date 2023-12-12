import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';

type ThumbnailTrainingWrapperProps = {
  trainingId: string;
}

function ThumbnailTrainingWrapper({trainingId}: ThumbnailTrainingWrapperProps): JSX.Element {
  const navigate = useNavigate();

  const handleTrainingClick = (evt: React.MouseEvent<HTMLAnchorElement>): void => {
    evt.preventDefault();
    if (trainingId) {
      navigate(`${AppRoute.Trainings}/${trainingId}`);
    }
  };

  return (
    <div className="thumbnail-training__button-wrapper">
      <Link className="btn btn--small thumbnail-training__button-catalog" to="" onClick={handleTrainingClick}>Подробнее</Link>
      <Link className="btn btn--small btn--outlined thumbnail-training__button-catalog" to="">Отзывы</Link>
    </div>
  );
}

export default ThumbnailTrainingWrapper;
