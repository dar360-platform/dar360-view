import { motion } from "framer-motion";
import { Header } from "@/components/organisms/Header";
import { RoleSelector } from "@/components/organisms/RoleSelector";

export const AuthPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header showBack={true} backTo="/" backLabel="Back to Home" />

      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <RoleSelector />
        </motion.div>
      </main>
    </div>
  );
};

export default AuthPage;
