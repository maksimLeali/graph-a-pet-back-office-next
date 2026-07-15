"use client";

import { useDonationScope } from "@/lib/donations/DonationScopeContext";
import { EmptyState } from "@/components/ui/EmptyState";
import type { PlatformPermissionKey } from "@/lib/permissions";

/**
 * Shared shell for platform-scope-only donation pages (disputes, connected
 * accounts, ledger, webhooks): checks the page's specific platform
 * permission, then explains exactly which backend operation is missing.
 */
export const PlatformScopedPage: React.FC<{
	requiredPermission: PlatformPermissionKey;
	title: string;
	missingBackendDescription: string;
}> = ({ requiredPermission, title, missingBackendDescription }) => {
	const { platformAuth } = useDonationScope();

	if (platformAuth.loading) return null;

	if (!platformAuth.can(requiredPermission)) {
		return (
			<EmptyState
				title="Accesso negato"
				description={`Non hai il permesso "${requiredPermission}" a livello piattaforma.`}
			/>
		);
	}

	return (
		<EmptyState
			icon="◫"
			title={`${title} — non ancora disponibile`}
			description={missingBackendDescription}
		/>
	);
};
