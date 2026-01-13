import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, FileText, Eye, TrendingUp, Wallet, Wrench, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  StatsCard,
  PropertyCard,
  ViewingCard,
  ContractCard,
  EmptyState,
  Property,
  Viewing,
  Contract,
} from "@/components/dashboard";
import { OwnerSidebar, OwnerSettings, RentTracker, DocumentVault, MaintenanceView, AgentPerformance } from "../components";

// Dummy data for owner
const ownerProperties: Property[] = [
  {
    id: "prop-001",
    title: "Marina Heights Tower",
    building: "Marina Heights Tower",
    unit: "1204",
    area: "Dubai Marina",
    type: "apartment",
    beds: 2,
    baths: 2,
    sqft: 1250,
    rent: 120000,
    cheques: 4,
    deposit: 10000,
    status: "available",
    images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"],
    owner: { name: "You", email: "", phone: "" },
    viewingsCount: 8,
    createdAt: "2024-12-15",
  },
  {
    id: "prop-002",
    title: "Downtown Views",
    building: "Boulevard Point",
    unit: "3502",
    area: "Downtown Dubai",
    type: "apartment",
    beds: 3,
    baths: 3,
    sqft: 2100,
    rent: 280000,
    cheques: 2,
    deposit: 25000,
    status: "reserved",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"],
    owner: { name: "You", email: "", phone: "" },
    viewingsCount: 12,
    createdAt: "2024-12-10",
  },
];

const ownerViewings: Viewing[] = [
  {
    id: "v1",
    propertyId: "prop-001",
    propertyTitle: "Marina Heights - 1204",
    propertyArea: "Dubai Marina",
    tenantName: "John S.",
    tenantPhone: "+971 55***7890",
    date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
    time: "10:00 AM",
    outcome: "interested",
  },
  {
    id: "v2",
    propertyId: "prop-001",
    propertyTitle: "Marina Heights - 1204",
    propertyArea: "Dubai Marina",
    tenantName: "Emily C.",
    tenantPhone: "+971 55***4567",
    date: new Date(Date.now() - 172800000).toISOString().split("T")[0],
    time: "2:00 PM",
    outcome: "not_interested",
  },
  {
    id: "v3",
    propertyId: "prop-002",
    propertyTitle: "Boulevard Point - 3502",
    propertyArea: "Downtown Dubai",
    tenantName: "Michael B.",
    tenantPhone: "+971 55***1234",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    time: "11:00 AM",
    outcome: "pending",
  },
];

const ownerContracts: Contract[] = [
  {
    id: "c1",
    propertyId: "prop-002",
    propertyTitle: "Boulevard Point - 3502",
    tenantName: "Lisa Anderson",
    tenantEmail: "lisa@email.com",
    tenantPhone: "+971 55***7890",
    startDate: "2025-01-15",
    endDate: "2026-01-14",
    rent: 280000,
    cheques: 2,
    deposit: 25000,
    status: "pending_signature",
    createdAt: "2024-12-20",
  },
];

type Tab = "overview" | "properties" | "viewings" | "agents" | "rent" | "maintenance" | "documents" | "contracts" | "settings";

