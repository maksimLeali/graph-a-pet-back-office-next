"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import styled from "styled-components";

import {
	useListPlatformShelterClaimRequestsBoQuery,
	useApproveShelterClaimBoMutation,
	useRejectShelterClaimBoMutation,
	useRequestShelterClaimDocumentChangeBoMutation,
	ListPlatformShelterClaimRequestsBoQuery,
} from "@/graphql/__generated__/claims.generated";
import { DataTable, ColumnDef, Ordering } from "@/components/DataTable";
import { CellStrong, Badge } from "@/components/cells";
import { Button } from "@/components/ui/Button";
import { $color, $uw } from "@/theme";

const STATUS_LABEL: Record<string, string> = {
	PENDING: "In attesa",
	APPROVED: "Approvato",
	REJECTED: "Rifiutato",
	CANCELLED: "Annullato",
};

type ClaimRow = NonNullable<
	ListPlatformShelterClaimRequestsBoQuery["listPlatformShelterClaimRequests"]["items"][number]
>;

type ClaimDocument = {
	id: string;
	media_id: string;
	url?: string | null;
	description: string;
	status?: string;
	reviewer_note?: string | null;
};

const claimDocuments = (c: ClaimRow): ClaimDocument[] =>
	((c.proof_data as { documents?: ClaimDocument[] } | null)?.documents ?? []);

const isImageUrl = (url?: string | null) =>
	!!url && /\.(png|jpe?g|gif|webp|avif)($|\?)/i.test(url);

const DOC_STATUS_LABEL: Record<string, string> = {
	SUBMITTED: "Inviato",
	CHANGE_REQUESTED: "Modifica richiesta",
};

/**
 * Coda di verifica dei rifugi (platform.claims.review): approvare un claim
 * trasforma il PERSONAL_WORKSPACE (o l'OFFICIAL_SHELTER non verificato) in
 * rifugio ufficiale VERIFIED e assegna al richiedente ruolo SHELTER_ADMIN e
 * ownership tecnica. Il gate autorizzativo reale è nel backend.
 */
