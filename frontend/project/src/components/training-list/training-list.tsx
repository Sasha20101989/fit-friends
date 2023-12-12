import TrainingItem from '../training-item/training-item';
import { Training } from '../../types/training.type';

type TrainingListProps = {
  trainings: Training[];
};

function TrainingList({trainings}: TrainingListProps): JSX.Element {
  return (
    <ul className="my-trainings__list">
      {trainings.map((training) => (
        <TrainingItem key={`${training.name}-${training.trainer.email}`} training={training} />
      ))}
    </ul>
  );
}

export default TrainingList;
