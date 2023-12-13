import * as crypto from 'node:crypto';
import * as jose from 'jose';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { UnknownRecord } from '../../types/common/unknown-record.type.js';
import { DEFAULT_STATIC_IMAGES } from '../../app/rest.const.js';
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

export function transformObject(properties: string[], staticPath: string, uploadPath: string, data:UnknownRecord) {
  return properties
    .forEach((property) => {
      transformProperty(property, data, (target: UnknownRecord) => {
        const rootPath = DEFAULT_STATIC_IMAGES.includes(target[property] as string) ? staticPath : uploadPath;
        target[property] = `${rootPath}/${target[property]}`;
      });
    });
}

export function getRandomBackgroundImage(): string {
  const randomIndex = Math.floor(Math.random() * DEFAULT_STATIC_IMAGES.length);
  return DEFAULT_STATIC_IMAGES[randomIndex];
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

export function generateNotification(requestType: RequestType): string {
  if (notificationMessages[requestType]) {
    return notificationMessages[requestType];
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

export function applyLocationFilter(query: UserQueryParams, filter: UserFilter): void {
  if (query.location && Object.values(Location).includes(query.location)) {
    filter.location = query.location.toLowerCase();
  }
}

export function applyTrainingLevelFilter(query: UserQueryParams, filter: UserFilter): void {
  if (query.trainingLevel && Object.values(TrainingLevel).includes(query.trainingLevel)) {
    filter.trainingLevel = query.trainingLevel.toLowerCase();
  }
}
