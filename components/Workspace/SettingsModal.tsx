"use client";

import React, { useState, useRef } from "react";
import {
  UserIcon,
  Cog6ToothIcon,
  SparklesIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
  CameraIcon,
  BookOpenIcon,
  ChatBubbleLeftEllipsisIcon,
  UserGroupIcon,
  BugAntIcon,
  EnvelopeIcon,
  KeyIcon,
  CheckIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

type SettingsTab = "profile" | "settings" | "upgrade" | "help";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

const tabs = [
  { id: "profile" as SettingsTab, label: "Profile", icon: UserIcon },
  { id: "settings" as SettingsTab, label: "Settings", icon: Cog6ToothIcon },
  { id: "upgrade" as SettingsTab, label: "Upgrade Plan", icon: SparklesIcon },
  {
    id: "help" as SettingsTab,
    label: "Help & Support",
    icon: QuestionMarkCircleIcon,
  },
];

const accentColors = [
  { name: "Red", value: "#F15757" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Green", value: "#10B981" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Orange", value: "#F59E0B" },
  { name: "Pink", value: "#EC4899" },
  { name: "Teal", value: "#14B8A6" },
  { name: "Indigo", value: "#6366F1" },
];

/* ─── Reusable row: label left, control right ─── */
function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        {description && (
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        )}
      </div>
      <div className="shrink-0 ml-4">{children}</div>
    </div>
  );
}

