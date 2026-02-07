import React from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

interface ProjectCardProps {
  id: string;
  name: string;
  logo?: string;
  memberAvatar?: string;
  memberInitial?: string;
  createdAt: string;
  onClick?: () => void;
}

export default function ProjectCard({
  name,
  logo = "/default_logo.svg",
  memberAvatar,
  memberInitial = "U",
  createdAt,
  onClick,
}: ProjectCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <button
      onClick={onClick}
      className="group relative bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-lg hover:border-primary-300 transition-all duration-200 text-left w-full"
    >
      {/* Ellipsis Menu - Top Right */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Handle menu click
          }}
          className="p-1.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
        >
          <EllipsisHorizontalIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Logo */}
      <div className="mb-4">
        <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden group-hover:border-primary-200 transition-colors">
          <Image
            src={logo}
            alt={name}
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
      </div>

      {/* Project Name */}
      <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors truncate">
        {name}
      </h3>

      {/* Footer */}
      <div className="flex items-center justify-between">
        {/* Member Avatar */}
        <div className="flex items-center">
          <Avatar size="sm" className="ring-2 ring-white">
            <AvatarImage src={memberAvatar} alt="Member" />
            <AvatarFallback>{memberInitial}</AvatarFallback>
          </Avatar>
        </div>

        {/* Created Date */}
        <span className="text-xs text-gray-500">{formatDate(createdAt)}</span>
      </div>
    </button>
  );
}
