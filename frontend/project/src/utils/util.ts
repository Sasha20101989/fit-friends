import { BaseUser } from '../types/base-user.type';
import { Role } from '../types/role.enum';
import { Trainer } from '../types/trainer.interface';
import { User } from '../types/user.interface';

export function formatDateString(inputDate: string): string {
  const date = new Date(inputDate);

  const day = date.getDate();
  const month = getMonthNameInGenitiveCase(date);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${day} ${month}, ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

  return formattedDate;
}

export function formatCustomDateTimeString(inputDate: string): string {
  const date = new Date(inputDate);

  const year = date.getFullYear();
  const month = getMonthNameInGenitiveCase(date);
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDateTime = `${year}-${(month.length === 1 ? '0' : '') + String(date.getMonth() + 1)}-${(day < 10 ? '0' : '') + String(day)} ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

  return formattedDateTime;
}

export const getMonthNameInGenitiveCase = (date = new Date()) =>
  date.toLocaleString('ru', {
    month: 'long',
    day: 'numeric',
  }).split(' ')[1];

export function createUser<T extends BaseUser>(user: Omit<User, keyof BaseUser> & T): User {
  return { ...user, role: Role.User } as User;
}

export function createTrainer<T extends BaseUser>(trainer: Omit<Trainer, keyof BaseUser> & T): Trainer {
  return { ...trainer, role: Role.Trainer } as Trainer;
}
