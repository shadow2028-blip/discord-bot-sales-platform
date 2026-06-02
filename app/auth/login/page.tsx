'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Mock login - Replace with actual Supabase/Firebase auth
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Store token in cookies (in real app, handle via auth service)
      console.log('Login successful:', formData);
      router.push('/dashboard');
    } catch (error: any) {
      setErrors({
        form: error.message || 'Login failed. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-discord-dark to-discord-darkGray flex items-center justify-center px-4 py-20">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Card */}
        <div className="bg-discord-mediumGray rounded-lg border border-discord-darkGray p-8 shadow-xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to your BotHub account</p>
          </div>

          {/* Form Error */}
          {errors.form && (
            <div className="mb-6 p-4 bg-discord-red/10 border border-discord-red rounded-lg">
              <p className="text-discord-red text-sm">{errors.form}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="you@example.com"
              icon={<Mail size={18} />}
              disabled={isLoading}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="••••••••"
              icon={<Lock size={18} />}
              disabled={isLoading}
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 bg-discord-darkGray border border-discord-darkGray rounded cursor-pointer"
                />
                <span className="text-gray-400">Remember me</span>
              </label>
              <Link href="#" className="text-discord-blurple hover:text-blue-400 transition">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full flex items-center justify-center gap-2"
            >
              Sign In <ArrowRight size={18} />
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-discord-darkGray" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-discord-mediumGray text-gray-500">Or</span>
            </div>
          </div>

          {/* Social Login (Placeholder) */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              disabled={isLoading}
            >
              Sign in with Discord
            </Button>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-discord-blurple hover:text-blue-400 transition font-semibold">
              Create one
            </Link>
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-discord-blurple rounded-full mix-blend-multiply filter blur-3xl opacity-5" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5" />
        </div>
      </motion.div>
    </div>
  );
}
