"use client";

import Link from "next/link";
import styled from "styled-components";

import { useDonationScope } from "@/lib/donations/DonationScopeContext";
import { EmptyState } from "@/components/ui/EmptyState";
import { $uw } from "@/theme";

/**
 * I limiti di donazione per animale si gestiscono ora dal dettaglio del
 * singolo rifugio (tab "Limiti donazioni"), non da questa sezione
 * trasversale — questa pagina resta solo come puntatore per i vecchi link.
 */
export default function PetLimitsPage() {
	const { shelterId } = useDonationScope();

	return (
		<Wrap>
			<EmptyState
				title="Spostato"
				description='I limiti di donazione per animale si gestiscono ora dal dettaglio del rifugio, tab "Limiti donazioni".'
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
