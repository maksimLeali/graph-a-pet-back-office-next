"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";

import { useBackofficeAccessContextQuery } from "@/graphql/__generated__/backofficeAccessContext.generated";
import { useBackofficeShelterAccessLazyQuery } from "@/graphql/__generated__/backofficeShelterAccess.generated";
import { auth } from "@/lib/auth";
import { PlatformPermissions } from "@/lib/permissions";
import {
	computeHomeRoute,
	computeSwitchRoute,
} from "@/lib/navigation/homeRoute";

/**
 * Contesto autorizzativo del back office multi-rifugio.
 *
 * Fonte di verità: la query `backofficeAccessContext` (permission effettive
 * calcolate dall'AuthorizationService backend). Mai derivare capacità dai
 * nomi dei ruoli: `roles` è solo informativo per la UI.
 *
 * Lo shelter corrente è SEMPRE quello nella URL (/shelters/:shelterId/*),
 * validato contro gli accessi restituiti dal backend — mai fidarsi di URL o
 * localStorage da soli.
 *
 * `accessMode` distingue esplicitamente il canale di accesso:
 * - MEMBERSHIP: membership attiva + ruoli del rifugio;
 * - PLATFORM_ADMIN: nessuna membership, accesso via privilegio platform —
 *   risolto on-demand con `backofficeShelterAccess`, mai creato
 *   implicitamente, segnalato in UI e tracciato in audit dal backend.
 */

export const LAST_SHELTER_KEY = "graphapet.backoffice.lastShelterId";
// evento emesso dal layer Apollo su FORBIDDEN / MEMBERSHIP_NOT_ACTIVE:
// le autorizzazioni potrebbero essere cambiate, il contesto va ricaricato
export const AUTHZ_REFRESH_EVENT = "gap-bo:authz-refresh";

export type ShelterAccessMode = "MEMBERSHIP" | "PLATFORM_ADMIN";

export type ShelterAccess = {
	shelter: { id: string; name: string; city?: string | null };
	membershipStatus: string | null;
	roles: string[];
	permissions: string[];
	accessMode: ShelterAccessMode;
	/** privilegi platform aggiungono permission oltre la membership (info UI) */
	platformOverrideActive: boolean;
};

type BackofficeAuthorizationContext = {
	loading: boolean;
	error?: string;
	authenticated: boolean;
	platformPermissions: Set<string>;
	shelters: ShelterAccess[];
	currentShelter: ShelterAccess | null;
	selectShelter: (shelterId: string) => Promise<void>;
	switching: boolean;
	canPlatform: (permission: string) => boolean;
	canShelter: (permission: string) => boolean;
	refresh: () => Promise<unknown>;
	/** rotta di atterraggio calcolata dagli accessi (post-login / radice) */
	homeRoute: () => string;
};

const Ctx = createContext<BackofficeAuthorizationContext | null>(null);

const shelterIdFromPath = (pathname: string): string | null => {
	const m = pathname.match(/^\/shelters\/([^/]+)/);
	return m ? m[1] : null;
};

const sectionFromPath = (pathname: string): string | null => {
	const m = pathname.match(/^\/shelters\/[^/]+\/([^/]+)/);
	return m ? m[1] : null;
};

export const readLastShelterId = (): string | null => {
	try {
		return window.localStorage.getItem(LAST_SHELTER_KEY);
	} catch {
		return null;
	}
};

type RawAccess = {
	shelter: { id: string; name: string; city?: string | null };
	membership_status?: string | null;
	roles?: (string | null)[] | null;
	permissions?: (string | null)[] | null;
	access_mode: string;
	platform_override_active: boolean;
};

const mapAccess = (s: RawAccess): ShelterAccess => ({
	shelter: {
		id: s.shelter.id,
		name: s.shelter.name,
		city: s.shelter.city,
	},
	membershipStatus: s.membership_status ?? null,
	roles: (s.roles ?? []).filter((r): r is string => !!r),
	permissions: (s.permissions ?? []).filter((p): p is string => !!p),
	accessMode:
		s.access_mode === "PLATFORM_ADMIN" ? "PLATFORM_ADMIN" : "MEMBERSHIP",
	platformOverrideActive: !!s.platform_override_active,
});

