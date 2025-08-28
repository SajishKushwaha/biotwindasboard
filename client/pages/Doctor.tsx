import Layout from "@/components/layout/Layout";
import ShareForm from "@/components/doctor/ShareForm";
import Preview from "@/components/doctor/Preview";
import ExportBar from "@/components/dashboard/ExportBar";

export default function Doctor() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold neon-text">Doctor / Share</h1>
        </div>
        <div className="grid lg:grid-cols-3 gap-4 items-start">
          <div className="lg:col-span-2 order-2 lg:order-1 space-y-4">
            <Preview />
            <ExportBar />
          </div>
          <div className="order-1 lg:order-2 space-y-4">
            <ShareForm />
          </div>
        </div>
      </div>
    </Layout>
  );
}
