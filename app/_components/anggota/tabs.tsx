"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface TabItem {
  key: string;
  label: string;
}

interface CustomTabsProps {
  onTabChange?: (key: string) => void;
}

// Tabs Konfirmasi: "Berhasil konfirmasi" & "Menunggu konfirmasi"
export function TabsKonfirmasi({ onTabChange }: CustomTabsProps) {
  const tabs: TabItem[] = [
    { key: "berhasil", label: "Berhasil konfirmasi" },
    { key: "menunggu", label: "Menunggu konfirmasi" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].key);

  function handleChange(value: string) {
    setActiveTab(value);
    if (onTabChange) onTabChange(value);
  }

  return (
    <Tabs value={activeTab} onValueChange={handleChange}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.key} value={tab.key}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.key} value={tab.key}>
          {/* Konten tab bisa dikustomisasi di halaman masing-masing */}
          <div>{`Konten tab "${tab.label}"`}</div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

// Tabs Riwayat: "Riwayat" & "Sedang Dipinjam"
export function TabsRiwayat({ onTabChange }: CustomTabsProps) {
  const tabs: TabItem[] = [
    { key: "riwayat", label: "Riwayat" },
    { key: "dipinjam", label: "Sedang Dipinjam" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].key);

  function handleChange(value: string) {
    setActiveTab(value);
    if (onTabChange) onTabChange(value);
  }

  return (
    <Tabs value={activeTab} onValueChange={handleChange}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.key} value={tab.key}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.key} value={tab.key}>
          {/* Konten tab bisa dikustomisasi di halaman masing-masing */}
          <div>{`Konten tab "${tab.label}"`}</div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
