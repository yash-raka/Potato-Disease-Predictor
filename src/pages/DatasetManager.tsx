
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import useDatasetManager from '@/hooks/useDatasetManager';
import DatasetStats from '@/components/dataset/DatasetStats';
import UploadSection from '@/components/dataset/UploadSection';
import ImageGallery from '@/components/dataset/ImageGallery';

const DatasetManager = () => {
  const navigate = useNavigate();
  const {
    images,
    selectedCategory,
    isUploading,
    uploadProgress,
    stats,
    handleFileUpload,
    handleDeleteImage,
    handleBulkUpload,
    handleTabSelection
  } = useDatasetManager();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-6xl">
          <Button 
            variant="ghost" 
            className="mb-4"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Detection
          </Button>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-leaf-dark mb-2">Dataset Manager</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Manage your potato leaf disease training dataset. Upload, categorize, and prepare images for model training.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <DatasetStats stats={stats} />
            <UploadSection
              isUploading={isUploading}
              uploadProgress={uploadProgress}
              selectedCategory={selectedCategory}
              handleFileUpload={handleFileUpload}
              handleBulkUpload={handleBulkUpload}
            />
          </div>
          
          <ImageGallery 
            images={images}
            handleDeleteImage={handleDeleteImage}
            handleTabSelection={handleTabSelection}
          />
        </div>
      </main>
      
      <footer className="py-4 border-t">
        <div className="container text-center text-sm text-gray-500">
          Potato Leaf Guardian © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default DatasetManager;
