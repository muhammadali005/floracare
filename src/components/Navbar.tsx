import React from 'react';
import { Sprout, MessageSquareCode, FolderHeart, Stethoscope, User } from 'lucide-react';

export type ActiveTab = 'identify' | 'chat' | 'garden' | 'doctor' | 'about';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  gardenCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, gardenCount }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('identify')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-emerald-950 font-serif">
                  FloraCare
                </span>
              </div>
              <p className="text-xs text-emerald-700/80 hidden sm:block">
                Intelligent Plant Identifier & Care Companion
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('identify')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'identify'
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                  : 'text-stone-600 hover:text-emerald-800 hover:bg-emerald-50/80'
              }`}
            >
              <Sprout className="w-4 h-4" />
              <span>Identify & Care</span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'chat'
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                  : 'text-stone-600 hover:text-emerald-800 hover:bg-emerald-50/80'
              }`}
            >
              <MessageSquareCode className="w-4 h-4" />
              <span>Botanist Chat</span>
            </button>

            <button
              onClick={() => setActiveTab('garden')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all relative ${
                activeTab === 'garden'
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                  : 'text-stone-600 hover:text-emerald-800 hover:bg-emerald-50/80'
              }`}
            >
              <FolderHeart className="w-4 h-4" />
              <span>My Garden</span>
              {gardenCount > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[11px] font-bold ${
                  activeTab === 'garden' ? 'bg-white text-emerald-700' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {gardenCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('doctor')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'doctor'
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                  : 'text-stone-600 hover:text-emerald-800 hover:bg-emerald-50/80'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>Plant Doctor</span>
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'about'
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                  : 'text-stone-600 hover:text-emerald-800 hover:bg-emerald-50/80'
              }`}
            >
              <User className="w-4 h-4" />
              <span>About</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
