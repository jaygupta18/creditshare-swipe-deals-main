import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '@/contexts/OrderContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, DollarSign, ShoppingCart } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  productName: z.string().min(3, 'Product name must be at least 3 characters'),
  productUrl: z.string().url('Please enter a valid URL'),
  amount: z.coerce.number().positive('Amount must be positive').min(1, 'Minimum amount is $1'),
  reward: z.coerce.number().positive('Reward must be positive').min(1, 'Minimum reward is $1'),
  instructions: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const CreateOrder = () => {
  const { createOrder } = useOrder();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
      productUrl: '',
      amount: 0,
      reward: 0,
      instructions: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      const order = await createOrder({
        productName: data.productName,
        productUrl: data.productUrl,
        amount: data.amount,
        reward: data.reward,
        instructions: data.instructions || '',
      });
      
      // Navigate to the order details page
      navigate(`/order/${order.id}`);
    } catch (error) {
      console.error('Create order error:', error);
      setIsSubmitting(false);
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
        <CardHeader>
          <CardTitle>Create New Order</CardTitle>
          <CardDescription>
            Fill in the details below to create a new purchase order.
          </CardDescription>
        </CardHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">Product Information</h3>
                
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Amazon Echo Dot" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter the name of the product you want to purchase.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="productUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://www.example.com/product" {...field} />
                      </FormControl>
                      <FormDescription>
                        Provide a link to the product page.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">Financial Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Purchase Amount ($)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              type="number" 
                              placeholder="0.00" 
                              className="pl-9" 
                              {...field} 
                              step="0.01"
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          The cost of the product.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="reward"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reward Amount ($)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              type="number" 
                              placeholder="0.00" 
                              className="pl-9" 
                              {...field} 
                              step="0.01"
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          The reward for the card holder.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="bg-muted p-4 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Amount:</span>
                    <span className="font-medium">
                      ${(Number(form.watch('amount') || 0) + Number(form.watch('reward') || 0)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <FormField
                control={form.control}
                name="instructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Instructions (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Add any special instructions or requirements here..." 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Provide any additional details or requirements for this order.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    Creating Order...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" /> Create Order
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default CreateOrder;
