import { AppRoute } from '../../const';
import CoachAdditionalInfo from '../coach-additional-info/coach-additional-info';
import ThumbnailLink from '../thumbnail-link/thumbnail-link';
import Image from '../image/image';

type PersonalAccountCoachProps = {
  userId: string;
  certificates: string[];
  isPreviousButtonDisabled: boolean;
  isNextButtonDisabled: boolean;
  onPreviousClick: (value: React.SetStateAction<number>) => void;
  onNextClick: (value: React.SetStateAction<number>) => void;
}

function PersonalAccountCoach({userId, certificates, isPreviousButtonDisabled, isNextButtonDisabled, onPreviousClick, onNextClick}: PersonalAccountCoachProps):JSX.Element {
  const thumbnailLinks = [
    { to: `${AppRoute.Trainers}/${userId}${AppRoute.Trainings}`, icon: '#icon-flash', text: 'Мои тренировки' },
    { to: AppRoute.CreateTraining, icon: '#icon-add', text: 'Создать тренировку' },
    { to: `${AppRoute.TrainerFriends}/${userId}`, icon: '#icon-friends', text: 'Мои друзья' },
    { to: `${AppRoute.Orders}/${userId}`, icon: '#icon-bag', text: 'Мои заказы' },
  ];

  return (
    <div className="personal-account-coach">
      <div className="personal-account-coach__navigation">
        {thumbnailLinks.map((link) => (
          <ThumbnailLink key={link.text} to={link.to} icon={link.icon} text={link.text}/>
        ))}
        <div className="personal-account-coach__calendar">
          <div className="thumbnail-spec-gym">
            <Image sourceName='thumbnail-spec-gym__image' imageSrc='img/content/thumbnails/nearest-gym-01.jpg' width={330} height={190} alt={'ближайший зал'}/>
            <p className="thumbnail-spec-gym__type">Ближайший зал</p>
            <div className="thumbnail-spec-gym__header" style={{ textAlign: 'center' }} >
              <h3 className="thumbnail-spec-gym__title">Скоро тут будет интересно</h3>
            </div>
          </div>
        </div>
      </div>
      <CoachAdditionalInfo certificates={certificates} isNextButtonDisabled={isNextButtonDisabled} isPreviousButtonDisabled={isPreviousButtonDisabled} onNextClick={onNextClick} onPreviousClick={onPreviousClick}/>
    </div>
  );
}

export default PersonalAccountCoach;
