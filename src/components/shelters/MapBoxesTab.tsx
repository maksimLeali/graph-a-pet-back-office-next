"use client";

import styled from "styled-components";

import { MapTab } from "./MapTab";
import { BoxesTab } from "./BoxesTab";
import { $color, $uw } from "@/theme";

/**
 * Tab unico "Mappa e box": la mappa del rifugio e la gestione dei box sono
 * due facce della stessa cosa (dove stanno gli animali), qui impilate.
 */
export const MapBoxesTab: React.FC<{ shelterId: string }> = ({ shelterId }) => (
	<Wrap>
		<Section>
			<SectionTitle>Mappa</SectionTitle>
			<MapTab shelterId={shelterId} />
		</Section>
		<Section>
			<SectionTitle>Box</SectionTitle>
			<BoxesTab shelterId={shelterId} />
		</Section>
	</Wrap>
);

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(2)};
`;

const Section = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(0.75)};
`;

const SectionTitle = styled.h3`
	margin: 0;
	font-size: 1.6rem;
	font-weight: 700;
	color: ${$color("text")};
`;
