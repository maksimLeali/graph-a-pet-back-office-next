"use client";

import { useState } from "react";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styled from "styled-components";

import {
	useListFundingNeedsQuery,
	useCreateFundingNeedMutation,
	useUpdateFundingNeedMutation,
	useCloseFundingNeedMutation,
} from "@/graphql/__generated__/fundingNeeds.generated";
import { useListShelterPetsBoQuery } from "@/graphql/__generated__/queries.generated";
import { FundingNeedStatus, FundingNeedUrgency } from "@/types";
import { useShelterAuthorization } from "@/lib/useShelterAuthorization";
import { ShelterPermissions } from "@/lib/permissions";
import { formatCents } from "@/lib/donations/formatCents";
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

const URGENCY_OPTIONS = [
	{ value: "NORMAL", label: "Normale" },
	{ value: "URGENT", label: "Urgente" },
];

const CATEGORY_OPTIONS = [
	{ value: "", label: "— categoria —" },
	{ value: "cure", label: "Cure mediche" },
	{ value: "food", label: "Cibo speciale / dieta" },
	{ value: "equipment", label: "Attrezzatura" },
	{ value: "other", label: "Altro" },
];

type NewNeedForm = {
	title: string;
	category: string;
	pet_id: string;
	target_euros: string;
	urgency: string;
	is_recurring_monthly: boolean;
};

/**
 * Traguardi mensili di raccolta ("funding needs"): sostituiscono il vecchio
 * limite mensile per animale. Ogni traguardo ha un importo obiettivo; i
 * traguardi ricorrenti ripartono da zero il 1° del mese (cron backend).
 */