/* ─── Toggle switch ─── */
function Toggle({ defaultChecked = false }: { defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <button
      type="button"
      onClick={() => setChecked(!checked)}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ${
        checked ? "bg-primary-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 mt-0.5 ${
          checked ? "translate-x-4 ml-0.5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

/* ─── Select dropdown ─── */
function Select({
  options,
  defaultValue,
}: {
  options: { label: string; value: string }[];
  defaultValue?: string;
}) {
  return (
    <select
      defaultValue={defaultValue}
      className="text-sm bg-gray-100 border-0 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-hidden focus:ring-2 focus:ring-primary-500 cursor-pointer"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

/* ─── Section divider ─── */
function Divider() {
  return <div className="border-t border-gray-100" />;
}

/* ─── Section heading ─── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wider mt-5 mb-1">
      {children}
    </h3>
  );
}

export default function SettingsModal({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
}: SettingsModalProps) {
  const [avatarPreview, setAvatarPreview] = useState<string>(
    "https://github.com/shadcn.png",
  );
  const [selectedAccent, setSelectedAccent] = useState("#F15757");
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  /* ───────────── Tab content ───────────── */
  const renderContent = () => {
    switch (activeTab) {
      /* ═══════ PROFILE ═══════ */
      case "profile":
        return (
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">
              Profile
            </h2>

            {/* Avatar */}
            <div className="flex items-center gap-4 pb-5 border-b border-gray-100">
              <div className="relative group">
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-200"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <CameraIcon className="w-5 h-5 text-white" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Profile Photo
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs text-primary-600 hover:text-primary-700 font-medium mt-0.5 cursor-pointer"
                >
                  Upload new photo
                </button>
              </div>
            </div>

            {/* Fields */}
            <div className="space-y-4 mt-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Preferred Name
                </label>
                <input
                  type="text"
                  defaultValue="User"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    defaultValue="user@example.com"
                    readOnly
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed pr-9"
                  />
                  <EnvelopeIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Contact support to change your email
                </p>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <KeyIcon className="w-4 h-4" />
                  Reset Password
                </button>
                <p className="text-xs text-gray-400 mt-1.5">
                  We&apos;ll send a reset link to your email
                </p>
              </div>

              <div className="pt-4">
                <button className="px-5 py-2 bg-primary-500 text-white text-sm rounded-lg hover:bg-primary-600 transition-colors font-medium cursor-pointer">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );

      /* ═══════ SETTINGS ═══════ */
      case "settings":
        return (
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              General
            </h2>

            <SettingRow label="Appearance">
              <Select
                defaultValue="system"
                options={[
                  { label: "System", value: "system" },
                  { label: "Light", value: "light" },
                  { label: "Dark", value: "dark" },
                ]}
              />
            </SettingRow>
            <Divider />

            <SettingRow label="Accent color" description="Buttons & highlights">
              <div className="flex items-center gap-1.5">
                {accentColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedAccent(color.value)}
                    className="w-7 h-7 rounded-full cursor-pointer flex items-center justify-center transition-transform hover:scale-110"
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                    {selectedAccent === color.value && (
                      <CheckIcon
                        className="w-3 h-3 text-white"
                        strokeWidth={3}
                      />
                    )}
                  </button>
                ))}
              </div>
            </SettingRow>
            <Divider />

            <SettingRow label="Language">
              <Select
                defaultValue="en"
                options={[
                  { label: "English", value: "en" },
                  { label: "Spanish", value: "es" },
                  { label: "French", value: "fr" },
                  { label: "German", value: "de" },
                  { label: "Japanese", value: "ja" },
                  { label: "Arabic", value: "ar" },
                ]}
              />
            </SettingRow>
            <Divider />

            <SettingRow label="Timezone">
              <Select
                defaultValue="auto"
                options={[
                  { label: "Auto-detect", value: "auto" },
                  { label: "UTC", value: "utc" },
                  { label: "EST (UTC-5)", value: "est" },
                  { label: "PST (UTC-8)", value: "pst" },
                  { label: "CET (UTC+1)", value: "cet" },
                  { label: "IST (UTC+5:30)", value: "ist" },
                ]}
              />
            </SettingRow>

            <SectionTitle>Editor</SectionTitle>

            <SettingRow
              label="Layout density"
              description="Controls spacing in the editor"
            >
              <Select
                defaultValue="comfortable"
                options={[
                  { label: "Comfortable", value: "comfortable" },
                  { label: "Compact", value: "compact" },
                ]}
              />
            </SettingRow>
            <Divider />

            <SettingRow
              label="Snap to grid"
              description="Align nodes when dragging"
            >
              <Toggle defaultChecked />
            </SettingRow>
            <Divider />

            <SettingRow label="Show minimap">
              <Toggle />
            </SettingRow>
            <Divider />

            <SettingRow label="Auto-save">
              <Toggle defaultChecked />
            </SettingRow>

            <SectionTitle>Notifications</SectionTitle>

            <SettingRow label="Email notifications">
              <Toggle defaultChecked />
            </SettingRow>
            <Divider />

            <SettingRow label="Push notifications">
              <Toggle defaultChecked />
            </SettingRow>
            <Divider />

            <SettingRow
              label="Sound effects"
              description="Play sounds for actions"
            >
              <Toggle />
            </SettingRow>
          </div>
        );

      /* ═══════ UPGRADE PLAN ═══════ */
      case "upgrade":
        return (
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">
              Subscription
            </h2>

            {/* Current Plan */}
            <div className="rounded-xl border border-gray-200 p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">
                    Free Plan
                  </span>
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-[11px] font-medium">
                    Active
                  </span>
                </div>
                <span className="font-semibold text-gray-900">
                  $0
                  <span className="text-xs text-gray-500 font-normal">/mo</span>
                </span>
              </div>
              <div className="flex gap-4 text-xs text-gray-500">
                <span>5 projects</span>
                <span>·</span>
                <span>1 workspace</span>
                <span>·</span>
                <span>Community support</span>
              </div>
            </div>

            {/* Pro Upgrade */}
            <div className="rounded-xl border-2 border-primary-200 bg-primary-50/30 p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <SparklesIcon className="w-4 h-4 text-primary-500" />
                  <span className="text-sm font-semibold text-gray-900">
                    Pro Plan
                  </span>
                </div>
                <span className="font-semibold text-primary-600">
                  $29
                  <span className="text-xs text-gray-500 font-normal">/mo</span>
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600 mb-4">
                <span>✓ Unlimited projects</span>
                <span>✓ Advanced AI features</span>
                <span>✓ Unlimited workspaces</span>
                <span>✓ Priority support</span>
                <span>✓ Team collaboration</span>
                <span>✓ Custom exports</span>
              </div>
              <button className="w-full px-4 py-2 bg-primary-500 text-white text-sm rounded-lg hover:bg-primary-600 transition-colors font-medium cursor-pointer">
                Upgrade to Pro
              </button>
            </div>

            <SectionTitle>Billing</SectionTitle>

            <SettingRow label="Payment method">
              <button className="text-sm text-primary-600 hover:text-primary-700 font-medium cursor-pointer">
                Add
              </button>
            </SettingRow>
            <Divider />

            <SettingRow label="Billing email">
              <span className="text-sm text-gray-500">user@example.com</span>
            </SettingRow>
            <Divider />

            <SettingRow label="Billing address">
              <button className="text-sm text-primary-600 hover:text-primary-700 font-medium cursor-pointer">
                Add
              </button>
            </SettingRow>
            <Divider />

            <SettingRow label="Invoice history">
              <span className="text-sm text-gray-400">No invoices yet</span>
            </SettingRow>
          </div>
        );

      /* ═══════ HELP & SUPPORT ═══════ */
      case "help":
        return (
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">
              Help & Support
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  {
                    icon: BookOpenIcon,
                    label: "Documentation",
                    desc: "Guides & tutorials",
                  },
                  {
                    icon: EnvelopeIcon,
                    label: "Contact Support",
                    desc: "Get in touch",
                  },
                  {
                    icon: UserGroupIcon,
                    label: "Community",
                    desc: "Join the forum",
                  },
                  {
                    icon: BugAntIcon,
                    label: "Report a Bug",
                    desc: "Help us improve",
                  },
                  {
                    icon: ChatBubbleLeftEllipsisIcon,
                    label: "Feedback",
                    desc: "Share your ideas",
                  },
                  {
                    icon: ShieldCheckIcon,
                    label: "Privacy",
                    desc: "Data & security",
                  },
                  {
                    icon: KeyIcon,
                    label: "API & Integrations",
                    desc: "Developer docs",
                  },
                  {
                    icon: SparklesIcon,
                    label: "What's New",
                    desc: "Changelog & updates",
                  },
                ] as const
              ).map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className="flex flex-col items-center justify-center gap-2 p-5 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50/50 transition-all cursor-pointer group"
                  >
                    <Icon className="w-6 h-6 text-gray-400 group-hover:text-primary-500 transition-colors" />
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">
                        {item.label}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  /* ───────────── Render ───────────── */
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl h-[80vh] flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 shrink-0 bg-gray-50/80 border-r border-gray-200 p-4 flex flex-col">
          <button
            onClick={onClose}
            className="w-fit p-1 text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors mb-4 cursor-pointer"
          >
            <XMarkIcon className="w-4.5 h-4.5" />
          </button>

          <nav className="space-y-0.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all text-[13px] cursor-pointer ${
                    isActive
                      ? "bg-primary-500 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">{renderContent()}</div>
      </div>
    </div>
  );
}
