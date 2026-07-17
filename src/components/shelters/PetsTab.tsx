"use client";

import Link from "next/link";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styled from "styled-components";

import {
	useListShelterPetsBoQuery,
	useListShelterRolesBoQuery,
	useListShelterPeopleQuery,
} from "@/graphql/__generated__/queries.generated";
import {
	useCreateShelterPetBoMutation,
	useCreateShelterPetsWithDataBoMutation,
	useDeleteShelterPetBoMutation,
	useSetShelterPetAssigneesBoMutation,
	useSetShelterPetPublishedBoMutation,
} from "@/graphql/__generated__/mutations.generated";
import { useListPetDonationPoliciesQuery } from "@/graphql/__generated__/listPetDonationPolicies.generated";
import { Gender } from "@/types";
import { useShelterAuthorization } from "@/lib/useShelterAuthorization";
import { ShelterPermissions } from "@/lib/permissions";
import { Spinner } from "@/components/ui/Spinner";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Badge, RowButton } from "@/components/cells";
import { PetLimitInline } from "./PetLimitInline";
import { $color } from "@/theme";

import {
	AddSection,
	TabWrap,
	List,
	RowCard,
	RowSub,
	RowActions,
	EmptyText,
	FormGrid,
	FormFoot,
} from "./common";

const GENDER_OPTIONS = [
	{ value: "MALE", label: "Maschio" },
	{ value: "FEMALE", label: "Femmina" },
	{ value: "NOT_SAID", label: "Non specificato" },
];

type NewPetForm = {
	name: string;
	birthday: string;
	gender: string;
	breed: string;
	chip_code: string;
};

type LinkPetForm = {
	pet_id: string;
};

