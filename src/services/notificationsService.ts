export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

class NotificationsService {
  private notifications: Notification[] = [
    {
      id: '1',
      title: 'Appointment Confirmed',
      message: 'Your appointment with Dr. Sarah Johnson has been confirmed for June 15th.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      read: false,
      type: 'success'
    },
    {
      id: '2',
      title: 'New Lab Results',
      message: 'Your blood test results from June 10th are now available for review.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      read: false,
      type: 'info'
    },
    {
      id: '3',
      title: 'Health Tip',
      message: 'Remember to stay hydrated! Aim for at least 8 glasses of water today.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
      read: true,
      type: 'info'
    }
  ];

  getNotifications(): Notification[] {
    return [...this.notifications].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  markAsRead(id: string) {
    this.notifications = this.notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
  }

  markAllAsRead() {
    this.notifications = this.notifications.map(n => ({ ...n, read: true }));
  }

  getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      read: false
    };
    this.notifications.unshift(newNotification);
  }
}

export const notificationsService = new NotificationsService();
