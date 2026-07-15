"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useGetPetQuery } from "@/graphql/__generated__/getPet.generated";
import { useUpdatePetMutation } from "@/graphql/__generated__/updatePet.generated";
import { useGetPetOwnershipQuery } from "@/graphql/__generated__/getPetOwnerships.generated";
import { useDeletePetOwnershipMutation } from "@/graphql/__generated__/delete-pet-ownsership.generated";
import { useGetPetTreatmentsQuery } from "@/graphql/__generated__/getPetTreatments.generated";
import { useListSheltersQuery, useListShelterPetsBoQuery } from "@/graphql/__generated__/queries.generated";
import {
	useCreateShelterPetBoMutation,
	useDeleteShelterPetBoMutation,
} from "@/graphql/__generated__/mutations.generated";
import { FullPetFragment } from "@/graphql/__generated__/full-pet.generated";
import { Tabs } from "@/components/ui/Tabs";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Spinner } from "@/components/ui/Spinner";
import { Badge, RowButton } from "@/components/cells";
import { $color, $uw } from "@/theme";

const GENDER_OPTIONS = [
	{ value: "MALE", label: "Maschio" },
	{ value: "FEMALE", label: "Femmina" },
	{ value: "NOT_SAID", label: "Non specificato" },
];

const COAT_OPTIONS = [
	{ value: "SHORT", label: "Corto" },
	{ value: "MEDIUM", label: "Medio" },
	{ value: "LONG", label: "Lungo" },
	{ value: "HAIRLESS", label: "Senza pelo" },
];

type PetForm = {
	name: string;
	gender: string;
	birthday: string;
	weight_kg: string;
	chip_code: string;
	breed: string;
	coat_length: string;
	temperament: string;
	neutered: boolean;
	diet: string;
	intollerance: string;
	disciplines: string;
};

const listToString = (v?: (string | null)[] | null) =>
	(v ?? []).filter(Boolean).join(", ");
const stringToList = (v: string) =>
	v
		.split(",")
		.map((s) => s.trim())
		.filter(Boolean);

const PetInfoTab: React.FC<{ pet: FullPetFragment; petId: string }> = ({
	pet,
	petId,
}) => {
	const { register, handleSubmit, reset } = useForm<PetForm>();

	useEffect(() => {
		reset({
			name: pet.name,
			gender: pet.gender ?? "",
			birthday: pet.birthday ? dayjs(pet.birthday).format("YYYY-MM-DD") : "",
			weight_kg: pet.weight_kg != null ? String(pet.weight_kg) : "",
			chip_code: pet.chip_code ?? "",
			breed: pet.breed ?? "",
			coat_length: pet.coat_length ?? "",
			temperament: pet.temperament ?? "",
			neutered: !!pet.neutered,
			diet: listToString(pet.diet),
			intollerance: listToString(pet.intollerance),
			disciplines: listToString(pet.disciplines),
		});
	}, [pet, reset]);

	const [updatePet, { loading }] = useUpdatePetMutation({
		onCompleted: ({ updatePet }) => {
			if (!updatePet.success || updatePet.error) {
				toast.error("Errore nel salvataggio");
				return;
			}
			toast.success("Animale aggiornato");
		},
		onError: () => toast.error("Errore nel salvataggio"),
	});

	const owner = pet.ownerships?.items?.[0]?.user;

	return (
		<InfoForm
			onSubmit={handleSubmit((v) =>
				updatePet({
					variables: {
						id: petId,
						data: {
							name: v.name || undefined,
							gender: (v.gender || undefined) as never,
							birthday: v.birthday || undefined,
							weight_kg: v.weight_kg ? parseFloat(v.weight_kg) : undefined,
							chip_code: v.chip_code || undefined,
							breed: v.breed || undefined,
							coat_length: (v.coat_length || undefined) as never,
							temperament: v.temperament || undefined,
							neutered: v.neutered,
							diet: stringToList(v.diet),
							intollerance: stringToList(v.intollerance),
							disciplines: stringToList(v.disciplines),
						},
					},
				})
			)}
		>
			{owner && (
				<Card>
					<OwnerLabel>Proprietario: </OwnerLabel>
					<OwnerLink href={`/users/${owner.id}`}>
						{owner.first_name} {owner.last_name} ({owner.email})
					</OwnerLink>
				</Card>
			)}

			<FieldsGrid>
				<Input label="Nome" {...register("name", { required: true })} />
				<Select label="Sesso" options={GENDER_OPTIONS} {...register("gender")} />
				<Input label="Data di nascita" type="date" {...register("birthday")} />
				<Input
					label="Peso (kg)"
					type="number"
					step="0.1"
					min="0"
					{...register("weight_kg")}
				/>
				<Input label="Codice chip" {...register("chip_code")} />
				<Input label="Razza" {...register("breed")} />
				<Select
					label="Pelo"
					options={COAT_OPTIONS}
					placeholder="—"
					{...register("coat_length")}
				/>
				<Input label="Temperamento" {...register("temperament")} />
				<CheckboxLabel>
					<input type="checkbox" {...register("neutered")} />
					Sterilizzato
				</CheckboxLabel>
				<Input label="Dieta (separata da virgole)" {...register("diet")} />
				<Input
					label="Intolleranze (separate da virgole)"
					{...register("intollerance")}
				/>
				<Input
					label="Discipline (separate da virgole)"
					{...register("disciplines")}
				/>
			</FieldsGrid>

			<SaveButton type="submit" loading={loading}>
				Salva modifiche
			</SaveButton>
		</InfoForm>
	);
};

