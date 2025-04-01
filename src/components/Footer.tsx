
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-accent/30 pt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-muted-foreground">
              Unlock credit card discounts without a credit card. A secure marketplace connecting buyers and credit card holders.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold">Buyers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/buyer" className="text-muted-foreground hover:text-credit-primary">
                  Place an Order
                </Link>
              </li>
              <li>
                <Link to="/buyer/dashboard" className="text-muted-foreground hover:text-credit-primary">
                  Buyer Dashboard
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-credit-primary">
                  How it Works
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold">Card Holders</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/card-holder" className="text-muted-foreground hover:text-credit-primary">
                  Browse Orders
                </Link>
              </li>
              <li>
                <Link to="/card-holder/dashboard" className="text-muted-foreground hover:text-credit-primary">
                  Card Holder Dashboard
                </Link>
              </li>
              <li>
                <Link to="/trust-score" className="text-muted-foreground hover:text-credit-primary">
                  Trust Score System
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-credit-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-credit-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-credit-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-credit-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="my-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} CreditShare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
