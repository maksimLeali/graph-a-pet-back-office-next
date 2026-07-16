"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import { useGetPaginatedUsersQuery } from "@/graphql/__generated__/getPaginatedUsers.generated";
import { useCreateUserBoMutation } from "@/graphql/__generated__/createUser.generated";
import { ListUserFragment } from "@/graphql/__generated__/list-user.generated";
import {
	DataTable,
	ColumnDef,
	Ordering,
} from "@/components/DataTable";
import { CellStrong, Badge } from "@/components/cells";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
	AddSection,
	FormGrid,
	FormFoot,
	TabWrap,
} from "@/components/shelters/common";

type UserForm = {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
};

export default function UsersPage() {
	const router = useRouter();
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [text, setText] = useState("");
	const [ordering, setOrdering] = useState<Ordering>({});

	const form = useForm<UserForm>();

	const { data, loading, refetch } = useGetPaginatedUsersQuery({
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
										fields: ["first_name", "last_name", "email"],
									},
								}
							: null,
			},
		},
		onError: () => toast.error("Errore nel caricamento degli utenti"),
	});

	const [createUser, { loading: creating }] = useCreateUserBoMutation({
		onCompleted: ({ createUser }) => {
			if (!createUser.success) {
				toast.error(
					createUser.error?.message ?? "Errore nella creazione dell'utente"
				);
				return;
			}
			toast.success("Utente creato");
			form.reset();
			refetch();
		},
		onError: () => toast.error("Errore nella creazione dell'utente"),
	});

	const rows = (data?.listUsers?.items ?? []).filter(
		(u): u is ListUserFragment => !!u
	);

	const columns: ColumnDef<ListUserFragment>[] = [
		{
			id: "name",
			header: "Nome",
			sortKey: "first_name",
			render: (u) => (
				<CellStrong>
					{u.first_name} {u.last_name}
				</CellStrong>
			),
		},
		{
			id: "email",
			header: "Email",
			sortKey: "email",
			render: (u) => u.email,
		},
		{
			id: "role",
			header: "Ruolo",
			render: (u) => <Badge>{u.role}</Badge>,
		},
		{
			id: "verified",
			header: "Verificato",
			render: (u) => <Badge>{u.verified ? "Verificato" : "Da verificare"}</Badge>,
		},
		{
			id: "pets_owned",
			header: "Animali",
			render: (u) => u.pets_owned ?? 0,
		},
		{
			id: "pets_on_loan",
			header: "In custodia",
			render: (u) => u.pets_on_loan ?? 0,
		},
		{
			id: "created",
			header: "Registrato",
			sortKey: "created_at",
			render: (u) =>
				u.created_at ? dayjs(u.created_at).format("DD/MM/YYYY") : "—",
		},
	];

	return (
		<TabWrap>
			<AddSection label="Nuovo utente">
				<form
					onSubmit={form.handleSubmit((v) =>
						createUser({
							variables: {
								data: {
									first_name: v.first_name,
									last_name: v.last_name,
									email: v.email,
									password: v.password,
								},
							},
						})
					)}
				>
					<FormGrid>
						<Input
							label="Nome"
							{...form.register("first_name", { required: true })}
						/>
						<Input
							label="Cognome"
							{...form.register("last_name", { required: true })}
						/>
						<Input
							label="Email"
							type="email"
							{...form.register("email", { required: true })}
						/>
						<Input
							label="Password"
							type="password"
							{...form.register("password", { required: true })}
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
				rowKey={(u) => u.id}
				loading={loading}
				pagination={data?.listUsers?.pagination}
				page={page}
				pageSize={pageSize}
				ordering={ordering}
				searchPlaceholder="Cerca utente…"
				onPageChange={setPage}
				onPageSizeChange={setPageSize}
				onOrderingChange={setOrdering}
				onSearch={setText}
				onRowClick={(u) => router.push(`/users/${u.id}`)}
			/>
		</TabWrap>
	);
}
