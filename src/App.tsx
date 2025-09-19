import 'leaflet/dist/leaflet.css';
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
  const [claims, setClaims] = useState<Claim[]>(mockClaims);

  const handleNewClaim = () => {
    setCitizenView('new-claim');
  };

  const handleClaimSubmit = (claimData: any) => {
    const newClaim: Claim = {
      id: `CLM${String(claims.length + 1).padStart(3, '0')}`,
      userId: user?.id || 'citizen_new',
      name: claimData.name,
      fatherName: claimData.fatherName,
      village: claimData.village,
      district: claimData.district,
      surveyNo: claimData.surveyNo,
      landArea: claimData.landArea,
      boundaries: claimData.boundaries,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      documentUrl: claimData.documentUrl || `mock-patta-${claims.length + 1}.pdf`,
    };
    
    setClaims(prev => [newClaim, ...prev]);
    toast({
      title: "Claim Submitted Successfully!",
      description: `Your Patta claim ${newClaim.id} has been submitted for review. You will receive updates on its status.`,
    });
    setCitizenView('dashboard');
  };

  const handleViewClaim = (claim: Claim) => {
    setSelectedClaim(claim);
    setOfficerView('review-claim');
  };

  const handleStatusUpdate = (claimId: string, status: 'approved' | 'rejected', notes?: string) => {
    setClaims(prev => prev.map(claim => 
      claim.id === claimId 
        ? { ...claim, status, reviewNotes: notes }
        : claim
    ));
    
    const updatedClaim = claims.find(c => c.id === claimId);
    toast({
      title: status === 'approved' ? "Claim Approved!" : "Claim Rejected",
      description: `Claim ${claimId} for ${updatedClaim?.name} has been ${status}.`,
      variant: status === 'rejected' ? "destructive" : "default",
    });
    
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
          <CitizenDashboard onNewClaim={handleNewClaim} claims={claims.filter(c => c.userId === user.id)} />
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
          <OfficerDashboard onViewClaim={handleViewClaim} claims={claims} />
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
