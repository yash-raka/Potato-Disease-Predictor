
// Mock data for diseases
export type PotatoDisease = {
  id: number;
  name: string;
  description: string;
  treatment: string;
  confidence: number;
};

const diseases: Record<string, Omit<PotatoDisease, "confidence">> = {
  "early_blight": {
    id: 1,
    name: "Early Blight",
    description: "A fungal disease caused by Alternaria solani. It appears as dark brown spots with concentric rings on lower leaves first.",
    treatment: "Fungicides with chlorothalonil or copper. Remove infected leaves. Ensure proper plant spacing and avoid overhead watering."
  },
  "late_blight": {
    id: 2,
    name: "Late Blight",
    description: "A severe disease caused by Phytophthora infestans. It creates water-soaked spots that turn brown or black with white mildew underneath.",
    treatment: "Immediate application of fungicides containing chlorothalonil, mancozeb, or copper. Remove infected plants to prevent spread."
  },
  "healthy": {
    id: 3,
    name: "Healthy",
    description: "No disease detected. The plant appears healthy.",
    treatment: "Continue regular care and monitoring."
  }
};

// Function to simulate prediction with a delay
export async function predictDisease(imageFile: File): Promise<PotatoDisease> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real app, we would send the image to a backend API
  // For now, we'll randomly select a disease with varying confidence levels
  const diseaseKeys = Object.keys(diseases);
  const randomIndex = Math.floor(Math.random() * diseaseKeys.length);
  const selectedDisease = diseaseKeys[randomIndex];
  
  // Generate a random confidence level between 70% and 98%
  const confidence = 70 + Math.floor(Math.random() * 29);
  
  return {
    ...diseases[selectedDisease],
    confidence
  };
}

// Function to get disease information by ID
export function getDiseaseById(id: number): PotatoDisease | undefined {
  const disease = Object.values(diseases).find(d => d.id === id);
  return disease ? { ...disease, confidence: 0 } : undefined;
}
