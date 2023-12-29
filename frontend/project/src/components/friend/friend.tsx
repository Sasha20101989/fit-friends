import { Fragment } from 'react';
import { Request } from '../../types/request.type';
import { User } from '../../types/user.interface';
import Image from '../image/image';
import { notificationMessages } from '../../const';
import { RequestStatus } from '../../types/request-status.enum';

type FriendProps = {
  friend: User;
  requests: Request[];
}

function Friend({friend, requests}: FriendProps): JSX.Element{
  const { name, location, workoutTypes, readinessForWorkout } = friend;

  const friendRequest = requests.find(
    (request) => request.initiator?.id === friend.id
  );

  return(
    <li className="friends-list__item">
      <div className="thumbnail-friend">
        <div className='thumbnail-friend__info thumbnail-friend__info--theme-light'>
          <div className="thumbnail-friend__image-status">
            <Image sourceName={'thumbnail-friend__image'} imageSrc={friend.avatar ? friend.avatar : ''} width={78} height={78} alt={'аватар пользователя'}/>
          </div>
          <div className="thumbnail-friend__header">
            <h2 className="thumbnail-friend__name">{name}</h2>
            <div className="thumbnail-friend__location">
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="#icon-location"></use>
              </svg>
              <address className="thumbnail-friend__location-address">{location}</address>
            </div>
          </div>
          <ul className="thumbnail-friend__training-types-list">
            {workoutTypes.map((type) =>(
              <li key={type}>
                <div className="hashtag thumbnail-friend__hashtag">
                  <span>{`#${type}`}</span>
                </div>
              </li>)
            )}
          </ul>
          <div className="thumbnail-friend__activity-bar">
            <div className={`thumbnail-friend__ready-status thumbnail-friend__ready-status--is${!readinessForWorkout ? '-not' : ''}-ready`}><span>Готов к&nbsp;тренировке</span>
            </div>
          </div>
        </div>
        {friendRequest && friendRequest.status === RequestStatus.Pending && (
          <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
            <p className="thumbnail-friend__request-text">
              {notificationMessages[friendRequest.requestType]}
            </p>

              <div className="thumbnail-friend__button-wrapper">
                <button
                  className="btn btn--medium btn--dark-bg thumbnail-friend__button"
                  type="button"
                >
                  Принять
                </button>
                <button
                  className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button"
                  type="button"
                >
                  Отклонить
                </button>
              </div>
          </div>
        )}
        {friendRequest && friendRequest.status === RequestStatus.Rejected && (
          <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
            <p className="thumbnail-friend__request-text">
              {notificationMessages[friendRequest.requestType]} отклонён
            </p>
          </div>
        )}
        {friendRequest && friendRequest.status === RequestStatus.Accepted && (
          <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
            <p className="thumbnail-friend__request-text">
              {notificationMessages[friendRequest.requestType]} принят
            </p>
          </div>
        )}
      </div>
    </li>
  );
}

export default Friend;
