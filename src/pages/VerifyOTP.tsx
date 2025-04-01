import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';

const formSchema = z.object({
  otp: z.string().min(4, 'OTP must be at least 4 characters').max(6, 'OTP must be at most 6 characters'),
});

type FormData = z.infer<typeof formSchema>;

const VerifyOTP = () => {
  const { verifyOtp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSuccess, setIsSuccess] = useState(false);
  const [contactType, setContactType] = useState<'email' | 'phone'>('email');
  const [contactValue, setContactValue] = useState('');
  
  useEffect(() => {
    // Extract query parameters from URL
    const params = new URLSearchParams(location.search);
    const email = params.get('email');
    const phone = params.get('phone');
    
    if (email) {
      setContactType('email');
      setContactValue(email);
    } else if (phone) {
      setContactType('phone');
      setContactValue(phone);
    }
  }, [location]);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (contactType === 'email') {
        await verifyOtp(data.otp, contactValue, undefined);
      } else {
        await verifyOtp(data.otp, undefined, contactValue);
      }
      setIsSuccess(true);
      
      // Redirect to profile after 2 seconds
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (error) {
      console.error('OTP verification error:', error);
    }
  };

  return (
    <div className="container max-w-md mx-auto py-10">
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={() => navigate('/profile')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Profile
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle>Verify {contactType === 'email' ? 'Email' : 'Phone'}</CardTitle>
          <CardDescription>
            Enter the verification code sent to your {contactType}.
            {contactValue && (
              <span className="block mt-1 font-medium">
                {contactType === 'email' ? contactValue : `+${contactValue}`}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {isSuccess && (
                <div className="bg-green-50 text-green-700 p-3 rounded-md mb-4">
                  Verification successful! Redirecting to profile...
                </div>
              )}
              
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter code" 
                        {...field} 
                        className="text-center text-xl tracking-widest"
                        maxLength={6}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="text-sm text-muted-foreground text-center mt-2">
                Didn't receive a code? 
                <Button variant="link" className="p-0 h-auto ml-1">
                  Resend
                </Button>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Verifying...' : 'Verify'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default VerifyOTP;
