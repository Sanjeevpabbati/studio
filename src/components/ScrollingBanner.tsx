import React from 'react';
import { cn } from '@/lib/utils';
import './ScrollingBanner.css';
import { Sparkles } from 'lucide-react';

interface ScrollingBannerProps {
  text?: string;
  className?: string;
}

const ScrollingBanner: React.FC<ScrollingBannerProps> = ({
  text = "WIN ₹100 IN 100 SECONDS! - ARE YOU UP FOR THE CHALLENGE? - TEST YOUR KNOWLEDGE NOW! -",
  className,
}) => {
  return (
    <div className={cn("scrolling-banner-container", className)}>
      <div className="scrolling-banner-content">
        <span className="scrolling-text">
            <Sparkles className="h-6 w-6 text-yellow-400 inline-block mx-4 flex-shrink-0" />
            {text}
        </span>
        <span className="scrolling-text" aria-hidden="true">
            <Sparkles className="h-6 w-6 text-yellow-400 inline-block mx-4 flex-shrink-0" />
            {text}
        </span>
      </div>
    </div>
  );
};

export default ScrollingBanner;
