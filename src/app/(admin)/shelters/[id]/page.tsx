"use client";

import { use } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import toast from "react-hot-toast";

import { useGetShelterQuery } from "@/graphql/__generated__/queries.generated";
import { Tabs } from "@/components/ui/Tabs";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { Badge } from "@/components/cells";
import { MembersTab } from "@/components/shelters/MembersTab";
import { PeopleTab } from "@/components/shelters/PeopleTab";
import { PetsTab } from "@/components/shelters/PetsTab";
import { TasksTab } from "@/components/shelters/TasksTab";
import { WalksTab } from "@/components/shelters/WalksTab";
import { InventoryTab } from "@/components/shelters/InventoryTab";
import { MapTab } from "@/components/shelters/MapTab";
import { BoxesTab } from "@/components/shelters/BoxesTab";
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

const VISIBILITY_LABEL: Record<string, string> = {
	PRIVATE: "Privato",
	UNLISTED: "Non in elenco",
	PUBLIC: "Pubblico",
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
						value: "info",
						label: "Informazioni",
						node: (
							<Card>
								<InfoGrid>
									<div>
										<InfoLabel>Indirizzo</InfoLabel>
										<InfoValue>
											{[
												shelter.street,
												shelter.street_number,
												shelter.postal_code,
												shelter.city,
												shelter.province_code,
												shelter.region,
											]
												.filter(Boolean)
												.join(", ") || "—"}
										</InfoValue>
									</div>
									<div>
										<InfoLabel>Visibilità</InfoLabel>
										<InfoValue>
											{VISIBILITY_LABEL[shelter.visibility] ??
												shelter.visibility}
										</InfoValue>
									</div>
									<div>
										<InfoLabel>Accetta volontari</InfoLabel>
										<InfoValue>
											{shelter.accepts_volunteers ? "Sì" : "No"}
										</InfoValue>
									</div>
									<div>
										<InfoLabel>Email pubblica</InfoLabel>
										<InfoValue>
											{shelter.public_contact_email ?? "—"}
										</InfoValue>
									</div>
									<div>
										<InfoLabel>Telefono pubblico</InfoLabel>
										<InfoValue>
											{shelter.public_contact_phone ?? "—"}
										</InfoValue>
									</div>
									<div>
										<InfoLabel>Creato</InfoLabel>
										<InfoValue>
											{dayjs(shelter.created_at).format("DD/MM/YYYY HH:mm")}
										</InfoValue>
									</div>
								</InfoGrid>
							</Card>
						),
					},
					{
						value: "members",
						label: "Membri",
						node: <MembersTab shelterId={id} />,
					},
					{
						value: "people",
						label: "Persone",
						node: <PeopleTab shelterId={id} />,
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
						value: "boxes",
						label: "Box",
						node: <BoxesTab shelterId={id} />,
					},
					{
						value: "map",
						label: "Mappa",
						node: <MapTab shelterId={id} />,
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

const InfoGrid = styled.dl`
	display: grid;
	grid-template-columns: 1fr;
	gap: ${$uw(1)};
	margin: 0;
	font-size: 1.4rem;
	@media (min-width: 768px) {
		grid-template-columns: repeat(2, 1fr);
	}
`;

const InfoLabel = styled.dt`
	color: ${$color("dim")};
`;

const InfoValue = styled.dd`
	margin: ${$uw(0.2)} 0 0;
	font-weight: 500;
	color: ${$color("text")};
`;

const EmptyText = styled.p`
	padding: ${$uw(1.5)} 0;
	text-align: center;
	color: ${$color("dim")};
`;
