"use client";

import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
	useListOperationalShelterWalksBoQuery,
	useListShelterPetsBoQuery,
	useListShelterRolesBoQuery,
} from "@/graphql/__generated__/queries.generated";
import {
	useCreateShelterWalkBoMutation,
	useStartShelterWalkBoMutation,
	useCompleteShelterWalkBoMutation,
	useCancelShelterWalkBoMutation,
	useDeleteShelterWalkBoMutation,
} from "@/graphql/__generated__/mutations.generated";
import { Spinner } from "@/components/ui/Spinner";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Badge, RowButton } from "@/components/cells";

import {
	AddSection,
	TabWrap,
	List,
	RowCard,
	RowTitle,
	RowSub,
	RowActions,
	EmptyText,
	FormGrid,
	FormFoot,
} from "./common";

const STATUS_LABEL: Record<string, string> = {
	PLANNED: "Pianificata",
	IN_PROGRESS: "In corso",
	COMPLETED: "Completata",
	CANCELLED: "Annullata",
};

type WalkForm = {
	shelter_pet_id: string;
	walker_id: string;
	scheduled_at: string;
	notes: string;
};

export const WalksTab: React.FC<{ shelterId: string }> = ({ shelterId }) => {
	const form = useForm<WalkForm>();

	const { data, loading, refetch } = useListOperationalShelterWalksBoQuery({
		variables: { shelter_id: shelterId },
		onError: () => toast.error("Errore nel caricamento delle passeggiate"),
	});

	const { data: petsData } = useListShelterPetsBoQuery({
		variables: {
			search: {
				page: 0,
				page_size: 100,
				filters: { fixed: [{ key: "shelter_id", value: shelterId }] },
			},
		},
	});

	const { data: rolesData } = useListShelterRolesBoQuery({
		variables: {
			search: {
				page: 0,
				page_size: 100,
				filters: { fixed: [{ key: "shelter_id", value: shelterId }] },
			},
		},
	});

	const petOptions = (petsData?.listShelterPets?.items ?? [])
		.filter((sp) => sp?.pet)
		.map((sp) => ({ value: sp!.id, label: sp!.pet.name }));

	const walkerOptions = (rolesData?.listShelterRoles?.items ?? [])
		.filter((r) => !!r)
		.map((r) => ({
			value: r!.user.id,
			label: `${r!.user.first_name} ${r!.user.last_name}`,
		}));

	const [createWalk, { loading: creating }] = useCreateShelterWalkBoMutation({
		onCompleted: ({ createShelterWalk }) => {
			if (!createShelterWalk.success) {
				toast.error(
					createShelterWalk.error?.message ??
						"Errore nella creazione della passeggiata"
				);
				return;
			}
			toast.success("Passeggiata creata");
			form.reset();
			refetch();
		},
		onError: () => toast.error("Errore nella creazione della passeggiata"),
	});

	const [startWalk] = useStartShelterWalkBoMutation({
		onCompleted: () => refetch(),
		onError: () => toast.error("Errore nell'avvio"),
	});

	const [completeWalk] = useCompleteShelterWalkBoMutation({
		onCompleted: () => refetch(),
		onError: () => toast.error("Errore nel completamento"),
	});

	const [cancelWalk] = useCancelShelterWalkBoMutation({
		onCompleted: () => refetch(),
		onError: () => toast.error("Errore nell'annullamento"),
	});

	const [deleteWalk] = useDeleteShelterWalkBoMutation({
		onCompleted: () => refetch(),
		onError: () => toast.error("Errore nell'eliminazione"),
	});

	if (loading) return <Spinner />;
	const items = data?.listOperationalShelterWalks?.items ?? [];

	return (
		<TabWrap>
			<AddSection label="Nuova passeggiata">
				<form
					onSubmit={form.handleSubmit((v) =>
						createWalk({
							variables: {
								data: {
									shelter_pet_id: v.shelter_pet_id,
									walker_id: v.walker_id || undefined,
									scheduled_at: v.scheduled_at ? new Date(v.scheduled_at).toISOString() : undefined,
									notes: v.notes || undefined,
								},
							},
						})
					)}
				>
					<FormGrid>
						<Select
							label="Animale"
							placeholder="Seleziona animale"
							options={petOptions}
							{...form.register("shelter_pet_id", { required: true })}
						/>
						<Select
							label="Accompagnatore"
							placeholder="Nessuno"
							options={walkerOptions}
							{...form.register("walker_id")}
						/>
						<Input
							label="Pianificata per"
							type="datetime-local"
							{...form.register("scheduled_at")}
						/>
						<Input label="Note" {...form.register("notes")} />
					</FormGrid>
					<FormFoot>
						<Button type="submit" loading={creating}>
							Crea
						</Button>
					</FormFoot>
				</form>
			</AddSection>

			<List>
				{items.length === 0 && <EmptyText>Nessuna passeggiata</EmptyText>}
				{items.map(
					(w) =>
						w && (
							<RowCard key={w.id}>
								<div>
									<RowTitle>{w.shelter_pet.pet.name}</RowTitle>
									<RowSub>
										{w.scheduled_at
											? dayjs(w.scheduled_at).format("DD/MM/YYYY HH:mm")
											: "Non pianificata"}
										{(w.walker || w.walker_shelter_person) &&
											` — ${
												w.walker
													? `${w.walker.first_name} ${w.walker.last_name}`
													: `${w.walker_shelter_person?.first_name ?? ""} ${
															w.walker_shelter_person?.last_name ?? ""
														}`.trim()
											}`}
										{w.duration_minutes != null &&
											` — ${w.duration_minutes} min`}
										{w.notes && ` — ${w.notes}`}
									</RowSub>
								</div>
								<RowActions>
									<Badge>{STATUS_LABEL[w.status] ?? w.status}</Badge>
									{w.status === "PLANNED" && (
										<>
											<RowButton
												variant="ghost"
												onClick={() => startWalk({ variables: { id: w.id } })}
											>
												Avvia
											</RowButton>
											<RowButton
												variant="ghost"
												onClick={() =>
													cancelWalk({ variables: { id: w.id } })
												}
											>
												Annulla
											</RowButton>
										</>
									)}
									{w.status === "IN_PROGRESS" && (
										<RowButton
											variant="ghost"
											onClick={() =>
												completeWalk({ variables: { id: w.id } })
											}
										>
											Completa
										</RowButton>
									)}
									<RowButton
										variant="danger"
										onClick={() => {
											if (confirm("Eliminare questa passeggiata?")) {
												deleteWalk({ variables: { id: w.id } });
											}
										}}
									>
										Elimina
									</RowButton>
								</RowActions>
							</RowCard>
						)
				)}
			</List>
		</TabWrap>
	);
};
