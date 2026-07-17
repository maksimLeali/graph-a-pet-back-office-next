"use client";

import { use, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import styled from "styled-components";
import toast from "react-hot-toast";

import { useGetUserQuery } from "@/graphql/__generated__/getUser.generated";
import { useUpdateUserBoMutation } from "@/graphql/__generated__/updateUser.generated";
import { useGetUserOwnershipQuery } from "@/graphql/__generated__/getUserOwnership.generated";
import { useGetUserTreatmentsQuery } from "@/graphql/__generated__/getUserTreatments.generated";
import {
	useGetUserRbacRolesQuery,
	useListRbacRolesQuery,
	useAssignRbacRoleToUserMutation,
	useRevokeRbacRoleAssignmentMutation,
} from "@/graphql/__generated__/rbac.generated";
import { useListSheltersQuery } from "@/graphql/__generated__/queries.generated";
import { Tabs } from "@/components/ui/Tabs";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Spinner } from "@/components/ui/Spinner";
import { Badge } from "@/components/cells";
import { $color, $uw } from "@/theme";

const UserPetsTab: React.FC<{ userId: string }> = ({ userId }) => {
	const { data, loading } = useGetUserOwnershipQuery({
		variables: { id: userId, commonSearch: { page: 0, page_size: 50 } },
		onError: () => toast.error("Errore nel caricamento degli animali"),
	});

	if (loading) return <Spinner />;
	const items = data?.getUser?.user?.ownerships?.items ?? [];

	return (
		<List>
			{items.length === 0 && <EmptyText>Nessun animale</EmptyText>}
			{items.map(
				(o) =>
					o?.pet && (
						<RowCard key={o.id}>
							<div>
								<RowLink href={`/platform/pets/${o.pet.id}`}>{o.pet.name}</RowLink>
								<RowSub>
									{o.pet.gender === "MALE"
										? "Maschio"
										: o.pet.gender === "FEMALE"
											? "Femmina"
											: "—"}
									{o.pet.birthday &&
										` — ${dayjs().diff(o.pet.birthday, "year")} anni`}
									{o.pet.weight_kg != null && ` — ${o.pet.weight_kg} kg`}
								</RowSub>
							</div>
							<Badge>{o.custody_level}</Badge>
						</RowCard>
					)
			)}
		</List>
	);
};

const UserTreatmentsTab: React.FC<{ userId: string }> = ({ userId }) => {
	const [page, setPage] = useState(0);
	const { data, loading } = useGetUserTreatmentsQuery({
		variables: { userId, page },
		onError: () => toast.error("Errore nel caricamento dei trattamenti"),
	});

	if (loading) return <Spinner />;
	const items = data?.listTreatments?.items ?? [];
	const pagination = data?.listTreatments?.pagination;

	return (
		<List>
			{items.length === 0 && <EmptyText>Nessun trattamento</EmptyText>}
			{items.map(
				(tr) =>
					tr && (
						<RowCard key={tr.id}>
							<div>
								<RowTitle>{tr.name}</RowTitle>
								<RowSub>
									{tr.type} — {dayjs(tr.date).format("DD/MM/YYYY")}
									{tr.health_card?.pet && (
										<>
											{" — "}
											<InlineLink href={`/platform/pets/${tr.health_card.pet.id}`}>
												{tr.health_card.pet.name}
											</InlineLink>
										</>
									)}
								</RowSub>
							</div>
							{tr.booster && (
								<RowNote>
									Richiamo: {dayjs(tr.booster.date).format("DD/MM/YYYY")}
								</RowNote>
							)}
						</RowCard>
					)
			)}
			{pagination && (pagination.total_pages ?? 1) > 1 && (
				<Pager>
					<Button
						variant="ghost"
						disabled={page <= 0}
						onClick={() => setPage((p) => p - 1)}
					>
						←
					</Button>
					<span>
						{page + 1} / {pagination.total_pages}
					</span>
					<Button
						variant="ghost"
						disabled={page + 1 >= (pagination.total_pages ?? 1)}
						onClick={() => setPage((p) => p + 1)}
					>
						→
					</Button>
				</Pager>
			)}
		</List>
	);
};

const STATUS_COLOR: Record<string, string> = {
	ACTIVE: "green",
	SUSPENDED: "orange",
	REVOKED: "red",
	EXPIRED: "gray",
};

