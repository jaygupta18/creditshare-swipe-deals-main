
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <Progress value={30} className="w-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto py-12 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground">
            {user?.role === 'buyer' 
              ? 'Find credit card holders and save on your purchases.' 
              : 'Help buyers save while earning rewards.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Your Trust Score</CardTitle>
              <CardDescription>
                Based on your activity and profile completeness
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Score</span>
                  <span className="font-medium">{user?.trustScore || 0}%</span>
                </div>
                <Progress value={user?.trustScore || 0} />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => navigate('/profile')}>
                Improve Score
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {user?.role === 'buyer' ? 'Create an Order' : 'Find Orders'}
              </CardTitle>
              <CardDescription>
                {user?.role === 'buyer' 
                  ? 'Find a credit card holder for your purchase' 
                  : 'Help buyers and earn rewards'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {user?.role === 'buyer' 
                  ? 'Create a new order to find a credit card holder.' 
                  : 'Browse available orders and accept the ones you can fulfill.'}
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate(user?.role === 'buyer' ? '/orders/create' : '/orders/explore')}>
                {user?.role === 'buyer' ? 'Create Order' : 'Explore Orders'}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Activity</CardTitle>
              <CardDescription>Track your recent orders and transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                View and manage your recent orders and payment transactions.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => navigate('/orders/my-orders')}>
                View Orders
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
