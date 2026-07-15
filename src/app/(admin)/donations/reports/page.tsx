"use client";

import { ShelterScopedPage } from "@/components/donations/ShelterScopedPage";
import { ShelterPermissions } from "@/lib/permissions";

export default function ReportsPage() {
	return (
		<ShelterScopedPage
			requiredPermission={ShelterPermissions.FINANCIAL_REPORTS_READ}
			title="Report finanziari"
			missingBackendDescription="Il backend non espone ancora un riepilogo mensile (getShelterDonationMonthlyReport / listShelterDonationReports) né un'operazione di export (exportShelterFinancialReport), riservata a shelters.financial_reports.export."
		/>
	);
}
