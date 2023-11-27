import SpecialForYouItem from './special-for-you-item';

function SpecialForYou(): JSX.Element {
  return (
    <section className="special-for-you">
      <div className="container">
        <div className="special-for-you__wrapper">
          <div className="special-for-you__title-wrapper">
            <h2 className="special-for-you__title">Специально подобрано для вас</h2>
            <div className="special-for-you__controls">
              <button className="btn-icon special-for-you__control" type="button" aria-label="previous">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button className="btn-icon special-for-you__control" type="button" aria-label="next">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <ul className="special-for-you__list">
            <SpecialForYouItem
              title="crossfit"
              imageSrc="img/content/thumbnails/preview-03"
            />
            <SpecialForYouItem
              title="power"
              imageSrc="img/content/thumbnails/preview-02"
            />
            <SpecialForYouItem
              title="boxing"
              imageSrc="img/content/thumbnails/preview-01"
            />
          </ul>
        </div>
      </div>
    </section>
  );
}

export default SpecialForYou;
