
import React from 'react';
import { CreditCard, Package, ShoppingBag, Wallet } from 'lucide-react';

const steps = [
  {
    icon: ShoppingBag,
    title: 'Place an Order',
    description: 'Browse products online, find one with a credit card discount, and place an order on CreditShare.'
  },
  {
    icon: CreditCard,
    title: 'Card Holder Accepts',
    description: 'A credit card holder browses and accepts your order, purchasing the item with their card discount.'
  },
  {
    icon: Package,
    title: 'Receive Your Product',
    description: 'The card holder ships the product directly to your address. Track your order in real-time.'
  },
  {
    icon: Wallet,
    title: 'Payment Released',
    description: 'Once delivery is confirmed, payment is released to the card holder including their service fee.'
  }
];

const HowItWorks = () => {
  return (
    <section className="bg-primary py-24" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">How CreditShare Works</h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            Our platform connects buyers with credit card holders in a secure, transparent way.
            Here's how the process works from start to finish.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-12 hidden h-[2px] w-full translate-x-1/2 bg-gradient-to-r from-credit-primary to-transparent lg:block"></div>
              )}
              
              <div className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:shadow-md">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent text-credit-primary">
                  <step.icon className="h-10 w-10" />
                </div>
                <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                
                <div className="mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-credit-primary text-white">
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
