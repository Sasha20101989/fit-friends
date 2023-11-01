import { GenderPreference } from '../../types/gender-preference.enum.js';
import { Gender } from '../../types/gender.enum.js';
import { Location } from '../../types/location.enum.js';
import { TrainingLevel } from '../../types/training-level.enum.js';
import { WorkoutDuration } from '../../types/workout-duration.enum.js';
import { WorkoutType } from '../../types/workout-type.enum.js';
import { PaymentMethod } from '../order/types/payment-method.enum.js';
import { RequestType } from '../request/types/request-type.enum.js';
import { Trainer } from '../trainer/types/trainer.interface.js';
import { User } from '../user/types/user.interface.js';

const reviews = [
  'Отличная тренировка! Рекомендую всем!',
  'Тренировка была очень интенсивной, но я доволен результатами.',
  'Тренер очень профессиональный, всегда помогает достичь лучших результатов.',
  'Спасибо за тренировку, чувствую себя отлично!',
  'Тренировки всегда интересные и разнообразные.',
];

export function generateRandomReview() {
  const randomIndex = Math.floor(Math.random() * reviews.length);
  return reviews[randomIndex];
}

export function generateRandomUserNamesAndEmails(numberOfUsers: number, typeUser: string): { names: string[], emails: string[] } {
  const names: string[] = [];
  const emails: string[] = [];
  const usedNames: Set<string> = new Set();
  const usedEmails: Set<string> = new Set();
  while (names.length < numberOfUsers) {
    const name = `${typeUser}${Math.floor(Math.random() * 10000)}`;
    const email = `${name}@example.com`;
    if (!usedNames.has(name) && !usedEmails.has(email)) {
      usedNames.add(name);
      usedEmails.add(email);
      names.push(name);
      emails.push(email);
    }
  }
  return { names, emails };
}

export function generateRandomWorkoutTypes(): WorkoutType[] {
  const workoutTypeValues = Object.values(WorkoutType);
  const availableCount = workoutTypeValues.length;

  const count = Math.floor(Math.random() * availableCount) + 1;
  const uniqueWorkoutTypes: WorkoutType[] = [];

  while (uniqueWorkoutTypes.length < count) {
    const randomIndex = Math.floor(Math.random() * availableCount);
    const randomWorkoutType = workoutTypeValues[randomIndex] as WorkoutType;
    if (!uniqueWorkoutTypes.includes(randomWorkoutType)) {
      uniqueWorkoutTypes.push(randomWorkoutType);
    }
  }

  return uniqueWorkoutTypes;
}

export function generateRandomBoolean() {
  return Math.random() < 0.5;
}

export function generateRandomNumber() {
  return Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
}

export function generateRandomUser(users: User[]): User {
  const randomIndex = Math.floor(Math.random() * users.length);
  return users[randomIndex];
}

export function generateRandomUserOrTrainer(users: (User | Trainer)[]): User | Trainer {
  const randomIndex = Math.floor(Math.random() * users.length);
  return users[randomIndex];
}

export function generateRandomRating() {
  return Math.floor(Math.random() * 5) + 1;
}

export function generateRandomWorkoutDuration() {
  const workoutDurations = Object.values(WorkoutDuration);
  return workoutDurations[Math.floor(Math.random() * workoutDurations.length)];
}

export function generateRandomWorkoutType() {
  const workoutTypes = Object.values(WorkoutType);
  return workoutTypes[Math.floor(Math.random() * workoutTypes.length)];
}

export function generateRandomRequestType() {
  const requestTypes = Object.values(RequestType);
  return requestTypes[Math.floor(Math.random() * requestTypes.length)];
}

export function generateRandomPrice() {
  return Math.floor(Math.random() * 1000) + 500;
}

export function generateRandomPaymentMethod() {
  const paymentMethods = Object.values(PaymentMethod);
  return paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
}

export function generateRandomTrainingLevel() {
  const trainingLevels = Object.values(TrainingLevel);
  return trainingLevels[Math.floor(Math.random() * trainingLevels.length)];
}

export function generateRandomLocation() {
  const locations = Object.values(Location);
  return locations[Math.floor(Math.random() * locations.length)];
}

export function generateRandomGenderPreference() {
  const genderPreferences = Object.values(GenderPreference);
  return genderPreferences[Math.floor(Math.random() * genderPreferences.length)];
}

export function generateRandomGender() {
  const genders = Object.values(Gender);
  return genders[Math.floor(Math.random() * genders.length)];
}

export function generateRandomQuantity() {
  return Math.floor(Math.random() * 10) + 1;
}

export function generateRandomUserId(userIds: string[]): string {
  const randomIndex = Math.floor(Math.random() * userIds.length);
  return userIds[randomIndex];
}

export function generateRandomUserOrTrainerId(ids: string[]): string {
  const randomIndex = Math.floor(Math.random() * ids.length);
  return ids[randomIndex];
}
