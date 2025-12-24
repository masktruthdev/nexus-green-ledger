import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  animate?: boolean;
  delay?: number;
}

export const GlassCard = ({
  children,
  className,
  hover = true,
  glow = false,
  animate = true,
  delay = 0,
}: GlassCardProps) => {
  const baseClasses = cn(
    "glass-panel rounded-2xl p-6",
    hover && "transition-all duration-500 hover:border-primary/50",
    glow && "glow-green-sm",
    className
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        whileHover={hover ? { y: -5, scale: 1.01 } : undefined}
        className={baseClasses}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={baseClasses}>{children}</div>;
};
