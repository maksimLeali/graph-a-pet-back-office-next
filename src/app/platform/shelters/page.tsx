"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import {
	useListSheltersQuery,
	ListSheltersQuery,
} from "@/graphql/__generated__/queries.generated";
import { useCreateShelterBoMutation } from "@/graphql/__generated__/createShelter.generated";
import {
	DataTable,
	ColumnDef,
	Ordering,
} from "@/components/DataTable";
import { CellStrong, Badge } from "@/components/cells";
import { AddSection, FormGrid, FormFoot, TabWrap } from "@/components/shelters/common";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useBackofficeAuth } from "@/contexts/BackofficeAuthContext";
import { PlatformPermissions } from "@/lib/permissions";

type ShelterForm = {
	name: string;
	street: string;
	street_number: string;
	city: string;
	province_code: string;
	postal_code: string;
	region: string;
};

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
	const { canPlatform } = useBackofficeAuth();
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [text, setText] = useState("");
	const [ordering, setOrdering] = useState<Ordering>({});

	// creazione: gate su permission esplicita, mai su nomi ruolo
	const canCreate = canPlatform(PlatformPermissions.SHELTERS_MANAGE);
	const form = useForm<ShelterForm>();

	const { data, loading, refetch } = useListSheltersQuery({
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

	const [createShelter, { loading: creating }] = useCreateShelterBoMutation({
		onCompleted: ({ createShelter }) => {
			if (!createShelter.success) {
				toast.error(
					createShelter.error?.message ??
						"Errore nella creazione del rifugio"
				);
				return;
			}
			toast.success("Rifugio creato");
			form.reset();
			refetch();
			const id = createShelter.shelter?.id;
			if (id) router.push(`/platform/shelters/${id}`);
		},
		onError: () => toast.error("Errore nella creazione del rifugio"),
	});

	return (
		<TabWrap>
			{canCreate && (
				<AddSection label="Nuovo rifugio">
					<form
						onSubmit={form.handleSubmit((v) =>
							createShelter({
								variables: {
									data: {
										name: v.name,
										street: v.street,
										street_number: v.street_number,
										city: v.city,
										province_code: v.province_code,
										postal_code: v.postal_code,
										region: v.region || null,
									},
								},
							})
						)}
					>
						<FormGrid>
							<Input
								label="Nome"
								{...form.register("name", { required: true })}
							/>
							<Input
								label="Via"
								{...form.register("street", { required: true })}
							/>
							<Input
								label="Civico"
								{...form.register("street_number", {
									required: true,
								})}
							/>
							<Input
								label="Città"
								{...form.register("city", { required: true })}
							/>
							<Input
								label="Provincia"
								{...form.register("province_code", {
									required: true,
								})}
							/>
							<Input
								label="CAP"
								{...form.register("postal_code", {
									required: true,
								})}
							/>
							<Input label="Regione" {...form.register("region")} />
						</FormGrid>
						<FormFoot>
							<Button type="submit" loading={creating}>
								Crea
							</Button>
						</FormFoot>
					</form>
				</AddSection>
			)}

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
				onRowClick={(s) => router.push(`/platform/shelters/${s.id}`)}
			/>
		</TabWrap>
	);
}
