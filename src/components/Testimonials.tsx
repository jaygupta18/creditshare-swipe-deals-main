
import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Buyer',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    content: 'CreditShare helped me save over ₹15,000 on my new smartphone purchase. The process was smooth and the card holder was very professional.',
    rating: 5
  },
  {
    name: 'Rajesh Kumar',
    role: 'Card Holder',
    avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
    content: 'I\'ve earned an extra ₹35,000 in the last two months just by helping buyers with my premium credit card discounts. Great passive income!',
    rating: 5
  },
  {
    name: 'Ananya Patel',
    role: 'Buyer',
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    content: 'As a college student without a credit card, this platform is a lifesaver. I saved 15% on my laptop purchase during a flash sale.',
    rating: 4
  },
  {
    name: 'Vikram Singh',
    role: 'Card Holder',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    content: 'The platform is intuitive and the swiping interface makes accepting orders fun. I love the trust score system - it helps build confidence.',
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">What Our Users Say</h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            Don't just take our word for it. Hear from the buyers and card holders
            who use CreditShare every day.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="mb-4 flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="mr-4 h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <div className="flex items-center">
                    <span className="mr-2 text-sm text-credit-primary">{testimonial.role}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < testimonial.rating ? 'fill-credit-primary text-credit-primary' : 'fill-muted text-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
