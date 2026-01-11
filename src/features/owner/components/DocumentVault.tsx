import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  Eye,
  Calendar,
  Building2,
  Upload,
  FolderOpen,
  File,
  FileImage,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Document {
  id: string;
  name: string;
  type: "contract" | "noc" | "title_deed" | "ejari" | "other";
  propertyTitle: string;
  uploadDate: string;
  expiryDate?: string;
  size: string;
  url: string;
}

const dummyDocuments: Document[] = [
  {
    id: "doc-001",
    name: "Tenancy Contract - Marina Heights 1204",
    type: "contract",
    propertyTitle: "Marina Heights - 1204",
    uploadDate: "2024-12-01",
    expiryDate: "2025-11-30",
    size: "2.4 MB",
    url: "#",
  },
  {
    id: "doc-002",
    name: "Ejari Certificate - Marina Heights",
    type: "ejari",
    propertyTitle: "Marina Heights - 1204",
    uploadDate: "2024-12-05",
    expiryDate: "2025-11-30",
    size: "156 KB",
    url: "#",
  },
  {
    id: "doc-003",
    name: "Title Deed - Marina Heights",
    type: "title_deed",
    propertyTitle: "Marina Heights - 1204",
    uploadDate: "2023-06-15",
    size: "3.1 MB",
    url: "#",
  },
  {
    id: "doc-004",
    name: "NOC for Renovation",
    type: "noc",
    propertyTitle: "Boulevard Point - 3502",
    uploadDate: "2024-10-20",
    size: "890 KB",
    url: "#",
  },
  {
    id: "doc-005",
    name: "Title Deed - Boulevard Point",
    type: "title_deed",
    propertyTitle: "Boulevard Point - 3502",
    uploadDate: "2022-03-10",
    size: "2.8 MB",
    url: "#",
  },
];

const typeStyles = {
  contract: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  noc: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  title_deed: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  ejari: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  other: "bg-gray-500/10 text-gray-600 border-gray-500/20",
};

const typeLabels = {
  contract: "Contract",
  noc: "NOC",
  title_deed: "Title Deed",
  ejari: "Ejari",
  other: "Other",
};

const typeIcons = {
  contract: FileText,
  noc: File,
  title_deed: FileImage,
  ejari: FileText,
  other: File,
};

export const DocumentVault = () => {
  const [documents] = useState<Document[]>(dummyDocuments);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeType, setActiveType] = useState("all");

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = activeType === "all" || doc.type === activeType;
    return matchesSearch && matchesType;
  });

  const handleDownload = (doc: Document) => {
    toast.success(`Downloading ${doc.name}`);
  };

  const handleUpload = () => {
    toast.info("Upload functionality requires backend integration");
  };

  // Group by property
  const groupedByProperty = filteredDocuments.reduce((acc, doc) => {
    if (!acc[doc.propertyTitle]) {
      acc[doc.propertyTitle] = [];
    }
    acc[doc.propertyTitle].push(doc);
    return acc;
  }, {} as Record<string, Document[]>);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold">Document Vault</h1>
          <p className="text-muted-foreground">
            Access contracts, NOCs, and title deeds
          </p>
        </div>
        <Button variant="gold" onClick={handleUpload}>
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Type Tabs */}
      <Tabs value={activeType} onValueChange={setActiveType}>
        <TabsList>
          <TabsTrigger value="all">All ({documents.length})</TabsTrigger>
          <TabsTrigger value="contract">
            Contracts ({documents.filter((d) => d.type === "contract").length})
          </TabsTrigger>
          <TabsTrigger value="title_deed">
            Title Deeds ({documents.filter((d) => d.type === "title_deed").length})
          </TabsTrigger>
          <TabsTrigger value="ejari">
            Ejari ({documents.filter((d) => d.type === "ejari").length})
          </TabsTrigger>
          <TabsTrigger value="noc">
            NOCs ({documents.filter((d) => d.type === "noc").length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Documents by Property */}
      <div className="space-y-6">
        {Object.entries(groupedByProperty).map(([propertyTitle, docs]) => (
          <div
            key={propertyTitle}
            className="bg-card border border-border/50 rounded-xl p-5"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-muted">
                <Building2 className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="font-display font-semibold">{propertyTitle}</h3>
              <Badge variant="outline">{docs.length} documents</Badge>
            </div>

            <div className="space-y-3">
              {docs.map((doc) => {
                const TypeIcon = typeIcons[doc.type];
                const isExpiringSoon =
                  doc.expiryDate &&
                  new Date(doc.expiryDate) <
                    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

                return (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-background">
                        <TypeIcon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            Uploaded{" "}
                            {new Date(doc.uploadDate).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </span>
                          <span>{doc.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {doc.expiryDate && (
                        <Badge
                          variant="outline"
                          className={cn(
                            isExpiringSoon
                              ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          Expires{" "}
                          {new Date(doc.expiryDate).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </Badge>
                      )}
                      <Badge variant="outline" className={cn(typeStyles[doc.type])}>
                        {typeLabels[doc.type]}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleDownload(doc)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {Object.keys(groupedByProperty).length === 0 && (
          <div className="text-center py-12">
            <FolderOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No documents found</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
