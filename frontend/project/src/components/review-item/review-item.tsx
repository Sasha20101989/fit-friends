import { Review } from '../../types/review.type';
import Image from '../image/image';

type ReviewItemProps = {
  review: Review;
}

function ReviewItem({review}: ReviewItemProps): JSX.Element {
  return(
    <li className="reviews-side-bar__item">
      <div className="review">
        <div className="review__user-info">
          <Image imageSrc={review.user.avatar ? review.user.avatar : ''} sourceName={'review__user-photo'} width={64} height={64} alt='аватар пользователя оставившего отзыв'/>
          <span className="review__user-name">{review.user.name}</span>
          <div className="review__rating">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <span>{review.rating}</span>
          </div>
        </div>
        <p className="review__comment">{review.text}</p>
      </div>
    </li>
  );
}

export default ReviewItem;
