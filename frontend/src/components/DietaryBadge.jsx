import React from 'react';

export default function DietaryBadge({ type, className = '' }) {
  const normalized = (type || '').trim().toLowerCase();
  
  let pillClass = 'pill-veg';
  let label = type || 'Veg';

  if (normalized === 'non-veg' || normalized === 'nonveg') {
    pillClass = 'pill-non-veg';
    label = 'Non-Veg';
  } else if (normalized.includes('snack') || normalized === 'quick snack') {
    pillClass = 'pill-quick-snack';
    label = 'Quick Snack';
  } else {
    pillClass = 'pill-veg';
    label = 'Veg';
  }

  return (
    <span className={`dietary-pill ${pillClass} ${className}`}>
      {label}
    </span>
  );
}
