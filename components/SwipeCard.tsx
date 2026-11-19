'use client';

import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Profile } from '@/types';
import Image from 'next/image';
import { MapPin, Briefcase, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SwipeCardProps {
  profile: Profile & { sharedInterests?: number };
  onSwipe: (direction: 'left' | 'right') => void;
  onInfoClick: () => void;
  isTop?: boolean;
}

const BADGE_VARIANTS: ('lavender' | 'peach' | 'yellow' | 'mint' | 'pink')[] = [
  'lavender',
  'peach',
  'yellow',
  'mint',
  'pink',
];

export default function SwipeCard({
  profile,
  onSwipe,
  onInfoClick,
  isTop = true,
}: SwipeCardProps) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-22, 22]);
  const opacity = useTransform(x, [-240, -120, 0, 120, 240], [0, 1, 1, 1, 0]);

  
  const likeOpacity = useTransform(x, [15, 90], [0, 1]);
  const nopeOpacity = useTransform(x, [-15, -90], [0, 1]);

  const handleDragEnd = (
    _event: unknown,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const threshold = 90;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (offset > threshold || velocity > 450) {
      onSwipe('right');
    } else if (offset < -threshold || velocity < -450) {
      onSwipe('left');
    }
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photoIndex < profile.photos.length - 1) {
      setPhotoIndex((prev) => prev + 1);
    }
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photoIndex > 0) {
      setPhotoIndex((prev) => prev - 1);
    }
  };

  const currentPhoto = profile.photos[photoIndex] || profile.photos[0];

  return (
    <motion.div
      className={`absolute inset-0 select-none ${isTop ? 'cursor-grab active:cursor-grabbing z-20' : 'pointer-events-none z-10'
        }`}
      style={{
        x,
        rotate: isTop ? rotate : 0,
        opacity: isTop ? 1 : 0.95,
        scale: isTop ? 1 : 0.95,
        y: isTop ? 0 : 12,
      }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.65}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: isTop ? 1.01 : 0.95 }}
    >
      <div className="w-full h-full bg-white rounded-[2.2rem] border-2 border-black shadow-[4px_4px_0px_#121212] overflow-hidden flex flex-col relative">
        {}
        <div className="relative h-[320px] w-full bg-[#ECEBFE] flex-shrink-0 overflow-hidden">
          {!imgError && currentPhoto ? (
            <Image
              src={currentPhoto}
              alt={profile.name}
              fill
              className="object-cover"
              priority={isTop}
              onError={() => setImgError(true)}
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#FFE4E8] text-black">
              <span className="text-6xl mb-2">✨</span>
              <p className="font-black text-xl">{profile.name}</p>
              <p className="text-xs text-gray-600 font-bold">{profile.cityOrCollege}</p>
            </div>
          )}

          {}
          {profile.photos.length > 1 && (
            <div className="absolute top-3 inset-x-3 flex gap-1.5 z-20">
              {profile.photos.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-200 border border-black/20 ${i === photoIndex ? 'bg-white shadow' : 'bg-black/35 backdrop-blur-sm'
                    }`}
                />
              ))}
            </div>
          )}

          {}
          {profile.photos.length > 1 && isTop && (
            <div className="absolute inset-0 flex z-10">
              <div className="w-1/2 h-full cursor-pointer" onClick={handlePrevPhoto} />
              <div className="w-1/2 h-full cursor-pointer" onClick={handleNextPhoto} />
            </div>
          )}

          {}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

          {}
          <motion.div
            style={{ opacity: likeOpacity }}
            className="absolute top-8 left-5 -rotate-12 pointer-events-none z-30"
          >
            <div className="px-5 py-2 bg-emerald-500 border-2 border-black rounded-2xl shadow-[3px_3px_0px_#121212]">
              <span className="text-3xl font-black text-white tracking-wider">
                LIKE ❤️
              </span>
            </div>
          </motion.div>

          {}
          <motion.div
            style={{ opacity: nopeOpacity }}
            className="absolute top-8 right-5 rotate-12 pointer-events-none z-30"
          >
            <div className="px-5 py-2 bg-[#FF2A6D] border-2 border-black rounded-2xl shadow-[3px_3px_0px_#121212]">
              <span className="text-3xl font-black text-white tracking-wider">
                PASS ✕
              </span>
            </div>
          </motion.div>

          {}
          {isTop && (
            <Button
              variant="secondary"
              size="icon-sm"
              onClick={(e) => {
                e.stopPropagation();
                onInfoClick();
              }}
              className="absolute bottom-3 right-3 w-9 h-9 z-20"
              aria-label="View details"
            >
              <Info className="w-4 h-4 text-black stroke-[2.5]" />
            </Button>
          )}

          {}
          {isTop && profile.sharedInterests && profile.sharedInterests > 0 && (
            <div
              className={`absolute ${profile.photos.length > 1 ? 'top-7' : 'top-3'
                } left-3 px-3 py-1.5 bg-green-500 border-2 border-black rounded-xl shadow-[2px_2px_0px_#121212] z-20 pointer-events-none`}
            >
              <span className="text-xs font-black text-white">
                ✨ {profile.sharedInterests} interest{profile.sharedInterests !== 1 ? 's' : ''} in common
              </span>
            </div>
          )}

          {}
          {profile.photos.length > 1 && (
            <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded-full text-[10px] font-black text-white border border-white/20 z-20">
              {photoIndex + 1}/{profile.photos.length}
            </div>
          )}
        </div>

        {}
        <div className="flex-1 p-4 flex flex-col justify-between bg-white overflow-hidden">
          <div>
            {}
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-baseline gap-2 min-w-0">
                <h3 className="text-2xl font-black text-black tracking-tight truncate">
                  {profile.name}, {profile.age}
                </h3>
              </div>
              <Badge variant="peach" className="flex-shrink-0 text-[10px]">
                Crush Feed
              </Badge>
            </div>

            {}
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ECEBFE] text-[#4F46E5] border border-black/10">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span className="truncate max-w-[190px]">{profile.cityOrCollege}</span>
              </div>
              {profile.occupation && (
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-700 border border-black/10">
                  <Briefcase className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate max-w-[130px]">{profile.occupation}</span>
                </div>
              )}
            </div>

            {}
            <p className="text-xs sm:text-sm text-gray-700 font-medium line-clamp-2 leading-relaxed">
              {profile.bio}
            </p>
          </div>

          {}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100">
            {profile.interests.slice(0, 4).map((interest, idx) => (
              <Badge
                key={idx}
                variant={BADGE_VARIANTS[idx % BADGE_VARIANTS.length]}
                className="text-[11px] py-0.5"
              >
                {interest}
              </Badge>
            ))}
            {profile.interests.length > 4 && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-full border border-black/10">
                +{profile.interests.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
