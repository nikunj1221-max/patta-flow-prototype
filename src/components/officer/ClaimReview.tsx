import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge-enhanced';
import { Textarea } from '@/components/ui/textarea';
import { type Claim } from '@/data/mockData';
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  Edit3, 
  FileText, 
  MapPin,
  Calendar,
  User
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ClaimReviewProps {
  claim: Claim;
  onBack: () => void;
  onStatusUpdate: (claimId: string, status: 'approved' | 'rejected', notes?: string) => void;
}

export function ClaimReview({ claim, onBack, onStatusUpdate }: ClaimReviewProps) {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedClaim, setEditedClaim] = useState<Claim>(claim);
  const [reviewNotes, setReviewNotes] = useState('');

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith('boundaries.')) {
      const boundaryField = field.split('.')[1];
      setEditedClaim(prev => ({
        ...prev,
        boundaries: {
          ...prev.boundaries,
          [boundaryField]: value,
        },
      }));
    } else {
      setEditedClaim(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleApprove = () => {
    onStatusUpdate(claim.id, 'approved', reviewNotes);
    toast({
      title: "Claim Approved",
      description: `Claim ${claim.id} has been approved successfully.`,
    });
  };

  const handleReject = () => {
    onStatusUpdate(claim.id, 'rejected', reviewNotes);
    toast({
      title: "Claim Rejected",
      description: `Claim ${claim.id} has been rejected.`,
      variant: "destructive",
    });
  };

  const getStatusIcon = (status: Claim['status']) => {
    switch (status) {
      case 'pending':
        return <Edit3 className="h-4 w-4" />;
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
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Claim Review</h1>
            <Badge variant={getStatusColor(claim.status)} className="text-sm">
              <div className="flex items-center gap-1">
                {getStatusIcon(claim.status)}
                {claim.status}
              </div>
            </Badge>
          </div>
          <p className="text-muted-foreground">Review claim {claim.id}</p>
        </div>
      </div>

      {/* Claim Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Claim Information
          </CardTitle>
          <CardDescription>
            Submitted on {new Date(claim.submittedAt).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="font-medium">Claimant</p>
                <p className="text-sm text-muted-foreground">{claim.name}</p>
                <p className="text-xs text-muted-foreground">S/o {claim.fatherName}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-sm text-muted-foreground">{claim.village}</p>
                <p className="text-xs text-muted-foreground">{claim.district}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="font-medium">Survey No.</p>
                <p className="text-sm text-muted-foreground">{claim.surveyNo}</p>
                <p className="text-xs text-muted-foreground">Area: {claim.landArea}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Editable Details */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Claim Details</CardTitle>
            <CardDescription>
              {isEditing ? 'Edit the claim information below' : 'Review the claim information'}
            </CardDescription>
          </div>
          <Button
            variant="outline"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit3 className="h-4 w-4 mr-2" />
            {isEditing ? 'Save Changes' : 'Edit Details'}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={editedClaim.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fatherName">Father's Name</Label>
                <Input
                  id="fatherName"
                  value={editedClaim.fatherName}
                  onChange={(e) => handleInputChange('fatherName', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Location Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="village">Village</Label>
                <Input
                  id="village"
                  value={editedClaim.village}
                  onChange={(e) => handleInputChange('village', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="district">District</Label>
                <Input
                  id="district"
                  value={editedClaim.district}
                  onChange={(e) => handleInputChange('district', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Land Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="surveyNo">Survey Number</Label>
                <Input
                  id="surveyNo"
                  value={editedClaim.surveyNo}
                  onChange={(e) => handleInputChange('surveyNo', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="landArea">Land Area</Label>
                <Input
                  id="landArea"
                  value={editedClaim.landArea}
                  onChange={(e) => handleInputChange('landArea', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Boundaries */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Land Boundaries</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="north">North Boundary</Label>
                  <Input
                    id="north"
                    value={editedClaim.boundaries.north}
                    onChange={(e) => handleInputChange('boundaries.north', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="south">South Boundary</Label>
                  <Input
                    id="south"
                    value={editedClaim.boundaries.south}
                    onChange={(e) => handleInputChange('boundaries.south', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="east">East Boundary</Label>
                  <Input
                    id="east"
                    value={editedClaim.boundaries.east}
                    onChange={(e) => handleInputChange('boundaries.east', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="west">West Boundary</Label>
                  <Input
                    id="west"
                    value={editedClaim.boundaries.west}
                    onChange={(e) => handleInputChange('boundaries.west', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Review Actions */}
      {claim.status === 'pending' && (
        <Card>
          <CardHeader>
            <CardTitle>Review Decision</CardTitle>
            <CardDescription>
              Approve or reject this claim after thorough review
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notes">Review Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any notes or comments about this claim..."
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="flex gap-4">
                <Button 
                  className="flex-1" 
                  onClick={handleApprove}
                  variant="default"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve Claim
                </Button>
                <Button 
                  className="flex-1" 
                  variant="destructive"
                  onClick={handleReject}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject Claim
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Document Preview */}
      {claim.documentUrl && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Uploaded Document
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="font-medium mb-2">{claim.documentUrl}</p>
              <p className="text-sm text-muted-foreground mb-4">
                Original Patta document uploaded by claimant
              </p>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                View Document
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}