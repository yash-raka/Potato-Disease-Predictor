
import React from 'react';
import { PotatoDisease } from '@/services/predictionService';
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle } from 'lucide-react';

interface PredictionResultProps {
  prediction: PotatoDisease;
}

const PredictionResult: React.FC<PredictionResultProps> = ({ prediction }) => {
  const isHealthy = prediction.name === "Healthy";
  
  // Determine color based on disease state
  const getConfidenceColor = () => {
    if (isHealthy) return "bg-leaf";
    return prediction.confidence > 85 ? "bg-red-500" : "bg-amber-500";
  };

  return (
    <div className="prediction-result">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          {isHealthy ? (
            <CheckCircle className="h-5 w-5 text-leaf" />
          ) : (
            <AlertCircle className="h-5 w-5 text-amber-500" />
          )}
          <h3 className="font-medium text-lg">{prediction.name}</h3>
        </div>
        <div className="text-sm bg-gray-100 px-2 py-1 rounded">
          {prediction.confidence}% confidence
        </div>
      </div>
      
      <Progress 
        value={prediction.confidence} 
        className={`h-2 mt-2 ${getConfidenceColor()}`} 
      />
      
      <div className="mt-4 space-y-3">
        <div>
          <h4 className="text-sm font-medium text-gray-700">Description</h4>
          <p className="text-sm text-gray-600 mt-1">{prediction.description}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-700">Recommended Treatment</h4>
          <p className="text-sm text-gray-600 mt-1">{prediction.treatment}</p>
        </div>
      </div>
    </div>
  );
};

export default PredictionResult;