export const BackofficeAuthProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const pathname = usePathname();
	const router = useRouter();
	// tenant richiesto dallo switcher: "switching" finché la URL non ci arriva
	const [pendingShelterId, setPendingShelterId] = useState<string | null>(
		null
	);
	const authenticated = !!auth.getToken();

	const { data, loading, error, refetch } = useBackofficeAccessContextQuery({
		skip: !authenticated,
		fetchPolicy: "network-only",
		notifyOnNetworkStatusChange: true,
	});

	const shelters: ShelterAccess[] = useMemo(
		() =>
			(data?.backofficeAccessContext?.shelters ?? []).map(mapAccess),
		[data]
	);

	const platformPermissions = useMemo(
		() =>
			new Set(
				(
					data?.backofficeAccessContext?.platform_permissions ?? []
				).filter((p): p is string => !!p)
			),
		[data]
	);

	const currentShelterId = shelterIdFromPath(pathname);
	const membershipShelter = useMemo(
		() =>
			shelters.find((s) => s.shelter.id === currentShelterId) ?? null,
		[shelters, currentShelterId]
	);

	// accesso PLATFORM_ADMIN a un rifugio fuori dalla lista membership:
	// risolto on-demand contro il backend; il risultato (anche negativo) è
	// memorizzato per shelterId per non ritentare in loop
	const [adminProbe, setAdminProbe] = useState<{
		shelterId: string;
		access: ShelterAccess | null;
	} | null>(null);
	const [fetchShelterAccess] = useBackofficeShelterAccessLazyQuery({
		fetchPolicy: "network-only",
	});

	const contextLoading = authenticated && loading && !data;
	const needsAdminProbe =
		!!currentShelterId &&
		!membershipShelter &&
		!contextLoading &&
		authenticated &&
		platformPermissions.has(PlatformPermissions.BACKOFFICE_ACCESS) &&
		adminProbe?.shelterId !== currentShelterId;

	useEffect(() => {
		if (!needsAdminProbe || !currentShelterId) return;
		let cancelled = false;
		fetchShelterAccess({ variables: { shelter_id: currentShelterId } })
			.then((res) => {
				if (cancelled) return;
				const raw = res.data?.backofficeShelterAccess;
				setAdminProbe({
					shelterId: currentShelterId,
					access: raw ? mapAccess(raw) : null,
				});
			})
			.catch(() => {
				if (!cancelled) {
					setAdminProbe({ shelterId: currentShelterId, access: null });
				}
			});
		return () => {
			cancelled = true;
		};
	}, [needsAdminProbe, currentShelterId, fetchShelterAccess]);

	const currentShelter =
		membershipShelter ??
		(adminProbe?.shelterId === currentShelterId
			? adminProbe.access
			: null);

	const switching =
		!!pendingShelterId && pendingShelterId !== currentShelter?.shelter.id;

	// ultimo rifugio valido: salvato solo per accessi via membership (un
	// platform admin in ispezione non deve "adottare" il rifugio come suo)
	useEffect(() => {
		if (currentShelter?.accessMode === "MEMBERSHIP") {
			try {
				window.localStorage.setItem(
					LAST_SHELTER_KEY,
					currentShelter.shelter.id
				);
			} catch {
				/* storage non disponibile: ininfluente */
			}
		}
	}, [currentShelter]);

	// il layer Apollo segnala FORBIDDEN/MEMBERSHIP_NOT_ACTIVE → ricarica
	const refresh = useCallback(async () => {
		setAdminProbe(null);
		return refetch();
	}, [refetch]);

	useEffect(() => {
		const handler = () => {
			if (authenticated) refresh();
		};
		window.addEventListener(AUTHZ_REFRESH_EVENT, handler);
		return () => window.removeEventListener(AUTHZ_REFRESH_EVENT, handler);
	}, [authenticated, refresh]);

	const canPlatform = useCallback(
		(permission: string) => platformPermissions.has(permission),
		[platformPermissions]
	);

	// legge ESCLUSIVAMENTE le permission del rifugio corrente
	const canShelter = useCallback(
		(permission: string) =>
			!!currentShelter && currentShelter.permissions.includes(permission),
		[currentShelter]
	);

	const homeRoute = useCallback(
		(): string =>
			computeHomeRoute(
				// l'area platform richiede il gate esplicito: le permission
				// base di PLATFORM_USER (app.use, donations.*) non bastano
				platformPermissions.has(PlatformPermissions.BACKOFFICE_ACCESS),
				shelters,
				readLastShelterId()
			),
		[platformPermissions, shelters]
	);

	// cambio tenant: valida contro gli accessi backend, mantiene la sezione
	// corrente se autorizzata nel nuovo rifugio, altrimenti dashboard
	const selectShelter = useCallback(
		async (shelterId: string) => {
			const target = shelters.find((s) => s.shelter.id === shelterId);
			if (!target) return;
			setPendingShelterId(shelterId);
			router.push(computeSwitchRoute(target, sectionFromPath(pathname)));
		},
		[shelters, pathname, router]
	);

	const value: BackofficeAuthorizationContext = {
		loading: contextLoading || needsAdminProbe,
		error: error?.message,
		authenticated,
		platformPermissions,
		shelters,
		currentShelter,
		selectShelter,
		switching,
		canPlatform,
		canShelter,
		refresh,
		homeRoute,
	};

	return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useBackofficeAuth = (): BackofficeAuthorizationContext => {
	const ctx = useContext(Ctx);
	if (!ctx)
		throw new Error(
			"useBackofficeAuth must be used within BackofficeAuthProvider"
		);
	return ctx;
};
