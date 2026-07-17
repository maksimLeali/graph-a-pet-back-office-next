"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useListShelterRolesBoQuery } from "@/graphql/__generated__/queries.generated";
import {
	useCreateShelterRoleBoMutation,
	useUpdateShelterRoleBoMutation,
	useDeleteShelterRoleBoMutation,
} from "@/graphql/__generated__/mutations.generated";
import { RoleLevel } from "@/types";
import { useBackofficeAuth } from "@/contexts/BackofficeAuthContext";
import { PlatformPermissions, ShelterPermissions } from "@/lib/permissions";
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

const ROLE_OPTIONS = [
	{ value: "OWNER", label: "Owner" },
	{ value: "MANAGER", label: "Manager" },
	{ value: "STAFF", label: "Staff" },
	{ value: "VOLUNTEER", label: "Volontario" },
];

type RoleForm = {
	user_id: string;
	role: string;
};

export const MembersTab: React.FC<{ shelterId: string }> = ({ shelterId }) => {
	const form = useForm<RoleForm>({ defaultValues: { role: "VOLUNTEER" } });

	// permission-based, mai role-name: nell'area rifugio decide il contesto
	// dello shelter corrente; nel dettaglio platform decide la permission
	// platform (il backend resta comunque l'autorità).
	const { currentShelter, canShelter, canPlatform } = useBackofficeAuth();
	const inShelterArea = currentShelter?.shelter.id === shelterId;
	const may = (permission: string) =>
		inShelterArea
			? canShelter(permission)
			: canPlatform(PlatformPermissions.SHELTERS_READ);
	const canAssignRoles = may(ShelterPermissions.ROLES_ASSIGN);
	const canManageRoles = may(ShelterPermissions.ROLES_MANAGE);
	// il delete legacy resta platform-admin-only sul backend
	const canDeleteRoles = canPlatform(PlatformPermissions.ROLES_MANAGE);
	const shelterName = inShelterArea
		? currentShelter!.shelter.name
		: "questo rifugio";

	const { data, loading, refetch } = useListShelterRolesBoQuery({
		variables: {
			search: {
				page: 0,
				page_size: 100,
				order_by: "created_at",
				filters: { fixed: [{ key: "shelter_id", value: shelterId }] },
			},
		},
		onError: () => toast.error("Errore nel caricamento dei membri"),
	});

	const [createRole, { loading: creating }] = useCreateShelterRoleBoMutation({
		onCompleted: ({ createShelterRole }) => {
			if (!createShelterRole.success) {
				toast.error(
					createShelterRole.error?.message ??
						"Errore nell'aggiunta del membro"
				);
				return;
			}
			toast.success("Membro aggiunto");
			form.reset({ role: "VOLUNTEER" } as RoleForm);
			refetch();
		},
		onError: () => toast.error("Errore nell'aggiunta del membro"),
	});

	const [updateRole] = useUpdateShelterRoleBoMutation({
		onCompleted: ({ updateShelterRole }) => {
			if (!updateShelterRole.success) {
				toast.error(
					updateShelterRole.error?.message ??
						"Errore nell'aggiornamento del ruolo"
				);
				return;
			}
			toast.success("Ruolo aggiornato");
			refetch();
		},
		onError: () => toast.error("Errore nell'aggiornamento del ruolo"),
	});

	const [deleteRole] = useDeleteShelterRoleBoMutation({
		onCompleted: ({ deleteShelterRole }) => {
			if (!deleteShelterRole.success) {
				toast.error(
					deleteShelterRole.error?.message ?? "Errore nella rimozione"
				);
				return;
			}
			toast.success("Membro rimosso");
			refetch();
		},
		onError: () => toast.error("Errore nella rimozione"),
	});

	if (loading) return <Spinner />;
	const items = data?.listShelterRoles?.items ?? [];

	return (
		<TabWrap>
			{canAssignRoles && (
			<AddSection label="Aggiungi membro">
				<form
					onSubmit={form.handleSubmit((v) =>
						createRole({
							variables: {
								data: {
									shelter_id: shelterId,
									user_id: v.user_id,
									role: v.role as RoleLevel,
								},
							},
						})
					)}
				>
					<FormGrid>
						<Input
							label="ID utente"
							placeholder="ID dell'utente da aggiungere"
							{...form.register("user_id", { required: true })}
						/>
						<Select
							label="Ruolo"
							options={ROLE_OPTIONS}
							{...form.register("role")}
						/>
					</FormGrid>
					<FormFoot>
						<Button type="submit" loading={creating}>
							Aggiungi
						</Button>
					</FormFoot>
				</form>
			</AddSection>
			)}

			<List>
				{items.length === 0 && <EmptyText>Nessun membro</EmptyText>}
				{items.map(
					(r) =>
						r && (
							<RowCard key={r.id}>
								<div>
									<RowTitle>
										{r.user.first_name} {r.user.last_name}
									</RowTitle>
									<RowSub>{r.user.email}</RowSub>
								</div>
								<RowActions>
									<Badge>{r.role}</Badge>
									{canManageRoles && (
										<Select
											aria-label="Cambia ruolo"
											options={ROLE_OPTIONS}
											value={r.role}
											onChange={(e) =>
												updateRole({
													variables: {
														id: r.id,
														data: { role: e.target.value as RoleLevel },
													},
												})
											}
										/>
									)}
									{canDeleteRoles && (
										<RowButton
											variant="danger"
											onClick={() => {
												if (
													confirm(
														`Rimuovere questo membro da ${shelterName}?`
													)
												) {
													deleteRole({ variables: { id: r.id } });
												}
											}}
										>
											Rimuovi
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
