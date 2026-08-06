import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";

interface GameCardProps {
  title: string;
  description: string;
  emoji: string;
  href: string;
  color: string;
}

export default function GameCard({ title, description, emoji, href, color }: GameCardProps) {
  return (
    <Link to={href}>
      <MagicCard
        className="p-5 border-2 hover:scale-[1.02] cursor-pointer group"
        gradientColor={`${color}20`}
      >
        <div className="flex items-start justify-between mb-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: `${color}20` }}
          >
            {emoji}
          </div>
          <ArrowRight size={16} style={{ color }}
            className="opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
        </div>
        <h4 className="font-heading font-bold text-foreground mb-1.5" style={{ color }}>
          {title}
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </MagicCard>
    </Link>
  );
}
