import * as crypto from 'node:crypto';
import * as jose from 'jose';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { UnknownRecord } from '../../types/common/unknown-record.type.js';
import { Response } from 'express';
import { Token } from '../../modules/token/types/token.enum.js';
import { Sorting } from '../../types/sorting.enum.js';
import { WorkoutType } from '../../types/workout-type.enum.js';
import { notificationMessages } from '../../modules/notification/types/notification-messages.type.js';
import { RequestType } from '../../modules/request/types/request-type.enum.js';
import { WorkoutDuration } from '../../types/workout-duration.enum.js';
import { TrainingQueryParams } from '../../modules/training/types/training-query-params.js';
import { TrainingFilter } from '../../modules/training/types/training-filter.type.js';
import { UserQueryParams } from '../../modules/user/types/user-query-params.js';
import { UserFilter } from '../../modules/user/types/user-filter.type.js';
import { Location } from '../../types/location.enum.js';
import { TrainingLevel } from '../../types/training-level.enum.js';
import { DEFAULT_STATIC_AVATAR_COACH_IMAGES_ROUTE, DEFAULT_STATIC_CERTIFICATES_IMAGES, DEFAULT_STATIC_CERTIFICATES_ROUTE, DEFAULT_STATIC_COACH_AVATAR_IMAGES, DEFAULT_STATIC_TRAINING_IMAGES, DEFAULT_STATIC_TRAINING_IMAGES_ROUTE, DEFAULT_STATIC_USER_AVATAR_IMAGES } from '../../app/rest.const.js';
import { Role } from '../../types/role.enum.js';

export function getFullServerPath(host: string, port: number){
  return `http://${host}:${port}`;
}

export function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });
}

export async function createJWT(algorithm: string, jwtSecret: string, payload: object, expirationTime: string): Promise<string> {
  return new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: algorithm })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));
}

function isObject(value: unknown) {
  return typeof value === 'object' && value !== null;
}

export function transformProperty(
  property: string,
  someObject: UnknownRecord,
  transformFn: (object: UnknownRecord) => void
) {
  return Object.keys(someObject)
    .forEach((key) => {
      if (key === property) {
        transformFn(someObject);
      } else if (isObject(someObject[key])) {
        transformProperty(property, someObject[key] as UnknownRecord, transformFn);
      }
    });
}

export function transformObject(properties: string[], staticPath: string, uploadPath: string, data: UnknownRecord) {
  properties.forEach((property) => {
    transformProperty(property, data, (target: UnknownRecord) => {
      if (property === 'backgroundImage') {
        const isDefaultImage = DEFAULT_STATIC_TRAINING_IMAGES.includes(target[property] as string);
        const rootPath = isDefaultImage ? staticPath : uploadPath;

        target[property] = isDefaultImage
          ? `${rootPath}${DEFAULT_STATIC_TRAINING_IMAGES_ROUTE}/${target[property]}`
          : `${rootPath}/${target[property]}`;
      } else if (property === 'certificate') {
        const isDefaultImage = DEFAULT_STATIC_CERTIFICATES_IMAGES.includes(target[property] as string);
        const rootPath = isDefaultImage ? staticPath : uploadPath;

        target[property] = isDefaultImage
          ? `${rootPath}${DEFAULT_STATIC_CERTIFICATES_ROUTE}/${target[property]}`
          : `${rootPath}/${target[property]}`;
      } else if (property === 'avatar') {
        if(data.role === Role.Trainer){
          const isDefaultImage = DEFAULT_STATIC_COACH_AVATAR_IMAGES.includes(target[property] as string);
          const rootPath = isDefaultImage ? staticPath : uploadPath;

          target[property] = isDefaultImage
            ? `${rootPath}${DEFAULT_STATIC_AVATAR_COACH_IMAGES_ROUTE}/${target[property]}`
            : `${rootPath}/${target[property]}`;
        }
      }
    });
  });
}

export function getRandomBackgroundImage(): string {
  const randomIndex = Math.floor(Math.random() * DEFAULT_STATIC_TRAINING_IMAGES.length);
  return DEFAULT_STATIC_TRAINING_IMAGES[randomIndex];
}

export function getRandomCertificateImages(count: number): string[] {
  const randomImages = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * DEFAULT_STATIC_CERTIFICATES_IMAGES.length);
    randomImages.push(DEFAULT_STATIC_CERTIFICATES_IMAGES[randomIndex]);
  }

  return randomImages;
}

export function getRandomCoachAvatar(): string {
  const randomIndex = Math.floor(Math.random() * DEFAULT_STATIC_COACH_AVATAR_IMAGES.length);
  return DEFAULT_STATIC_COACH_AVATAR_IMAGES[randomIndex];
}

