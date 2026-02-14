export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  badge?: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  productCount: number;
  image: string;
}

export const categories: Category[] = [
  { id: "home-gas", name: "Home Gas", description: "LPG cylinders, stoves & regulators for household use", icon: "Home", productCount: 24, image: "/placeholder.svg" },
  { id: "commercial", name: "Commercial Gas", description: "Restaurant & hotel gas solutions", icon: "Building2", productCount: 18, image: "/placeholder.svg" },
  { id: "industrial", name: "Industrial Gas", description: "Heavy-duty gas equipment for factories", icon: "Factory", productCount: 15, image: "/placeholder.svg" },
  { id: "safety", name: "Safety Equipment", description: "Leak detectors, alarms & safety valves", icon: "ShieldCheck", productCount: 32, image: "/placeholder.svg" },
  { id: "pipes", name: "Pipes & Fittings", description: "Gas pipes, connectors & fittings", icon: "Wrench", productCount: 40, image: "/placeholder.svg" },
  { id: "accessories", name: "Installation Accessories", description: "Tools & accessories for gas installation", icon: "Settings", productCount: 28, image: "/placeholder.svg" },
];

export const products: Product[] = [
  { id: "1", name: "Premium LPG Cylinder 11.8kg", price: 8500, originalPrice: 9200, category: "home-gas", image: "/placeholder.svg", badge: "Best Seller", rating: 4.8, reviews: 234, inStock: true, description: "High-quality LPG cylinder for household cooking needs." },
  { id: "2", name: "Gas Safety Regulator (Low Pressure)", price: 1200, category: "home-gas", image: "/placeholder.svg", rating: 4.6, reviews: 156, inStock: true, description: "Safe and reliable low-pressure gas regulator." },
  { id: "3", name: "Commercial Gas Burner - 3 Ring", price: 15000, originalPrice: 17500, category: "commercial", image: "/placeholder.svg", badge: "Sale", rating: 4.7, reviews: 89, inStock: true, description: "Heavy-duty 3-ring burner for commercial kitchens." },
  { id: "4", name: "Gas Leak Detector Alarm", price: 3500, category: "safety", image: "/placeholder.svg", badge: "New", rating: 4.9, reviews: 312, inStock: true, description: "Advanced gas leak detection with loud alarm system." },
  { id: "5", name: "Industrial Gas Regulator (High Flow)", price: 8900, category: "industrial", image: "/placeholder.svg", rating: 4.5, reviews: 67, inStock: true, description: "High-flow regulator for industrial gas applications." },
  { id: "6", name: "Stainless Steel Gas Pipe 1m", price: 650, category: "pipes", image: "/placeholder.svg", rating: 4.4, reviews: 198, inStock: true, description: "Premium stainless steel flexible gas pipe." },
  { id: "7", name: "Two Burner Gas Stove - Tempered Glass", price: 6800, originalPrice: 7500, category: "home-gas", image: "/placeholder.svg", badge: "Popular", rating: 4.7, reviews: 445, inStock: true, description: "Modern tempered glass top 2-burner gas stove." },
  { id: "8", name: "Gas Installation Tool Kit", price: 4200, category: "accessories", image: "/placeholder.svg", rating: 4.3, reviews: 76, inStock: true, description: "Complete toolkit for gas line installation." },
  { id: "9", name: "Commercial LPG Cylinder 45kg", price: 32000, category: "commercial", image: "/placeholder.svg", rating: 4.6, reviews: 54, inStock: true, description: "Large capacity LPG cylinder for commercial use." },
  { id: "10", name: "Automatic Gas Shut-off Valve", price: 5600, category: "safety", image: "/placeholder.svg", badge: "Essential", rating: 4.8, reviews: 267, inStock: true, description: "Auto shut-off valve for maximum gas safety." },
  { id: "11", name: "Gas Pipe Connector Set (Brass)", price: 850, category: "pipes", image: "/placeholder.svg", rating: 4.5, reviews: 134, inStock: true, description: "High-quality brass connectors for secure gas connections." },
  { id: "12", name: "Industrial Gas Flow Meter", price: 12500, category: "industrial", image: "/placeholder.svg", rating: 4.4, reviews: 43, inStock: true, description: "Precision gas flow meter for industrial monitoring." },
];

export const testimonials = [
  { name: "Ahmed Khan", role: "Restaurant Owner, Lahore", text: "GasShop delivered our commercial gas setup faster than anyone else. Excellent quality and after-sales support!", rating: 5 },
  { name: "Fatima Malik", role: "Homeowner, Karachi", text: "I trust GasShop for all our home gas needs. Their safety equipment gives me peace of mind.", rating: 5 },
  { name: "Usman Ali", role: "Factory Manager, Faisalabad", text: "Reliable industrial gas equipment at competitive prices. GasShop is our go-to supplier.", rating: 5 },
  { name: "Ayesha Siddiqui", role: "Hotel Manager, Islamabad", text: "Professional service and certified products. We switched to GasShop and never looked back.", rating: 5 },
];

export const WHATSAPP_NUMBER = "923001234567";

export function getWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function formatPrice(price: number): string {
  return `PKR ${price.toLocaleString()}`;
}
