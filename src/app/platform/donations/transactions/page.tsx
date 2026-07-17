"use client";

import { useDonationScope } from "@/lib/donations/DonationScopeContext";
import { EmptyState } from "@/components/ui/EmptyState";
import { ShelterDonationsTable } from "@/components/donations/ShelterDonationsTable";

export default function DonationsTransactionsPage() {
	const { scope, shelterId, shelterCandidates, candidatesLoading } =
		useDonationScope();

	if (scope === "shelter") {
		if (candidatesLoading) return null;
		if (!shelterId) {
			return shelterCandidates.length === 0 ? (
				<EmptyState
					title="Nessun rifugio idoneo"
					description="Non hai permessi di donazione su nessun rifugio."
				/>
			) : (
				<EmptyState
					title="Seleziona un rifugio"
					description="Scegli un rifugio qui sopra per vedere le transazioni."
				/>
			);
		}
		return <ShelterDonationsTable shelterId={shelterId} />;
	}

	// il ramo piattaforma (listDonations/refund) resta fuori scope: il
	// backend non lo espone ancora sotto quel nome, qui gestiamo solo la
	// vista per-rifugio richiesta
	return (
		<EmptyState
			icon="◫"
			title="Transazioni — non ancora disponibile"
			description='Il backend non espone ancora "listDonations" / "refundDonation" / "partialRefundDonation" a livello piattaforma.'
		/>
	);
}
