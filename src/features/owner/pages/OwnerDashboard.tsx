import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, Calendar, FileText, Eye, LogOut, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsCard, PropertyCard, ViewingCard, ContractCard, Property, Viewing, Contract } from "@/components/dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import logo from "@/assets/logo.png";

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
  { id: "v1", propertyId: "prop-001", propertyTitle: "Marina Heights - 1204", propertyArea: "Dubai Marina", tenantName: "John S.", tenantPhone: "+971 55***7890", date: new Date(Date.now() - 86400000).toISOString().split("T")[0], time: "10:00 AM", outcome: "interested" },
  { id: "v2", propertyId: "prop-001", propertyTitle: "Marina Heights - 1204", propertyArea: "Dubai Marina", tenantName: "Emily C.", tenantPhone: "+971 55***4567", date: new Date(Date.now() - 172800000).toISOString().split("T")[0], time: "2:00 PM", outcome: "not_interested" },
  { id: "v3", propertyId: "prop-002", propertyTitle: "Boulevard Point - 3502", propertyArea: "Downtown Dubai", tenantName: "Michael B.", tenantPhone: "+971 55***1234", date: new Date(Date.now() + 86400000).toISOString().split("T")[0], time: "11:00 AM", outcome: "pending" },
];

const ownerContracts: Contract[] = [
  { id: "c1", propertyId: "prop-002", propertyTitle: "Boulevard Point - 3502", tenantName: "Lisa Anderson", tenantEmail: "lisa@email.com", tenantPhone: "+971 55***7890", startDate: "2025-01-15", endDate: "2026-01-14", rent: 280000, cheques: 2, deposit: 25000, status: "pending_signature", createdAt: "2024-12-20" },
];

export const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const stats = {
    totalProperties: ownerProperties.length,
    totalViewings: ownerViewings.length,
    interested: ownerViewings.filter(v => v.outcome === "interested").length,
    pendingContracts: ownerContracts.filter(c => c.status === "pending_signature").length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card">
        <div className="container mx-auto px-4 flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Dar360" className="w-8 h-8 object-contain" />
            <span className="font-display text-xl font-semibold">Dar360</span>
            <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full ml-2">Owner</span>
          </Link>
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
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

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="viewings">Viewing History</TabsTrigger>
              <TabsTrigger value="contracts">Contracts</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid md:grid-cols-2 gap-5">
                {ownerProperties.map(property => (
                  <PropertyCard key={property.id} property={property} variant="owner" />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="viewings" className="mt-6 space-y-4">
              {ownerViewings.map(viewing => (
                <ViewingCard key={viewing.id} viewing={viewing} variant="past" />
              ))}
            </TabsContent>

            <TabsContent value="contracts" className="mt-6 space-y-4">
              {ownerContracts.map(contract => (
                <ContractCard key={contract.id} contract={contract} variant="owner" />
              ))}
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default OwnerDashboard;