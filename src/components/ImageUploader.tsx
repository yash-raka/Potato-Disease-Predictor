
import React, { useState, useRef, DragEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
  isProcessing: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, isProcessing }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    onImageSelected(file);
  };

  const handleCameraCapture = () => {
    // In a real app, this would use the device camera
    // For now, we'll just open the file dialog
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div 
      className={cn(
        'drop-area', 
        isDragging && 'active'
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/*"
        className="sr-only"
        disabled={isProcessing}
      />
      
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="rounded-full bg-green-100 p-3">
          <Upload className="h-6 w-6 text-leaf" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium">
            Drag and drop an image of a potato leaf
          </p>
          <p className="text-xs text-muted-foreground">
            or click to browse (JPG, PNG up to 5MB)
          </p>
        </div>
        
        <div className="flex gap-2 mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
          >
            Select Image
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCameraCapture}
            disabled={isProcessing}
          >
            <Camera className="h-4 w-4 mr-2" /> 
            Camera
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
