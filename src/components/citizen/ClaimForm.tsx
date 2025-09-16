import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileUpload } from '@/components/FileUpload';
import { extractedData } from '@/data/mockData';
import { CheckCircle, Edit3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ClaimFormData {
  name: string;
  fatherName: string;
  village: string;
  district: string;
  surveyNo: string;
  landArea: string;
  boundaries: {
    north: string;
    south: string;
    east: string;
    west: string;
  };
}

interface ClaimFormProps {
  onSubmit: (data: ClaimFormData & { documentFile?: File }) => void;
}

export function ClaimForm({ onSubmit }: ClaimFormProps) {
  const { toast } = useToast();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<ClaimFormData>({
    name: '',
    fatherName: '',
    village: '',
    district: '',
    surveyNo: '',
    landArea: '',
    boundaries: {
      north: '',
      south: '',
      east: '',
      west: '',
    },
  });
  const [isExtracted, setIsExtracted] = useState(false);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    // Simulate AI extraction
    setTimeout(() => {
      setFormData(extractedData);
      setIsExtracted(true);
      toast({
        title: "Document Processed",
        description: "Information extracted successfully. Please review and edit if needed.",
      });
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith('boundaries.')) {
      const boundaryField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        boundaries: {
          ...prev.boundaries,
          [boundaryField]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, documentFile: uploadedFile || undefined });
  };

  return (
    <div className="space-y-6">
      {/* File Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="w-8 h-8 bg-gradient-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
            Upload Patta Document
          </CardTitle>
          <CardDescription>
            Upload your Patta document for AI-powered data extraction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FileUpload onFileUpload={handleFileUpload} uploadedFile={uploadedFile} />
        </CardContent>
      </Card>

      {/* Form */}
      {uploadedFile && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="w-8 h-8 bg-gradient-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              Review & Edit Information
              {isExtracted && (
                <div className="flex items-center gap-1 text-status-approved">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">AI Extracted</span>
                </div>
              )}
            </CardTitle>
            <CardDescription>
              Review the extracted information and make corrections if needed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fatherName">Father's Name</Label>
                  <Input
                    id="fatherName"
                    value={formData.fatherName}
                    onChange={(e) => handleInputChange('fatherName', e.target.value)}
                    placeholder="Enter father's name"
                    required
                  />
                </div>
              </div>

              {/* Location Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="village">Village</Label>
                  <Input
                    id="village"
                    value={formData.village}
                    onChange={(e) => handleInputChange('village', e.target.value)}
                    placeholder="Enter village name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Input
                    id="district"
                    value={formData.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    placeholder="Enter district name"
                    required
                  />
                </div>
              </div>

              {/* Land Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="surveyNo">Survey Number</Label>
                  <Input
                    id="surveyNo"
                    value={formData.surveyNo}
                    onChange={(e) => handleInputChange('surveyNo', e.target.value)}
                    placeholder="Enter survey number"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="landArea">Land Area</Label>
                  <Input
                    id="landArea"
                    value={formData.landArea}
                    onChange={(e) => handleInputChange('landArea', e.target.value)}
                    placeholder="Enter land area (acres)"
                    required
                  />
                </div>
              </div>

              {/* Boundaries */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Edit3 className="h-5 w-5" />
                  Land Boundaries
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="north">North Boundary</Label>
                    <Input
                      id="north"
                      value={formData.boundaries.north}
                      onChange={(e) => handleInputChange('boundaries.north', e.target.value)}
                      placeholder="North boundary"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="south">South Boundary</Label>
                    <Input
                      id="south"
                      value={formData.boundaries.south}
                      onChange={(e) => handleInputChange('boundaries.south', e.target.value)}
                      placeholder="South boundary"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="east">East Boundary</Label>
                    <Input
                      id="east"
                      value={formData.boundaries.east}
                      onChange={(e) => handleInputChange('boundaries.east', e.target.value)}
                      placeholder="East boundary"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="west">West Boundary</Label>
                    <Input
                      id="west"
                      value={formData.boundaries.west}
                      onChange={(e) => handleInputChange('boundaries.west', e.target.value)}
                      placeholder="West boundary"
                      required
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Submit Claim
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}