import Layout from "@/components/layout/Layout";

export default function Placeholder({ title, description }: { title: string; description?: string }) {
  return (
    <Layout>
      <div className="glass rounded-2xl border border-white/10 p-10 text-center max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold neon-text mb-2">{title}</h1>
        <p className="text-muted-foreground">
          {description || "This page is ready to be filled. Continue prompting to generate a dedicated dashboard for this section."}
        </p>
      </div>
    </Layout>
  );
}
