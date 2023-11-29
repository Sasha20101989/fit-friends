import { Link } from 'react-router-dom';
import ThumbnailTrainingPicture from '../thumbnail-picture/thumbnail-picture';
import ThumbnailTrainingTotal from '../thumbnail-training-total/thumbnail-training-total';
import ThumbnailTrainingHashtags from '../thumbnail-training-hashtags/thumbnail-training-hashtags';
import ThumbnailTrainingRate from '../thumbnail-training-rate/thumbnail-training-rate';
import ThumbnailTrainingText from '../thumbnail-training-text/thumbnail-training-text';

type ThumbnailTrainingOrderProps = {
  title: string;
  imageSrc: string;
  price: number;
  hashtags: string[];
  rate: number;
  text: string;
}

function ThumbnailTrainingOrder({ title, imageSrc, price, hashtags, rate, text }: ThumbnailTrainingOrderProps): JSX.Element {
  return (
    <li className="my-orders__item">
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <ThumbnailTrainingPicture imageSrc={imageSrc} sourceName={'thumbnail-training__image'} width={330} height={190}/>
          <p className="thumbnail-training__price">
            <span className="thumbnail-training__price-value">{price}</span>
            <span>₽</span>
          </p>
          <h2 className="thumbnail-training__title">{title}</h2>
          <div className="thumbnail-training__info">
            <ThumbnailTrainingHashtags hashtags={hashtags}/>
            <ThumbnailTrainingRate rate={rate}/>
          </div>
          <ThumbnailTrainingText text={text}/>
          <Link className="btn-flat btn-flat--underlined thumbnail-training__button-orders" to="">
            <svg width="18" height="18" aria-hidden="true">
              <use xlinkHref="#icon-info"></use>
            </svg>
            <span>Подробнее</span>
          </Link>
        </div>
        <ThumbnailTrainingTotal/>
      </div>
    </li>
  );
}

export default ThumbnailTrainingOrder;
