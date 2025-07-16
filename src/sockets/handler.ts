import type{ INotification } from './../interfaces/notification.interface';

export const handleBroadcastNotification = (msg: any) => {
  const notification: INotification = JSON.parse(msg.body);
  console.log("📢 Broadcast:", notification.message);
};

export const handlePrivateNotification = (msg: any) => {
  const notification: INotification = JSON.parse(msg.body);
  console.log("🔒 Private:", notification.message);
};
