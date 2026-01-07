import { DashboardTemplate } from "@/components/templates/DashboardTemplate";
import { Text } from "@/components/atoms/Text";

export const TenantDashboard = () => {
  return (
    <DashboardTemplate>
      <div className="space-y-6">
        <Text variant="h1">Tenant Dashboard</Text>
        <Text variant="body" color="muted">
          Welcome to your tenant dashboard. Your applications and viewings will appear here.
        </Text>
      </div>
    </DashboardTemplate>
  );
};

export default TenantDashboard;
