"use client";

import { useState } from "react";
import dayjs from "dayjs";
import styled from "styled-components";

import { useShelterAuthorization } from "@/lib/useShelterAuthorization";
import { formatCents } from "@/lib/donations/formatCents";
import { EmptyState } from "@/components/ui/EmptyState";
import { DataTable, ColumnDef, Ordering } from "@/components/DataTable";
import { ShelterPermissions } from "@/lib/permissions";
import { $color, $uw } from "@/theme";

import { useListShelterDonationsQuery } from "@/graphql/__generated__/listShelterDonations.generated";
import { useListShelterPetsBoQuery } from "@/graphql/__generated__/queries.generated";

type TransactionRow = {
	id: string;
	date: string;
	target_type: string;
	pet: string | null;
	donor_type: string;
	donor: string | null;
	gross_amount: string;
	platform_fee: string;
	processing_fee: string;
	shelter_net: string;
	status: string;
	refund_status: string;
	dispute_status: string;
	is_test: boolean;
};

const TARGET_LABEL: Record<string, string> = {
	SHELTER: "Rifugio",
	PET: "Animale",
	PET_FUNDING_NEED: "Fabbisogno",
};

const DONOR_TYPE_LABEL: Record<string, string> = {
	GUEST: "Ospite",
	AUTHENTICATED: "Registrato",
};

const STATUS_LABEL: Record<string, string> = {
	PENDING: "In attesa",
	PROCESSING: "In elaborazione",
	SUCCEEDED: "Completata",
	FAILED: "Fallita",
	CANCELED: "Annullata",
};

const REFUND_LABEL: Record<string, string> = {
	NONE: "—",
	PARTIAL: "Parziale",
	FULL: "Totale",
};

const DISPUTE_LABEL: Record<string, string> = {
	NONE: "—",
	OPEN: "Aperta",
	WON: "Vinta",
	LOST: "Persa",
};

/**
 * Storico donazioni di un rifugio (generali + collegate a un pet, distinte
 * dalla colonna "Destinazione"/"Animale"). Self-contained: basta shelterId,
 * il permesso viene verificato internamente (shelters.donations.read) così
 * il componente è riusabile sia nel modulo /donations sia come tab dentro
 * il dettaglio rifugio.
 */
export const ShelterDonationsTable: React.FC<{ shelterId: string }> = ({
	shelterId,
}) => {
	const shelterAuth = useShelterAuthorization(shelterId);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [ordering, setOrdering] = useState<Ordering>({});

	const { data, loading } = useListShelterDonationsQuery({
		fetchPolicy: "cache-and-network",
		variables: {
			shelter_id: shelterId,
			commonSearch: {
				page: page - 1,
				page_size: pageSize,
				order_by: ordering.order_by,
				order_direction: ordering.order_direction,
			},
		},
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
	const petNameById = new Map(
		(petsData?.listShelterPets?.items ?? [])
			.filter((sp): sp is NonNullable<typeof sp> => !!sp)
			.map((sp) => [sp.pet.id, sp.pet.name])
	);

	if (shelterAuth.loading) return null;

	if (!shelterAuth.can(ShelterPermissions.DONATIONS_READ)) {
		return (
			<EmptyState
				title="Accesso negato"
				description={`Non hai il permesso "${ShelterPermissions.DONATIONS_READ}" su questo rifugio.`}
			/>
		);
	}

	const canSeeDonorDetails = shelterAuth.can(
		ShelterPermissions.DONATIONS_READ_DETAILS
	);

	const donation = data?.listShelterDonations;
	const rows: TransactionRow[] = (donation?.items ?? [])
		.filter((d): d is NonNullable<typeof d> => !!d)
		.map((d) => ({
			id: d.id,
			date: dayjs(d.created_at).format("DD/MM/YYYY HH:mm"),
			target_type: TARGET_LABEL[d.target_type] ?? d.target_type,
			pet: d.pet_id ? (petNameById.get(d.pet_id) ?? d.pet_id) : null,
			donor_type: DONOR_TYPE_LABEL[d.donor_type] ?? d.donor_type,
			donor: canSeeDonorDetails ? (d.donor_email ?? null) : null,
			gross_amount: formatCents(d.gross_amount_cents, d.currency),
			platform_fee: formatCents(d.platform_fee_amount_cents, d.currency),
			processing_fee: d.processing_fee_amount_cents
				? formatCents(d.processing_fee_amount_cents, d.currency)
				: "—",
			shelter_net: d.shelter_net_amount_cents
				? formatCents(d.shelter_net_amount_cents, d.currency)
				: "—",
			status: STATUS_LABEL[d.status] ?? d.status,
			refund_status: REFUND_LABEL[d.refund_status] ?? d.refund_status,
			dispute_status: DISPUTE_LABEL[d.dispute_status] ?? d.dispute_status,
			is_test: d.is_test,
		}));

	const columns: ColumnDef<TransactionRow>[] = [
		{ id: "date", header: "Data", sortKey: "created_at", render: (r) => r.date },
		{ id: "target_type", header: "Destinazione", render: (r) => r.target_type },
		{ id: "pet", header: "Animale", render: (r) => r.pet ?? "—" },
		{ id: "donor_type", header: "Tipo donatore", render: (r) => r.donor_type },
		...(canSeeDonorDetails
			? [
					{
						id: "donor",
						header: "Donatore",
						render: (r: TransactionRow) => r.donor ?? "Anonimo",
					} as ColumnDef<TransactionRow>,
				]
			: []),
		{
			id: "gross_amount",
			header: "Lordo",
			sortKey: "gross_amount_cents",
			render: (r) => r.gross_amount,
		},
		{ id: "platform_fee", header: "Comm. piattaforma", render: (r) => r.platform_fee },
		{ id: "processing_fee", header: "Comm. processing", render: (r) => r.processing_fee },
		{ id: "shelter_net", header: "Netto rifugio", render: (r) => r.shelter_net },
		{ id: "status", header: "Stato", render: (r) => r.status },
		{ id: "refund_status", header: "Stato rimborso", render: (r) => r.refund_status },
		{ id: "dispute_status", header: "Stato disputa", render: (r) => r.dispute_status },
		{ id: "is_test", header: "Test", render: (r) => (r.is_test ? "TEST" : "") },
	];

	return (
		<Wrap>
			{!loading && donation && !donation.success && (
				<Note>
					{donation.error?.message ?? "Errore nel caricamento delle donazioni."}
				</Note>
			)}
			<DataTable
				columns={columns}
				rows={rows}
				rowKey={(r) => r.id}
				loading={loading}
				pagination={donation?.pagination ?? null}
				page={page}
				pageSize={pageSize}
				ordering={ordering}
				onPageChange={setPage}
				onPageSizeChange={setPageSize}
				onOrderingChange={setOrdering}
			/>
		</Wrap>
	);
};

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(1)};
`;

const Note = styled.p`
	margin: 0;
	font-size: 1.3rem;
	color: ${$color("dim")};
`;
