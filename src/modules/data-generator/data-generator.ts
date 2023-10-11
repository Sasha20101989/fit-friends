import { Gender } from '../../types/gender.enum..js';
import { Location } from '../../types/location.enum.js';
import { Role } from '../../types/role.enum.js';
import { Trainer } from '../../types/trainer.interface.js';
import { TrainingLevel } from '../../types/training-level.enum.js';
import { WorkoutDuration } from '../../types/workout-duration.enum.js';
import { WorkoutType } from '../../types/workout-type.enum.js';
import { User } from './../../types/user.interface';

const generateTrainers = () => {
  const trainers = [];
  for (let i = 1; i <= 10; i++) {
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
      backgroundImage: 'http.jpg',
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
