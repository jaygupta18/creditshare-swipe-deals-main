
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CardSwiper, { CardData } from '@/components/CardSwiper';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, CreditCard, Eye, Package } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock data for available orders
const mockOrders: CardData[] = [
  {
    id: '1',
    title: 'Apple iPhone 13 Pro - 256GB - Graphite',
    image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2233&q=80',
    price: 999.99,
    fee: 50.00,
    discount: 15,
    store: 'Apple Store'
  },
  {
    id: '2',
    title: 'Sony WH-1000XM4 Wireless Noise Cancelling Headphones',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1888&q=80',
    price: 349.99,
    fee: 25.00,
    discount: 20,
    store: 'Best Buy'
  },
  {
    id: '3',
    title: 'Samsung Galaxy Watch 4 Classic - 46mm',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1399&q=80',
    price: 299.99,
    fee: 20.00,
    discount: 10,
    store: 'Samsung'
  }
];

// Mock data for accepted orders
const mockAcceptedOrders = [
  {
    id: '5',
    title: 'Dell XPS 15 Laptop - 32GB RAM, 1TB SSD',
    image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80',
    price: 1899.99,
    fee: 75.00,
    discount: 15,
    store: 'Dell Store',
    status: 'awaiting_purchase',
    buyerName: 'Neha Kapoor',
    date: '2023-08-15'
  },
  {
    id: '6',
    title: 'Sony PlayStation 5 Digital Edition',
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1412&q=80',
    price: 399.99,
    fee: 40.00,
    discount: 10,
    store: 'GameStop',
    status: 'delivered',
    buyerName: 'Arjun Mehta',
    date: '2023-08-10'
  }
];

const CardHolder = () => {
  const [availableOrders, setAvailableOrders] = useState<CardData[]>(mockOrders);
  const [acceptedOrders, setAcceptedOrders] = useState(mockAcceptedOrders);
  const { toast } = useToast();

  const handleAcceptOrder = (order: CardData) => {
    // In a real app, this would call an API to accept the order
    toast({
      title: "Order Accepted!",
      description: `You've accepted the order for ${order.title}. Complete the purchase soon.`,
      variant: "default",
    });
    
    // Add to accepted orders
    setAcceptedOrders([
      {
        ...order,
        status: 'awaiting_purchase',
        buyerName: 'Random Buyer',
        date: new Date().toISOString().split('T')[0]
      },
      ...acceptedOrders
    ]);
  };

  const handleRejectOrder = (order: CardData) => {
    // In a real app, this would call an API to reject the order
    toast({
      title: "Order Skipped",
      description: "You've skipped this order. It won't appear in your feed again.",
      variant: "default",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'awaiting_purchase':
        return <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">Awaiting Purchase</span>;
      case 'purchased':
        return <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Purchased</span>;
      case 'shipped':
        return <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">Shipped</span>;
      case 'delivered':
        return <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">Delivered</span>;
      default:
        return <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">Unknown</span>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <div>
              <h1 className="text-3xl font-bold">Card Holder Dashboard</h1>
              <p className="text-muted-foreground">Browse orders and earn by helping buyers access credit card discounts.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="rounded-xl bg-primary p-4 text-center">
                <p className="text-sm font-medium text-muted-foreground">Trust Score</p>
                <p className="text-xl font-bold text-credit-primary">92/100</p>
              </div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="browse" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>Browse Orders</span>
            </TabsTrigger>
            <TabsTrigger value="accepted" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>My Orders</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="browse" className="space-y-8">
            <div className="mx-auto max-w-md">
              <CardSwiper
                cards={availableOrders}
                onAccept={handleAcceptOrder}
                onReject={handleRejectOrder}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="accepted" className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {acceptedOrders.map((order) => (
                <div key={order.id} className="credit-card flex flex-col bg-card">
                  <div
                    className="h-40 bg-cover bg-center"
                    style={{ backgroundImage: `url(${order.image})` }}
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium">
                        {order.store}
                      </span>
                      {getStatusBadge(order.status)}
                    </div>
                    
                    <h3 className="mb-4 line-clamp-1 text-lg font-semibold">{order.title}</h3>
                    
                    <div className="mb-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Product Price</span>
                        <span className="font-medium">${order.price.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Service Fee</span>
                        <span className="font-medium text-credit-primary">
                          +${order.fee.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-t border-border pt-2">
                        <span className="font-medium">Total Payout</span>
                        <span className="text-lg font-semibold">
                          ${(order.price + order.fee).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-auto">
                      {order.status === 'awaiting_purchase' ? (
                        <Button className="w-full credit-gradient">Complete Purchase</Button>
                      ) : order.status === 'purchased' ? (
                        <Button className="w-full bg-purple-500 hover:bg-purple-600">
                          <Package className="mr-2 h-4 w-4" />
                          Upload Tracking
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default CardHolder;
