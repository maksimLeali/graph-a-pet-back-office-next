"use client";

import styled from "styled-components";

import { $color, $uw } from "@/theme";

import { Button } from "./ui/Button";

/** testo primario di cella (es. nome) */
export const CellStrong = styled.span`
	font-weight: 500;
	color: ${$color("text")};
`;

/** valori tecnici (chip code, id) */
export const CellMono = styled.span`
	font-family: var(--font-jetbrains-mono), monospace;
	font-size: 1.2rem;
`;

/** badge pill (ruoli, custody level) */
export const Badge = styled.span`
	border-radius: 999px;
	background: ${$color("border")};
	padding: ${$uw(0.25)} ${$uw(0.6)};
	font-size: 1.1rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: ${$color("muted")};
`;

/** bottone compatto per azioni di riga */
export const RowButton = styled(Button)`
	padding: ${$uw(0.25)} ${$uw(0.5)};
	font-size: 1.2rem;
`;
