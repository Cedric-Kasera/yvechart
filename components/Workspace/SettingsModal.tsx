"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
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
  ExclamationTriangleIcon,
  UserCircleIcon,
  ArrowLeftIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { deleteWorkspace } from "@/api/user";
import useUserStore from "@/store/useUserStore";

type SettingsTab = "profile" | "settings" | "upgrade" | "help" | "account";
type HelpSubView = null | "contact" | "bug" | "feedback" | "changelog" | "docs";

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
  { id: "account" as SettingsTab, label: "Account", icon: UserCircleIcon },
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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Help sub-view state
  const [helpSubView, setHelpSubView] = useState<HelpSubView>(null);
  const [contactFrom, setContactFrom] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [bugType, setBugType] = useState("");
  const [bugDetails, setBugDetails] = useState("");
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const router = useRouter();
  const { token, clearAuth } = useUserStore();

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
                  $4.99
                  <span className="text-xs text-gray-500 font-normal">/mo</span>
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600 mb-4">
                <span>✓ Unlimited projects</span>
                <span>✓ Unlimited workspaces</span>
                <span>✓ Advanced AI features</span>
                <span>✓ Priority support</span>
                <span>✓ Team collaboration</span>
                <span>✓ Custom exports (SVG, PDF)</span>
                <span>✓ Version history</span>
                <span>✓ Custom Node Templates</span>
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
      case "help": {
        const resetHelpSubView = () => {
          setHelpSubView(null);
          setContactFrom("");
          setContactSubject("");
          setContactMessage("");
          setBugType("");
          setBugDetails("");
          setFeedbackRating(0);
          setFeedbackMessage("");
        };

        const BackButton = () => (
          <button
            onClick={resetHelpSubView}
            className="p-1.5 -ml-1 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeftIcon className="w-4 h-4" />
          </button>
        );

        /* ─── Contact Support ─── */
        if (helpSubView === "contact") {
          const contactToEmail = "stickrhive@gmail.com";
          const isContactValid =
            contactFrom.trim() !== "" && contactMessage.trim() !== "";

          return (
            <div className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <BackButton />
                <h2 className="text-lg font-semibold text-gray-900">
                  Contact Support
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    From
                  </label>
                  <input
                    type="email"
                    value={contactFrom}
                    onChange={(e) => setContactFrom(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    To
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={contactToEmail}
                      readOnly
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed pr-9"
                    />
                    <EnvelopeIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    RE:
                  </label>
                  <input
                    type="text"
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    placeholder="Subject"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      value={contactMessage}
                      onChange={(e) =>
                        e.target.value.length <= 150 &&
                        setContactMessage(e.target.value)
                      }
                      placeholder="How can we help?"
                      rows={4}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    />
                    <span className="absolute bottom-2 right-3 text-xs text-gray-400">
                      {contactMessage.length}/150
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    disabled={!isContactValid}
                    className="flex items-center gap-2 px-5 py-2 bg-primary-500 text-white text-sm rounded-lg hover:bg-primary-600 transition-colors font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <PaperAirplaneIcon className="w-4 h-4" />
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          );
        }

        /* ─── Report a Bug ─── */
        if (helpSubView === "bug") {
          const bugTypes = [
            { label: "Select a bug type", value: "" },
            { label: "UI / Visual Issue", value: "ui" },
            { label: "Crash / Freeze", value: "crash" },
            { label: "Data Loss", value: "data-loss" },
            { label: "Performance", value: "performance" },
            { label: "Authentication", value: "auth" },
            { label: "Other", value: "other" },
          ];
          const isBugValid = bugType.trim() !== "" && bugDetails.trim() !== "";

          return (
            <div className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <BackButton />
                <h2 className="text-lg font-semibold text-gray-900">
                  Report a Bug
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Bug Type
                  </label>
                  <select
                    value={bugType}
                    onChange={(e) => setBugType(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer"
                  >
                    {bugTypes.map((opt) => (
                      <option
                        key={opt.value}
                        value={opt.value}
                        disabled={opt.value === ""}
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Details
                  </label>
                  <div className="relative">
                    <textarea
                      value={bugDetails}
                      onChange={(e) =>
                        e.target.value.length <= 150 &&
                        setBugDetails(e.target.value)
                      }
                      placeholder="Describe the bug..."
                      rows={4}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    />
                    <span className="absolute bottom-2 right-3 text-xs text-gray-400">
                      {bugDetails.length}/150
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    disabled={!isBugValid}
                    className="flex items-center gap-2 px-5 py-2 bg-primary-500 text-white text-sm rounded-lg hover:bg-primary-600 transition-colors font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <BugAntIcon className="w-4 h-4" />
                    Submit Report
                  </button>
                </div>
              </div>
            </div>
          );
        }

        /* ─── Feedback ─── */
        if (helpSubView === "feedback") {
          const isFeedbackValid =
            feedbackRating > 0 || feedbackMessage.trim() !== "";

          return (
            <div className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <BackButton />
                <h2 className="text-lg font-semibold text-gray-900">
                  Feedback
                </h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    How would you rate your experience?
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setFeedbackRating(star)}
                        className="cursor-pointer transition-transform hover:scale-110"
                      >
                        {star <= feedbackRating ? (
                          <StarSolid className="w-8 h-8 text-amber-400" />
                        ) : (
                          <StarOutline className="w-8 h-8 text-gray-300 hover:text-amber-300" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      value={feedbackMessage}
                      onChange={(e) =>
                        e.target.value.length <= 150 &&
                        setFeedbackMessage(e.target.value)
                      }
                      placeholder="Tell us what you think..."
                      rows={4}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    />
                    <span className="absolute bottom-2 right-3 text-xs text-gray-400">
                      {feedbackMessage.length}/150
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    disabled={!isFeedbackValid}
                    className="flex items-center gap-2 px-5 py-2 bg-primary-500 text-white text-sm rounded-lg hover:bg-primary-600 transition-colors font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <PaperAirplaneIcon className="w-4 h-4" />
                    Submit Feedback
                  </button>
                </div>
              </div>
            </div>
          );
        }

        /* ─── Documentation ─── */
        if (helpSubView === "docs") {
          const docSections = [
            {
              heading: "1. Introduction",
              content:
                "YveChart is a visual architecture design tool that lets you map out system architectures using an interactive drag-and-drop canvas. Create workspaces, organize projects, and export publication-ready diagrams — all from your browser.",
            },
            {
              heading: "2. Getting Started",
              sub: [
                {
                  heading: "2.1 Creating a Workspace",
                  content:
                    "After signing up and activating your account, you'll be prompted to create a workspace. Give it a name — this is your home for all architecture projects.",
                },
                {
                  heading: "2.2 Creating a Project",
                  content:
                    'Click the \"New Project\" button on your workspace dashboard. Enter a project name (required) and an optional description (max 100 characters), then hit Create.',
                },
              ],
            },
            {
              heading: "3. Canvas",
              sub: [
                {
                  heading: "3.1 Nodes & Edges",
                  content:
                    "Nodes represent services, databases, users, and other components. Edges are the connections between them. Together they form your architecture diagram.",
                },
                {
                  heading: "3.2 Drag-and-Drop",
                  content:
                    "Drag node types from the left sidebar and drop them onto the canvas to add new components. Reposition existing nodes by dragging them to a new location.",
                },
                {
                  heading: "3.3 Connecting Nodes",
                  content:
                    "Hover over a node to reveal its connection handles. Click and drag from a handle to another node's handle to create an edge between them.",
                },
                {
                  heading: "3.4 Deleting Nodes & Edges",
                  content:
                    "Select a node or edge by clicking on it, then press the Backspace key to remove it from the canvas.",
                },
                {
                  heading: "3.5 Node Configuration",
                  content:
                    "Double-click a node to open its configuration dialog where you can edit its label, type, and other properties.",
                },
              ],
            },
            {
              heading: "4. Saving & Exporting",
              sub: [
                {
                  heading: "4.1 Save Project",
                  content:
                    'Click the \"Save & Export\" dropdown in the header and select \"Save Project\" to persist your canvas changes to the server. The save button is only active when unsaved changes exist.',
                },
                {
                  heading: "4.2 Export to PNG",
                  content:
                    'Select \"Download PNG\" from the same dropdown to export your diagram as a high-resolution PNG image.',
                },
                {
                  heading: "4.3 Unsaved Changes Guard",
                  content:
                    "Navigating away or closing the tab with unsaved changes will trigger a confirmation dialog, giving you the option to save, discard, or cancel.",
                },
              ],
            },
            {
              heading: "5. Keyboard Shortcuts",
              content:
                "⌘K / Ctrl+K — Open quick search. Backspace — Delete selected node or edge. Standard browser shortcuts (Ctrl+Z, Ctrl+Y) work for undo/redo where supported.",
            },
          ];

          return (
            <div className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <BackButton />
                <h2 className="text-lg font-semibold text-gray-900">
                  Documentation
                </h2>
              </div>

              <p className="text-sm text-gray-500 mb-6">
                Everything you need to know to get the most out of YveChart.
              </p>

              <div className="space-y-5">
                {docSections.map((section) => (
                  <div key={section.heading}>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1.5">
                      {section.heading}
                    </h3>
                    {section.content && (
                      <p className="text-xs text-gray-500 leading-relaxed mb-3">
                        {section.content}
                      </p>
                    )}
                    {section.sub && (
                      <div className="space-y-3 pl-3 border-l-2 border-gray-100">
                        {section.sub.map((sub) => (
                          <div key={sub.heading}>
                            <h4 className="text-[13px] font-medium text-gray-800 mb-1">
                              {sub.heading}
                            </h4>
                            <p className="text-xs text-gray-500 leading-relaxed">
                              {sub.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        }

        /* ─── What's New (Changelog) ─── */
        if (helpSubView === "changelog") {
          return (
            <div className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <BackButton />
                <h2 className="text-lg font-semibold text-gray-900">
                  What&apos;s New
                </h2>
              </div>

              <p className="text-sm text-gray-500 mb-6">
                Stay up to date with the latest changes, features, and
                improvements to YveChart.
              </p>

              {/* v1.0.0 */}
              <div className="rounded-xl border border-gray-200 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2.5 py-0.5 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
                    v1.0.0
                  </span>
                  <span className="text-xs text-gray-400">Initial Release</span>
                </div>

                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-1.5">
                  <SparklesIcon className="w-4 h-4 text-primary-500" />
                  Features
                </h4>

                <ul className="space-y-2.5">
                  {[
                    {
                      title: "Visual Architecture Canvas",
                      desc: "Drag-and-drop editor for designing system architectures with nodes and edges.",
                    },
                    {
                      title: "Workspace Management",
                      desc: "Create and manage workspaces to organize your architecture projects.",
                    },
                    {
                      title: "Project CRUD",
                      desc: "Create, view, update, and delete architecture projects within a workspace.",
                    },
                    {
                      title: "Auto-save & Change Detection",
                      desc: "Tracks unsaved canvas changes with save prompts before navigating away.",
                    },
                    {
                      title: "PNG Export",
                      desc: "Download your architecture diagrams as high-quality PNG images.",
                    },
                    {
                      title: "Authentication & Activation",
                      desc: "Secure sign-up, email activation, login, and password reset flows.",
                    },
                    {
                      title: "User Profile & Settings",
                      desc: "Customizable profile, appearance, editor preferences, and notification controls.",
                    },
                    {
                      title: "Keyboard Shortcuts",
                      desc: "Quick search with ⌘K and streamlined navigation across the app.",
                    },
                  ].map((feature) => (
                    <li
                      key={feature.title}
                      className="flex items-start gap-2.5"
                    >
                      <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {feature.title}
                        </p>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        }

        /* ─── Default help grid ─── */
        const helpItems: {
          icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
          label: string;
          desc: string;
          action?: () => void;
        }[] = [
          {
            icon: BookOpenIcon,
            label: "Documentation",
            desc: "Guides & tutorials",
            action: () => setHelpSubView("docs"),
          },
          {
            icon: EnvelopeIcon,
            label: "Contact Support",
            desc: "Get in touch",
            action: () => setHelpSubView("contact"),
          },
          {
            icon: UserGroupIcon,
            label: "Community",
            desc: "Join the forum",
            action: () => router.push("/c/community"),
          },
          {
            icon: BugAntIcon,
            label: "Report a Bug",
            desc: "Help us improve",
            action: () => setHelpSubView("bug"),
          },
          {
            icon: ChatBubbleLeftEllipsisIcon,
            label: "Feedback",
            desc: "Share your ideas",
            action: () => setHelpSubView("feedback"),
          },
          {
            icon: ShieldCheckIcon,
            label: "Privacy",
            desc: "Data & security",
            action: () => router.push("/privacy"),
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
            action: () => setHelpSubView("changelog"),
          },
        ];

        return (
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">
              Help & Support
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {helpItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={item.action}
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
      }

      /* ═══════ ACCOUNT ═══════ */
      case "account": {
        const storedWorkspace =
          typeof window !== "undefined"
            ? localStorage.getItem("yve_workspace")
            : null;
        const workspace = storedWorkspace ? JSON.parse(storedWorkspace) : null;
        const workspaceName = workspace?.name || "my workspace";
        const confirmPhrase = `sudo delete workspace ${workspaceName}`;
        const inputMatches = deleteInput.trim() === confirmPhrase;

        return (
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">
              Account
            </h2>

            <SectionTitle>Danger Zone</SectionTitle>

            <div className="mt-3 rounded-xl border border-red-200 bg-red-50/50 p-5">
              <div className="flex items-start gap-3">
                <ExclamationTriangleIcon className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    Delete Workspace
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">
                    This will permanently delete your workspace, all projects,
                    and associated data. This action cannot be undone.
                  </p>
                  <button
                    onClick={() => {
                      setDeleteInput("");
                      setShowDeleteDialog(true);
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                  >
                    Delete Workspace
                  </button>
                </div>
              </div>
            </div>

            {/* Delete Confirmation Dialog */}
            {showDeleteDialog && (
              <div className="fixed inset-0 z-70 flex items-center justify-center">
                <div
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                  onClick={() => !isDeleting && setShowDeleteDialog(false)}
                />
                <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                      <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">
                        Confirm Deletion
                      </h3>
                      <p className="text-xs text-gray-500">
                        This action is irreversible
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    To confirm, type{" "}
                    <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded text-red-600 select-all">
                      {confirmPhrase}
                    </span>{" "}
                    below:
                  </p>

                  <input
                    type="text"
                    value={deleteInput}
                    onChange={(e) => setDeleteInput(e.target.value)}
                    placeholder={confirmPhrase}
                    disabled={isDeleting}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-transparent mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  />

                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => setShowDeleteDialog(false)}
                      disabled={isDeleting}
                      className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={async () => {
                        if (!inputMatches || !token) return;
                        setIsDeleting(true);
                        try {
                          await deleteWorkspace(token);
                          clearAuth();
                          router.replace("/auth/login");
                        } catch {
                          console.error("Failed to delete workspace");
                        } finally {
                          setIsDeleting(false);
                          setShowDeleteDialog(false);
                        }
                      }}
                      disabled={!inputMatches || isDeleting}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isDeleting && (
                        <svg
                          className="w-4 h-4 animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                      )}
                      {isDeleting ? "Deleting..." : "Delete Workspace"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      }

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
