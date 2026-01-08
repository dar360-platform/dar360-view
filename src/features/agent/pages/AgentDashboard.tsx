import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Calendar,
  FileText,
  TrendingUp,
  Plus,
  Search,
  Filter,
  Share2,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { AgentSidebar, AddPropertyModal, ScheduleViewingModal, CreateContractModal } from "../components";
import { dummyProperties, dummyViewings, dummyContracts } from "../data/dummyData";
import { toast } from "sonner";

type Tab = "overview" | "properties" | "viewings" | "contracts" | "settings";

export const AgentDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [properties, setProperties] = useState<Property[]>(dummyProperties);
  const [viewings, setViewings] = useState<Viewing[]>(dummyViewings);
  const [contracts, setContracts] = useState<Contract[]>(dummyContracts);
  
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [showScheduleViewing, setShowScheduleViewing] = useState(false);
  const [showCreateContract, setShowCreateContract] = useState(false);
  const [propertyFilter, setPropertyFilter] = useState<"all" | "available" | "reserved" | "rented">("all");

  const stats = {
    totalProperties: properties.length,
    availableProperties: properties.filter(p => p.status === "available").length,
    upcomingViewings: viewings.filter(v => new Date(v.date) >= new Date()).length,
    signedContracts: contracts.filter(c => c.status === "signed").length,
  };

  const filteredProperties = propertyFilter === "all" 
    ? properties 
    : properties.filter(p => p.status === propertyFilter);

  const upcomingViewings = viewings.filter(v => new Date(v.date) >= new Date());
  const pastViewings = viewings.filter(v => new Date(v.date) < new Date());

  const handleShareProperty = (id: string) => {
    const property = properties.find(p => p.id === id);
    if (property) {
      const message = `🏠 ${property.building} - Unit ${property.unit}\n📍 ${property.area}\n💰 AED ${property.rent.toLocaleString()}/year\n🛏️ ${property.beds} beds • ${property.baths} baths\n\nContact me for viewing!`;
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
    }
  };

  const handleLogOutcome = (id: string, outcome: Viewing["outcome"]) => {
    setViewings(viewings.map(v => v.id === id ? { ...v, outcome } : v));
    toast.success("Viewing outcome logged");
  };

  return (
    <div className="min-h-screen bg-background flex">
      <AgentSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 lg:ml-0 pt-14 lg:pt-0">
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-display text-2xl font-semibold">Welcome back, Ahmed</h1>
                  <p className="text-muted-foreground">Here's what's happening with your properties</p>
                </div>
                <Button variant="gold" onClick={() => setShowAddProperty(true)}>
                  <Plus className="w-4 h-4 mr-2" /> Add Property
                </Button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard title="Total Properties" value={stats.totalProperties} icon={Building2} />
                <StatsCard title="Available" value={stats.availableProperties} icon={Building2} variant="success" />
                <StatsCard title="Upcoming Viewings" value={stats.upcomingViewings} icon={Calendar} variant="accent" />
                <StatsCard title="Signed Contracts" value={stats.signedContracts} icon={FileText} variant="accent" />
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-card border border-border/50 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display font-semibold">Upcoming Viewings</h2>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("viewings")}>View All</Button>
                  </div>
                  <div className="space-y-3">
                    {upcomingViewings.slice(0, 3).map(viewing => (
                      <ViewingCard key={viewing.id} viewing={viewing} variant="upcoming" />
                    ))}
                    {upcomingViewings.length === 0 && (
                      <p className="text-muted-foreground text-sm text-center py-6">No upcoming viewings</p>
                    )}
                  </div>
                </div>

                <div className="bg-card border border-border/50 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display font-semibold">Recent Properties</h2>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("properties")}>View All</Button>
                  </div>
                  <div className="space-y-3">
                    {properties.slice(0, 3).map(property => (
                      <div key={property.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden">
                          {property.images[0] ? (
                            <img src={property.images[0]} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center"><Building2 className="w-5 h-5 text-muted-foreground" /></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{property.building}</p>
                          <p className="text-sm text-muted-foreground">{property.area}</p>
                        </div>
                        <p className="text-sm font-medium text-accent">AED {(property.rent/1000).toFixed(0)}k</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Properties Tab */}
          {activeTab === "properties" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="font-display text-2xl font-semibold">Properties</h1>
                <Button variant="gold" onClick={() => setShowAddProperty(true)}>
                  <Plus className="w-4 h-4 mr-2" /> Add Property
                </Button>
              </div>

              <Tabs value={propertyFilter} onValueChange={(v) => setPropertyFilter(v as any)}>
                <TabsList>
                  <TabsTrigger value="all">All ({properties.length})</TabsTrigger>
                  <TabsTrigger value="available">Available</TabsTrigger>
                  <TabsTrigger value="reserved">Reserved</TabsTrigger>
                  <TabsTrigger value="rented">Rented</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProperties.map(property => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onShare={handleShareProperty}
                    onScheduleViewing={() => setShowScheduleViewing(true)}
                    onContract={() => setShowCreateContract(true)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Viewings Tab */}
          {activeTab === "viewings" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="font-display text-2xl font-semibold">Viewings</h1>
                <Button variant="gold" onClick={() => setShowScheduleViewing(true)}>
                  <Plus className="w-4 h-4 mr-2" /> Schedule Viewing
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="font-medium text-sm text-muted-foreground uppercase tracking-wider mb-3">Upcoming</h2>
                  <div className="space-y-3">
                    {upcomingViewings.map(viewing => (
                      <ViewingCard key={viewing.id} viewing={viewing} variant="upcoming" />
                    ))}
                    {upcomingViewings.length === 0 && (
                      <EmptyState icon={Calendar} title="No upcoming viewings" description="Schedule a viewing for one of your properties" action={{ label: "Schedule Viewing", onClick: () => setShowScheduleViewing(true) }} />
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="font-medium text-sm text-muted-foreground uppercase tracking-wider mb-3">Past Viewings</h2>
                  <div className="space-y-3">
                    {pastViewings.map(viewing => (
                      <ViewingCard key={viewing.id} viewing={viewing} variant="past" onLogOutcome={handleLogOutcome} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Contracts Tab */}
          {activeTab === "contracts" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="font-display text-2xl font-semibold">Contracts</h1>
                <Button variant="gold" onClick={() => setShowCreateContract(true)}>
                  <Plus className="w-4 h-4 mr-2" /> Create Contract
                </Button>
              </div>

              <div className="space-y-4">
                {contracts.map(contract => (
                  <ContractCard key={contract.id} contract={contract} onSendForSignature={(id) => {
                    setContracts(contracts.map(c => c.id === id ? { ...c, status: "pending_signature" } : c));
                    toast.success("Contract sent for signature");
                  }} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="font-display text-2xl font-semibold mb-4">Settings</h1>
              <p className="text-muted-foreground">Settings page coming soon...</p>
            </motion.div>
          )}
        </div>
      </main>

      <AddPropertyModal open={showAddProperty} onClose={() => setShowAddProperty(false)} onAdd={(p) => setProperties([p, ...properties])} />
      <ScheduleViewingModal open={showScheduleViewing} onClose={() => setShowScheduleViewing(false)} onSchedule={(v) => setViewings([v, ...viewings])} properties={properties} />
      <CreateContractModal open={showCreateContract} onClose={() => setShowCreateContract(false)} onCreate={(c) => setContracts([c, ...contracts])} properties={properties} />
    </div>
  );
};

export default AgentDashboard;