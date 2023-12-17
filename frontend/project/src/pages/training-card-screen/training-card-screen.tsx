import { useParams } from 'react-router-dom';
import { editTrainingAction, fetchTrainingAction } from '../../store/api-actions/trainings-api-actions/trainings-api-actions';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { getLoadingStatus, getReviews, getTraining } from '../../store/main-data/main-data.selectors';
import { Training } from '../../types/training.type';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import HashtagList from '../../components/hashtag-list/hashtag-list';
import { getCurrentRole } from '../../store/main-process/main-process.selectors';
import { Role } from '../../types/role.enum';
import { Review } from '../../types/review.type';
import ReviewItem from '../../components/review-item/review-item';
import TrainingEditButton from '../../components/training-edit-button/training-edit-button';
import UpdateTrainingDto from '../../dto/update-training.dto';
import VideoSection from '../../components/video-section/video-section';
import TrainingCardButton from '../../components/training-card-button/training-card-button';
import Loading from '../../components/loading/loading';
import Layout from '../../components/layout/layout';
import { AppRoute } from '../../const';
import GoBack from '../../components/go-back/go-back';
import Image from '../../components/image/image';
import PopupFeedback from '../../components/popup-feedback/popup-feedback';
import { createReviewAction, fetchReviewsAction } from '../../store/api-actions/review-api-actions/review-api-actions';
import CreateReviewDto from '../../dto/create-review.dto';
import PopupBuy from '../../components/popup-buy/popup-buy';
import { PurchaseType } from '../../types/purchase-type.enum';
import { PaymentMethod } from '../../types/payment-method.enum';
import CreateOrderDto from '../../dto/create-order.dto';
import { createOrderAction } from '../../store/api-actions/order-api-actions/order-api-actions';

