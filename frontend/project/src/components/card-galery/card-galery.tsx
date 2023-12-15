type CardGaleryProps = {
  isCoach: boolean;
}

function CardGalery({ isCoach }: CardGaleryProps): JSX.Element {
  return(
    <div className={`user-card${isCoach ? '-coach' : ''}__gallary`}>
      <ul className={`user-card${isCoach ? '-coach' : ''}__gallary-list`}>
        <li className={`user-card${isCoach ? '-coach' : ''}__gallary-item`}>
          <img
            src={`img/content/user${isCoach ? '-coach' : ''}-card-photo1.jpg`}
            srcSet={`img/content/user${isCoach ? '-coach' : ''}-card-photo1@2x.jpg 2x`}
            width="334"
            height="573"
            alt="photo1"
          />
        </li>
        <li className={`user-card${isCoach ? '-coach' : ''}__gallary-item`}>
          <img
            src={`img/content/user${isCoach ? '-coach' : ''}-card-photo2.jpg`}
            srcSet={`img/content/user${isCoach ? '-coach' : ''}-card-photo2@2x.jpg 2x`}
            width="334"
            height="573"
            alt="photo2"
          />
        </li>
      </ul>
    </div>
  );
}

export default CardGalery;
