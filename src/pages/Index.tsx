import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { WhatWeDo } from "@/components/landing/WhatWeDo";
import { WhoWeAre } from "@/components/landing/WhoWeAre";
import { AppShowcase } from "@/components/landing/AppShowcase";
import { AgentLogin } from "@/components/landing/AgentLogin";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <WhatWeDo />
        <WhoWeAre />
        <AppShowcase />
        <AgentLogin />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
