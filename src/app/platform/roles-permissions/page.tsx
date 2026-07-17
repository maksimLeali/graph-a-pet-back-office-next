"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import toast from "react-hot-toast";

import {
	useListRbacRolesQuery,
	useListPermissionCatalogQuery,
	useCreateRbacRoleMutation,
	useArchiveRbacRoleMutation,
} from "@/graphql/__generated__/rbac.generated";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Spinner } from "@/components/ui/Spinner";
import { $color, $uw } from "@/theme";

type RbacRole = {
	id: string;
	code: string;
	name: string;
	scope_type: string;
	is_system: boolean;
	grants_all_permissions: boolean;
	permissions: string[];
};

type PermCatalogItem = {
	key: string;
	domain: string;
	scope_type: string;
	risk_level: string;
};

type CreateForm = {
	code: string;
	name: string;
	description: string;
	scope_type: string;
};

const SCOPE_OPTIONS = [
	{ value: "PLATFORM", label: "Platform" },
	{ value: "SHELTER", label: "Rifugio" },
];

const RISK_COLOR: Record<string, string> = {
	HIGH: "#ef4444",
	MEDIUM: "#f59e0b",
	LOW: "#6b7280",
};

function groupByDomain(perms: PermCatalogItem[]) {
	const map: Record<string, PermCatalogItem[]> = {};
	for (const p of perms) {
		if (!map[p.domain]) map[p.domain] = [];
		map[p.domain].push(p);
	}
	return map;
}

const PermissionPicker: React.FC<{
	catalog: PermCatalogItem[];
	scopeType: string;
	selected: Set<string>;
	onChange: (keys: Set<string>) => void;
}> = ({ catalog, scopeType, selected, onChange }) => {
	const filtered = catalog.filter((p) => p.scope_type === scopeType);
	const grouped = groupByDomain(filtered);

	const toggle = (key: string) => {
		const next = new Set(selected);
		if (next.has(key)) next.delete(key);
		else next.add(key);
		onChange(next);
	};

	const toggleAll = (keys: string[]) => {
		const allSelected = keys.every((k) => selected.has(k));
		const next = new Set(selected);
		if (allSelected) keys.forEach((k) => next.delete(k));
		else keys.forEach((k) => next.add(k));
		onChange(next);
	};

	if (filtered.length === 0)
		return <PickerEmpty>Nessun permesso per questo scope</PickerEmpty>;

	return (
		<PickerWrap>
			{Object.entries(grouped).map(([domain, perms]) => {
				const keys = perms.map((p) => p.key);
				const allSelected = keys.every((k) => selected.has(k));
				return (
					<DomainGroup key={domain}>
						<DomainHeader>
							<DomainLabel>{domain}</DomainLabel>
							<SelectAllBtn
								type="button"
								onClick={() => toggleAll(keys)}
							>
								{allSelected ? "Deseleziona" : "Seleziona tutto"}
							</SelectAllBtn>
						</DomainHeader>
						<PermCheckList>
							{perms.map((p) => (
								<PermCheckRow key={p.key}>
									<input
										type="checkbox"
										id={p.key}
										checked={selected.has(p.key)}
										onChange={() => toggle(p.key)}
									/>
									<label htmlFor={p.key}>
										<PermKeyLabel>{p.key}</PermKeyLabel>
									</label>
									<RiskTag $level={p.risk_level}>{p.risk_level}</RiskTag>
								</PermCheckRow>
							))}
						</PermCheckList>
					</DomainGroup>
				);
			})}
		</PickerWrap>
	);
};