export default function ClaimsPage() {
	const router = useRouter();
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [ordering, setOrdering] = useState<Ordering>({});
	const [onlyPending, setOnlyPending] = useState(true);
	const [selectedId, setSelectedId] = useState<string | null>(null);

	const { data, loading, refetch } =
		useListPlatformShelterClaimRequestsBoQuery({
			variables: {
				search: {
					page: page - 1,
					page_size: pageSize,
					order_by: ordering.order_by ?? "created_at",
					order_direction: ordering.order_direction ?? "desc",
					filters: onlyPending
						? { fixed: [{ key: "status", value: "PENDING" }] }
						: null,
				},
			},
			fetchPolicy: "cache-and-network",
			onError: () =>
				toast.error("Errore nel caricamento delle richieste di verifica"),
		});

	const onDone = (success: boolean, message?: string | null) => {
		if (!success) {
			toast.error(message ?? "Operazione non riuscita");
			return;
		}
		toast.success("Richiesta aggiornata");
		refetch();
	};

	const [approve, { loading: approving }] = useApproveShelterClaimBoMutation({
		onCompleted: ({ approveShelterClaim }) =>
			onDone(
				approveShelterClaim.success,
				approveShelterClaim.error?.message
			),
		onError: () => toast.error("Errore nell'approvazione"),
	});
	const [reject, { loading: rejecting }] = useRejectShelterClaimBoMutation({
		onCompleted: ({ rejectShelterClaim }) =>
			onDone(rejectShelterClaim.success, rejectShelterClaim.error?.message),
		onError: () => toast.error("Errore nel rifiuto"),
	});
	const [requestDocumentChange, { loading: flaggingDocument }] =
		useRequestShelterClaimDocumentChangeBoMutation({
			onCompleted: ({ requestShelterClaimDocumentChange }) =>
				onDone(
					requestShelterClaimDocumentChange.success,
					requestShelterClaimDocumentChange.error?.message
				),
			onError: () => toast.error("Errore nella richiesta di modifica"),
		});

	const rows = (
		data?.listPlatformShelterClaimRequests?.items ?? []
	).filter((c): c is ClaimRow => !!c);
	const selected = rows.find((c) => c.id === selectedId) ?? null;

	const columns: ColumnDef<ClaimRow>[] = [
		{
			id: "shelter",
			header: "Rifugio",
			render: (c) => (
				<CellStrong>
					{c.shelter.name}
					{c.shelter.city ? ` — ${c.shelter.city}` : ""}
				</CellStrong>
			),
		},
		{
			id: "type",
			header: "Tipo attuale",
			render: (c) => (
				<Badge>
					{c.shelter.type === "PERSONAL_WORKSPACE"
						? "Workspace"
						: "Rifugio"}
				</Badge>
			),
		},
		{
			id: "requester",
			header: "Richiedente",
			render: (c) =>
				`${c.requester.first_name} ${c.requester.last_name}`.trim() ||
				c.requester.email,
		},
		{
			id: "message",
			header: "Messaggio",
			render: (c) => c.message ?? "—",
		},
		{
			id: "status",
			header: "Stato",
			render: (c) => <Badge>{STATUS_LABEL[c.status] ?? c.status}</Badge>,
		},
		{
			id: "created",
			header: "Richiesta il",
			sortKey: "created_at",
			render: (c) => dayjs(c.created_at).format("DD/MM/YYYY HH:mm"),
		},
		{
			id: "actions",
			header: "",
			render: (c) =>
				c.status === "PENDING" ? (
					<Actions onClick={(e) => e.stopPropagation()}>
						<Button
							loading={approving}
							onClick={() => {
								if (
									confirm(
										`Approvare la verifica di "${c.shelter.name}"? Diventerà un rifugio ufficiale verificato e ${c.requester.first_name} ${c.requester.last_name} ne sarà amministratore e owner.`
									)
								) {
									const note = prompt("Nota (opzionale)") ?? undefined;
									approve({
										variables: { id: c.id, decision_note: note },
									});
								}
							}}
						>
							Approva
						</Button>
						<Button
							variant="danger"
							loading={rejecting}
							onClick={() => {
								const note = prompt(
									`Motivo del rifiuto per "${c.shelter.name}" (opzionale)`
								);
								if (note !== null) {
									reject({
										variables: {
											id: c.id,
											decision_note: note || undefined,
										},
									});
								}
							}}
						>
							Rifiuta
						</Button>
					</Actions>
				) : (
					<span>{c.decision_note ?? ""}</span>
				),
		},
	];

	return (
		<Wrap>
			{selected && (
				<Detail>
					<DetailHead>
						<div>
							<h3>{selected.shelter.name}</h3>
							<p>
								Richiesta di{" "}
								{`${selected.requester.first_name} ${selected.requester.last_name}`.trim() ||
									selected.requester.email}{" "}
								· {dayjs(selected.created_at).format("DD/MM/YYYY HH:mm")}
							</p>
							{selected.message && <Quote>{selected.message}</Quote>}
						</div>
						<DetailHeadActions>
							<Button
								variant="ghost"
								onClick={() =>
									router.push(`/platform/shelters/${selected.shelter.id}`)
								}
							>
								Apri rifugio
							</Button>
							<Button variant="ghost" onClick={() => setSelectedId(null)}>
								Chiudi
							</Button>
						</DetailHeadActions>
					</DetailHead>

					<DocList>
						{claimDocuments(selected).length === 0 && (
							<p>Nessun documento allegato.</p>
						)}
						{claimDocuments(selected).map((doc) => (
							<DocRow key={doc.id} $flagged={doc.status === "CHANGE_REQUESTED"}>
								{isImageUrl(doc.url) ? (
									<a href={doc.url ?? undefined} target="_blank" rel="noreferrer">
										<img src={doc.url ?? undefined} alt={doc.description} />
									</a>
								) : (
									<a href={doc.url ?? undefined} target="_blank" rel="noreferrer">
										Apri documento
									</a>
								)}
								<DocInfo>
									<strong>{doc.description}</strong>
									<span>
										{DOC_STATUS_LABEL[doc.status ?? "SUBMITTED"] ??
											doc.status}
										{doc.reviewer_note ? ` — ${doc.reviewer_note}` : ""}
									</span>
								</DocInfo>
								{selected.status === "PENDING" &&
									doc.status !== "CHANGE_REQUESTED" && (
										<Button
											variant="danger"
											loading={flaggingDocument}
											onClick={() => {
												const note = prompt(
													"Perché questo documento non va bene? (inviato al richiedente)"
												);
												if (note !== null) {
													requestDocumentChange({
														variables: {
															id: selected.id,
															document_id: doc.id,
															note: note || undefined,
														},
													});
												}
											}}
										>
											Richiedi modifica
										</Button>
									)}
							</DocRow>
						))}
					</DocList>
				</Detail>
			)}
			<FilterBar>
				<label>
					<input
						type="checkbox"
						checked={onlyPending}
						onChange={(e) => {
							setPage(1);
							setOnlyPending(e.target.checked);
						}}
					/>
					Solo in attesa
				</label>
			</FilterBar>
			<DataTable
				columns={columns}
				rows={rows}
				rowKey={(c) => c.id}
				loading={loading}
				pagination={data?.listPlatformShelterClaimRequests?.pagination}
				page={page}
				pageSize={pageSize}
				ordering={ordering}
				onPageChange={setPage}
				onPageSizeChange={setPageSize}
				onOrderingChange={setOrdering}
				onRowClick={(c) =>
					setSelectedId((cur) => (cur === c.id ? null : c.id))
				}
			/>
		</Wrap>
	);
}

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(2)};
`;

const Detail = styled.section`
	display: flex;
	flex-direction: column;
	gap: ${$uw(1)};
	border: 1px solid ${$color("border")};
	border-radius: ${$uw(0.5)};
	background: ${$color("surface")};
	padding: ${$uw(1.25)};
