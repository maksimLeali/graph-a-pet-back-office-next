"use client";

import dayjs from "dayjs";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";

import {
	useListOperationalShelterTasksBoQuery,
	useListShelterPetsBoQuery,
	useListShelterRolesBoQuery,
} from "@/graphql/__generated__/queries.generated";
import {
	useCreateShelterTaskBoMutation,
	useCompleteShelterTaskBoMutation,
	useSkipShelterTaskBoMutation,
	useDeleteShelterTaskBoMutation,
} from "@/graphql/__generated__/mutations.generated";
import { ShelterTaskType, RecurrenceFreq } from "@/types";
import { useShelterAuthorization } from "@/lib/useShelterAuthorization";
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

const TASK_TYPE_OPTIONS = [
	{ value: "CLEANING", label: "Pulizia" },
	{ value: "DEEP_CLEANING", label: "Pulizia profonda" },
	{ value: "FEEDING", label: "Alimentazione" },
	{ value: "MEDICATION", label: "Medicazione" },
	{ value: "GROOMING", label: "Toelettatura" },
	{ value: "OTHER", label: "Altro" },
];

const TASK_TYPE_LABEL: Record<string, string> = Object.fromEntries(
	TASK_TYPE_OPTIONS.map((o) => [o.value, o.label])
);

const STATUS_LABEL: Record<string, string> = {
	PENDING: "Da fare",
	IN_PROGRESS: "In corso",
	COMPLETED: "Completato",
	SKIPPED: "Saltato",
	CANCELLED: "Annullato",
	OVERDUE: "In ritardo",
};

const FREQ_OPTIONS = [
	{ value: "DAILY", label: "Giornaliera" },
	{ value: "WEEKLY", label: "Settimanale" },
	{ value: "MONTHLY", label: "Mensile" },
];

type TaskForm = {
	task_type: string;
	area: string;
	shelter_pet_id: string;
	assignee_id: string;
	scheduled_at: string;
	is_recurring: boolean;
	freq: string;
	notes: string;
};

