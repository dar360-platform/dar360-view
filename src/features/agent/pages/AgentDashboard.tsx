import { DashboardTemplate } from "@/components/templates/DashboardTemplate";
import { Text } from "@/components/atoms/Text";

export const AgentDashboard = () => {
  return (
    <DashboardTemplate>
      <div className="space-y-6">
        <Text variant="h1">Agent Dashboard</Text>
        <Text variant="body" color="muted">
          Welcome to your agent dashboard. Your properties and activities will appear here.
        </Text>
      </div>
    </DashboardTemplate>
  );
};

export default AgentDashboard;
