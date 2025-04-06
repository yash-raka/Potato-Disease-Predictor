
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-6">
      <Loader2 className="h-8 w-8 animate-spin text-leaf" />
      <p className="mt-2 text-sm text-gray-600">Analyzing image...</p>
    </div>
  );
};

export default LoadingIndicator;
