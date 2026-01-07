import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/organisms/Header";
import { Text } from "@/components/atoms/Text";
import { Badge } from "@/components/atoms/Badge";
import { Shield } from "lucide-react";
import logo from "@/assets/logo.png";

interface AuthTemplateProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  showTrustBadges?: boolean;
  backTo?: string;
}

export const AuthTemplate = ({
  title,
  subtitle,
  children,
  showTrustBadges = true,
  backTo = "/auth",
}: AuthTemplateProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header minimal backTo={backTo} backLabel="Back" />

      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <img
              src={logo}
              alt="Dar360"
              className="w-24 h-24 mx-auto mb-4 object-contain"
            />
            <Text variant="h2" className="mb-2">
              {title}
            </Text>
            <Text variant="body" color="muted">
              {subtitle}
            </Text>
          </div>

          {children}

          {/* Trust Badges */}
          {showTrustBadges && (
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <Badge variant="accent">
                <Shield className="w-3.5 h-3.5" />
                RERA Verified
              </Badge>
              <Badge variant="accent">
                <Shield className="w-3.5 h-3.5" />
                UAE Pass
              </Badge>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};
