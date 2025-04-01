
import React from 'react';
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Logo = ({ className, size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl"
  };

  return (
    <div className={cn("flex items-center font-bold", sizeClasses[size], className)}>
      <span className="hero-text">Credit</span>
      <span className="text-foreground">Share</span>
    </div>
  );
};

export default Logo;
