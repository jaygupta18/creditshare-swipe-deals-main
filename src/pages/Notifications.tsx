import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '@/contexts/NotificationContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Bell, CheckCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

const Notifications = () => {
  const navigate = useNavigate();
  const { notifications, unreadCount, isLoading, fetchNotifications, markAsRead, markAllAsRead } = useNotification();
  
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);
  
  const handleMarkAsRead = (notificationId: string) => {
    markAsRead(notificationId);
  };
  
  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };
  
  const handleNotificationClick = (notification: any) => {
    // Mark as read when clicked
    markAsRead(notification.id);
    
    // Navigate based on notification type
    if (notification.type === 'order_created' || 
        notification.type === 'order_accepted' || 
        notification.type === 'order_cancelled' ||
        notification.type === 'payment_confirmed' ||
        notification.type === 'proof_uploaded' ||
        notification.type === 'order_completed') {
      navigate(`/order/${notification.data.orderId}`);
    } else if (notification.type === 'profile_updated') {
      navigate('/profile');
    } else {
      // Default to dashboard for other notification types
      navigate('/dashboard');
    }
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order_created':
        return <Bell className="h-5 w-5 text-blue-500" />;
      case 'order_accepted':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'order_cancelled':
        return <Bell className="h-5 w-5 text-red-500" />;
      case 'payment_confirmed':
        return <Bell className="h-5 w-5 text-indigo-500" />;
      case 'proof_uploaded':
        return <Bell className="h-5 w-5 text-purple-500" />;
      case 'order_completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'profile_updated':
        return <Bell className="h-5 w-5 text-orange-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const formatNotificationTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInSecs = Math.floor(diffInMs / 1000);
    const diffInMins = Math.floor(diffInSecs / 60);
    const diffInHours = Math.floor(diffInMins / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInSecs < 60) {
      return 'just now';
    } else if (diffInMins < 60) {
      return `${diffInMins} ${diffInMins === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  return (
    <div className="container max-w-2xl mx-auto py-10">
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={() => navigate('/dashboard')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              {unreadCount > 0 
                ? `You have ${unreadCount} unread notification${unreadCount === 1 ? '' : 's'}`
                : 'All caught up!'}
            </CardDescription>
          </div>
          
          {unreadCount > 0 && (
            <Button variant="outline" onClick={handleMarkAllAsRead}>
              Mark all as read
            </Button>
          )}
        </CardHeader>
        
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-10">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-1">No notifications yet</h3>
              <p className="text-muted-foreground">
                When you get notifications, they'll appear here.
              </p>
            </div>
          ) : (
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id}>
                    <div 
                      className={`flex items-start p-3 rounded-lg cursor-pointer transition-colors ${
                        notification.isRead 
                          ? 'hover:bg-gray-50' 
                          : 'bg-blue-50 hover:bg-blue-100'
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="mr-3">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${notification.isRead ? 'font-normal' : 'font-medium'}`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatNotificationTime(notification.createdAt)}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="ml-2 h-8 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAsRead(notification.id);
                          }}
                        >
                          Mark read
                        </Button>
                      )}
                    </div>
                    <Separator className="my-2" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <Button 
            variant="outline" 
            onClick={() => fetchNotifications()}
            disabled={isLoading}
          >
            Refresh
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Notifications;
