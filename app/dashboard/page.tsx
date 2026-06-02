'use client';

import React, { useEffect, useState } from 'react';
import { ProtectedRoute } from '@components/ProtectedRoute';
import { useAuthStore } from '@store/authStore';
import { Card } from '@components/ui/Card';
import { Button } from '@components/ui/Button';
import type { UserBot } from '@types/index';
import { formatDate } from '@utils/formatting';
import { Download, Trash2, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [userBots, setUserBots] = useState<UserBot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - Replace with actual Supabase/Firebase query
    const mockUserBots: UserBot[] = [
      {
        id: '1',
        userId: user?.id || '',
        botId: '1',
        bot: {
          id: '1',
          name: 'ModGuard Pro',
          description: 'Advanced moderation bot',
          detailedDescription: '',
          price: 9.99,
          currency: 'USD',
          imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&h=100&fit=crop',
          features: [],
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        purchaseDate: new Date(),
        status: 'active',
        inviteUrl: 'https://discord.com/api/oauth2/authorize?client_id=123456789',
      },
      {
        id: '2',
        userId: user?.id || '',
        botId: '2',
        bot: {
          id: '2',
          name: 'Music Vibes',
          description: 'High-quality music player',
          detailedDescription: '',
          price: 4.99,
          currency: 'USD',
          imageUrl: 'https://images.unsplash.com/photo-1516480315903-14ce5d60c687?w=100&h=100&fit=crop',
          features: [],
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        purchaseDate: new Date(),
        status: 'active',
        inviteUrl: 'https://discord.com/api/oauth2/authorize?client_id=987654321',
      },
    ];

    setTimeout(() => {
      setUserBots(mockUserBots);
      setLoading(false);
    }, 500);
  }, [user?.id]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-discord-dark to-discord-darkGray py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-white mb-2">My Dashboard</h1>
            <p className="text-gray-400">
              Welcome back, <span className="text-discord-blurple">{user?.username}</span>! Manage your purchased bots.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { label: 'Total Bots', value: userBots.length, icon: '🤖' },
              { label: 'Total Spent', value: `$${(userBots.length * 7.49).toFixed(2)}`, icon: '💰' },
              { label: 'Active Status', value: 'Premium', icon: '⭐' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <h3 className="text-gray-400 text-sm mb-1">{stat.label}</h3>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Bots List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Your Bots</h2>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-discord-blurple border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-gray-400">Loading your bots...</p>
                </div>
              </div>
            ) : userBots.length > 0 ? (
              <div className="space-y-4">
                {userBots.map((userBot, index) => (
                  <motion.div
                    key={userBot.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          {/* Bot Image */}
                          {userBot.bot?.imageUrl && (
                            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={userBot.bot.imageUrl}
                                alt={userBot.bot.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}

                          {/* Bot Info */}
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-white mb-1">
                              {userBot.bot?.name}
                            </h3>
                            <p className="text-gray-400 text-sm mb-2">
                              {userBot.bot?.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>
                                Purchased: {formatDate(userBot.purchaseDate)}
                              </span>
                              <span
                                className={`px-2 py-1 rounded ${
                                  userBot.status === 'active'
                                    ? 'bg-discord-green/20 text-discord-green'
                                    : 'bg-gray-500/20 text-gray-400'
                                }`}
                              >
                                {userBot.status.charAt(0).toUpperCase() + userBot.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 ml-4">
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => {
                              if (userBot.inviteUrl) {
                                window.open(userBot.inviteUrl, '_blank');
                              }
                            }}
                            title="Invite to Server"
                          >
                            <ExternalLink size={16} />
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            title="Download Docs"
                          >
                            <Download size={16} />
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            title="Remove Bot"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-white mb-2">No Bots Yet</h3>
                <p className="text-gray-400 mb-6">
                  Start shopping to add premium bots to your collection
                </p>
                <Button asChild>
                  <a href="/">Browse Bots</a>
                </Button>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
