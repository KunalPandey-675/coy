'use client';

import { useEffect, useState } from 'react';
import { Profile } from '@/types';
import Image from 'next/image';
import {
  Heart,
  MapPin,
  Clock,
  Loader2,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  MoreVertical,
  XCircle,
  Shield,
  Flag,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ConfirmationModal from '@/components/ConfirmationModal';

interface MatchData {
  id: string;
  matchedAt: number;
  profile: Profile;
}

const BADGE_VARIANTS: ('lavender' | 'peach' | 'yellow' | 'mint' | 'pink')[] = [
  'lavender',
  'peach',
  'yellow',
  'mint',
  'pink',
];

export default function MatchesPage() {
  const [matches, setMatches] = useState<MatchData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeChatProfile, setActiveChatProfile] = useState<Profile | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  
  const [activeAction, setActiveAction] = useState<{
    matchId: string;
    action: 'unmatch' | 'block' | 'report';
    profile: Profile;
  } | null>(null);
  const [isSubmittingAction, setIsSubmittingAction] = useState(false);

  
  const [toastMessage, setToastMessage] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
  } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage((prev) => (prev?.text === text ? null : prev));
    }, 3500);
  };

  const handleConfirmAction = async (extraData?: { reason?: string }) => {
    if (!activeAction) return;
    const { matchId, action, profile } = activeAction;
    setIsSubmittingAction(true);

    try {
      const body: any = { matchId, action };
      if (action === 'report') {
        body.reason = extraData?.reason || 'Reported by user';
      }

      const res = await fetch('/api/unmatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.success) {
        
        setMatches((prev) => prev.filter((m) => m.id !== matchId));
        setActiveAction(null);
        setOpenMenuId(null);

        const actionText =
          action === 'unmatch'
            ? `Unmatched with ${profile.name}`
            : action === 'block'
            ? `${profile.name} has been blocked`
            : `Report submitted for ${profile.name}. Thank you!`;
        showToast(actionText, 'success');
      } else {
        showToast(`Failed to ${action}: ${data.error || 'Server error'}`, 'error');
      }
    } catch (error) {
      console.error(`Error ${action}ing:`, error);
      showToast(`Network error while trying to ${action}`, 'error');
    } finally {
      setIsSubmittingAction(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/matches');
      const data = await res.json();
      if (data.success) {
        setMatches(data.matches);
      } else {
        console.error('Matches fetch failed:', data.error);
        setMatches([]);
      }
    } catch (error) {
      console.error('Failed to fetch matches:', error);
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
        <div className="w-14 h-14 rounded-full bg-[#FFE4E8] border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#121212] mb-3">
          <Loader2 className="w-7 h-7 text-[#FF2A6D] animate-spin" />
        </div>
        <p className="text-black font-black text-sm">Loading mutual matches...</p>
        <p className="text-gray-500 text-xs mt-0.5">Coy Confidential Matching</p>
      </div>
    );
  }

  
  if (matches.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 flex flex-col items-center justify-center text-center">
        <div className="w-18 h-18 rounded-full bg-[#FFE4E8] border-2 border-black shadow-[3px_3px_0px_#121212] flex items-center justify-center mb-4">
          <Heart className="w-9 h-9 text-[#FF2A6D] fill-[#FF2A6D]" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-black mb-1">
          No matches yet
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm font-medium leading-relaxed mb-6 max-w-xs">
          When someone you crush on likes you back, they will appear here instantly!
        </p>

        {}
        <Card className="text-left space-y-3 p-5 w-full mb-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#FF2A6D]" />
            <p className="font-black text-black text-xs uppercase tracking-wider">
              How Coy Matching Works
            </p>
          </div>
          <div className="space-y-2 text-xs text-gray-700 font-medium">
            <div className="p-3 bg-[#F5F5FA] rounded-xl border border-gray-200">
              <strong>Swipe right</strong> on people you like in Discover.
            </div>
            <div className="p-3 bg-[#ECEBFE] rounded-xl border border-black/10">
              We tell them someone likes them, <strong>never who</strong>.
            </div>
            <div className="p-3 bg-[#D2F9E3] rounded-xl border border-black/10">
              If they add you too, <strong>it's a mutual match!</strong>
            </div>
          </div>
        </Card>

        <Link href="/app/discover" className="w-full">
          <Button className="w-full gap-2 py-3 text-sm font-black">
            <span>Start Swiping Now</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 relative">
      {}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-5 inset-x-4 max-w-sm mx-auto z-50 pointer-events-none"
          >
            <div
              className={`p-3.5 rounded-2xl border-2 border-black shadow-[4px_4px_0px_#121212] flex items-center gap-3 text-xs font-black ${
                toastMessage.type === 'error'
                  ? 'bg-[#FEE2E2] text-red-900'
                  : toastMessage.type === 'info'
                  ? 'bg-[#ECEBFE] text-[#4F46E5]'
                  : 'bg-[#D2F9E3] text-emerald-900'
              }`}
            >
              <span className="text-base">
                {toastMessage.type === 'error'
                  ? '⚠️'
                  : toastMessage.type === 'info'
                  ? '💌'
                  : '✨'}
              </span>
              <span className="leading-snug">{toastMessage.text}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {}
      {openMenuId && (
        <div
          className="fixed inset-0 z-30 bg-transparent"
          onClick={() => setOpenMenuId(null)}
        />
      )}

      {}
      <div className="flex items-center justify-between pb-6 mb-6 border-b-2 border-black/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">Your Matches</h1>
          <p className="text-xs sm:text-sm font-medium text-gray-500 mt-0.5">
            Mutual connections who like you back
          </p>
        </div>
        <Badge variant="pink" className="gap-1.5 py-1.5 px-3.5 text-xs border-2 border-black shadow-[2px_2px_0px_#121212]">
          <Heart className="w-4 h-4 fill-[#FF2A6D]" />
          <span className="font-black">{matches.length} {matches.length === 1 ? 'match' : 'matches'}</span>
        </Badge>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {matches.map((match, index) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative"
          >
            <Card className="hover:-translate-y-1 transition-transform flex flex-col justify-between h-full overflow-visible relative">
              <div className="p-4 flex gap-4">
                {}
                <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-2xl border-2 border-black overflow-hidden flex-shrink-0 bg-[#ECEBFE] shadow-[2px_2px_0px_#121212]">
                  {match.profile.photos?.[0] ? (
                    <Image
                      src={match.profile.photos[0]}
                      alt={match.profile.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-black text-2xl text-black">
                      {match.profile.name[0]}
                    </div>
                  )}
                  {}
                  <div className="absolute top-1.5 right-1.5 w-6 h-6 bg-[#FF2A6D] rounded-full border border-black flex items-center justify-center shadow-sm">
                    <Heart className="w-3 h-3 text-white fill-white" />
                  </div>
                </div>

                {}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    {}
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <div className="min-w-0 pr-1">
                        <h3 className="text-lg font-black text-black truncate">
                          {match.profile.name}, {match.profile.age}
                        </h3>
                        <div className="flex items-center gap-1 text-xs font-bold text-gray-600 mt-0.5">
                          <MapPin className="w-3 h-3 text-[#FF2A6D] flex-shrink-0" />
                          <span className="truncate">{match.profile.cityOrCollege}</span>
                        </div>
                      </div>

                      {}
                      <div className="relative flex-shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(openMenuId === match.id ? null : match.id);
                          }}
                          className="w-8 h-8 bg-white hover:bg-gray-100 border-2 border-black rounded-xl flex items-center justify-center shadow-[1.5px_1.5px_0px_#121212] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                          aria-label="Match actions"
                        >
                          <MoreVertical className="w-4 h-4 text-black stroke-[2.5]" />
                        </button>

                        {}
                        {openMenuId === match.id && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-0 top-10 bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_#121212] py-1.5 z-40 min-w-[155px] animate-in fade-in zoom-in-95 duration-100"
                          >
                            <button
                              onClick={() => {
                                setOpenMenuId(null);
                                setActiveAction({
                                  matchId: match.id,
                                  action: 'unmatch',
                                  profile: match.profile,
                                });
                              }}
                              className="w-full px-3.5 py-2 text-left text-xs font-black text-gray-800 hover:bg-[#FFE4E8] hover:text-[#FF2A6D] flex items-center gap-2 transition-colors cursor-pointer"
                            >
                              <XCircle className="w-3.5 h-3.5 text-[#FF2A6D]" />
                              <span>Unmatch</span>
                            </button>
                            <div className="h-[1px] bg-gray-100 my-0.5" />
                            <button
                              onClick={() => {
                                setOpenMenuId(null);
                                setActiveAction({
                                  matchId: match.id,
                                  action: 'block',
                                  profile: match.profile,
                                });
                              }}
                              className="w-full px-3.5 py-2 text-left text-xs font-black text-amber-700 hover:bg-[#FEF08A]/40 flex items-center gap-2 transition-colors cursor-pointer"
                            >
                              <Shield className="w-3.5 h-3.5 text-amber-600" />
                              <span>Block</span>
                            </button>
                            <div className="h-[1px] bg-gray-100 my-0.5" />
                            <button
                              onClick={() => {
                                setOpenMenuId(null);
                                setActiveAction({
                                  matchId: match.id,
                                  action: 'report',
                                  profile: match.profile,
                                });
                              }}
                              className="w-full px-3.5 py-2 text-left text-xs font-black text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
                            >
                              <Flag className="w-3.5 h-3.5 text-red-500" />
                              <span>Report</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-400 mb-2">
                      <Clock className="w-3 h-3 flex-shrink-0" />
                      <span>Matched {formatTimestamp(match.matchedAt)}</span>
                    </div>
                  </div>

                  {}
                  <div className="flex flex-wrap gap-1">
                    {match.profile.interests.slice(0, 3).map((interest, idx) => (
                      <Badge
                        key={idx}
                        variant={BADGE_VARIANTS[idx % BADGE_VARIANTS.length]}
                        className="text-[10px] px-2 py-0.5"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {}
              <div className="px-4 py-3 bg-[#F5F5FA] border-t-2 border-black flex items-center justify-between">
                <span className="text-xs font-black text-black/80">
                  Status: Both Crushed
                </span>
                <Button
                  size="sm"
                  onClick={() => setActiveChatProfile(match.profile)}
                  className="gap-1.5 py-1.5 px-4 text-xs font-black"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Say Hi</span>
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {}
      <ConfirmationModal
        isOpen={!!activeAction}
        type={activeAction?.action || 'unmatch'}
        profileName={activeAction?.profile.name}
        profilePhoto={activeAction?.profile.photos?.[0]}
        isLoading={isSubmittingAction}
        onConfirm={handleConfirmAction}
        onClose={() => {
          if (!isSubmittingAction) setActiveAction(null);
        }}
      />

      {}
      {activeChatProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <Card className="max-w-sm w-full p-6 text-center space-y-4">
            <div className="w-20 h-20 rounded-full border-2 border-black mx-auto overflow-hidden relative shadow-[3px_3px_0px_#121212] bg-[#FFEADB]">
              {activeChatProfile.photos?.[0] ? (
                <Image
                  src={activeChatProfile.photos[0]}
                  alt={activeChatProfile.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-black text-3xl">
                  {activeChatProfile.name[0]}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-xl font-black text-black">
                Connect with {activeChatProfile.name}
              </h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed mt-1">
                Coy connects mutual crushes privately via direct chat link.
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <Button
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-xs py-3 font-black"
                onClick={() => {
                  const greeting = encodeURIComponent(
                    `Hi ${activeChatProfile.name}! We matched on Coy 😊`
                  );
                  window.open(`https:
                  showToast(`Opening WhatsApp chat with ${activeChatProfile.name} 💌`, 'info');
                  setActiveChatProfile(null);
                }}
              >
                Open in WhatsApp
              </Button>
              <Button
                variant="secondary"
                className="w-full text-xs py-2.5 font-bold"
                onClick={() => setActiveChatProfile(null)}
              >
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
