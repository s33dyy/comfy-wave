"use client";

import React, { createContext, useContext } from "react";
import type { StoreSettings } from "@/types/store";

const SettingsContext = createContext<Partial<StoreSettings>>({});

export function SettingsProvider({ settings, children }: { settings: Partial<StoreSettings>, children: React.ReactNode }) {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useStoreSettings() {
  return useContext(SettingsContext);
}
