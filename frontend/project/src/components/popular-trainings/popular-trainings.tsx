import ThumbnailTraining from '../thumbnail-training/thumbnail-training';


function PopularTrainings():JSX.Element {
  const trainingsData = [
    {
      title: 'run, forrest, run',
      imageSrc: 'img/content/thumbnails/training-06',
      price: 1600,
      hashtags: ['#бег', '#500ккал'],
      rate: 5,
      text: 'Узнайте правильную технику бега, развивайте выносливость и&nbsp;откройте для себя все секреты длительных пробежек.'
    }
  ];

  return (
    <section className="popular-trainings">
      <div className="container">
        <div className="popular-trainings__wrapper">
          <div className="popular-trainings__title-wrapper">
            <h2 className="popular-trainings__title">Популярные тренировки</h2>
            <button className="btn-flat popular-trainings__button" type="button">
              <span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
            <div className="popular-trainings__controls">
              <button className="btn-icon popular-trainings__control" type="button" aria-label="previous">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button className="btn-icon popular-trainings__control" type="button" aria-label="next">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <ul className="popular-trainings__list">
            {trainingsData.map((training) => (
              <ThumbnailTraining key={training.title} {...training} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default PopularTrainings;
