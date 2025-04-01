
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-br from-credit-primary/10 to-credit-vivid/10"></div>
      
      <div className="container relative z-10 mx-auto px-4 py-24">
        <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-12 shadow-lg">
          <div className="text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Ready to Start Saving or Earning?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join thousands of users already benefiting from CreditShare. 
              Whether you're looking to save money on purchases or earn by sharing your 
              credit card discounts, getting started takes just a minute.
            </p>
            
            <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
              <Button size="lg" className="credit-gradient" asChild>
                <Link to="/signup">Create Your Account</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/how-it-works">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
