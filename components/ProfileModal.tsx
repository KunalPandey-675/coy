'use client';

import { Profile } from '@/types';
import Image from 'next/image';
import { X, MapPin, Briefcase, Heart, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ProfileModalProps {
  profile: Profile | null;
  isOpen: boolean;
  onClose: () => void;
  onLike?: () => void;
  onPass?: () => void;
}

const BADGE_VARIANTS: ('lavender' | 'peach' | 'yellow' | 'mint' | 'pink')[] = [
  'lavender',
  'peach',
  'yellow',
  'mint',
  'pink',
];

export default function ProfileModal({
  profile,
  isOpen,
  onClose,
  onLike,
  onPass,
}: ProfileModalProps) {
  const [photoError, setPhotoError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [isOpen]);

  if (!profile) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          {}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-sm sm:max-w-md max-h-[85vh] bg-white rounded-[2.2rem] border-2 border-black shadow-[6px_6px_0px_#121212] overflow-hidden flex flex-col z-10"
          >
            {}
            <Button
              variant="secondary"
              size="icon-sm"
              onClick={onClose}
              className="absolute top-3.5 right-3.5 w-9 h-9 z-30"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-black stroke-[2.5]" />
            </Button>

            {}
            <div className="flex-1 overflow-y-auto">
              {}
              <div className="relative h-80 w-full bg-[#ECEBFE]">
                {!photoError && profile.photos?.[0] ? (
                  <Image
                    src={profile.photos[0]}
                    alt={profile.name}
                    fill
                    className="object-cover"
                    onError={() => setPhotoError(true)}
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-black text-4xl text-black">
                    {profile.name[0]}
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h2 className="text-2xl font-black tracking-tight drop-shadow">
                    {profile.name}, {profile.age}
                  </h2>
                </div>
              </div>

              {}
              <div className="p-4 sm:p-5 space-y-4">
                {}
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="lavender" className="gap-1 py-1 px-2.5">
                    <MapPin className="w-3 h-3" />
                    <span>{profile.cityOrCollege}</span>
                  </Badge>
                  {profile.occupation && (
                    <Badge variant="peach" className="gap-1 py-1 px-2.5">
                      <Briefcase className="w-3 h-3" />
                      <span>{profile.occupation}</span>
                    </Badge>
                  )}
                </div>

                {}
                <div>
                  <h3 className="text-[11px] font-black uppercase tracking-wider text-gray-500 mb-1">
                    About
                  </h3>
                  <div className="p-3.5 bg-[#F5F5FA] rounded-2xl border border-gray-200">
                    <p className="text-xs sm:text-sm font-medium text-gray-800 leading-relaxed">
                      {profile.bio}
                    </p>
                  </div>
                </div>

                {}
                <div>
                  <h3 className="text-[11px] font-black uppercase tracking-wider text-gray-500 mb-1.5">
                    Interests & Vibes
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.interests.map((interest, idx) => (
                      <Badge
                        key={idx}
                        variant={BADGE_VARIANTS[idx % BADGE_VARIANTS.length]}
                        className="text-xs py-1 px-2.5"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                {}
                <Card variant="yellow" className="p-3.5 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-black text-xs text-black uppercase tracking-wider">
                      Coy Privacy Promise
                    </p>
                    <p className="text-[11px] font-medium text-black/85 mt-0.5 leading-snug">
                      Your swipe is 100% anonymous. We tell them someone likes them, but never who — until they like you back!
                    </p>
                  </div>
                </Card>
              </div>
            </div>

            {}
            {(onLike || onPass) && (
              <div className="p-3.5 border-t-2 border-black bg-white flex items-center gap-3">
                {onPass && (
                  <Button
                    variant="secondary"
                    onClick={() => {
                      onPass();
                      onClose();
                    }}
                    className="flex-1 gap-1.5 text-xs py-2.5"
                  >
                    <X className="w-4 h-4 stroke-[2.5]" />
                    <span>Pass</span>
                  </Button>
                )}
                {onLike && (
                  <Button
                    onClick={() => {
                      onLike();
                      onClose();
                    }}
                    className="flex-1 gap-1.5 text-xs py-2.5"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>Crush / Like</span>
                  </Button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
