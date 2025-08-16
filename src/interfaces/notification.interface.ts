export interface INotificationResponse {
  notificationId: number;
  message: string;
  read: boolean;
  notificationType: string;
  username: number;
  broadcast: boolean;
  createdAt: string;
}
