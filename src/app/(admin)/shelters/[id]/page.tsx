"use client";

import { use } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import toast from "react-hot-toast";

import { useGetShelterQuery } from "@/graphql/__generated__/queries.generated";
import { Tabs } from "@/components/ui/Tabs";
import { Spinner } from "@/components/ui/Spinner";
import { Badge } from "@/components/cells";
import { ShelterInfoPanel } from "@/components/shelters/ShelterInfoPanel";
import { MembersPeopleTab } from "@/components/shelters/MembersPeopleTab";
import { PetsTab } from "@/components/shelters/PetsTab";
import { TasksTab } from "@/components/shelters/TasksTab";
import { WalksTab } from "@/components/shelters/WalksTab";
import { InventoryTab } from "@/components/shelters/InventoryTab";
import { MapBoxesTab } from "@/components/shelters/MapBoxesTab";
import { PublicProfileTab } from "@/components/shelters/PublicProfileTab";
import { $color, $uw } from "@/theme";

const TYPE_LABEL: Record<string, string> = {
	OFFICIAL_SHELTER: "Rifugio",
	PERSONAL_WORKSPACE: "Workspace",
};

const VERIFICATION_LABEL: Record<string, string> = {
	UNVERIFIED: "Non verificato",
	PENDING_CLAIM: "In verifica",
	VERIFIED: "Verificato",
	REJECTED: "Rifiutato",
};

export default function ShelterDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = use(params);
	const { data, loading } = useGetShelterQuery({
		variables: { id },
		onError: () => toast.error("Errore nel caricamento del rifugio"),
	});

	if (loading) return <Spinner />;
	const shelter = data?.getShelter?.shelter;
	if (!shelter) return <EmptyText>Rifugio non trovato</EmptyText>;

	return (
		<Page>
			<div>
				<TitleRow>
					<PageTitle>{shelter.name}</PageTitle>
					<Badge>{TYPE_LABEL[shelter.type] ?? shelter.type}</Badge>
					<Badge>
						{VERIFICATION_LABEL[shelter.verification_status] ??
							shelter.verification_status}
					</Badge>
				</TitleRow>
				<PageSub>
					{shelter.city} ({shelter.province_code}) — creato il{" "}
					{dayjs(shelter.created_at).format("DD/MM/YYYY")}
				</PageSub>
			</div>
			<Tabs
				entries={[
					{
						value: "public-profile",
						label: "Profilo pubblico",
						node: <PublicProfileTab shelterId={id} />,
					},
					{
						value: "info",
						label: "Informazioni",
						node: <ShelterInfoPanel shelterId={id} />,
					},
					{
						value: "members",
						label: "Membri e persone",
						node: <MembersPeopleTab shelterId={id} />,
					},
					{
						value: "pets",
						label: "Animali",
						node: <PetsTab shelterId={id} />,
					},
					{
						value: "tasks",
						label: "Task",
						node: <TasksTab shelterId={id} />,
					},
					{
						value: "walks",
						label: "Passeggiate",
						node: <WalksTab shelterId={id} />,
					},
					{
						value: "inventory",
						label: "Inventario",
						node: <InventoryTab shelterId={id} />,
					},
					{
						value: "map-boxes",
						label: "Mappa e box",
						node: <MapBoxesTab shelterId={id} />,
					},
				]}
			/>
		</Page>
	);
}

const Page = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(1.5)};
`;

const TitleRow = styled.div`
	display: flex;
	align-items: center;
	gap: ${$uw(0.75)};
	flex-wrap: wrap;
`;

const PageTitle = styled.h2`
	margin: 0;
	font-size: 2.2rem;
	font-weight: 700;
	color: ${$color("text")};
`;

const PageSub = styled.p`
	margin: ${$uw(0.25)} 0 0;
	font-size: 1.3rem;
	color: ${$color("dim")};
`;

const EmptyText = styled.p`
	padding: ${$uw(1.5)} 0;
	text-align: center;
	color: ${$color("dim")};
`;
