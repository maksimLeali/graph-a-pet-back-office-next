import { describe, expect, it } from "vitest";

import { accessLabel } from "../roleLabels";

describe("accessLabel", () => {
	it("PLATFORM_ADMIN mode: etichetta esplicita, mai i ruoli del rifugio", () => {
		expect(
			accessLabel({
				accessMode: "PLATFORM_ADMIN",
				roles: [],
				platformOverrideActive: true,
			})
		).toBe("Platform admin");
	});

	it("membership pura: ruoli del rifugio", () => {
		expect(
			accessLabel({
				accessMode: "MEMBERSHIP",
				roles: ["SHELTER_MANAGER"],
				platformOverrideActive: false,
			})
		).toBe("Manager");
	});

	it("membership + privilegio platform: distinzione esplicita", () => {
		expect(
			accessLabel({
				accessMode: "MEMBERSHIP",
				roles: ["SHELTER_MANAGER"],
				platformOverrideActive: true,
			})
		).toBe("Manager + platform");
	});

	it("ruolo sconosciuto: codice grezzo, fallback 'Membro' se vuoto", () => {
		expect(
			accessLabel({
				accessMode: "MEMBERSHIP",
				roles: ["CUSTOM_ROLE"],
				platformOverrideActive: false,
			})
		).toBe("CUSTOM_ROLE");
		expect(
			accessLabel({
				accessMode: "MEMBERSHIP",
				roles: [],
				platformOverrideActive: false,
			})
		).toBe("Membro");
	});
});