`;

const DetailHead = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: ${$uw(1)};
	> div > h3 {
		margin: 0;
		font-size: 1.6rem;
		color: ${$color("text")};
	}
	> div > p {
		margin: ${$uw(0.25)} 0 0;
		font-size: 1.2rem;
		color: ${$color("muted")};
	}
`;

const DetailHeadActions = styled.div`
	display: flex;
	gap: ${$uw(0.5)};
	flex-shrink: 0;
`;

const Quote = styled.blockquote`
	margin: ${$uw(0.75)} 0 0;
	padding: ${$uw(0.5)} ${$uw(0.75)};
	border: 1px solid ${$color("border")};
	border-radius: ${$uw(0.4)};
	font-size: 1.3rem;
	color: ${$color("text")};
`;

const DocList = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(0.75)};
	> p {
		margin: 0;
		font-size: 1.3rem;
		color: ${$color("muted")};
	}
`;

const DocRow = styled.div<{ $flagged: boolean }>`
	display: flex;
	align-items: center;
	gap: ${$uw(1)};
	padding: ${$uw(0.75)};
	border-radius: ${$uw(0.4)};
	border: 1px solid
		${({ $flagged }) => ($flagged ? $color("danger") : $color("border"))};
	> a > img {
		display: block;
		max-height: ${$uw(6)};
		max-width: ${$uw(9)};
		border-radius: ${$uw(0.3)};
		object-fit: cover;
	}
	> a {
		color: ${$color("primary")};
		font-size: 1.3rem;
	}
`;

const DocInfo = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	> strong {
		font-size: 1.35rem;
		color: ${$color("text")};
	}
	> span {
		font-size: 1.2rem;
		color: ${$color("muted")};
	}
`;

const Actions = styled.div`
	display: flex;
	gap: ${$uw(1)};
`;

const FilterBar = styled.div`
	display: flex;
	justify-content: flex-end;

	label {
		display: inline-flex;
		align-items: center;
		gap: ${$uw(1)};
		font-size: 0.9rem;
		cursor: pointer;
	}
`;
