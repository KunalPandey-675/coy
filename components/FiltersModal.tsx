'use client';

import { X, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  initialFilters: FilterState;
}

export interface FilterState {
  minAge: number;
  maxAge: number;
  gender: string[];
  cities: string[];
  interests: string[];
}

const CITIES = ['Delhi', 'Mumbai', 'Bangalore', 'Pune', 'Chennai', 'Hyderabad', 'Kolkata'];
const INTERESTS = ['Coding', 'Coffee', 'Travel', 'Music', 'Food', 'Movies', 'Sports', 'Art', 'Reading'];
const GENDERS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

export default function FiltersModal({ isOpen, onClose, onApply, initialFilters }: FiltersModalProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      minAge: 18,
      maxAge: 35,
      gender: [],
      cities: [],
      interests: [],
    };
    setFilters(resetFilters);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-[10%] bottom-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-50 flex flex-col"
          >
            {}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-pink-600" />
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4 text-gray-700" />
              </button>
            </div>

            {}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Age Range</h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="text-xs text-gray-600 mb-1 block">Min</label>
                    <input
                      type="number"
                      min="18"
                      max="60"
                      value={filters.minAge}
                      onChange={(e) => setFilters({ ...filters, minAge: parseInt(e.target.value) || 18 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <span className="text-gray-400 mt-5">—</span>
                  <div className="flex-1">
                    <label className="text-xs text-gray-600 mb-1 block">Max</label>
                    <input
                      type="number"
                      min="18"
                      max="60"
                      value={filters.maxAge}
                      onChange={(e) => setFilters({ ...filters, maxAge: parseInt(e.target.value) || 35 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Gender</h3>
                <div className="flex flex-wrap gap-2">
                  {GENDERS.map((gender) => (
                    <button
                      key={gender.value}
                      onClick={() => {
                        setFilters({
                          ...filters,
                          gender: filters.gender.includes(gender.value)
                            ? filters.gender.filter(g => g !== gender.value)
                            : [...filters.gender, gender.value],
                        });
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        filters.gender.includes(gender.value)
                          ? 'bg-pink-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {gender.label}
                    </button>
                  ))}
                </div>
              </div>

              {}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Location</h3>
                <div className="flex flex-wrap gap-2">
                  {CITIES.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setFilters({
                          ...filters,
                          cities: filters.cities.includes(city)
                            ? filters.cities.filter(c => c !== city)
                            : [...filters.cities, city],
                        });
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        filters.cities.includes(city)
                          ? 'bg-pink-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => {
                        setFilters({
                          ...filters,
                          interests: filters.interests.includes(interest)
                            ? filters.interests.filter(i => i !== interest)
                            : [...filters.interests, interest],
                        });
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        filters.interests.includes(interest)
                          ? 'bg-pink-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {}
            <div className="border-t border-gray-200 p-4 flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={handleApply}
                className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-pink-700 transition-all shadow-lg"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
