export interface WasteItem {
  id: string;
  label: string;
  emoji: string;
  correctBin: string;
}

export interface WasteBinDef {
  id: string;
  label: string;
  emoji: string;
  color: string;
  borderColor: string;
  description: string;
}

export const wasteBins: WasteBinDef[] = [
  { id: "paper", label: "Paper", emoji: "📄", color: "bg-yellow-500/20", borderColor: "border-yellow-500", description: "Newspapers, cardboard, books" },
  { id: "metal", label: "Metal", emoji: "🔩", color: "bg-gray-500/20", borderColor: "border-gray-400", description: "Cans, foil, metal scraps" },
  { id: "plastic", label: "Plastic", emoji: "🧴", color: "bg-blue-500/20", borderColor: "border-blue-400", description: "Bottles, bags, containers" },
  { id: "ewaste", label: "E-Waste", emoji: "💻", color: "bg-red-500/20", borderColor: "border-red-500", description: "Electronics, batteries, cables" },
  { id: "glass", label: "Glass", emoji: "🫙", color: "bg-green-500/20", borderColor: "border-green-500", description: "Bottles, jars, windows" },
  { id: "organic", label: "Organic", emoji: "🌿", color: "bg-lime-500/20", borderColor: "border-lime-500", description: "Food scraps, garden waste" },
];

export const wasteItems: WasteItem[] = [
  { id: "newspaper", label: "Newspaper", emoji: "📰", correctBin: "paper" },
  { id: "soda-can", label: "Soda Can", emoji: "🥤", correctBin: "metal" },
  { id: "water-bottle", label: "Water Bottle", emoji: "🧃", correctBin: "plastic" },
  { id: "old-phone", label: "Old Phone", emoji: "📱", correctBin: "ewaste" },
  { id: "wine-bottle", label: "Wine Bottle", emoji: "🍾", correctBin: "glass" },
  { id: "apple-core", label: "Apple Core", emoji: "🍎", correctBin: "organic" },
  { id: "cardboard", label: "Cardboard Box", emoji: "📦", correctBin: "paper" },
  { id: "foil", label: "Tin Foil", emoji: "✨", correctBin: "metal" },
  { id: "plastic-bag", label: "Plastic Bag", emoji: "🛍️", correctBin: "plastic" },
  { id: "old-laptop", label: "Old Laptop", emoji: "💻", correctBin: "ewaste" },
  { id: "jar", label: "Glass Jar", emoji: "🫙", correctBin: "glass" },
  { id: "banana-peel", label: "Banana Peel", emoji: "🍌", correctBin: "organic" },
];
