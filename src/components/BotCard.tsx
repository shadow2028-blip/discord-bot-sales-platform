'use client';

import React from 'react';
import Image from 'next/image';
import { Card } from '@components/ui/Card';
import { Button } from '@components/ui/Button';
import type { BotCardProps } from '@types/index';
import { formatPrice } from '@utils/formatting';
import { Star, Check } from 'lucide-react';

export const BotCard: React.FC<BotCardProps> = ({
  bot,
  onPurchase,
  isInCart = false,
}) => {
  const handlePurchaseClick = () => {
    onPurchase(bot.id);
  };

  return (
    <Card hoverable className="overflow-hidden">
      {/* Bot Image */}
      <div className="relative w-full h-48 bg-discord-mediumGray">
        <Image
          src={bot.imageUrl}
          alt={bot.name}
          fill
          className="object-cover"
          priority={false}
        />
      </div>

      {/* Bot Info */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">
          {bot.name}
        </h3>

        {/* Rating */}
        {bot.rating && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < Math.floor(bot.rating || 0)
                      ? 'fill-discord-yellow text-discord-yellow'
                      : 'text-gray-500'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400">
              {bot.rating.toFixed(1)} ({bot.reviews || 0})
            </span>
          </div>
        )}

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {bot.description}
        </p>

        {/* Features */}
        {bot.features && bot.features.length > 0 && (
          <div className="mb-4 space-y-1">
            {bot.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-xs text-gray-400">
                <Check size={12} className="text-discord-green" />
                {feature}
              </div>
            ))}
          </div>
        )}

        {/* Price and Button */}
        <div className="flex items-center justify-between pt-4 border-t border-discord-mediumGray">
          <span className="text-xl font-bold text-discord-blurple">
            {formatPrice(bot.price, bot.currency)}
          </span>
          <Button
            size="sm"
            variant={isInCart ? 'success' : 'primary'}
            onClick={handlePurchaseClick}
          >
            {isInCart ? '✓ In Cart' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
