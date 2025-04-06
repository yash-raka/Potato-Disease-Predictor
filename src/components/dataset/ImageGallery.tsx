
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database } from 'lucide-react';
import ImageGrid from '@/components/ImageGrid';
import { DatasetImage } from '@/types/dataset';

type CategoryType = 'early_blight' | 'late_blight' | 'healthy';

interface ImageGalleryProps {
  images: {
    [key: string]: DatasetImage[];
  };
  handleDeleteImage: (id: string, category: CategoryType) => Promise<void>;
  handleTabSelection: (value: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  handleDeleteImage, 
  handleTabSelection 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="mr-2 h-5 w-5" />
          Dataset Images
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="early_blight" onValueChange={handleTabSelection}>
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
  );
};

export default ImageGallery;
