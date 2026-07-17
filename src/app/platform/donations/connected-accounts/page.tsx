"use client";

import { PlatformScopedPage } from "@/components/donations/PlatformScopedPage";
import { PlatformPermissions } from "@/lib/permissions";

export default function ConnectedAccountsPage() {
	return (
		<PlatformScopedPage
			requiredPermission={PlatformPermissions.CONNECTED_ACCOUNTS_READ}
			title="Conti collegati"
			missingBackendDescription="Il backend non espone ancora un tipo ConnectedAccount né le operazioni listConnectedAccounts, syncConnectedAccount, suspendConnectedAccount (quest'ultima riservata a platform.connected_accounts.manage)."
		/>
	);
}
