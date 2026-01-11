import { motion } from "framer-motion";
import {
  TrendingUp,
  Eye,
  Share2,
  MousePointer,
  Building2,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const viewingData = [
  { month: "Oct", viewings: 12, interested: 5 },
  { month: "Nov", viewings: 18, interested: 8 },
  { month: "Dec", viewings: 24, interested: 12 },
  { month: "Jan", viewings: 28, interested: 15 },
];

const shareData = [
  { property: "Marina Heights", opens: 45, inquiries: 12 },
  { property: "Boulevard Point", opens: 38, inquiries: 8 },
  { property: "Palm Villa", opens: 22, inquiries: 5 },
  { property: "JBR Studio", opens: 56, inquiries: 18 },
];

const topProperties = [
  { name: "JBR Studio - 812", views: 156, shares: 42, inquiries: 18, trend: "up" },
  { name: "Marina Heights - 1204", views: 124, shares: 35, inquiries: 12, trend: "up" },
  { name: "Boulevard Point - 3502", views: 98, shares: 28, inquiries: 8, trend: "down" },
  { name: "Palm Villa - V12", views: 67, shares: 15, inquiries: 5, trend: "up" },
];

export const AnalyticsDashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="font-display text-2xl font-semibold">Analytics</h1>
        <p className="text-muted-foreground">
          Track engagement and performance metrics
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Eye className="w-5 h-5 text-muted-foreground" />
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +24%
            </Badge>
          </div>
          <p className="text-2xl font-display font-semibold">445</p>
          <p className="text-sm text-muted-foreground">Total Link Opens</p>
        </div>
        <div className="bg-card border border-border/50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Share2 className="w-5 h-5 text-muted-foreground" />
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +18%
            </Badge>
          </div>
          <p className="text-2xl font-display font-semibold">120</p>
          <p className="text-sm text-muted-foreground">WhatsApp Shares</p>
        </div>
        <div className="bg-card border border-border/50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <MousePointer className="w-5 h-5 text-muted-foreground" />
            <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20">
              <ArrowDownRight className="w-3 h-3 mr-1" />
              -5%
            </Badge>
          </div>
          <p className="text-2xl font-display font-semibold">43</p>
          <p className="text-sm text-muted-foreground">Inquiries</p>
        </div>
        <div className="bg-card border border-border/50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +32%
            </Badge>
          </div>
          <p className="text-2xl font-display font-semibold">82</p>
          <p className="text-sm text-muted-foreground">Total Viewings</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <h3 className="font-display font-semibold mb-4">Viewing Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={viewingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="viewings"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--accent))" }}
              />
              <Line
                type="monotone"
                dataKey="interested"
                stroke="hsl(142.1 76.2% 36.3%)"
                strokeWidth={2}
                dot={{ fill: "hsl(142.1 76.2% 36.3%)" }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-muted-foreground">Total Viewings</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-muted-foreground">Interested</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border/50 rounded-xl p-5">
          <h3 className="font-display font-semibold mb-4">Share Performance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={shareData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="property" stroke="hsl(var(--muted-foreground))" fontSize={10} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="opens" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="inquiries" fill="hsl(142.1 76.2% 36.3%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-muted-foreground">Link Opens</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-muted-foreground">Inquiries</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Properties */}
      <div className="bg-card border border-border/50 rounded-xl p-5">
        <h3 className="font-display font-semibold mb-4">Top Performing Properties</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-sm text-muted-foreground border-b border-border/50">
                <th className="text-left py-3 px-2">Property</th>
                <th className="text-center py-3 px-2">Views</th>
                <th className="text-center py-3 px-2">Shares</th>
                <th className="text-center py-3 px-2">Inquiries</th>
                <th className="text-center py-3 px-2">Trend</th>
              </tr>
            </thead>
            <tbody>
              {topProperties.map((property, index) => (
                <tr key={index} className="border-b border-border/50 last:border-0">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{property.name}</span>
                    </div>
                  </td>
                  <td className="text-center py-3 px-2">{property.views}</td>
                  <td className="text-center py-3 px-2">{property.shares}</td>
                  <td className="text-center py-3 px-2">{property.inquiries}</td>
                  <td className="text-center py-3 px-2">
                    {property.trend === "up" ? (
                      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                        <ArrowUpRight className="w-3 h-3" />
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/20">
                        <ArrowDownRight className="w-3 h-3" />
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
