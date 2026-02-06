import { useEffect } from "react";
import { useLocalStorageState } from "./useLocalStorageState";

function getInitialDarkMode() {
  // default: follow system preference if there is no localStorage value yet
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
}

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    getInitialDarkMode(),
    "isDarkMode"
  ) as [boolean, (value: boolean | ((v: boolean) => boolean)) => void];

  useEffect(() => {
    document.documentElement.dataset.theme = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  return { isDarkMode, toggleDarkMode };
}

