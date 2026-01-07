import { useState, useEffect, useCallback } from "react";

interface UseOfflineStorageOptions<T> {
  key: string;
  initialValue: T;
}

export const useOfflineStorage = <T>({
  key,
  initialValue,
}: UseOfflineStorageOptions<T>) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingSync, setPendingSync] = useState<T[]>([]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Failed to persist to localStorage:", error);
    }
  }, [key, value]);

  // Sync pending changes when online
  useEffect(() => {
    if (isOnline && pendingSync.length > 0) {
      // TODO: Implement sync with backend
      console.log("Syncing pending changes:", pendingSync);
      setPendingSync([]);
    }
  }, [isOnline, pendingSync]);

  const update = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof newValue === "function"
          ? (newValue as (prev: T) => T)(prev)
          : newValue;

        if (!isOnline) {
          setPendingSync((p) => [...p, resolved]);
        }

        return resolved;
      });
    },
    [isOnline]
  );

  const clear = useCallback(() => {
    localStorage.removeItem(key);
    setValue(initialValue);
  }, [key, initialValue]);

  return {
    value,
    update,
    clear,
    isOnline,
    hasPendingSync: pendingSync.length > 0,
  };
};
