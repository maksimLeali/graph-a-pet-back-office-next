"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import { useGetPaginatedPetsQuery } from "@/graphql/__generated__/getPaginatedPets.generated";
import { useGetPaginatedUsersQuery } from "@/graphql/__generated__/getPaginatedUsers.generated";
import { useListSheltersQuery } from "@/graphql/__generated__/queries.generated";
import { useCreatePetBoMutation } from "@/graphql/__generated__/createPet.generated";
import { useLinkPetToUserBoMutation } from "@/graphql/__generated__/linkPetToUser.generated";
import { useCreateShelterPetBoMutation } from "@/graphql/__generated__/mutations.generated";
import { useDeletePetMutation } from "@/graphql/__generated__/delete-pet.generated";
import { SimplePetFragment } from "@/graphql/__generated__/list-pets.generated";
import { Gender, CustodyLevel } from "@/types";
import {
	DataTable,
	ColumnDef,
	Ordering,
} from "@/components/DataTable";
import { CellStrong, CellMono, RowButton } from "@/components/cells";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import {
	AddSection,
	FormGrid,
	FormFoot,
	TabWrap,
} from "@/components/shelters/common";

const GENDER_OPTIONS = [
	{ value: "MALE", label: "Maschio" },
	{ value: "FEMALE", label: "Femmina" },
	{ value: "NOT_SAID", label: "Non specificato" },
];

type PetForm = {
	name: string;
	owner_id: string;
	shelter_id: string;
	breed: string;
	gender: string;
	birthday: string;
	chip_code: string;
	weight_kg: string;
};

