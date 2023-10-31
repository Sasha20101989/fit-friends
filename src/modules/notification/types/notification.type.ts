export type Notification = {
  user: string,
  type: NotificationType,
  text: string,
};

export enum NotificationType {
  FriendRequest = "friend-request",
  WorkoutInvitation = "workout-invitation",
  TrainingRequest = "training-request",
  PersonalTrainingRequest = "personal-training-request",
}
