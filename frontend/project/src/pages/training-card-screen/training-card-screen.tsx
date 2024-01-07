import { useParams } from 'react-router-dom';
import { editTrainingAction, fetchTrainingAction } from '../../store/api-actions/trainings-api-actions/trainings-api-actions';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { getLoadingStatus, getReviews, getTraining } from '../../store/main-data/main-data.selectors';
import { Training } from '../../types/training.type';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import HashtagList from '../../components/hashtag-list/hashtag-list';
import { Role } from '../../types/role.enum';
import { Review } from '../../types/review.type';
import ReviewItem from '../../components/review-item/review-item';
import TrainingEditButton from '../../components/training-edit-button/training-edit-button';
import UpdateTrainingDto from '../../dto/update-training.dto';
import VideoSection from '../../components/video-section/video-section';
import TrainingCardButton from '../../components/training-card-button/training-card-button';
import Loading from '../../components/loading/loading';
import Layout from '../../components/layout/layout';
import { AppRoute, DESCRIPTION_CONSTRAINTS, DISCOUNT_PERCENTAGE, PRICE_CONSTRAINTS, TRAINING_NAME_CONSTRAINTS } from '../../const';
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
import { getBalance } from '../../store/balance-data/balance-data.selectors';
import { UserBalance } from '../../types/user-balance.type';
import { addTrainingInBalanceAction, fetchBalanceAction } from '../../store/api-actions/balance-api-actions/balance-api-actions';
import CreateBalanceDto from '../../dto/create-balance.dto';
import { getCurrentUser } from '../../store/user-process/user-process.selectors';

function TrainingCardScreen() : JSX.Element {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(getCurrentUser);

  const training: Training | null = useAppSelector(getTraining);
  const reviews: Review[] = useAppSelector(getReviews);
  const balance: UserBalance[] = useAppSelector(getBalance);
  const trainings: Training[] = balance.map((userBalance) => userBalance.training);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const isLoading = useAppSelector(getLoadingStatus);

  const { trainingId } = useParams<{ trainingId: string }>();

  const [isFormEditable, setIsFormEditable] = useState<boolean>(false);
  const [isFeedbackFormOpen, setIsFeedbackFormOpen] = useState(false);
  const [isBuyFormOpen, setIsBuyFormOpen] = useState(false);
  const [isInBalance, setIsInBalance] = useState<boolean>(false);
  const [nameInputValue, setNameInputValue] = useState('');
  const [descriptionInputValue, setDescriptionInputValue] = useState('');
  const [priceInputValue, setPriceInputValue] = useState('');
  const [specialValue, setSpecialValue] = useState(false);

  useEffect(() => {
    if(training){
      setNameInputValue(training.name);
      setDescriptionInputValue(training.description);
      setSpecialValue(training.specialOffer);
      setPriceInputValue(training.price.toString());
    }
  }, [training]);

  useEffect(() => {
    if(trainingId){
      dispatch(fetchTrainingAction({trainingId}));
      dispatch(fetchReviewsAction({trainingId}));
      dispatch(fetchBalanceAction({}));
    }
  }, [dispatch, trainingId]);

  useEffect(() => {
    if (trainingId && trainings.length > 0) {
      setIsInBalance(trainings.some((trainingItem) => trainingItem.id === trainingId));
    }
  }, [trainings, trainingId, isInBalance]);

  if (isLoading) {
    return <Loading/>;
  }

  if (!training) {
    return <NotFoundScreen/>;
  }

  const handleToggleFormEditable = (): void => {
    setIsFormEditable(!isFormEditable);
  };

  const handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setNameInputValue(evt.target.value);
  };

  const handleDescriptionChange = (evt: ChangeEvent<HTMLTextAreaElement>): void => {
    setDescriptionInputValue(evt.target.value);
  };

  const handlePriceChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    const numericValue = evt.target.value.replace(/[^\d]/g, '');

    setPriceInputValue(numericValue);

    if (numericValue === '') {
      setPriceInputValue('');
    } else {
      setPriceInputValue(numericValue);
    }

    setSpecialValue(false);
  };

  const handleSave = () => {
    if (currentUser && currentUser.role === Role.Trainer) {
      const trainingData: UpdateTrainingDto = {};

      if (nameRef.current && nameRef.current.value.trim() !== '') {
        trainingData.name = nameRef.current.value;
      }

      if (priceRef.current && priceRef.current.value !== ' ₽') {
        trainingData.price = parseInt(priceRef.current.value, 10);
      }else if(priceRef.current && priceRef.current.value === ' ₽'){
        trainingData.price = PRICE_CONSTRAINTS.MIN;
      }

      if (descriptionRef.current && descriptionRef.current.value !== '') {
        trainingData.description = descriptionRef.current.value;
      }

      if (Object.keys(trainingData).length > 0) {
        trainingData.id = training.id;
        trainingData.specialOffer = specialValue;
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

  const handleDiscountClick = () => {
    if(priceRef.current){
      setSpecialValue(true);
      const newPrice = (parseInt(priceRef.current.value, 10) * DISCOUNT_PERCENTAGE).toFixed(0);
      setPriceInputValue(newPrice);
    }
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

      const balanceData: CreateBalanceDto = {
        availableQuantity: quantity,
      };

      dispatch(createOrderAction({trainingId, orderData}));
      dispatch(addTrainingInBalanceAction({trainingId, balanceData}))
        .then(() => {
          dispatch(fetchBalanceAction({}));
        });

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
              {currentUser && currentUser.role === Role.User && <button className="btn btn--medium reviews-side-bar__button" type="button" onClick={handleShowReviewForm}>Оставить отзыв</button>}
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
                  {currentUser && currentUser.role === Role.Trainer && <TrainingEditButton isFormEditable={isFormEditable} onToggleFormEditable={handleToggleFormEditable} onSave={handleSave}/>}
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
                              id="training"
                              ref={nameRef}
                              onChange={handleNameChange}
                              value={nameInputValue}
                              disabled={!isFormEditable}
                              required
                              minLength={TRAINING_NAME_CONSTRAINTS.MIN_LENGTH}
                              maxLength={TRAINING_NAME_CONSTRAINTS.MAX_LENGTH}
                            />
                          </label>
                        </div>
                        <div className="training-info__textarea">
                          <label>
                            <span className="training-info__label">Описание тренировки</span>
                            <textarea
                              name="description"
                              id="description"
                              ref={descriptionRef}
                              onChange={handleDescriptionChange}
                              value={descriptionInputValue}
                              disabled={!isFormEditable}
                              minLength={DESCRIPTION_CONSTRAINTS.MIN_LENGTH}
                              maxLength={DESCRIPTION_CONSTRAINTS.MAX_LENGTH}
                            >
                            </textarea>
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
                              id="price"
                              ref={priceRef}
                              onChange={handlePriceChange}
                              value={`${priceInputValue}${!isFormEditable ? ' ₽' : ''}`}
                              disabled={!isFormEditable}
                              required
                              min={PRICE_CONSTRAINTS.MIN}
                            />
                          </label>
                        </div>
                        {currentUser && <TrainingCardButton role={currentUser.role} onBuyClick={handleShowBuyForm} isSpecial={specialValue} isFormEditable={isFormEditable} onDiscountClick={handleDiscountClick}/>}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <VideoSection isInBalance={isInBalance}/>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
export default TrainingCardScreen;
