import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Login } from '@/components/Login';
import { Layout } from '@/components/Layout';
import { CitizenDashboard } from '@/components/citizen/Dashboard';
import { ClaimForm } from '@/components/citizen/ClaimForm';
import { OfficerDashboard } from '@/components/officer/OfficerDashboard';
import { ClaimReview } from '@/components/officer/ClaimReview';
import { mockClaims, type Claim } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const queryClient = new QueryClient();

type CitizenView = 'dashboard' | 'new-claim';
type OfficerView = 'dashboard' | 'review-claim';

function AppContent() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [citizenView, setCitizenView] = useState<CitizenView>('dashboard');
  const [officerView, setOfficerView] = useState<OfficerView>('dashboard');
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);

  const handleNewClaim = () => {
    setCitizenView('new-claim');
  };

  const handleClaimSubmit = (claimData: any) => {
    // In a real app, this would make an API call
    toast({
      title: "Claim Submitted Successfully!",
      description: "Your Patta claim has been submitted for review. You will receive updates on its status.",
    });
    setCitizenView('dashboard');
  };

  const handleViewClaim = (claim: Claim) => {
    setSelectedClaim(claim);
    setOfficerView('review-claim');
  };

  const handleStatusUpdate = (claimId: string, status: 'approved' | 'rejected', notes?: string) => {
    // In a real app, this would make an API call
    setOfficerView('dashboard');
    setSelectedClaim(null);
  };

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Layout>
      {user?.role === 'citizen' ? (
        citizenView === 'dashboard' ? (
          <CitizenDashboard onNewClaim={handleNewClaim} />
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCitizenView('dashboard')}
                className="text-primary hover:underline"
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-3xl font-bold">Submit New Claim</h1>
            </div>
            <ClaimForm onSubmit={handleClaimSubmit} />
          </div>
        )
      ) : (
        officerView === 'dashboard' ? (
          <OfficerDashboard onViewClaim={handleViewClaim} />
        ) : selectedClaim ? (
          <ClaimReview
            claim={selectedClaim}
            onBack={() => setOfficerView('dashboard')}
            onStatusUpdate={handleStatusUpdate}
          />
        ) : null
      )}
    </Layout>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
