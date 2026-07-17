"use client";

import { useBackofficeAuth } from "@/contexts/BackofficeAuthContext";
import { Spinner } from "@/components/ui/Spinner";
import { Forbidden } from "./Forbidden";

/**
 * Guard di pagina per l'area rifugio: renderizza i figli solo se il rifugio
 * corrente (dalla URL, già validato dal layout) possiede la permission
 * funzionale richiesta. Niente render = niente query sensibili avviate.
 * È solo UX: l'autorità resta il backend.
 */
export const RequireShelterPermission: React.FC<{
	permission: string;
	children: React.ReactNode;
}> = ({ permission, children }) => {
	const { loading, currentShelter, canShelter } = useBackofficeAuth();

	if (loading) return <Spinner />;
	if (!currentShelter || !canShelter(permission)) {
		return (
			<Forbidden
				message={`Permesso mancante: ${permission}`}
				homeHref={
					currentShelter
						? `/shelters/${currentShelter.shelter.id}/dashboard`
						: "/"
				}
			/>
		);
	}
	return <>{children}</>;
};
