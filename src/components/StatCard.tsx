"use client";

import styled from "styled-components";

import { $color, $uw } from "@/theme";

export const StatCard: React.FC<{
	label: string;
	value: number | string;
	/** valore di confronto (es. media giornaliera) */
	compareValue?: number;
	desc?: string;
	unit?: string;
}> = ({ label, value, compareValue, desc, unit = "" }) => {
	const delta =
		typeof value === "number" && compareValue != null
			? value - compareValue
			: null;

	return (
		<Wrap>
			<Label>{label}</Label>
			<Value>
				{value}
				{unit}
			</Value>
			<Foot>
				{delta != null && (
					<Delta $positive={delta >= 0}>
						{delta >= 0 ? "+" : ""}
						{Math.round(delta * 100) / 100}
						{unit}
					</Delta>
				)}
				{desc && <Desc>{desc}</Desc>}
			</Foot>
		</Wrap>
	);
};

const Wrap = styled.div`
	border: 1px solid ${$color("border")};
	background: ${$color("card")};
	border-radius: ${$uw(0.8)};
	padding: ${$uw(1.25)};
`;

const Label = styled.p`
	margin: 0;
	font-size: 1.3rem;
	font-weight: 500;
	color: ${$color("muted")};
`;

const Value = styled.p`
	margin: ${$uw(0.5)} 0 0;
	font-size: 2.8rem;
	font-weight: 700;
	color: ${$color("text")};
`;

const Foot = styled.div`
	margin-top: ${$uw(0.5)};
	display: flex;
	align-items: center;
	gap: ${$uw(0.5)};
	font-size: 1.2rem;
`;

const Delta = styled.span<{ $positive: boolean }>`
	font-weight: 600;
	color: ${({ $positive }) =>
		$positive ? $color("primary") : $color("danger")};
`;

const Desc = styled.span`
	color: ${$color("dim")};
`;
