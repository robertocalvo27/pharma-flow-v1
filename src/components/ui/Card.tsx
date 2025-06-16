import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = true,
  hover = false
}) => {
  const baseClasses = 'bg-white border border-gray-200 rounded-xl shadow-sm';
  const classes = `
    ${baseClasses}
    ${padding ? 'p-6' : ''}
    ${hover ? 'hover:shadow-md transition-shadow duration-200' : ''}
    ${className}
  `.trim();
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
};