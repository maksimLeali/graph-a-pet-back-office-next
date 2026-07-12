"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import toast from "react-hot-toast";

import {
	useListSheltersQuery,
	ListSheltersQuery,
} from "@/graphql/__generated__/queries.generated";
import {
	DataTable,
	ColumnDef,
	Ordering,
} from "@/components/DataTable";
import { CellStrong, Badge } from "@/components/cells";

const TYPE_LABEL: Record<string, string> = {
	OFFICIAL_SHELTER: "Rifugio",
	PERSONAL_WORKSPACE: "Workspace",
};

const VERIFICATION_LABEL: Record<string, string> = {
	UNVERIFIED: "Non verificato",
	PENDING_CLAIM: "In verifica",
	VERIFIED: "Verificato",
	REJECTED: "Rifiutato",
};

type ShelterRow = NonNullable<
	ListSheltersQuery["listShelters"]["items"][number]
>;

export default function SheltersPage() {
	const router = useRouter();
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [text, setText] = useState("");
	const [ordering, setOrdering] = useState<Ordering>({});

	const { data, loading } = useListSheltersQuery({
		variables: {
			search: {
				page: page - 1,
				page_size: pageSize,
				order_by: ordering.order_by,
				order_direction: ordering.order_direction,
					filters:
						text.length > 0
							? { search: { value: text, fields: ["name", "city"] } }
							: null,
			},
		},
		onError: () => toast.error("Errore nel caricamento dei rifugi"),
	});

	const rows = (data?.listShelters?.items ?? []).filter(
		(s): s is ShelterRow => !!s
	);

	const columns: ColumnDef<ShelterRow>[] = [
		{
			id: "name",
			header: "Nome",
			sortKey: "name",
			render: (s) => <CellStrong>{s.name}</CellStrong>,
		},
		{
			id: "city",
			header: "Città",
			sortKey: "city",
			render: (s) => `${s.city} (${s.province_code})`,
		},
		{
			id: "type",
			header: "Tipo",
			render: (s) => <Badge>{TYPE_LABEL[s.type] ?? s.type}</Badge>,
		},
		{
			id: "verification",
			header: "Verifica",
			render: (s) => (
				<Badge>
					{VERIFICATION_LABEL[s.verification_status] ??
						s.verification_status}
				</Badge>
			),
		},
		{
			id: "created",
			header: "Creato",
			sortKey: "created_at",
			render: (s) => dayjs(s.created_at).format("DD/MM/YYYY"),
		},
	];

	return (
		<DataTable
			columns={columns}
			rows={rows}
			rowKey={(s) => s.id}
			loading={loading}
			pagination={data?.listShelters?.pagination}
			page={page}
			pageSize={pageSize}
			ordering={ordering}
			searchPlaceholder="Cerca rifugio…"
			onPageChange={setPage}
			onPageSizeChange={setPageSize}
			onOrderingChange={setOrdering}
			onSearch={setText}
			onRowClick={(s) => router.push(`/shelters/${s.id}`)}
		/>
	);
}
