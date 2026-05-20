"use client";
import { useState, useEffect } from "react";

export function useUnsavedChanges() {
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (!dirty) return;
    function handle(e) {
      e.preventDefault();
      e.returnValue = "";
    }
    window.addEventListener("beforeunload", handle);
    return () => window.removeEventListener("beforeunload", handle);
  }, [dirty]);

  return {
    dirty,
    markDirty: () => setDirty(true),
    clearDirty: () => setDirty(false),
  };
}
