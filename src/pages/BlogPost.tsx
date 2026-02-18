import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data } = await supabase.from("blog_posts").select("*").eq("slug", slug!).eq("published", true).single();
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-12 max-w-3xl">
          <Skeleton className="h-8 w-48 mb-6" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="aspect-video mb-6" />
          <Skeleton className="h-64 w-full" />
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <Link to="/blog"><Button>Back to Blog</Button></Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        {post.category && <span className="text-xs text-secondary font-medium uppercase">{post.category}</span>}
        <h1 className="font-display text-3xl md:text-4xl font-bold mt-1 mb-4">{post.title}</h1>
        <p className="text-sm text-muted-foreground mb-6">{new Date(post.created_at).toLocaleDateString()}</p>

        {post.image && (
          <div className="aspect-video bg-muted rounded-xl overflow-hidden mb-8">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <article className="prose prose-sm max-w-none text-foreground prose-headings:font-display prose-headings:text-foreground prose-a:text-secondary">
          <div dangerouslySetInnerHTML={{ __html: post.content?.replace(/\n/g, "<br/>") || "" }} />
        </article>
      </div>
    </Layout>
  );
}
