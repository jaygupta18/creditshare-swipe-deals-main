
import React from 'react';
import { Shield, Lock, Award, BarChart3 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const features = [
  {
    icon: Shield,
    title: 'AI-Driven Trust Scores',
    description: 'Our platform uses AI to analyze user behavior and create trust scores that help ensure safe transactions.'
  },
  {
    icon: Lock,
    title: 'Secure Escrow Payments',
    description: 'All payments are held in escrow until delivery is confirmed, protecting both buyers and sellers.'
  },
  {
    icon: Award,
    title: 'Verified Users',
    description: 'All users go through a strict verification process before being allowed to transact on the platform.'
  },
  {
    icon: BarChart3,
    title: 'Transparent Fee Structure',
    description: 'Our fee structure is clear and transparent, with no hidden charges for either buyers or card holders.'
  }
];

const TrustSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Trust & Security</h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            Your security is our top priority. We've built multiple layers of protection
            into the CreditShare platform to keep transactions safe.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="order-2 space-y-8 md:order-1">
            {features.map((feature, index) => (
              <div key={index} className="flex">
                <div className="mr-6 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-credit-primary">
                  <feature.icon className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="order-1 md:order-2">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h3 className="mb-6 text-2xl font-bold">Trust Score System</h3>
              
              <div className="mb-8 space-y-6">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium">Transaction History</span>
                    <span className="text-sm text-credit-primary">95/100</span>
                  </div>
                  <Progress value={95} className="h-2 bg-muted" indicatorClassName="bg-credit-primary" />
                </div>
                
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium">Identity Verification</span>
                    <span className="text-sm text-credit-primary">100/100</span>
                  </div>
                  <Progress value={100} className="h-2 bg-muted" indicatorClassName="bg-credit-primary" />
                </div>
                
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium">User Reviews</span>
                    <span className="text-sm text-credit-primary">85/100</span>
                  </div>
                  <Progress value={85} className="h-2 bg-muted" indicatorClassName="bg-credit-primary" />
                </div>
                
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium">Dispute Resolution</span>
                    <span className="text-sm text-credit-primary">90/100</span>
                  </div>
                  <Progress value={90} className="h-2 bg-muted" indicatorClassName="bg-credit-primary" />
                </div>
              </div>
              
              <div className="rounded-lg bg-primary p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-lg font-semibold">Overall Trust Score</span>
                  <span className="text-lg font-bold text-credit-primary">92/100</span>
                </div>
                <Progress value={92} className="h-3 bg-muted" indicatorClassName="bg-credit-primary" />
                <p className="mt-3 text-sm text-muted-foreground">
                  Excellent trust score! Users with scores above 90 have a 99.7% successful transaction rate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
