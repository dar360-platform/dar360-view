import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";

// Feature Pages
import { AgentAuth } from "./features/agent/pages/AgentAuth";
import { AgentDashboard } from "./features/agent/pages/AgentDashboard";
import { OwnerAuth } from "./features/owner/pages/OwnerAuth";
import { OwnerDashboard } from "./features/owner/pages/OwnerDashboard";
import { TenantAuth } from "./features/tenant/pages/TenantAuth";
import { TenantDashboard } from "./features/tenant/pages/TenantDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing */}
          <Route path="/" element={<Index />} />
          
          {/* Role Selection */}
          <Route path="/auth" element={<AuthPage />} />
          
          {/* Agent Routes */}
          <Route path="/agent/auth" element={<AgentAuth />} />
          <Route path="/agent/dashboard" element={<AgentDashboard />} />
          
          {/* Owner Routes */}
          <Route path="/owner/auth" element={<OwnerAuth />} />
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          
          {/* Tenant Routes */}
          <Route path="/tenant/auth" element={<TenantAuth />} />
          <Route path="/tenant/dashboard" element={<TenantDashboard />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
      <SpeedInsights />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
