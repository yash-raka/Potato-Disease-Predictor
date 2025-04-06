
import { DatasetImage } from '@/types/dataset';

// In-memory storage for dataset images since we don't have a backend yet
const datasetStorage: {[key: string]: DatasetImage[]} = {
  'early_blight': [],
  'late_blight': [],
  'healthy': []
};

// Load any existing data from localStorage on initialization
try {
  const savedData = localStorage.getItem('potato-disease-dataset');
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    Object.keys(parsedData).forEach(key => {
      datasetStorage[key] = parsedData[key];
    });
  }
} catch (error) {
  console.error("Error loading dataset from local storage:", error);
}

// Function to save current dataset to localStorage
const saveDatasetToStorage = () => {
  try {
    localStorage.setItem('potato-disease-dataset', JSON.stringify(datasetStorage));
  } catch (error) {
    console.error("Error saving dataset to local storage:", error);
  }
};

// Get all dataset images
export async function getDatasetImages() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return {...datasetStorage};
}

// Upload an image to the dataset
export async function uploadDatasetImage(file: File, category: 'early_blight' | 'late_blight' | 'healthy'): Promise<DatasetImage> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Create a URL for the file (in a real app, this would be uploaded to a server)
  const url = URL.createObjectURL(file);
  
  // Create a new image entry
  const newImage: DatasetImage = {
    id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    filename: file.name,
    url: url,
    category: category,
    dateAdded: new Date().toISOString()
  };
  
  // Add to storage
  datasetStorage[category].push(newImage);
  saveDatasetToStorage();
  
  return newImage;
}

// Delete an image from the dataset
export async function deleteDatasetImage(imageId: string, category: 'early_blight' | 'late_blight' | 'healthy'): Promise<void> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Find the image
  const imageIndex = datasetStorage[category].findIndex(img => img.id === imageId);
  
  if (imageIndex !== -1) {
    // Revoke the object URL to free up memory
    URL.revokeObjectURL(datasetStorage[category][imageIndex].url);
    
    // Remove from storage
    datasetStorage[category].splice(imageIndex, 1);
    saveDatasetToStorage();
  } else {
    throw new Error("Image not found");
  }
}

// Function to get dataset statistics
export async function getDatasetStats() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return {
    early_blight: datasetStorage['early_blight'].length,
    late_blight: datasetStorage['late_blight'].length,
    healthy: datasetStorage['healthy'].length,
    total: 
      datasetStorage['early_blight'].length + 
      datasetStorage['late_blight'].length + 
      datasetStorage['healthy'].length
  };
}

// For demonstration purposes, we can add some placeholder data
export async function addPlaceholderData() {
  // This would add placeholder images in a real application
  console.log("Placeholder data would be added here in a real application");
}
