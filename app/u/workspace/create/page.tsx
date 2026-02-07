"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useUserStore from "@/store/useUserStore";
import { createWorkspace } from "@/api/workspace";

export default function CreateWorkspacePage() {
  const router = useRouter();
  const { token } = useUserStore();
  const [name, setName] = useState("My Workspace");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("my-workspace");
  const [loading, setLoading] = useState(false);

  // Generate slug from workspace name
  useEffect(() => {
    const generatedSlug = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    setSlug(generatedSlug);
  }, [name]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !token) return;

    setLoading(true);
    try {
      const res = await createWorkspace(token, {
        name,
        description,
        slug,
      });

      if (!res.success) {
        toast.error(res.message || "Failed to create workspace");
        return;
      }

      toast.success(res.message || "Workspace created successfully");
      router.push(`/u/workspace/${slug}`);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);  
    }
  };

  const isFormValid = name.trim().length > 0;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Workspace
          </h1>
          <p className="text-gray-600">
            Set up your new workspace to get started
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Workspace Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Workspace Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                placeholder="Enter workspace name"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description{" "}
                <span className="text-gray-400 text-xs">(optional)</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value.slice(0, 100))}
                maxLength={100}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none resize-none"
                placeholder="Brief description of your workspace"
              />
              <div className="text-right mt-1">
                <span className="text-xs text-gray-500">
                  {description.length}/100
                </span>
              </div>
            </div>

            {/* Slug */}
            <div>
              <label
                htmlFor="slug"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Workspace URL
              </label>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">
                  yvechart.com/
                </span>
                <input
                  id="slug"
                  type="text"
                  value={slug}
                  readOnly
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Create Button */}
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className="w-full bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 cursor-pointer transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
            >
              {loading ? "Creating Workspace..." : "Create Workspace"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
