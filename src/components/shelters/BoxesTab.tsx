"use client";

import { useState } from "react";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styled from "styled-components";

import { useListShelterPetsBoQuery } from "@/graphql/__generated__/queries.generated";
import { useListShelterMapsBoQuery } from "@/graphql/__generated__/map.generated";
import {
	useAssignPetToBoxBoMutation,
	useReleasePetFromBoxBoMutation,
} from "@/graphql/__generated__/map.generated";
import {
	useListShelterBoxesBoQuery,
	useUpdateShelterBoxBoMutation,
	useMarkBoxCleanedBoMutation,
	useDeleteShelterBoxBoMutation,
	useMovePetBetweenBoxesBoMutation,
} from "@/graphql/__generated__/boxes.generated";
import { Spinner } from "@/components/ui/Spinner";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Badge, RowButton } from "@/components/cells";
import { $color, $uw } from "@/theme";

import { TabWrap, List, RowCard, RowTitle, RowSub, EmptyText } from "./common";

const STATUS_LABEL: Record<string, string> = {
	AVAILABLE: "Disponibile",
	OCCUPIED: "Occupato",
	FULL: "Pieno",
	NEEDS_CLEANING: "Da pulire",
	OUT_OF_SERVICE: "Fuori servizio",
};

const STATUS_COLOR: Record<string, string> = {
	AVAILABLE: "#ffb74d",
	OCCUPIED: "#81c784",
	FULL: "#2e7d32",
	NEEDS_CLEANING: "#ffd54f",
	OUT_OF_SERVICE: "#e53935",
};

type EditForm = {
	label: string;
	capacity: number;
	notes: string;
};

