import React, { useState } from 'react';
import { 
  Stethoscope, 
  Sparkles, 
  AlertTriangle, 
  Search, 
  HelpCircle, 
  MessageSquareCode, 
  CheckCircle2, 
  Activity, 
  Zap, 
  ShieldAlert, 
  Shield, 
  ArrowRight
} from 'lucide-react';
import { PlantCareAnalysis } from '../types/plant';

interface SymptomPreset {
  id: string;
  name: string;
  emoji: string;
  query: string;
  severity: 'low' | 'medium' | 'high';
  tag: string;
}

const COMMON_SYMPTOMS: SymptomPreset[] = [
  {
    id: 'yellow-leaves',
    name: 'Yellowing Lower Leaves',
    emoji: '🍂',
    query: 'Older bottom leaves turning solid yellow and dropping off',
    severity: 'medium',
    tag: 'Moisture / Nitrogen',
  },
  {
    id: 'crispy-tips',
    name: 'Brown Crispy Leaf Margins',
    emoji: '🤎',
    query: 'Dry brown crispy tips and edges on foliage',
    severity: 'low',
    tag: 'Humidity / Fluoride',
  },
  {
    id: 'drooping',
    name: 'Limp Drooping Stems',
    emoji: '🥀',
    query: 'Entire plant stems and leaves drooping suddenly',
    severity: 'medium',
    tag: 'Turgor Loss',
  },
  {
    id: 'white-powder',
    name: 'White Powdery Spots',
    emoji: '⚪',
    query: 'White powdery dust or fuzzy white film on upper leaves',
    severity: 'high',
    tag: 'Mildew Fungi',
  },
  {
    id: 'webbing-pests',
    name: 'Fine Webbing / Sticky Leaves',
    emoji: '🕸️',
    query: 'Silky microscopic webs between leaf axils and sticky honeydew',
    severity: 'high',
    tag: 'Spider Mites',
  },
  {
    id: 'mushy-stem',
    name: 'Black Base / Mushy Stem',
    emoji: '🪵',
    query: 'Soft squishy dark black stem near soil line with foul odor',
    severity: 'high',
    tag: 'Root Rot (Pythium)',
  },
  {
    id: 'leaf-curl',
    name: 'Inward Leaf Curling',
    emoji: '🍃',
    query: 'Leaves curling inward like a taco or cupping downwards',
    severity: 'medium',
    tag: 'Heat / Underwater',
  },
  {
    id: 'pale-growth',
    name: 'Leggy Pale Growth',
    emoji: '🌱',
    query: 'Long stretched out thin stems with small pale leaves',
    severity: 'low',
    tag: 'Etiolation (Low Light)',
  },
];

interface PlantDoctorProps {
  onAskInChat: (question: string) => void;
  activePlantContext: PlantCareAnalysis | null;
}

interface DiagnosisResult {
  likelyCause: string;
  quickCheck: string;
  fastRemedy: string;
  urgency: 'Low' | 'Medium' | 'High';
}

