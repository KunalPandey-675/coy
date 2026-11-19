'use client';

import { Profile } from '@/types';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface MatchModalProps {
  isOpen: boolean;
  matchedProfile: Profile | null;
  icebreakers?: string[];
  onClose: () => void;
}

export default function MatchModal({ isOpen, matchedProfile, icebreakers = [], onClose }: MatchModalProps) {
  const router = useRouter();
  const [selectedIcebreaker, setSelectedIcebreaker] = useState<string | null>(null);

  if (!isOpen || !matchedProfile) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
          onClick={onClose}
        />

        {}
        <motion.div
          initial={{ scale: 0.7, opacity: 0, rotate: -4 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.8, opacity: 0, rotate: 4 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="relative w-full max-w-sm bg-[#FF2A6D] text-white rounded-[2.5rem] border-[3px] border-black shadow-[8px_8px_0px_#121212] overflow-hidden p-6 z-10 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          {}
          <div className="absolute top-4 left-4 text-2xl select-none">💖</div>
          <div className="absolute top-4 right-4 text-2xl select-none">💖</div>

          {}
          <div className="flex items-center justify-center gap-1 my-3">
            {}
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border-[3px] border-black bg-white text-black font-black text-xl flex items-center justify-center shadow-[3px_3px_0px_#121212] overflow-hidden">
              <span className="text-[#FF2A6D]">You</span>
            </div>

            {}
            <div className="w-9 h-9 rounded-full bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#121212] z-10 -mx-3">
              <Heart className="w-4 h-4 text-[#FF2A6D] fill-[#FF2A6D]" />
            </div>

            {}
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border-[3px] border-black bg-[#FFEADB] shadow-[3px_3px_0px_#121212] overflow-hidden relative">
              {matchedProfile.photos?.[0] ? (
                <Image
                  src={matchedProfile.photos[0]}
                  alt={matchedProfile.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-black text-2xl text-black">
                  {matchedProfile.name[0]}
                </div>
              )}
            </div>
          </div>

          {}
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2 drop-shadow-[2px_2px_0px_#000]">
            It's a match!
          </h2>

          {}
          <div className="bg-black/20 rounded-2xl p-3 mb-3 border border-white/20">
            <p className="text-white text-xs sm:text-sm font-semibold leading-snug">
              We told <span className="font-black underline">{matchedProfile.name}</span> someone liked them. Now you both know who!
            </p>
          </div>

          {}
          {icebreakers && icebreakers.length > 0 && (
            <div className="mb-4">
              <p className="text-[10px] font-bold text-white/80 mb-2">Start the conversation:</p>
              <div className="space-y-2">
                {icebreakers.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedIcebreaker(prompt)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      selectedIcebreaker === prompt
                        ? 'bg-white text-[#FF2A6D] border-2 border-black shadow-[2px_2px_0px_#121212]'
                        : 'bg-black/20 text-white border border-white/20 hover:bg-black/30'
                    }`}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {}
          <div className="space-y-2.5">
            <Button
              variant="secondary"
              onClick={() => {
                onClose();
                router.push('/app/matches');
              }}
              className="w-full gap-2 py-3 text-xs sm:text-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#FF2A6D]" />
              <span>Say Hi on WhatsApp</span>
            </Button>

            <Button
              variant="yellow"
              onClick={onClose}
              className="w-full gap-2 py-3 text-xs sm:text-sm"
            >
              <span>Keep Swiping</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <p className="mt-4 text-[10px] font-bold text-white/80">
            Added to your Matches tab
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
