"use client";

import styled from "styled-components";

import { $color, $uw } from "@/theme";

/**
 * Generic placeholder for "nothing to show" states: no permission, no
 * selection made yet, or backend operation not implemented yet. Distinct
 * from the per-tab `EmptyText` convention (single line, used for empty
 * lists) — this is for whole-page states with a title + explanation.
 */
export const EmptyState: React.FC<{
	title: string;
	description?: string;
	icon?: string;
}> = ({ title, description, icon = "◌" }) => (
	<Wrap>
		<Icon aria-hidden>{icon}</Icon>
		<Title>{title}</Title>
		{description && <Description>{description}</Description>}
	</Wrap>
);

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${$uw(0.5)};
	padding: ${$uw(3)} ${$uw(1.5)};
	text-align: center;
	border: 1px dashed ${$color("border-strong")};
	border-radius: ${$uw(0.8)};
	background: ${$color("surface")};
`;

const Icon = styled.span`
	font-size: 2.4rem;
	color: ${$color("dim")};
`;

const Title = styled.p`
	margin: 0;
	font-weight: 600;
	color: ${$color("text")};
`;

const Description = styled.p`
	margin: 0;
	max-width: ${$uw(24)};
	font-size: 1.3rem;
	color: ${$color("dim")};
`;
