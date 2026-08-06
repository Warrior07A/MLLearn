import { TrendingUp, DollarSign, Dumbbell, Heart, BarChart2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface RegressionApplication {
  icon: LucideIcon;
  label: string;
  description: string;
}

export const regressionApplications: RegressionApplication[] = [
  {
    icon: TrendingUp,
    label: "Market Analysis",
    description: "Predict stock prices and market trends",
  },
  {
    icon: DollarSign,
    label: "Sales Forecasting",
    description: "Estimate future sales from historical data",
  },
  {
    icon: DollarSign,
    label: "Salary Prediction",
    description: "Predict salaries based on experience and skills",
  },
  {
    icon: Dumbbell,
    label: "Sports Analytics",
    description: "Player performance and game outcome prediction",
  },
  {
    icon: Heart,
    label: "Medical Research",
    description: "Predict patient outcomes from clinical data",
  },
  {
    icon: BarChart2,
    label: "Economics",
    description: "GDP growth, inflation, and economic indicators",
  },
];