export const TasksTab: React.FC<{ shelterId: string }> = ({ shelterId }) => {
	const form = useForm<TaskForm>({
		defaultValues: { task_type: "CLEANING", freq: "DAILY" },
	});
	const isRecurring = useWatch({
		control: form.control,
		name: "is_recurring",
	});

	const { can } = useShelterAuthorization(shelterId);

	const { data, loading, refetch } = useListOperationalShelterTasksBoQuery({
		variables: { shelter_id: shelterId },
		fetchPolicy: "network-only",
		onError: () => toast.error("Errore nel caricamento dei task"),
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

	const memberOptions = (rolesData?.listShelterRoles?.items ?? [])
		.filter((r) => !!r)
		.map((r) => ({
			value: r!.user.id,
			label: `${r!.user.first_name} ${r!.user.last_name}`,
		}));

	const [createTask, { loading: creating }] = useCreateShelterTaskBoMutation({
		onCompleted: ({ createShelterTask }) => {
			if (!createShelterTask.success) {
				toast.error(
					createShelterTask.error?.message ??
						"Errore nella creazione del task"
				);
				return;
			}
			toast.success("Task creato");
			form.reset({ task_type: "CLEANING", freq: "DAILY" } as TaskForm);
			refetch();
		},
		onError: () => toast.error("Errore nella creazione del task"),
	});

	const [completeTask] = useCompleteShelterTaskBoMutation({
		onCompleted: () => refetch(),
		onError: () => toast.error("Errore nel completamento"),
	});

	const [skipTask] = useSkipShelterTaskBoMutation({
		onCompleted: () => refetch(),
		onError: () => toast.error("Errore nel salto del task"),
	});

	const [deleteTask] = useDeleteShelterTaskBoMutation({
		onCompleted: () => refetch(),
		onError: () => toast.error("Errore nell'eliminazione"),
	});

	const listResult = data?.listOperationalShelterTasks;
	const items = listResult?.items ?? [];

	useEffect(() => {
		if (listResult && !listResult.success)
			toast.error(listResult.error?.message ?? "Errore nel caricamento dei task");
	}, [listResult]);

	if (loading) return <Spinner />;

	return (
		<TabWrap>
			{can("shelters.tasks.create") && (
			<AddSection label="Nuovo task">
				<form
					onSubmit={form.handleSubmit((v) =>
						createTask({
							variables: {
								data: {
									shelter_id: shelterId,
									task_type: v.task_type as ShelterTaskType,
									area: v.area || undefined,
									shelter_pet_id: v.shelter_pet_id || undefined,
									assignee_ids: v.assignee_id ? [v.assignee_id] : undefined,
									scheduled_at: v.scheduled_at ? new Date(v.scheduled_at).toISOString() : undefined,
									is_recurring: v.is_recurring,
									recurrence: v.is_recurring
										? { freq: v.freq as RecurrenceFreq }
										: undefined,
									notes: v.notes || undefined,
								},
							},
						})
					)}
				>
					<FormGrid>
						<Select
							label="Tipo"
							options={TASK_TYPE_OPTIONS}
							{...form.register("task_type")}
						/>
						<Input label="Area" {...form.register("area")} />
						<Select
							label="Animale"
							placeholder="Nessuno"
							options={petOptions}
							{...form.register("shelter_pet_id")}
						/>
						<Select
							label="Assegnato a"
							placeholder="Nessuno"
							options={memberOptions}
							{...form.register("assignee_id")}
						/>
						<Input
							label="Pianificato per"
							type="datetime-local"
							{...form.register("scheduled_at")}
						/>
						<Input label="Note" {...form.register("notes")} />
						<label>
							<input type="checkbox" {...form.register("is_recurring")} />{" "}
							Ricorrente
						</label>
						{isRecurring && (
							<Select
								label="Frequenza"
								options={FREQ_OPTIONS}
								{...form.register("freq")}
							/>
						)}
					</FormGrid>
					<FormFoot>
						<Button type="submit" loading={creating}>
							Crea
						</Button>
					</FormFoot>
				</form>
			</AddSection>
			)}

			<List>
				{items.length === 0 && <EmptyText>Nessun task</EmptyText>}
				{items.map(
					(t) =>
						t && (
							<RowCard key={t.id}>
								<div>
									<RowTitle>
										{TASK_TYPE_LABEL[t.task_type] ?? t.task_type}
										{t.shelter_pet?.pet && ` — ${t.shelter_pet.pet.name}`}
										{t.area && ` — ${t.area}`}
									</RowTitle>
									<RowSub>
										{t.scheduled_at
											? dayjs(t.scheduled_at).format("DD/MM/YYYY HH:mm")
											: t.scheduled_date
												? dayjs(t.scheduled_date).format("DD/MM/YYYY")
												: "Non pianificato"}
										{t.is_recurring && " — ricorrente"}
										{t.assignees.length > 0 &&
											` — ${t.assignees
												.map((a) => `${a.first_name} ${a.last_name}`)
												.join(", ")}`}
										{t.notes && ` — ${t.notes}`}
									</RowSub>
								</div>
								<RowActions>
									<Badge>{STATUS_LABEL[t.status] ?? t.status}</Badge>
									{(t.status === "PENDING" || t.status === "OVERDUE") &&
										can("shelters.tasks.execute") && (
										<>
											<RowButton
												variant="ghost"
												onClick={() =>
													completeTask({ variables: { id: t.id } })
												}
											>
												Completa
											</RowButton>
											<RowButton
												variant="ghost"
												onClick={() => skipTask({ variables: { id: t.id } })}
											>
												Salta
											</RowButton>
										</>
									)}
									{can("shelters.tasks.delete") && (
										<RowButton
											variant="danger"
											onClick={() => {
												if (confirm("Eliminare questo task?")) {
													deleteTask({ variables: { id: t.id } });
												}
											}}
										>
											Elimina
										</RowButton>
									)}
								</RowActions>
							</RowCard>
						)
				)}
			</List>
		</TabWrap>
	);
};
