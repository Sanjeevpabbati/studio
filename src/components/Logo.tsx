import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps extends React.SVGProps<SVGSVGElement> {}

const Logo: React.FC<LogoProps> = ({ className, ...props }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      {...props}
    >
      <g fill="currentColor">
        <path d="M50,0A50,50,0,1,0,50,100A50,50,0,0,0,50,0ZM50,92A42,42,0,1,1,50,8,42,42,0,0,1,50,92Z" />
        <path d="M50,15.5A34.5,34.5,0,0,0,26,74.7,4,4,0,1,0,32,71,26.5,26.5,0,1,1,50,82.5a4,4,0,0,0,0,8A34.5,34.5,0,0,0,50,15.5Z" />
        <circle cx="50" cy="34" r="10" />
      </g>
    </svg>
  );
};

export default Logo;