function TrainingCardScreen() : JSX.Element {
  const dispatch = useAppDispatch();

  const currentRole = useAppSelector(getCurrentRole);
  const training: Training | null = useAppSelector(getTraining);
  const reviews: Review[] = useAppSelector(getReviews);

  const isLoading = useAppSelector(getLoadingStatus);

  const { trainingId } = useParams<{ trainingId: string }>();

  const [editedTrainingName, setEditedTrainingName] = useState<string | ''>('');
  const [editedTrainingPrice, setEditedTrainingPrice] = useState<number | ''>('');
  const [error, setError] = useState('');
  const [isFormEditable, setIsFormEditable] = useState<boolean>(false);
  const [isFeedbackFormOpen, setIsFeedbackFormOpen] = useState(false);
  const [isBuyFormOpen, setIsBuyFormOpen] = useState(false);

  useEffect(() => {
    if(trainingId){
      dispatch(fetchTrainingAction({trainingId}));
      dispatch(fetchReviewsAction({trainingId}));
    }
  }, [dispatch, trainingId]);

  if (isLoading) {
    return <Loading/>;
  }

  if (!training) {
    return <NotFoundScreen/>;
  }

  const handleTrainingNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();

    const newName = evt.currentTarget.value;
    setEditedTrainingName(newName);

    if (!newName) {
      setError('Обязательное поле');
    } else {
      setError('');
    }
  };

  const handleTrainingPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();

    const inputValue = evt.currentTarget.value;
    const newPrice: number | '' = inputValue === '' ? '' : parseInt(inputValue, 10);

    if (typeof newPrice === 'number' && !isNaN(newPrice)) {
      setEditedTrainingPrice(newPrice);
    } else {
      setEditedTrainingPrice('');
      setError('Введите число');
    }
  };

  const handleToggleFormEditable = (): void => {
    setIsFormEditable(!isFormEditable);
  };

  const handleSave = () => {
    if (currentRole === Role.Trainer) {
      const trainingData: UpdateTrainingDto = {};

      if (editedTrainingName && editedTrainingName.trim() !== '') {
        trainingData.name = editedTrainingName;
      }

      if (editedTrainingPrice !== '') {
        trainingData.price = editedTrainingPrice;
      }

      if (Object.keys(trainingData).length > 0) {
        trainingData.id = training.id;
        dispatch(editTrainingAction(trainingData));
      }
    }
  };

  const handleShowReviewForm = () => {
    setIsFeedbackFormOpen(true);
  };

  const handleCloseFeedbackForm = () => {
    setIsFeedbackFormOpen(false);
  };

  const handleShowBuyForm = () => {
    setIsBuyFormOpen(true);
  };

  const handleCloseBuyForm = () => {
    setIsBuyFormOpen(false);
  };

  const hashtags = [`${training.workoutType}`, `${training.genderPreference}`, `${training.calories}ккал`, `${training.workoutDuration}`];

  const handleFeedbackSubmit = (rating: number, text: string): void => {
    if(trainingId){
      const reviewData: CreateReviewDto = {
        rating,
        text
      };

      dispatch(createReviewAction({trainingId, reviewData}));
      handleCloseFeedbackForm();
      dispatch(fetchReviewsAction({trainingId}));
    }
  };

  const handleBuySubmit = (purchaseType: PurchaseType, quantity: number, paymentMethod: PaymentMethod): void => {
    if(trainingId){
      const orderData: CreateOrderDto = {
        purchaseType,
        quantity,
        paymentMethod
      };

      dispatch(createOrderAction({trainingId, orderData}));
      handleCloseBuyForm();
    }
  };

  return(
    <Layout>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Карточка тренировки</h1>
            <aside className="reviews-side-bar">
              <GoBack sourceName={'btn-flat btn-flat--underlined reviews-side-bar__back'} width={14} height={10} route={AppRoute.Main}/>
              <h2 className="reviews-side-bar__title">Отзывы</h2>
              <ul className="reviews-side-bar__list">
                {reviews.map((review) =>
                  <ReviewItem key={review.createdAt} review={review}/>
                )}
              </ul>
              {currentRole === Role.User && <button className="btn btn--medium reviews-side-bar__button" type="button" onClick={handleShowReviewForm}>Оставить отзыв</button>}
            </aside>
            {isFeedbackFormOpen && <PopupFeedback onClose={handleCloseFeedbackForm} onSubmit={handleFeedbackSubmit}/>}
            {isBuyFormOpen && <PopupBuy trainingTitle={training.name} trainingImage={training.backgroundImage} trainingPrice={training.price} onClose={handleCloseBuyForm} onSubmit={handleBuySubmit}/>}
            <div className="training-card">
              <div className="training-info">
                <h2 className="visually-hidden">Информация о тренировке</h2>
                <div className="training-info__header">
                  <div className="training-info__coach">
                    <Image imageSrc={training.trainer.avatar ?? ''} sourceName={'training-info__coach'} width={64} height={64} alt={'аватар пользователя'}/>
                    <div className="training-info__coach-info">
                      <span className="training-info__label">{training.trainer.role}</span>
                      <span className="training-info__name">{training.trainer.name}</span>
                    </div>
                  </div>
                  {currentRole === Role.Trainer && <TrainingEditButton isFormEditable={isFormEditable} onToggleFormEditable={handleToggleFormEditable} onSave={handleSave}/>}
                </div>
                <div className="training-info__main-content">
                  <form action="#" method="get">
                    <div className="training-info__form-wrapper">
                      <div className="training-info__info-wrapper">
                        <div className="training-info__input training-info__input--training">
                          <label>
                            <span className="training-info__label">Название тренировки</span>
                            <input
                              type="text"
                              name="training"
                              value={editedTrainingName ? editedTrainingName : training.name}
                              disabled={!isFormEditable}
                              onChange={handleTrainingNameChange}
                            />
                          </label>
                          {error && <div className="training-info__error">{error}</div>}
                        </div>
                        <div className="training-info__textarea">
                          <label><span className="training-info__label">Описание тренировки</span>
                            <textarea name="description" value={training.description} disabled></textarea>
                          </label>
                        </div>
                      </div>
                      <div className="training-info__rating-wrapper">
                        <div className="training-info__input training-info__input--rating">
                          <label>
                            <span className="training-info__label">Рейтинг</span>
                            <span className="training-info__rating-icon">
                              <svg width="18" height="18" aria-hidden="true">
                                <use xlinkHref="#icon-star"></use>
                              </svg>
                            </span>
                            <input type="number" name="rating" value={training.rating} disabled/>
                          </label>
                        </div>
                        <HashtagList
                          classType={'training-info__list'}
                          hashtagClassType={'training-info__item'}
                          hashtagItemClassType={'hashtag hashtag--white'}
                          hashtags={hashtags}
                        />
                      </div>
                      <div className="training-info__price-wrapper">
                        <div className="training-info__input training-info__input--price">
                          <label>
                            <span className="training-info__label">Стоимость</span>
                            <input
                              type="text"
                              name="price"
                              value={editedTrainingPrice !== '' ? `${editedTrainingPrice} ₽` : `${training.price} ₽`}
                              onChange={handleTrainingPriceChange}
                              disabled={!isFormEditable}
                            />
                          </label>
                          {error && <div className="training-info__error">{error}</div>}
                        </div>
                        <TrainingCardButton onBuyClick={handleShowBuyForm}/>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <VideoSection/>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
export default TrainingCardScreen;
