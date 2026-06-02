'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BotCard } from '@components/BotCard';
import { useCartStore } from '@store/cartStore';
import { useRouter } from 'next/navigation';
import type { Bot } from '@types/index';

export default function Home() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem, items } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    // Mock bots data - Replace with actual API call
    const mockBots: Bot[] = [
      {
        id: '1',
        name: 'ModGuard Pro',
        description: 'Advanced moderation bot with AI spam detection',
        detailedDescription: 'ModGuard Pro offers comprehensive moderation tools including spam detection, auto-moderation, and user management.',
        price: 9.99,
        currency: 'USD',
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop',
        features: ['Auto-moderation', 'Spam Detection', 'User Logs', 'Custom Rules'],
        rating: 4.8,
        reviews: 125,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'Music Vibes',
        description: 'High-quality music player with Spotify integration',
        detailedDescription: 'Music Vibes brings high-quality music streaming to your Discord server with Spotify, YouTube, and more.',
        price: 4.99,
        currency: 'USD',
        imageUrl: 'https://images.unsplash.com/photo-1516480315903-14ce5d60c687?w=500&h=300&fit=crop',
        features: ['Spotify Integration', 'Queue Management', 'Playlists', 'Volume Control'],
        rating: 4.6,
        reviews: 89,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        name: 'GameTracker',
        description: 'Track gaming achievements and manage game tournaments',
        detailedDescription: 'GameTracker helps manage gaming communities with achievement tracking and tournament organization.',
        price: 7.99,
        currency: 'USD',
        imageUrl: 'https://images.unsplash.com/photo-1538481143235-f2b7e9b8b67a?w=500&h=300&fit=crop',
        features: ['Achievement Tracking', 'Tournament Mode', 'Leaderboards', 'Stats Analytics'],
        rating: 4.7,
        reviews: 102,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '4',
        name: 'RoleManager',
        description: 'Automated role management and member verification',
        detailedDescription: 'RoleManager automates role assignment, member verification, and access control for your server.',
        price: 5.99,
        currency: 'USD',
        imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
        features: ['Auto-Roles', 'Verification', 'Access Control', 'Role Management'],
        rating: 4.5,
        reviews: 76,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    setBots(mockBots);
    setLoading(false);
  }, []);

  const handlePurchase = (botId: string) => {
    const bot = bots.find((b) => b.id === botId);
    if (bot) {
      addItem(bot);
    }
  };

  const isInCart = (botId: string) => {
    return items.some((item) => item.botId === botId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-discord-dark via-discord-dark to-discord-darkGray">
      {/* Hero Section */}
      <motion.section
        className="pt-20 pb-32 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-discord-blurple to-blue-400 bg-clip-text text-transparent"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Premium Discord Bots
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Elevate your Discord server with carefully curated, feature-rich bots. 
            From moderation to entertainment, we have everything you need.
          </motion.p>
          <motion.button
            onClick={() => document.getElementById('bots')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-discord-blurple hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Bots
          </motion.button>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-discord-blurple rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        </div>
      </motion.section>

      {/* Bots Grid Section */}
      <section id="bots" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Featured Bots
          </motion.h2>

          {loading ? (
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-discord-blurple border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400">Loading bots...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {bots.map((bot, index) => (
                <motion.div
                  key={bot.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <BotCard
                    bot={bot}
                    onPurchase={handlePurchase}
                    isInCart={isInCart(bot.id)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="py-20 px-4 bg-discord-mediumGray"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Power Up Your Server?</h2>
          <p className="text-gray-300 mb-8">
            Start building the perfect Discord server today with our premium bot selection.
          </p>
          <motion.button
            onClick={() => router.push('/auth/register')}
            className="px-8 py-4 bg-discord-blurple hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Now
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
}
