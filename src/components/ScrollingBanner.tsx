import React from 'react';
import { cn } from '@/lib/utils';
import './ScrollingBanner.css';
import { Sparkles } from 'lucide-react';

interface ScrollingBannerProps {
  text?: string;
  className?: string;
}

const ScrollingBanner: React.FC<ScrollingBannerProps> = ({
  text = "WELCOME TO INDCRIC! - TEST YOUR CRICKET KNOWLEDGE AND WIN REWARDS! - ARE YOU READY? -",
  className,
}) => {
  return (
    <div className={cn("scrolling-banner-container", className)}>
      <div className="scrolling-banner-content">
        <Sparkles className="h-6 w-6 text-yellow-400 inline-block mr-4 flex-shrink-0" />
        <span className="scrolling-text">{text}</span>
        <Sparkles className="h-6 w-6 text-yellow-400 inline-block ml-4 flex-shrink-0" />
        <span className="scrolling-text" aria-hidden="true">{text}</span>
      </div>
    </div>
  );
};

export default ScrollingBanner;
