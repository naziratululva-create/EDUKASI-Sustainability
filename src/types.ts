export interface Alternative {
  name: string;
  whyBetter: string;
  difficulty: string;
  tips: string;
}

export interface DiyOption {
  title: string;
  instructions: string;
}

export interface AlternativeResponse {
  originalItem: string;
  alternatives: Alternative[];
  diyOption: DiyOption;
  overallImpact: string;
}

export interface ActionPlanDay {
  dayNumber: number;
  dayTitle: string;
  challenge: string;
  whyItMatters: string;
  plasticSavedEst: string;
}

export interface ActionPlanResponse {
  title: string;
  summary: string;
  days: ActionPlanDay[];
}

export interface DailyLogItem {
  id: string;
  date: string; // YYYY-MM-DD
  actionName: string;
  ecoPoints: number;
  category: "kitchen" | "bathroom" | "shopping" | "general";
}

export interface StaticEduTopic {
  title: string;
  rName: string; // The specific 'R' word
  definition: string;
  practicalTips: string[];
  impactFact: string;
  icon: string;
}
