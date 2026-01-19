"use client";

import { useState } from "react";

export type TabId = "knowledge" | "lesson" | "routine" | "todos" | "researchsites" | null;

type Tab = {
  id: TabId;
  label: string;
  icon: string;
};

const tabs: Tab[] = [
  { id: "knowledge", label: "Knowledge", icon: "" },
  { id: "lesson", label: "Lesson", icon: "" },
  { id: "routine", label: "Routine", icon: "" },
  { id: "todos", label: "Todos", icon: "" },
  { id: "researchsites", label: "Research Sites", icon: "" },
];

type SidebarProps = {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
};

export function Sidebar({ activeTab, onTabChange, isCollapsed, onToggleCollapse }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-6 left-6 z-30 glass-panel p-3 border border-white/20 hover:bg-white/10 transition"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isMobileOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-20"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`glass-panel fixed  bottom-6 z-20 transition-all duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${
          isCollapsed ? "w-20" : "w-64"
        } p-5 lg:block`}
      >
        <div className="mb-8 flex items-center justify-between pt-6">
          {!isCollapsed && (
            <h2 className="text-xl font-semibold text-white">Navigation</h2>
          )}
          <button
            onClick={onToggleCollapse}
            className="lg:block hidden glass-panel p-2 border border-white/20 hover:bg-white/10 transition"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg
              className={`w-5 h-5 text-white transition-transform ${isCollapsed ? "rotate-180" : ""}`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => {
              onTabChange(null);
              setIsMobileOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all ${
              activeTab === null
                ? "bg-white/10 border border-white/20 text-white shadow-lg shadow-cyan-500/10"
                : "text-white/60 hover:bg-white/5 hover:text-white/80 border border-transparent"
            } ${isCollapsed ? "justify-center" : ""}`}
            title={isCollapsed ? "Home" : undefined}
          >
            {!isCollapsed && (
              <span 
                className="font-semibold text-sm uppercase tracking-wider"
                style={{ color: activeTab === null ? 'var(--mirror-gold)' : 'rgba(255, 255, 255, 0.7)' }}
              >
                Home
              </span>
            )}
            {isCollapsed && (
              <span 
                className="font-bold text-lg"
                style={{ color: activeTab === null ? 'var(--mirror-gold)' : 'rgba(255, 255, 255, 0.6)' }}
              >
                H
              </span>
            )}
          </button>
          {tabs.map((tab: Tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  onTabChange(tab.id);
                  setIsMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all ${
                  isActive
                    ? "bg-white/10 border border-white/20 text-white shadow-lg shadow-cyan-500/10"
                    : "text-white/60 hover:bg-white/5 hover:text-white/80 border border-transparent"
                } ${isCollapsed ? "justify-center" : ""}`}
                title={isCollapsed ? tab.label : undefined}
              >
                {!isCollapsed && (
                  <span 
                    className="font-semibold text-sm uppercase tracking-wider"
                    style={{ color: isActive ? 'var(--mirror-gold)' : 'rgba(255, 255, 255, 0.7)' }}
                  >
                    {tab.label}
                  </span>
                )}
                {isCollapsed && (
                  <span 
                    className="font-bold text-lg"
                    style={{ color: isActive ? 'var(--mirror-gold)' : 'rgba(255, 255, 255, 0.6)' }}
                  >
                    {tab.label.charAt(0)}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

