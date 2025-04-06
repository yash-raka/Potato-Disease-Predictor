
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { DatasetImage } from '@/types/dataset';
import { uploadDatasetImage, getDatasetImages, deleteDatasetImage } from '@/services/datasetService';

type CategoryType = 'early_blight' | 'late_blight' | 'healthy';

export function useDatasetManager() {
  const [images, setImages] = useState<{[key: string]: DatasetImage[]}>({
    'early_blight': [],
    'late_blight': [],
    'healthy': []
  });
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('early_blight');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [stats, setStats] = useState({
    total: 0,
    early_blight: 0,
    late_blight: 0,
    healthy: 0
  });

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const data = await getDatasetImages();
      setImages(data);
      
      // Calculate stats
      const newStats = {
        total: 0,
        early_blight: data.early_blight.length,
        late_blight: data.late_blight.length,
        healthy: data.healthy.length
      };
      newStats.total = newStats.early_blight + newStats.late_blight + newStats.healthy;
      setStats(newStats);
    } catch (error) {
      console.error("Error loading dataset images:", error);
      toast.error("Failed to load dataset images");
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, category: CategoryType) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);
    
    const totalFiles = files.length;
    let uploaded = 0;

    try {
      for (let i = 0; i < totalFiles; i++) {
        const file = files[i];
        await uploadDatasetImage(file, category);
        uploaded++;
        setUploadProgress(Math.round((uploaded / totalFiles) * 100));
      }
      
      toast.success(`Successfully uploaded ${totalFiles} images to ${category} category`);
      loadImages(); // Refresh the image list
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload one or more images");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDeleteImage = async (imageId: string, category: CategoryType) => {
    try {
      await deleteDatasetImage(imageId, category);
      toast.success("Image deleted successfully");
      loadImages(); // Refresh the image list
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image");
    }
  };

  const handleBulkUpload = () => {
    // Create a hidden file input that accepts multiple files
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*';
    input.onchange = (e) => {
      if (!e) return;
      const event = e as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileUpload(event, selectedCategory);
    };
    input.click();
  };

  // Function to safely handle tab selection with the correct types
  const handleTabSelection = (value: string) => {
    // Ensure value is a valid category before setting it
    if (value === 'early_blight' || value === 'late_blight' || value === 'healthy') {
      setSelectedCategory(value);
    }
  };

  return {
    images,
    selectedCategory,
    isUploading,
    uploadProgress,
    stats,
    handleFileUpload,
    handleDeleteImage,
    handleBulkUpload,
    handleTabSelection
  };
}

export default useDatasetManager;
