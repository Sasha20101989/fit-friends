import { AppRoute } from '../../const';
import ThumbnailLink from '../thumbnail-link/thumbnail-link';
import ThumbnailPicture from '../thumbnail-picture/thumbnail-picture';

function PersonalAccountUser():JSX.Element {
  const thumbnailLinks = [
    { to: AppRoute.UserFriends, icon: '#icon-friends', text: 'Мои друзья' },
    { to: AppRoute.UserPurchases, icon: '#icon-shopping-cart', text: 'Мои покупки' },
  ];

  const theme = 'light';

  return (
    <div className="personal-account-user">
      <div className="personal-account-user__schedule">
        <form action="#" method="get">
          <div className="personal-account-user__form">
            <div className="personal-account-user__input">
              <label>
                <span className="personal-account-user__label">План на день, ккал</span>
                <input type="text" name="schedule-for-the-day" value="3300"/>
              </label>
            </div>
            <div className="personal-account-user__input">
              <label>
                <span className="personal-account-user__label">План на неделю, ккал</span>
                <input type="text" name="schedule-for-the-week" value="23100"/>
              </label>
            </div>
          </div>
        </form>
      </div>
      <div className="personal-account-user__additional-info">
        {thumbnailLinks.map((link) => (
          <ThumbnailLink key={link.text} to={link.to} icon={link.icon} text={link.text} theme={theme}/>
        ))}
        <div className="thumbnail-spec-gym">
          <ThumbnailPicture sourceName='thumbnail-spec-gym__image' imageSrc={'img/content/thumbnails/nearest-gym-01'} width={330} height={190} alt={'тренировка'}/>
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
