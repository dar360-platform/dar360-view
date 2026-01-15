import { Property, Viewing, Contract } from "@/components/dashboard";

// Extended property type with tenant and history
export interface AgentPropertyWithDetails extends Property {
  tenant?: {
    name: string;
    email: string;
    phone: string;
    moveInDate?: string;
    leaseEnd?: string;
  };
  history?: {
    date: string;
    action: string;
    details: string;
    actor?: string;
  }[];
}

// Dummy properties data
export const dummyProperties: AgentPropertyWithDetails[] = [
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
    owner: { name: "Ahmed Al Maktoum", email: "ahmed@email.com", phone: "+971501234567" },
    viewingsCount: 8,
    createdAt: "2024-12-15",
    history: [
      { date: "Dec 28, 2024", action: "Viewing completed", details: "Anna Williams - Interested", actor: "Agent" },
      { date: "Dec 25, 2024", action: "Viewing scheduled", details: "Anna Williams requested viewing", actor: "System" },
      { date: "Dec 15, 2024", action: "Listed for rent", details: "Property listed at AED 120,000/year", actor: "Agent" },
      { date: "Dec 10, 2024", action: "Property added", details: "Owner Ahmed Al Maktoum added property", actor: "Agent" },
    ],
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
    owner: { name: "Sara Hassan", email: "sara@email.com", phone: "+971502345678" },
    viewingsCount: 12,
    createdAt: "2024-12-10",
    tenant: {
      name: "Lisa Anderson",
      email: "lisa@email.com",
      phone: "+971557890123",
      moveInDate: "2025-01-15",
      leaseEnd: "2026-01-14",
    },
    history: [
      { date: "Dec 28, 2024", action: "Contract sent", details: "Awaiting tenant signature", actor: "Agent" },
      { date: "Dec 26, 2024", action: "Application approved", details: "Lisa Anderson approved by owner", actor: "Owner" },
      { date: "Dec 22, 2024", action: "Application received", details: "Lisa Anderson applied for property", actor: "System" },
      { date: "Dec 10, 2024", action: "Listed for rent", details: "Property listed at AED 280,000/year", actor: "Agent" },
    ],
  },
  {
    id: "prop-003",
    title: "Palm Jumeirah Villa",
    building: "Garden Homes Frond M",
    unit: "V12",
    area: "Palm Jumeirah",
    type: "villa",
    beds: 5,
    baths: 6,
    sqft: 5500,
    rent: 750000,
    cheques: 1,
    deposit: 75000,
    status: "available",
    images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800"],
    owner: { name: "Khalid Omar", email: "khalid@email.com", phone: "+971503456789" },
    viewingsCount: 3,
    createdAt: "2024-12-20",
    history: [
      { date: "Dec 23, 2024", action: "Viewing scheduled", details: "Michael Brown - Family of 6", actor: "System" },
      { date: "Dec 20, 2024", action: "Listed for rent", details: "Luxury villa listed at AED 750,000/year", actor: "Agent" },
    ],
  },
  {
    id: "prop-004",
    title: "JBR Studio",
    building: "Sadaf 7",
    unit: "812",
    area: "JBR",
    type: "studio",
    beds: 0,
    baths: 1,
    sqft: 550,
    rent: 65000,
    cheques: 6,
    deposit: 5000,
    status: "rented",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"],
    owner: { name: "Fatima Al Ali", email: "fatima@email.com", phone: "+971504567890" },
    viewingsCount: 15,
    createdAt: "2024-11-28",
    tenant: {
      name: "James Wilson",
      email: "james@email.com",
      phone: "+971556789012",
      moveInDate: "2024-12-01",
      leaseEnd: "2025-11-30",
    },
    history: [
      { date: "Dec 1, 2024", action: "Tenant moved in", details: "James Wilson moved in", actor: "System" },
      { date: "Nov 28, 2024", action: "Contract signed", details: "All parties signed the contract", actor: "System" },
      { date: "Nov 25, 2024", action: "Contract created", details: "1-year lease at AED 65,000/year", actor: "Agent" },
      { date: "Nov 20, 2024", action: "Application approved", details: "James Wilson approved by owner", actor: "Owner" },
    ],
  },
];

