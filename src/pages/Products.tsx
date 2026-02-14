import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Grid3X3, List, ShoppingCart, Filter } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { products, categories, formatPrice, getWhatsAppLink } from "@/lib/data";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("featured");

  const activeCategory = searchParams.get("category") || "all";

  const filtered = useMemo(() => {
    let result = products;
    if (activeCategory !== "all") result = result.filter((p) => p.category === activeCategory);
    if (search) result = result.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    if (sort === "price-low") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-high") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "rating") result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [activeCategory, search, sort]);

  return (
    <Layout>
      {/* Header */}
      <section className="bg-primary py-12">
        <div className="container">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
            Our <span className="text-secondary">Products</span>
          </h1>
          <p className="text-primary-foreground/60">Browse certified gas products for every need.</p>
        </div>
      </section>

      <div className="container py-8">
        {/* Filters bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-1">
            <Button variant={view === "grid" ? "default" : "outline"} size="icon" onClick={() => setView("grid")}><Grid3X3 className="h-4 w-4" /></Button>
            <Button variant={view === "list" ? "default" : "outline"} size="icon" onClick={() => setView("list")}><List className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSearchParams({})}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeCategory === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSearchParams({ category: cat.id })}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeCategory === cat.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Filter className="h-12 w-12 mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm">Try adjusting your filters or search.</p>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group bg-card rounded-xl border overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="relative aspect-square bg-muted p-6 flex items-center justify-center">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                  {product.badge && <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">{product.badge}</Badge>}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm text-foreground mb-1 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                    <span className="text-yellow-500">★</span> {product.rating} ({product.reviews})
                  </div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="font-display font-bold text-lg text-foreground">{formatPrice(product.price)}</span>
                    {product.originalPrice && <span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 gap-1 text-xs"><ShoppingCart className="h-3 w-3" /> Add to Cart</Button>
                    <a href={getWhatsAppLink(`I want to order: ${product.name} (${formatPrice(product.price)})`)} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="outline" className="text-xs border-green-500 text-green-600 hover:bg-green-50">WhatsApp</Button>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex gap-4 bg-card rounded-xl border p-4 hover:shadow-md transition-all"
              >
                <div className="w-24 h-24 bg-muted rounded-lg p-2 shrink-0 flex items-center justify-center">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{product.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                    </div>
                    {product.badge && <Badge className="bg-secondary text-secondary-foreground shrink-0">{product.badge}</Badge>}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display font-bold text-lg">{formatPrice(product.price)}</span>
                      {product.originalPrice && <span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="gap-1 text-xs"><ShoppingCart className="h-3 w-3" /> Add to Cart</Button>
                      <a href={getWhatsAppLink(`I want to order: ${product.name}`)} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="outline" className="text-xs border-green-500 text-green-600 hover:bg-green-50">WhatsApp</Button>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
