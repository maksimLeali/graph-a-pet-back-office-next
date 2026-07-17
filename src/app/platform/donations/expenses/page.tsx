"use client";

import { ShelterScopedPage } from "@/components/donations/ShelterScopedPage";
import { ShelterPermissions } from "@/lib/permissions";

export default function ExpensesPage() {
	return (
		<ShelterScopedPage
			requiredPermission={ShelterPermissions.EXPENSES_READ}
			title="Spese"
			missingBackendDescription="Il backend non espone ancora un tipo Expense né le operazioni listShelterExpenses, createShelterExpense, updateShelterExpense, submitShelterExpense, approveShelterExpense, rejectShelterExpense. L'allegato ricevuta potrà riusare la mutation createMedia già esistente una volta che Expense avrà un id a cui collegarla."
		/>
	);
}
