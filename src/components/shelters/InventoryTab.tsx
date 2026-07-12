"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styled from "styled-components";

import { useListShelterInventoryItemsBoQuery } from "@/graphql/__generated__/queries.generated";
import {
	useCreateShelterInventoryItemBoMutation,
	useCreateShelterInventoryMovementBoMutation,
	useArchiveShelterInventoryItemBoMutation,
	useDeleteShelterInventoryItemBoMutation,
} from "@/graphql/__generated__/mutations.generated";
import { InventoryCategory, MovementType } from "@/types";
import { Spinner } from "@/components/ui/Spinner";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Badge, RowButton } from "@/components/cells";
import { $color, $uw } from "@/theme";

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

const CATEGORY_OPTIONS = [
	{ value: "FOOD_DRY", label: "Cibo secco" },
	{ value: "FOOD_WET", label: "Cibo umido" },
	{ value: "MEDICINE", label: "Medicinali" },
	{ value: "HYGIENE", label: "Igiene" },
	{ value: "EQUIPMENT", label: "Attrezzatura" },
	{ value: "OTHER", label: "Altro" },
];

const CATEGORY_LABEL: Record<string, string> = Object.fromEntries(
	CATEGORY_OPTIONS.map((o) => [o.value, o.label])
);

const MOVEMENT_OPTIONS = [
	{ value: "RESTOCK", label: "Rifornimento" },
	{ value: "DONATION", label: "Donazione" },
	{ value: "CONSUMPTION", label: "Consumo" },
	{ value: "WASTE", label: "Scarto" },
	{ value: "ADJUSTMENT", label: "Rettifica" },
];

type ItemForm = {
	name: string;
	category: string;
	unit: string;
	minimum_threshold: string;
	initial_quantity: string;
	notes: string;
};

type MovementForm = {
	movement_type: string;
	quantity: string;
	notes: string;
};

const MovementSection: React.FC<{
	itemId: string;
	onDone: () => void;
}> = ({ itemId, onDone }) => {
	const form = useForm<MovementForm>({
		defaultValues: { movement_type: "RESTOCK" },
	});

	const [createMovement, { loading }] =
		useCreateShelterInventoryMovementBoMutation({
			onCompleted: ({ createShelterInventoryMovement }) => {
				if (!createShelterInventoryMovement.success) {
					toast.error(
						createShelterInventoryMovement.error?.message ??
							"Errore nel movimento"
					);
					return;
				}
				toast.success("Movimento registrato");
				form.reset({ movement_type: "RESTOCK" } as MovementForm);
				onDone();
			},
			onError: () => toast.error("Errore nel movimento"),
		});

	return (
		<MovementForm_
			onSubmit={form.handleSubmit((v) =>
				createMovement({
					variables: {
						data: {
							item_id: itemId,
							movement_type: v.movement_type as MovementType,
							quantity: parseFloat(v.quantity),
							notes: v.notes || undefined,
						},
					},
				})
			)}
		>
			<Select
				aria-label="Tipo movimento"
				options={MOVEMENT_OPTIONS}
				{...form.register("movement_type")}
			/>
			<Input
				aria-label="Quantità"
				type="number"
				step="any"
				placeholder="Quantità"
				{...form.register("quantity", { required: true })}
			/>
			<Input
				aria-label="Note movimento"
				placeholder="Note"
				{...form.register("notes")}
			/>
			<Button type="submit" loading={loading}>
				Registra
			</Button>
		</MovementForm_>
	);
};

