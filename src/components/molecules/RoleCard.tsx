import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Text } from "@/components/atoms/Text";
import { cn } from "@/lib/utils";

interface RoleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: "agent" | "owner" | "tenant";
  onClick: () => void;
}

const colorStyles = {
  agent: "border-accent/30 hover:border-accent hover:bg-accent/5",
  owner: "border-primary/30 hover:border-primary hover:bg-primary/5",
  tenant: "border-blue-500/30 hover:border-blue-500 hover:bg-blue-500/5",
};

const iconColors = {
  agent: "text-accent bg-accent/10",
  owner: "text-primary bg-primary/10",
  tenant: "text-blue-500 bg-blue-500/10",
};

export const RoleCard = ({
  title,
  description,
  icon: IconComponent,
  color,
  onClick,
}: RoleCardProps) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "w-full p-6 rounded-2xl border-2 bg-card text-left transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        colorStyles[color]
      )}
    >
      <div
        className={cn(
          "w-14 h-14 rounded-xl flex items-center justify-center mb-4",
          iconColors[color]
        )}
      >
        <IconComponent className="w-7 h-7" />
      </div>
      <Text variant="h4" className="mb-2">
        {title}
      </Text>
      <Text variant="small" color="muted">
        {description}
      </Text>
    </motion.button>
  );
};
