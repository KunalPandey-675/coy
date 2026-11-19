'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  UserPlus, 
  EyeOff, 
  Heart, 
  Share2, 
  Plus, 
  Play, 
  Gift, 
  ChevronDown, 
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const [showShareToast, setShowShareToast] = useState(false);
  const [showHowItWorksModal, setShowHowItWorksModal] = useState(false);
  const [expandedFreeSlot, setExpandedFreeSlot] = useState(false);

  const handleShareStory = () => {
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
      {}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {}
        <div className="lg:col-span-7 space-y-6">
          
          {}
          <Card className="overflow-hidden">
            {}
            <div className="relative h-28 bg-[#ECEBFE] border-b-2 border-black flex items-center justify-center overflow-hidden">
              <div 
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage: 'radial-gradient(#4F46E5 1.5px, transparent 1.5px)',
                  backgroundSize: '14px 14px',
                }}
              />
              <div className="relative flex items-center -space-x-2 z-10">
                <div className="w-8 h-8 rounded-full bg-[#FF2A6D] border-2 border-white shadow-sm flex items-center justify-center text-white text-xs font-black">
                  ♥
                </div>
                <div className="w-8 h-8 rounded-full bg-[#FF2A6D] border-2 border-white shadow-sm flex items-center justify-center text-white text-xs font-black">
                  💖
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight leading-snug">
                Find out if your crush likes you back
              </h2>

              <div className="space-y-3 pt-1">
                {}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#ECEBFE] text-[#4F46E5] flex items-center justify-center flex-shrink-0 border border-black/10">
                    <UserPlus className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-gray-800">
                    Add someone you like, by number or email
                  </p>
                </div>

                {}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FFEADB] text-[#C2410C] flex items-center justify-center flex-shrink-0 border border-black/10">
                    <EyeOff className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-gray-800">
                    We tell them someone likes them, not who
                  </p>
                </div>

                {}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FFE4E8] text-[#FF2A6D] flex items-center justify-center flex-shrink-0 border border-black/10">
                    <Heart className="w-4 h-4 fill-[#FF2A6D] stroke-[2.5]" />
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-gray-800">
                    If they add you back, it's a match
                  </p>
                </div>
              </div>

              <Link href="/app/discover" className="block pt-2">
                <Button className="w-full py-3.5 text-sm sm:text-base font-black">
                  Add your crushes
                </Button>
              </Link>
            </div>
          </Card>

          {}
          <Card
            onClick={() => setShowHowItWorksModal(true)}
            className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50"
          >
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-10 flex-shrink-0">
                <div className="absolute inset-0 bg-[#FFEADB] rounded-lg border border-black rotate-[-8deg]" />
                <div className="absolute inset-0 bg-[#FFE55B] rounded-lg border border-black rotate-[-2deg]" />
                <div className="absolute inset-0 bg-[#FF2A6D] rounded-lg border border-black rotate-[6deg] flex items-center justify-center text-white text-xs">
                  ❤️
                </div>
              </div>
              <div>
                <h4 className="font-black text-sm sm:text-base text-black">How Coy works</h4>
                <p className="text-xs text-gray-500 font-medium">
                  Follow one crush from add to match, in 6 quick taps.
                </p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#FF2A6D] text-white border-2 border-black flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_#121212]">
              <Play className="w-4 h-4 fill-white translate-x-0.5" />
            </div>
          </Card>

          {}
          <Card variant="lavender" className="overflow-hidden">
            <button
              onClick={() => setExpandedFreeSlot(!expandedFreeSlot)}
              className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white border border-black flex items-center justify-center flex-shrink-0">
                  <Gift className="w-4 h-4 text-black" />
                </div>
                <div>
                  <p className="font-black text-xs sm:text-sm text-black">Get a slot free</p>
                  <p className="text-xs font-bold text-gray-600">○○○ 0 of 3 joined</p>
                </div>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-black transition-transform ${
                  expandedFreeSlot ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expandedFreeSlot && (
              <div className="px-4 pb-4 pt-1 border-t border-black/10 text-xs text-gray-700 space-y-2">
                <p className="text-xs font-medium leading-relaxed">
                  Invite 3 friends using your referral link. When they join Coy, you unlock +1 permanent crush slot for free!
                </p>
                <Button size="sm" onClick={handleShareStory} className="text-xs py-1.5">
                  Copy referral link
                </Button>
              </div>
            )}
          </Card>
        </div>

        {}
        <div className="lg:col-span-5 space-y-6">
          
          {}
          <Card variant="yellow" className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-9 bg-white rounded-xl border-2 border-black flex items-center justify-center shadow-[1.5px_1.5px_0px_#121212]">
                <span className="text-lg">💌</span>
              </div>
              <h3 className="text-xl font-black text-black tracking-tight leading-tight">
                Someone has a crush on you
              </h3>
            </div>

            {}
            <div className="border-b-2 border-dashed border-black/25 my-3" />

            <div className="flex items-center justify-between gap-3">
              <p className="text-xs sm:text-sm font-bold text-black/90 leading-snug">
                Share it on your story to ask your crush to reveal themselves.
              </p>
              <button
                onClick={handleShareStory}
                className="w-11 h-11 rounded-full bg-[#FF2A6D] text-white border-2 border-black shadow-[2px_2px_0px_#121212] flex items-center justify-center flex-shrink-0 coy-btn cursor-pointer"
                aria-label="Share story"
              >
                <Share2 className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </Card>

          {}
          <AnimatePresence>
            {showShareToast && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="p-3 bg-black text-white text-xs font-bold rounded-2xl border-2 border-black text-center"
              >
                🔗 Story link copied to clipboard! Share on Instagram / WhatsApp.
              </motion.div>
            )}
          </AnimatePresence>

          {}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-lg font-black text-black tracking-tight">
                Your crushes
              </h3>
              <Badge variant="outline" className="text-xs px-2.5 py-0.5">
                0/3
              </Badge>
            </div>

            {}
            <Link
              href="/app/discover"
              className="bg-white rounded-2xl p-3.5 flex items-center gap-3 border-2 border-black shadow-[2px_2px_0px_#121212] hover:bg-gray-50 transition-all block cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-[#FF2A6D] text-white flex items-center justify-center border-2 border-black shadow-[1.5px_1.5px_0px_#121212] group-hover:scale-105 transition-transform flex-shrink-0">
                <Plus className="w-5 h-5 stroke-[3]" />
              </div>
              <div>
                <p className="font-black text-sm text-black">
                  Add a crush
                </p>
                <p className="text-xs text-gray-500 font-medium">
                  Tap to discover people or add secretly
                </p>
              </div>
            </Link>

            {}
            <div className="rounded-2xl p-3.5 flex items-center gap-3 border-2 border-dashed border-gray-300 text-gray-400">
              <div className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center flex-shrink-0">
                <Plus className="w-4 h-4 text-gray-400 stroke-[2]" />
              </div>
              <p className="font-bold text-sm text-gray-400">
                Free slot
              </p>
            </div>

            {}
            <div className="rounded-2xl p-3.5 flex items-center gap-3 border-2 border-dashed border-gray-300 text-gray-400">
              <div className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center flex-shrink-0">
                <Plus className="w-4 h-4 text-gray-400 stroke-[2]" />
              </div>
              <p className="font-bold text-sm text-gray-400">
                Free slot
              </p>
            </div>

            {}
            <div className="bg-white rounded-2xl p-3.5 flex items-center gap-3 border-2 border-black shadow-[2px_2px_0px_#121212]">
              <div className="w-10 h-10 rounded-full bg-[#FFE600] text-black border-2 border-black flex items-center justify-center flex-shrink-0">
                <Plus className="w-5 h-5 stroke-[3]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-black text-sm text-black">Get more slots</p>
                <p className="text-xs text-gray-500">Add more people to your list</p>
              </div>
            </div>

            <p className="text-[11px] font-medium text-gray-400 px-1 pt-0.5">
              They get an anonymous heads-up right away. Never who.
            </p>
          </div>
        </div>
      </div>

      {}
      <AnimatePresence>
        {showHowItWorksModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <Card className="max-w-sm w-full p-5 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="font-black text-lg text-black">How Coy Works</span>
                <button
                  onClick={() => setShowHowItWorksModal(false)}
                  className="w-8 h-8 rounded-full border border-black flex items-center justify-center text-black cursor-pointer hover:bg-gray-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-[#ECEBFE] rounded-2xl border border-black/10">
                  <p className="font-black text-black">1. Add someone you like</p>
                  <p className="text-gray-600 text-xs mt-0.5">Add by phone, email, or swipe them in Discover.</p>
                </div>
                <div className="p-3 bg-[#FFEADB] rounded-2xl border border-black/10">
                  <p className="font-black text-black">2. Anonymous heads-up</p>
                  <p className="text-gray-600 text-xs mt-0.5">They get a notification someone likes them.</p>
                </div>
                <div className="p-3 bg-[#FFE4E8] rounded-2xl border border-black/10">
                  <p className="font-black text-black">3. Mutual match</p>
                  <p className="text-gray-600 text-xs mt-0.5">If they also add you, Coy reveals the match to both!</p>
                </div>
              </div>

              <Button
                onClick={() => setShowHowItWorksModal(false)}
                className="w-full text-xs py-2.5"
              >
                Got it!
              </Button>
            </Card>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
