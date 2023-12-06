// TrainingList.jsx
import TrainingItem from '../training-item/training-item';
import { Training } from '../../types/training.type';

type TrainingListProps = {
  trainings: Training[]
};

const TrainingList = ({trainings}: TrainingListProps) => {
  return (
    <ul className="my-trainings__list">
      {trainings.map((training) => (
        <TrainingItem key={training.name} training={training} />
      ))}
    </ul>
  );
};

export default TrainingList;
