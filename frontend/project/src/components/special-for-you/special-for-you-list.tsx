
import { Training } from '../../types/training.type';
import SpecialForYouItem from './special-for-you-item';
import ThumbnailSpecGym from '../thumbnail-spec-gym/thumbnail-spec-gym';
import { memo } from 'react';

type SpecialForYouListProps = {
  specialForUserTrainings: Training[];
}

function SpecialForYouList({specialForUserTrainings}: SpecialForYouListProps): JSX.Element {
  return (
    specialForUserTrainings.length > 0 ?
      <ul className="special-for-you__list">
        {specialForUserTrainings.map((training) => (
          <SpecialForYouItem
            key={`${training.name}-${training.calories}-${training.price}`}
            trainingId={training.id}
            title={training.workoutType}
            imageSrc={training.backgroundImage}
          />
        ))}
      </ul> :
      <ThumbnailSpecGym/>
  );
}

export default memo(SpecialForYouList);
