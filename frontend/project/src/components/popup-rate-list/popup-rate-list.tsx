import { memo } from 'react';
import { RATING_CONSTRAINTS } from '../../const';

type PopupRateListProps = {
  selectedRating: number;
  onRatingChange: (value: number) => void;
}

function PopupRateList({selectedRating, onRatingChange}: PopupRateListProps): JSX.Element {

  const handleRatingChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    onRatingChange(parseInt(evt.target.value, 10));
  };

  return (
    <ul className="popup__rate-list">
      {Array.from({ length: RATING_CONSTRAINTS.MAX - RATING_CONSTRAINTS.MIN + 1 }, (_, index) => RATING_CONSTRAINTS.MIN + index).map((rating) => (
        <li key={rating} className="popup__rate-item">
          <div className="popup__rate-item-wrap">
            <label>
              <input
                type="radio"
                name="оценка тренировки"
                aria-label={`оценка ${rating}.`}
                value={rating}
                checked={selectedRating === rating}
                onChange={handleRatingChange}
              />
              <span className="popup__rate-number">{rating}</span>
            </label>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default memo(PopupRateList);
