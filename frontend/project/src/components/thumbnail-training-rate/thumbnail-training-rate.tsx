type ThumbnailTrainingRateProps = {
  rate: number;
}

function ThumbnailTrainingRate({ rate }: ThumbnailTrainingRateProps): JSX.Element {
  return (
    <div className="thumbnail-training__rate">
      <svg width="16" height="16" aria-hidden="true">
        <use xlinkHref="#icon-star"></use>
      </svg>
      <span className="thumbnail-training__rate-value">{rate}</span>
    </div>
  );
}

export default ThumbnailTrainingRate;
