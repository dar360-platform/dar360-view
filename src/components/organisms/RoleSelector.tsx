import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, Building2, User } from "lucide-react";
import { RoleCard } from "@/components/molecules/RoleCard";
import { Text } from "@/components/atoms/Text";

const roles = [
  {
    id: "agent" as const,
    title: "I'm an Agent",
    description: "Manage listings, track viewings, and close deals faster with transparent owner communication.",
    icon: Briefcase,
    color: "agent" as const,
    path: "/agent/auth",
  },
  {
    id: "owner" as const,
    title: "I'm an Owner",
    description: "See exactly what your agent is doing. Track viewings, inquiries, and contracts in real-time.",
    icon: Building2,
    color: "owner" as const,
    path: "/owner/auth",
  },
  {
    id: "tenant" as const,
    title: "I'm a Tenant",
    description: "Find your perfect home. Book viewings, sign contracts, and manage your rental journey.",
    icon: User,
    color: "tenant" as const,
    path: "/tenant/auth",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export const RoleSelector = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = encodeURIComponent(location.pathname + location.search);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <Text variant="h2" className="mb-3">
          How can we help you today?
        </Text>
        <Text variant="body" color="muted">
          Select your role to get started
        </Text>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {roles.map((role) => (
          <motion.div key={role.id} variants={itemVariants}>
            <RoleCard
              title={role.title}
              description={role.description}
              icon={role.icon}
              color={role.color}
              onClick={() => {
                const to = role.id === "tenant" ? `${role.path}?returnTo=${returnTo}` : role.path;
                navigate(to);
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
