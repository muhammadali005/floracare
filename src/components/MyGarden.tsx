import React, { useState } from 'react';
import { 
  GardenPlantItem, 
  PlantCareAnalysis 
} from '../types/plant';
import { 
  Droplets, 
  Calendar, 
  MapPin, 
  Trash2, 
  ExternalLink, 
  MessageSquareCode, 
  Clock, 
  Plus, 
  Sprout, 
  AlertCircle,
  CheckCircle2,
  X
} from 'lucide-react';
import { CareMatrix } from './CareMatrix';

interface MyGardenProps {
  gardenPlants: GardenPlantItem[];
  onWaterPlant: (plantId: string) => void;
  onRemovePlant: (plantId: string) => void;
  onAskInChat: (plant: PlantCareAnalysis, question?: string) => void;
  onNavigateToIdentify: () => void;
}

export const MyGarden: React.FC<MyGardenProps> = ({
  gardenPlants,
  onWaterPlant,
  onRemovePlant,
  onAskInChat,
  onNavigateToIdentify,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [inspectingPlant, setInspectingPlant] = useState<GardenPlantItem | null>(null);

  // Locations list
  const locations = ['All', ...Array.from(new Set(gardenPlants.map((p) => p.location)))];

  const filteredPlants = selectedLocation === 'All'
    ? gardenPlants
    : gardenPlants.filter((p) => p.location === selectedLocation);

  // Compute days until watering
  const getWateringStatus = (nextWateringDue: string, lastWatered: string) => {
    const now = new Date().getTime();
    const dueDate = new Date(nextWateringDue).getTime();
    if (isNaN(dueDate)) {
      return {
        badge: 'Water Today!',
        color: 'bg-rose-100 text-rose-800 border-rose-300',
        isDue: true,
      };
    }
    const diffHours = (dueDate - now) / (1000 * 60 * 60);
    const diffDays = Math.ceil(diffHours / 24);

    if (diffDays <= 0) {
      return {
        badge: 'Water Today!',
        color: 'bg-rose-100 text-rose-800 border-rose-300',
        isDue: true,
      };
    } else if (diffDays === 1) {
      return {
        badge: 'Due Tomorrow',
        color: 'bg-amber-100 text-amber-900 border-amber-300',
        isDue: false,
      };
    } else {
      return {
        badge: `Due in ${diffDays} days`,
        color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        isDue: false,
      };
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs">
        <div>
          <h2 className="font-serif font-bold text-2xl text-stone-900">
            My Botanical Sanctuary
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Keep your plant collection healthy with automated watering schedules and care reminders.
          </p>
        </div>

        <button
          onClick={onNavigateToIdentify}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm shadow-emerald-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Plant from Photo
        </button>
      </div>

      {/* Location Filter Chips */}
      {locations.length > 2 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-stone-400 shrink-0">Filter Room:</span>
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => setSelectedLocation(loc)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedLocation === loc
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white hover:bg-stone-50 text-stone-600 border border-stone-200'
              }`}
            >
              {loc}
            </button>
          ))}
        </div>
      )}

      {/* Plants Grid */}
      {filteredPlants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlants.map((item) => {
            const status = getWateringStatus(item.nextWateringDue, item.lastWatered);
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-emerald-100 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
              >
                {/* Photo & badges */}
                <div className="relative h-48 overflow-hidden bg-stone-900">
                  <img
                    src={item.photoUrl}
                    alt={item.nickname}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Watering Due Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-xs ${status.color}`}
                    >
                      <Droplets className="w-3.5 h-3.5" />
                      {status.badge}
                    </span>
                  </div>

                  {/* Location badge */}
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/50 text-white backdrop-blur-md">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      {item.location}
                    </span>
                  </div>

                  {/* Plant Title over photo bottom */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-bold text-lg font-serif leading-tight truncate">
                      {item.nickname}
                    </h3>
                    <p className="text-xs text-stone-200 italic truncate">
                      {item.plantData.botanicalName}
                    </p>
                  </div>
                </div>

                {/* Body details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2 text-xs text-stone-600">
                    <div className="flex items-center justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-400">Watering Cycle:</span>
                      <span className="font-semibold text-stone-800">
                        Every {item.waterFrequencyDays} days
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-400">Sunlight Needs:</span>
                      <span className="font-semibold text-stone-800">
                        {item.plantData.careInstructions.sunlight.intensity}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-400">Last Hydrated:</span>
                      <span className="font-semibold text-stone-800">
                        {(() => {
                          const d = new Date(item.lastWatered);
                          return isNaN(d.getTime()) ? 'Recently' : d.toLocaleDateString([], { month: 'short', day: 'numeric' });
                        })()}
                      </span>
                    </div>

                    {item.notes && (
                      <p className="text-[11px] text-stone-500 italic line-clamp-2 pt-1">
                        "{item.notes}"
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-2 border-t border-stone-100">
                    {/* Water Now Button */}
                    <button
                      onClick={() => onWaterPlant(item.id)}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                        status.isDue
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
                          : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200'
                      }`}
                    >
                      <Droplets className="w-3.5 h-3.5" />
                      <span>{status.isDue ? 'Water Now (Overdue)' : 'Water Today (Log Hydration)'}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setInspectingPlant(item)}
                        className="flex-1 py-2 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 flex items-center justify-center gap-1 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Care Guide
                      </button>

                      <button
                        onClick={() => onAskInChat(item.plantData, `Give me specific care advice for my ${item.nickname}.`)}
                        className="flex-1 py-2 rounded-xl text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 flex items-center justify-center gap-1 transition-colors"
                      >
                        <MessageSquareCode className="w-3.5 h-3.5" />
                        Chat Advice
                      </button>

                      <button
                        onClick={() => onRemovePlant(item.id)}
                        className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Remove plant from garden"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-emerald-100 space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center">
            <Sprout className="w-8 h-8" />
          </div>
          <h3 className="font-serif font-bold text-xl text-stone-900">
            No Plants in This Room Yet
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Snap a photo of your houseplant or select a specimen in the Identify tab to save it to your personal care schedule!
          </p>
          <button
            onClick={onNavigateToIdentify}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Identify New Plant
          </button>
        </div>
      )}

      {/* Inspecting Full Plant Modal */}
      {inspectingPlant && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-stone-50 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-emerald-100 my-8 max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setInspectingPlant(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white hover:bg-stone-100 text-stone-500 shadow-sm border border-stone-200 z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <CareMatrix
              plant={inspectingPlant.plantData}
              onAskInChat={(q) => {
                setInspectingPlant(null);
                onAskInChat(inspectingPlant.plantData, q);
              }}
              onAddToGarden={() => {}}
              isAlreadyInGarden={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};
