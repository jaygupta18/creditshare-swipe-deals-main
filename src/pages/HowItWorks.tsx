
import React from 'react';
import Navbar from '@/components/Navbar';
import HowItWorksSection from '@/components/HowItWorks';
import Footer from '@/components/Footer';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-10">
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="mb-6 text-4xl font-bold hero-text">How CreditShare Works</h1>
          <p className="mx-auto mb-12 max-w-3xl text-lg text-muted-foreground">
            Our platform connects buyers with credit card holders in a secure, 
            transparent way. Learn about our process from start to finish.
          </p>
        </div>
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
