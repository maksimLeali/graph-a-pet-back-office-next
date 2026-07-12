"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useListShelterPeopleQuery } from "@/graphql/__generated__/queries.generated";
import {
	useCreateShelterPersonBoMutation,
	useArchiveShelterPersonBoMutation,
	useCreateShelterInviteBoMutation,
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

const STATUS_OPTIONS = [
	{ value: "VISITOR", label: "Visitatore" },
	{ value: "VOLUNTEER", label: "Volontario" },
];

const ROLE_OPTIONS = [
	{ value: "MANAGER", label: "Manager" },
	{ value: "STAFF", label: "Staff" },
	{ value: "VOLUNTEER", label: "Volontario" },
];

const STATUS_LABEL: Record<string, string> = {
	VISITOR: "Visitatore",
	VOLUNTEER: "Volontario",
	PENDING_INVITE: "Invito in sospeso",
	ACTIVE_USER: "Utente attivo",
	ARCHIVED: "Archiviato",
};

type PersonForm = {
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	status: string;
	notes: string;
};

type InviteForm = {
	user_id: string;
	role: string;
};

export const PeopleTab: React.FC<{ shelterId: string }> = ({ shelterId }) => {
	const personForm = useForm<PersonForm>({
		defaultValues: { status: "VOLUNTEER" },
	});
	const inviteForm = useForm<InviteForm>({
		defaultValues: { role: "VOLUNTEER" },
	});

	const { data, loading, refetch } = useListShelterPeopleQuery({
		variables: {
			shelter_id: shelterId,
			search: {
				page: 0,
				page_size: 100,
				order_by: "created_at",
				filters: null,
			},
		},
		onError: () => toast.error("Errore nel caricamento dei membri"),
	});

	const [createPerson, { loading: creating }] =
		useCreateShelterPersonBoMutation({
			onCompleted: ({ createShelterPerson }) => {
				if (!createShelterPerson.success) {
					toast.error("Errore nella creazione della persona");
					return;
				}
				toast.success("Persona aggiunta");
				personForm.reset({ status: "VOLUNTEER" } as PersonForm);
				refetch();
			},
			onError: () => toast.error("Errore nella creazione della persona"),
		});

	const [archivePerson] = useArchiveShelterPersonBoMutation({
		onCompleted: () => refetch(),
		onError: () => toast.error("Errore nell'archiviazione"),
	});

	const [inviteUser, { loading: inviting }] = useCreateShelterInviteBoMutation(
		{
			onCompleted: ({ createShelterInvite }) => {
				if (!createShelterInvite.success) {
					toast.error("Errore nell'invito");
					return;
				}
				toast.success("Invito inviato");
				inviteForm.reset({ role: "VOLUNTEER" } as InviteForm);
				refetch();
			},
			onError: () => toast.error("Errore nell'invito"),
		}
	);

	if (loading) return <Spinner />;
	const items = data?.listShelterPeople?.items ?? [];

	return (
		<TabWrap>
			<AddSection label="Aggiungi persona">
				<form
					onSubmit={personForm.handleSubmit((v) =>
						createPerson({
							variables: {
								data: {
									shelter_id: shelterId,
									first_name: v.first_name || undefined,
									last_name: v.last_name || undefined,
									email: v.email || undefined,
									phone: v.phone || undefined,
									status: (v.status || undefined) as never,
									source: "MANUAL" as never,
									notes: v.notes || undefined,
								},
							},
						})
					)}
				>
					<FormGrid>
						<Input
							label="Nome"
							{...personForm.register("first_name", { required: true })}
						/>
						<Input label="Cognome" {...personForm.register("last_name")} />
						<Input label="Email" type="email" {...personForm.register("email")} />
						<Input label="Telefono" {...personForm.register("phone")} />
						<Select
							label="Stato"
							options={STATUS_OPTIONS}
							{...personForm.register("status")}
						/>
						<Input label="Note" {...personForm.register("notes")} />
					</FormGrid>
					<FormFoot>
						<Button type="submit" loading={creating}>
							Aggiungi
						</Button>
					</FormFoot>
				</form>
			</AddSection>

			<AddSection label="Invita utente esistente">
				<form
					onSubmit={inviteForm.handleSubmit((v) =>
						inviteUser({
							variables: {
								data: {
									shelter_id: shelterId,
									user_id: v.user_id,
									role: v.role as never,
								},
							},
						})
					)}
				>
					<FormGrid>
						<Input
							label="ID utente"
							placeholder="ID dell'utente da invitare"
							{...inviteForm.register("user_id", { required: true })}
						/>
						<Select
							label="Ruolo"
							options={ROLE_OPTIONS}
							{...inviteForm.register("role")}
						/>
					</FormGrid>
					<FormFoot>
						<Button type="submit" loading={inviting}>
							Invita
						</Button>
					</FormFoot>
				</form>
			</AddSection>

			<List>
				{items.length === 0 && <EmptyText>Nessun membro</EmptyText>}
				{items.map(
					(p) =>
						p && (
							<RowCard key={p.id}>
								<div>
									<RowTitle>
										{p.user
											? `${p.user.first_name} ${p.user.last_name}`
											: `${p.first_name ?? ""} ${p.last_name ?? ""}`.trim() ||
												"—"}
									</RowTitle>
									<RowSub>
										{p.user?.email ?? p.email ?? "—"}
										{p.phone && ` — ${p.phone}`}
										{p.notes && ` — ${p.notes}`}
									</RowSub>
								</div>
								<RowActions>
									<Badge>{STATUS_LABEL[p.status] ?? p.status}</Badge>
									{p.status !== "ARCHIVED" && (
										<RowButton
											variant="danger"
											onClick={() => {
												if (confirm("Archiviare questa persona?")) {
													archivePerson({ variables: { id: p.id } });
												}
											}}
										>
											Archivia
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
