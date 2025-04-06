
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface DatasetStatsProps {
  stats: {
    total: number;
    early_blight: number;
    late_blight: number;
    healthy: number;
  };
}

const DatasetStats: React.FC<DatasetStatsProps> = ({ stats }) => {
  return (
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
  );
};

export default DatasetStats;
