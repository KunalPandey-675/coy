'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, XCircle, ShieldAlert, Flag, RotateCcw, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export type ConfirmationType = 'unmatch' | 'block' | 'report' | 'reset' | 'custom';

export interface ConfirmationModalProps {
  isOpen: boolean;
  type: ConfirmationType;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  profileName?: string;
  profilePhoto?: string;
  isLoading?: boolean;
  onConfirm: (extraData?: { reason?: string }) => void;
  onClose: () => void;
}

const REPORT_REASONS = [
  'Inappropriate messages or photos',
  'Harassment or offensive behavior',
  'Fake profile or impersonation',
  'Spam, scam, or commercial activity',
  'Underage or safety concern',
  'Other reason',
];

export default function ConfirmationModal({
  isOpen,
  type,
  title,
  description,
  confirmText,
  cancelText = 'Cancel',
  profileName,
  profilePhoto,
  isLoading = false,
  onConfirm,
  onClose,
}: ConfirmationModalProps) {
  const [selectedReason, setSelectedReason] = useState(REPORT_REASONS[0]);
  const [customDetails, setCustomDetails] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      setSelectedReason(REPORT_REASONS[0]);
      setCustomDetails('');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [isOpen]);

  if (!isOpen) return null;

  
  let modalTitle = title;
  let modalDesc = description;
  let modalConfirmText = confirmText;
  let icon = <XCircle className="w-6 h-6 text-[#FF2A6D]" />;
  let iconBg = 'bg-[#FFE4E8]';
  let confirmVariant: 'default' | 'secondary' | 'yellow' | 'destructive' = 'destructive';

  if (type === 'unmatch') {
    modalTitle = modalTitle || `Unmatch with ${profileName || 'this user'}?`;
    modalDesc =
      modalDesc ||
      `You and ${
        profileName || 'this user'
      } will be removed from each other's matches. Chat and crush history will be deleted. This cannot be undone.`;
    modalConfirmText = modalConfirmText || 'Yes, Unmatch';
    icon = <XCircle className="w-6 h-6 text-[#FF2A6D]" />;
    iconBg = 'bg-[#FFE4E8]';
    confirmVariant = 'destructive';
  } else if (type === 'block') {
    modalTitle = modalTitle || `Block ${profileName || 'this user'}?`;
    modalDesc =
      modalDesc ||
      `${
        profileName || 'This user'
      } will be removed from your matches immediately and will never appear in your Discover feed again.`;
    modalConfirmText = modalConfirmText || 'Block User';
    icon = <ShieldAlert className="w-6 h-6 text-[#D97706]" />;
    iconBg = 'bg-[#FEF3C7]';
    confirmVariant = 'destructive';
  } else if (type === 'report') {
    modalTitle = modalTitle || `Report ${profileName || 'Profile'}`;
    modalDesc =
      modalDesc ||
      'Help keep Coy safe and respectful. Please select the primary reason for reporting:';
    modalConfirmText = modalConfirmText || 'Submit Report';
    icon = <Flag className="w-6 h-6 text-[#DC2626]" />;
    iconBg = 'bg-[#FEE2E2]';
    confirmVariant = 'destructive';
  } else if (type === 'reset') {
    modalTitle = modalTitle || 'Reset Demo Data?';
    modalDesc =
      modalDesc ||
      'This will reset all your swipes, restored profiles, and mutual matches back to the initial demo state.';
    modalConfirmText = modalConfirmText || 'Reset Everything';
    icon = <RotateCcw className="w-6 h-6 text-black" />;
    iconBg = 'bg-[#FFE600]';
    confirmVariant = 'default';
  }

  const handleConfirm = () => {
    if (type === 'report') {
      const finalReason =
        selectedReason === 'Other reason' && customDetails.trim()
          ? `Other: ${customDetails.trim()}`
          : selectedReason;
      onConfirm({ reason: finalReason });
    } else {
      onConfirm();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={!isLoading ? onClose : undefined}
        />

        {}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative w-full max-w-sm sm:max-w-md bg-white rounded-[2.2rem] border-2 border-black shadow-[6px_6px_0px_#121212] overflow-hidden p-6 z-10 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {}
          <button
            onClick={onClose}
            disabled={isLoading}
            className="absolute top-4 right-4 w-8 h-8 rounded-full border border-black/20 hover:border-black flex items-center justify-center text-gray-500 hover:text-black transition-colors disabled:opacity-50"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {}
          <div className="flex items-center gap-3.5 mb-4">
            {profilePhoto ? (
              <div className="relative w-14 h-14 rounded-2xl border-2 border-black overflow-hidden flex-shrink-0 bg-[#ECEBFE] shadow-[2px_2px_0px_#121212]">
                <Image
                  src={profilePhoto}
                  alt={profileName || 'Profile'}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div
                className={`w-12 h-12 rounded-2xl border-2 border-black ${iconBg} flex items-center justify-center shadow-[2px_2px_0px_#121212] flex-shrink-0`}
              >
                {icon}
              </div>
            )}
            <div>
              <h2 className="text-lg sm:text-xl font-black text-black tracking-tight leading-snug">
                {modalTitle}
              </h2>
              {profileName && (
                <p className="text-xs font-bold text-gray-500 mt-0.5">
                  Action on mutual match
                </p>
              )}
            </div>
          </div>

          {}
          <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed mb-4">
            {modalDesc}
          </p>

          {}
          {type === 'report' && (
            <div className="space-y-2 mb-4 max-h-56 overflow-y-auto pr-1">
              {REPORT_REASONS.map((reason) => (
                <label
                  key={reason}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl border-2 cursor-pointer transition-all text-xs font-bold select-none ${
                    selectedReason === reason
                      ? 'border-black bg-[#FFE4E8] text-black shadow-[2px_2px_0px_#121212]'
                      : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <input
                    type="radio"
                    name="reportReason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={() => setSelectedReason(reason)}
                    className="accent-[#FF2A6D]"
                  />
                  <span>{reason}</span>
                </label>
              ))}

              {selectedReason === 'Other reason' && (
                <textarea
                  value={customDetails}
                  onChange={(e) => setCustomDetails(e.target.value)}
                  placeholder="Please describe what happened (optional)..."
                  rows={2}
                  className="w-full mt-2 p-2.5 text-xs font-medium border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF2A6D] resize-none"
                />
              )}
            </div>
          )}

          {}
          <div className="flex items-center gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 py-2.5 text-xs font-black"
            >
              {cancelText}
            </Button>
            <Button
              type="button"
              variant={confirmVariant}
              onClick={handleConfirm}
              disabled={isLoading}
              className="flex-1 py-2.5 text-xs font-black gap-1.5"
            >
              {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{modalConfirmText}</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
