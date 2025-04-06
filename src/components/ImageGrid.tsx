
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { DatasetImage } from '@/types/dataset';

interface ImageGridProps {
  images: DatasetImage[];
  onDelete: (id: string) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, onDelete }) => {
  if (images.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No images in this category. Upload some!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {images.map((image) => (
        <Card key={image.id} className="overflow-hidden">
          <div className="relative aspect-square">
            <img 
              src={image.url} 
              alt={image.filename} 
              className="object-cover w-full h-full"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-75 hover:opacity-100"
              onClick={() => onDelete(image.id)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
          <CardContent className="p-2">
            <p className="text-xs truncate" title={image.filename}>
              {image.filename}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ImageGrid;
