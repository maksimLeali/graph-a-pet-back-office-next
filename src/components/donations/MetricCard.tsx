"use client";

import styled from "styled-components";

import { Card } from "@/components/ui/Card";
import { $color, $uw } from "@/theme";

/**
 * Read-only metric tile for the donations overview. `value` defaults to an
 * em dash — this is a placeholder for a backend aggregate that does not
 * exist yet, never a computed/fake number.
 */
export const MetricCard: React.FC<{ label: string; value?: string }> = ({
	label,
	value = "—",
}) => (
	<StyledCard>
		<Label>{label}</Label>
		<Value>{value}</Value>
	</StyledCard>
);

const StyledCard = styled(Card)`
	display: flex;
	flex-direction: column;
	gap: ${$uw(0.4)};
`;

const Label = styled.span`
	font-size: 1.2rem;
	color: ${$color("dim")};
`;

const Value = styled.span`
	font-size: 2rem;
	font-weight: 700;
	color: ${$color("text")};
`;
