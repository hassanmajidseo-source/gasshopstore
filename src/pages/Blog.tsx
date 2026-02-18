import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen } from "lucide-react";

export default function Blog() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data } = await supabase.from("blog_posts").select("*").eq("published", true).order("created_at", { ascending: false });
      return data || [];
    },
  });

  return (
    <Layout>
      <section className="bg-primary py-12">
        <div className="container">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
            GasShop <span className="text-secondary">Blog</span>
          </h1>
          <p className="text-primary-foreground/60">Safety guides, product tips, and industry insights.</p>
        </div>
      </section>

      <div className="container py-12">
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card border rounded-xl overflow-hidden">
                <Skeleton className="aspect-video" />
                <div className="p-5 space-y-2"><Skeleton className="h-5 w-3/4" /><Skeleton className="h-4 w-full" /></div>
              </div>
            ))}
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="group bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                {post.image ? (
                  <div className="aspect-video bg-muted">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <BookOpen className="h-10 w-10 text-muted-foreground/30" />
                  </div>
                )}
                <div className="p-5">
                  {post.category && <span className="text-xs text-secondary font-medium uppercase">{post.category}</span>}
                  <h3 className="font-display font-semibold mt-1 group-hover:text-secondary transition-colors line-clamp-2">{post.title}</h3>
                  {post.excerpt && <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{post.excerpt}</p>}
                  <p className="text-xs text-muted-foreground mt-3">{new Date(post.created_at).toLocaleDateString()}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium">No articles yet</p>
            <p className="text-sm">Check back soon for safety guides and product tips.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
