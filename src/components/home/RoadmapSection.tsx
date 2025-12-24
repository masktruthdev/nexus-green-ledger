import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeader } from "@/components/common/SectionHeader";

const roadmapPhases = [
  {
    phase: "Phase 1",
    title: "Foundation",
    quarter: "Q1 2024",
    items: [
      "Final Tokenomic & NFTnomic",
      "Smart Contract NFT Mining",
      "Wallet basic",
      "NFT Tree release",
      "NFT Diamond release",
      "NFT Carbon release",
    ],
    status: "completed",
  },
  {
    phase: "Phase 2",
    title: "Token Launch",
    quarter: "Q2 2024",
    items: [
      "NXP Token launch",
      "White Paper release",
      "DApps liquidity",
      "DEX liquidity",
      "NFT reward distribution",
    ],
    status: "active",
  },
  {
    phase: "Phase 3",
    title: "RWA Activation",
    quarter: "Q3 2024",
    items: [
      "Carbon project onboarding",
      "NFT RWA launch",
      "Carbon credit tokenization",
      "Revenue pertama (USD)",
      "Treasury RWA aktif",
    ],
    status: "upcoming",
  },
  {
    phase: "Phase 4",
    title: "Ecosystem Expansion",
    quarter: "Year 2",
    items: [
      "Carbon marketplace",
      "Enterprise partnerships",
      "(TESLA, NVIDIA)",
      "Governance system",
      "CEX listing",
    ],
    status: "upcoming",
  },
  {
    phase: "Phase 5",
    title: "Nexus Chain",
    quarter: "Year 3",
    items: [
      "Nexus Blockchain",
      "Validator network",
      "RWA multisector (energy, land, ESG)",
      "Institutional onboarding",
    ],
    status: "upcoming",
  },
];

export const RoadmapSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 relative">
        <SectionHeader
          label="Journey"
          title="Roadmap to Impact"
          subtitle="Our strategic path to building the world's leading green blockchain ecosystem."
        />

        {/* Horizontal Scroll Container */}
        <div className="mt-16 relative">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-border/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary glow-green-sm"
              style={{ scaleX: scrollXProgress, transformOrigin: "left" }}
            />
          </div>

          <div
            ref={containerRef}
            className="mt-8 overflow-x-auto pb-8 scrollbar-hide"
            style={{ scrollSnapType: "x mandatory" }}
          >
            <div className="flex gap-6 px-4" style={{ width: "max-content" }}>
              {roadmapPhases.map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative flex-shrink-0 w-80"
                  style={{ scrollSnapAlign: "start" }}
                >
                  {/* Timeline Node */}
                  <div className="absolute -top-11 left-0">
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        phase.status === "completed"
                          ? "bg-primary border-primary glow-green"
                          : phase.status === "active"
                          ? "bg-primary/50 border-primary animate-pulse-glow"
                          : "bg-transparent border-muted-foreground/50"
                      }`}
                    />
                  </div>

                  {/* Card */}
                  <div
                    className={`glass-panel rounded-2xl p-6 h-full transition-all duration-500 ${
                      phase.status === "active"
                        ? "glow-green border-primary/50"
                        : phase.status === "completed"
                        ? "border-primary/30"
                        : "border-border/30"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`font-display text-sm font-semibold uppercase tracking-wider ${
                          phase.status === "completed"
                            ? "text-primary"
                            : phase.status === "active"
                            ? "text-primary animate-pulse"
                            : "text-muted-foreground"
                        }`}
                      >
                        {phase.phase}
                      </span>
                      <span className="text-xs text-muted-foreground glass-panel px-3 py-1 rounded-full">
                        {phase.quarter}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-xl mb-4">
                      {phase.title}
                    </h3>

                    {/* Items */}
                    <ul className="space-y-2">
                      {phase.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span
                            className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                              phase.status === "completed"
                                ? "bg-primary"
                                : "bg-muted-foreground/50"
                            }`}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Status Badge */}
                    {phase.status === "active" && (
                      <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-xs font-display font-semibold text-primary uppercase tracking-wider">
                          In Progress
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mt-4">
          <span>Scroll to explore</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </div>
      </div>
    </section>
  );
};
