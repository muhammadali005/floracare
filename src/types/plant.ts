export type HealthStatus = 'healthy' | 'needs_attention' | 'critical';

export interface HealthAssessment {
  status: HealthStatus;
  score: number;
  detectedIssues: string[];
  symptomsObserved: string;
  immediateActions: string[];
}

export interface CareInstructions {
  watering: {
    frequency: string;
    method: string;
    winterAdjustment: string;
    waterType: string;
    overwateringSigns: string;
    underwateringSigns: string;
    daysInterval: number;
  };
  sunlight: {
    requirement: string;
    intensity: 'Low' | 'Medium' | 'Bright Indirect' | 'Direct Sun';
    idealLocation: string;
    burnSigns: string;
    lowLightSigns: string;
  };
  soilAndPotting: {
    soilType: string;
    potDrainage: string;
    phRange: string;
    repottingFrequency: string;
  };
  climate: {
    temperatureRange: string;
    minTemperature: string;
    humidityTarget: string;
    humidityTips: string;
  };
  fertilizer: {
    frequency: string;
    type: string;
    dormancyRule: string;
  };
  pruningAndPropagation: {
    pruningTips: string;
    propagationMethod: string;
    growthHabit: string;
  };
  safetyAndToxicity: {
    isToxicToPets: boolean;
    petWarning: string;
    humanToxicity: string;
  };
}

export interface PlantCareAnalysis {
  plantName: string;
  botanicalName: string;
  family: string;
  confidence: number;
  plantType: string;
  origin: string;
  summary: string;
  healthAssessment: HealthAssessment;
  careInstructions: CareInstructions;
  botanicalFacts: string[];
  suggestedQuestions: string[];
}

export interface GardenPlantItem {
  id: string;
  plantData: PlantCareAnalysis;
  nickname: string;
  location: string;
  addedAt: string;
  photoUrl: string;
  lastWatered: string; // ISO date string
  nextWateringDue: string; // ISO date string
  waterFrequencyDays: number;
  notes: string;
}

export type ChatRoleMode = 'complex' | 'general' | 'fast';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  modelUsed?: string;
  roleMode?: ChatRoleMode;
}
