import React, { useState } from 'react';
import { 
  PlantCareAnalysis, 
  HealthAssessment 
} from '../types/plant';
import { 
  Droplets, 
  Sun, 
  Layers, 
  Thermometer, 
  Sparkles, 
  Scissors, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  ShieldCheck, 
  Info, 
  MessageSquareCode, 
  PlusCircle, 
  Compass, 
  HelpCircle,
  Clock
} from 'lucide-react';

interface CareMatrixProps {
  plant: PlantCareAnalysis;
  onAskInChat: (question?: string) => void;
  onAddToGarden: () => void;
  isAlreadyInGarden?: boolean;
}

export const CareMatrix: React.FC<CareMatrixProps> = ({
  plant,
  onAskInChat,
  onAddToGarden,
  isAlreadyInGarden = false,
}) => {
  const [activeCareTab, setActiveCareTab] = useState<'all' | 'water' | 'light' | 'soil' | 'climate' | 'fertilizer' | 'pruning'>('all');

  const careInstructions = plant?.careInstructions || {
    watering: {
      frequency: 'Every 7 to 10 days',
      method: 'Water thoroughly and allow top soil to dry',
      winterAdjustment: 'Reduce frequency in winter',
      waterType: 'Filtered or settled tap water',
      overwateringSigns: 'Yellowing lower leaves',
      underwateringSigns: 'Drooping foliage',
      daysInterval: 7,
    },
    sunlight: {
      requirement: 'Medium to bright indirect sunlight',
      intensity: 'Bright Indirect' as const,
      idealLocation: 'Near an East or South-facing window with sheer curtain',
      burnSigns: 'Crispy scorched patches',
      lowLightSigns: 'Leggy growth',
    },
    soilAndPotting: {
      soilType: 'Aerated well-draining potting mix',
      potDrainage: 'Must have bottom drainage hole',
      phRange: '6.0 - 7.0',
      repottingFrequency: 'Every 1-2 years',
    },
    climate: {
      temperatureRange: '65°F - 80°F (18°C - 27°C)',
      minTemperature: '55°F (13°C)',
      humidityTarget: '50% - 70%',
      humidityTips: 'Place near a pebble tray or humidifier',
    },
    fertilizer: {
      frequency: 'Monthly during spring/summer',
      type: 'Balanced houseplant fertilizer diluted to half strength',
      dormancyRule: 'Pause feeding during winter',
    },
    pruningAndPropagation: {
      pruningTips: 'Trim dead foliage at the base',
      propagationMethod: 'Stem cuttings rooted in water',
      growthHabit: 'Upright foliage',
    },
    safetyAndToxicity: {
      isToxicToPets: false,
      petWarning: 'Mild; keep away from curious pets',
      humanToxicity: 'Non-toxic ornamental foliage',
    },
  };

  const healthAssessment = plant?.healthAssessment || {
    status: 'healthy' as const,
    score: 90,
    detectedIssues: [],
    symptomsObserved: 'Plant appears healthy and vibrant.',
    immediateActions: ['Maintain regular watering and bright indirect light'],
  };

  // Status badge styling
  const getStatusBadge = (status: HealthAssessment['status']) => {
    switch (status) {
      case 'healthy':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Healthy & Thriving
          </span>
        );
      case 'needs_attention':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            Needs Attention
          </span>
        );
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            Urgent Care Required
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview & Identification Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-emerald-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-100/50 via-teal-50/20 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                {plant.plantType || 'Botanical Species'}
              </span>
              <span className="text-xs font-medium text-stone-500">
                Family: <strong className="text-stone-700">{plant.family}</strong>
              </span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50/80 px-2 py-0.5 rounded-full">
                {plant.confidence}% Match Confidence
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif tracking-tight">
              {plant.plantName}
            </h1>
            <p className="text-base italic text-stone-500 font-serif">
              {plant.botanicalName}
            </p>
            <p className="text-sm text-stone-600 max-w-3xl leading-relaxed pt-1">
              {plant.summary}
            </p>
            {plant.origin && (
              <p className="text-xs text-stone-500 flex items-center gap-1 pt-1">
                <Compass className="w-3.5 h-3.5 text-emerald-600" />
                Native Origin: <span className="text-stone-700 font-medium">{plant.origin}</span>
              </p>
            )}
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <button
              onClick={onAddToGarden}
              disabled={isAlreadyInGarden}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm ${
                isAlreadyInGarden
                  ? 'bg-emerald-100 text-emerald-800 cursor-default'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 hover:scale-[1.02]'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              {isAlreadyInGarden ? 'Saved in My Garden' : 'Add to My Garden'}
            </button>

            <button
              onClick={() => onAskInChat(`How do I care for my ${plant.plantName}?`)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 transition-all border border-stone-200 hover:scale-[1.02]"
            >
              <MessageSquareCode className="w-4 h-4 text-emerald-700" />
              Ask Botanist AI
            </button>
          </div>
        </div>

        {/* Health Diagnostic Banner */}
        <div className="mt-6 pt-6 border-t border-emerald-100/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
                Plant Health Triage:
              </span>
              {getStatusBadge(healthAssessment.status)}
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <span>Vigor Score:</span>
              <div className="w-24 h-2.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    healthAssessment.score >= 85
                      ? 'bg-emerald-500'
                      : healthAssessment.score >= 60
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${Math.min(100, Math.max(10, healthAssessment.score))}%` }}
                />
              </div>
              <span className="font-bold text-stone-700">{healthAssessment.score}/100</span>
            </div>
          </div>

          <p className="text-sm text-stone-700 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/60 leading-relaxed">
            {healthAssessment.symptomsObserved}
          </p>

          {/* Detected issues & Immediate Action items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            {healthAssessment.detectedIssues?.length > 0 && (
              <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl">
                <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Identified Stressors
                </h4>
                <ul className="text-xs text-amber-800 space-y-1">
                  {healthAssessment.detectedIssues.map((issue, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-500">•</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {healthAssessment.immediateActions?.length > 0 && (
              <div className="p-3 bg-emerald-50 border border-emerald-200/80 rounded-xl">
                <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Recommended Immediate Steps
                </h4>
                <ul className="text-xs text-emerald-800 space-y-1">
                  {healthAssessment.immediateActions.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-500">✓</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Tabs for Care Sections */}
      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: 'Complete Care Protocol', icon: Info },
          { id: 'water', label: 'Watering', icon: Droplets },
          { id: 'light', label: 'Sunlight', icon: Sun },
          { id: 'soil', label: 'Soil & Pot', icon: Layers },
          { id: 'climate', label: 'Climate & Humidity', icon: Thermometer },
          { id: 'fertilizer', label: 'Fertilizer', icon: Sparkles },
          { id: 'pruning', label: 'Pruning & Pet Safety', icon: Scissors },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeCareTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCareTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white hover:bg-emerald-50 text-stone-600 border border-stone-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Detailed Care Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 1. WATERING CARD */}
        {(activeCareTab === 'all' || activeCareTab === 'water') && (
          <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-xs hover:border-emerald-200 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">Watering Regimen</h3>
                  <p className="text-xs text-stone-500">Hydration frequency & soil dry-down cycle</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg border border-blue-100 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                ~Every {careInstructions.watering.daysInterval || 7} days
              </span>
            </div>

            <div className="bg-stone-50 p-3.5 rounded-xl space-y-2">
              <div className="text-xs">
                <span className="font-semibold text-stone-800">Frequency: </span>
                <span className="text-stone-700">{careInstructions.watering.frequency}</span>
              </div>
              <div className="text-xs">
                <span className="font-semibold text-stone-800">Application Method: </span>
                <span className="text-stone-700">{careInstructions.watering.method}</span>
              </div>
              <div className="text-xs">
                <span className="font-semibold text-stone-800">Water Quality: </span>
                <span className="text-stone-700">{careInstructions.watering.waterType}</span>
              </div>
              <div className="text-xs">
                <span className="font-semibold text-stone-800">Winter Adjustment: </span>
                <span className="text-stone-700">{careInstructions.watering.winterAdjustment}</span>
              </div>
            </div>

            {/* Overwatering vs Underwatering warnings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-rose-50/60 rounded-lg border border-rose-100">
                <span className="font-bold text-rose-800 block mb-0.5">Overwatering Signs</span>
                <span className="text-rose-700 leading-tight block">{careInstructions.watering.overwateringSigns}</span>
              </div>
              <div className="p-2.5 bg-amber-50/60 rounded-lg border border-amber-100">
                <span className="font-bold text-amber-800 block mb-0.5">Underwatering Signs</span>
                <span className="text-amber-700 leading-tight block">{careInstructions.watering.underwateringSigns}</span>
              </div>
            </div>
          </div>
        )}

        {/* 2. SUNLIGHT CARD */}
        {(activeCareTab === 'all' || activeCareTab === 'light') && (
          <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-xs hover:border-emerald-200 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">Sunlight & Exposure</h3>
                  <p className="text-xs text-stone-500">Light intensity & window placement</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-800 rounded-lg border border-amber-200">
                {careInstructions.sunlight.intensity} Light
              </span>
            </div>

            <div className="bg-stone-50 p-3.5 rounded-xl space-y-2">
              <div className="text-xs">
                <span className="font-semibold text-stone-800">Light Level: </span>
                <span className="text-stone-700">{careInstructions.sunlight.requirement}</span>
              </div>
              <div className="text-xs">
                <span className="font-semibold text-stone-800">Ideal Room Placement: </span>
                <span className="text-stone-700">{careInstructions.sunlight.idealLocation}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-amber-50/60 rounded-lg border border-amber-100">
                <span className="font-bold text-amber-900 block mb-0.5">Sunburn Symptoms</span>
                <span className="text-amber-800 leading-tight block">{careInstructions.sunlight.burnSigns}</span>
              </div>
              <div className="p-2.5 bg-stone-100/80 rounded-lg border border-stone-200">
                <span className="font-bold text-stone-800 block mb-0.5">Low-Light Symptoms</span>
                <span className="text-stone-700 leading-tight block">{careInstructions.sunlight.lowLightSigns}</span>
              </div>
            </div>
          </div>
        )}

        {/* 3. SOIL & POTTING CARD */}
        {(activeCareTab === 'all' || activeCareTab === 'soil') && (
          <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-xs hover:border-emerald-200 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">Soil & Repotting</h3>
                  <p className="text-xs text-stone-500">Substrate formulation & drainage</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200">
                pH {careInstructions.soilAndPotting.phRange}
              </span>
            </div>

            <div className="bg-stone-50 p-3.5 rounded-xl space-y-2">
              <div className="text-xs">
                <span className="font-semibold text-stone-800">Recommended Substrate: </span>
                <span className="text-stone-700">{careInstructions.soilAndPotting.soilType}</span>
              </div>
              <div className="text-xs">
                <span className="font-semibold text-stone-800">Drainage Essentials: </span>
                <span className="text-stone-700">{careInstructions.soilAndPotting.potDrainage}</span>
              </div>
              <div className="text-xs">
                <span className="font-semibold text-stone-800">Repotting Frequency: </span>
                <span className="text-stone-700">{careInstructions.soilAndPotting.repottingFrequency}</span>
              </div>
            </div>
          </div>
        )}

        {/* 4. CLIMATE & HUMIDITY CARD */}
        {(activeCareTab === 'all' || activeCareTab === 'climate') && (
          <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-xs hover:border-emerald-200 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                  <Thermometer className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">Climate & Humidity</h3>
                  <p className="text-xs text-stone-500">Thermal tolerance & moisture levels</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-teal-50 text-teal-800 rounded-lg border border-teal-200">
                {careInstructions.climate.humidityTarget}
              </span>
            </div>

            <div className="bg-stone-50 p-3.5 rounded-xl space-y-2">
              <div className="text-xs">
                <span className="font-semibold text-stone-800">Ideal Temperature: </span>
                <span className="text-stone-700">{careInstructions.climate.temperatureRange}</span>
              </div>
              <div className="text-xs">
                <span className="font-semibold text-stone-800">Cold Hardiness Minimum: </span>
                <span className="text-stone-700">{careInstructions.climate.minTemperature}</span>
              </div>
              <div className="text-xs">
                <span className="font-semibold text-stone-800">Humidity Strategies: </span>
                <span className="text-stone-700">{careInstructions.climate.humidityTips}</span>
              </div>
            </div>
          </div>
        )}

        {/* 5. FERTILIZER CARD */}
        {(activeCareTab === 'all' || activeCareTab === 'fertilizer') && (
          <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-xs hover:border-emerald-200 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">Fertilizer & Nutrition</h3>
                  <p className="text-xs text-stone-500">Feeding schedule & nutrient balance</p>
                </div>
              </div>
            </div>

            <div className="bg-stone-50 p-3.5 rounded-xl space-y-2">
              <div className="text-xs">
                <span className="font-semibold text-stone-800">Feeding Schedule: </span>
                <span className="text-stone-700">{careInstructions.fertilizer.frequency}</span>
              </div>
              <div className="text-xs">
                <span className="font-semibold text-stone-800">Fertilizer Formula: </span>
                <span className="text-stone-700">{careInstructions.fertilizer.type}</span>
              </div>
              <div className="text-xs">
                <span className="font-semibold text-stone-800">Winter Dormancy: </span>
                <span className="text-stone-700">{careInstructions.fertilizer.dormancyRule}</span>
              </div>
            </div>
          </div>
        )}

        {/* 6. PRUNING, PROPAGATION & PET SAFETY CARD */}
        {(activeCareTab === 'all' || activeCareTab === 'pruning') && (
          <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-xs hover:border-emerald-200 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Scissors className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">Pruning & Pet Safety</h3>
                  <p className="text-xs text-stone-500">Propagation & toxicity warning</p>
                </div>
              </div>

              {careInstructions.safetyAndToxicity.isToxicToPets ? (
                <span className="text-xs font-semibold px-2.5 py-1 bg-rose-100 text-rose-800 rounded-lg border border-rose-200 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                  Toxic to Pets
                </span>
              ) : (
                <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Pet Safe
                </span>
              )}
            </div>

            <div className="bg-stone-50 p-3.5 rounded-xl space-y-2">
              <div className="text-xs">
                <span className="font-semibold text-stone-800">Pruning & Clean-up: </span>
                <span className="text-stone-700">{careInstructions.pruningAndPropagation.pruningTips}</span>
              </div>
              <div className="text-xs">
                <span className="font-semibold text-stone-800">Propagation: </span>
                <span className="text-stone-700">{careInstructions.pruningAndPropagation.propagationMethod}</span>
              </div>
              <div className="text-xs">
                <span className="font-semibold text-stone-800">Pet Toxicity Details: </span>
                <span className="text-stone-700">{careInstructions.safetyAndToxicity.petWarning}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Botanical Facts Banner */}
      {plant.botanicalFacts?.length > 0 && (
        <div className="bg-gradient-to-r from-emerald-900 via-stone-900 to-emerald-950 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h3 className="font-serif text-lg font-bold">Fascinating Botanical Trivia</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            {plant.botanicalFacts.map((fact, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/10">
                <span className="text-emerald-400 font-bold block mb-1">Fact #{idx + 1}</span>
                {fact}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Follow-up Questions Chips */}
      {plant.suggestedQuestions?.length > 0 && (
        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            Suggested Questions for the Botanist AI
          </h4>
          <div className="flex flex-wrap gap-2">
            {plant.suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => onAskInChat(q)}
                className="text-xs text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 px-3.5 py-2 rounded-xl transition-all text-left flex items-center gap-2 hover:scale-[1.01]"
              >
                <span>{q}</span>
                <span className="text-emerald-600 font-bold">→</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
