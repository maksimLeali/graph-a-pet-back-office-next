import { describe, expect, it } from "vitest";

import { computeHomeRoute, computeSwitchRoute } from "../homeRoute";
import { ShelterPermissions } from "@/lib/permissions";

const shelter = (id: string, permissions: string[] = []) => ({
	shelter: { id },
	permissions,
});

describe("computeHomeRoute", () => {
	it("manda al platform chi ha permission platform", () => {
		expect(computeHomeRoute(true, [shelter("a")], null)).toBe(
			"/platform/dashboard"
		);
	});

	it("403 senza permission platform e senza rifugi", () => {
		expect(computeHomeRoute(false, [], null)).toBe("/403");
	});

	it("redirect diretto con un solo rifugio", () => {
		expect(computeHomeRoute(false, [shelter("a")], null)).toBe(
			"/shelters/a/dashboard"
		);
	});

	it("più rifugi: usa l'ultimo valido", () => {
		expect(
			computeHomeRoute(false, [shelter("a"), shelter("b")], "b")
		).toBe("/shelters/b/dashboard");
	});

	it("più rifugi: lastShelterId non più autorizzato viene ignorato", () => {
		expect(
			computeHomeRoute(false, [shelter("a"), shelter("b")], "c")
		).toBe("/select-shelter");
	});

	it("più rifugi senza ultimo valido: selettore", () => {
		expect(
			computeHomeRoute(false, [shelter("a"), shelter("b")], null)
		).toBe("/select-shelter");
	});
});

describe("computeSwitchRoute", () => {
	it("mantiene la sezione se il nuovo rifugio ha la permission", () => {
		expect(
			computeSwitchRoute(
				shelter("b", [ShelterPermissions.INVENTORY_READ]),
				"inventory"
			)
		).toBe("/shelters/b/inventory");
	});

	it("fallback a dashboard se la permission manca nel nuovo rifugio", () => {
		expect(computeSwitchRoute(shelter("b", []), "inventory")).toBe(
			"/shelters/b/dashboard"
		);
	});

	it("sezione sconosciuta: dashboard", () => {
		expect(computeSwitchRoute(shelter("b", []), "not-a-section")).toBe(
			"/shelters/b/dashboard"
		);
	});

	it("nessuna sezione corrente: dashboard", () => {
		expect(computeSwitchRoute(shelter("b", []), null)).toBe(
			"/shelters/b/dashboard"
		);
	});
});