// Dummy viewings data
export const dummyViewings: Viewing[] = [
  {
    id: "view-001",
    propertyId: "prop-001",
    propertyTitle: "Marina Heights Tower - Unit 1204",
    propertyArea: "Dubai Marina",
    tenantName: "John Smith",
    tenantPhone: "+971551234567",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0], // Tomorrow
    time: "10:00 AM",
    outcome: "pending",
    notes: "Interested in long-term lease",
  },
  {
    id: "view-002",
    propertyId: "prop-002",
    propertyTitle: "Boulevard Point - Unit 3502",
    propertyArea: "Downtown Dubai",
    tenantName: "Emily Chen",
    tenantPhone: "+971552345678",
    date: new Date(Date.now() + 172800000).toISOString().split("T")[0], // Day after tomorrow
    time: "2:00 PM",
    outcome: "pending",
  },
  {
    id: "view-003",
    propertyId: "prop-003",
    propertyTitle: "Garden Homes Frond M - V12",
    propertyArea: "Palm Jumeirah",
    tenantName: "Michael Brown",
    tenantPhone: "+971553456789",
    date: new Date(Date.now() + 259200000).toISOString().split("T")[0], // 3 days from now
    time: "11:00 AM",
    outcome: "pending",
    notes: "Family of 6, looking for spacious villa",
  },
  {
    id: "view-004",
    propertyId: "prop-001",
    propertyTitle: "Marina Heights Tower - Unit 1204",
    propertyArea: "Dubai Marina",
    tenantName: "Anna Williams",
    tenantPhone: "+971554567890",
    date: new Date(Date.now() - 172800000).toISOString().split("T")[0], // 2 days ago
    time: "3:00 PM",
    outcome: "interested",
    notes: "Wants to proceed with 4 cheque option",
  },
  {
    id: "view-005",
    propertyId: "prop-004",
    propertyTitle: "Sadaf 7 - Unit 812",
    propertyArea: "JBR",
    tenantName: "David Lee",
    tenantPhone: "+971555678901",
    date: new Date(Date.now() - 432000000).toISOString().split("T")[0], // 5 days ago
    time: "4:00 PM",
    outcome: "not_interested",
    notes: "Looking for something bigger",
  },
];

// Dummy contracts data
export const dummyContracts: Contract[] = [
  {
    id: "cont-001",
    propertyId: "prop-004",
    propertyTitle: "Sadaf 7 - Unit 812, JBR",
    tenantName: "James Wilson",
    tenantEmail: "james@email.com",
    tenantPhone: "+971556789012",
    startDate: "2024-12-01",
    endDate: "2025-11-30",
    rent: 65000,
    cheques: 6,
    deposit: 5000,
    status: "signed",
    signedAt: "2024-11-28T14:30:00Z",
    pdfUrl: "#",
    createdAt: "2024-11-25",
  },
  {
    id: "cont-002",
    propertyId: "prop-002",
    propertyTitle: "Boulevard Point - Unit 3502, Downtown",
    tenantName: "Lisa Anderson",
    tenantEmail: "lisa@email.com",
    tenantPhone: "+971557890123",
    startDate: "2025-01-15",
    endDate: "2026-01-14",
    rent: 280000,
    cheques: 2,
    deposit: 25000,
    status: "pending_signature",
    createdAt: "2024-12-20",
  },
  {
    id: "cont-003",
    propertyId: "prop-001",
    propertyTitle: "Marina Heights Tower - Unit 1204",
    tenantName: "Robert Johnson",
    tenantEmail: "robert@email.com",
    tenantPhone: "+971558901234",
    startDate: "2025-02-01",
    endDate: "2026-01-31",
    rent: 120000,
    cheques: 4,
    deposit: 10000,
    status: "draft",
    createdAt: "2024-12-22",
  },
];