export default function RolesPermissionsPage() {
	const [showCreate, setShowCreate] = useState(false);
	const [createPerms, setCreatePerms] = useState<Set<string>>(new Set());
	const form = useForm<CreateForm>({
		defaultValues: { scope_type: "SHELTER" },
	});
	const scopeWatch = form.watch("scope_type");

	const { data: rolesData, loading: rolesLoading, refetch } = useListRbacRolesQuery({
		fetchPolicy: "cache-and-network",
		onError: () => toast.error("Errore nel caricamento dei ruoli"),
	});

	const { data: catalogData } = useListPermissionCatalogQuery({
		fetchPolicy: "cache-and-network",
		onError: () => toast.error("Errore nel caricamento del catalogo"),
	});

	const [createRole, { loading: creating }] = useCreateRbacRoleMutation({
		onCompleted: ({ createRbacRole: res }) => {
			if (!res.success) {
				toast.error(res.error?.message ?? "Errore nella creazione");
				return;
			}
			toast.success(`Ruolo "${res.role?.name}" creato`);
			form.reset({ scope_type: "SHELTER" });
			setCreatePerms(new Set());
			setShowCreate(false);
			refetch();
		},
		onError: () => toast.error("Errore nella creazione del ruolo"),
	});

	const [archiveRole] = useArchiveRbacRoleMutation({
		onCompleted: ({ archiveRbacRole: res }) => {
			if (!res.success) {
				toast.error(res.error?.message ?? "Errore nell'archiviazione");
				return;
			}
			toast.success("Ruolo archiviato");
			refetch();
		},
		onError: () => toast.error("Errore nell'archiviazione"),
	});

	const onSubmitCreate = (v: CreateForm) => {
		createRole({
			variables: {
				input: {
					code: v.code.toUpperCase().replace(/\s+/g, "_"),
					name: v.name,
					description: v.description || undefined,
					scope_type: v.scope_type,
					permission_keys: Array.from(createPerms),
				},
			},
		});
	};

	if (rolesLoading && !rolesData) return <Spinner />;

	const roles = rolesData?.listRbacRoles?.roles ?? [];
	const catalog = catalogData?.listPermissionCatalog ?? [];
	const platformRoles = roles.filter((r) => r.scope_type === "PLATFORM");
	const shelterRoles = roles.filter((r) => r.scope_type === "SHELTER");

	return (
		<Page>
			<PageHeader>
				<div>
					<PageTitle>Ruoli e Permessi</PageTitle>
					<PageSub>Catalogo RBAC — {roles.length} ruoli attivi</PageSub>
				</div>
				<Button type="button" onClick={() => setShowCreate((o) => !o)}>
					{showCreate ? "− Chiudi" : "+ Crea ruolo"}
				</Button>
			</PageHeader>

			{showCreate && (
				<CreateCard title="Nuovo ruolo RBAC">
					<CreateForm onSubmit={form.handleSubmit(onSubmitCreate)}>
						<FormGrid>
							<Input
								label="Codice (es. SHELTER_ACCOUNTANT)"
								{...form.register("code", { required: true })}
							/>
							<Input
								label="Nome"
								{...form.register("name", { required: true })}
							/>
							<Select
								label="Scope"
								options={SCOPE_OPTIONS}
								{...form.register("scope_type")}
							/>
							<Input
								label="Descrizione (opzionale)"
								{...form.register("description")}
							/>
						</FormGrid>
						<PermSectionLabel>
							Permessi ({createPerms.size} selezionati)
						</PermSectionLabel>
						<PermissionPicker
							catalog={catalog}
							scopeType={scopeWatch}
							selected={createPerms}
							onChange={setCreatePerms}
						/>
						<FormFoot>
							<Button type="submit" loading={creating}>
								Crea ruolo
							</Button>
						</FormFoot>
					</CreateForm>
				</CreateCard>
			)}

			<Section>
				<SectionTitle>Ruoli Platform</SectionTitle>
				<RoleGrid>
					{platformRoles.map((role) => (
						<RoleCard key={role.id}>
							<RoleTopRow>
								<div>
									<RoleNameLink href={`/roles-permissions/${role.id}`}>
										{role.name}
									</RoleNameLink>
									<RoleCode>{role.code}</RoleCode>
								</div>
								<BadgeRow>
									<ScopePill $scope="PLATFORM">Platform</ScopePill>
									{role.grants_all_permissions && (
										<AllPermsBadge>Tutti i permessi</AllPermsBadge>
									)}
									{role.is_system && <SystemBadge>Sistema</SystemBadge>}
								</BadgeRow>
							</RoleTopRow>
							{role.permissions.length > 0 ? (
								<PermList>
									{role.permissions.map((p) => (
										<PermKey key={p}>{p}</PermKey>
									))}
								</PermList>
							) : role.grants_all_permissions ? (
								<PermNote>Tutti i permessi del catalogo</PermNote>
							) : (
								<PermNote>Nessun permesso esplicito</PermNote>
							)}
							{!role.is_system && (
								<RoleActions>
									<Button
										variant="danger"
										type="button"
										onClick={() => {
											if (confirm(`Archiviare il ruolo "${role.name}"?`))
												archiveRole({ variables: { role_id: role.id } });
										}}
									>
										Archivia
									</Button>
								</RoleActions>
							)}
						</RoleCard>
					))}
				</RoleGrid>
			</Section>

			<Section>
				<SectionTitle>Ruoli Rifugio</SectionTitle>
				<RoleGrid>
					{shelterRoles.map((role) => (
						<RoleCard key={role.id}>
							<RoleTopRow>
								<div>
									<RoleNameLink href={`/roles-permissions/${role.id}`}>
										{role.name}
									</RoleNameLink>
									<RoleCode>{role.code}</RoleCode>
								</div>
								<BadgeRow>
									<ScopePill $scope="SHELTER">Rifugio</ScopePill>
									{role.is_system && <SystemBadge>Sistema</SystemBadge>}
									<PermCountBadge>{role.permissions.length} perm.</PermCountBadge>
								</BadgeRow>
							</RoleTopRow>
							<PermList>
								{role.permissions.map((p) => (
									<PermKey key={p}>{p}</PermKey>
								))}
							</PermList>
							{!role.is_system && (
								<RoleActions>
									<Button
										variant="danger"
										type="button"
										onClick={() => {
											if (confirm(`Archiviare il ruolo "${role.name}"?`))
												archiveRole({ variables: { role_id: role.id } });
										}}
									>
										Archivia
									</Button>
								</RoleActions>
							)}
						</RoleCard>
					))}
				</RoleGrid>
			</Section>
		</Page>
	);
}

