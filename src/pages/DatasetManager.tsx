
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ImagePlus, FolderPlus, Database, ArrowLeft, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import ImageGrid from '@/components/ImageGrid';
import { uploadDatasetImage, getDatasetImages, deleteDatasetImage } from '@/services/datasetService';

const DatasetManager = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<{[key: string]: DatasetImage[]}>({
    'early_blight': [],
    'late_blight': [],
    'healthy': []
  });
  const [selectedCategory, setSelectedCategory] = useState('early_blight');
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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, category: string) => {
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

  const handleDeleteImage = async (imageId: string, category: string) => {
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
    input.onchange = (e) => handleFileUpload(e as React.ChangeEvent<HTMLInputElement>, selectedCategory);
    input.click();
  };

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
            <Card>
              <CardHeader>
                <CardTitle>Dataset Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Total Images</span>
                      <span className="text-sm font-medium">{stats.total}</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Early Blight</span>
                      <span className="text-sm font-medium">{stats.early_blight}</span>
                    </div>
                    <Progress 
                      value={stats.total ? (stats.early_blight / stats.total) * 100 : 0} 
                      className="h-2 bg-amber-100" 
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Late Blight</span>
                      <span className="text-sm font-medium">{stats.late_blight}</span>
                    </div>
                    <Progress 
                      value={stats.total ? (stats.late_blight / stats.total) * 100 : 0}
                      className="h-2 bg-red-100" 
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Healthy</span>
                      <span className="text-sm font-medium">{stats.healthy}</span>
                    </div>
                    <Progress 
                      value={stats.total ? (stats.healthy / stats.total) * 100 : 0}
                      className="h-2 bg-green-100" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
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
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                Dataset Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="early_blight" onValueChange={setSelectedCategory}>
                <TabsList className="mb-4">
                  <TabsTrigger value="early_blight">Early Blight ({images.early_blight.length})</TabsTrigger>
                  <TabsTrigger value="late_blight">Late Blight ({images.late_blight.length})</TabsTrigger>
                  <TabsTrigger value="healthy">Healthy ({images.healthy.length})</TabsTrigger>
                </TabsList>
                
                <TabsContent value="early_blight">
                  <ImageGrid 
                    images={images.early_blight} 
                    onDelete={(id) => handleDeleteImage(id, 'early_blight')}
                  />
                </TabsContent>
                
                <TabsContent value="late_blight">
                  <ImageGrid 
                    images={images.late_blight} 
                    onDelete={(id) => handleDeleteImage(id, 'late_blight')}
                  />
                </TabsContent>
                
                <TabsContent value="healthy">
                  <ImageGrid 
                    images={images.healthy}
                    onDelete={(id) => handleDeleteImage(id, 'healthy')}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
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
