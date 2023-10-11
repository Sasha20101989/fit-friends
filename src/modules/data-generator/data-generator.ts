import { Gender } from '../../types/gender.enum..js';
import { Location } from '../../types/location.enum.js';
import { Role } from '../../types/role.enum.js';
import { Trainer } from '../../types/trainer.interface.js';
import { TrainingLevel } from '../../types/training-level.enum.js';
import { WorkoutDuration } from '../../types/workout-duration.enum.js';
import { WorkoutType } from '../../types/workout-type.enum.js';
import { User } from './../../types/user.interface';
// import { DataGeneratorInterface } from './data-generator.interface.js';

// export default class OfferGenerator implements DataGeneratorInterface {
//   constructor(private readonly mockData: MockData) {}

//   public generate(): string {
//     const title = getRandomItem<string>(this.mockData.titles);
//     const description = getRandomItem<string>(this.mockData.descriptions);
//     const publicationDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').format(DATE_FORMAT);
//     const city = getRandomItem<string>(this.mockData.cities);
//     const previewImage = getRandomItem<string>(this.mockData.previewImages);
//     const images = getRandomImages(this.mockData.images).join(';');
//     const isPremium = getRandomBoolean();
//     const isFavorite = getRandomBoolean();
//     const rating = generateRandomValue(MIN_OFFER_RATING, MAX_OFFER_RATING, 1).toString();
//     const type = getRandomItem<string>([RentalType.Apartment, RentalType.Hotel, RentalType.House, RentalType.Room]);
//     const rooms = generateRandomValue(MIN_COUNT_OFFER_ROOMS, MAX_COUNT_OFFER_ROOMS).toString();
//     const guests = generateRandomValue(MIN_COUNT_OFFER_GUESTS, MAX_COUNT_OFFER_GUESTS).toString();
//     const price = generateRandomValue(MIN_OFFER_PRICE, MAX_OFFER_PRICE).toString();
//     const amenities = getRandomItems<string>(this.mockData.amenities, 2).join(';');
//     const user = objectToString(getRandomItem(this.mockData.users));
//     const coordinates = objectToString(getCoordinates(city));

//     return [
//       title, description, publicationDate,
//       city, coordinates, previewImage, images,isPremium,
//       isFavorite, rating, type, rooms, guests,
//       price, amenities, user,
//       COMMENT_COUNT
//     ].join('\t');
//   }
// }

const generateTrainers = () => {
  const trainers = [];
  for (let i = 1; i <= 10; i++) {
    const trainer: Trainer = {
      name: `Trainer${i}`,
      email: `trainer${i}@example.com`,
      role: Role.Trainer,
      gender: Gender.Male,
      location: Location.Sportivnaya,
      backgroundImage: "http",
      trainingLevel: TrainingLevel.Beginner,
      workoutTypes: [WorkoutType.Boxing, WorkoutType.Pilates, WorkoutType.Stretching],
      certificate: "http1",
      trainerAchievements: "Моя любимая фраза: Ты будешь тренироваться до тех пор пока я не вспотею.",
      personalTraining: true
    };
    trainers.push(trainer);
  }
  return trainers;
};

const generateUsers = () => {
  const users = [];
  for (let i = 1; i <= 10; i++) {
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
      backgroundImage: "http",
      trainingLevel: TrainingLevel.Beginner,
      workoutTypes: [WorkoutType.Boxing, WorkoutType.Pilates, WorkoutType.Stretching],
      traningCount: 0
    };
    users.push(user);
  }
  return users;
};

export const users: User[] = generateUsers();
export const trainers: Trainer[] = generateTrainers();
