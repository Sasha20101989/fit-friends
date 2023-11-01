import { RequestType } from "../../trainingRequest/types/request-type.enum.js";

export const notificationMessages: { [key in RequestType]: string } = {
  [RequestType.Friend]: 'запрос в друзья',
  [RequestType.Group]: 'отправил запрос на тренировку',
  [RequestType.Personal]: 'запрос на персональную тренировку',
};