const UserRbacTab: React.FC<{ userId: string }> = ({ userId }) => {
	const { data, loading, refetch } = useGetUserRbacRolesQuery({
		variables: { user_id: userId },
		fetchPolicy: "network-only",
		onError: () => toast.error("Errore nel caricamento dei ruoli"),
	});

	const { data: rolesData } = useListRbacRolesQuery({
		fetchPolicy: "cache-and-network",
	});
	// listRbacRoles already excludes archived roles; system roles are assignable too
	const roles = rolesData?.listRbacRoles?.roles ?? [];

	const [roleId, setRoleId] = useState("");
	const [shelterId, setShelterId] = useState("");
	const selectedRole = roles.find((r) => r.id === roleId);
	const needsShelter = selectedRole?.scope_type === "SHELTER";

	// shelter picker only loaded when a shelter-scoped role is selected
	const { data: sheltersData } = useListSheltersQuery({
		skip: !needsShelter,
		variables: { search: { page: 0, page_size: 200 } },
	});
	const shelterOptions = (sheltersData?.listShelters?.items ?? [])
		.filter((s): s is NonNullable<typeof s> => !!s)
		.map((s) => ({ value: s.id, label: `${s.name} (${s.city ?? "—"})` }));

	const [assignRole, { loading: assigning }] = useAssignRbacRoleToUserMutation({
		onCompleted: (res) => {
			if (!res.assignRbacRoleToUser.success) {
				toast.error(res.assignRbacRoleToUser.error?.message ?? "Errore");
				return;
			}
			toast.success("Ruolo assegnato");
			setRoleId("");
			setShelterId("");
			refetch();
		},
		onError: () => toast.error("Errore nell'assegnazione"),
	});

	const [revokeAssignment] = useRevokeRbacRoleAssignmentMutation({
		onCompleted: (res) => {
			if (!res.revokeRbacRoleAssignment.success) {
				toast.error(res.revokeRbacRoleAssignment.error?.message ?? "Errore");
				return;
			}
			toast.success("Ruolo revocato");
			refetch();
		},
		onError: () => toast.error("Errore nella revoca"),
	});

	const onAssign = () => {
		if (!roleId || (needsShelter && !shelterId)) return;
		assignRole({
			variables: {
				user_id: userId,
				role_id: roleId,
				shelter_id: needsShelter ? shelterId : null,
			},
		});
	};

	if (loading) return <Spinner />;
	const result = data?.getUserRbacRoles;
	const assignments = result?.assignments ?? [];
	const platformPerms = result?.effective_platform_permissions ?? [];

	return (
		<RbacWrap>
			<Card title="Assegna ruolo">
				<AssignRow>
					<Select
						label="Ruolo"
						placeholder="Seleziona ruolo"
						value={roleId}
						options={roles.map((r) => ({
							value: r.id,
							label: `${r.name} (${r.code})`,
						}))}
						onChange={(e) => {
							setRoleId(e.target.value);
							setShelterId("");
						}}
					/>
					{needsShelter && (
						<Select
							label="Rifugio"
							placeholder="Seleziona rifugio"
							value={shelterId}
							options={shelterOptions}
							onChange={(e) => setShelterId(e.target.value)}
						/>
					)}
					<Button
						type="button"
						loading={assigning}
						disabled={!roleId || (needsShelter && !shelterId)}
						onClick={onAssign}
					>
						Assegna
					</Button>
				</AssignRow>
			</Card>
			<Card title="Assegnazioni ruolo">
				{assignments.length === 0 ? (
					<EmptyText>Nessuna assegnazione RBAC</EmptyText>
				) : (
					<AssignmentTable>
						<thead>
							<tr>
								<Th>Ruolo</Th>
								<Th>Scope</Th>
								<Th>Rifugio</Th>
								<Th>Stato</Th>
								<Th>Assegnato</Th>
								<Th>Azioni</Th>
							</tr>
						</thead>
						<tbody>
							{assignments.map((a) => (
								<tr key={a.id}>
									<Td>
										<RoleCode>{a.role_code}</RoleCode>
										<RoleName>{a.role_name}</RoleName>
									</Td>
									<Td>
										<ScopePill $scope={a.scope_type}>{a.scope_type}</ScopePill>
									</Td>
									<Td>{a.shelter_id ?? "—"}</Td>
									<Td>
										<StatusDot $color={STATUS_COLOR[a.status] ?? "gray"} />
										{a.status}
									</Td>
									<Td>{dayjs(a.assigned_at).format("DD/MM/YYYY")}</Td>
									<Td>
										{a.status === "ACTIVE" && (
											<Button
												variant="danger"
												type="button"
												onClick={() => {
													if (
														confirm(
															`Revocare "${a.role_name}" a questo utente?`
														)
													)
														revokeAssignment({
															variables: { assignment_id: a.id },
														});
												}}
											>
												Revoca
											</Button>
										)}
									</Td>
								</tr>
							))}
						</tbody>
					</AssignmentTable>
				)}
			</Card>
			<Card title="Permessi platform effettivi">
				{platformPerms.length === 0 ? (
					<EmptyText>Nessun permesso platform</EmptyText>
				) : (
					<PermGrid>
						{platformPerms.map((p) => (
							<PermKey key={p}>{p}</PermKey>
						))}
					</PermGrid>
				)}
			</Card>
		</RbacWrap>
	);
};

