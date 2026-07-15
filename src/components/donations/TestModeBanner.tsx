"use client";

import styled from "styled-components";

import { $color, $uw } from "@/theme";

/**
 * Persistent notice shown on every Donations page. The module only
 * supports Stripe test mode today — there is no live-mode control anywhere
 * in this UI.
 */
export const TestModeBanner: React.FC = () => (
	<Wrap role="status">
		<Badge>TEST MODE</Badge>
		<Text>No real money is processed.</Text>
	</Wrap>
);

const Wrap = styled.div`
	display: flex;
	align-items: center;
	gap: ${$uw(0.75)};
	border: 1px solid ${$color("warning")};
	border-radius: ${$uw(0.6)};
	background: ${$color("surface")};
	padding: ${$uw(0.6)} ${$uw(1)};
`;

const Badge = styled.span`
	flex-shrink: 0;
	border-radius: 999px;
	background: ${$color("warning")};
	color: ${$color("background")};
	padding: ${$uw(0.25)} ${$uw(0.7)};
	font-size: 1.1rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.08em;
`;

const Text = styled.span`
	font-size: 1.3rem;
	color: ${$color("muted")};
`;
