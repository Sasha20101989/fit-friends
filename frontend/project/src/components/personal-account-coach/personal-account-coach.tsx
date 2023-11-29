import { AppRoute } from '../../const';
import CoachAdditionalInfo from '../coach-additional-info/coach-additional-info';
import ThumbnailLink from '../thumbnail-link/thumbnail-link';
import ThumbnailPicture from '../thumbnail-picture/thumbnail-picture';

function PersonalAccountCoach():JSX.Element {
  const thumbnailLinks = [
    { to: AppRoute.TrainerTrainings, icon: '#icon-flash', text: 'Мои тренировки' },
    { to: AppRoute.CreateTraining, icon: '#icon-add', text: 'Создать тренировку' },
    { to: AppRoute.TrainerFriends, icon: '#icon-friends', text: 'Мои друзья' },
    { to: AppRoute.TrainerOrders, icon: '#icon-bag', text: 'Мои заказы' },
  ];

  const theme = 'light';

  return (
    <div className="personal-account-coach">
      <div className="personal-account-coach__navigation">
        {thumbnailLinks.map((link) => (
          <ThumbnailLink key={link.text} to={link.to} icon={link.icon} text={link.text} theme={theme}/>
        ))}
        <div className="personal-account-coach__calendar">
          <div className="thumbnail-spec-gym">
            <ThumbnailPicture sourceName='thumbnail-spec-gym__image' imageSrc={'img/content/thumbnails/nearest-gym-01'} width={330} height={190}/>
            <p className="thumbnail-spec-gym__type">Ближайший зал</p>
            <div className="thumbnail-spec-gym__header" style={{ textAlign: 'center' }} >
              <h3 className="thumbnail-spec-gym__title">Скоро тут будет интересно</h3>
            </div>
          </div>
        </div>
      </div>
      <CoachAdditionalInfo/>
    </div>
  );
}

export default PersonalAccountCoach;
