"use client";

import { useState } from "react";
import styled from "styled-components";

import { $color, $uw } from "@/theme";

export type TabEntry = {
	value: string;
	label: string;
	node: React.ReactNode;
};

export const Tabs: React.FC<{ entries: TabEntry[]; defaultValue?: string }> = ({
	entries,
	defaultValue,
}) => {
	const [active, setActive] = useState(defaultValue ?? entries[0]?.value);
	const current = entries.find((e) => e.value === active);

	return (
		<Wrap>
			<TabList role="tablist">
				{entries.map((e) => (
					<Tab
						key={e.value}
						role="tab"
						type="button"
						aria-selected={e.value === active}
						$active={e.value === active}
						onClick={() => setActive(e.value)}
					>
						{e.label}
					</Tab>
				))}
			</TabList>
			{current?.node}
		</Wrap>
	);
};

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(1.25)};
`;

const TabList = styled.div`
	display: flex;
	gap: ${$uw(0.25)};
	border-bottom: 1px solid ${$color("border")};
`;

const Tab = styled.button<{ $active: boolean }>`
	margin-bottom: -1px;
	cursor: pointer;
	background: transparent;
	border: none;
	border-bottom: 2px solid
		${({ $active }) => ($active ? $color("primary") : "transparent")};
	padding: ${$uw(0.6)} ${$uw(1)};
	font-size: 1.4rem;
	font-weight: 500;
	color: ${({ $active }) => ($active ? $color("primary") : $color("dim"))};
	transition: color 0.15s ease, border-color 0.15s ease;
	&:hover {
		color: ${({ $active }) => ($active ? $color("primary") : $color("muted"))};
	}
`;
