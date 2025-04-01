
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: "How does CreditShare ensure transaction security?",
    answer: "CreditShare uses escrow payments, where funds are held securely until the order is confirmed delivered. We also implement AI-driven fraud detection, user verification, and secure payment gateways to protect all parties."
  },
  {
    question: "What fees does CreditShare charge?",
    answer: "Buyers pay a small platform fee (typically 2-5% of the order value) in addition to the service fee they offer to card holders. Card holders receive 100% of the service fee they charge, with no platform commission on that amount."
  },
  {
    question: "How do I know I can trust a card holder?",
    answer: "All card holders go through identity verification and their transaction history is visible through our trust score system. You can see reviews from previous buyers and their reliability metrics before proceeding."
  },
  {
    question: "What happens if I don't receive my order?",
    answer: "Our escrow system holds payment until you confirm receipt. If you don't receive your order or it doesn't match the description, you can raise a dispute within 7 days and our resolution team will investigate."
  },
  {
    question: "How do card holders profit from using the platform?",
    answer: "Card holders earn the service fee offered by buyers on each transaction. They can also accumulate rewards points from their credit cards while helping others save money."
  },
  {
    question: "Are there any restrictions on what can be ordered?",
    answer: "Yes, certain categories like alcohol, tobacco, pharmaceuticals, weapons, and illegal items are prohibited. All orders must comply with local laws and regulations."
  }
];

const FAQSection = () => {
  return (
    <section className="bg-accent/30 py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            Find answers to the most common questions about using CreditShare
            for both buyers and credit card holders.
          </p>
        </div>
        
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
