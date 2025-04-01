
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { HomeIcon } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-accent text-credit-primary">
        <span className="text-8xl font-bold">?</span>
      </div>
      <h1 className="mb-4 text-4xl font-bold">Page Not Found</h1>
      <p className="mb-8 max-w-md text-lg text-muted-foreground">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <Button asChild>
        <Link to="/" className="flex items-center">
          <HomeIcon className="mr-2 h-5 w-5" />
          Return to Home
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
