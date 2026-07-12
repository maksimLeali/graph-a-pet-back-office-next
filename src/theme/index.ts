import { createTheme } from "@lemaks/grid_system";

// palette dark del back office (hex reali: qui non c'è Ionic)
const userColors = {
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
	danger: "#f87171",
	"danger-strong": "#b91c1c",
	warning: "#fbbf24",
};

// stessa griglia di graph-a-pet-app: 32 colonne su max 480px -> 1uw = 15px
export const userGridConfig = {
	"grid-columns-number": "32",
	"max-width": "480px",
	colors: userColors,
};

export const { $color, $breakPoint, $uw, $cssTRBL, $variable, colors, css } =
	createTheme(userGridConfig);
