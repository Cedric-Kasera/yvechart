"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  MagnifyingGlassIcon,
  UserIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ArrowRightStartOnRectangleIcon,
  SparklesIcon,
  SlashIcon,
} from "@heroicons/react/24/outline";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SearchModal from "./SearchModal";
import SettingsModal from "./SettingsModal";

type SettingsTab = "profile" | "settings" | "upgrade" | "help";

export default function WorkspaceNavbar() {
  const params = useParams();
  const slug = params.slug as string;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] =
    useState<SettingsTab>("profile");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const workspaceName = slug
    ? slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Workspace";

  const handleOpenSettings = (tab: SettingsTab) => {
    setActiveSettingsTab(tab);
    setIsSettingsOpen(true);
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    // Add logout logic here
    console.log("Logging out...");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-1 shrink-0">
              <Image
                src="/yvechart_logo.svg"
                alt="YveChart"
                width={40}
                height={40}
                className="object-contain"
              />
              <div className="flex items-center gap-1 text-gray-400">
                <SlashIcon className="w-8 h-8 font-light" />
                <span className="text-xl font-semibold text-gray-900">
                  {workspaceName}
                </span>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <MagnifyingGlassIcon className="w-4 h-4" />
                <span>Search</span>
                <kbd className="hidden md:inline-flex items-center gap-1 ml-4 px-2 py-1 text-xs font-semibold text-gray-800 bg-white border border-gray-200 rounded">
                  ⌘ K
                </kbd>
              </button>

              {/* Avatar Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="relative cursor-pointer focus:outline-hidden"
                >
                  <Avatar className="ring-2 ring-primary-200 hover:ring-primary-300 transition-all">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="User"
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden py-1 z-50 animate-in fade-in zoom-in duration-200">
                    <button
                      onClick={() => handleOpenSettings("profile")}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <UserIcon className="w-4 h-4 text-gray-500 font-semibold" />
                      <span>Profile</span>
                    </button>

                    <button
                      onClick={() => handleOpenSettings("settings")}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <Cog6ToothIcon className="w-4 h-4 text-gray-500 font-semibold" />
                      <span>Settings</span>
                    </button>

                    <div className="border-y border-gray-100 my-1">
                      <button
                        onClick={() => handleOpenSettings("upgrade")}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-primary-600 hover:bg-primary-50 transition-colors cursor-pointer group"
                      >
                        <SparklesIcon className="w-4 h-4 text-primary-500 group-hover:scale-110 transition-transform font-semibold" />
                        <span>Upgrade Plan</span>
                      </button>
                    </div>

                    <button
                      onClick={() => handleOpenSettings("help")}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <QuestionMarkCircleIcon className="w-4 h-4 text-gray-500 font-semibold" />
                      <span>Help & Support</span>
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <ArrowRightStartOnRectangleIcon className="w-4 h-4 font-semibold" />
                      <span>LogOut</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        activeTab={activeSettingsTab}
        onTabChange={setActiveSettingsTab}
      />
    </>
  );
}
