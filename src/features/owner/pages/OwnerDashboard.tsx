import { DashboardTemplate } from "@/components/templates/DashboardTemplate";
import { Text } from "@/components/atoms/Text";

export const OwnerDashboard = () => {
  return (
    <DashboardTemplate>
      <div className="space-y-6">
        <Text variant="h1">Owner Dashboard</Text>
        <Text variant="body" color="muted">
          Welcome to your owner dashboard. Your property activity will appear here.
        </Text>
      </div>
    </DashboardTemplate>
  );
};

export default OwnerDashboard;