const PetOwnersTab: React.FC<{ petId: string }> = ({ petId }) => {
	const { data, loading, refetch } = useGetPetOwnershipQuery({
		variables: { id: petId, commonSearch: { page: 0, page_size: 50 } },
		onError: () => toast.error("Errore nel caricamento dei proprietari"),
	});
	const [deleteOwnership] = useDeletePetOwnershipMutation({
		onCompleted: () => refetch(),
		onError: () => toast.error("Errore nell'eliminazione"),
	});

	if (loading) return <Spinner />;
	const items = data?.getPet?.pet?.ownerships?.items ?? [];

	return (
		<List>
			{items.length === 0 && <EmptyText>Nessun proprietario</EmptyText>}
			{items.map(
				(o) =>
					o && (
						<RowCard key={o.id}>
							<div>
								<RowLink href={`/users/${o.user.id}`}>
									{o.user.first_name} {o.user.last_name}
								</RowLink>
								<RowSub>{o.user.email}</RowSub>
							</div>
							<RowActions>
								<Badge>{o.custody_level}</Badge>
								<RowButton
									variant="danger"
									onClick={() => {
										if (confirm("Rimuovere questa custodia?")) {
											deleteOwnership({ variables: { id: o.id } });
										}
									}}
								>
									Rimuovi
								</RowButton>
							</RowActions>
						</RowCard>
					)
			)}
		</List>
	);
};

type AssignShelterForm = {
	shelter_id: string;
};

const PetShelterTab: React.FC<{ petId: string }> = ({ petId }) => {
	const { register, handleSubmit, reset } = useForm<AssignShelterForm>();

	const { data, loading, refetch } = useListShelterPetsBoQuery({
		variables: {
			search: {
				page: 0,
				page_size: 50,
				order_by: "created_at",
				filters: { fixed: [{ key: "pet_id", value: petId }] },
			},
		},
		onError: () => toast.error("Errore nel caricamento dei rifugi"),
	});

	const { data: sheltersData } = useListSheltersQuery({
		variables: {
			search: {
				page: 0,
				page_size: 100,
				order_by: "name",
				order_direction: "asc",
				filters: null,
			},
		},
	});

	const shelterOptions = (sheltersData?.listShelters?.items ?? [])
		.filter((s) => !!s)
		.map((s) => ({ value: s!.id, label: s!.name }));

	const [assignShelter, { loading: assigning }] = useCreateShelterPetBoMutation({
		onCompleted: ({ createShelterPet }) => {
			if (!createShelterPet.success) {
				toast.error(
					createShelterPet.error?.message ?? "Errore nell'assegnazione"
				);
				return;
			}
			toast.success("Rifugio assegnato");
			reset();
			refetch();
		},
		onError: () => toast.error("Errore nell'assegnazione"),
	});

	const [removeShelter] = useDeleteShelterPetBoMutation({
		onCompleted: ({ deleteShelterPet }) => {
			if (!deleteShelterPet.success) {
				toast.error(deleteShelterPet.error?.message ?? "Errore nella rimozione");
				return;
			}
			toast.success("Rifugio rimosso");
			refetch();
		},
		onError: () => toast.error("Errore nella rimozione"),
	});

	if (loading) return <Spinner />;
	const items = data?.listShelterPets?.items ?? [];

	return (
		<>
			<AssignForm
				onSubmit={handleSubmit((v) =>
					assignShelter({
						variables: { data: { shelter_id: v.shelter_id, pet_id: petId } },
					})
				)}
			>
				<Select
					label="Rifugio"
					placeholder="Seleziona rifugio"
					options={shelterOptions}
					{...register("shelter_id", { required: true })}
				/>
				<Button type="submit" loading={assigning}>
					Assegna
				</Button>
			</AssignForm>

			<List>
				{items.length === 0 && <EmptyText>Nessun rifugio assegnato</EmptyText>}
				{items.map(
					(sp) =>
						sp && (
							<RowCard key={sp.id}>
								<div>
									<RowLink href={`/shelters/${sp.shelter.id}`}>
										{sp.shelter.name}
									</RowLink>
									<RowSub>
										dal {dayjs(sp.created_at).format("DD/MM/YYYY")}
									</RowSub>
								</div>
								<RowActions>
									<Badge>{sp.is_active ? "Attivo" : "Uscito"}</Badge>
									<RowButton
										variant="danger"
										onClick={() => {
											if (confirm("Rimuovere questo animale dal rifugio?")) {
												removeShelter({ variables: { id: sp.id } });
											}
										}}
									>
										Rimuovi
									</RowButton>
								</RowActions>
							</RowCard>
						)
				)}
			</List>
		</>
	);
};

