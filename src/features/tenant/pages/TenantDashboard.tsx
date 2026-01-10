import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Calendar,
  FileText,
  Heart,
  Building2,
  Filter,
  SlidersHorizontal,
  ClipboardList,
  Eye,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  StatsCard,
  TenantPropertyCard,
  ViewingCard,
  ContractCard,
  EmptyState,
  Property,
  Viewing,
  Contract,
} from "@/components/dashboard";
import {
  TenantSidebar,
  PropertyDetailsModal,
  RequestViewingModal,
  SignContractModal,
  ApplicationCard,
  TenantSettings,
} from "../components";
import {
  availableProperties,
  tenantViewings,
  tenantContracts,
  tenantApplications,
  Application,
} from "../data/dummyData";
import { toast } from "sonner";

type Tab = "overview" | "browse" | "saved" | "viewings" | "applications" | "contracts" | "settings";

export const TenantDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [properties] = useState<Property[]>(availableProperties);
  const [viewings, setViewings] = useState<Viewing[]>(tenantViewings);
  const [contracts, setContracts] = useState<Contract[]>(tenantContracts);
  const [applications, setApplications] = useState<Application[]>(tenantApplications);
  const [savedProperties, setSavedProperties] = useState<string[]>(["prop-001"]);
  
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showPropertyDetails, setShowPropertyDetails] = useState(false);
  const [showRequestViewing, setShowRequestViewing] = useState(false);
  const [showSignContract, setShowSignContract] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [areaFilter, setAreaFilter] = useState<string>("all");
  const [bedsFilter, setBedsFilter] = useState<string>("all");

  const stats = {
    savedProperties: savedProperties.length,
    upcomingViewings: viewings.filter(v => new Date(v.date) >= new Date()).length,
    pendingApplications: applications.filter(a => a.status === "pending").length,
    activeContracts: contracts.filter(c => c.status === "signed" || c.status === "pending_signature").length,
  };

  const filteredProperties = properties.filter(p => {
    const matchesSearch = p.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.area.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArea = areaFilter === "all" || p.area === areaFilter;
    const matchesBeds = bedsFilter === "all" || 
      (bedsFilter === "studio" && p.beds === 0) ||
      (bedsFilter === "1" && p.beds === 1) ||
      (bedsFilter === "2" && p.beds === 2) ||
      (bedsFilter === "3+" && p.beds >= 3);
    return matchesSearch && matchesArea && matchesBeds;
  });

  const savedPropertyList = properties.filter(p => savedProperties.includes(p.id));
  const upcomingViewings = viewings.filter(v => new Date(v.date) >= new Date());
  const pastViewings = viewings.filter(v => new Date(v.date) < new Date());

  const areas = [...new Set(properties.map(p => p.area))];

  const handleViewProperty = (id: string) => {
    const property = properties.find(p => p.id === id);
    if (property) {
      setSelectedProperty(property);
      setShowPropertyDetails(true);
    }
  };

  const handleSaveProperty = (id: string) => {
    if (savedProperties.includes(id)) {
      setSavedProperties(savedProperties.filter(pid => pid !== id));
      toast.success("Removed from saved");
    } else {
      setSavedProperties([...savedProperties, id]);
      toast.success("Added to saved");
    }
  };

  const handleRequestViewing = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId);
    if (property) {
      setSelectedProperty(property);
      setShowPropertyDetails(false);
      setShowRequestViewing(true);
    }
  };

  const handleViewingRequest = (data: { propertyId: string; date: string; time: string; notes?: string }) => {
    const property = properties.find(p => p.id === data.propertyId);
    if (!property) return;

    const newViewing: Viewing = {
      id: `tv-${Date.now()}`,
      propertyId: data.propertyId,
      propertyTitle: `${property.building} - Unit ${property.unit}`,
      propertyArea: property.area,
      tenantName: "You",
      tenantPhone: "+971551234567",
      date: data.date,
      time: data.time,
      outcome: "pending",
      notes: data.notes,
    };
    setViewings([newViewing, ...viewings]);
  };

  const handleSignContract = (contractId: string) => {
    setContracts(contracts.map(c => 
      c.id === contractId 
        ? { ...c, status: "signed" as const, signedAt: new Date().toISOString() }
        : c
    ));
    toast.success("Contract signed successfully!");
  };

  const handleWithdrawApplication = (id: string) => {
    setApplications(applications.map(a => 
      a.id === id ? { ...a, status: "withdrawn" as const } : a
    ));
    toast.success("Application withdrawn");
  };

  return (
    <div className="min-h-screen bg-background flex">
      <TenantSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 lg:ml-0 pt-14 lg:pt-0">
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div>
                <h1 className="font-display text-2xl font-semibold">Welcome back, John</h1>
                <p className="text-muted-foreground">Find your perfect home in Dubai</p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard title="Saved Properties" value={stats.savedProperties} icon={Heart} />
                <StatsCard title="Upcoming Viewings" value={stats.upcomingViewings} icon={Calendar} variant="accent" />
                <StatsCard title="Pending Applications" value={stats.pendingApplications} icon={ClipboardList} variant="warning" />
                <StatsCard title="Active Contracts" value={stats.activeContracts} icon={FileText} variant="success" />
              </div>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-2 gap-4">
                <div 
                  className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-xl p-5 cursor-pointer hover:border-accent/40 transition-colors"
                  onClick={() => setActiveTab("browse")}
                >
                  <Search className="w-8 h-8 text-accent mb-3" />
                  <h3 className="font-display font-semibold text-lg">Browse Properties</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Discover {properties.length} available properties across Dubai
                  </p>
                </div>
                <div 
                  className="bg-card border border-border/50 rounded-xl p-5 cursor-pointer hover:border-accent/40 transition-colors"
                  onClick={() => setActiveTab("viewings")}
                >
                  <Calendar className="w-8 h-8 text-muted-foreground mb-3" />
                  <h3 className="font-display font-semibold text-lg">My Viewings</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {stats.upcomingViewings} upcoming viewings scheduled
                  </p>
                </div>
              </div>

              {/* Upcoming Viewings */}
              {upcomingViewings.length > 0 && (
                <div className="bg-card border border-border/50 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display font-semibold">Upcoming Viewings</h2>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("viewings")}>View All</Button>
                  </div>
                  <div className="space-y-3">
                    {upcomingViewings.slice(0, 2).map(viewing => (
                      <ViewingCard key={viewing.id} viewing={viewing} variant="upcoming" />
                    ))}
                  </div>
                </div>
              )}

              {/* Pending Contracts */}
              {contracts.filter(c => c.status === "pending_signature").length > 0 && (
                <div className="bg-card border border-border/50 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display font-semibold">Contracts Awaiting Signature</h2>
                  </div>
                  <div className="space-y-3">
                    {contracts.filter(c => c.status === "pending_signature").map(contract => (
                      <div key={contract.id} className="flex items-center justify-between p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-amber-600" />
                          <div>
                            <p className="font-medium">{contract.propertyTitle}</p>
                            <p className="text-sm text-muted-foreground">Ready for signature</p>
                          </div>
                        </div>
                        <Button variant="gold" size="sm" onClick={() => {
                          setSelectedContract(contract);
                          setShowSignContract(true);
                        }}>
                          Sign Now
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Browse Tab */}
          {activeTab === "browse" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div>
                <h1 className="font-display text-2xl font-semibold">Browse Properties</h1>
                <p className="text-muted-foreground">Find your next home</p>
              </div>

              {/* Search & Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by building or area..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={areaFilter} onValueChange={setAreaFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <MapPin className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Areas</SelectItem>
                    {areas.map(area => (
                      <SelectItem key={area} value={area}>{area}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={bedsFilter} onValueChange={setBedsFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Beds" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="1">1 Bed</SelectItem>
                    <SelectItem value="2">2 Beds</SelectItem>
                    <SelectItem value="3+">3+ Beds</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <p className="text-sm text-muted-foreground">{filteredProperties.length} properties found</p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProperties.map(property => (
                  <TenantPropertyCard
                    key={property.id}
                    property={property}
                    onView={handleViewProperty}
                    onSave={handleSaveProperty}
                    isSaved={savedProperties.includes(property.id)}
                  />
                ))}
              </div>

              {filteredProperties.length === 0 && (
                <EmptyState
                  icon={Building2}
                  title="No properties found"
                  description="Try adjusting your search or filters"
                />
              )}
            </motion.div>
          )}

          {/* Saved Tab */}
          {activeTab === "saved" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h1 className="font-display text-2xl font-semibold">Saved Properties</h1>

              {savedPropertyList.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {savedPropertyList.map(property => (
                    <TenantPropertyCard
                      key={property.id}
                      property={property}
                      onView={handleViewProperty}
                      onSave={handleSaveProperty}
                      isSaved={true}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={Heart}
                  title="No saved properties"
                  description="Save properties while browsing to view them here"
                  action={{ label: "Browse Properties", onClick: () => setActiveTab("browse") }}
                />
              )}
            </motion.div>
          )}

          {/* Viewings Tab */}
          {activeTab === "viewings" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h1 className="font-display text-2xl font-semibold">My Viewings</h1>

              <div className="space-y-6">
                <div>
                  <h2 className="font-medium text-sm text-muted-foreground uppercase tracking-wider mb-3">Upcoming</h2>
                  <div className="space-y-3">
                    {upcomingViewings.length > 0 ? (
                      upcomingViewings.map(viewing => (
                        <ViewingCard key={viewing.id} viewing={viewing} variant="upcoming" />
                      ))
                    ) : (
                      <EmptyState
                        icon={Calendar}
                        title="No upcoming viewings"
                        description="Request a viewing from a property you like"
                        action={{ label: "Browse Properties", onClick: () => setActiveTab("browse") }}
                      />
                    )}
                  </div>
                </div>

                {pastViewings.length > 0 && (
                  <div>
                    <h2 className="font-medium text-sm text-muted-foreground uppercase tracking-wider mb-3">Past Viewings</h2>
                    <div className="space-y-3">
                      {pastViewings.map(viewing => (
                        <ViewingCard key={viewing.id} viewing={viewing} variant="past" />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Applications Tab */}
          {activeTab === "applications" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h1 className="font-display text-2xl font-semibold">My Applications</h1>

              {applications.length > 0 ? (
                <div className="space-y-4">
                  {applications.map(application => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                      onViewContract={(id) => {
                        const app = applications.find(a => a.id === id);
                        if (app) {
                          const contract = contracts.find(c => c.propertyId === app.propertyId);
                          if (contract) {
                            setSelectedContract(contract);
                            setShowSignContract(true);
                          }
                        }
                      }}
                      onWithdraw={handleWithdrawApplication}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={ClipboardList}
                  title="No applications yet"
                  description="Apply for properties after scheduling viewings"
                  action={{ label: "Browse Properties", onClick: () => setActiveTab("browse") }}
                />
              )}
            </motion.div>
          )}

          {/* Contracts Tab */}
          {activeTab === "contracts" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h1 className="font-display text-2xl font-semibold">My Contracts</h1>

              {contracts.length > 0 ? (
                <div className="space-y-4">
                  {contracts.map(contract => (
                    <ContractCard
                      key={contract.id}
                      contract={contract}
                      variant="owner"
                      onView={(id) => {
                        const c = contracts.find(c => c.id === id);
                        if (c && c.status === "pending_signature") {
                          setSelectedContract(c);
                          setShowSignContract(true);
                        }
                      }}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={FileText}
                  title="No contracts yet"
                  description="Contracts will appear here once you're approved for a property"
                />
              )}
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && <TenantSettings />}
        </div>
      </main>

      <PropertyDetailsModal
        property={selectedProperty}
        open={showPropertyDetails}
        onClose={() => setShowPropertyDetails(false)}
        onRequestViewing={handleRequestViewing}
        onSave={handleSaveProperty}
        isSaved={selectedProperty ? savedProperties.includes(selectedProperty.id) : false}
      />

      <RequestViewingModal
        property={selectedProperty}
        open={showRequestViewing}
        onClose={() => setShowRequestViewing(false)}
        onRequest={handleViewingRequest}
      />

      <SignContractModal
        contract={selectedContract}
        open={showSignContract}
        onClose={() => setShowSignContract(false)}
        onSign={handleSignContract}
      />
    </div>
  );
};

export default TenantDashboard;
