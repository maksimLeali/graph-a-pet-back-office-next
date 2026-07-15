"use client";

import styled from "styled-components";

import { MembersTab } from "./MembersTab";
import { PeopleTab } from "./PeopleTab";
import { $color, $uw } from "@/theme";

/**
 * Tab unico "Membri e persone": membri = ruoli/account collegati al rifugio;
 * persone = anagrafica volontari/visitatori. Erano due tab quasi identici,
 * qui impilati sotto due intestazioni.
 */
export const MembersPeopleTab: React.FC<{ shelterId: string }> = ({
	shelterId,
}) => (
	<Wrap>
		<Section>
			<SectionTitle>Membri</SectionTitle>
			<MembersTab shelterId={shelterId} />
		</Section>
		<Section>
			<SectionTitle>Persone</SectionTitle>
			<PeopleTab shelterId={shelterId} />
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
