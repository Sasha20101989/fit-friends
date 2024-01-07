import { RequestType } from '../../request/types/request-type.enum.js';

export const notificationMessages: { [key in RequestType]: string } = {
  [RequestType.Friend]: 'добавил(а) вас в в друзья',
  [RequestType.Group]: 'пригласил(а) вас на тренировку',
  [RequestType.Personal]: 'пригласил(а) вас на персональную тренировку',
};
