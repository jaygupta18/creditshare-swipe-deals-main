 import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '@/contexts/OrderContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PlusCircle, ArrowRight, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Order } from '@/types/api';

export default function Orders() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { orders, acceptedOrders, isLoading, fetchOrders, fetchAcceptedOrders } = useOrder();
  const [activeTab, setActiveTab] = useState('my-orders');
  
  useEffect(() => {
    if (activeTab === 'my-orders') {
      fetchOrders();
    } else {
      fetchAcceptedOrders();
    }
  }, [activeTab, fetchOrders, fetchAcceptedOrders]);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'accepted':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Accepted</Badge>;
      case 'payment_confirmed':
        return <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">Payment Confirmed</Badge>;
      case 'proof_uploaded':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Proof Uploaded</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getOrderCard = (order: Order) => (
    <Card key={order.id} className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{order.productName || 'Product'}</CardTitle>
            <CardDescription>
              Created on {new Date(order.createdAt).toLocaleDateString()}
            </CardDescription>
          </div>
          {getStatusBadge(order.status)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Amount</p>
            <p className="font-medium">${order.amount?.toFixed(2) || '0.00'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Reward</p>
            <p className="font-medium">${order.reward?.toFixed(2) || '0.00'}</p>
          </div>
        </div>
        
        <Separator className="my-3" />
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {order.status === 'pending' ? (
              <Clock className="h-4 w-4 text-yellow-500 mr-2" />
            ) : order.status === 'completed' || order.status === 'delivered' ? (
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            ) : order.status === 'cancelled' ? (
              <XCircle className="h-4 w-4 text-red-500 mr-2" />
            ) : (
              <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
            )}
            <span className="text-sm">
              {order.status === 'pending' ? 'Awaiting acceptance' :
               order.status === 'accepted' ? 'Accepted, awaiting payment' :
               order.status === 'payment_confirmed' ? 'Payment confirmed, awaiting proof' :
               order.status === 'proof_uploaded' ? 'Proof uploaded, awaiting confirmation' :
               order.status === 'completed' || order.status === 'delivered' ? 'Order completed' :
               'Order cancelled'}
            </span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(`/order/${order.id}`)}
          >
            View Details <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <div className="container max-w-4xl mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        {user?.role === 'buyer' && (
          <Button onClick={() => navigate('/create-order')}>
            <PlusCircle className="mr-2 h-4 w-4" /> Create Order
          </Button>
        )}
      </div>
      
      <Tabs defaultValue="my-orders" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="my-orders">
            {user?.role === 'buyer' ? 'My Orders' : 'Available Orders'}
          </TabsTrigger>
          {user?.role === 'card_holder' && (
            <TabsTrigger value="accepted-orders">Accepted Orders</TabsTrigger>
          )}
          {user?.role === 'buyer' && (
            <TabsTrigger value="accepted-orders">My Purchases</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="my-orders">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : orders.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <h3 className="text-lg font-medium mb-2">No orders found</h3>
                <p className="text-muted-foreground mb-6">
                  {user?.role === 'buyer' 
                    ? "You haven't created any orders yet."
                    : "There are no available orders at the moment."}
                </p>
                {user?.role === 'buyer' && (
                  <Button onClick={() => navigate('/create-order')}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Create Order
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div>
              {orders.map(order => getOrderCard(order))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="accepted-orders">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : acceptedOrders.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <h3 className="text-lg font-medium mb-2">No accepted orders</h3>
                <p className="text-muted-foreground mb-6">
                  {user?.role === 'card_holder' 
                    ? "You haven't accepted any orders yet."
                    : "You don't have any active purchases."}
                </p>
                {user?.role === 'card_holder' && (
                  <Button onClick={() => setActiveTab('my-orders')}>
                    Browse Available Orders
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div>
              {acceptedOrders.map(order => getOrderCard(order))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}