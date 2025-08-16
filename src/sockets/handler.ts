import type{ INotificationResponse } from './../interfaces/notification.interface';

export const handleBroadcastNotification = (msg: any) => {
  const notification: INotificationResponse = JSON.parse(msg.body);
  console.log("📢 Broadcast:", notification.message);
};

export const handlePrivateNotification = (msg: any) => {
  const notification: INotificationResponse = JSON.parse(msg.body);
  console.log("🔒 Private:", notification.message);
};