// ---- styled components ----

const Page = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(2)};
`;

const PageHeader = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: ${$uw(1)};
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

const CreateCard = styled(Card)`
	border: 1px dashed ${$color("border")};
`;

const CreateForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: ${$uw(1)};
`;

const FormGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: ${$uw(1)};
	@media (min-width: 768px) {
		grid-template-columns: repeat(2, 1fr);
	}
`;

const PermSectionLabel = styled.p`
	margin: 0;
	font-size: 1.2rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	color: ${$color("muted")};
`;

const FormFoot = styled.div`
	display: flex;
	gap: ${$uw(0.5)};
`;


const Section = styled.section`
	display: flex;
	flex-direction: column;
	gap: ${$uw(1)};
`;

const SectionTitle = styled.h3`
	margin: 0;
	font-size: 1.3rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: ${$color("muted")};
`;

const RoleGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
	gap: ${$uw(1)};
`;

const RoleCard = styled(Card)`
	display: flex;
	flex-direction: column;
	gap: ${$uw(0.75)};
`;

const RoleTopRow = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: ${$uw(0.5)};
`;

const RoleNameLink = styled(Link)`
	display: block;
	font-size: 1.5rem;
	font-weight: 600;
	color: ${$color("text")};
	&:hover {
		color: ${$color("primary")};
		text-decoration: underline;
	}
`;

const RoleCode = styled.p`
	margin: ${$uw(0.1)} 0 0;
	font-size: 1.1rem;
	font-family: monospace;
	color: ${$color("dim")};
