'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, RefreshCw, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface EmptyStateProps {
  onReset?: () => void;
}

export default function EmptyState({ onReset }: EmptyStateProps) {
  const [resetting, setResetting] = useState(false);

  const handleReset = async () => {
    setResetting(true);
    try {
      const res = await fetch('/api/reset', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        if (onReset) {
          onReset();
        } else {
          window.location.reload();
        }
      }
    } catch (err) {
      console.error('Reset error:', err);
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-5 py-6 overflow-y-auto bg-[#FAFAFC]">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35, type: 'spring' }}
        className="text-center max-w-sm w-full space-y-4"
      >
        {}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FEF08A] border-2 border-black shadow-[3px_3px_0px_#121212]">
          <span className="text-3xl">★</span>
        </div>

        <div>
          <h2 className="text-2xl font-black tracking-tight text-black">
            You're all caught up!
          </h2>
          <p className="text-gray-600 text-xs mt-1 font-medium leading-relaxed">
            You've seen all profiles currently in your area. New people join Coy every day!
          </p>
        </div>

        {}
        <Card variant="lavender" className="p-4 text-left space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="text-base">💌</span>
            <p className="font-black text-black text-xs uppercase tracking-wider">
              Keep the magic going
            </p>
          </div>

          <div className="space-y-2 text-xs text-gray-700 font-medium">
            <div className="flex items-center gap-2 bg-white/90 p-2.5 rounded-xl border border-black/10">
              <Heart className="w-3.5 h-3.5 text-[#FF2A6D] flex-shrink-0 fill-[#FF2A6D]" />
              <span className="text-[11px]">Review mutual connections in <strong>Matches</strong></span>
            </div>
            <div className="flex items-center gap-2 bg-white/90 p-2.5 rounded-xl border border-black/10">
              <Users className="w-3.5 h-3.5 text-[#4F46E5] flex-shrink-0" />
              <span className="text-[11px]">Share your Coy invite link on Instagram</span>
            </div>
          </div>
        </Card>

        {}
        <div className="space-y-2 pt-1">
          <Button
            onClick={handleReset}
            disabled={resetting}
            className="w-full gap-2 py-3"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${resetting ? 'animate-spin' : ''}`} />
            <span>{resetting ? 'Resetting profiles...' : 'Reset Swipes (Demo Replay)'}</span>
          </Button>

          <Link href="/app/matches" className="block">
            <Button variant="secondary" className="w-full gap-2 py-2.5">
              <span>View Matches</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        <p className="text-[10px] font-bold text-gray-400">
          💡 Demo tip: 10 seeded profiles pre-liked you to trigger instant matches!
        </p>
      </motion.div>
    </div>
  );
}
