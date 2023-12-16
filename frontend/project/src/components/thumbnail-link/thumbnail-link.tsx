import { Link } from 'react-router-dom';

type ThumbnailLinkProps = {
  to: string;
  icon: string;
  text: string;
}

function ThumbnailLink({ to, icon, text }: ThumbnailLinkProps): JSX.Element {
  return (
    <Link className="thumbnail-link thumbnail-link--light" to={to}>
      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
        <svg width="30" height="26" aria-hidden="true">
          <use xlinkHref={icon}></use>
        </svg>
      </div>
      <span className="thumbnail-link__text">{text}</span>
    </Link>
  );
}

export default ThumbnailLink;
