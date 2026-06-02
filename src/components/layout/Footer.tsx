'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-discord-dark border-t border-discord-mediumGray mt-20 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-discord-blurple mb-4">BotHub</h3>
            <p className="text-gray-400 text-sm">
              Premium Discord bots for every need. Elevate your server experience.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/" className="hover:text-discord-blurple transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#bots" className="hover:text-discord-blurple transition">
                  Browse Bots
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-discord-blurple transition">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-discord-blurple transition">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-discord-blurple transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-discord-blurple transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-discord-blurple transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-discord-blurple transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-discord-mediumGray pt-8">
          <p className="text-gray-400 text-sm text-center">
            © {currentYear} BotHub. All rights reserved. | Made with ❤️ for Discord
            community
          </p>
        </div>
      </div>
    </footer>
  );
};
