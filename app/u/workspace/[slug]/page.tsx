"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import WorkspaceNavbar from "@/components/Workspace/WorkspaceNavbar";
import ProjectCard from "@/components/Workspace/ProjectCard";
import CreateProjectModal from "@/components/Workspace/CreateProjectModal";
import LoadingScreen from "@/components/LoadingScreen";
import { FolderPlusIcon } from "@heroicons/react/24/outline";
import { getArchitecturesByWorkspace, createArchitecture } from "@/api/project";
import useUserStore from "@/store/useUserStore";

interface Project {
  id: string;
  name: string;
  logo: string;
  memberAvatar: string;
  memberInitial: string;
  createdAt: string;
}

function ProjectCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 w-full h-full animate-pulse flex flex-col justify-between">
      <div>
        <div className="flex justify-end mb-2">
          {/* Menu placeholder position */}
        </div>
        <div className="w-14 h-14 bg-gray-200 rounded-lg mb-4" />
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
  );
}

export default function WorkspaceDashboard() {
  const params = useParams();
  const router = useRouter();
  const workspaceSlug = params.slug as string;
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [loadingProjectName, setLoadingProjectName] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  const user = useUserStore((s) => s.user);
  const token = useUserStore((s) => s.token);

  const fetchProjects = useCallback(async () => {
    try {
      setIsFetching(true);
      
      const storedWorkspace = localStorage.getItem("yve_workspace");
      if (!storedWorkspace || !token) return;

      const workspace = JSON.parse(storedWorkspace);
      const res = await getArchitecturesByWorkspace(token, workspace.id);

      if (res.success && res.data?.architectures) {
        const storedUser = localStorage.getItem("yve_user");
        const currentUser = storedUser ? JSON.parse(storedUser) : null;
        const avatarUrl = currentUser?.avatar_url || "";
        const initial = currentUser?.name?.charAt(0)?.toUpperCase() || "U";

        const mapped: Project[] = res.data.architectures.map((arch: any) => ({
          id: arch.id,
          name: arch.name,
          logo: arch.logo_url || "/default_logo.svg",
          memberAvatar: avatarUrl,
          memberInitial: initial,
          createdAt: arch.created_at,
        }));

        setProjects(mapped);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setIsFetching(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleProjectClick = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    setLoadingProjectName(project.name);
    setIsLoading(true);

    setTimeout(() => {
      router.push(`/u/workspace/${workspaceSlug}/project/${projectId}`);
    }, 5000);
  };

  const handleCreateProject = async (data: {
    name: string;
    description: string;
    logo?: string;
  }) => {
    try {
      const storedWorkspace = localStorage.getItem("yve_workspace");
      if (!storedWorkspace || !token) return;

      const workspace = JSON.parse(storedWorkspace);
      const res = await createArchitecture(token, {
        workspace_id: workspace.id,
        name: data.name,
        description: data.description || undefined,
        logo_url: data.logo || undefined,
      });

      if (res.success) {
        setIsCreateModalOpen(false);
        await fetchProjects();
      }
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoading && (
        <LoadingScreen
          title="Opening your Project, Please Wait"
          subtitle={loadingProjectName}
        />
      )}

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateProject}
      />

      <WorkspaceNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name?.split(" ")[0] || "User"}!
            </h1>
            <p className="text-gray-600">
              Here are all your projects in this workspace
            </p>
          </div>

          {/* Create New Project */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg  hover:bg-primary-600 transition-colors cursor-pointer"
          >
            <FolderPlusIcon className="w-5 h-5 font-bold" />
            <span>New Project</span>
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isFetching
            ? Array.from({ length: 8 }).map((_, i) => (
                <ProjectCardSkeleton key={i} />
              ))
            : projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  name={project.name}
                  logo={project.logo}
                  memberAvatar={project.memberAvatar}
                  memberInitial={project.memberInitial}
                  createdAt={project.createdAt}
                  onClick={() => handleProjectClick(project.id)}
                />
              ))}
        </div>

        {/* Empty State - Show when no projects */}
        {!isFetching && projects.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-40 h-40 rounded-full bg-gray-100 mb-4">
              <svg
                className="w-24 h-24 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No projects yet
            </h3>
            <p className="text-gray-600 mb-6">
              Get started by creating your first project
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
