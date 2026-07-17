"use client";

import styled from "styled-components";

import { useDonationScope } from "@/lib/donations/DonationScopeContext";
import { EmptyState } from "@/components/ui/EmptyState";
import { MetricCard } from "@/components/donations/MetricCard";
import { $color, $uw } from "@/theme";

const METRIC_LABELS = [
	"Donazioni lorde",
	"Commissioni piattaforma",
	"Commissioni di processing",
	"Netto rifugio",
	"Rimborsi",
	"Dispute",
	"Spese dichiarate",
	"Fondi non rendicontati",
	"Fabbisogni attivi",
	"Animali al/vicino al limite mensile",
	"Stato Connected Account",
	"Stato sistema donazioni",
];

export default function DonationsOverviewPage() {
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
					description="Scegli un rifugio qui sopra per vedere la panoramica donazioni."
				/>
			);
		}
	}

	return (
		<Wrap>
			<Note>
				Il backend non espone ancora un&apos;aggregazione di panoramica
				donazioni (
				{scope === "shelter"
					? "getShelterDonationOverview(shelter_id)"
					: "un equivalente a livello piattaforma"}
				). Le voci sottostanti sono segnaposto non calcolati — nessun dato è
				stato inventato.
			</Note>
			<Grid>
				{METRIC_LABELS.map((label) => (
					<MetricCard key={label} label={label} />
				))}
			</Grid>
		</Wrap>
	);
}

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(1.25)};
`;

const Note = styled.p`
	margin: 0;
	font-size: 1.3rem;
	color: ${$color("dim")};
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: ${$uw(1)};
	@media (min-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
	}
	@media (min-width: 1280px) {
		grid-template-columns: repeat(4, 1fr);
	}
`;
