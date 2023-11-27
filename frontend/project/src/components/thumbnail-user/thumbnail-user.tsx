type ThumbnailUserProps = {
  name: string;
  imageSrc: string;
  location: string;
  hashtags: string[];
}

function ThumbnailUser({ name, imageSrc, location, hashtags }: ThumbnailUserProps): JSX.Element {
  return (
    <li className="look-for-company__item">
      <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
        <div className="thumbnail-user__image">
          <picture>
            <source type="image/webp" srcSet={`${imageSrc}.webp, ${imageSrc}@2x.webp 2x`} />
            <img src={`${imageSrc}.jpg`} srcSet={`${imageSrc}@2x.jpg 2x`} width="82" height="82" alt="" />
          </picture>
        </div>
        {/* <div className="thumbnail-user__top-status thumbnail-user__top-status--role-user">
                      <svg width="12" height="12" aria-hidden="true">
                        <use xlinkHref="#icon-crown"></use>
                      </svg>
                    </div> */}
        <div className="thumbnail-user__header">
          <h3 className="thumbnail-user__name">{name}</h3>
          <div className="thumbnail-user__location">
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-location"></use>
            </svg>
            <address className="thumbnail-user__location-address">{location}</address>
          </div>
        </div>
        <ul className="thumbnail-user__hashtags-list">
          {hashtags.map((hashtag) => (
            <li key={hashtag} className="thumbnail-user__hashtags-item">
              <div className="hashtag thumbnail-user__hashtag"><span>{hashtag}</span></div>
            </li>
          ))}
        </ul>
        <a className="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button" href="#">Подробнее</a>
      </div>
    </li>
  );
}

export default ThumbnailUser;
