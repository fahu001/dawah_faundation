'use client';

import React from 'react';

export interface CardProps {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

export default function Card({
  className = '',
  children,
  as: Component = 'div',
}: CardProps) {
  return (
    <Component
      className={`bg-surface rounded-xl shadow-sm overflow-hidden border border-border ${className}`.trim()}
    >
      {children}
    </Component>
  );
}
