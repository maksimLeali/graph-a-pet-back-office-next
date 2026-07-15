"use client";

import { PlatformScopedPage } from "@/components/donations/PlatformScopedPage";
import { PlatformPermissions } from "@/lib/permissions";

export default function LedgerPage() {
	return (
		<PlatformScopedPage
			requiredPermission={PlatformPermissions.FINANCIAL_LEDGER_READ}
			title="Registro finanziario"
			missingBackendDescription="Il backend non espone ancora un tipo LedgerEntry (payment/platform_fee/processing_fee/transfer/payout/refund/dispute/reversal/adjustment) né le operazioni listLedgerEntries e reconcileLedgerEntry (riservata a platform.financial_ledger.reconcile). Il registro sarà immutabile: la riconciliazione avverrà solo tramite operazioni backend."
		/>
	);
}
