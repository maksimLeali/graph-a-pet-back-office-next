import { createTheme } from "@lemaks/grid_system";

export type ThemeMode = "dark" | "light";
export { THEME_STORAGE_KEY } from "./constants";

// palette dark del back office (hex reali: qui non c'è Ionic) — tema di default, invariato
const darkColors = {
	background: "#09090b",
	surface: "#101012",
	card: "#141417",
	border: "#27272a",
	"border-strong": "#3f3f46",
	text: "#f4f4f5",
	muted: "#a1a1aa",
	dim: "#71717a",
	primary: "#34d399",
	"primary-strong": "#10b981",
	"primary-contrast": "#022c22",
	"primary-soft": "rgba(52, 211, 153, 0.12)",
	danger: "#f87171",
	"danger-strong": "#b91c1c",
	"danger-soft": "rgba(185, 28, 28, 0.15)",
	warning: "#fbbf24",
	overlay: "rgba(0, 0, 0, 0.6)",
};

// palette light — stessi token del tema dark, valori chiari
// (stesso approccio di graph-a-pet-app/src/theme/variables.css: root = dark scheme,
// qui invertito perché il default storico del back office è il tema scuro)
const lightColors: Record<keyof typeof darkColors, string> = {
	background: "#fafafa",
	surface: "#f4f4f5",
	card: "#ffffff",
	border: "#e4e4e7",
	"border-strong": "#d4d4d8",
	text: "#18181b",
	muted: "#52525b",
	dim: "#a1a1aa",
	primary: "#059669",
	"primary-strong": "#047857",
	"primary-contrast": "#ffffff",
	"primary-soft": "rgba(5, 150, 105, 0.1)",
	danger: "#dc2626",
	"danger-strong": "#b91c1c",
	"danger-soft": "rgba(220, 38, 38, 0.1)",
	warning: "#d97706",
	overlay: "rgba(0, 0, 0, 0.4)",
};

// stessa griglia di graph-a-pet-app: 32 colonne su max 480px -> 1uw = 15px
export const userGridConfig = {
	"grid-columns-number": "32",
	"max-width": "480px",
	colors: darkColors,
};

export const {
	$color: $bakedColor,
	$breakPoint,
	$uw,
	$cssTRBL,
	$variable,
	colors,
	css: baseCss,
} = createTheme(userGridConfig);

// @lemaks/grid_system's $color bakes the literal hex value at module-load time
// (niente var(--x)): con un solo tema andava bene, ma rende impossibile lo switch
// chiaro/scuro a runtime. Stesso pattern di graph-a-pet-app/src/utils/theme/colors.ts:
// una mappa statica di riferimenti var(--key), risolti dal browser ad ogni cambio tema.
type ColorKey = keyof typeof darkColors;
export const $color = (key: ColorKey) => `var(--${key})`;
void $bakedColor;

// override delle CSS custom properties quando [data-theme="light"] è impostato sull'<html>
// (vedi ThemeProvider): il default a :root resta il tema dark esistente
const lightThemeOverrides = `[data-theme="light"] {\n${Object.entries(lightColors)
	.map(([key, value]) => `  --${key}: ${value};`)
	.join("\n")}\n}`;

export const css = `${baseCss}\n\n${lightThemeOverrides}`;
