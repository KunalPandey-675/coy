'use client';

import { Home, Compass, Heart, Settings, Sparkles } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SettingsModal from '@/components/SettingsModal';
import { Button } from '@/components/ui/button';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [matchCount, setMatchCount] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  
  useEffect(() => {
    fetch('/api/matches')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMatchCount(data.count);
        }
      })
      .catch((err) => console.error('Failed to fetch match count:', err));
  }, [pathname]);

  const tabs = [
    { id: 'home', label: 'Home', icon: Home, path: '/app', badge: 0 },
    { id: 'discover', label: 'Discover', icon: Compass, path: '/app/discover', badge: 0 },
    { id: 'matches', label: 'Matches', icon: Heart, path: '/app/matches', badge: matchCount },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col text-black antialiased selection:bg-[#FFE4E8]">
      {}
      <header className="sticky top-0 z-40 bg-white border-b-2 border-black w-full shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {}
          <button
            onClick={() => router.push('/app')}
            className="flex items-center cursor-pointer group hover:scale-105 transition-transform"
          >
            <span className="text-2xl sm:text-3xl font-black text-black tracking-tight">
              coy<span className="text-[#FF2A6D]">.</span>
            </span>
          </button>

          {}
          <nav className="hidden md:flex items-center gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = pathname === tab.path;

              return (
                <button
                  key={tab.id}
                  onClick={() => router.push(tab.path)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full font-black text-sm transition-all coy-btn cursor-pointer ${
                    isActive
                      ? 'bg-[#FF2A6D] text-white border-2 border-black shadow-[2px_2px_0px_#121212]'
                      : 'text-gray-700 hover:text-black hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
                  <span>{tab.label}</span>
                  {tab.badge > 0 && (
                    <span className="bg-[#FFE600] text-black text-[10px] font-black rounded-full h-4 min-w-4 px-1.5 flex items-center justify-center border border-black shadow-sm">
                      {tab.badge > 9 ? '9+' : tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {}
          <div className="flex items-center gap-2.5">
            {}
            <Button
              variant="default"
              size="sm"
              onClick={() => router.push('/app/discover')}
              className="hidden sm:inline-flex gap-1.5 text-xs py-1.5 px-3.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Discover</span>
            </Button>

            {}
            <Button
              variant="secondary"
              size="icon-sm"
              onClick={() => setIsSettingsOpen(true)}
              title="Settings & Demo Controls"
              aria-label="Settings"
              className="w-10 h-10 border-2 border-black shadow-[2px_2px_0px_#121212]"
            >
              <Settings className="w-4 h-4 text-black stroke-[2.5]" />
            </Button>
          </div>
        </div>
      </header>

      {}
      <main className="flex-1 w-full pb-24 md:pb-12">
        {children}
      </main>

      {}
      <nav className="md:hidden fixed bottom-0 inset-x-0 h-16 bg-white border-t-2 border-black flex items-center justify-around px-4 safe-area-bottom z-40 shadow-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.path;

          return (
            <button
              key={tab.id}
              onClick={() => router.push(tab.path)}
              className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full transition-all coy-btn cursor-pointer ${
                isActive
                  ? 'bg-[#FF2A6D] text-white font-black border-2 border-black shadow-[2px_2px_0px_#121212]'
                  : 'text-gray-600 hover:text-black font-bold'
              }`}
            >
              <div className="relative flex items-center">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
                {tab.badge > 0 && (
                  <span className="absolute -top-2 -right-3.5 bg-[#FFE600] text-black text-[10px] font-black rounded-full h-4 min-w-4 px-1 flex items-center justify-center border border-black shadow-sm">
                    {tab.badge > 9 ? '9+' : tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs ${isActive ? 'inline font-black' : 'hidden'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>

      {}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