export function getRandomUserAvatar(): string {
  const randomIndex = Math.floor(Math.random() * DEFAULT_STATIC_USER_AVATAR_IMAGES.length);
  return DEFAULT_STATIC_USER_AVATAR_IMAGES[randomIndex];
}

export function calculateSum<T>(array: T[], getValue: (item: T) => number): number {
  return array.reduce((total, item) => total + getValue(item), 0);
}

export function clearCookie(res: Response, token: Token) {
  res.clearCookie(token);
}

export function getSortOptionsForCreatedAt(querySortDirection?: Sorting, defaultSortDirection: Sorting = Sorting.Descending): { [key: string]: Sorting } {
  const sort: { [key: string]: Sorting } = {};

  if (querySortDirection) {
    if (querySortDirection === Sorting.Ascending) {
      sort['createdAt'] = Sorting.Ascending;
    } else {
      sort['createdAt'] = Sorting.Descending;
    }
  } else {
    sort['createdAt'] = defaultSortDirection;
  }

  return sort;
}

export function generateNotification(userName: string, requestType: RequestType): string {
  if (notificationMessages[requestType]) {
    return `${userName} ${notificationMessages[requestType]}`;
  } else {
    return 'Новое уведомление';
  }
}

export const durationFilters: { [key in WorkoutDuration]: string } = {
  [WorkoutDuration.Short]: WorkoutDuration.Short,
  [WorkoutDuration.Medium]: WorkoutDuration.Medium,
  [WorkoutDuration.Long]: WorkoutDuration.Long,
  [WorkoutDuration.ExtraLong]: WorkoutDuration.ExtraLong,
};

export const workoutTypeFilters: { [key in WorkoutType]: string } = {
  [WorkoutType.Aerobics]: WorkoutType.Aerobics,
  [WorkoutType.Boxing]: WorkoutType.Boxing,
  [WorkoutType.Crossfit]: WorkoutType.Crossfit,
  [WorkoutType.Pilates]: WorkoutType.Pilates,
  [WorkoutType.Running]: WorkoutType.Running,
  [WorkoutType.Stretching]: WorkoutType.Stretching,
  [WorkoutType.Yoga]: WorkoutType.Yoga,
  [WorkoutType.Power]: WorkoutType.Power,
};

export const locationsFilters: { [key in Location]: string } = {
  [Location.Petrograd]: Location.Petrograd,
  [Location.Pioneer]: Location.Pioneer,
  [Location.Sportivnaya]: Location.Sportivnaya,
  [Location.Udelnaya]: Location.Udelnaya,
  [Location.Zvezdnaya]: Location.Zvezdnaya,
};

export const levelsFilters: { [key in TrainingLevel]: string } = {
  [TrainingLevel.Amateur]: TrainingLevel.Amateur,
  [TrainingLevel.Beginner]: TrainingLevel.Beginner,
  [TrainingLevel.Professional]: TrainingLevel.Professional,
};

export function applyWorkoutDurationFilter(query: TrainingQueryParams, filter: TrainingFilter): void {
  if (query.workoutDuration) {
    const workoutDurationsArray = query.workoutDuration.toString().toLowerCase().split(',').map((duration) => duration.trim());
    const filterValues = workoutDurationsArray
      .filter((selectedDuration) => durationFilters[selectedDuration as WorkoutDuration])
      .map((selectedDuration) => durationFilters[selectedDuration as WorkoutDuration]);
    filter.workoutDuration = { $in: filterValues };
  }
}

export function applyWorkoutTypeFilter(query: TrainingQueryParams, filter: TrainingFilter): void {
  if (query.workoutTypes) {
    const workoutTypesArray = query.workoutTypes.toString().toLowerCase().split(',').map((workoutType) => workoutType.trim());
    const filterValues = workoutTypesArray
      .filter((selectedWorkoutType) => workoutTypeFilters[selectedWorkoutType as WorkoutType])
      .map((selectedWorkoutType) => workoutTypeFilters[selectedWorkoutType as WorkoutType]);
    filter.workoutType = { $in: filterValues };
  }
}

export function applyLocationsFilter(query: UserQueryParams, filter: UserFilter): void {
  if (query.location) {
    const locationsArray = query.location.toString().toLowerCase().split(',').map((item) => item.trim());
    const filterValues = locationsArray
      .filter((selectedLocation) => locationsFilters[selectedLocation as Location])
      .map((selectedLocation) => locationsFilters[selectedLocation as Location]);
    filter.location = { $in: filterValues };
  }
}

export function applyTrainingLevelFilter(query: UserQueryParams, filter: UserFilter): void {
  if (query.trainingLevel && Object.values(TrainingLevel).includes(query.trainingLevel)) {
    filter.trainingLevel = query.trainingLevel.toLowerCase();
  }
}
