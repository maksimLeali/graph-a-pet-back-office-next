"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import toast from "react-hot-toast";

import {
	useListRbacRolesQuery,
	useListPermissionCatalogQuery,
	useUpdateRbacRolePermissionsMutation,
} from "@/graphql/__generated__/rbac.generated";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { $color, $uw } from "@/theme";

type PermItem = { key: string; domain: string; scope_type: string; risk_level: string };

const RISK_COLOR: Record<string, string> = {
	HIGH: "#ef4444",
	MEDIUM: "#f59e0b",
	LOW: "#6b7280",
};

function groupByDomain(perms: PermItem[]) {
	const map: Record<string, PermItem[]> = {};
	for (const p of perms) {
		(map[p.domain] ??= []).push(p);
	}
	return Object.entries(map);
}

export default function RoleDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = use(params);
	const router = useRouter();

	const { data: rolesData, loading: rolesLoading } = useListRbacRolesQuery({
		fetchPolicy: "network-only",
		onError: () => toast.error("Errore nel caricamento del ruolo"),
	});

	const { data: catalogData, loading: catalogLoading } = useListPermissionCatalogQuery({
		fetchPolicy: "cache-and-network",
		onError: () => toast.error("Errore nel caricamento del catalogo"),
	});

	const role = rolesData?.listRbacRoles?.roles?.find((r) => r.id === id) ?? null;
	const catalog = (catalogData?.listPermissionCatalog ?? []).filter(
		(p) => !role || p.scope_type === role.scope_type
	);

	const [selected, setSelected] = useState<Set<string>>(new Set());

	useEffect(() => {
		if (role) setSelected(new Set(role.permissions));
	}, [role?.id, role?.permissions.join(",")]);

	const [updatePerms, { loading: saving }] = useUpdateRbacRolePermissionsMutation({
		onCompleted: ({ updateRbacRolePermissions: res }) => {
			if (!res.success) {
				toast.error(res.error?.message ?? "Errore nel salvataggio");
				return;
			}
			toast.success("Permessi salvati");
		},
		onError: () => toast.error("Errore nel salvataggio"),
	});

	const toggle = (key: string) => {
		setSelected((prev) => {
			const next = new Set(prev);
			if (next.has(key)) next.delete(key);
			else next.add(key);
			return next;
		});
	};

	const toggleDomain = (keys: string[]) => {
		setSelected((prev) => {
			const next = new Set(prev);
			const allOn = keys.every((k) => next.has(k));
			if (allOn) keys.forEach((k) => next.delete(k));
			else keys.forEach((k) => next.add(k));
			return next;
		});
	};

	const save = () => {
		updatePerms({
			variables: {
				input: { role_id: id, permission_keys: Array.from(selected) },
			},
		});
	};

	if (rolesLoading || catalogLoading) return <Spinner />;
	if (!role) return <NotFound>Ruolo non trovato</NotFound>;

	const grouped = groupByDomain(catalog);

	return (
		<Page>
			<TopBar>
				<Button variant="ghost" type="button" onClick={() => router.back()}>
					← Indietro
				</Button>
				{!role.is_system && (
					<Button
						type="button"
						loading={saving}
						onClick={save}
					>
						Salva permessi ({selected.size})
					</Button>
				)}
			</TopBar>

			<RoleHeader>
				<RoleName>{role.name}</RoleName>
				<MetaRow>
					<RoleCode>{role.code}</RoleCode>
					<ScopePill $scope={role.scope_type}>
						{role.scope_type === "PLATFORM" ? "Platform" : "Rifugio"}
					</ScopePill>
					{role.is_system && <SystemBadge>Sistema — sola lettura</SystemBadge>}
					{role.grants_all_permissions && (
						<AllPermsBadge>grants_all_permissions</AllPermsBadge>
					)}
				</MetaRow>
			</RoleHeader>

			{role.grants_all_permissions ? (
				<InfoCard>
					Questo ruolo ha accesso a tutti i permessi tramite{" "}
					<code>grants_all_permissions</code>. Nessun checkbox necessario.
				</InfoCard>
			) : (
				<PermissionsCard>
					<PermHeader>
						<PermTitle>Permessi ({selected.size} / {catalog.length} selezionati)</PermTitle>
						{!role.is_system && (
							<SelectAllGlobal
								type="button"
								onClick={() => {
									const allKeys = catalog.map((p) => p.key);
									const allOn = allKeys.every((k) => selected.has(k));
									setSelected(allOn ? new Set() : new Set(allKeys));
								}}
							>
								{catalog.every((p) => selected.has(p.key))
									? "Deseleziona tutti"
									: "Seleziona tutti"}
							</SelectAllGlobal>
						)}
					</PermHeader>

					<DomainList>
						{grouped.map(([domain, perms]) => {
							const keys = perms.map((p) => p.key);
							const allOn = keys.every((k) => selected.has(k));
							const someOn = keys.some((k) => selected.has(k));
							return (
								<DomainSection key={domain}>
									<DomainRow>
										{!role.is_system && (
											<DomainCheckbox
												type="checkbox"
												checked={allOn}
												ref={(el) => {
													if (el) el.indeterminate = someOn && !allOn;
												}}
												onChange={() => toggleDomain(keys)}
											/>
										)}
										<DomainLabel>{domain}</DomainLabel>
										<DomainCount>
											{keys.filter((k) => selected.has(k)).length}/{keys.length}
										</DomainCount>
									</DomainRow>
									<PermRows>
										{perms.map((p) => (
											<PermRow key={p.key} $checked={selected.has(p.key)}>
												<input
													type="checkbox"
													id={p.key}
													checked={selected.has(p.key)}
													disabled={role.is_system}
													onChange={() => toggle(p.key)}
												/>
												<label htmlFor={p.key}>
													<PermKeyText>{p.key}</PermKeyText>
												</label>
												<RiskTag $level={p.risk_level}>{p.risk_level}</RiskTag>
											</PermRow>
										))}
									</PermRows>
								</DomainSection>
							);
						})}
					</DomainList>
				</PermissionsCard>
			)}

		</Page>
	);
}

