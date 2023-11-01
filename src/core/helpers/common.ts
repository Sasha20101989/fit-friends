import * as crypto from 'node:crypto';
import * as jose from 'jose';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { UnknownRecord } from '../../types/common/unknown-record.type.js';
import { DEFAULT_STATIC_IMAGES } from '../../app/rest.const.js';
import { Response } from 'express';
import { DEFAULT_MAX_AGE_TOKEN } from '../../modules/user/user.const.js';
import { Token } from '../../modules/token/types/token.enum.js';
import { Sorting } from '../../types/sorting.enum.js';
import { QueryTypes } from '../../types/query-types.interface.js';
import { FilterTypes } from '../../types/filter-types.interface.js';
import { WorkoutType } from '../../types/workout-type.enum.js';
import { notificationMessages } from '../../modules/notification/types/notification-messages.type.js';
import { RequestType } from '../../modules/trainingRequest/types/request-type.enum.js';

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

export function setRefreshTokenCookie(res: Response, refreshToken: string, expirationTime: string) {
  const numericValue = parseInt(expirationTime, 10);
  let maxAge;

  if (expirationTime.endsWith('d')) {
    maxAge = numericValue * 24 * 60 * 60 * 1000;
  } else {
    maxAge = DEFAULT_MAX_AGE_TOKEN * 24 * 60 * 60 * 1000;
  }

  res.cookie(Token.Refresh, refreshToken, { maxAge, httpOnly: true });
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

export function applyWorkoutTypesFilter<TQuery extends QueryTypes, TFilter extends FilterTypes>(
  query: TQuery,
  filter: TFilter
): void {
  if (query.workoutTypes) {
    const workoutTypeValues = Object.values(WorkoutType) as string[];
      const workoutTypesArray = query.workoutTypes.toString().toLowerCase().split(',').map((type) => type.trim()) as WorkoutType[];

      const isValidWorkoutType = workoutTypesArray.every((type) => workoutTypeValues.includes(type));

      if (isValidWorkoutType) {
          filter.workoutTypes = { $in: workoutTypesArray };
      }
  }
}

export function generateNotification(requestType: RequestType): string {
  if (notificationMessages[requestType]) {
    return notificationMessages[requestType];
  } else {
    return 'Новое уведомление';
  }
}
