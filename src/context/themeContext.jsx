import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProviderCustom({ children }) {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("themeMode");
    if (saved === "dark" || saved === "light") setMode(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleMode = () => setMode(prev => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
