"use client";

import styled from "styled-components";

import { useThemeContext } from "@/contexts/ThemeContext";
import { $color, $uw } from "@/theme";

export const ThemeToggle: React.FC = () => {
	const { theme, toggleTheme } = useThemeContext();
	const isLight = theme === "light";

	return (
		<Toggle
			type="button"
			role="switch"
			aria-checked={isLight}
			aria-label="Cambia tema"
			onClick={toggleTheme}
			title={isLight ? "Passa al tema scuro" : "Passa al tema chiaro"}
		>
			{isLight ? "☀︎" : "☾"}
		</Toggle>
	);
};

const Toggle = styled.button`
	display: flex;
	width: ${$uw(1.6)};
	height: ${$uw(1.6)};
	align-items: center;
	justify-content: center;
	cursor: pointer;
	border: 1px solid ${$color("border-strong")};
	border-radius: 999px;
	background: ${$color("surface")};
	font-size: 1.3rem;
	line-height: 1;
	color: ${$color("text")};
	transition: border-color 0.15s ease, color 0.15s ease;
	&:hover {
		border-color: ${$color("primary")};
		color: ${$color("primary")};
	}
`;