export default function PetsPage() {
	const router = useRouter();
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [text, setText] = useState("");
	const [ordering, setOrdering] = useState<Ordering>({});

	const form = useForm<PetForm>({ defaultValues: { gender: "NOT_SAID" } });

	const { data, loading, refetch } = useGetPaginatedPetsQuery({
		variables: {
			search: {
				page: page - 1,
				page_size: pageSize,
				order_by: ordering.order_by,
				order_direction: ordering.order_direction,
					filters:
						text.length > 0
							? {
									search: {
										value: text,
										fields: ["name", "breed", "chip_code"],
									},
								}
							: null,
			},
		},
		onError: () => toast.error("Errore nel caricamento degli animali"),
	});

	const { data: usersData } = useGetPaginatedUsersQuery({
		variables: {
			search: {
				page: 0,
				page_size: 100,
				order_by: "first_name",
				order_direction: "asc",
				filters: null,
			},
		},
	});

	const ownerOptions = (usersData?.listUsers?.items ?? [])
		.filter((u) => !!u)
		.map((u) => ({
			value: u!.id,
			label: `${u!.first_name} ${u!.last_name} (${u!.email})`,
		}));

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

	const [createPet, { loading: creating }] = useCreatePetBoMutation();
	const [linkPetToUser] = useLinkPetToUserBoMutation();
	const [linkPetToShelter] = useCreateShelterPetBoMutation();

	const onCreatePet = async (v: PetForm) => {
		try {
			const { data: created } = await createPet({
				variables: {
					data: {
						name: v.name,
						breed: v.breed || undefined,
						gender: v.gender ? (v.gender as Gender) : undefined,
						birthday: v.birthday
							? new Date(v.birthday).toISOString()
							: undefined,
						chip_code: v.chip_code || undefined,
						weight_kg: v.weight_kg ? parseFloat(v.weight_kg) : undefined,
					},
				},
			});

			if (!created?.createPet.success || !created.createPet.pet) {
				toast.error(
					created?.createPet.error?.message ??
						"Errore nella creazione dell'animale"
				);
				return;
			}

			const petId = created.createPet.pet.id;

			if (v.owner_id) {
				const { data: linked } = await linkPetToUser({
					variables: {
						petId,
						userId: v.owner_id,
						custodyLevel: CustodyLevel.Owner,
					},
				});
				if (!linked?.linkPetToUser.success) {
					toast.error(
						linked?.linkPetToUser.error?.message ??
							"Errore nell'assegnazione del proprietario"
					);
				}
			}

			if (v.shelter_id) {
				const { data: shelterLink } = await linkPetToShelter({
					variables: {
						data: { shelter_id: v.shelter_id, pet_id: petId },
					},
				});
				if (!shelterLink?.createShelterPet.success) {
					toast.error(
						shelterLink?.createShelterPet.error?.message ??
							"Errore nell'assegnazione al rifugio"
					);
				}
			}

			toast.success("Animale creato");
			form.reset({ gender: "NOT_SAID" } as PetForm);
			refetch();
		} catch {
			toast.error("Errore nella creazione dell'animale");
		}
	};

	const [deletePet, { loading: deleting }] = useDeletePetMutation({
		onCompleted: () => refetch(),
		onError: () => toast.error("Errore nell'eliminazione"),
	});

	const rows = (data?.listPets?.items ?? []).filter(
		(p): p is SimplePetFragment => !!p
	);

	const columns: ColumnDef<SimplePetFragment>[] = [
		{
			id: "name",
			header: "Nome",
			sortKey: "name",
			render: (p) => <CellStrong>{p.name}</CellStrong>,
		},
		{
			id: "breed",
			header: "Razza",
			render: (p) => p.breed ?? "—",
		},
		{
			id: "gender",
			header: "Sesso",
			render: (p) =>
				p.gender === "MALE" ? "M" : p.gender === "FEMALE" ? "F" : "—",
		},
		{
			id: "weight",
			header: "Peso (kg)",
			sortKey: "weight_kg",
			render: (p) => p.weight_kg ?? "—",
		},
		{
			id: "age",
			header: "Età",
			sortKey: "birthday",
			render: (p) =>
				p.birthday ? `${dayjs().diff(p.birthday, "year")} anni` : "—",
		},
		{
			id: "chip",
			header: "Chip",
			render: (p) => (p.chip_code ? <CellMono>{p.chip_code}</CellMono> : "—"),
		},
		{
			id: "actions",
			header: "",
			width: "80px",
			render: (p) => (
				<RowButton
					variant="danger"
					onClick={(e) => {
						e.stopPropagation();
						if (confirm(`Eliminare ${p.name}?`)) {
							deletePet({ variables: { id: p.id } });
						}
					}}
				>
					Elimina
				</RowButton>
			),
		},
	];

	return (
		<TabWrap>
			<AddSection label="Nuovo animale">
				<form onSubmit={form.handleSubmit(onCreatePet)}>
					<FormGrid>
						<Input
							label="Nome"
							{...form.register("name", { required: true })}
						/>
						<Select
							label="Proprietario"
							placeholder="Nessuno"
							options={ownerOptions}
							{...form.register("owner_id")}
						/>
						<Select
							label="Rifugio"
							placeholder="Nessuno"
							options={shelterOptions}
							{...form.register("shelter_id")}
						/>
						<Input label="Razza" {...form.register("breed")} />
						<Select
							label="Sesso"
							options={GENDER_OPTIONS}
							{...form.register("gender")}
						/>
						<Input
							label="Data di nascita"
							type="date"
							{...form.register("birthday")}
						/>
						<Input label="Chip" {...form.register("chip_code")} />
						<Input
							label="Peso (kg)"
							type="number"
							step="0.1"
							{...form.register("weight_kg")}
						/>
					</FormGrid>
					<FormFoot>
						<Button type="submit" loading={creating}>
							Crea
						</Button>
					</FormFoot>
				</form>
			</AddSection>

			<DataTable
				columns={columns}
				rows={rows}
				rowKey={(p) => p.id}
				loading={loading || deleting}
				pagination={data?.listPets?.pagination}
				page={page}
				pageSize={pageSize}
				ordering={ordering}
				searchPlaceholder="Cerca animale…"
				onPageChange={setPage}
				onPageSizeChange={setPageSize}
				onOrderingChange={setOrdering}
				onSearch={setText}
				onRowClick={(p) => router.push(`/platform/pets/${p.id}`)}
			/>
		</TabWrap>
	);
}
