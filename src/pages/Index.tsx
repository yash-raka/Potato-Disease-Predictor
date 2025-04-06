
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import ImageUploader from '@/components/ImageUploader';
import ImagePreview from '@/components/ImagePreview';
import LoadingIndicator from '@/components/LoadingIndicator';
import PredictionResult from '@/components/PredictionResult';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { predictDisease, PotatoDisease } from '@/services/predictionService';
import { ArrowRight, FileQuestion, RefreshCw, Leaf, Database } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [prediction, setPrediction] = useState<PotatoDisease | null>(null);

  const handleImageSelected = (file: File) => {
    setSelectedImage(file);
    setImageUrl(URL.createObjectURL(file));
    setPrediction(null);
  };

  const clearImage = () => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }
    setSelectedImage(null);
    setImageUrl(null);
    setPrediction(null);
  };

  const handlePrediction = async () => {
    if (!selectedImage) {
      toast.error("Please select an image first");
      return;
    }

    setIsProcessing(true);
    try {
      const result = await predictDisease(selectedImage);
      setPrediction(result);
    } catch (error) {
      console.error("Error during prediction:", error);
      toast.error("Failed to analyze image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    clearImage();
    setPrediction(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-leaf-dark mb-2">Potato Leaf Disease Detection</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Upload a photo of a potato plant leaf and our AI will analyze it to detect diseases and provide treatment recommendations.
            </p>
            
            <div className="mt-4">
              <Link to="/dataset">
                <Button variant="outline" className="gap-2">
                  <Database className="h-4 w-4" />
                  Manage Training Dataset
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileQuestion className="h-5 w-5" />
                  <span>Upload Leaf Image</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!imageUrl ? (
                  <ImageUploader 
                    onImageSelected={handleImageSelected} 
                    isProcessing={isProcessing}
                  />
                ) : (
                  <ImagePreview 
                    imageUrl={imageUrl}
                    onClear={clearImage}
                    isProcessing={isProcessing}
                  />
                )}

                <div className="mt-4 flex justify-center">
                  <Button
                    className="bg-leaf hover:bg-leaf-dark"
                    disabled={!selectedImage || isProcessing}
                    onClick={handlePrediction}
                  >
                    {!prediction ? (
                      <>
                        Analyze Image
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Analyze Again
                        <RefreshCw className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Disease Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                {isProcessing ? (
                  <LoadingIndicator />
                ) : prediction ? (
                  <PredictionResult prediction={prediction} />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-12 text-gray-500">
                    <div className="bg-gray-100 rounded-full p-4 mb-4">
                      <Leaf className="h-8 w-8 text-leaf animate-bounce-slow" />
                    </div>
                    <p className="text-sm">
                      Upload a potato leaf image and click "Analyze Image" to get disease detection results
                    </p>
                  </div>
                )}
                
                {prediction && (
                  <div className="mt-4 flex justify-center">
                    <Button
                      variant="outline"
                      onClick={handleReset}
                    >
                      Start Over
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
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

export default Index;
