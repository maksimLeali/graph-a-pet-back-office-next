"use client";

import styled from "styled-components";

import { $color, $uw } from "@/theme";

export const Card: React.FC<
	React.PropsWithChildren<{ className?: string; title?: string }>
> = ({ children, className, title }) => (
	<Wrap className={className}>
		{title && <CardTitle>{title}</CardTitle>}
		{children}
	</Wrap>
);

const Wrap = styled.div`
	border: 1px solid ${$color("border")};
	background: ${$color("card")};
	border-radius: ${$uw(0.8)};
	padding: ${$uw(1.25)};
`;

const CardTitle = styled.h3`
	margin: 0 0 ${$uw(1)};
	font-size: 1.3rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: ${$color("muted")};
`;