export const FundingNeedsTab: React.FC<{ shelterId: string }> = ({
	shelterId,
}) => {
	const shelterAuth = useShelterAuthorization(shelterId);
	const canCreate = shelterAuth.can(ShelterPermissions.FUNDING_NEEDS_CREATE);
	const canUpdate = shelterAuth.can(ShelterPermissions.FUNDING_NEEDS_UPDATE);
	const canClose = shelterAuth.can(ShelterPermissions.FUNDING_NEEDS_CLOSE);

	const [showClosed, setShowClosed] = useState(false);

	const { data, loading, refetch } = useListFundingNeedsQuery({
		fetchPolicy: "cache-and-network",
		variables: {
			shelter_id: shelterId,
			status: showClosed ? null : FundingNeedStatus.Active,
		},
		onError: () => toast.error("Errore nel caricamento dei traguardi"),
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
	const petOptions = [
		{ value: "", label: "— tutto il rifugio —" },
		...(petsData?.listShelterPets?.items ?? [])
			.filter((sp): sp is NonNullable<typeof sp> => !!sp?.pet && sp.is_active)
			.map((sp) => ({ value: sp.pet.id, label: sp.pet.name })),
	];
	const petNameById = new Map(
		(petsData?.listShelterPets?.items ?? [])
			.filter((sp): sp is NonNullable<typeof sp> => !!sp?.pet)
			.map((sp) => [sp.pet.id, sp.pet.name])
	);

	const form = useForm<NewNeedForm>({
		defaultValues: { urgency: "NORMAL", is_recurring_monthly: true },
	});

	const [createNeed, { loading: creating }] = useCreateFundingNeedMutation({
		onCompleted: ({ createFundingNeed }) => {
			if (!createFundingNeed.success) {
				toast.error(
					createFundingNeed.error?.message ??
						"Errore nella creazione del traguardo"
				);
				return;
			}
			toast.success("Traguardo creato");
			form.reset({ urgency: "NORMAL", is_recurring_monthly: true } as NewNeedForm);
			refetch();
		},
		onError: () => toast.error("Errore nella creazione del traguardo"),
	});

	const [updateNeed] = useUpdateFundingNeedMutation({
		onCompleted: ({ updateFundingNeed }) => {
			if (!updateFundingNeed.success) {
				toast.error(
					updateFundingNeed.error?.message ?? "Errore nell'aggiornamento"
				);
				return;
			}
			toast.success("Traguardo aggiornato");
			refetch();
		},
		onError: () => toast.error("Errore nell'aggiornamento"),
	});

	const [closeNeed] = useCloseFundingNeedMutation({
		onCompleted: ({ closeFundingNeed }) => {
			if (!closeFundingNeed.success) {
				toast.error(
					closeFundingNeed.error?.message ?? "Errore nella chiusura"
				);
				return;
			}
			toast.success("Traguardo chiuso");
			refetch();
		},
		onError: () => toast.error("Errore nella chiusura"),
	});

	const onCreate = (v: NewNeedForm) => {
		const cents = Math.round(parseFloat(v.target_euros.replace(",", ".")) * 100);
		if (!Number.isFinite(cents) || cents <= 0) {
			toast.error("Importo obiettivo non valido");
			return;
		}
		createNeed({
			variables: {
				data: {
					shelter_id: shelterId,
					pet_id: v.pet_id || undefined,
					title: v.title,
					category: v.category || undefined,
					target_amount_cents: cents,
					urgency: v.urgency as FundingNeedUrgency,
					is_recurring_monthly: v.is_recurring_monthly,
				},
			},
		});
	};

	if (loading && !data) return <Spinner />;
	const items = (data?.listFundingNeeds?.items ?? []).filter(
		(n): n is NonNullable<typeof n> => !!n
	);

	return (
		<TabWrap>
			{canCreate && (
				<AddSection label="Nuovo traguardo">
					<form onSubmit={form.handleSubmit(onCreate)}>
						<FormGrid>
							<Input
								label="Titolo"
								placeholder="es. Cure veterinarie"
								{...form.register("title", { required: true })}
							/>
							<Select
								label="Categoria"
								options={CATEGORY_OPTIONS}
								{...form.register("category")}
							/>
							<Select
								label="Animale"
								options={petOptions}
								{...form.register("pet_id")}
							/>
							<Input
								label="Obiettivo (€/mese)"
								type="number"
								step="0.01"
								min="1"
								{...form.register("target_euros", { required: true })}
							/>
							<Select
								label="Urgenza"
								options={URGENCY_OPTIONS}
								{...form.register("urgency")}
							/>
							<CheckboxLabel>
								<input
									type="checkbox"
									{...form.register("is_recurring_monthly")}
								/>
								Si azzera ogni mese
							</CheckboxLabel>
						</FormGrid>
						<FormFoot>
							<Button type="submit" loading={creating}>
								Crea traguardo
							</Button>
						</FormFoot>
					</form>
				</AddSection>
			)}

			<FilterRow>
				<RowButton onClick={() => setShowClosed((v) => !v)}>
					{showClosed ? "Nascondi chiusi" : "Mostra anche chiusi"}
				</RowButton>
			</FilterRow>

			<List>
				{items.length === 0 && <EmptyText>Nessun traguardo</EmptyText>}
				{items.map((need) => {
					const pct =
						need.target_amount_cents > 0
							? Math.min(
									Math.round(
										(need.collected_amount_cents /
											need.target_amount_cents) *
											100
									),
									100
								)
							: 0;
					const closed = need.status === FundingNeedStatus.Closed;
					return (
						<RowCard key={need.id}>
							<NeedMain>
								<NeedTitle>
									{need.title}
									{need.urgency === FundingNeedUrgency.Urgent && (
										<UrgentBadge>Urgente</UrgentBadge>
									)}
								</NeedTitle>
								<RowSub>
									{need.pet_id
										? (petNameById.get(need.pet_id) ?? need.pet_id)
										: "Tutto il rifugio"}
									{need.category && ` — ${need.category}`}
									{need.is_recurring_monthly
										? " — mensile"
										: " — una tantum"}
									{need.last_reset_at &&
										` — azzerato il ${dayjs(need.last_reset_at).format("DD/MM/YYYY")}`}
								</RowSub>
								<ProgressTrack>
									<ProgressFill
										style={{ transform: `scaleX(${pct / 100})` }}
									/>
								</ProgressTrack>
								<RowSub>
									{formatCents(need.collected_amount_cents, need.currency)}{" "}
									di {formatCents(need.target_amount_cents, need.currency)}{" "}
									({pct}%)
								</RowSub>
							</NeedMain>
							<RowActions>
								<Badge>{closed ? "Chiuso" : "Attivo"}</Badge>
								{!closed && canUpdate && (
									<Select
										aria-label="Urgenza"
										options={URGENCY_OPTIONS}
										value={need.urgency}
										onChange={(e) =>
											updateNeed({
												variables: {
													id: need.id,
													data: {
														urgency: e.target
															.value as FundingNeedUrgency,
													},
												},
											})
										}
									/>
								)}
								{!closed && canClose && (
									<RowButton
										variant="danger"
										onClick={() => {
											if (confirm("Chiudere questo traguardo?")) {
												closeNeed({ variables: { id: need.id } });
											}
										}}
									>
										Chiudi
									</RowButton>
								)}
							</RowActions>
						</RowCard>
					);
				})}
			</List>
		</TabWrap>
	);
};

const FilterRow = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const NeedMain = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
	min-width: 0;
	flex: 1 1 auto;
`;

const NeedTitle = styled.span`
	display: inline-flex;
	align-items: center;
	gap: 8px;
	font-weight: 500;
	color: ${$color("text")};
`;

const UrgentBadge = styled.span`
	padding: 1px 8px;
	border-radius: 999px;
	font-size: 1.1rem;
	font-weight: 700;
	background: ${$color("danger")};
	color: ${$color("danger")};
`;

const ProgressTrack = styled.div`
	width: 100%;
	max-width: 320px;
	height: 6px;
	border-radius: 999px;
	overflow: hidden;
	background: ${$color("border")};
`;

const ProgressFill = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 999px;
	transform-origin: left center;
	background: ${$color("primary")};
	transition: transform 0.4s ease;
`;

const CheckboxLabel = styled.label`
	display: inline-flex;
	align-items: center;
	gap: 8px;
	font-size: 1.3rem;
	color: ${$color("text")};
	align-self: end;
	padding-bottom: 8px;
`;
