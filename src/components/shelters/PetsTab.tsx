"use client";

import Link from "next/link";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styled from "styled-components";

import { useListShelterPetsBoQuery } from "@/graphql/__generated__/queries.generated";
import {
	useCreateShelterPetBoMutation,
	useCreateShelterPetsWithDataBoMutation,
	useDeleteShelterPetBoMutation,
} from "@/graphql/__generated__/mutations.generated";
import { Gender } from "@/types";
import { Spinner } from "@/components/ui/Spinner";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Badge, RowButton } from "@/components/cells";
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
									<RowLink href={`/pets/${sp.pet.id}`}>{sp.pet.name}</RowLink>
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
									{sp.left_at && (
										<RowSub>
											uscito il {dayjs(sp.left_at).format("DD/MM/YYYY")}
										</RowSub>
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