export default function UserDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = use(params);
	const { data, loading, refetch } = useGetUserQuery({
		variables: { id },
		onError: () => toast.error("Errore nel caricamento dell'utente"),
	});

	const [updateUser, { loading: verifying }] = useUpdateUserBoMutation({
		onCompleted: ({ updateUser }) => {
			if (!updateUser.success) {
				toast.error(updateUser.error?.message ?? "Errore nella verifica");
				return;
			}
			toast.success(
				updateUser.user?.verified ? "Utente verificato" : "Verifica revocata"
			);
			refetch();
		},
		onError: () => toast.error("Errore nella verifica"),
	});

	if (loading) return <Spinner />;
	const user = data?.getUser?.user;
	if (!user) return <EmptyText>Utente non trovato</EmptyText>;

	const setVerified = (verified: boolean) =>
		updateUser({ variables: { id, data: { verified } } });

	return (
		<Page>
			<TitleRow>
				<div>
					<PageTitle>
						{user.first_name} {user.last_name}
					</PageTitle>
					<PageSub>
						{user.email} — registrato il{" "}
						{dayjs(user.created_at).format("DD/MM/YYYY")}
					</PageSub>
				</div>
				<Badge>{user.verified ? "Verificato" : "Da verificare"}</Badge>
				{user.verified ? (
					<Button
						variant="danger"
						type="button"
						loading={verifying}
						onClick={() => {
							if (confirm("Revocare la verifica di questo utente?"))
								setVerified(false);
						}}
					>
						Revoca verifica
					</Button>
				) : (
					<Button
						type="button"
						loading={verifying}
						onClick={() => setVerified(true)}
					>
						Verifica utente
					</Button>
				)}
			</TitleRow>
			<Tabs
				entries={[
					{
						value: "info",
						label: "Informazioni",
						node: (
							<Card>
								<InfoGrid>
									<div>
										<InfoLabel>Nome</InfoLabel>
										<InfoValue>
											{user.first_name} {user.last_name}
										</InfoValue>
									</div>
									<div>
										<InfoLabel>Email</InfoLabel>
										<InfoValue>{user.email}</InfoValue>
									</div>
									<div>
										<InfoLabel>Ruolo</InfoLabel>
										<InfoValue>{user.role}</InfoValue>
									</div>
									<div>
										<InfoLabel>Registrato</InfoLabel>
										<InfoValue>
											{dayjs(user.created_at).format("DD/MM/YYYY HH:mm")}
										</InfoValue>
									</div>
								</InfoGrid>
							</Card>
						),
					},
					{
						value: "pets",
						label: "Animali",
						node: <UserPetsTab userId={id} />,
					},
					{
						value: "treatments",
						label: "Trattamenti",
						node: <UserTreatmentsTab userId={id} />,
					},
					{
						value: "rbac",
						label: "Ruoli e Permessi",
						node: <UserRbacTab userId={id} />,
					},
				]}
			/>
		</Page>
	);
}

const Page = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(1.5)};
`;

const TitleRow = styled.div`
	display: flex;
	align-items: center;
	gap: ${$uw(0.75)};
	flex-wrap: wrap;
