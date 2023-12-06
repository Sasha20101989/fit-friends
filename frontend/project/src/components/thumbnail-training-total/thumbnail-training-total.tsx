type ThumbnailTrainingTotalProps = {
  purchasedQuantity: number;
  totalSalesAmount: number;
}

function ThumbnailTrainingTotal({purchasedQuantity, totalSalesAmount}: ThumbnailTrainingTotalProps): JSX.Element {
  return (
    <div className="thumbnail-training__total-info">
      <div className="thumbnail-training__total-info-card">
        <svg width="32" height="32" aria-hidden="true">
          <use xlinkHref="#icon-chart"></use>
        </svg>
        <p className="thumbnail-training__total-info-value">{purchasedQuantity}</p>
        <p className="thumbnail-training__total-info-text">Куплено тренировок</p>
      </div>
      <div className="thumbnail-training__total-info-card">
        <svg width="31" height="28" aria-hidden="true">
          <use xlinkHref="#icon-wallet"></use>
        </svg>
        <p className="thumbnail-training__total-info-value">{totalSalesAmount}<span>₽</span></p>
        <p className="thumbnail-training__total-info-text">Общая сумма</p>
      </div>
    </div>
  );
}

export default ThumbnailTrainingTotal;
