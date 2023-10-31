import { GenderPreference } from '../../types/gender-preference.enum.js';
import { Gender } from '../../types/gender.enum..js';
import { Location } from '../../types/location.enum.js';
import { Role } from '../../types/role.enum.js';
import { Trainer } from '../trainer/types/trainer.interface.js';
import { TrainingLevel } from '../../types/training-level.enum.js';
import { Training } from '../training/types/training.type.js';
import { WorkoutDuration } from '../../types/workout-duration.enum.js';
import { WorkoutType } from '../../types/workout-type.enum.js';
import { User } from '../user/types/user.interface.js';
import { TrainingOrder } from '../order/types/training-order.type.js';
import { PurchaseType } from '../order/types/purchase-type.enum.js';
import { PaymentMethod } from '../order/types/payment-method.enum.js';

const generateTrainigs = (trainers: Trainer[]) => {
  const trainings: Training[] = [];

  trainers.forEach((trainer: Trainer) => {
    for (let i = 1; i <= 3; i++) {
      const training: Training = {
        name: `Training${i}`,
        backgroundImage: 'http.jpg',
        trainingLevel: generateRandomTrainingLevel(),
        workoutType: generateRandomWorkoutType(),
        workoutDuration: generateRandomWorkoutDuration(),
        price: generateRandomPrice(),
        calories: 1003,
        description: 'Отжимания отжимания и только отжимания',
        genderPreference: generateRandomGenderPreference(),
        video: 'video.mov',
        rating: generateRandomRating(),
        trainer: trainer,
        specialOffer: true
      };

      trainings.push(training);
    }
  });

  return trainings;
};

const generateTrainers = (): Trainer[] => {
  const trainers: Trainer[] = [];
  for (let i = 1; i <= 1; i++) {
    const trainer: Trainer = {
      name: `Trainer${i}`,
      email: `trainer${i}@example.com`,
      role: Role.Trainer,
      gender: Gender.Male,
      location: Location.Sportivnaya,
      backgroundImage: 'http.jpg',
      trainingLevel: TrainingLevel.Beginner,
      workoutTypes: [WorkoutType.Boxing, WorkoutType.Pilates, WorkoutType.Stretching],
      certificate: 'http1.pdf',
      trainerAchievements: 'Моя любимая фраза: Ты будешь тренироваться до тех пор пока я не вспотею.',
      personalTraining: true
    };
    trainers.push(trainer);
  }
  return trainers;
};

const generateUsers = () => {
  const users = [];
  for (let i = 1; i <= 1; i++) {
    const user: User = {
      name: `User${i}`,
      email: `user${i}@example.com`,
      role: Role.User,
      workoutDuration: WorkoutDuration.Long,
      caloriesToBurn: 1001,
      caloriesToSpend: 1002,
      readinessForWorkout: true,
      gender: Gender.Female,
      location: Location.Sportivnaya,
      backgroundImage: 'http.jpg',
      trainingLevel: TrainingLevel.Beginner,
      workoutTypes: [WorkoutType.Boxing, WorkoutType.Pilates, WorkoutType.Stretching]
    };
    users.push(user);
  }
  return users;
};

const generateTrainingOrders = (trainings: Training[]): TrainingOrder[] =>
  trainings.map((training) => {
    const price = training.price;
    const quantity = generateRandomQuantity();

    return {
      purchaseType: PurchaseType.Subscription,
      training: training,
      price: price,
      quantity: quantity,
      paymentMethod: generateRandomPaymentMethod()
    };
  });

function generateRandomRating() {
  return Math.floor(Math.random() * 5) + 1;
}

function generateRandomWorkoutDuration() {
  const workoutDurations = Object.values(WorkoutDuration);
  return workoutDurations[Math.floor(Math.random() * workoutDurations.length)];
}

function generateRandomWorkoutType() {
  const workoutTypes = Object.values(WorkoutType);
  return workoutTypes[Math.floor(Math.random() * workoutTypes.length)];
}

function generateRandomPrice() {
  return Math.floor(Math.random() * 1000) + 500;
}

function generateRandomPaymentMethod() {
  const paymentMethods = Object.values(PaymentMethod);
  return paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
}

function generateRandomTrainingLevel() {
  const trainingLevels = Object.values(TrainingLevel);
  return trainingLevels[Math.floor(Math.random() * trainingLevels.length)];
}

function generateRandomGenderPreference() {
  const genderPreferences = Object.values(GenderPreference);
  return genderPreferences[Math.floor(Math.random() * genderPreferences.length)];
}

function generateRandomQuantity() {
  return Math.floor(Math.random() * 10) + 1;
}

export const users: User[] = generateUsers();
export const trainers: Trainer[] = generateTrainers();
export const trainings = generateTrainigs(trainers);
export const orders = generateTrainingOrders(trainings);
