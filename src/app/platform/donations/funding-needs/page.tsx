"use client";

import Link from "next/link";
import styled from "styled-components";

import { useDonationScope } from "@/lib/donations/DonationScopeContext";
import { EmptyState } from "@/components/ui/EmptyState";
import { $uw } from "@/theme";

/**
 * I traguardi di raccolta si gestiscono dal dettaglio del singolo rifugio
 * (tab "Traguardi") — questa pagina resta solo come puntatore per i
 * vecchi link, come pet-limits.
 */
export default function FundingNeedsPage() {
	const { shelterId } = useDonationScope();

	return (
		<Wrap>
			<EmptyState
				title="Spostato"
				description='I traguardi di raccolta si gestiscono dal dettaglio del rifugio, tab "Traguardi".'
			/>
			{shelterId && (
				<Link href={`/platform/shelters/${shelterId}`}>Vai al dettaglio del rifugio</Link>
			)}
		</Wrap>
	);
}

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${$uw(1)};
`;
