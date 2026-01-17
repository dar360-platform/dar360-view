import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Bed, Bath, Home, ArrowLeft, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

// Dummy properties data
const properties = [
  {
    id: "1",
    title: "Luxury Marina Apartment",
    location: "Dubai Marina",
    price: 120000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    type: "Apartment",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
    available: true,
  },
  {
    id: "2",
    title: "Downtown Studio",
    location: "Downtown Dubai",
    price: 75000,
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    type: "Studio",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    available: true,
  },
  {
    id: "3",
    title: "JBR Beachfront Villa",
    location: "JBR",
    price: 280000,
    bedrooms: 4,
    bathrooms: 3,
    area: 3500,
    type: "Villa",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
    available: true,
  },
  {
    id: "4",
    title: "Business Bay Loft",
    location: "Business Bay",
    price: 95000,
    bedrooms: 1,
    bathrooms: 1,
    area: 850,
    type: "Loft",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    available: true,
  },
  {
    id: "5",
    title: "Palm Jumeirah Penthouse",
    location: "Palm Jumeirah",
    price: 450000,
    bedrooms: 5,
    bathrooms: 4,
    area: 5200,
    type: "Penthouse",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
    available: true,
  },
  {
    id: "6",
    title: "Arabian Ranches Family Home",
    location: "Arabian Ranches",
    price: 180000,
    bedrooms: 3,
    bathrooms: 2,
    area: 2800,
    type: "Townhouse",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
    available: true,
  },
];

const BrowseProperties = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [bedroomFilter, setBedroomFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  const filteredProperties = properties.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter === "all" || property.location === locationFilter;
    const matchesBedrooms = bedroomFilter === "all" || property.bedrooms.toString() === bedroomFilter;
    const matchesPrice = priceFilter === "all" ||
      (priceFilter === "low" && property.price < 100000) ||
      (priceFilter === "mid" && property.price >= 100000 && property.price < 200000) ||
      (priceFilter === "high" && property.price >= 200000);
    return matchesSearch && matchesLocation && matchesBedrooms && matchesPrice;
  });

  const locations = [...new Set(properties.map(p => p.location))];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="text-foreground"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-display font-semibold text-foreground">Browse Properties</h1>
                <p className="text-sm text-muted-foreground">{filteredProperties.length} properties available</p>
              </div>
            </div>
            <Button onClick={() => navigate("/tenant/auth")} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Sign In to Apply
            </Button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={bedroomFilter} onValueChange={setBedroomFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <Bed className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Beds</SelectItem>
                <SelectItem value="1">1 Bed</SelectItem>
                <SelectItem value="2">2 Beds</SelectItem>
                <SelectItem value="3">3 Beds</SelectItem>
                <SelectItem value="4">4+ Beds</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Price</SelectItem>
                <SelectItem value="low">Under 100K</SelectItem>
                <SelectItem value="mid">100K - 200K</SelectItem>
                <SelectItem value="high">Above 200K</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <main className="container mx-auto px-4 py-8">
        {filteredProperties.length === 0 ? (
          <div className="text-center py-16">
            <Home className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No properties found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="relative">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                      {property.type}
                    </Badge>
                    <button className="absolute top-3 right-3 p-2 rounded-full bg-background/80 hover:bg-background transition-colors">
                      <Heart className="w-4 h-4 text-muted-foreground hover:text-red-500" />
                    </button>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground line-clamp-1">{property.title}</h3>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.location}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        {property.bedrooms}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="w-4 h-4" />
                        {property.bathrooms}
                      </span>
                      <span>{property.area} sqft</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-primary">
                          AED {property.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-muted-foreground">/year</span>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => navigate("/tenant/auth")}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BrowseProperties;
