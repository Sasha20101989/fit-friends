import { Link } from 'react-router-dom';

type TrainingItemProps = {
  training: Training;
}

type Training = {
  imageSrc: string;
  imageSrcSet: string;
  price: string | number;
  title: string;
  hashtags: string[];
  rate: number;
  text: string;
};

function TrainingItem({ training }: TrainingItemProps):JSX.Element {
  const { imageSrc, imageSrcSet, price, title, hashtags, rate, text } = training;
  return (
    <li className="my-trainings__item">
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image">
            <picture>
              <source type="image/webp" srcSet={imageSrcSet} />
              <img src={imageSrc} srcSet={`${imageSrcSet} 2x`} width="330" height="190" alt="" />
            </picture>
          </div>
          <p className="thumbnail-training__price">{price}</p>
          <h3 className="thumbnail-training__title">{title}</h3>
          <div className="thumbnail-training__info">
            <ul className="thumbnail-training__hashtags-list">
              {hashtags.map((hashtag) => (
                <li key={hashtag} className="thumbnail-training__hashtags-item">
                  <div className="hashtag thumbnail-training__hashtag">
                    <span>{hashtag}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="thumbnail-training__rate">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg>
              <span className="thumbnail-training__rate-value">{rate}</span>
            </div>
          </div>
          <div className="thumbnail-training__text-wrapper">
            <p className="thumbnail-training__text">{text}</p>
          </div>
          <div className="thumbnail-training__button-wrapper">
            <Link className="btn btn--small thumbnail-training__button-catalog" to="">
              Подробнее
            </Link>
            <Link className="btn btn--small btn--outlined thumbnail-training__button-catalog" to="">
              Отзывы
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export default TrainingItem;
