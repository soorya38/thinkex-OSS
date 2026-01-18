"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { SEO } from "@/components/seo/SEO";
import { MobileWarning } from "@/components/ui/MobileWarning";
import { AuthPageBackground } from "@/components/auth/AuthPageBackground";
import { useSession } from "@/lib/auth-client";
import { WorkspaceProvider, useWorkspaceContext } from "@/contexts/WorkspaceContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import { HomeLayout } from "@/components/layout/HomeLayout";
import { HomeContent } from "@/components/home/HomeContent";
import { useUIStore } from "@/lib/stores/ui-store";

// Component to handle anonymous users - redirect to guest-setup if no session
function AnonymousSessionHandler({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If no session and not loading, redirect to guest-setup
    if (!isPending && !session) {
      router.replace("/guest-setup");
      return;
    }
  }, [session, isPending, router]);

  // Show loading while checking session
  if (isPending) {
    return (
      <main className="relative flex min-h-screen flex-col items-center justify-center p-4 md:p-6 overflow-hidden">
        {/* Background with grid and cards - same as auth page */}
        <AuthPageBackground />

        {/* Content */}
        <div className="relative z-10 text-center space-y-6 max-w-md">
          <div className="flex justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
            Setting up your workspace...
          </h1>
          <p className="text-sm text-white/70">
            This will only take a moment
          </p>
        </div>
      </main>
    );
  }

  // Don't render home if no session (will redirect)
  if (!session) {
    return null;
  }

  return <>{children}</>;
}

// Wrapper for sidebar provider
function SidebarCoordinator({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      {children}
    </SidebarProvider>
  );
}

// Home page content component
function HomePageContent() {
  const { switchWorkspace } = useWorkspaceContext();
  const showCreateModal = useUIStore((state) => state.showCreateWorkspaceModal);
  const setShowCreateModal = useUIStore((state) => state.setShowCreateWorkspaceModal);

  return (
    <HomeLayout
      onWorkspaceSwitch={switchWorkspace}
      showCreateModal={showCreateModal}
      setShowCreateModal={setShowCreateModal}
    >
      <HomeContent />
    </HomeLayout>
  );
}

// Main shell component for home page
export function HomeShell() {
  return (
    <>
      <MobileWarning />
      <AnonymousSessionHandler>
        <WorkspaceProvider>
          <SidebarCoordinator>
            <HomePageContent />
          </SidebarCoordinator>
        </WorkspaceProvider>
      </AnonymousSessionHandler>
    </>
  );
}

export default function HomePage() {
  return (
    <>
      <SEO
        title="Home"
        description="Choose a workspace or create a new one to start organizing your knowledge in ThinkEx."
        keywords="home, workspaces, dashboard, productivity tools"
        url="https://thinkex.app/home"
        canonical="https://thinkex.app/home"
      />
      <HomeShell />
    </>
  );
}
