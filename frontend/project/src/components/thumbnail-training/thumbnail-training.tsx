type ThumbnailTrainingProps = {
  title: string;
  imageSrc: string;
  price: number;
  hashtags: string[];
  rate: number;
  text: string;
}
function ThumbnailTraining({ title, imageSrc, price, hashtags, rate, text }: ThumbnailTrainingProps): JSX.Element {
  return (
    <li className="popular-trainings__item">
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image">
            <picture>
              <source type="image/webp" srcSet={`${imageSrc}.webp, ${imageSrc}@2x.webp 2x`} />
              <img src={`${imageSrc}.jpg`} srcSet={`${imageSrc}@2x.jpg 2x`} width="330" height="190" alt="" />
            </picture>
          </div>
          <p className="thumbnail-training__price"><span className="thumbnail-training__price-value">{price}</span><span>₽</span></p>
          <h3 className="thumbnail-training__title">{title}</h3>
          <div className="thumbnail-training__info">
            <ul className="thumbnail-training__hashtags-list">
              {hashtags.map((hashtag) => (
                <li key={hashtag} className="thumbnail-training__hashtags-item">
                  <div className="hashtag thumbnail-training__hashtag"><span>{hashtag}</span></div>
                </li>
              ))}
            </ul>
            <div className="thumbnail-training__rate">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg><span className="thumbnail-training__rate-value">{rate}</span>
            </div>
          </div>
          <div className="thumbnail-training__text-wrapper">
            <p className="thumbnail-training__text" dangerouslySetInnerHTML={{ __html: text }}></p>
          </div>
          <div className="thumbnail-training__button-wrapper">
            <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
            <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
          </div>
        </div>
      </div>
    </li>
  );
}

export default ThumbnailTraining;
