"use client";

import { useEffect, useMemo, useState } from "react";
import { useApolloClient } from "@apollo/client";

import {
	MyShelterAuthorizationBoDocument,
	MyShelterAuthorizationBoQuery,
	MyShelterAuthorizationBoQueryVariables,
	useListSheltersQuery,
} from "@/graphql/__generated__/queries.generated";
import { useMyRbacAssignments } from "@/lib/donations/useMyRbacAssignments";
import { RELEVANT_SHELTER_DONATION_PERMISSIONS } from "@/lib/donations/relevantPermissions";

export type ShelterDonationCandidate = { id: string; name: string };

/**
 * Shelters where the current user actually holds at least one donation
 * permission — real per-shelter permission checks, no role-name proxy.
 *
 * 1. `getUserRbacRoles(self)` gives every active shelter-scoped role
 *    assignment (which shelters the user has ANY role on).
 * 2. `listShelters` resolves id -> name for the picker.
 * 3. For each candidate shelter, `myShelterAuthorization(shelter_id)` is
 *    called imperatively (not a React hook, so the variable shelter count
 *    doesn't violate rules of hooks) to get the real effective permission
 *    set, kept only if it intersects `RELEVANT_SHELTER_DONATION_PERMISSIONS`.
 *
 * This does N+1 network calls (one per shelter the user has a role on),
 * acceptable for the handful of shelters a back-office user is typically
 * tied to. A bulk "my permissions per shelter" query would remove the need
 * for step 3 — see the Donations module report for that backend gap.
 */
export const useMyShelterDonationCandidates = () => {
	const client = useApolloClient();
	const { assignments, loading: assignmentsLoading } = useMyRbacAssignments();

	const shelterIds = useMemo(() => {
		const ids = assignments
			.filter(
				(a) => a.scope_type === "SHELTER" && !!a.shelter_id && a.status === "ACTIVE"
			)
			.map((a) => a.shelter_id as string);
		return Array.from(new Set(ids));
	}, [assignments]);

	const shelters = useListSheltersQuery({
		skip: shelterIds.length === 0,
		fetchPolicy: "network-only",
		variables: { search: { page: 0, page_size: 200 } },
	});

	const [candidates, setCandidates] = useState<ShelterDonationCandidate[]>([]);
	const [checking, setChecking] = useState(false);

	useEffect(() => {
		let cancelled = false;

		if (shelterIds.length === 0) {
			setCandidates([]);
			return;
		}
		if (shelters.loading) return;

		const nameById = new Map(
			(shelters.data?.listShelters?.items ?? [])
				.filter((s): s is NonNullable<typeof s> => !!s)
				.map((s) => [s.id, s.name])
		);

		setChecking(true);
		Promise.all(
			shelterIds.map(async (id) => {
				try {
					const { data } = await client.query<
						MyShelterAuthorizationBoQuery,
						MyShelterAuthorizationBoQueryVariables
					>({
						query: MyShelterAuthorizationBoDocument,
						variables: { shelter_id: id },
						fetchPolicy: "network-only",
					});
					const permissions =
						data?.myShelterAuthorization?.authorization?.permissions ?? [];
					const eligible = permissions.some(
						(p) =>
							!!p &&
							(RELEVANT_SHELTER_DONATION_PERMISSIONS as string[]).includes(p)
					);
					return eligible ? { id, name: nameById.get(id) ?? id } : null;
				} catch {
					return null;
				}
			})
		)
			.then((results) => {
				if (!cancelled) {
					setCandidates(
						results.filter((r): r is ShelterDonationCandidate => !!r)
					);
				}
			})
			.finally(() => {
				if (!cancelled) setChecking(false);
			});

		return () => {
			cancelled = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shelterIds, shelters.loading, shelters.data]);

	return {
		candidates,
		loading: assignmentsLoading || shelters.loading || checking,
	};
};
