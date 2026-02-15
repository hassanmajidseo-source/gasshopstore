import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFeaturedProducts } from "@/hooks/use-products";
import { useCart } from "@/lib/cart-store";
import { formatPrice, getWhatsAppLink } from "@/lib/data";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedProducts() {
  const { data: featured, isLoading } = useFeaturedProducts();
  const { addItem } = useCart();

  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Featured <span className="text-secondary">Products</span>
            </h2>
            <p className="text-muted-foreground">Top-rated products trusted by thousands across Pakistan.</p>
          </div>
          <Link to="/products" className="hidden sm:flex items-center gap-1 text-sm font-medium text-secondary hover:underline">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-card rounded-xl border overflow-hidden">
                <Skeleton className="aspect-square" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured?.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group bg-card rounded-xl border overflow-hidden hover:shadow-xl transition-all"
              >
                <Link to={`/product/${product.slug}`}>
                  <div className="relative aspect-square bg-muted p-6 flex items-center justify-center">
                    <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-contain" />
                    {product.badge && (
                      <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">{product.badge}</Badge>
                    )}
                  </div>
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product.slug}`}>
                    <h3 className="font-semibold text-sm text-foreground mb-1 line-clamp-2 hover:text-secondary transition-colors">{product.name}</h3>
                  </Link>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                    <span className="text-yellow-500">★</span> {product.rating} ({product.reviews_count})
                  </div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="font-display font-bold text-lg text-foreground">{formatPrice(product.price)}</span>
                    {product.original_price && (
                      <span className="text-sm text-muted-foreground line-through">{formatPrice(product.original_price)}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 gap-1 text-xs" onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image || "/placeholder.svg", slug: product.slug })}>
                      <ShoppingCart className="h-3 w-3" /> Add to Cart
                    </Button>
                    <a href={getWhatsAppLink(`I want to order: ${product.name} (${formatPrice(product.price)})`)} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="outline" className="text-xs border-green-500 text-green-600 hover:bg-green-50">
                        WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-8 sm:hidden">
          <Link to="/products">
            <Button variant="outline" className="gap-2">View All Products <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
