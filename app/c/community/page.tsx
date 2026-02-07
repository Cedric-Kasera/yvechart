import Navbar from "@/components/Landing/Navbar";
import Footer from "@/components/Landing/Footer";
import { UserGroupIcon } from "@heroicons/react/24/outline";

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center">
            <UserGroupIcon className="w-8 h-8 text-primary-500" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Community</h1>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            We&apos;re building a space for architects, developers, and
            designers to share ideas, ask questions, and collaborate. Stay
            tuned!
          </p>

          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 text-sm font-medium rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500" />
            </span>
            Coming Soon
          </span>
        </div>
      </main>

      <Footer />
    </div>
  );
}
