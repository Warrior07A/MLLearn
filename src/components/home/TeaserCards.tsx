import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { mlTypes } from "@/data/mlTypes";
import { MagicCard } from "@/components/ui/magic-card";

const pageLinks: Record<string, string> = {
  supervised: "/supervised",
  unsupervised: "/unsupervised",
  reinforcement: "/types-of-ml",
};

const emojis: Record<string, string> = {
  supervised: "🎯",
  unsupervised: "🔍",
  reinforcement: "🎮",
};

export default function TeaserCards() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
          The Three Pillars of ML
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Machine learning falls into three fundamental learning paradigms — each with a unique approach to finding patterns in data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mlTypes.map((type, i) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            whileHover={{ y: -6 }}
          >
            <Link to={pageLinks[type.id] ?? "/"}>
              <MagicCard className="h-full group cursor-pointer flex flex-col" gradientColor={`${type.color}15`}>
                {/* Top accent bar */}
                <div
                  className="h-1 w-full"
                  style={{ background: type.color }}
                />
                <div className="p-6 flex flex-col gap-4 h-full flex-1">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${type.color}20` }}
                  >
                    {emojis[type.id]}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3
                      className="font-heading text-xl font-bold mb-2"
                      style={{ color: type.color }}
                    >
                      {type.label}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {type.description}
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {type.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: type.color }}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div
                    className="flex items-center gap-1 text-sm font-semibold mt-2 transition-gap group-hover:gap-2"
                    style={{ color: type.color }}
                  >
                    Learn more
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </MagicCard>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