const Page = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(1.5)};
`;

const TopBar = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;


const RoleHeader = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(0.5)};
`;

const RoleName = styled.h2`
	margin: 0;
	font-size: 2.2rem;
	font-weight: 700;
	color: ${$color("text")};
`;

const MetaRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: ${$uw(0.5)};
`;

const RoleCode = styled.code`
	font-size: 1.3rem;
	font-family: monospace;
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
	color: ${({ $scope }) => ($scope === "PLATFORM" ? "#6366f1" : "#10b981")};
`;

const SystemBadge = styled.span`
	display: inline-block;
	padding: ${$uw(0.15)} ${$uw(0.5)};
	border-radius: ${$uw(0.3)};
	font-size: 1.1rem;
	background: ${$color("surface")};
	color: ${$color("muted")};
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

const NotFound = styled.p`
	color: ${$color("dim")};
	font-size: 1.4rem;
`;

const InfoCard = styled(Card)`
	font-size: 1.4rem;
	color: ${$color("dim")};
	code {
		font-family: monospace;
		color: ${$color("text")};
	}
`;

const PermissionsCard = styled(Card)`
	display: flex;
	flex-direction: column;
	gap: ${$uw(1.25)};
`;

const PermHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const PermTitle = styled.p`
	margin: 0;
	font-size: 1.3rem;
	font-weight: 600;
	color: ${$color("text")};
`;

const SelectAllGlobal = styled.button`
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

const DomainList = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(1.25)};
`;

const DomainSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(0.4)};
`;

const DomainRow = styled.div`
	display: flex;
	align-items: center;
	gap: ${$uw(0.5)};
	padding-bottom: ${$uw(0.3)};
	border-bottom: 1px solid ${$color("border")};
`;

const DomainCheckbox = styled.input`
	cursor: pointer;
	width: 15px;
	height: 15px;
	flex-shrink: 0;
`;

const DomainLabel = styled.span`
	flex: 1;
	font-size: 1.2rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	color: ${$color("muted")};
`;

const DomainCount = styled.span`
	font-size: 1.1rem;
	color: ${$color("muted")};
`;

const PermRows = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(0.25)};
	padding-left: ${$uw(1.5)};
`;

const PermRow = styled.div<{ $checked: boolean }>`
	display: flex;
	align-items: center;
	gap: ${$uw(0.6)};
	padding: ${$uw(0.35)} ${$uw(0.6)};
	border-radius: ${$uw(0.35)};
	background: ${({ $checked }) =>
		$checked ? `${$color("surface")}` : "transparent"};
	transition: background 0.1s ease;

	input[type="checkbox"] {
		cursor: pointer;
		width: 14px;
		height: 14px;
		flex-shrink: 0;
		&:disabled {
			cursor: default;
		}
	}

	label {
		flex: 1;
		cursor: pointer;
	}
`;

const PermKeyText = styled.span`
	font-family: monospace;
	font-size: 1.3rem;
	color: ${$color("text")};
`;

const RiskTag = styled.span<{ $level: string }>`
	font-size: 1rem;
	font-weight: 700;
	padding: ${$uw(0.1)} ${$uw(0.35)};
	border-radius: ${$uw(0.2)};
	color: ${({ $level }) => RISK_COLOR[$level] ?? "#6b7280"};
	background: ${({ $level }) => `${RISK_COLOR[$level] ?? "#6b7280"}18`};
	flex-shrink: 0;
`;

