import TrainingItem from '../training-item/training-item';
import { Training } from '../../types/training.type';
import { memo } from 'react';

type TrainingListProps = {
  sourceName: string;
  itemSourceName: string;
  trainings: Training[];
};

function TrainingList({sourceName, itemSourceName, trainings}: TrainingListProps): JSX.Element {
  return (
    <ul className={sourceName}>
      {trainings.map((training) => (
        <TrainingItem key={`${training.name}-${training.createdAt}`} sourceName={itemSourceName} training={training} />
      ))}
    </ul>
  );
}

export default memo(TrainingList);