`;

const BadgeRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: ${$uw(0.3)};
	justify-content: flex-end;
`;

const ScopePill = styled.span<{ $scope: string }>`
	display: inline-block;
	padding: ${$uw(0.15)} ${$uw(0.5)};
	border-radius: ${$uw(0.3)};
	font-size: 1.1rem;
	font-weight: 600;
	background: ${({ $scope }) =>
		$scope === "PLATFORM" ? "rgba(99,102,241,0.12)" : "rgba(16,185,129,0.12)"};
	color: ${({ $scope }) => ($scope === "PLATFORM" ? "#6366f1" : "#10b981")};
`;

const AllPermsBadge = styled.span`
	display: inline-block;
	padding: ${$uw(0.15)} ${$uw(0.5)};
	border-radius: ${$uw(0.3)};
	font-size: 1.1rem;
	font-weight: 600;
	background: rgba(245, 158, 11, 0.12);
	color: #d97706;
`;

const SystemBadge = styled.span`
	display: inline-block;
	padding: ${$uw(0.15)} ${$uw(0.5)};
	border-radius: ${$uw(0.3)};
	font-size: 1.1rem;
	background: ${$color("surface")};
	color: ${$color("muted")};
`;

const PermCountBadge = styled.span`
	display: inline-block;
	padding: ${$uw(0.15)} ${$uw(0.5)};
	border-radius: ${$uw(0.3)};
	font-size: 1.1rem;
	background: ${$color("surface")};
	color: ${$color("muted")};
`;

const RoleActions = styled.div`
	display: flex;
	gap: ${$uw(0.5)};
	padding-top: ${$uw(0.5)};
	border-top: 1px solid ${$color("border")};
`;

const PermList = styled.ul`
	margin: 0;
	padding: 0;
	list-style: none;
	display: flex;
	flex-direction: column;
	gap: ${$uw(0.2)};
`;

const PermKey = styled.li`
	font-size: 1.2rem;
	font-family: monospace;
	color: ${$color("dim")};
	background: ${$color("surface")};
	border-radius: ${$uw(0.25)};
	padding: ${$uw(0.15)} ${$uw(0.4)};
`;

const PermNote = styled.p`
	margin: 0;
	font-size: 1.2rem;
	font-style: italic;
	color: ${$color("muted")};
`;

// ---- PermissionPicker styles ----

const PickerWrap = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(1)};
	max-height: 40rem;
	overflow-y: auto;
	padding-right: ${$uw(0.5)};
`;

const PickerEmpty = styled.p`
	font-size: 1.3rem;
	color: ${$color("muted")};
	margin: 0;
`;

const DomainGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(0.4)};
`;

const DomainHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const DomainLabel = styled.span`
	font-size: 1.2rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	color: ${$color("muted")};
`;

const SelectAllBtn = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	font-size: 1.2rem;
	color: ${$color("primary")};
	padding: 0;
	&:hover {
		text-decoration: underline;
	}
`;

const PermCheckList = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(0.3)};
`;

const PermCheckRow = styled.div`
	display: flex;
	align-items: center;
	gap: ${$uw(0.5)};
	font-size: 1.3rem;

	input[type="checkbox"] {
		cursor: pointer;
		width: 14px;
		height: 14px;
		flex-shrink: 0;
	}

	label {
		cursor: pointer;
		flex: 1;
	}
`;

const PermKeyLabel = styled.span`
	font-family: monospace;
	font-size: 1.2rem;
	color: ${$color("text")};
`;

const RiskTag = styled.span<{ $level: string }>`
	font-size: 1rem;
	font-weight: 600;
	padding: ${$uw(0.1)} ${$uw(0.35)};
	border-radius: ${$uw(0.2)};
	color: ${({ $level }) => RISK_COLOR[$level] ?? "#6b7280"};
	background: ${({ $level }) => `${RISK_COLOR[$level] ?? "#6b7280"}18`};
`;
