import { Link } from 'react-router-dom';
import ThumbnailTrainingPicture from '../thumbnail-picture/thumbnail-picture';
import ThumbnailTrainingTotal from '../thumbnail-training-total/thumbnail-training-total';
import ThumbnailTrainingHashtags from '../thumbnail-training-hashtags/thumbnail-training-hashtags';
import ThumbnailTrainingRate from '../thumbnail-training-rate/thumbnail-training-rate';
import ThumbnailTrainingText from '../thumbnail-training-text/thumbnail-training-text';
import { TrainingOrder } from '../../types/training-order.type';

type ThumbnailTrainingOrderProps = {
  order: TrainingOrder;
}

function ThumbnailTrainingOrder({ order }: ThumbnailTrainingOrderProps): JSX.Element {
  const { backgroundImage, price, name, workoutType, rating, description, totalSalesAmount, purchasedQuantity } = order;
  const hashTags = [workoutType];

  return (
    <li className="my-orders__item">
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <ThumbnailTrainingPicture imageSrc={backgroundImage} sourceName={'thumbnail-training__image'} width={330} height={190}/>
          <p className="thumbnail-training__price">
            <span className="thumbnail-training__price-value">{price}</span>
            <span>₽</span>
          </p>
          <h2 className="thumbnail-training__title">{name}</h2>
          <div className="thumbnail-training__info">
            <ThumbnailTrainingHashtags hashtags={hashTags}/>
            <ThumbnailTrainingRate rate={rating}/>
          </div>
          <ThumbnailTrainingText text={description}/>
          <Link className="btn-flat btn-flat--underlined thumbnail-training__button-orders" to="">
            <svg width="18" height="18" aria-hidden="true">
              <use xlinkHref="#icon-info"></use>
            </svg>
            <span>Подробнее</span>
          </Link>
        </div>
        <ThumbnailTrainingTotal purchasedQuantity={purchasedQuantity} totalSalesAmount={totalSalesAmount}/>
      </div>
    </li>
  );
}

export default ThumbnailTrainingOrder;
