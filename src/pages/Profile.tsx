import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { userService } from '@/services/userService';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UpdateProfileRequest } from '@/types/api';
import { useToast } from '@/components/ui/use-toast';

const Profile = () => {
  const { user, updateProfile, isLoading } = useAuth();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<UpdateProfileRequest>();
  const [trustScore, setTrustScore] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('phone', user.phone || '');
      setValue('bio', user.bio || '');
      
      // Fetch trust score
      const fetchTrustScore = async () => {
        try {
          const response = await userService.getTrustScore();
          setTrustScore(response.data.trustScore);
        } catch (error) {
          console.error('Failed to fetch trust score:', error);
        }
      };
      fetchTrustScore();
    }
  }, [user, setValue]);

  const onSubmit = async (data: UpdateProfileRequest) => {
    try {
      await updateProfile(data);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast({
        title: "Update failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow p-8">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Trust Score</CardTitle>
                <div className="flex items-center justify-between space-x-2">
                  <div className="text-xs font-medium text-gray-500">
                    {trustScore}%
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium text-gray-500">
                  {trustScore}%
                </div>
                <div className="text-xs font-medium text-gray-500">
                  {trustScore > 70 ? 'Trusted' : 'Untrusted'}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
          <div className="col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Profile Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" value={user?.name} {...register('name')} />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" value={user?.phone} {...register('phone')} />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" value={user?.bio} {...register('bio')} />
                    </div>
                  </div>
                  <Button type="submit" className="w-full mt-4">
                    {isLoading ? 'Updating...' : 'Update'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile; 