`;

const PageTitle = styled.h2`
	margin: 0;
	font-size: 2.2rem;
	font-weight: 700;
	color: ${$color("text")};
`;

const PageSub = styled.p`
	margin: ${$uw(0.25)} 0 0;
	font-size: 1.3rem;
	color: ${$color("dim")};
`;

const InfoGrid = styled.dl`
	display: grid;
	grid-template-columns: 1fr;
	gap: ${$uw(1)};
	margin: 0;
	font-size: 1.4rem;
	@media (min-width: 768px) {
		grid-template-columns: repeat(2, 1fr);
	}
`;

const InfoLabel = styled.dt`
	color: ${$color("dim")};
`;

const InfoValue = styled.dd`
	margin: ${$uw(0.2)} 0 0;
	font-weight: 500;
	color: ${$color("text")};
`;

const List = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(0.75)};
`;

const EmptyText = styled.p`
	padding: ${$uw(1.5)} 0;
	text-align: center;
	color: ${$color("dim")};
`;

const RowCard = styled(Card)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: ${$uw(1)};
`;

const RowTitle = styled.p`
	margin: 0;
	font-weight: 500;
	color: ${$color("text")};
`;

const RowLink = styled(Link)`
	font-weight: 500;
	color: ${$color("primary")};
	&:hover {
		text-decoration: underline;
	}
`;

const InlineLink = styled(Link)`
	color: ${$color("primary")};
	&:hover {
		text-decoration: underline;
	}
`;

const RowSub = styled.p`
	margin: ${$uw(0.2)} 0 0;
	font-size: 1.3rem;
	color: ${$color("dim")};
`;

const RowNote = styled.span`
	font-size: 1.2rem;
	color: ${$color("dim")};
`;

const Pager = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: ${$uw(0.75)};
	font-size: 1.3rem;
	color: ${$color("muted")};
`;

const RbacWrap = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(1)};
`;

const AssignRow = styled.div`
	display: flex;
	align-items: flex-end;
	gap: ${$uw(0.75)};
	flex-wrap: wrap;

	> * {
		min-width: ${$uw(12)};
	}
	> button {
		min-width: auto;
	}
`;

const AssignmentTable = styled.table`
	width: 100%;
	border-collapse: collapse;
	font-size: 1.3rem;
`;

const Th = styled.th`
	text-align: left;
	padding: ${$uw(0.4)} ${$uw(0.6)};
	font-size: 1.1rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	color: ${$color("muted")};
	border-bottom: 1px solid ${$color("border")};
`;

const Td = styled.td`
	padding: ${$uw(0.5)} ${$uw(0.6)};
	color: ${$color("text")};
	border-bottom: 1px solid ${$color("border")};
	vertical-align: middle;
`;

const RoleCode = styled.p`
	margin: 0;
	font-family: monospace;
	font-size: 1.2rem;
	color: ${$color("text")};
`;

const RoleName = styled.p`
	margin: ${$uw(0.1)} 0 0;
	font-size: 1.1rem;
	color: ${$color("dim")};
`;

const ScopePill = styled.span<{ $scope: string }>`
	display: inline-block;
	padding: ${$uw(0.15)} ${$uw(0.5)};
	border-radius: ${$uw(0.3)};
	font-size: 1.1rem;
	font-weight: 600;
	background: ${({ $scope }) =>
		$scope === "PLATFORM" ? "rgba(99,102,241,0.12)" : "rgba(16,185,129,0.12)"};
	color: ${({ $scope }) =>
		$scope === "PLATFORM" ? "#6366f1" : "#10b981"};
`;

const StatusDot = styled.span<{ $color: string }>`
	display: inline-block;
	width: 6px;
	height: 6px;
	border-radius: 50%;
	background: ${({ $color }) => $color};
	margin-right: ${$uw(0.4)};
	vertical-align: middle;
`;

const PermGrid = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: ${$uw(0.4)};
`;

const PermKey = styled.span`
	display: inline-block;
	padding: ${$uw(0.15)} ${$uw(0.5)};
	border-radius: ${$uw(0.25)};
	font-size: 1.2rem;
	font-family: monospace;
	background: ${$color("surface")};
	color: ${$color("dim")};
`;
