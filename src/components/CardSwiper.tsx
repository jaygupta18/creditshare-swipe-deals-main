
import React, { useState } from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface CardData {
  id: string;
  title: string;
  image: string;
  price: number;
  fee: number;
  discount: number;
  store: string;
}

interface CardSwiperProps {
  cards: CardData[];
  onAccept: (card: CardData) => void;
  onReject: (card: CardData) => void;
}

const CardSwiper: React.FC<CardSwiperProps> = ({ cards, onAccept, onReject }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const activeCard = cards[currentIndex];
  const isLastCard = currentIndex === cards.length - 1;

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      setDirection('right');
      controls.start({ x: 500, opacity: 0, transition: { duration: 0.5 } });
      setTimeout(() => {
        onAccept(activeCard);
        nextCard();
      }, 500);
    } else if (info.offset.x < -threshold) {
      setDirection('left');
      controls.start({ x: -500, opacity: 0, transition: { duration: 0.5 } });
      setTimeout(() => {
        onReject(activeCard);
        nextCard();
      }, 500);
    } else {
      controls.start({ x: 0, opacity: 1, transition: { duration: 0.5 } });
    }
  };

  const nextCard = () => {
    setDirection(null);
    if (!isLastCard) {
      setCurrentIndex(currentIndex + 1);
      controls.set({ x: 0, opacity: 1 });
    } else {
      // Handle end of cards
      console.log('No more cards');
    }
  };

  const handleAccept = () => {
    setDirection('right');
    controls.start({ x: 500, opacity: 0, transition: { duration: 0.5 } });
    setTimeout(() => {
      onAccept(activeCard);
      nextCard();
    }, 500);
  };

  const handleReject = () => {
    setDirection('left');
    controls.start({ x: -500, opacity: 0, transition: { duration: 0.5 } });
    setTimeout(() => {
      onReject(activeCard);
      nextCard();
    }, 500);
  };

  if (cards.length === 0 || isLastCard && direction !== null) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 p-8">
        <div className="text-center">
          <h3 className="mb-2 text-xl font-medium">No More Orders</h3>
          <p className="text-muted-foreground">Check back later for new orders to appear</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-[500px] items-center justify-center">
      <motion.div
        className="swipe-card"
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        onDragEnd={handleDragEnd}
        animate={controls}
        initial={{ x: 0, opacity: 1 }}
      >
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
          <div
            className="h-[45%] bg-cover bg-center"
            style={{ backgroundImage: `url(${activeCard.image})` }}
          />
          <div className="flex flex-1 flex-col p-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium">
                {activeCard.store}
              </span>
              <span className="text-sm font-medium text-green-600">
                {activeCard.discount}% OFF
              </span>
            </div>
            <h3 className="mb-2 line-clamp-1 text-xl font-semibold">{activeCard.title}</h3>
            
            <div className="mb-6 mt-auto space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Product Price</span>
                <span className="font-medium">${activeCard.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Service Fee</span>
                <span className="font-medium text-credit-primary">
                  +${activeCard.fee.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-2">
                <span className="font-medium">Total Payout</span>
                <span className="text-lg font-semibold">
                  ${(activeCard.price + activeCard.fee).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex justify-between space-x-4">
              <Button
                variant="outline"
                size="lg"
                className="flex-1 rounded-full border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600"
                onClick={handleReject}
              >
                <X className="mr-2 h-5 w-5" />
                Skip
              </Button>
              <Button
                size="lg"
                className="flex-1 rounded-full bg-green-500 text-white hover:bg-green-600"
                onClick={handleAccept}
              >
                <Check className="mr-2 h-5 w-5" />
                Accept
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Swipe Direction Indicators */}
      <div
        className={cn(
          "absolute left-12 top-1/2 -translate-y-1/2 rounded-full bg-red-500 p-6 text-white opacity-0 transition-opacity duration-300",
          direction === 'left' && 'opacity-80'
        )}
      >
        <X className="h-8 w-8" />
      </div>
      <div
        className={cn(
          "absolute right-12 top-1/2 -translate-y-1/2 rounded-full bg-green-500 p-6 text-white opacity-0 transition-opacity duration-300",
          direction === 'right' && 'opacity-80'
        )}
      >
        <Check className="h-8 w-8" />
      </div>
    </div>
  );
};

export default CardSwiper;
