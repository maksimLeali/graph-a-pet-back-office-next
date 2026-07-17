import { ShelterPermissions } from "@/lib/permissions";

/**
 * Sezioni dell'area rifugio (/shelters/:shelterId/*). Ogni voce dichiara la
 * permission necessaria: la sidebar mostra solo le voci autorizzate e le
 * route guard la ri-verificano prima di renderizzare la pagina.
 */
export type ShelterSection = {
	section: string;
	label: string;
	icon: string;
	permission: string;
};

export const SHELTER_SECTIONS: ShelterSection[] = [
	{
		section: "dashboard",
		label: "Dashboard",
		icon: "◧",
		permission: ShelterPermissions.READ,
	},
	{
		section: "tasks",
		label: "Task",
		icon: "☰",
		permission: ShelterPermissions.TASKS_READ,
	},
	{
		section: "walks",
		label: "Passeggiate",
		icon: "◔",
		permission: ShelterPermissions.WALKS_READ,
	},
	{
		section: "pets",
		label: "Animali",
		icon: "♞",
		permission: ShelterPermissions.PETS_READ,
	},
	{
		section: "people",
		label: "Persone",
		icon: "◉",
		permission: ShelterPermissions.PEOPLE_READ,
	},
	{
		section: "members",
		label: "Membri",
		icon: "◎",
		permission: ShelterPermissions.MEMBERS_READ,
	},
	{
		section: "inventory",
		label: "Inventario",
		icon: "▤",
		permission: ShelterPermissions.INVENTORY_READ,
	},
	{
		section: "boxes",
		label: "Box",
		icon: "▣",
		permission: ShelterPermissions.BOXES_READ,
	},
	{
		section: "map",
		label: "Mappa",
		icon: "⌘",
		permission: ShelterPermissions.MAP_READ,
	},
	{
		section: "roles",
		label: "Ruoli",
		icon: "◈",
		permission: ShelterPermissions.ROLES_READ,
	},
	{
		section: "settings",
		label: "Impostazioni",
		icon: "⚙",
		permission: ShelterPermissions.UPDATE,
	},
];

export const sectionPermission = (section: string): string | undefined =>
	SHELTER_SECTIONS.find((s) => s.section === section)?.permission;
