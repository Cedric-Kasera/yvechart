"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock suggestions data
const mockSuggestions = [
  {
    id: "1",
    title: "Netflix Clone Architecture",
    type: "Project",
    logo: "/default_logo.svg",
    memberAvatar: "https://github.com/shadcn.png",
    memberInitial: "U",
    createdAt: "2024-02-01T10:30:00Z",
  },
  {
    id: "2",
    title: "StudyBuddy Architecture",
    type: "Project",
    logo: "/default_logo.svg",
    memberAvatar: "https://github.com/shadcn.png",
    memberInitial: "U",
    createdAt: "2024-02-03T14:20:00Z",
  },
  {
    id: "3",
    title: "YveChart web Application",
    type: "Project",
    logo: "/default_logo.svg",
    memberAvatar: "https://github.com/shadcn.png",
    memberInitial: "U",
    createdAt: "2024-02-05T09:15:00Z",
  },
  {
    id: "4",
    title: "Sales Dashboard",
    type: "Project",
    logo: "/default_logo.svg",
    memberAvatar: "https://github.com/shadcn.png",
    memberInitial: "U",
    createdAt: "2024-01-28T16:45:00Z",
  },
  {
    id: "5",
    title: "Marketing Analytics",
    type: "Project",
    logo: "/default_logo.svg",
    memberAvatar: "https://github.com/shadcn.png",
    memberInitial: "U",
    createdAt: "2024-01-25T11:20:00Z",
  },
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] =
    useState(mockSuggestions);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredSuggestions(mockSuggestions);
    } else {
      const filtered = mockSuggestions.filter((suggestion) =>
        suggestion.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredSuggestions(filtered);
    }
    setSelectedIndex(0); // Reset selection when results change
  }, [searchQuery]);

  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredSuggestions.length - 1 ? prev + 1 : prev,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          e.preventDefault();
          if (filteredSuggestions[selectedIndex]) {
            handleSuggestionClick(filteredSuggestions[selectedIndex].id);
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredSuggestions, selectedIndex]);

  const handleSuggestionClick = (suggestionId: string) => {
    console.log("Selected:", suggestionId);
    onClose();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto text-base"
            autoFocus
          />
          <Kbd className="text-xs">ESC</Kbd>
        </div>

        {/* Suggestions */}
        <div className="max-h-96 overflow-y-auto">
          {filteredSuggestions.length > 0 ? (
            <div className="py-2">
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion.id)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left group cursor-pointer ${
                    index === selectedIndex
                      ? "bg-primary-50 border-l-2 border-primary-500"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden transition-colors ${
                      index === selectedIndex
                        ? "bg-primary-100"
                        : "group-hover:bg-primary-50"
                    }`}
                  >
                    <Image
                      src={suggestion.logo}
                      alt={suggestion.title}
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium truncate ${
                        index === selectedIndex
                          ? "text-primary-700"
                          : "text-gray-900"
                      }`}
                    >
                      {suggestion.title}
                    </p>
                    <p className="text-xs text-gray-500">{suggestion.type}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar size="sm" className="ring-1 ring-gray-200">
                      <AvatarImage src={suggestion.memberAvatar} alt="Member" />
                      <AvatarFallback>
                        {suggestion.memberInitial}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(suggestion.createdAt)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <MagnifyingGlassIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-900 mb-1">
                No results found
              </p>
              <p className="text-xs text-gray-500">
                Try searching with different keywords
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Kbd>↑↓</Kbd>
              <span>Navigate</span>
            </div>
            <div className="flex items-center gap-1">
              <Kbd>↵</Kbd>
              <span>Select</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
