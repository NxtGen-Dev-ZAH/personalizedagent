"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ContentDisplay } from "@/components/ContentDisplay";
import { AboutMe } from "@/components/AboutMe";

type TabId = "knowledge" | "lesson" | "routine" | "todos" | "researchsites" | null;

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <main
        className={`flex-1 pr-6 py-16 lg:pr-10 mt-16 lg:mt-0 transition-all duration-300 ${
          isSidebarCollapsed ? "lg:ml-[30px]" : "lg:ml-[40px]"
        }`}
      >
        <div className="max-w-7xl">
          {activeTab === null ? <AboutMe /> : <ContentDisplay activeTab={activeTab} />}
        </div>
      </main>
    </div>
  );
}
