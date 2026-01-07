import { ReactNode } from "react";
import { Header } from "@/components/organisms/Header";

interface DashboardTemplateProps {
  children: ReactNode;
  sidebar?: ReactNode;
}

export const DashboardTemplate = ({
  children,
  sidebar,
}: DashboardTemplateProps) => {
  return (
    <div className="min-h-screen bg-background flex">
      {sidebar && (
        <aside className="hidden lg:block w-64 border-r border-border/50 p-4">
          {sidebar}
        </aside>
      )}
      <div className="flex-1 flex flex-col">
        <Header showBack={false} />
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
};
