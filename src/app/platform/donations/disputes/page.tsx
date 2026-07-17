"use client";

import { PlatformScopedPage } from "@/components/donations/PlatformScopedPage";
import { PlatformPermissions } from "@/lib/permissions";

export default function DisputesPage() {
	return (
		<PlatformScopedPage
			requiredPermission={PlatformPermissions.DISPUTES_READ}
			title="Dispute"
			missingBackendDescription="Il backend non espone ancora un tipo Dispute né le operazioni listDisputes, getDispute. Le azioni disponibili verranno mostrate solo se e quando il backend le dichiarerà esplicitamente — nessun flusso di caricamento prove verrà inventato."
		/>
	);
}
