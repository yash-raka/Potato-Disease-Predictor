
import React from 'react';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ImagePreviewProps {
  imageUrl: string;
  onClear: () => void;
  isProcessing: boolean;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, onClear, isProcessing }) => {
  return (
    <div className="image-preview">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt="Potato leaf" 
          className="max-h-[400px] object-contain mx-auto"
        />
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 rounded-full"
          onClick={onClear}
          disabled={isProcessing}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ImagePreview;
