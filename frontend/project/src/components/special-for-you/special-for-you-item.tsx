import { Link } from 'react-router-dom';

type SpecialForYouItemProps = {
  title: string;
  imageSrc: string;
}

function SpecialForYouItem({ title, imageSrc }: SpecialForYouItemProps):JSX.Element {
  return (
    <li className="special-for-you__item">
      <div className="thumbnail-preview">
        <div className="thumbnail-preview__image">
          <picture>
            <source type="image/webp" srcSet={`${imageSrc}.webp, ${imageSrc}@2x.webp 2x`} />
            <img src={`${imageSrc}.jpg`} srcSet={`${imageSrc}@2x.jpg 2x`} width="452" height="191" alt="" />
          </picture>
        </div>
        <div className="thumbnail-preview__inner">
          <h3 className="thumbnail-preview__title">{title}</h3>
          <div className="thumbnail-preview__button-wrapper">
            <Link className="btn btn--small thumbnail-preview__button" to="">Подробнее</Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export default SpecialForYouItem;
