import { useEffect, useRef, useState } from 'react';
import PopupRateList from '../popup-rate-list/popup-rate-list';
import { REVIEW_TEXT_CONSTRAINTS } from '../../const';
import { toast } from 'react-toastify';

type PopupFeedbackProps = {
  onClose: () => void;
  onSubmit: (rating: number, text: string) => void;
}

function PopupFeedback({onClose, onSubmit}: PopupFeedbackProps): JSX.Element {
  const [selectedRating, setSelectedRating] = useState<number>(5);
  const textRef = useRef<HTMLTextAreaElement | null>(null);

  const handleRatingChange = (value: number) => {
    setSelectedRating(value);
  };

  const handleSubmit = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    if (textRef.current !== null) {
      const text = textRef.current.value.trim();
      const characterCount = text.length;

      if (characterCount >= REVIEW_TEXT_CONSTRAINTS.MIN && characterCount <= REVIEW_TEXT_CONSTRAINTS.MAX) {
        onSubmit(selectedRating, text);
      } else {
        if (characterCount < REVIEW_TEXT_CONSTRAINTS.MIN) {
          toast.warn(`Text must be at least ${REVIEW_TEXT_CONSTRAINTS.MIN} characters.`);
        } else if (characterCount > REVIEW_TEXT_CONSTRAINTS.MAX) {
          toast.warn(`Text must be no more than ${REVIEW_TEXT_CONSTRAINTS.MAX} characters.`);
        }
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return(
    <div className="popup-form popup-form--feedback">
      <section className="popup">
        <div className="popup__wrapper">
          <div className="popup-head">
            <h2 className="popup-head__header">Оставить отзыв</h2>
            <button className="btn-icon btn-icon--outlined btn-icon--big" type="button" aria-label="close" onClick={onClose}>
              <svg width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-cross"></use>
              </svg>
            </button>
          </div>
          <div className="popup__content popup__content--feedback">
            <h3 className="popup__feedback-title">Оцените тренировку</h3>
            <PopupRateList selectedRating={selectedRating} onRatingChange={handleRatingChange}/>
            <div className="popup__feedback">
              <h3 className="popup__feedback-title popup__feedback-title--text">Поделитесь своими впечатлениями о тренировке</h3>
              <div className="popup__feedback-textarea">
                <div className="custom-textarea">
                  <label>
                    <textarea name="description" id="description" ref={textRef} placeholder=""></textarea>
                  </label>
                </div>
              </div>
            </div>
            <div className="popup__button">
              <button className="btn" type="button" onClick={handleSubmit}>Продолжить</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PopupFeedback;