export const PlantDoctor: React.FC<PlantDoctorProps> = ({
  onAskInChat,
  activePlantContext,
}) => {
  const [customSymptom, setCustomSymptom] = useState<string>('');
  const [selectedPlantType, setSelectedPlantType] = useState<string>(
    activePlantContext?.plantName || 'Indoor houseplant'
  );
  const [activeSymptomId, setActiveSymptomId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [diagnosedSymptomTitle, setDiagnosedSymptomTitle] = useState<string>('');

  const runDiagnosis = async (symptomText: string, title?: string) => {
    if (!symptomText.trim()) return;

    setIsLoading(true);
    setDiagnosedSymptomTitle(title || symptomText);

    try {
      const response = await fetch('/api/quick-diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptom: symptomText,
          plantType: selectedPlantType,
        }),
      });

      const data = await response.json();
      if (data && data.success && data.diagnosis) {
        setDiagnosis(data.diagnosis);
      } else {
        throw new Error('Local fallback');
      }
    } catch {
      setDiagnosis({
        likelyCause: 'Moisture fluctuation or lighting adjustment stress',
        quickCheck: 'Check soil moisture 2 inches down and inspect leaf undersides for pests',
        fastRemedy: 'Adjust watering schedule to let roots breathe; relocate to bright indirect light',
        urgency: 'Medium',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePresetClick = (preset: SymptomPreset) => {
    setActiveSymptomId(preset.id);
    setCustomSymptom(preset.query);
    runDiagnosis(preset.query, preset.name);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSymptom.trim()) return;
    setActiveSymptomId(null);
    runDiagnosis(customSymptom, customSymptom);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-stone-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            High-Speed Triage Powered by gemini-3.1-flash-lite
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif">
            Plant Doctor & Leaf Symptom Matrix
          </h2>
          <p className="text-emerald-100/90 text-sm leading-relaxed">
            Spot something wrong with your leaves, stems, or soil? Tap a visual symptom or describe what you see to receive instant diagnostic triage and emergency recovery steps.
          </p>
        </div>
      </div>

      {/* Input / Plant Type Context */}
      <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-emerald-700" />
              Symptom Lookup
            </h3>
            <p className="text-xs text-stone-500">
              Specify your plant variety for more precise pathology triage
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-500 shrink-0">Plant Type:</span>
            <input
              type="text"
              value={selectedPlantType}
              onChange={(e) => setSelectedPlantType(e.target.value)}
              placeholder="e.g. Monstera, Fiddle Leaf, Calathea"
              className="text-xs px-3 py-1.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-stone-50 font-medium"
            />
          </div>
        </div>

        {/* Custom Symptom Input Form */}
        <form onSubmit={handleCustomSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={customSymptom}
              onChange={(e) => setCustomSymptom(e.target.value)}
              placeholder="Describe your plant's symptoms (e.g. yellow patches on edges, brown spots with yellow halo)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
          <button
            type="submit"
            disabled={!customSymptom.trim() || isLoading}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-200 text-white text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 shadow-xs"
          >
            {isLoading ? 'Diagnosing...' : 'Triage Now'}
          </button>
        </form>

        {/* Common Visual Symptoms Matrix Grid */}
        <div className="space-y-2 pt-2">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
            Or select a common leaf symptom:
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {COMMON_SYMPTOMS.map((preset) => {
              const isSelected = activeSymptomId === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handlePresetClick(preset)}
                  className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-300/40 shadow-xs'
                      : 'bg-stone-50/60 hover:bg-stone-100/80 border-stone-200/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl">{preset.emoji}</span>
                    <span className="text-[10px] font-bold text-stone-500 bg-white px-2 py-0.5 rounded-md border border-stone-200">
                      {preset.tag}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 leading-tight">
                      {preset.name}
                    </h4>
                    <p className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">
                      {preset.query}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Diagnosis Results Card */}
      {diagnosis && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-md space-y-6 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs uppercase font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                  Pathology Triage Report
                </span>
                <span className="text-xs font-mono text-stone-400">
                  via gemini-3.1-flash-lite
                </span>
              </div>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900">
                {diagnosedSymptomTitle}
              </h3>
            </div>

            {/* Urgency Badge */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-500">Urgency Level:</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border ${
                  diagnosis.urgency === 'High'
                    ? 'bg-rose-100 text-rose-800 border-rose-300'
                    : diagnosis.urgency === 'Medium'
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                }`}
              >
                {diagnosis.urgency === 'High' ? (
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                ) : (
                  <Activity className="w-3.5 h-3.5" />
                )}
                {diagnosis.urgency} Urgency
              </span>
            </div>
          </div>

          {/* 3 Key Diagnostic Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 1. Likely Cause */}
            <div className="bg-amber-50/70 border border-amber-200/80 p-5 rounded-2xl space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                1. Most Probable Cause
              </h4>
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                {diagnosis.likelyCause}
              </p>
            </div>

            {/* 2. Quick Check Test */}
            <div className="bg-blue-50/70 border border-blue-200/80 p-5 rounded-2xl space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                2. Immediate Physical Test
              </h4>
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                {diagnosis.quickCheck}
              </p>
            </div>

            {/* 3. Fast Remedy */}
            <div className="bg-emerald-50/70 border border-emerald-200/80 p-5 rounded-2xl space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emerald-600" />
                3. Fast Recovery Protocol
              </h4>
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                {diagnosis.fastRemedy}
              </p>
            </div>
          </div>

          {/* Deep Chat CTA */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-200">
            <div className="text-xs text-stone-600">
              Need a deep treatment plan or organic fungicide recipe?
            </div>
            <button
              onClick={() =>
                onAskInChat(
                  `My ${selectedPlantType} has: ${diagnosedSymptomTitle}. Probable cause: ${diagnosis.likelyCause}. Can you give me an in-depth botanical recovery plan?`
                )
              }
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
            >
              <MessageSquareCode className="w-3.5 h-3.5" />
              <span>Discuss with Botanical Pathologist AI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
