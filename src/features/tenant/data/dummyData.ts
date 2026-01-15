import { Property, Viewing, Contract } from "@/components/dashboard";

// Extended property type with history
export interface PropertyWithHistory extends Property {
  history?: {
    date: string;
    action: string;
    details: string;
  }[];
}

// Available properties for tenant to browse
export const availableProperties: PropertyWithHistory[] = [
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
    agent: { name: "Ahmed Khan", email: "ahmed.khan@dar360.ae", phone: "+971501234567", company: "Dar360 Real Estate", rating: 4.8 },
    viewingsCount: 8,
    createdAt: "2024-12-15",
    history: [
      { date: "Dec 15, 2024", action: "Listed for rent", details: "Property listed at AED 120,000/year" },
      { date: "Dec 10, 2024", action: "Renovation completed", details: "Kitchen and bathrooms renovated" },
      { date: "Nov 1, 2024", action: "Previous lease ended", details: "Previous tenant moved out" },
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
    status: "available",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"],
    owner: { name: "Sara Hassan", email: "sara@email.com", phone: "+971502345678" },
    agent: { name: "Sara Mohammed", email: "sara.m@dar360.ae", phone: "+971559876543", company: "Dar360 Real Estate", rating: 4.6 },
    viewingsCount: 12,
    createdAt: "2024-12-10",
    history: [
      { date: "Dec 10, 2024", action: "Listed for rent", details: "Property listed at AED 280,000/year" },
      { date: "Dec 5, 2024", action: "Price reduced", details: "Price reduced from AED 300,000 to AED 280,000" },
      { date: "Nov 20, 2024", action: "Professional photos", details: "Property photographed for listing" },
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
    agent: { name: "Ahmed Khan", email: "ahmed.khan@dar360.ae", phone: "+971501234567", company: "Dar360 Real Estate", rating: 4.8 },
    viewingsCount: 3,
    createdAt: "2024-12-20",
    history: [
      { date: "Dec 20, 2024", action: "Listed for rent", details: "Luxury villa listed at AED 750,000/year" },
      { date: "Dec 18, 2024", action: "Pool maintenance", details: "Annual pool and garden maintenance completed" },
    ],
  },
  {
    id: "prop-005",
    title: "JLT Lake View",
    building: "Jumeirah Bay X1",
    unit: "2205",
    area: "JLT",
    type: "apartment",
    beds: 1,
    baths: 1,
    sqft: 850,
    rent: 75000,
    cheques: 4,
    deposit: 6000,
    status: "available",
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"],
    owner: { name: "Mohammed Ali", email: "mohammed@email.com", phone: "+971505678901" },
    agent: { name: "Fatima Al Zahra", email: "fatima@dar360.ae", phone: "+971507778888", company: "Dar360 Real Estate", rating: 4.9 },
    viewingsCount: 6,
    createdAt: "2024-12-18",
    history: [
      { date: "Dec 18, 2024", action: "Listed for rent", details: "Property listed at AED 75,000/year" },
      { date: "Dec 15, 2024", action: "Deep cleaning", details: "Professional cleaning completed" },
    ],
  },
  {
    id: "prop-006",
    title: "Business Bay Studio",
    building: "Executive Towers",
    unit: "1806",
    area: "Business Bay",
    type: "studio",
    beds: 0,
    baths: 1,
    sqft: 480,
    rent: 55000,
    cheques: 6,
    deposit: 4500,
    status: "available",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"],
    owner: { name: "Layla Ahmed", email: "layla@email.com", phone: "+971506789012" },
    agent: { name: "Sara Mohammed", email: "sara.m@dar360.ae", phone: "+971559876543", company: "Dar360 Real Estate", rating: 4.6 },
    viewingsCount: 10,
    createdAt: "2024-12-22",
    history: [
      { date: "Dec 22, 2024", action: "Listed for rent", details: "Studio listed at AED 55,000/year" },
      { date: "Dec 20, 2024", action: "New appliances", details: "New AC and kitchen appliances installed" },
    ],
  },
];

// Tenant's scheduled/completed viewings
export const tenantViewings: Viewing[] = [
  {
    id: "tv-001",
    propertyId: "prop-001",
    propertyTitle: "Marina Heights Tower - Unit 1204",
    propertyArea: "Dubai Marina",
    tenantName: "You",
    tenantPhone: "+971551234567",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    time: "10:00 AM",
    outcome: "pending",
    notes: "Scheduled viewing",
  },
  {
    id: "tv-002",
    propertyId: "prop-003",
    propertyTitle: "Garden Homes Frond M - V12",
    propertyArea: "Palm Jumeirah",
    tenantName: "You",
    tenantPhone: "+971551234567",
    date: new Date(Date.now() + 259200000).toISOString().split("T")[0],
    time: "2:00 PM",
    outcome: "pending",
  },
  {
    id: "tv-003",
    propertyId: "prop-002",
    propertyTitle: "Boulevard Point - Unit 3502",
    propertyArea: "Downtown Dubai",
    tenantName: "You",
    tenantPhone: "+971551234567",
    date: new Date(Date.now() - 172800000).toISOString().split("T")[0],
    time: "11:00 AM",
    outcome: "interested",
    notes: "Really liked the view, considering offer",
  },
];

// Tenant's contracts (pending signature or signed)
export const tenantContracts: Contract[] = [
  {
    id: "tc-001",
    propertyId: "prop-002",
    propertyTitle: "Boulevard Point - Unit 3502, Downtown",
    tenantName: "John Smith",
    tenantEmail: "john@email.com",
    tenantPhone: "+971551234567",
    startDate: "2025-02-01",
    endDate: "2026-01-31",
    rent: 280000,
    cheques: 2,
    deposit: 25000,
    status: "pending_signature",
    createdAt: "2024-12-28",
  },
];

// Application statuses for tenant
export interface Application {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyArea: string;
  propertyImage?: string;
  status: "pending" | "approved" | "rejected" | "withdrawn";
  appliedAt: string;
  agentName: string;
  agentPhone: string;
  rent: number;
  notes?: string;
}

export const tenantApplications: Application[] = [
  {
    id: "app-001",
    propertyId: "prop-002",
    propertyTitle: "Boulevard Point - Unit 3502",
    propertyArea: "Downtown Dubai",
    propertyImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    status: "approved",
    appliedAt: "2024-12-25",
    agentName: "Ahmed Khan",
    agentPhone: "+971501234567",
    rent: 280000,
    notes: "Contract ready for signature",
  },
  {
    id: "app-002",
    propertyId: "prop-001",
    propertyTitle: "Marina Heights Tower - Unit 1204",
    propertyArea: "Dubai Marina",
    propertyImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
    status: "pending",
    appliedAt: "2024-12-28",
    agentName: "Ahmed Khan",
    agentPhone: "+971501234567",
    rent: 120000,
  },
];