export const BoxesTab: React.FC<{ shelterId: string }> = ({ shelterId }) => {
	const [mapId, setMapId] = useState<string | null>(null);
	const [openBoxId, setOpenBoxId] = useState<string | null>(null);
	const [historyFor, setHistoryFor] = useState<string | null>(null);
	const editForm = useForm<EditForm>();

	const { data: mapsData, loading: mapsLoading } = useListShelterMapsBoQuery({
		variables: {
			commonSearch: {
				page: 0,
				page_size: 20,
				filters: { fixed: [{ key: "shelter_id", value: shelterId }] },
			},
		},
		onError: () => toast.error("Errore nel caricamento delle mappe"),
	});
	const maps = (mapsData?.listShelterMaps?.items ?? []).filter(
		(m): m is NonNullable<typeof m> => !!m
	);
	// prima mappa di default, senza effect
	const effectiveMapId = mapId ?? maps[0]?.id ?? null;

	const {
		data: boxesData,
		loading: boxesLoading,
		refetch,
	} = useListShelterBoxesBoQuery({
		skip: !effectiveMapId,
		variables: {
			search: {
				page: 0,
				page_size: 200,
				order_by: "label",
				order_direction: "asc",
				filters: {
					fixed: [{ key: "map_id", value: effectiveMapId ?? "" }],
				},
			},
		},
		onError: () => toast.error("Errore nel caricamento dei box"),
	});

	const { data: petsData } = useListShelterPetsBoQuery({
		variables: {
			search: {
				page: 0,
				page_size: 200,
				filters: { fixed: [{ key: "shelter_id", value: shelterId }] },
			},
		},
	});
	const shelterPets = (petsData?.listShelterPets?.items ?? []).filter(
		(p): p is NonNullable<typeof p> => !!p
	);

	// estrae il payload Result (success/error) dalla risposta mutation
	const onDone = (msg: string) => ({
		onCompleted: (res: object) => {
			const payload = Object.values(res).find(
				(v) => typeof v === "object" && v !== null
			) as
				| { success: boolean; error?: { message?: string | null } | null }
				| undefined;
			if (!payload?.success) {
				toast.error(payload?.error?.message ?? "Operazione fallita");
				return;
			}
			toast.success(msg);
			refetch();
		},
		onError: () => toast.error("Operazione fallita"),
	});

	const [updateBox, { loading: updating }] = useUpdateShelterBoxBoMutation(
		onDone("Box aggiornato")
	);
	const [markCleaned] = useMarkBoxCleanedBoMutation(onDone("Box pulito"));
	const [deleteBox] = useDeleteShelterBoxBoMutation(onDone("Box eliminato"));
	const [movePet] = useMovePetBetweenBoxesBoMutation(
		onDone("Animale spostato")
	);
	const [assignPet] = useAssignPetToBoxBoMutation(onDone("Animale assegnato"));
	const [releasePet] = useReleasePetFromBoxBoMutation(
		onDone("Animale rilasciato")
	);

	if (mapsLoading || (effectiveMapId && boxesLoading && !boxesData))
		return <Spinner />;

	if (maps.length === 0)
		return (
			<EmptyText>
				Nessuna mappa: crea prima la mappa del rifugio (tab Mappa) per
				gestire i box
			</EmptyText>
		);

	const boxes = (boxesData?.listShelterBoxes?.items ?? []).filter(
		(b): b is NonNullable<typeof b> => !!b
	);
	const assignedIds = new Set(
		boxes.flatMap((b) => b.current_occupants.map((o) => o.id))
	);

	const openEdit = (b: (typeof boxes)[number]) => {
		setOpenBoxId(b.id);
		editForm.reset({
			label: b.label,
			capacity: b.capacity,
			notes: b.notes ?? "",
		});
	};

	return (
		<TabWrap>
			{maps.length > 1 && (
				<MapPicker>
					<Select
						label="Mappa"
						options={maps.map((m) => ({ value: m.id, label: m.name }))}
						value={effectiveMapId ?? ""}
						onChange={(e) => setMapId(e.target.value)}
					/>
				</MapPicker>
			)}

			<List>
				{boxes.length === 0 && (
					<EmptyText>
						Nessun box su questa mappa: aggiungili dal tab Mappa
					</EmptyText>
				)}
				{boxes.map((b) => {
					const status = b.is_out_of_service
						? "OUT_OF_SERVICE"
						: b.status;
					return (
						<BoxCard key={b.id}>
							<BoxRow>
								<div>
									<RowTitle>
										{b.label}
										{b.zone?.name && ` — ${b.zone.name}`}
										{b.area?.name && ` / ${b.area.name}`}
									</RowTitle>
									<RowSub>
										{b.current_occupants.length}/{b.capacity} occupanti
										{b.last_cleaned_at &&
											` — pulito il ${dayjs(b.last_cleaned_at).format(
												"DD/MM/YYYY HH:mm"
											)}`}
										{b.notes && ` — ${b.notes}`}
									</RowSub>
								</div>
								<BoxActions>
									<StatusBadge $c={STATUS_COLOR[status]}>
										{STATUS_LABEL[status] ?? status}
									</StatusBadge>
									<RowButton
										variant="ghost"
										onClick={() =>
											markCleaned({ variables: { box_id: b.id } })
										}
									>
										Pulito
									</RowButton>
									<RowButton
										variant="ghost"
										onClick={() =>
											updateBox({
												variables: {
													id: b.id,
													data: {
														is_out_of_service:
															!b.is_out_of_service,
													},
												},
											})
										}
									>
										{b.is_out_of_service
											? "Ripristina"
											: "Fuori servizio"}
									</RowButton>
									<RowButton
										variant="ghost"
										onClick={() =>
											openBoxId === b.id
												? setOpenBoxId(null)
												: openEdit(b)
										}
									>
										{openBoxId === b.id ? "Chiudi" : "Modifica"}
									</RowButton>
									<RowButton
										variant="ghost"
										onClick={() =>
											setHistoryFor((cur) =>
												cur === b.id ? null : b.id
											)
										}
									>
										Storico
									</RowButton>
									<RowButton
										variant="danger"
										onClick={() => {
											if (confirm("Eliminare questo box?")) {
												deleteBox({ variables: { id: b.id } });
											}
										}}
									>
										Elimina
									</RowButton>
								</BoxActions>
							</BoxRow>

							{/* occupanti + assegna/sposta */}
							<OccSection>
								{b.current_occupants.map((o) => (
									<OccRow key={o.id}>
										<span>{o.pet.name}</span>
										<OccActions>
											<MoveSelect
												aria-label={`Sposta ${o.pet.name}`}
												options={boxes
													.filter(
														(t) =>
															t.id !== b.id &&
															!t.is_out_of_service &&
															t.current_occupants.length <
																t.capacity
													)
													.map((t) => ({
														value: t.id,
														label: `→ ${t.label}`,
													}))}
												placeholder="Sposta in…"
												value=""
												onChange={(e) => {
													if (e.target.value)
														movePet({
															variables: {
																shelter_pet_id: o.id,
																to_box_id: e.target.value,
															},
														});
												}}
											/>
											<RowButton
												variant="danger"
												onClick={() => {
													const occ =
														b.occupancy_history?.items?.find(
															(h) =>
																h &&
																!h.exited_at &&
																h.shelter_pet.id === o.id
														);
													if (!occ) {
														toast.error(
															"Occupazione non trovata"
														);
														return;
													}
													releasePet({
														variables: { occupancy_id: occ.id },
													});
												}}
											>
												Rilascia
											</RowButton>
										</OccActions>
									</OccRow>
								))}
								{!b.is_out_of_service &&
									b.current_occupants.length < b.capacity && (
										<MoveSelect
											aria-label="Assegna animale"
											options={shelterPets
												.filter((sp) => !assignedIds.has(sp.id))
												.map((sp) => ({
													value: sp.id,
													label: sp.pet?.name ?? "-",
												}))}
											placeholder="+ Assegna animale…"
											value=""
											onChange={(e) => {
												if (e.target.value)
													assignPet({
														variables: {
															box_id: b.id,
															shelter_pet_id: e.target.value,
														},
													});
											}}
										/>
									)}
							</OccSection>

							{/* edit form */}
							{openBoxId === b.id && (
								<EditSection
									onSubmit={editForm.handleSubmit((v) =>
										updateBox({
											variables: {
												id: b.id,
												data: {
													label: v.label,
													capacity: Math.max(
														1,
														Number(v.capacity) || 1
													),
													notes: v.notes || null,
												},
											},
											onCompleted: ({ updateShelterBox }) => {
												if (!updateShelterBox.success) {
													toast.error(
														updateShelterBox.error?.message ??
															"Errore nell'aggiornamento"
													);
													return;
												}
												toast.success("Box aggiornato");
												setOpenBoxId(null);
												refetch();
											},
										})
									)}
								>
									<Input
										label="Etichetta"
										{...editForm.register("label", {
											required: true,
										})}
									/>
									<Input
										label="Capienza"
										type="number"
										min={1}
										{...editForm.register("capacity")}
									/>
									<Input label="Note" {...editForm.register("notes")} />
									<EditFoot>
										<Button type="submit" loading={updating}>
											Salva
										</Button>
									</EditFoot>
								</EditSection>
							)}

							{/* occupancy history */}
							{historyFor === b.id && (
								<HistorySection>
									{(b.occupancy_history?.items ?? []).length === 0 && (
										<RowSub>Nessuno storico</RowSub>
									)}
									{(b.occupancy_history?.items ?? []).map(
										(h) =>
											h && (
												<HistoryRow key={h.id}>
													<span>{h.shelter_pet.pet.name}</span>
													<RowSub>
														{dayjs(h.entered_at).format(
															"DD/MM/YYYY HH:mm"
														)}
														{" → "}
														{h.exited_at
															? dayjs(h.exited_at).format(
																	"DD/MM/YYYY HH:mm"
																)
															: "presente"}
														{h.moved_by &&
															` — ${h.moved_by.first_name} ${h.moved_by.last_name}`}
														{h.reason && ` — ${h.reason}`}
													</RowSub>
												</HistoryRow>
											)
									)}
								</HistorySection>
							)}
						</BoxCard>
					);
				})}
			</List>
		</TabWrap>
	);
};

