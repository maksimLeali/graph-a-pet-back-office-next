"use client";

import styled from "styled-components";

import { $color, $uw } from "@/theme";

export const Spinner: React.FC<{ className?: string }> = ({ className }) => (
	<Wrap className={className}>
		<Ring aria-label="Caricamento" role="status" />
	</Wrap>
);

const Wrap = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	padding: ${$uw(2.5)} 0;
`;

const Ring = styled.span`
	width: ${$uw(2)};
	height: ${$uw(2)};
	border-radius: 50%;
	border: 3px solid ${$color("border")};
	border-top-color: ${$color("primary")};
	animation: spin 0.7s linear infinite;
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		animation: none;
	}
`;
