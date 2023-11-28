import { Link } from 'react-router-dom';

function ThumbnailTrainingWrapper(): JSX.Element {
  return (
    <div className="thumbnail-training__button-wrapper">
      <Link className="btn btn--small thumbnail-training__button-catalog" to="">Подробнее</Link>
      <Link className="btn btn--small btn--outlined thumbnail-training__button-catalog" to="">Отзывы</Link>
    </div>
  );
}

export default ThumbnailTrainingWrapper;
