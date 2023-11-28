// TrainingList.jsx
import React from 'react';
import TrainingItem from '../training-item/training-item';

type Training = {
  imageSrc: string;
  imageSrcSet: string;
  price: string | number;
  title: string;
  hashtags: string[];
  rate: number;
  text: string;
};

const TrainingList = () => {
  const trainings: Training[] = [
    {
      imageSrc: 'img/content/thumbnails/training-02.jpg',
      imageSrcSet: 'img/content/thumbnails/training-02.webp',
      price: 'Бесплатно',
      title: 'crossfit',
      hashtags: ['#кроссфит', '#1200ккал'],
      rate: 5,
      text: 'Сложный комплекс упражнений для профессиональных атлетов...',
    },
    {
      imageSrc: 'img/content/thumbnails/training-01.jpg',
      imageSrcSet: 'img/content/thumbnails/training-01.webp',
      price: 800,
      title: 'energy',
      hashtags: ['#пилатес', '#320ккал'],
      rate: 4,
      text: 'Упражнения укрепляют мышечный корсет, делают суставы более гибкими, улучшают осанку и координацию.',
    }
  ];

  return (
    <ul className="my-trainings__list">
      {trainings.map((training) => (
        <TrainingItem key={training.text} training={training} />
      ))}
    </ul>
  );
};

export default TrainingList;
