
export interface DatasetImage {
  id: string;
  filename: string;
  url: string;
  category: 'early_blight' | 'late_blight' | 'healthy';
  dateAdded: string;
}