const PetTreatmentsTab: React.FC<{ petId: string }> = ({ petId }) => {
	const [page, setPage] = useState(0);
	const { data, loading } = useGetPetTreatmentsQuery({
		variables: { petId, page },
		onError: () => toast.error("Errore nel caricamento dei trattamenti"),
	});

	if (loading) return <Spinner />;
	const items = data?.listTreatments?.items ?? [];
	const pagination = data?.listTreatments?.pagination;

	return (
		<List>
			{items.length === 0 && <EmptyText>Nessun trattamento</EmptyText>}
			{items.map(
				(tr) =>
					tr && (
						<RowCard key={tr.id}>
							<div>
								<RowTitle>{tr.name}</RowTitle>
								<RowSub>
									{tr.type} — {dayjs(tr.date).format("DD/MM/YYYY")}
								</RowSub>
							</div>
							{tr.booster && (
								<RowNote>
									Richiamo: {dayjs(tr.booster.date).format("DD/MM/YYYY")}
								</RowNote>
							)}
						</RowCard>
					)
			)}
			{pagination && (pagination.total_pages ?? 1) > 1 && (
				<Pager>
					<Button
						variant="ghost"
						disabled={page <= 0}
						onClick={() => setPage((p) => p - 1)}
					>
						←
					</Button>
					<span>
						{page + 1} / {pagination.total_pages}
					</span>
					<Button
						variant="ghost"
						disabled={page + 1 >= (pagination.total_pages ?? 1)}
						onClick={() => setPage((p) => p + 1)}
					>
						→
					</Button>
				</Pager>
			)}
		</List>
	);
};

export default function PetDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = use(params);
	const { data, loading } = useGetPetQuery({
		variables: { id },
		onError: () => toast.error("Errore nel caricamento dell'animale"),
	});

	if (loading) return <Spinner />;
	const pet = data?.getPet?.pet;
	if (!pet) return <EmptyText>Animale non trovato</EmptyText>;

	return (
		<Page>
			<PageTitle>{pet.name}</PageTitle>
			<Tabs
				entries={[
					{
						value: "info",
						label: "Informazioni",
						node: <PetInfoTab pet={pet} petId={id} />,
					},
					{
						value: "owners",
						label: "Proprietari",
						node: <PetOwnersTab petId={id} />,
					},
					{
						value: "shelter",
						label: "Rifugio",
						node: <PetShelterTab petId={id} />,
					},
					{
						value: "treatments",
						label: "Trattamenti",
						node: <PetTreatmentsTab petId={id} />,
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

const PageTitle = styled.h2`
	margin: 0;
	font-size: 2.2rem;
	font-weight: 700;
	color: ${$color("text")};
`;

const InfoForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: ${$uw(1.5)};
`;

const OwnerLabel = styled.span`
	font-size: 1.3rem;
	color: ${$color("muted")};
`;

const OwnerLink = styled(Link)`
	font-size: 1.3rem;
	font-weight: 500;
	color: ${$color("primary")};
	&:hover {
		text-decoration: underline;
	}
`;

const FieldsGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: ${$uw(1)};
	@media (min-width: 768px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media (min-width: 1280px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

const CheckboxLabel = styled.label`
	display: flex;
	align-items: center;
	gap: ${$uw(0.5)};
	padding-top: ${$uw(1.75)};
	font-size: 1.4rem;
	color: ${$color("muted")};
	> input {
		width: ${$uw(1)};
		height: ${$uw(1)};
		accent-color: ${$color("primary")};
	}
`;

const SaveButton = styled(Button)`
	align-self: flex-start;
`;

const List = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(0.75)};
`;

const AssignForm = styled.form`
	display: flex;
	align-items: flex-end;
	gap: ${$uw(1)};
	margin-bottom: ${$uw(1.5)};
`;

const EmptyText = styled.p`
	padding: ${$uw(1.5)} 0;
	text-align: center;
	color: ${$color("dim")};
`;

const RowCard = styled(Card)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: ${$uw(1)};
`;

const RowTitle = styled.p`
	margin: 0;
	font-weight: 500;
	color: ${$color("text")};
`;

const RowLink = styled(Link)`
	font-weight: 500;
	color: ${$color("primary")};
	&:hover {
		text-decoration: underline;
	}
`;

const RowSub = styled.p`
	margin: ${$uw(0.2)} 0 0;
	font-size: 1.3rem;
	color: ${$color("dim")};
`;

const RowNote = styled.span`
	font-size: 1.2rem;
	color: ${$color("dim")};
`;

const RowActions = styled.div`
	display: flex;
	align-items: center;
	gap: ${$uw(0.75)};
`;

const Pager = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: ${$uw(0.75)};
	font-size: 1.3rem;
	color: ${$color("muted")};
`;
