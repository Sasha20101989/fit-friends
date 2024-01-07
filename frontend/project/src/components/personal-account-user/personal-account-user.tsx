import { ChangeEvent, useState } from 'react';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/index';
import { getCurrentUser } from '../../store/user-process/user-process.selectors';
import { User } from '../../types/user.interface.js';
import Image from '../image/image';
import ThumbnailLink from '../thumbnail-link/thumbnail-link';

function PersonalAccountUser():JSX.Element | null {
  const currentUser = useAppSelector(getCurrentUser) as User;

  const thumbnailLinks = [
    { to: `${AppRoute.UserFriends}/${currentUser.id ? currentUser.id : ''}`, icon: '#icon-friends', text: 'Мои друзья' },
    { to: AppRoute.UserPurchases, icon: '#icon-shopping-cart', text: 'Мои покупки' },
  ];

  const [dailyCalories, setDailyCalories] = useState<number>(currentUser.caloriesToBurn);
  const [weeklyCalories, setWeeklyCalories] = useState<number>(currentUser.caloriesToBurn);

  const handleDailyCaloriesChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDailyCalories(parseInt(event.target.value, 10) || 0);
  };

  const handleWeeklyCaloriesChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWeeklyCalories(parseInt(event.target.value, 10) || 0);
  };

  return (
    <div className="personal-account-user">
      <div className="personal-account-user__schedule">
        <form action="#" method="get">
          <div className="personal-account-user__form">
            <div className="personal-account-user__input">
              <label>
                <span className="personal-account-user__label">План на день, ккал</span>
                <input
                  type="text"
                  name="schedule-for-the-day"
                  value={dailyCalories}
                  onChange={handleDailyCaloriesChange}
                />
              </label>
            </div>
            <div className="personal-account-user__input">
              <label>
                <span className="personal-account-user__label">План на неделю, ккал</span>
                <input
                  type="text"
                  name="schedule-for-the-week"
                  value={weeklyCalories}
                  onChange={handleWeeklyCaloriesChange}
                />
              </label>
            </div>
          </div>
        </form>
      </div>
      <div className="personal-account-user__additional-info">
        {thumbnailLinks.map((link) => (
          <ThumbnailLink key={link.text} to={link.to} icon={link.icon} text={link.text}/>
        ))}
        <div className="thumbnail-spec-gym">
          <Image sourceName='thumbnail-spec-gym__image' imageSrc={'img/content/thumbnails/nearest-gym-01'} width={330} height={190} alt={'тренировка'}/>
          <p className="thumbnail-spec-gym__type">Ближайший зал</p>
          <div className="thumbnail-spec-gym__header" style={{ textAlign: 'center' }} >
            <h3 className="thumbnail-spec-gym__title">Скоро тут появится что-то полезное</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalAccountUser;
