'use client';

import { useEffect, useState, useCallback } from 'react';
import { Profile } from '@/types';
import SwipeCard from '@/components/SwipeCard';
import ProfileModal from '@/components/ProfileModal';
import MatchModal from '@/components/MatchModal';
import EmptyState from '@/components/EmptyState';
import SkeletonCard from '@/components/SkeletonCard';
import ErrorState from '@/components/ErrorState';
import FiltersModal, { FilterState } from '@/components/FiltersModal';
import { X, Heart, Info, Loader2, Sparkles, Sliders } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Badge } from '@/components/ui/badge';

export default function DiscoverPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);
  const [icebreakers, setIcebreakers] = useState<string[]>([]);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    minAge: 18,
    maxAge: 35,
    gender: [] as string[],
    cities: [] as string[],
    interests: [] as string[],
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  
  const fetchFeed = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters.minAge) params.append('minAge', filters.minAge.toString());
      if (filters.maxAge) params.append('maxAge', filters.maxAge.toString());
      if (filters.gender.length > 0) params.append('genders', filters.gender.join(','));
      if (filters.cities.length > 0) params.append('cities', filters.cities.join(','));
      if (filters.interests.length > 0) params.append('interests', filters.interests.join(','));
      
      const res = await fetch(`/api/feed?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setProfiles(data.profiles);
        setCurrentIndex(0);
      } else {
        console.error('Feed fetch failed:', data.error);
        setError(data.error || 'Failed to load profiles');
        setProfiles([]);
      }
    } catch (error) {
      console.error('Failed to fetch feed:', error);
      setError('Network error. Please check your connection.');
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  const currentProfile = profiles[currentIndex];
  const nextProfile = profiles[currentIndex + 1];

  const handleSwipe = async (direction: 'left' | 'right') => {
    if (currentIndex >= profiles.length) return;

    const profileToSwipe = profiles[currentIndex];
    const action = direction === 'right' ? 'like' : 'pass';

    
    setCurrentIndex((prev) => prev + 1);

    
    try {
      const res = await fetch('/api/swipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileId: profileToSwipe.id,
          action,
        }),
      });

      const data = await res.json();

      if (data.success && data.isMatch) {
        setMatchedProfile(data.profile);
        setIcebreakers(data.icebreakers || []);
        setIsMatchModalOpen(true);

        
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FF2A6D', '#FFE600', '#8B5CF6', '#10B981'],
        });
      }
    } catch (error) {
      console.error('Failed to record swipe:', error);
    }
  };

  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isModalOpen || isMatchModalOpen) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleSwipe('left');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleSwipe('right');
      } else if (e.key === ' ') {
        e.preventDefault();
        if (currentProfile) {
          setSelectedProfile(currentProfile);
          setIsModalOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, profiles, isModalOpen, isMatchModalOpen, currentProfile]);

  const isEmpty = !loading && profiles.length === 0;
  const isFinished = !loading && currentIndex >= profiles.length;

  if (loading) {
    return (
      <div className="relative h-full p-4">
        <div className="relative w-full h-full max-w-md mx-auto">
          <SkeletonCard />
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorState title="Couldn't load profiles" message={error} onRetry={fetchFeed} />;
  }

  if (isEmpty || isFinished) {
    return <EmptyState onReset={fetchFeed} />;
  }

  const remainingCount = profiles.length - currentIndex;

  return (
    <div className="max-w-xl mx-auto px-4 py-4 sm:py-6 flex flex-col justify-between items-center min-h-[calc(100vh-140px)] md:min-h-[calc(100vh-100px)]">
      {}
      <div className="w-full max-w-[390px] flex items-center justify-between px-1 mb-2">
        <div className="flex items-center gap-2">
          <Badge variant="yellow" className="gap-1 py-1 px-3 shadow-[1.5px_1.5px_0px_#121212]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover</span>
          </Badge>
          <span className="text-xs font-black text-gray-700">
            {remainingCount} {remainingCount === 1 ? 'profile' : 'profiles'} left
          </span>
        </div>
        <button
          onClick={() => setIsFiltersOpen(true)}
          className="flex items-center gap-1 px-3 py-1.5 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_#121212] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#121212] transition-all"
        >
          <Sliders className="w-3.5 h-3.5 text-[#FF2A6D]" />
          <span className="text-xs font-black text-black">Filters</span>
          {(filters.gender.length > 0 || filters.cities.length > 0 || filters.interests.length > 0) && (
            <span className="ml-1 w-4 h-4 bg-[#FF2A6D] text-white text-[9px] font-black rounded-full flex items-center justify-center">
              {filters.gender.length + filters.cities.length + filters.interests.length}
            </span>
          )}
        </button>
      </div>

      {}
      <div className="relative w-full max-w-[390px] h-[520px] sm:h-[540px] my-2">
        {}
        {nextProfile && (
          <SwipeCard
            key={nextProfile.id}
            profile={nextProfile}
            onSwipe={() => {}}
            onInfoClick={() => {}}
            isTop={false}
          />
        )}

        {}
        {currentProfile && (
          <SwipeCard
            key={currentProfile.id}
            profile={currentProfile}
            onSwipe={handleSwipe}
            onInfoClick={() => {
              setSelectedProfile(currentProfile);
              setIsModalOpen(true);
            }}
            isTop={true}
          />
        )}
      </div>

      {}
      <div className="w-full max-w-[390px] flex flex-col items-center gap-2 pt-2">
        <div className="flex items-center justify-center gap-6">
          {}
          <button
            onClick={() => handleSwipe('left')}
            disabled={!currentProfile}
            className="w-16 h-16 rounded-full bg-white text-[#FF2A6D] border-2 border-black shadow-[3px_3px_0px_#121212] flex items-center justify-center hover:scale-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all coy-btn disabled:opacity-50 cursor-pointer"
            aria-label="Pass profile"
          >
            <X className="w-8 h-8 stroke-[3]" />
          </button>

          {}
          <button
            onClick={() => {
              if (currentProfile) {
                setSelectedProfile(currentProfile);
                setIsModalOpen(true);
              }
            }}
            disabled={!currentProfile}
            className="w-12 h-12 rounded-full bg-[#FFE600] text-black border-2 border-black shadow-[3px_3px_0px_#121212] flex items-center justify-center hover:scale-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all coy-btn disabled:opacity-50 cursor-pointer"
            aria-label="View profile info"
          >
            <Info className="w-5 h-5 stroke-[2.5]" />
          </button>

          {}
          <button
            onClick={() => handleSwipe('right')}
            disabled={!currentProfile}
            className="w-16 h-16 rounded-full bg-[#FF2A6D] text-white border-2 border-black shadow-[3px_3px_0px_#121212] flex items-center justify-center hover:scale-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all coy-btn disabled:opacity-50 cursor-pointer"
            aria-label="Like profile"
          >
            <Heart className="w-8 h-8 fill-white stroke-[2.5]" />
          </button>
        </div>

        {}
        <p className="text-[11px] font-bold text-gray-400 text-center select-none pt-1">
          Keyboard: <span className="text-black font-black">← Pass</span> &nbsp;•&nbsp; <span className="text-black font-black">Space details</span> &nbsp;•&nbsp; <span className="text-[#FF2A6D] font-black">Like →</span>
        </p>
      </div>

      {}
      <ProfileModal
        profile={selectedProfile}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLike={() => handleSwipe('right')}
        onPass={() => handleSwipe('left')}
      />

      {}
      <MatchModal
        isOpen={isMatchModalOpen}
        matchedProfile={matchedProfile}
        icebreakers={icebreakers}
        onClose={() => setIsMatchModalOpen(false)}
      />

      {}
      <FiltersModal
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        initialFilters={filters}
        onApply={(newFilters) => {
          setFilters(newFilters);
          
        }}
      />
    </div>
  );
}
