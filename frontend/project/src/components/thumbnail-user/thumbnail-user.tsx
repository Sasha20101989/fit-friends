import { Link } from 'react-router-dom';
import ThumbnailPicture from '../thumbnail-picture/thumbnail-picture';

type ThumbnailUserProps = {
  name: string;
  imageSrc: string;
  location: string;
  hashtags: string[];
}

function ThumbnailUser({ name, imageSrc, location, hashtags }: ThumbnailUserProps): JSX.Element {
  const theme = 'light';
  return (
    <li className="look-for-company__item">
      <div className={`thumbnail-user thumbnail-user--role-user thumbnail-user--${theme}`}>
        <ThumbnailPicture sourceName={'thumbnail-user__image'} imageSrc={imageSrc} width={82} height={82} alt={'аватар пользователя'}/>
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
        <Link className={`btn btn--outlined btn--${theme}-bg btn--medium thumbnail-user__button`} to="">Подробнее</Link>
      </div>
    </li>
  );
}

export default ThumbnailUser;
