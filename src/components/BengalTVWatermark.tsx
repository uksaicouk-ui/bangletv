import React from 'react';
import { DainikJahanLogo } from './DainikJahanLogo';

interface BengalTVWatermarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showText?: boolean;
}

export const BengalTVWatermark: React.FC<BengalTVWatermarkProps> = ({
  className = '',
  size = 'md',
  showText = false,
}) => {
  const mapSize: { [key: string]: 'xs' | 'sm' | 'md' | 'lg' | 'xl' } = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    hero: 'xl',
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <DainikJahanLogo size={mapSize[size] || 'md'} showSubtitle={showText} />
    </div>
  );
};
