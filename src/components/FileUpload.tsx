import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  uploadedFile?: File | null;
  className?: string;
}

export function FileUpload({ onFileUpload, uploadedFile, className }: FileUploadProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setIsProcessing(true);
      // Simulate processing delay
      setTimeout(() => {
        onFileUpload(acceptedFiles[0]);
        setIsProcessing(false);
      }, 1500);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    multiple: false,
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer",
        isDragActive && "border-primary bg-primary/5",
        uploadedFile && "border-status-approved bg-status-approved/5",
        className
      )}
    >
      <div className="p-8 text-center">
        <input {...getInputProps()} />
        
        {uploadedFile ? (
          <div className="space-y-4">
            <CheckCircle className="mx-auto h-12 w-12 text-status-approved" />
            <div>
              <p className="text-lg font-semibold text-status-approved">File Uploaded Successfully</p>
              <p className="text-sm text-muted-foreground mt-1">{uploadedFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        ) : isProcessing ? (
          <div className="space-y-4">
            <div className="mx-auto h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-lg font-semibold">Processing Document...</p>
            <p className="text-sm text-muted-foreground">Extracting information using AI</p>
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
            <div>
              <p className="text-lg font-semibold">Upload Patta Document</p>
              <p className="text-sm text-muted-foreground mt-1">
                Drag & drop your Patta document here, or click to select
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Supports PDF, JPG, PNG (Max 10MB)
              </p>
            </div>
            <Button variant="outline" className="mt-4">
              <File className="mr-2 h-4 w-4" />
              Choose File
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}