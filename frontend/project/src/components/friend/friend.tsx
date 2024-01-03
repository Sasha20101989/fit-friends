import { Request } from '../../types/request.type';
import { User } from '../../types/user.interface';
import Image from '../image/image';
import { notificationMessages } from '../../const';
import { RequestStatus } from '../../types/request-status.enum';
import { RequestType } from '../../types/request-type.enum';

type FriendProps = {
  friend: User;
  request: Request | undefined;
  onAccept: (evt: React.MouseEvent<HTMLButtonElement>, request: Request) => void;
  onReject: (evt: React.MouseEvent<HTMLButtonElement>, request: Request) => void;
}

function Friend({ friend, request, onAccept, onReject }: FriendProps): JSX.Element {
  const { name, location, workoutTypes, readinessForWorkout } = friend;

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
        {request && request.status === RequestStatus.Pending && (
          <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
            <p className="thumbnail-friend__request-text">
              {notificationMessages[request.requestType]}
            </p>
            <div className="thumbnail-friend__button-wrapper">
              <button
                className="btn btn--medium btn--dark-bg thumbnail-friend__button"
                type="button"
                onClick={(evt) => onAccept(evt, request)}
              >
                Принять
              </button>
              <button
                className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button"
                type="button"
                onClick={(evt) => onReject(evt, request)}
              >
                Отклонить
              </button>
            </div>
          </div>
        )}
        {request && request.status === RequestStatus.Rejected && (
          <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
            <p className="thumbnail-friend__request-text">
              {notificationMessages[request.requestType]} отклонён
            </p>
          </div>
        )}
        {request && request.status === RequestStatus.Accepted && request.requestType !== RequestType.Friend && (
          <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
            <p className="thumbnail-friend__request-text">
              {notificationMessages[request.requestType]} принят
            </p>
          </div>
        )}
      </div>
    </li>
  );
}

export default Friend;
