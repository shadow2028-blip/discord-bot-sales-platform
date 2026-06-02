'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && <div className="absolute left-3 top-3 text-gray-400">{icon}</div>}
          <input
            ref={ref}
            className={`
              w-full px-4 py-2 bg-discord-mediumGray border border-discord-darkGray
              rounded-lg text-white placeholder-gray-500 transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-discord-blurple focus:border-transparent
              ${icon ? 'pl-10' : ''}
              ${error ? 'border-discord-red focus:ring-discord-red' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <p className="text-discord-red text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