export const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const stats = {
    totalProperties: ownerProperties.length,
    totalViewings: ownerViewings.length,
    interested: ownerViewings.filter((v) => v.outcome === "interested").length,
    pendingContracts: ownerContracts.filter((c) => c.status === "pending_signature").length,
  };

  const upcomingViewings = ownerViewings.filter((v) => new Date(v.date) >= new Date());
  const pastViewings = ownerViewings.filter((v) => new Date(v.date) < new Date());

  return (
    <div className="min-h-screen bg-background flex">
      <OwnerSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 lg:ml-0 pt-14 lg:pt-0">
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div>
                <h1 className="font-display text-2xl font-semibold">Welcome, Sara</h1>
                <p className="text-muted-foreground">Track your property activity and agent performance</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard title="Your Properties" value={stats.totalProperties} icon={Building2} />
                <StatsCard title="Total Viewings" value={stats.totalViewings} icon={Eye} variant="accent" />
                <StatsCard title="Interested Tenants" value={stats.interested} icon={TrendingUp} variant="success" />
                <StatsCard title="Pending Contracts" value={stats.pendingContracts} icon={FileText} variant="warning" />
              </div>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-3 gap-4">
                <div
                  className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-xl p-5 cursor-pointer hover:border-accent/40 transition-colors"
                  onClick={() => setActiveTab("rent")}
                >
                  <Wallet className="w-8 h-8 text-accent mb-3" />
                  <h3 className="font-display font-semibold text-lg">Rent Tracker</h3>
                  <p className="text-sm text-muted-foreground mt-1">Track payments and upcoming cheques</p>
                </div>
                <div
                  className="bg-card border border-border/50 rounded-xl p-5 cursor-pointer hover:border-accent/40 transition-colors"
                  onClick={() => setActiveTab("maintenance")}
                >
                  <Wrench className="w-8 h-8 text-muted-foreground mb-3" />
                  <h3 className="font-display font-semibold text-lg">Maintenance</h3>
                  <p className="text-sm text-muted-foreground mt-1">View and track maintenance requests</p>
                </div>
                <div
                  className="bg-card border border-border/50 rounded-xl p-5 cursor-pointer hover:border-accent/40 transition-colors"
                  onClick={() => setActiveTab("documents")}
                >
                  <FolderOpen className="w-8 h-8 text-muted-foreground mb-3" />
                  <h3 className="font-display font-semibold text-lg">Documents</h3>
                  <p className="text-sm text-muted-foreground mt-1">Access title deeds, contracts, and NOCs</p>
                </div>
              </div>

              {/* Properties Overview */}
              <div className="bg-card border border-border/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-semibold">Your Properties</h2>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("properties")}>
                    View All
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  {ownerProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} variant="owner" />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Properties Tab */}
          {activeTab === "properties" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h1 className="font-display text-2xl font-semibold">My Properties</h1>
              <div className="grid md:grid-cols-2 gap-5">
                {ownerProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} variant="owner" />
                ))}
              </div>
            </motion.div>
          )}

          {/* Viewings Tab */}
          {activeTab === "viewings" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h1 className="font-display text-2xl font-semibold">Viewing History</h1>

              <div className="space-y-6">
                {upcomingViewings.length > 0 && (
                  <div>
                    <h2 className="font-medium text-sm text-muted-foreground uppercase tracking-wider mb-3">
                      Upcoming
                    </h2>
                    <div className="space-y-3">
                      {upcomingViewings.map((viewing) => (
                        <ViewingCard key={viewing.id} viewing={viewing} variant="upcoming" />
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h2 className="font-medium text-sm text-muted-foreground uppercase tracking-wider mb-3">
                    Past Viewings
                  </h2>
                  <div className="space-y-3">
                    {pastViewings.map((viewing) => (
                      <ViewingCard key={viewing.id} viewing={viewing} variant="past" />
                    ))}
                    {pastViewings.length === 0 && (
                      <p className="text-muted-foreground text-sm text-center py-6">No past viewings</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Agent Activity Tab */}
          {activeTab === "agents" && <AgentPerformance />}

          {/* Rent Tracker Tab */}
          {activeTab === "rent" && <RentTracker />}

          {/* Maintenance Tab */}
          {activeTab === "maintenance" && <MaintenanceView />}

          {/* Documents Tab */}
          {activeTab === "documents" && <DocumentVault />}

          {/* Contracts Tab */}
          {activeTab === "contracts" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h1 className="font-display text-2xl font-semibold">Contracts</h1>
              <div className="space-y-4">
                {ownerContracts.map((contract) => (
                  <ContractCard key={contract.id} contract={contract} variant="owner" />
                ))}
                {ownerContracts.length === 0 && (
                  <EmptyState icon={FileText} title="No contracts yet" description="Contracts will appear here once created" />
                )}
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && <OwnerSettings />}
        </div>
      </main>
    </div>
  );
};

export default OwnerDashboard;
