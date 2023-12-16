import { Link, useNavigate } from 'react-router-dom';
import { User } from '../../types/user.interface';
import { AppRoute } from '../../const';
import Image from '../image/image';

type ThumbnailUserProps = {
  sourceName: string;
  childSourceName: string;
  buttonSourceName: string;
  user: User;
}

function ThumbnailUser({ sourceName, childSourceName, buttonSourceName, user }: ThumbnailUserProps): JSX.Element {
  const navigate = useNavigate();

  const { avatar, name, location, workoutTypes } = user;
  const hashtags = workoutTypes;

  const handleUserClick = (evt: React.MouseEvent<HTMLAnchorElement>): void => {
    evt.preventDefault();
    const userId = user?.id;
    if (userId && user) {
      navigate(`${AppRoute.Users}/${userId}`);
    }
  };

  return (
    <li className={sourceName}>
      <div className={childSourceName}>
        <Image sourceName={'thumbnail-user__image'} imageSrc={avatar ? avatar : ''} width={82} height={82} alt={'аватар пользователя'}/>
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
              <div className="hashtag thumbnail-user__hashtag">
                <span>{`#${hashtag}`}</span>
              </div>
            </li>
          ))}
        </ul>
        {user.id && <Link className={buttonSourceName} to="" onClick={handleUserClick}>Подробнее</Link>}
      </div>
    </li>
  );
}

export default ThumbnailUser;
