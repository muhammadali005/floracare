/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { PlantIdentifier } from './components/PlantIdentifier';
import { Chatbot } from './components/Chatbot';
import { MyGarden } from './components/MyGarden';
import { PlantDoctor } from './components/PlantDoctor';
import { AboutPage } from './components/AboutPage';
import { PlantCareAnalysis, GardenPlantItem } from './types/plant';
import { Sprout, CheckCircle2 } from 'lucide-react';

const LOCAL_STORAGE_GARDEN_KEY = 'floracare_my_garden_plants_v2';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('identify');
  const [activePlantContext, setActivePlantContext] = useState<PlantCareAnalysis | null>(null);
  const [chatInitialQuestion, setChatInitialQuestion] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize garden (starts empty without example plants)
  const [gardenPlants, setGardenPlants] = useState<GardenPlantItem[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_GARDEN_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Exclude any legacy example starter IDs
          return parsed.filter(
            (p) => p.id !== 'starter-monstera' && p.id !== 'starter-snake-plant'
          );
        }
      }
    } catch (e) {
      console.error('Failed to load garden plants from localStorage:', e);
    }
    return [];
  });

  // Save garden plants to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_GARDEN_KEY, JSON.stringify(gardenPlants));
    } catch (e) {
      console.error('Failed to save garden plants to localStorage:', e);
    }
  }, [gardenPlants]);

  // Show Toast helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  // Add plant to garden
  const handleSaveToGarden = (gardenItem: GardenPlantItem) => {
    setGardenPlants((prev) => [gardenItem, ...prev]);
    showToast(`"${gardenItem.nickname}" added to My Garden!`);
  };

  // Log watering
  const handleWaterPlant = (plantId: string) => {
    setGardenPlants((prev) =>
      prev.map((plant) => {
        if (plant.id === plantId) {
          const now = new Date();
          const nextDue = new Date(
            now.getTime() + plant.waterFrequencyDays * 24 * 60 * 60 * 1000
          );
          showToast(`Logged watering for "${plant.nickname}". Next due in ${plant.waterFrequencyDays} days.`);
          return {
            ...plant,
            lastWatered: now.toISOString(),
            nextWateringDue: nextDue.toISOString(),
          };
        }
        return plant;
      })
    );
  };

  // Remove plant
  const handleRemovePlant = (plantId: string) => {
    setGardenPlants((prev) => prev.filter((p) => p.id !== plantId));
    showToast('Plant removed from My Garden.');
  };

  // Ask question in chat with plant context
  const handleAskInChatWithPlant = (plant: PlantCareAnalysis, question?: string) => {
    setActivePlantContext(plant);
    if (question) {
      setChatInitialQuestion(question);
    }
    setActiveTab('chat');
  };

  // Ask question in chat from doctor or general
  const handleAskInChatGeneral = (question: string) => {
    setChatInitialQuestion(question);
    setActiveTab('chat');
  };

  const savedGardenPlantNames = gardenPlants.map((p) => p.plantData.plantName);

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-stone-800 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl border border-stone-700 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        gardenCount={gardenPlants.length}
      />

      {/* Body Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'identify' && (
          <PlantIdentifier
            onAskInChatWithPlant={handleAskInChatWithPlant}
            onSaveToGarden={handleSaveToGarden}
            savedGardenPlantNames={savedGardenPlantNames}
          />
        )}

        {activeTab === 'chat' && (
          <Chatbot
            plantContext={activePlantContext}
            onClearPlantContext={() => setActivePlantContext(null)}
            initialQuestion={chatInitialQuestion}
          />
        )}

        {activeTab === 'garden' && (
          <MyGarden
            gardenPlants={gardenPlants}
            onWaterPlant={handleWaterPlant}
            onRemovePlant={handleRemovePlant}
            onAskInChat={handleAskInChatWithPlant}
            onNavigateToIdentify={() => setActiveTab('identify')}
          />
        )}

        {activeTab === 'doctor' && (
          <PlantDoctor
            onAskInChat={handleAskInChatGeneral}
            activePlantContext={activePlantContext}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage />
        )}
      </main>

      {/* Botanical Footer */}
      <footer className="border-t border-emerald-100 bg-white/60 py-6 px-4 text-center text-xs text-stone-500 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <Sprout className="w-3.5 h-3.5" />
            </div>
            <span className="font-serif font-bold text-stone-800 text-sm">FloraCare</span>
          </div>

          <div className="flex items-center gap-4 text-xs text-stone-500">
            <button
              onClick={() => setActiveTab('about')}
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              About & Contact
            </button>
            <span>•</span>
            <a
              href="mailto:m.aleydev@gmail.com"
              className="hover:text-emerald-700 transition-colors"
            >
              m.aleydev@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
