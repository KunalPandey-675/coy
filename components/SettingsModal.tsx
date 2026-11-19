'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy, RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ConfirmationModal, { ConfirmationType } from '@/components/ConfirmationModal';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetData?: () => void;
}

export default function SettingsModal({ isOpen, onClose, onResetData }: SettingsModalProps) {
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [copied, setCopied] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [confirmModalConfig, setConfirmModalConfig] = useState<{
    isOpen: boolean;
    type: ConfirmationType;
    title: string;
    description: string;
    confirmText: string;
    action: () => Promise<void> | void;
  } | null>(null);

  const inviteLink = 'https:

  const handleCopyInvite = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = async () => {
    setResetting(true);
    try {
      const res = await fetch('/api/reset', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setResetSuccess(true);
        if (onResetData) onResetData();
        setTimeout(() => {
          setResetSuccess(false);
          window.location.reload();
        }, 800);
      }
    } catch (err) {
      console.error('Reset failed:', err);
    } finally {
      setResetting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
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
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 260 }}
          className="relative w-full max-w-sm sm:max-w-md max-h-[88vh] bg-white rounded-t-[2.2rem] sm:rounded-[2.2rem] border-2 border-black shadow-[6px_6px_0px_#121212] overflow-hidden flex flex-col z-10"
        >
          {}
          <div className="flex items-center justify-between px-5 py-3.5 border-b-2 border-black bg-white">
            <div className="flex items-center">
              <span className="font-black text-2xl tracking-tight text-black">
                coy<span className="text-[#FF2A6D]">.</span>
              </span>
            </div>
            <button
              onClick={onClose}
              className="font-bold text-sm text-black hover:text-[#FF2A6D] px-2 py-1 rounded-lg cursor-pointer"
            >
              Done
            </button>
          </div>

          {}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-3.5">
            <h1 className="text-3xl font-black tracking-tight text-black mb-2">
              Settings
            </h1>

            {}
            <div className="bg-[#F5F5FA] rounded-2xl p-3.5 flex items-center justify-between border border-transparent">
              <div>
                <p className="font-black text-gray-900 text-xs">First name</p>
                <p className="text-gray-500 text-xs mt-0.5">Alex</p>
              </div>
              <button className="text-xs font-bold underline text-black hover:text-[#FF2A6D] cursor-pointer">
                Change
              </button>
            </div>

            {}
            <div className="bg-[#F5F5FA] rounded-2xl p-3.5 border border-transparent">
              <p className="font-black text-gray-900 text-xs">Your number</p>
              <p className="text-gray-500 text-xs mt-0.5">+91 98765 43210</p>
            </div>

            {}
            <div className="bg-[#F5F5FA] rounded-2xl p-3.5 flex items-center justify-between border border-transparent">
              <div>
                <p className="font-black text-gray-900 text-xs">Email</p>
                <p className="text-gray-500 text-xs mt-0.5">alex.demo@getcoy.com</p>
              </div>
              <button className="text-xs font-bold underline text-black hover:text-[#FF2A6D] cursor-pointer">
                Remove
              </button>
            </div>

            {}
            <div className="bg-[#F5F5FA] rounded-2xl p-3.5 flex items-center justify-between border border-transparent">
              <div className="pr-3">
                <p className="font-black text-gray-900 text-xs">Alerts</p>
                <p className="text-gray-500 text-[11px] mt-0.5">
                  When someone new adds you, or it's a match.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAlertsEnabled(!alertsEnabled)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-black transition-colors duration-200 ease-in-out ${
                  alertsEnabled ? 'bg-[#FF2A6D]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white border border-black shadow transition duration-200 ease-in-out ${
                    alertsEnabled ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            {}
            <div className="bg-[#F5F5FA] rounded-2xl p-3.5 flex items-center justify-between border border-transparent">
              <div className="min-w-0 pr-3">
                <p className="font-black text-gray-900 text-xs">Invite link</p>
                <p className="text-gray-500 text-[11px] mt-0.5 truncate font-mono">
                  {inviteLink}
                </p>
              </div>
              <button
                onClick={handleCopyInvite}
                className="text-xs font-bold underline text-black hover:text-[#FF2A6D] flex items-center gap-1 flex-shrink-0 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {}
            <div className="pt-1">
              <h2 className="font-black text-base text-black mb-1">Brag links</h2>
              <p className="text-gray-500 text-[11px] leading-relaxed mb-2.5">
                Anyone with one of these sees your crush count from the day you shared it, never who. Each works for 30 days.
              </p>
              <div className="bg-[#F5F5FA] rounded-2xl p-3.5 flex items-center justify-between border border-transparent">
                <div>
                  <p className="font-black text-gray-900 text-[11px] font-mono">app.getcoy.com/b/coydemo</p>
                  <p className="text-gray-500 text-[10px] mt-0.5">1 person. Shared 18 Nov, works until 18 Dec.</p>
                </div>
                <button className="text-xs font-bold text-[#FF2A6D] hover:underline cursor-pointer">
                  Delete
                </button>
              </div>
            </div>

            {}
            <Card variant="lavender" className="p-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="black" className="text-[9px] uppercase tracking-wider mb-1">
                    Demo Controls
                  </Badge>
                  <p className="text-gray-700 text-[11px] font-bold">Reset demo swipes & matches</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    setConfirmModalConfig({
                      isOpen: true,
                      type: 'reset',
                      title: 'Reset Demo Swipes & Matches?',
                      description: 'This will reset all your swipe history, mutual matches, and restore all 30+ mock profiles so you can replay the demo.',
                      confirmText: 'Reset Demo Data',
                      action: handleReset,
                    });
                  }}
                  disabled={resetting}
                  className="bg-black text-white hover:bg-gray-800 text-xs py-1 px-3"
                >
                  <RefreshCw className={`w-3 h-3 ${resetting ? 'animate-spin' : ''}`} />
                  <span>{resetSuccess ? 'Reset!' : resetting ? 'Resetting...' : 'Reset'}</span>
                </Button>
              </div>
            </Card>

            {}
            <div className="pt-2 space-y-2.5">
              <Button
                variant="secondary"
                onClick={() => {
                  setConfirmModalConfig({
                    isOpen: true,
                    type: 'custom',
                    title: 'Log out of Coy?',
                    description: 'Are you sure you want to log out? You can sign back in at any time with your credentials.',
                    confirmText: 'Log Out',
                    action: () => {
                      onClose();
                    },
                  });
                }}
                className="w-full py-2.5 text-xs sm:text-sm"
              >
                Log out
              </Button>
              <div className="text-center">
                <button
                  onClick={() => {
                    setConfirmModalConfig({
                      isOpen: true,
                      type: 'custom',
                      title: 'Delete your Coy account?',
                      description: 'Account deletion is permanent. Your crushes, mutual matches, and encrypted profile will be removed permanently.',
                      confirmText: 'Delete Account',
                      action: () => {
                        onClose();
                      },
                    });
                  }}
                  className="text-xs font-bold text-[#FF2A6D] underline hover:text-[#E61C5B] cursor-pointer"
                >
                  Delete account
                </button>
              </div>
            </div>

            {}
            <div className="pt-3 pb-1 text-center text-xs text-gray-400 space-y-1.5 border-t border-gray-100">
              <div className="flex flex-wrap justify-center gap-x-2.5 gap-y-1 text-[11px] font-semibold text-gray-500">
                <span className="hover:underline cursor-pointer">Terms</span>
                <span className="hover:underline cursor-pointer">Privacy</span>
                <span className="hover:underline cursor-pointer">Refunds</span>
                <span className="hover:underline cursor-pointer">Contact</span>
              </div>
              <p className="text-[10px] text-gray-400">© 2026 Fiquity Technology Pvt Ltd</p>
            </div>
          </div>
        </motion.div>
      </div>

      {}
      {confirmModalConfig && (
        <ConfirmationModal
          isOpen={confirmModalConfig.isOpen}
          type={confirmModalConfig.type}
          title={confirmModalConfig.title}
          description={confirmModalConfig.description}
          confirmText={confirmModalConfig.confirmText}
          isLoading={resetting}
          onConfirm={async () => {
            await confirmModalConfig.action();
            setConfirmModalConfig(null);
          }}
          onClose={() => setConfirmModalConfig(null)}
        />
      )}
    </AnimatePresence>
  );
}
