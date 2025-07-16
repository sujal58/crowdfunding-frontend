export interface INotification {
  notificationId: number;
  message: string;
  read: boolean;
  notificationType: string;
  userId: number;
  broadcast: boolean;
  createdAt: string;
}
