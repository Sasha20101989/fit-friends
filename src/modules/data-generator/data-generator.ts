import { Role } from '../../types/role.enum.js';
import { Trainer } from '../trainer/types/trainer.interface.js';
import { Training } from '../training/types/training.type.js';
import { User } from '../user/types/user.interface.js';
import { TrainingOrder } from '../order/types/training-order.type.js';
import { PurchaseType } from '../order/types/purchase-type.enum.js';
import { UserBalance } from '../user/types/user-balance.type.js';
import { generateRandomUser,
        generateRandomPaymentMethod,
        generateRandomTrainingLevel,
        generateRandomWorkoutType,
        generateRandomWorkoutDuration,
        generateRandomPrice,
        generateRandomGenderPreference,
        generateRandomRating,
        generateRandomUserNamesAndEmails,
        generateRandomGender,
        generateRandomLocation,
        generateRandomWorkoutTypes,
        generateRandomBoolean,
        generateRandomNumber,
        generateRandomRequestStatus,
        generateRandomRequestType,
        generateRandomQuantity,
        generateRandomReview,
        } from './random.js';
import { TrainingRequest } from '../trainingRequest/types/training-request.type.js';
import { Review } from '../review/types/review.type.js';
import { Notification } from '../notification/types/notification.type.js';
import { generateNotification } from '../../core/helpers/index.js';

const generateTrainingOrders = (trainings: Training[], users: User[]): TrainingOrder[] =>
    trainings.map((training) => {
    const price = training.price;
    const quantity = generateRandomQuantity();
    const user = generateRandomUser(users);
    return {
      user: user,
      purchaseType: PurchaseType.Subscription,
      training: training,
      price: price,
      quantity: quantity,
      paymentMethod: generateRandomPaymentMethod()
    };
  });

const generateTrainigs = (trainers: Trainer[], numberOfTrainings: number) => {
  const trainings: Training[] = [];

  trainers.forEach((trainer: Trainer) => {
    for (let i = 1; i <= numberOfTrainings; i++) {
      const training: Training = {
        name: `Training${i}`,
        backgroundImage: 'http.jpg',
        trainingLevel: generateRandomTrainingLevel(),
        workoutType: generateRandomWorkoutType(),
        workoutDuration: generateRandomWorkoutDuration(),
        price: generateRandomPrice(),
        calories: generateRandomNumber(),
        description: 'Отжимания отжимания и только отжимания',
        genderPreference: generateRandomGenderPreference(),
        video: 'video.mov',
        rating: 0,
        trainer: trainer,
        specialOffer: true
      };

      trainings.push(training);
    }
  });

  return trainings;
};

const generateTrainers = (numberOfTrainers: number): Trainer[] => {
  const trainers: Trainer[] = [];
  const { names, emails } = generateRandomUserNamesAndEmails(numberOfTrainers, 'Trainer');

  for (let i = 0; i < numberOfTrainers; i++) {
    const trainer: Trainer = {
      name: names[i],
      email: emails[i],
      role: Role.Trainer,
      gender: generateRandomGender(),
      location: generateRandomLocation(),
      backgroundImage: 'http.jpg',
      trainingLevel: generateRandomTrainingLevel(),
      workoutTypes: generateRandomWorkoutTypes(),
      certificate: 'http1.pdf',
      trainerAchievements: 'Моя любимая фраза: Ты будешь тренироваться до тех пор пока я не вспотею.',
      personalTraining: generateRandomBoolean()
    };
    trainers.push(trainer);
  }
  return trainers;
};

const generateUsers = (numberOfUsers: number) => {
  const users: User[] = [];
  const { names, emails } = generateRandomUserNamesAndEmails(numberOfUsers, 'User');

  for (let i = 0; i < numberOfUsers; i++) {
    const user: User = {
      name: names[i],
      email: emails[i],
      role: Role.User,
      workoutDuration: generateRandomWorkoutDuration(),
      caloriesToBurn: generateRandomNumber(),
      caloriesToSpend: generateRandomNumber(),
      readinessForWorkout: generateRandomBoolean(),
      gender: generateRandomGender(),
      location: generateRandomLocation(),
      backgroundImage: 'http.jpg',
      trainingLevel: generateRandomTrainingLevel(),
      workoutTypes: generateRandomWorkoutTypes()
    };
    users.push(user);
  }

  return users;
};

const generateBalances = (trainings: Training[]): UserBalance[] =>
    trainings.map((_training) => {
    const quantity = generateRandomQuantity();
    return {
      availableQuantity: quantity,
    };
  });

const generateRequests = (numberOfRequests: number): TrainingRequest[] => {
  const requests: TrainingRequest[] = [];
  for (let i = 0; i < numberOfRequests; i++) {
    const status = generateRandomRequestStatus();
    const requestType = generateRandomRequestType();
    const request: TrainingRequest = {
      status,
      requestType,
    };
    requests.push(request);
  }
  return requests;
};

const generateReviews = (numberOfReviews: number): Review[] => {
  const reviews: Review[] = [];
  for (let i = 0; i < numberOfReviews; i++) {
    const rating = generateRandomRating();
    const text = generateRandomReview();
    const review: Review = {
      rating,
      text,
    };
    reviews.push(review);
  }
  return reviews;
};

const generateNotifications = (numberOfReviews: number): Notification[] => {
  const notifications: Notification[] = [];
  for (let i = 0; i < numberOfReviews; i++) {
    const type = generateRandomRequestType();
    const text = generateNotification(type);
    const notification: Notification = {
      text,
      type
    };
    notifications.push(notification);
  }
  return notifications;
};

export const users: User[] = generateUsers(5);
export const trainers: Trainer[] = generateTrainers(5);
export const trainings = generateTrainigs(trainers, 10);
export const orders = generateTrainingOrders(trainings, users);
export const balances = generateBalances(trainings);
export const requests = generateRequests(20);
export const reviews = generateReviews(20);
export const notifications = generateNotifications(20);
