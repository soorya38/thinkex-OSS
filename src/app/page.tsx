"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { FourWays } from "@/components/landing/FourWays";
import { ThreeSteps } from "@/components/landing/ThreeSteps";
import { Comparison } from "@/components/landing/Comparison";
import { Pricing } from "@/components/landing/Pricing";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { SEO } from "@/components/seo/SEO";

export default function LandingPage() {
  return (
    <>
      <SEO
        title="ThinkEx"
        description="Study and work with information effortlessly."
        keywords="AI workspace, productivity, collaboration, artificial intelligence, workspace tools, ThinkEx, AI assistant, creative workspace"
        url="https://thinkex.app"
        canonical="https://thinkex.app"
      />
      <div
        className="relative min-h-screen bg-background"
        style={{ fontFamily: 'var(--font-outfit)' }}
      >
        {/* Grid Background (static) */}
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-0 opacity-55 pointer-events-none"
        >
          {/* Grid Pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Navbar />
          <Hero />
          <FourWays />
          <ThreeSteps />
          <Comparison />
          <Pricing />
          <FinalCTA />
          <Footer />
        </div>
      </div>
    </>
  );
}
