"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 md:py-24 sm:px-6 lg:px-8"
    >
      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="space-y-8 md:space-y-12 text-center">
          {/* Backed by Section */}
          <a
            href="https://www.hatchery.umd.edu/about-mokhtarzadas"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-base md:text-lg text-muted-foreground mb-2 md:mb-4 hover:text-foreground transition-colors cursor-pointer"
          >
            <Image
              src="/hatchery.png"
              alt="Mokhtarzada Hatchery"
              width={140}
              height={28}
              className="h-6 md:h-7 w-auto"
            />
            <span>Mokhtarzada Hatchery 2025 Cohort</span>
          </a>

          {/* Header - Above Video */}
          <h1 className="mt-4 md:mt-12 text-4xl font-normal tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Turn{" "}
            <span className="relative inline-block">
              <span className="relative px-3 py-0.5 rounded-sm inline-block">
                <span
                  className="absolute inset-0 rounded-sm border-4"
                  style={{
                    background: "rgba(252, 211, 77, 0.15)",
                    borderColor: "#EAB308",
                    boxShadow: "0 0 0 1px rgba(234, 179, 8, 0.3)",
                    left: "2px",
                  }}
                />
                <span className="relative z-10">value from AI</span>
              </span>
            </span>{" "}
            into
            <br />
            organized knowledge
          </h1>

          {/* Get Started Button - Above Video */}
          <div className="flex justify-center">
            <Link href="/guest-setup">
              <Button
                size="lg"
                className="h-12 rounded-md bg-foreground px-8 text-base font-medium text-background transition-all hover:bg-foreground/90"
              >
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Demo Image - Only visible on mobile */}
          <div className="relative w-full md:hidden">
            <div className="relative w-full max-w-md mx-auto px-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border border-foreground/20 shadow-2xl">
                <Image
                  src="/demo.png"
                  alt="ThinkEx Demo"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Desktop Demo Image - Hidden on mobile */}
          <div className="relative w-full hidden md:block">
            <div className="relative w-full max-w-5xl mx-auto px-4">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md border border-foreground/20 shadow-2xl">
                <Image
                  src="/demo.png"
                  alt="ThinkEx Demo"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
