"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { THEME_STORAGE_KEY, ThemeMode } from "@/theme";

type ThemeContextValue = {
	theme: ThemeMode;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const readInitialTheme = (): ThemeMode => {
	if (typeof window === "undefined") return "dark";
	const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
	if (stored === "light" || stored === "dark") return stored;
	// stesso criterio dell'app mobile: rispetta la preferenza di sistema al primo avvio
	const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
	return prefersLight ? "light" : "dark";
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [theme, setTheme] = useState<ThemeMode>(readInitialTheme);

	useEffect(() => {
		document.documentElement.dataset.theme = theme;
		window.localStorage.setItem(THEME_STORAGE_KEY, theme);
	}, [theme]);

	const toggleTheme = useCallback(() => {
		setTheme((prev) => (prev === "dark" ? "light" : "dark"));
	}, []);

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useThemeContext = () => {
	const ctx = useContext(ThemeContext);
	if (!ctx) throw new Error("useThemeContext must be used within ThemeProvider");
	return ctx;
};
