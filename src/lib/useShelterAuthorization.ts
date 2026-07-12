"use client";

import { useCallback } from "react";
import { useMyShelterAuthorizationBoQuery } from "@/graphql/__generated__/queries.generated";

/**
 * Effective RBAC permissions of the current back-office user on one shelter.
 * Permission keys come from the backend; never derive capabilities from role
 * names. After assigning/revoking roles call `refetch()` so the UI updates.
 */
export const useShelterAuthorization = (
	shelterId?: string
): {
	can: (permission: string) => boolean;
	permissions: string[];
	membershipStatus: string | null;
	loading: boolean;
	error?: string;
	refetch: () => void;
} => {
	const { data, loading, error, refetch } = useMyShelterAuthorizationBoQuery({
		skip: !shelterId,
		fetchPolicy: "network-only",
		variables: { shelter_id: shelterId as string },
	});

	const payload = data?.myShelterAuthorization;
	const permissions = (payload?.authorization?.permissions ?? []).filter(
		(p): p is string => !!p
	);

	const can = useCallback(
		(permission: string) => permissions.includes(permission),
		[permissions]
	);

	return {
		can,
		permissions,
		membershipStatus: payload?.authorization?.membership_status ?? null,
		loading,
		error: error?.message ?? payload?.error?.message ?? undefined,
		refetch,
	};
};
