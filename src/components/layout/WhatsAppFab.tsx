import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/lib/data";

export default function WhatsAppFab() {
  return (
    <a
      href={getWhatsAppLink("Hi! I'd like to order from GasShop.store")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
