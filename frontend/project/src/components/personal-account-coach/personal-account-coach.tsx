import CoachAdditionalInfo from '../coach-additional-info/coach-additional-info';
import ThumbnailLink from '../thumbnail-link/thumbnail-link';

function PersonalAccountCoach():JSX.Element {
  const thumbnailLinks = [
    { to: '/my-trainings', icon: '#icon-flash', text: 'Мои тренировки' },
    { to: '/create-training', icon: '#icon-add', text: 'Создать тренировку' },
    { to: '/my-friends', icon: '#icon-friends', text: 'Мои друзья' },
    { to: '/my-orders', icon: '#icon-bag', text: 'Мои заказы' },
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
            <div className="thumbnail-spec-gym__image">
              <picture>
                <source type="image/webp" srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x"/>
                <img src="img/content/thumbnails/nearest-gym-01.jpg" srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt=""/>
              </picture>
            </div>
            {/* <p className="thumbnail-spec-gym__type">Ближайший зал</p> */}
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
