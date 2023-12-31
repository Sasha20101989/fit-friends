import { Link } from 'react-router-dom';
import HashtagList from '../../components/hashtag-list/hashtag-list';
import { Role } from '../../types/role.enum';
import { User } from '../../types/user.interface';
import CardGalery from '../../components/card-galery/card-galery';
import { useState } from 'react';
import PopupMap from '../popup-map/popup-map';

type UserCardProps = {
  user: User;
  isFriend: boolean;
  onAddFriend: () => void;
  onRemoveFriend: () => void;
};

function UserCard({ user, isFriend, onAddFriend, onRemoveFriend }: UserCardProps) : JSX.Element {
  const { name, location, description, workoutTypes, role, readinessForWorkout } = user;
  const [isMapOpen, setIsMapOpen] = useState(false);

  const handleShowMap = () => {
    setIsMapOpen(true);
  };

  const handleCloseMap = () => {
    setIsMapOpen(false);
  };

  return(
    <section className="user-card">
      <h1 className="visually-hidden">Карточка пользователя</h1>
      <div className="user-card__wrapper">
        <div className="user-card__content">
          <div className="user-card__head">
            <h2 className="user-card__title">{name}</h2>
          </div>
          <div className="user-card__label">
            <Link to="" onClick={handleShowMap}>
              <svg className="user-card-coach__icon-location" width="12" height="14" aria-hidden="true">
                <use xlinkHref="#icon-location"></use>
              </svg>
              <span>{location}</span>
            </Link>
          </div>
          {readinessForWorkout &&
            <div className="user-card__status">
              <span>Готов к тренировке</span>
            </div>}
          <div className="user-card__text">
            {description && <p>{description}</p>}
          </div>
          <HashtagList
            classType={'user-card__hashtag-list'}
            hashtagClassType={'user-card__hashtag-item'}
            hashtagItemClassType={'hashtag'}
            hashtags={workoutTypes}
          />
          {isFriend ? (
            <button className="btn btn--outlined user-card__friend-btn" type="button" onClick={onRemoveFriend}>
              Убрать из друзей
            </button>
          ) : (
            <button className="btn user-card__friend-btn" type="button" onClick={onAddFriend}>
              Добавить в друзья
            </button>
          )}
        </div>
        <CardGalery isCoach={role === Role.Trainer}/>
        {isMapOpen && <PopupMap name={name} station={location} onClose={handleCloseMap}/>}
      </div>
    </section>
  );
}
export default UserCard;