export const InventoryTab: React.FC<{ shelterId: string }> = ({
	shelterId,
}) => {
	const itemForm = useForm<ItemForm>({
		defaultValues: { category: "FOOD_DRY" },
	});
	const [movementFor, setMovementFor] = useState<string | null>(null);

	const { data, loading, refetch } = useListShelterInventoryItemsBoQuery({
		variables: {
			search: {
				page: 0,
				page_size: 100,
				order_by: "name",
				order_direction: "asc",
				filters: { fixed: [{ key: "shelter_id", value: shelterId }] },
			},
		},
		onError: () => toast.error("Errore nel caricamento dell'inventario"),
	});

	const [createItem, { loading: creating }] =
		useCreateShelterInventoryItemBoMutation({
			onCompleted: ({ createShelterInventoryItem }) => {
				if (!createShelterInventoryItem.success) {
					toast.error(
						createShelterInventoryItem.error?.message ??
							"Errore nella creazione dell'articolo"
					);
					return;
				}
				toast.success("Articolo creato");
				itemForm.reset({ category: "FOOD_DRY" } as ItemForm);
				refetch();
			},
			onError: () => toast.error("Errore nella creazione dell'articolo"),
		});

	const [archiveItem] = useArchiveShelterInventoryItemBoMutation({
		onCompleted: () => refetch(),
		onError: () => toast.error("Errore nell'archiviazione"),
	});

	const [deleteItem] = useDeleteShelterInventoryItemBoMutation({
		onCompleted: ({ deleteShelterInventoryItem }) => {
			if (!deleteShelterInventoryItem.success) {
				toast.error(
					deleteShelterInventoryItem.error?.message ??
						"Impossibile eliminare: l'articolo ha movimenti"
				);
				return;
			}
			toast.success("Articolo eliminato");
			refetch();
		},
		onError: () => toast.error("Errore nell'eliminazione"),
	});

	if (loading) return <Spinner />;
	const items = data?.listShelterInventoryItems?.items ?? [];

	return (
		<TabWrap>
			<AddSection label="Nuovo articolo">
				<form
					onSubmit={itemForm.handleSubmit((v) =>
						createItem({
							variables: {
								data: {
									shelter_id: shelterId,
									name: v.name,
									category: v.category as InventoryCategory,
									unit: v.unit,
									minimum_threshold: v.minimum_threshold
										? parseFloat(v.minimum_threshold)
										: undefined,
									initial_quantity: v.initial_quantity
										? parseFloat(v.initial_quantity)
										: undefined,
									notes: v.notes || undefined,
								},
							},
						})
					)}
				>
					<FormGrid>
						<Input
							label="Nome"
							{...itemForm.register("name", { required: true })}
						/>
						<Select
							label="Categoria"
							options={CATEGORY_OPTIONS}
							{...itemForm.register("category")}
						/>
						<Input
							label="Unità (kg, pz…)"
							{...itemForm.register("unit", { required: true })}
						/>
						<Input
							label="Soglia minima"
							type="number"
							step="any"
							{...itemForm.register("minimum_threshold")}
						/>
						<Input
							label="Quantità iniziale"
							type="number"
							step="any"
							{...itemForm.register("initial_quantity")}
						/>
						<Input label="Note" {...itemForm.register("notes")} />
					</FormGrid>
					<FormFoot>
						<Button type="submit" loading={creating}>
							Crea
						</Button>
					</FormFoot>
				</form>
			</AddSection>

			<List>
				{items.length === 0 && <EmptyText>Nessun articolo</EmptyText>}
				{items.map(
					(it) =>
						it && (
							<ItemCard key={it.id}>
								<ItemRow>
									<div>
										<RowTitle>{it.name}</RowTitle>
										<RowSub>
											{CATEGORY_LABEL[it.category] ?? it.category} —{" "}
											{it.current_quantity} {it.unit}
											{it.minimum_threshold != null &&
												` — soglia ${it.minimum_threshold} ${it.unit}`}
											{it.notes && ` — ${it.notes}`}
										</RowSub>
									</div>
									<RowActions>
										{it.is_below_threshold && (
											<LowBadge>Scorta bassa</LowBadge>
										)}
										{!it.is_active && <Badge>Archiviato</Badge>}
										{it.is_active && (
											<>
												<RowButton
													variant="ghost"
													onClick={() =>
														setMovementFor((cur) =>
															cur === it.id ? null : it.id
														)
													}
												>
													{movementFor === it.id
														? "Chiudi"
														: "Movimento"}
												</RowButton>
												<RowButton
													variant="ghost"
													onClick={() => {
														if (confirm("Archiviare questo articolo?")) {
															archiveItem({ variables: { id: it.id } });
														}
													}}
												>
													Archivia
												</RowButton>
											</>
										)}
										<RowButton
											variant="danger"
											onClick={() => {
												if (confirm("Eliminare questo articolo?")) {
													deleteItem({ variables: { id: it.id } });
												}
											}}
										>
											Elimina
										</RowButton>
									</RowActions>
								</ItemRow>
								{movementFor === it.id && (
									<MovementSection
										itemId={it.id}
										onDone={() => {
											setMovementFor(null);
											refetch();
										}}
									/>
								)}
							</ItemCard>
						)
				)}
			</List>
		</TabWrap>
	);
};

const ItemCard = styled(RowCard)`
	flex-direction: column;
	align-items: stretch;
`;

const ItemRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: ${$uw(1)};
	flex-wrap: wrap;
`;

const MovementForm_ = styled.form`
	display: flex;
	align-items: flex-end;
	gap: ${$uw(0.5)};
	flex-wrap: wrap;
	border-top: 1px solid ${$color("border")};
	padding-top: ${$uw(0.75)};
`;

const LowBadge = styled(Badge)`
	background: rgba(185, 28, 28, 0.15);
	color: ${$color("danger")};
`;
