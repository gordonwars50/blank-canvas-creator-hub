
export interface Notification {
  id: string;
  type: 'comment' | 'like' | 'subscriber' | 'upload_complete' | 'monetization';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  videoId?: string;
  userId?: string;
  metadata?: Record<string, any>;
}

export interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}
