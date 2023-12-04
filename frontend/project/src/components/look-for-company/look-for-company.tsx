import ThumbnailUser from '../thumbnail-user/thumbnail-user';

const LookForCompany = () => {
  const usersData = [
    {
      name: 'Диана',
      imageSrc: 'img/content/thumbnails/user-04',
      location: 'Невский проспект',
      hashtags: ['#пилатес']
    }
  ];

  return (
    <section className="look-for-company">
      <div className="container">
        <div className="look-for-company__wrapper">
          <div className="look-for-company__title-wrapper">
            <h2 className="look-for-company__title">Ищут компанию для тренировки</h2>
            <button className="btn-flat btn-flat--light look-for-company__button" type="button">
              <span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
            <div className="look-for-company__controls">
              <button className="btn-icon btn-icon--outlined look-for-company__control" type="button" aria-label="previous">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button className="btn-icon btn-icon--outlined look-for-company__control" type="button" aria-label="next">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <ul className="look-for-company__list">
            {usersData.map((user) => (
              <ThumbnailUser key={user.name} {...user} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LookForCompany;