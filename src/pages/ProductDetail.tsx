import { useParams, Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Star, ShieldCheck, Truck, Phone } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProduct, useProducts } from "@/hooks/use-products";
import { useCart } from "@/lib/cart-store";
import { formatPrice, getWhatsAppLink } from "@/lib/data";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading } = useProduct(slug || "");
  const { data: allProducts } = useProducts();
  const { addItem } = useCart();

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-12">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="grid md:grid-cols-2 gap-10">
            <Skeleton className="aspect-square rounded-xl" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/products"><Button>Back to Products</Button></Link>
        </div>
      </Layout>
    );
  }

  const related = allProducts?.filter((p) => p.category_id === product.category_id && p.id !== product.id).slice(0, 4) || [];

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || "/lovable-uploads/e3b90aa7-e402-4865-8367-c09eb717ae7c.jpg",
      slug: product.slug,
    });
  };

  return (
    <Layout>
      <div className="container py-8">
        <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Image */}
          <div className="relative aspect-square bg-muted rounded-xl p-8 flex items-center justify-center">
            <img src={product.image || "/lovable-uploads/e3b90aa7-e402-4865-8367-c09eb717ae7c.jpg"} alt={product.name} className="w-full h-full object-contain" />
            {product.badge && <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">{product.badge}</Badge>}
          </div>

          {/* Info */}
          <div>
            {product.categories && (
              <Link to={`/products?category=${(product.categories as any).slug}`} className="text-sm text-secondary font-medium hover:underline">
                {(product.categories as any).name}
              </Link>
            )}
            <h1 className="font-display text-3xl font-bold text-foreground mt-1 mb-3">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-medium text-foreground">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews_count} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-3xl font-bold text-foreground">{formatPrice(product.price)}</span>
              {product.original_price && (
                <span className="text-lg text-muted-foreground line-through">{formatPrice(product.original_price)}</span>
              )}
              {product.original_price && (
                <Badge variant="outline" className="text-green-600 border-green-300">
                  {Math.round(((product.original_price - product.price) / product.original_price) * 100)}% OFF
                </Badge>
              )}
            </div>

            <p className="text-muted-foreground mb-6">{product.description}</p>

            {product.safety_info && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-secondary/10 text-sm mb-6">
                <ShieldCheck className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                <span>{product.safety_info}</span>
              </div>
            )}

            <div className="flex gap-3 mb-6">
              <Button size="lg" className="flex-1 gap-2" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5" /> Add to Cart
              </Button>
              <a href={getWhatsAppLink(`I want to order: ${product.name} (${formatPrice(product.price)})`)} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
                  Order on WhatsApp
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 p-3 rounded-lg border">
                <Truck className="h-4 w-4 text-secondary" />
                <span>Delivery Across Pakistan</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg border">
                <ShieldCheck className="h-4 w-4 text-secondary" />
                <span>Safety Certified</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg border">
                <Phone className="h-4 w-4 text-secondary" />
                <span>Cash on Delivery</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg border">
                <Star className="h-4 w-4 text-secondary" />
                <span>Quality Guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p) => (
                <Link key={p.id} to={`/product/${p.slug}`} className="group bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-all">
                  <div className="aspect-square bg-muted p-4 flex items-center justify-center">
                    <img src={p.image || "/placeholder.svg"} alt={p.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm line-clamp-2">{p.name}</h3>
                    <span className="font-display font-bold text-foreground">{formatPrice(p.price)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
