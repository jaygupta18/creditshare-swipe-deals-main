
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, CreditCard, Globe, Package, Plus, ShoppingBag } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

// Mock data for placed orders
const mockPlacedOrders = [
  {
    id: '1',
    title: 'Apple MacBook Pro M2 - 512GB',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1420&q=80',
    originalPrice: 1499.99,
    discountedPrice: 1274.99,
    status: 'accepted',
    cardHolderName: 'Ravi Verma',
    date: '2023-08-18',
    store: 'Apple Store',
    discount: 15
  },
  {
    id: '2',
    title: 'Bose QuietComfort Earbuds II',
    image: 'https://images.unsplash.com/photo-1606041011872-596597976b25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80',
    originalPrice: 299.99,
    discountedPrice: 239.99,
    status: 'delivered',
    cardHolderName: 'Anita Patel',
    date: '2023-08-05',
    store: 'Bose Official',
    discount: 20
  }
];

const Buyer = () => {
  const [productUrl, setProductUrl] = useState('');
  const [productDetails, setProductDetails] = useState<null | {
    title: string;
    image: string;
    originalPrice: number;
    discountedPrice: number;
    store: string;
    discount: number;
  }>(null);
  const [serviceFee, setServiceFee] = useState(10);
  const [placedOrders, setPlacedOrders] = useState(mockPlacedOrders);
  const { toast } = useToast();

  const handleFetchProduct = () => {
    // In a real app, this would call an API to fetch product details
    if (!productUrl) {
      toast({
        title: "URL Required",
        description: "Please enter a product URL",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate API call with mock data
    setTimeout(() => {
      setProductDetails({
        title: "Samsung Galaxy S22 Ultra - 256GB - Phantom Black",
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
        originalPrice: 1199.99,
        discountedPrice: 959.99,
        store: "Samsung.com",
        discount: 20
      });
      
      toast({
        title: "Product Found!",
        description: "We've found the product details for your URL.",
        variant: "default",
      });
    }, 1000);
  };

  const handlePlaceOrder = () => {
    // In a real app, this would call an API to place the order
    if (!productDetails) return;
    
    // Simulate API call
    toast({
      title: "Order Placed Successfully!",
      description: "Your order is now available for card holders to accept.",
      variant: "default",
    });
    
    // Add to placed orders
    setPlacedOrders([
      {
        id: Date.now().toString(),
        title: productDetails.title,
        image: productDetails.image,
        originalPrice: productDetails.originalPrice,
        discountedPrice: productDetails.discountedPrice,
        status: 'pending',
        cardHolderName: '',
        date: new Date().toISOString().split('T')[0],
        store: productDetails.store,
        discount: productDetails.discount
      },
      ...placedOrders
    ]);
    
    // Reset form
    setProductUrl('');
    setProductDetails(null);
    setServiceFee(10);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">Pending</span>;
      case 'accepted':
        return <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Accepted</span>;
      case 'purchased':
        return <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800">Purchased</span>;
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
              <h1 className="text-3xl font-bold">Buyer Dashboard</h1>
              <p className="text-muted-foreground">Save money by leveraging credit card discounts from card holders.</p>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="place-order" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
            <TabsTrigger value="place-order" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Place Order</span>
            </TabsTrigger>
            <TabsTrigger value="my-orders" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span>My Orders</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="place-order" className="space-y-8">
            <div className="mx-auto max-w-2xl">
              <Card>
                <CardHeader>
                  <CardTitle>Place a New Order</CardTitle>
                  <CardDescription>
                    Enter the product URL to fetch details and set your service fee.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="product-url">Product URL</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="product-url"
                        placeholder="https://amazon.in/product/123456"
                        value={productUrl}
                        onChange={(e) => setProductUrl(e.target.value)}
                      />
                      <Button onClick={handleFetchProduct} className="shrink-0">
                        <Globe className="mr-2 h-4 w-4" />
                        Fetch
                      </Button>
                    </div>
                  </div>
                  
                  {productDetails && (
                    <>
                      <div className="rounded-lg border border-border p-4">
                        <div className="flex flex-col gap-4 md:flex-row">
                          <div className="md:w-1/3">
                            <img
                              src={productDetails.image}
                              alt={productDetails.title}
                              className="h-48 w-full rounded-md object-cover"
                            />
                          </div>
                          <div className="md:w-2/3">
                            <h3 className="mb-2 text-lg font-medium">{productDetails.title}</h3>
                            <div className="mb-2 flex items-center gap-2">
                              <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium">
                                {productDetails.store}
                              </span>
                              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                                {productDetails.discount}% OFF
                              </span>
                            </div>
                            <div className="mb-4 space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Original Price:</span>
                                <span className="font-medium line-through">
                                  ${productDetails.originalPrice.toFixed(2)}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Discounted Price:</span>
                                <span className="font-medium text-green-600">
                                  ${productDetails.discountedPrice.toFixed(2)}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">You Save:</span>
                                <span className="font-medium text-green-600">
                                  ${(productDetails.originalPrice - productDetails.discountedPrice).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="mb-2 flex items-center justify-between">
                            <Label>Card Holder Service Fee</Label>
                            <span className="font-medium text-credit-primary">${serviceFee}</span>
                          </div>
                          <Slider
                            value={[serviceFee]}
                            min={5}
                            max={50}
                            step={1}
                            onValueChange={(values) => setServiceFee(values[0])}
                            className="py-4"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>$5 (Minimum)</span>
                            <span>Recommended: $10-20</span>
                            <span>$50 (Maximum)</span>
                          </div>
                        </div>
                        
                        <div className="rounded-lg bg-primary p-4">
                          <div className="mb-4 space-y-2">
                            <div className="flex items-center justify-between">
                              <span>Product Price (Discounted)</span>
                              <span className="font-medium">${productDetails.discountedPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Service Fee</span>
                              <span className="font-medium text-credit-primary">+${serviceFee.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Platform Fee (5%)</span>
                              <span className="font-medium">
                                +${(productDetails.discountedPrice * 0.05).toFixed(2)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between border-t border-border pt-2">
                              <span className="font-medium">Total Payment</span>
                              <span className="text-lg font-semibold">
                                ${(productDetails.discountedPrice + serviceFee + productDetails.discountedPrice * 0.05).toFixed(2)}
                              </span>
                            </div>
                          </div>
                          
                          <Button
                            onClick={handlePlaceOrder}
                            className="w-full credit-gradient"
                            size="lg"
                          >
                            Place Order & Pay Now
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="my-orders" className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {placedOrders.map((order) => (
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
                    
                    <h3 className="mb-2 line-clamp-1 text-lg font-semibold">{order.title}</h3>
                    
                    {order.status !== 'pending' && (
                      <p className="mb-4 text-sm text-muted-foreground">
                        Card Holder: <span className="font-medium">{order.cardHolderName}</span>
                      </p>
                    )}
                    
                    <div className="mb-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Original Price</span>
                        <span className="font-medium line-through">${order.originalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Discounted Price</span>
                        <span className="font-medium text-green-600">
                          ${order.discountedPrice.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-t border-border pt-2">
                        <span className="font-medium">You Save</span>
                        <span className="text-lg font-semibold text-green-600">
                          ${(order.originalPrice - order.discountedPrice).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-auto space-y-4">
                      {order.status === 'pending' ? (
                        <div className="text-center text-sm text-muted-foreground">
                          Waiting for a card holder to accept your order...
                        </div>
                      ) : order.status === 'accepted' ? (
                        <div className="space-y-2">
                          <div className="flex items-center rounded-md bg-blue-50 p-2 text-sm text-blue-700">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Card holder is processing your order
                          </div>
                        </div>
                      ) : order.status === 'delivered' ? (
                        <div className="flex items-center rounded-md bg-green-50 p-2 text-sm text-green-700">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Order delivered on {order.date}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center rounded-md bg-purple-50 p-2 text-sm text-purple-700">
                            <Package className="mr-2 h-4 w-4" />
                            Your order is on the way
                          </div>
                        </div>
                      )}
                      
                      <Button
                        variant="outline"
                        className="w-full"
                      >
                        View Details
                      </Button>
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

export default Buyer;
