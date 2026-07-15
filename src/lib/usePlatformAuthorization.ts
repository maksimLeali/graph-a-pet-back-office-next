"use client";

import { useCallback } from "react";
import { useGetUserRbacRolesQuery } from "@/graphql/__generated__/rbac.generated";
import { auth } from "@/lib/auth";

/**
 * Effective RBAC platform permissions of the current back-office user.
 * Permission keys come from the backend; never derive capabilities from role
 * names (ADMIN, PLATFORM_ADMIN, ...). After a role or membership change call
 * `refetch()` so the UI reflects the new grants.
 *
 * Reuses the existing `getUserRbacRoles(user_id)` query (already shipped for
 * the user-detail RBAC tab) against the logged-in user's own id — there is
 * no dedicated "my platform permissions" query on the backend yet. See the
 * donation-RBAC report for that gap.
 */
export const usePlatformAuthorization = (): {
	can: (permission: string) => boolean;
	permissions: string[];
	loading: boolean;
	error?: string;
	refetch: () => void;
} => {
	const userId = auth.getUser()?.id;

	const { data, loading, error, refetch } = useGetUserRbacRolesQuery({
		skip: !userId,
		fetchPolicy: "network-only",
		variables: { user_id: userId as string },
	});

	const result = data?.getUserRbacRoles;
	const permissions = result?.effective_platform_permissions ?? [];

	const can = useCallback(
		(permission: string) => permissions.includes(permission),
		[permissions]
	);

	return {
		can,
		permissions,
		loading,
		error: error?.message ?? result?.error?.message ?? undefined,
		refetch,
	};
};
