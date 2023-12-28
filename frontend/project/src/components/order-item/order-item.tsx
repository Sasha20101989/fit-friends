import { Link, useNavigate } from 'react-router-dom';
import ThumbnailTrainingTotal from '../thumbnail-training-total/thumbnail-training-total';
import ThumbnailTrainingRate from '../training-rate/training-rate';
import ThumbnailTrainingText from '../thumbnail-training-text/thumbnail-training-text';
import { TrainingOrder } from '../../types/training-order.type';
import { useAppSelector } from '../../hooks/index';
import { AppRoute } from '../../const';
import HashtagList from '../hashtag-list/hashtag-list';
import Image from '../image/image';
import { memo } from 'react';
import { getCurrentUser } from '../../store/user-process/user-process.selectors';

type OrderItemProps = {
  order: TrainingOrder;
}

function OrderItem({ order }: OrderItemProps): JSX.Element | null {
  const navigate = useNavigate();

  const { training, backgroundImage, price, name, workoutType, rating, description, totalSalesAmount, purchasedQuantity, calories } = order;

  const hashtags = [workoutType, `${calories}ккал`];

  const currentUser = useAppSelector(getCurrentUser);

  if(!currentUser){
    return null;
  }

  const handleTrainingClick = (evt: React.MouseEvent<HTMLAnchorElement>): void => {
    evt.preventDefault();
    const trainerId = currentUser.id;
    if (trainerId && training) {
      navigate(`${AppRoute.Trainings}/${training}`);
    }
  };

  return (
    <li className="my-orders__item">
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <Image imageSrc={backgroundImage} sourceName={'thumbnail-training__image'} width={330} height={190} alt={'тренировка'}/>
          <p className="thumbnail-training__price">
            <span className="thumbnail-training__price-value">{price === 0 ? 'Бесплатно' : price}</span>
            {price !== 0 && <span>₽</span>}
          </p>
          <h2 className="thumbnail-training__title">{name}</h2>
          <div className="thumbnail-training__info">
            <HashtagList classType={'thumbnail-training__hashtags-list'} hashtagClassType={'thumbnail-training__hashtags-item'} hashtagItemClassType={'hashtag thumbnail-training__hashtag'} hashtags={hashtags}/>
            <ThumbnailTrainingRate rate={rating}/>
          </div>
          <ThumbnailTrainingText text={description}/>
          <Link className="btn-flat btn-flat--underlined thumbnail-training__button-orders" to="" onClick={handleTrainingClick}>
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

export default memo(OrderItem);
