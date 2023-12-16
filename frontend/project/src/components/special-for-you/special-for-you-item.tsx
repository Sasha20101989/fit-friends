import { Link, useNavigate } from 'react-router-dom';
import Image from '../image/image';
import { AppRoute } from '../../const';
import { memo } from 'react';

type SpecialForYouItemProps = {
  title: string;
  imageSrc: string;
  trainingId: string | undefined;
}

function SpecialForYouItem({ title, imageSrc, trainingId }: SpecialForYouItemProps):JSX.Element {
  const navigate = useNavigate();

  const handleTrainingClick = (evt: React.MouseEvent<HTMLAnchorElement>): void => {
    evt.preventDefault();
    if (trainingId) {
      navigate(`${AppRoute.Trainings}/${trainingId}`);
    }
  };

  return (
    <li className="special-for-you__item">
      <div className="thumbnail-preview">
        <Image imageSrc={imageSrc} sourceName={'thumbnail-preview__image'} width={452} height={191} alt={'special card'}/>
        <div className="thumbnail-preview__inner">
          <h3 className="thumbnail-preview__title">{title}</h3>
          <div className="thumbnail-preview__button-wrapper">
            <Link className="btn btn--small thumbnail-preview__button" to="" onClick={handleTrainingClick}>Подробнее</Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export default memo(SpecialForYouItem);
