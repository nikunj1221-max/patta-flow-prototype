import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge-enhanced';
import { mockClaims, mockSchemes, type Claim } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ExternalLink, 
  Gift,
  Plus,
  Calendar,
  MapPin
} from 'lucide-react';

interface CitizenDashboardProps {
  onNewClaim: () => void;
  claims?: Claim[];
}

export function CitizenDashboard({ onNewClaim, claims = [] }: CitizenDashboardProps) {
  const { user } = useAuth();
  
  // Use provided claims or fallback to mock data filtered for current user
  const userClaims = claims.length > 0 
    ? claims 
    : mockClaims.filter(claim => user?.role === 'citizen');

  const getStatusIcon = (status: Claim['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Claim['status']) => {
    switch (status) {
      case 'pending':
        return 'pending';
      case 'approved':
        return 'approved';
      case 'rejected':
        return 'rejected';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground">Manage your Patta claims and track their status</p>
        </div>
        <Button onClick={onNewClaim} size="lg" className="w-fit">
          <Plus className="mr-2 h-5 w-5" />
          New Claim
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Claims</p>
                <p className="text-2xl font-bold">{userClaims.length}</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-status-approved">
                  {userClaims.filter(c => c.status === 'approved').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-status-approved" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-status-pending">
                  {userClaims.filter(c => c.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-status-pending" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Claims List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Claims</CardTitle>
          <CardDescription>Track the status of your submitted Patta claims</CardDescription>
        </CardHeader>
        <CardContent>
          {userClaims.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-semibold mb-2">No claims submitted yet</p>
              <p className="text-muted-foreground mb-4">Start by submitting your first Patta claim</p>
              <Button onClick={onNewClaim}>
                <Plus className="mr-2 h-4 w-4" />
                Submit New Claim
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {userClaims.map((claim) => (
                <Card key={claim.id} className="shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">{claim.name}</h3>
                          <Badge variant={getStatusColor(claim.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(claim.status)}
                              {claim.status}
                            </div>
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {claim.village}, {claim.district}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(claim.submittedAt).toLocaleDateString()}
                          </div>
                          <div>Survey: {claim.surveyNo}</div>
                          <div>Area: {claim.landArea}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                        {claim.documentUrl && (
                          <Button variant="outline" size="sm">
                            <FileText className="mr-2 h-4 w-4" />
                            Document
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Eligible Schemes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Eligible Schemes
          </CardTitle>
          <CardDescription>
            Government schemes you may be eligible for based on your approved claims
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockSchemes.map((scheme) => (
              <Card key={scheme.id} className="shadow-sm border-l-4 border-l-secondary">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">{scheme.title}</h3>
                      <p className="text-2xl font-bold text-secondary">{scheme.amount}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{scheme.description}</p>
                    <div className="pt-2">
                      <p className="text-xs font-medium text-muted-foreground mb-2">Eligibility:</p>
                      <p className="text-xs">{scheme.eligibility}</p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}