export const PetsTab: React.FC<{ shelterId: string }> = ({ shelterId }) => {
	const newPetForm = useForm<NewPetForm>({
		defaultValues: { gender: "NOT_SAID" },
	});
	const linkForm = useForm<LinkPetForm>();

	const shelterAuth = useShelterAuthorization(shelterId);

	const { data, loading, refetch } = useListShelterPetsBoQuery({
		variables: {
			search: {
				page: 0,
				page_size: 100,
				order_by: "created_at",
				filters: { fixed: [{ key: "shelter_id", value: shelterId }] },
			},
		},
		onError: () => toast.error("Errore nel caricamento degli animali"),
	});

	// limiti di donazione per singolo animale, mostrati inline in ogni riga
	const {
		data: policiesData,
		refetch: refetchPolicies,
	} = useListPetDonationPoliciesQuery({
		fetchPolicy: "cache-and-network",
		variables: { shelter_id: shelterId },
	});
	const limitByPetId = new Map(
		(policiesData?.listPetDonationPolicies?.items ?? [])
			.filter((p): p is NonNullable<typeof p> => !!p)
			.map((p) => [p.pet_id, p.custom_monthly_limit_cents ?? null])
	);
	const canManageLimits = shelterAuth.can(ShelterPermissions.FUNDING_LIMITS_MANAGE);

	const [createPetWithData, { loading: creating }] =
		useCreateShelterPetsWithDataBoMutation({
			onCompleted: ({ createShelterPetsWithData }) => {
				if (!createShelterPetsWithData.success) {
					toast.error(
						createShelterPetsWithData.error?.message ??
							"Errore nella creazione dell'animale"
					);
					return;
				}
				toast.success("Animale creato");
				newPetForm.reset({ gender: "NOT_SAID" } as NewPetForm);
				refetch();
			},
			onError: () => toast.error("Errore nella creazione dell'animale"),
		});

	const [linkPet, { loading: linking }] = useCreateShelterPetBoMutation({
		onCompleted: ({ createShelterPet }) => {
			if (!createShelterPet.success) {
				toast.error(
					createShelterPet.error?.message ??
						"Errore nel collegamento dell'animale"
				);
				return;
			}
			toast.success("Animale collegato");
			linkForm.reset();
			refetch();
		},
		onError: () => toast.error("Errore nel collegamento dell'animale"),
	});

	// referente del pet: membri (utenti con ruolo) + shelter people volontari
	const canAssign = shelterAuth.can(ShelterPermissions.PETS_UPDATE);
	const { data: rolesData } = useListShelterRolesBoQuery({
		skip: !canAssign,
		variables: {
			search: {
				page: 0,
				page_size: 200,
				filters: { fixed: [{ key: "shelter_id", value: shelterId }] },
			},
		},
	});
	const { data: peopleData } = useListShelterPeopleQuery({
		skip: !canAssign,
		variables: { shelter_id: shelterId, search: { page: 0, page_size: 200 } },
	});
	const memberOptions = [
		{ value: "", label: "— nessun referente —" },
		...(rolesData?.listShelterRoles?.items ?? [])
			.filter((r): r is NonNullable<typeof r> => !!r?.user)
			.map((r) => ({
				value: `user:${r.user.id}`,
				label:
					[r.user.first_name, r.user.last_name].filter(Boolean).join(" ") ||
					r.user.email,
			}))
			.filter((o, i, arr) => arr.findIndex((x) => x.value === o.value) === i),
		...(peopleData?.listShelterPeople?.items ?? [])
			.filter(
				(p): p is NonNullable<typeof p> => !!p && p.status === "VOLUNTEER"
			)
			.map((p) => ({
				value: `person:${p.id}`,
				label:
					([p.first_name, p.last_name].filter(Boolean).join(" ") || p.id) +
					" (volontario)",
			})),
	];

	const [setAssignees] = useSetShelterPetAssigneesBoMutation({
		onCompleted: ({ setShelterPetAssignees }) => {
			if (!setShelterPetAssignees.success) {
				toast.error(
					setShelterPetAssignees.error?.message ??
						"Errore nell'assegnazione del referente"
				);
				return;
			}
			toast.success("Referente aggiornato");
			refetch();
		},
		onError: () => toast.error("Errore nell'assegnazione del referente"),
	});

	const saveAssignee = (shelterPetId: string, encoded: string) => {
		const [kind, id] = encoded.split(":");
		setAssignees({
			variables: {
				shelter_pet_id: shelterPetId,
				user_ids: kind === "user" && id ? [id] : [],
				shelter_person_ids: kind === "person" && id ? [id] : [],
			},
		});
	};

	const canPublish = shelterAuth.can(ShelterPermissions.PETS_PUBLISH);
	const [setPublished] = useSetShelterPetPublishedBoMutation({
		onCompleted: ({ setShelterPetPublished }) => {
			if (!setShelterPetPublished.success) {
				toast.error(
					setShelterPetPublished.error?.message ??
						"Errore nell'aggiornamento della pubblicazione"
				);
				return;
			}
			toast.success(
				setShelterPetPublished.shelter_pet?.is_published
					? "Animale pubblicato"
					: "Animale nascosto dal pubblico"
			);
			refetch();
		},
		onError: () => toast.error("Errore nell'aggiornamento della pubblicazione"),
	});

	const [deletePet] = useDeleteShelterPetBoMutation({
		onCompleted: ({ deleteShelterPet }) => {
			if (!deleteShelterPet.success) {
				toast.error(
					deleteShelterPet.error?.message ?? "Errore nella rimozione"
				);
				return;
			}
			toast.success("Animale rimosso");
			refetch();
		},
		onError: () => toast.error("Errore nella rimozione"),
	});

	if (loading) return <Spinner />;
	const items = data?.listShelterPets?.items ?? [];

	return (
		<TabWrap>
			<AddSection label="Nuovo animale">
				<form
					onSubmit={newPetForm.handleSubmit((v) =>
						createPetWithData({
							variables: {
								data: {
									shelter_id: shelterId,
									pets: [
										{
											name: v.name,
											birthday: v.birthday,
											gender: (v.gender || undefined) as Gender,
											breed: v.breed || undefined,
											chip_code: v.chip_code || undefined,
										},
									],
								},
							},
						})
					)}
				>
					<FormGrid>
						<Input
							label="Nome"
							{...newPetForm.register("name", { required: true })}
						/>
						<Input
							label="Data di nascita"
							type="date"
							{...newPetForm.register("birthday", { required: true })}
						/>
						<Select
							label="Sesso"
							options={GENDER_OPTIONS}
							{...newPetForm.register("gender")}
						/>
						<Input label="Razza" {...newPetForm.register("breed")} />
						<Input label="Chip" {...newPetForm.register("chip_code")} />
					</FormGrid>
					<FormFoot>
						<Button type="submit" loading={creating}>
							Crea
						</Button>
					</FormFoot>
				</form>
			</AddSection>

			<AddSection label="Collega animale esistente">
				<form
					onSubmit={linkForm.handleSubmit((v) =>
						linkPet({
							variables: {
								data: { shelter_id: shelterId, pet_id: v.pet_id },
							},
						})
					)}
				>
					<FormGrid>
						<Input
							label="ID animale"
							placeholder="ID dell'animale da collegare"
							{...linkForm.register("pet_id", { required: true })}
						/>
					</FormGrid>
					<FormFoot>
						<Button type="submit" loading={linking}>
							Collega
						</Button>
					</FormFoot>
				</form>
			</AddSection>

			<List>
				{items.length === 0 && <EmptyText>Nessun animale</EmptyText>}
				{items.map(
					(sp) =>
						sp?.pet && (
							<RowCard key={sp.id}>
								<div>
									<RowLink href={`/platform/pets/${sp.pet.id}`}>{sp.pet.name}</RowLink>
									<RowSub>
										{sp.pet.gender === "MALE"
											? "Maschio"
											: sp.pet.gender === "FEMALE"
												? "Femmina"
												: "—"}
										{sp.pet.breed && ` — ${sp.pet.breed}`}
										{sp.pet.birthday &&
											` — ${dayjs().diff(sp.pet.birthday, "year")} anni`}
										{sp.pet.chip_code && ` — chip ${sp.pet.chip_code}`}
									</RowSub>
								</div>
								<RowActions>
									<Badge>{sp.is_active ? "Presente" : "Uscito"}</Badge>
									{sp.is_active && canAssign ? (
										<AssigneeSelect
											aria-label="Referente"
											options={memberOptions}
											value={
												sp.assigned_members?.[0]
													? `user:${sp.assigned_members[0].id}`
													: sp.assigned_shelter_people?.[0]
														? `person:${sp.assigned_shelter_people[0].id}`
														: ""
											}
											onChange={(e) => saveAssignee(sp.id, e.target.value)}
										/>
									) : (
										(sp.assigned_members?.[0] ||
											sp.assigned_shelter_people?.[0]) && (
											<Badge>
												{[
													(sp.assigned_members?.[0] ??
														sp.assigned_shelter_people?.[0])
														?.first_name,
													(sp.assigned_members?.[0] ??
														sp.assigned_shelter_people?.[0])
														?.last_name,
												]
													.filter(Boolean)
													.join(" ")}
											</Badge>
										)
									)}
									<Badge>
										{sp.is_published ? "Pubblicato" : "Non pubblicato"}
									</Badge>
									{sp.is_active && canPublish && (
										<RowButton
											onClick={() =>
												setPublished({
													variables: {
														shelter_pet_id: sp.id,
														is_published: !sp.is_published,
													},
												})
											}
										>
											{sp.is_published ? "Nascondi" : "Pubblica"}
										</RowButton>
									)}
									{sp.left_at && (
										<RowSub>
											uscito il {dayjs(sp.left_at).format("DD/MM/YYYY")}
										</RowSub>
									)}
									{sp.is_active && canManageLimits && (
										<PetLimitInline
											shelterId={shelterId}
											petId={sp.pet.id}
											currentCents={limitByPetId.get(sp.pet.id) ?? null}
											onSaved={refetchPolicies}
										/>
									)}
									<RowButton
										variant="danger"
										onClick={() => {
											if (confirm("Rimuovere questo animale dal rifugio?")) {
												deletePet({ variables: { id: sp.id } });
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
		</TabWrap>
	);
};

const RowLink = styled(Link)`
	font-weight: 500;
	color: ${$color("primary")};
	&:hover {
		text-decoration: underline;
	}
`;

const AssigneeSelect = styled(Select)`
	min-width: 180px;
`;
