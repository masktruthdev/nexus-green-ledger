import { motion } from "framer-motion";

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export const SectionHeader = ({
  label,
  title,
  subtitle,
  centered = true,
}: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className={`space-y-4 ${centered ? "text-center" : ""}`}
    >
      {label && (
        <span className="inline-block px-4 py-1.5 glass-panel rounded-full text-xs font-display font-semibold tracking-widest uppercase text-primary">
          {label}
        </span>
      )}
      <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && (
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
