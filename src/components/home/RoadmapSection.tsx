import { motion } from "framer-motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import { GlassCard } from "@/components/common/GlassCard";
import roadmapImage from "@/assets/nexus-roadmap.jpeg";

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
      "Enterprise partnerships (TESLA, NVIDIA)",
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

        {/* Roadmap Visual Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12"
        >
          <GlassCard className="p-4 md:p-6 overflow-hidden" glow>
            <div className="relative">
              <img
                src={roadmapImage}
                alt="Nexus Protocol Roadmap"
                className="w-full rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30 rounded-xl" />
            </div>
          </GlassCard>
        </motion.div>

        {/* Timeline Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {roadmapPhases.map((phase, index) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard 
                className={`p-5 h-full ${
                  phase.status === "active" ? "glow-green border-primary/50" : ""
                }`}
                animate={false}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`font-display text-xs font-semibold uppercase tracking-wider ${
                      phase.status === "completed"
                        ? "text-primary"
                        : phase.status === "active"
                        ? "text-primary animate-pulse"
                        : "text-muted-foreground"
                    }`}
                  >
                    {phase.phase}
                  </span>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      phase.status === "completed"
                        ? "bg-primary glow-green-sm"
                        : phase.status === "active"
                        ? "bg-primary/50 animate-pulse"
                        : "bg-muted-foreground/30"
                    }`}
                  />
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-lg mb-1">
                  {phase.title}
                </h3>
                <span className="text-xs text-muted-foreground">
                  {phase.quarter}
                </span>

                {/* Items */}
                <ul className="mt-3 space-y-1.5">
                  {phase.items.slice(0, 4).map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-muted-foreground"
                    >
                      <span
                        className={`mt-1 w-1 h-1 rounded-full flex-shrink-0 ${
                          phase.status === "completed"
                            ? "bg-primary"
                            : "bg-muted-foreground/50"
                        }`}
                      />
                      <span className="line-clamp-1">{item}</span>
                    </li>
                  ))}
                  {phase.items.length > 4 && (
                    <li className="text-xs text-primary">
                      +{phase.items.length - 4} more
                    </li>
                  )}
                </ul>

                {/* Status Badge */}
                {phase.status === "active" && (
                  <div className="mt-3 inline-flex items-center gap-1.5 px-2 py-1 bg-primary/10 rounded-full">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                    <span className="text-[10px] font-display font-semibold text-primary uppercase tracking-wider">
                      In Progress
                    </span>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