const MapPicker = styled.div`
	max-width: ${$uw(20)};
`;

const BoxCard = styled(RowCard)`
	flex-direction: column;
	align-items: stretch;
`;

const BoxRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: ${$uw(1)};
	flex-wrap: wrap;
`;

const BoxActions = styled.div`
	display: flex;
	align-items: center;
	gap: ${$uw(0.5)};
	flex-wrap: wrap;
`;

const StatusBadge = styled(Badge)<{ $c?: string }>`
	background: ${({ $c }) => ($c ? `${$c}33` : undefined)};
	color: ${$color("text")};
	border: 1px solid ${({ $c }) => $c ?? "transparent"};
`;

const OccSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(0.5)};
	border-top: 1px solid ${$color("border")};
	padding-top: ${$uw(0.75)};
`;

const OccRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: ${$uw(0.5)};
	font-size: 1.4rem;
	color: ${$color("text")};
`;

const OccActions = styled.div`
	display: flex;
	align-items: center;
	gap: ${$uw(0.5)};
`;

const MoveSelect = styled(Select)`
	max-width: ${$uw(16)};
`;

const EditSection = styled.form`
	display: grid;
	grid-template-columns: 1fr;
	gap: ${$uw(0.75)};
	border-top: 1px solid ${$color("border")};
	padding-top: ${$uw(0.75)};
	@media (min-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

const EditFoot = styled.div`
	display: flex;
	align-items: flex-end;
`;

const HistorySection = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(0.4)};
	border-top: 1px solid ${$color("border")};
	padding-top: ${$uw(0.75)};
`;

const HistoryRow = styled.div`
	display: flex;
	align-items: baseline;
	gap: ${$uw(0.75)};
	font-size: 1.35rem;
	color: ${$color("text")};
`;
