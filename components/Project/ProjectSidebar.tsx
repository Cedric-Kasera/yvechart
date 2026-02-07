"use client";

import React, { useState, useMemo } from "react";
import {
  MagnifyingGlassIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import {
  nodeCategories,
  searchNodes,
  type Category,
  type SubCategory,
  type NodeMetadata,
} from "@/lib/nodes";

interface ProjectSidebarProps {
  onDragStart?: (
    event: React.DragEvent,
    nodeType: string,
    label: string,
  ) => void;
}

type View =
  | { level: "categories" }
  | { level: "subcategories"; category: Category }
  | { level: "nodes"; category: Category; subCategory: SubCategory };

export default function ProjectSidebar({ onDragStart }: ProjectSidebarProps) {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<View>({ level: "categories" });

  const isSearching = search.trim().length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    return searchNodes(search);
  }, [search, isSearching]);

  const handleDragStart = (event: React.DragEvent, node: NodeMetadata) => {
    event.dataTransfer.setData("application/reactflow", node.id);
    event.dataTransfer.setData("application/reactflow-label", node.name);
    event.dataTransfer.setData("application/reactflow-icon", node.icon);
    event.dataTransfer.effectAllowed = "move";
    if (onDragStart) onDragStart(event, node.id, node.name);
  };

  const goBack = () => {
    if (view.level === "nodes") {
      setView({ level: "subcategories", category: view.category });
    } else if (view.level === "subcategories") {
      setView({ level: "categories" });
    }
  };

  const renderBreadcrumb = () => {
    if (view.level === "categories") return null;

    return (
      <div className="px-4 pt-3 pb-1 flex items-center gap-1 text-xs font-medium">
        <button
          onClick={() => setView({ level: "categories" })}
          className="text-gray-400 hover:text-primary-600 transition-colors cursor-pointer"
        >
          Nodes
        </button>
        {view.level === "subcategories" && (
          <>
            <ChevronRightIcon className="w-3 h-3 text-gray-500 shrink-0" />
            <span className="text-gray-700 truncate">
              {view.category.label}
            </span>
          </>
        )}
        {view.level === "nodes" && (
          <>
            <ChevronRightIcon className="w-3 h-3 text-gray-500 shrink-0" />
            <button
              onClick={() =>
                setView({ level: "subcategories", category: view.category })
              }
              className="text-gray-400 hover:text-primary-600 transition-colors truncate cursor-pointer"
            >
              {view.category.label}
            </button>
            <ChevronRightIcon className="w-3 h-3 text-gray-500 shrink-0" />
            <span className="text-gray-700 truncate">
              {view.subCategory.label}
            </span>
          </>
        )}
      </div>
    );
  };

  const renderNodeCard = (node: NodeMetadata) => (
    <div
      key={node.id}
      draggable
      onDragStart={(e) => handleDragStart(e, node)}
      className="flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-50 hover:bg-primary-50 cursor-grab active:cursor-grabbing transition-colors group border border-transparent hover:border-primary-200"
    >
      <div className="w-8 h-8 flex items-center justify-center">
        <i className={`ci ci-${node.icon} ci-2x`} />
      </div>
      <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900 text-center leading-tight truncate w-full">
        {node.name}
      </span>
    </div>
  );

  const renderNodeGrid = (nodes: NodeMetadata[]) => (
    <div className="grid grid-cols-2 gap-2">{nodes.map(renderNodeCard)}</div>
  );

  const renderCategories = () => (
    <div className="space-y-1">
      {nodeCategories.map((category) => {
        const nodeCount = category.subCategories.reduce(
          (sum, sub) => sum + sub.nodes.length,
          0,
        );
        return (
          <button
            key={category.id}
            onClick={() => setView({ level: "subcategories", category })}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
              {category.label}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">{nodeCount}</span>
              <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
            </div>
          </button>
        );
      })}
    </div>
  );

  const renderSubCategories = () => {
    if (view.level !== "subcategories") return null;
    const { category } = view;

    return (
      <div className="space-y-1">
        {category.subCategories.map((sub) => (
          <button
            key={sub.id}
            onClick={() =>
              setView({ level: "nodes", category, subCategory: sub })
            }
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
              {sub.label}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">{sub.nodes.length}</span>
              <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
            </div>
          </button>
        ))}
      </div>
    );
  };

  const renderNodes = () => {
    if (view.level !== "nodes") return null;
    return renderNodeGrid(view.subCategory.nodes);
  };

  const renderSearchResults = () => {
    if (searchResults.length === 0) {
      return (
        <div className="text-center py-8">
          <MagnifyingGlassIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-500">No nodes found</p>
        </div>
      );
    }

    return (
      <div className="space-y-5">
        {searchResults.map((category) =>
          category.subCategories.map((sub) => (
            <div key={`${category.id}-${sub.id}`}>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {category.label} &rsaquo; {sub.label}
              </p>
              {renderNodeGrid(sub.nodes)}
            </div>
          )),
        )}
      </div>
    );
  };

  const getTitle = () => {
    if (view.level === "nodes") return view.subCategory.label;
    if (view.level === "subcategories") return view.category.label;
    return "Nodes";
  };

  return (
    <aside className="w-[20vw] min-w-50 max-w-75 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-md font-semibold text-gray-900 mb-3">
          {getTitle()}
        </h2>
        <div className="relative">
          <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search nodes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
          />
        </div>
      </div>

      {/* Breadcrumb */}
      {!isSearching && renderBreadcrumb()}

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {isSearching
          ? renderSearchResults()
          : view.level === "categories"
            ? renderCategories()
            : view.level === "subcategories"
              ? renderSubCategories()
              : renderNodes()}
      </div>
    </aside>
  );
}
