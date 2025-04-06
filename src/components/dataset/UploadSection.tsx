
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ImagePlus, FolderPlus } from 'lucide-react';

type CategoryType = 'early_blight' | 'late_blight' | 'healthy';

interface UploadSectionProps {
  isUploading: boolean;
  uploadProgress: number;
  selectedCategory: CategoryType;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>, category: CategoryType) => Promise<void>;
  handleBulkUpload: () => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({ 
  isUploading, 
  uploadProgress, 
  selectedCategory, 
  handleFileUpload, 
  handleBulkUpload 
}) => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Upload Images</CardTitle>
      </CardHeader>
      <CardContent>
        {isUploading ? (
          <div className="space-y-4">
            <Progress value={uploadProgress} className="h-2" />
            <p className="text-center text-sm text-gray-500">
              Uploading... {uploadProgress}%
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  id="early-blight-upload"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'early_blight')}
                />
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center"
                  onClick={() => document.getElementById('early-blight-upload')?.click()}
                >
                  <ImagePlus className="h-5 w-5 mb-1" />
                  <span className="text-xs">Early Blight</span>
                </Button>
              </div>
              <div>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  id="late-blight-upload"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'late_blight')}
                />
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center"
                  onClick={() => document.getElementById('late-blight-upload')?.click()}
                >
                  <ImagePlus className="h-5 w-5 mb-1" />
                  <span className="text-xs">Late Blight</span>
                </Button>
              </div>
              <div>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  id="healthy-upload"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'healthy')}
                />
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center"
                  onClick={() => document.getElementById('healthy-upload')?.click()}
                >
                  <ImagePlus className="h-5 w-5 mb-1" />
                  <span className="text-xs">Healthy</span>
                </Button>
              </div>
            </div>
            
            <div className="mt-4">
              <Button 
                className="w-full bg-leaf hover:bg-leaf-dark"
                onClick={handleBulkUpload}
              >
                <FolderPlus className="mr-2 h-4 w-4" />
                Bulk Upload to {selectedCategory.replace('_', ' ')}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UploadSection;
