import Layout from "@/components/layout/Layout";
import DeviceConnect from "@/components/doctor/DeviceConnect";
import UploadPanel from "@/components/doctor/UploadPanel";

export default function Connect() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold neon-text">Upload & Connect</h1>
        </div>
        <div className="grid lg:grid-cols-3 gap-4 items-start">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <UploadPanel />
          </div>
          <div className="order-1 lg:order-2">
            <DeviceConnect />
          </div>
        </div>
      </div>
    </Layout>
  );
}
