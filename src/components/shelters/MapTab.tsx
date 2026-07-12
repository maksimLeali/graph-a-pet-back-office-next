"use client";

/* eslint-disable react-hooks/set-state-in-effect --
 * editor mappa portato dall'app: clamp/hydrate/dirty sincronizzano lo stato
 * locale del layout negli effect (draft non salvato, fuori da Apollo). */

import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";

import { useListShelterPetsBoQuery } from "@/graphql/__generated__/queries.generated";
import {
	FullShelterMapBoFragment,
	useListShelterMapsBoQuery,
	useGetShelterMapBoLazyQuery,
	useCreateShelterMapBoMutation,
	useUpdateShelterMapBoMutation,
	useSaveShelterMapLayoutBoMutation,
	useAssignPetToBoxBoMutation,
	useReleasePetFromBoxBoMutation,
} from "@/graphql/__generated__/map.generated";
import { AreaType, MapElementType } from "@/types";
import { Spinner } from "@/components/ui/Spinner";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Badge, RowButton } from "@/components/cells";
import { $color, $uw } from "@/theme";

import { MapCanvas, CanvasShape } from "./MapCanvas";
import { FormFoot, FormGrid, EmptyText } from "./common";

type LZone = {
	key: string;
	id?: string;
	name: string;
	x: number;
	y: number;
	width: number;
	height: number;
	color?: string | null;
};
type LArea = {
	key: string;
	id?: string;
	zone_id?: string | null;
	name: string;
	area_type: AreaType;
	x: number;
	y: number;
	width: number;
	height: number;
	color?: string | null;
};
type LBox = {
	key: string;
	id?: string;
	zone_id?: string | null;
	area_id?: string | null;
	label: string;
	x: number;
	y: number;
	width: number;
	height: number;
	rotation: number;
	capacity: number;
	status?: string;
	is_out_of_service: boolean;
	occupants: { occId: string; shelterPetId: string; name: string }[];
};
type LElement = {
	key: string;
	id?: string;
	element_type: MapElementType;
	x: number;
	y: number;
	width: number;
	height: number;
	rotation: number;
	color?: string | null;
	label?: string | null;
};

const STATUS_FILL: Record<string, string> = {
	AVAILABLE: "#ffb74d",
	OCCUPIED: "#81c784",
	FULL: "#2e7d32",
	NEEDS_CLEANING: "#ffd54f",
	OUT_OF_SERVICE: "#e53935",
};

const AREA_TYPE_OPTIONS = [
	{ value: "KENNEL", label: "Box/Recinti" },
	{ value: "COMMON", label: "Comune" },
	{ value: "MEDICAL", label: "Sanitaria" },
	{ value: "QUARANTINE", label: "Quarantena" },
	{ value: "PLAYGROUND", label: "Sgambatoio" },
	{ value: "OUTDOOR", label: "Esterno" },
	{ value: "OFFICE", label: "Uffici" },
	{ value: "STORAGE", label: "Magazzino" },
	{ value: "OTHER", label: "Altro" },
];

const ELEMENT_TYPE_OPTIONS = [
	{ value: "WALL", label: "Muro" },
	{ value: "DOOR", label: "Porta" },
	{ value: "GATE", label: "Cancello" },
	{ value: "TREE", label: "Albero" },
	{ value: "BENCH", label: "Panchina" },
	{ value: "WATER_POINT", label: "Punto acqua" },
	{ value: "FEEDING_POINT", label: "Punto cibo" },
	{ value: "OTHER", label: "Altro" },
];

let tmpCounter = 0;
const tmpKey = (p: string) => `tmp_${p}_${Date.now()}_${tmpCounter++}`;
const isTmp = (k: string) => k.startsWith("tmp_");
// uuid client-side per zone nuove: usato sia come key sia come id, così box/area
// possono referenziarne lo zone_id nello stesso batch saveShelterMapLayout
const genId = (): string =>
	typeof crypto !== "undefined" && "randomUUID" in crypto
		? crypto.randomUUID()
		: `zid_${Date.now()}_${tmpCounter++}_${Math.random().toString(36).slice(2)}`;

// naming per copia/incolla: se il nome finisce con un numero -> incrementa
// (saltando gli esistenti), altrimenti aggiunge " 1", " 2", ...
const nextName = (name: string, existing: string[]): string => {
	const set = new Set(existing);
	const m = name.match(/^(.*?)\s*(\d+)$/);
	const base = (m ? m[1] : name).trim() || name.trim() || "1";
	let n = m ? parseInt(m[2], 10) + 1 : 1;
	let candidate = `${base} ${n}`;
	while (set.has(candidate)) {
		n++;
		candidate = `${base} ${n}`;
	}
	return candidate;
};

type RectShape = {
	key: string;
	x: number;
	y: number;
	width: number;
	height: number;
};

export const MapTab: React.FC<{ shelterId: string }> = ({ shelterId }) => {
	const [mapId, setMapId] = useState<string | null>(null);
	const [zones, setZones] = useState<LZone[]>([]);
	const [areas, setAreas] = useState<LArea[]>([]);
	const [boxes, setBoxes] = useState<LBox[]>([]);
	const [elements, setElements] = useState<LElement[]>([]);
	const [dims, setDims] = useState({ width: 20, height: 20 });
	const savedDims = useRef({ width: 20, height: 20 });
	const deleted = useRef({
		zones: [] as string[],
		areas: [] as string[],
		boxes: [] as string[],
		elements: [] as string[],
	});
	const [editMode, setEditMode] = useState(false);
	const [selectedKey, setSelectedKey] = useState<string | null>(null);
	const [tapStack, setTapStack] = useState<CanvasShape[]>([]);
	const [focusShape, setFocusShape] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
	// zona attiva: box/area nuovi ci finiscono dentro (vincolo zone_id NOT NULL)
	const [activeZoneKey, setActiveZoneKey] = useState<string | null>(null);
	// spostando zona/area muove anche i contenuti; OFF → solo il selezionato
	const [selectAll, setSelectAll] = useState(true);
	const [dirty, setDirty] = useState(false);
	const snapshotRef = useRef("");
	const rebaselineRef = useRef(false);
	const [assignBoxKey, setAssignBoxKey] = useState<string | null>(null);
	const [pulseKey, setPulseKey] = useState<string | null>(null);
	const [findOpen, setFindOpen] = useState(false);
	const [clipboard, setClipboard] = useState<
		| { kind: "box"; data: LBox }
		| { kind: "area"; data: LArea }
		| { kind: "zone"; data: LZone }
		| { kind: "element"; data: LElement }
		| null
	>(null);
	const initializedFor = useRef<string | null>(null);

	// create-map form
	const [newName, setNewName] = useState("Mappa");
	const [newW, setNewW] = useState(30);
	const [newH, setNewH] = useState(20);

	const { data: mapsData, loading: mapsLoading } = useListShelterMapsBoQuery({
		fetchPolicy: "cache-and-network",
		variables: {
			commonSearch: {
				page: 0,
				page_size: 20,
				filters: { fixed: [{ key: "shelter_id", value: shelterId }] },
			},
		},
		onError: () => toast.error("Errore nel caricamento delle mappe"),
	});

	const [loadMap, { data: mapData }] = useGetShelterMapBoLazyQuery({
		fetchPolicy: "network-only",
	});
	const [createMap, { loading: creating }] = useCreateShelterMapBoMutation();
	const [saveLayout, { loading: saving }] =
		useSaveShelterMapLayoutBoMutation();
	const [updateMap, { loading: updatingMap }] =
		useUpdateShelterMapBoMutation();
	const [assignPet] = useAssignPetToBoxBoMutation();
	const [releasePet] = useReleasePetFromBoxBoMutation();

	const { data: petsData } = useListShelterPetsBoQuery({
		variables: {
			search: {
				page: 0,
				page_size: 200,
				filters: { fixed: [{ key: "shelter_id", value: shelterId }] },
			},
		},
	});
	const shelterPets = (petsData?.listShelterPets?.items ?? []).filter(
		(p): p is NonNullable<typeof p> => !!p
	);

	// when map shrinks, clamp all shapes inside the new bounds
	useEffect(() => {
		const clamp = <
			T extends { x: number; y: number; width: number; height: number },
		>(
			s: T
		): T => {
			const nw = Math.max(1, Math.min(s.width, dims.width));
			const nh = Math.max(1, Math.min(s.height, dims.height));
			const nx = Math.max(0, Math.min(s.x, dims.width - nw));
			const ny = Math.max(0, Math.min(s.y, dims.height - nh));
			if (nw === s.width && nh === s.height && nx === s.x && ny === s.y)
				return s;
			return { ...s, x: nx, y: ny, width: nw, height: nh };
		};
		setBoxes((arr) => arr.map(clamp));
		setAreas((arr) => arr.map(clamp));
		setZones((arr) => arr.map(clamp));
		setElements((arr) => arr.map(clamp));
	}, [dims.width, dims.height]);

	// pick first map
	const maps = (mapsData?.listShelterMaps?.items ?? []).filter(
		(m): m is NonNullable<typeof m> => !!m
	);
	useEffect(() => {
		if (!mapId && maps.length > 0) {
			setMapId(maps[0].id);
			loadMap({ variables: { id: maps[0].id } });
		}
	}, [maps, mapId]);

	// hydrate local state from fetched map
	const fetchedMap = mapData?.getShelterMap?.map;
	const hydrate = (m: FullShelterMapBoFragment) => {
		setDims({ width: m.width, height: m.height });
		savedDims.current = { width: m.width, height: m.height };
		setZones(
			(m.zones ?? []).map((z) => ({
				key: z.id,
				id: z.id,
				name: z.name,
				x: z.x,
				y: z.y,
				width: z.width,
				height: z.height,
				color: z.color,
			}))
		);
		setAreas(
			(m.areas ?? []).map((a) => ({
				key: a.id,
				id: a.id,
				zone_id: a.zone?.id ?? null,
				name: a.name,
				area_type: a.area_type,
				x: a.x,
				y: a.y,
				width: a.width,
				height: a.height,
				color: a.color,
			}))
		);
		setBoxes(
			(m.boxes ?? []).map((b) => ({
				key: b.id,
				id: b.id,
				zone_id: b.zone?.id ?? null,
				area_id: b.area?.id ?? null,
				label: b.label,
				x: b.x,
				y: b.y,
				width: b.width,
				height: b.height,
				rotation: b.rotation,
				capacity: b.capacity,
				status: b.status,
				is_out_of_service: b.is_out_of_service,
				occupants: (b.occupancy_history?.items ?? [])
					.filter((o) => o && !o.exited_at)
					.map((o) => ({
						occId: o!.id,
						shelterPetId: o!.shelter_pet?.id ?? "",
						name: o!.shelter_pet?.pet?.name ?? "-",
					})),
			}))
		);
		setElements(
			(m.elements ?? []).map((e) => ({
				key: e.id,
				id: e.id,
				element_type: e.element_type,
				x: e.x,
				y: e.y,
				width: e.width,
				height: e.height,
				rotation: e.rotation,
				color: e.color,
				label: e.label,
			}))
		);
		deleted.current = { zones: [], areas: [], boxes: [], elements: [] };
		rebaselineRef.current = true;
	};

	// firma serializzata del layout per lo stato dirty
	const serialize = () =>
		JSON.stringify({
			dims,
			del: deleted.current,
			zones: zones.map((z) => [
				z.id,
				z.name,
				z.x,
				z.y,
				z.width,
				z.height,
				z.color,
			]),
			areas: areas.map((a) => [
				a.key,
				a.id,
				a.zone_id,
				a.name,
				a.area_type,
				a.x,
				a.y,
				a.width,
				a.height,
				a.color,
			]),
			boxes: boxes.map((b) => [
				b.key,
				b.id,
				b.zone_id,
				b.area_id,
				b.label,
				b.x,
				b.y,
				b.width,
				b.height,
				b.rotation,
				b.capacity,
			]),
			elements: elements.map((e) => [
				e.key,
				e.id,
				e.element_type,
				e.x,
				e.y,
				e.width,
				e.height,
				e.rotation,
				e.color,
				e.label,
			]),
		});

	useEffect(() => {
		if (fetchedMap && initializedFor.current !== fetchedMap.id) {
			initializedFor.current = fetchedMap.id;
			hydrate(fetchedMap);
		}
	}, [fetchedMap]);

	useEffect(() => {
		const cur = serialize();
		if (rebaselineRef.current) {
			rebaselineRef.current = false;
			snapshotRef.current = cur;
			setDirty(false);
			return;
		}
		setDirty(cur !== snapshotRef.current);
	}, [zones, areas, boxes, elements, dims]);

	// refresh/chiusura tab del browser mentre draft
	useEffect(() => {
		if (!dirty) return;
		const handler = (e: BeforeUnloadEvent) => {
			e.preventDefault();
			e.returnValue = "";
		};
		window.addEventListener("beforeunload", handler);
		return () => window.removeEventListener("beforeunload", handler);
	}, [dirty]);

	const shapes = useMemo<CanvasShape[]>(() => {
		const out: CanvasShape[] = [];
		for (const z of zones)
			out.push({
				key: z.key,
				kind: "zone",
				x: z.x,
				y: z.y,
				width: Math.max(1, z.width),
				height: Math.max(1, z.height),
				fill: z.color || "rgba(63,81,181,0.08)",
				stroke:
					z.key === activeZoneKey
						? "rgba(63,81,181,0.9)"
						: "rgba(63,81,181,0.5)",
				strokeWidth: z.key === activeZoneKey ? 3 : 2,
				label: z.name,
				textColor: "rgba(40,53,147,0.75)",
			});
		for (const a of areas)
			out.push({
				key: a.key,
				kind: "area",
				x: a.x,
				y: a.y,
				width: Math.max(1, a.width),
				height: Math.max(1, a.height),
				fill: a.color || "rgba(120,120,120,0.15)",
				stroke: "rgba(0,0,0,0.25)",
				strokeWidth: 1,
				label: a.name,
				textColor: "rgba(0,0,0,0.55)",
			});
		for (const e of elements)
			out.push({
				key: e.key,
				kind: "element",
				x: e.x,
				y: e.y,
				width: Math.max(1, e.width),
				height: Math.max(1, e.height),
				rotation: e.rotation,
				fill: e.color || "#8d8d8d",
				stroke: "rgba(0,0,0,0.3)",
				strokeWidth: 1,
				label: e.label || undefined,
				textColor: "#fff",
			});
		for (const b of boxes) {
			const status = b.is_out_of_service
				? "OUT_OF_SERVICE"
				: b.status || "AVAILABLE";
			out.push({
				key: b.key,
				kind: "box",
				x: b.x,
				y: b.y,
				width: Math.max(1, b.width),
				height: Math.max(1, b.height),
				rotation: b.rotation,
				fill: STATUS_FILL[status] || STATUS_FILL.AVAILABLE,
				stroke: "rgba(0,0,0,0.35)",
				strokeWidth: 1,
				label: b.label,
				sub:
					b.capacity > 1
						? `${b.occupants.length}/${b.capacity}`
						: undefined,
				textColor: "#1c1c1c",
			});
		}
		return out;
	}, [zones, areas, boxes, elements, activeZoneKey]);

	const findShape = (key: string): RectShape | undefined =>
		boxes.find((b) => b.key === key) ||
		areas.find((a) => a.key === key) ||
		zones.find((z) => z.key === key) ||
		elements.find((e) => e.key === key);

	// il centro di s cade dentro il rettangolo r
	const centerIn = (s: RectShape, r: RectShape): boolean => {
		const cx = s.x + s.width / 2;
		const cy = s.y + s.height / 2;
		return (
			cx >= r.x && cx <= r.x + r.width && cy >= r.y && cy <= r.y + r.height
		);
	};

	// insieme di key da spostare insieme al primary (gruppo ON)
	const keysToMove = (key: string): Set<string> => {
		if (!selectAll) return new Set([key]);
		const z = zones.find((s) => s.key === key);
		if (z) {
			const ks = new Set([key]);
			areas.forEach((a) => centerIn(a, z) && ks.add(a.key));
			boxes.forEach((b) => centerIn(b, z) && ks.add(b.key));
			return ks;
		}
		const a = areas.find((s) => s.key === key);
		if (a) {
			const ks = new Set([key]);
			boxes.forEach((b) => centerIn(b, a) && ks.add(b.key));
			return ks;
		}
		return new Set([key]);
	};

	const translateKeys = (keys: Set<string>, dx: number, dy: number) => {
		if (dx === 0 && dy === 0) return;
		const mv = <T extends RectShape>(arr: T[]) =>
			arr.map((s) =>
				keys.has(s.key) ? { ...s, x: s.x + dx, y: s.y + dy } : s
			);
		setBoxes(mv);
		setAreas(mv);
		setZones(mv);
		setElements(mv);
	};

	const clampToMap = (
		x: number,
		y: number,
		w: number,
		h: number,
		minSize = 1
	): { x: number; y: number; width: number; height: number } => {
		const nw = Math.max(minSize, Math.min(w, dims.width));
		const nh = Math.max(minSize, Math.min(h, dims.height));
		const nx = Math.max(0, Math.min(x, dims.width - nw));
		const ny = Math.max(0, Math.min(y, dims.height - nh));
		return { x: nx, y: ny, width: nw, height: nh };
	};

	const dragShape = (key: string, dx: number, dy: number) => {
		const primary = findShape(key);
		if (!primary) return;
		const np = clampToMap(
			primary.x + dx,
			primary.y + dy,
			primary.width,
			primary.height
		);
		translateKeys(keysToMove(key), np.x - primary.x, np.y - primary.y);
	};

	const moveShape = (key: string, x: number, y: number) => {
		const primary = findShape(key);
		if (!primary) return;
		const np = clampToMap(x, y, primary.width, primary.height);
		translateKeys(keysToMove(key), np.x - primary.x, np.y - primary.y);
	};

	const resizeShape = (
		key: string,
		next: { x: number; y: number; width: number; height: number }
	) => {
		const clamped = clampToMap(next.x, next.y, next.width, next.height);
		const upd = <T extends RectShape>(arr: T[]) =>
			arr.map((s) => (s.key === key ? { ...s, ...clamped } : s));
		if (boxes.some((b) => b.key === key)) setBoxes(upd);
		else if (areas.some((a) => a.key === key)) setAreas(upd);
		else if (zones.some((z) => z.key === key)) setZones(upd);
		else setElements(upd);
	};

	const updateSelectedSize = (patch: { width?: number; height?: number }) => {
		if (!selectedKey) return;
		const apply = <T extends RectShape>(arr: T[]) =>
			arr.map((s) => {
				if (s.key !== selectedKey) return s;
				const nw = Math.max(0, patch.width ?? s.width);
				const nh = Math.max(0, patch.height ?? s.height);
				return { ...s, ...clampToMap(s.x, s.y, nw, nh, 0) };
			});
		if (boxes.some((b) => b.key === selectedKey)) setBoxes(apply);
		else if (areas.some((a) => a.key === selectedKey)) setAreas(apply);
		else if (zones.some((z) => z.key === selectedKey)) setZones(apply);
		else setElements(apply);
	};

	// zona che contiene il centro del rettangolo; la più piccola se annidate
	const zoneAt = (
		x: number,
		y: number,
		w: number,
		h: number
	): LZone | null => {
		const cx = x + w / 2;
		const cy = y + h / 2;
		let best: LZone | null = null;
		for (const z of zones) {
			if (
				cx >= z.x &&
				cx <= z.x + z.width &&
				cy >= z.y &&
				cy <= z.y + z.height
			) {
				if (!best || z.width * z.height < best.width * best.height)
					best = z;
			}
		}
		return best;
	};

	// dimensioni minime mappa: deve contenere tutte le zone
	const minMapDims = (): { width: number; height: number } => ({
		width: Math.max(1, ...zones.map((z) => z.x + z.width)),
		height: Math.max(1, ...zones.map((z) => z.y + z.height)),
	});

	const targetZone = (): LZone | null => {
		const active = zones.find((z) => z.key === activeZoneKey);
		if (active) return active;
		return zoneAt(0, 0, dims.width, dims.height) ?? zones[0] ?? null;
	};

	const addZone = () => {
		const zid = genId();
		const bounds = { x: dims.width / 2 - 8, y: dims.height / 2 - 8, width: 16, height: 16 };
		setZones((z) => [
			...z,
			{
				key: zid,
				id: zid,
				name: nextName("Zona", z.map((x) => x.name)),
				...bounds,
				color: "rgba(63,81,181,0.08)",
			},
		]);
		setSelectedKey(zid);
		setActiveZoneKey(zid);
		setFocusShape(bounds);
	};

	const addBox = () => {
		const z = targetZone();
		if (!z) {
			toast.error("Crea prima una zona");
			return;
		}
		setActiveZoneKey(z.key);
		const k = tmpKey("box");
		const bounds = clampToMap(z.x + z.width / 2 - 7.5, z.y + z.height / 2 - 7.5, 15, 15);
		setBoxes((b) => [
			...b,
			{
				key: k,
				zone_id: z.id,
				label: nextName("Box", b.map((x) => x.label)),
				...bounds,
				rotation: 0,
				capacity: 1,
				status: "AVAILABLE",
				is_out_of_service: false,
				occupants: [],
			},
		]);
		setSelectedKey(k);
		setFocusShape(bounds);
	};

	const addArea = () => {
		const z = targetZone();
		if (!z) {
			toast.error("Crea prima una zona");
			return;
		}
		setActiveZoneKey(z.key);
		const k = tmpKey("area");
		const bounds = clampToMap(z.x + z.width / 2 - 15, z.y + z.height / 2 - 15, 30, 30);
		setAreas((a) => [
			...a,
			{
				key: k,
				zone_id: z.id,
				name: nextName("Area", a.map((x) => x.name)),
				area_type: AreaType.Kennel,
				...bounds,
				color: "#4CAF5033",
			},
		]);
		setSelectedKey(k);
		setFocusShape(bounds);
	};

	const addElement = () => {
		const k = tmpKey("el");
		const bounds = { x: dims.width / 2 - 4, y: dims.height / 2 - 0.5, width: 8, height: 1 };
		setElements((e) => [
			...e,
			{
				key: k,
				element_type: MapElementType.Wall,
				...bounds,
				rotation: 0,
				color: "#5b5b5b",
			},
		]);
		setSelectedKey(k);
		setFocusShape(bounds);
	};

	const deleteSelected = () => {
		if (!selectedKey) return;
		const key = selectedKey;
		const drop = (id?: string, bucket?: string[]) => {
			if (id && !isTmp(key) && bucket) bucket.push(id);
		};
		const b = boxes.find((x) => x.key === key);
		const a = areas.find((x) => x.key === key);
		const e = elements.find((x) => x.key === key);
		const z = zones.find((x) => x.key === key);
		if (b) {
			drop(b.id, deleted.current.boxes);
			setBoxes((arr) => arr.filter((x) => x.key !== key));
		} else if (a) {
			drop(a.id, deleted.current.areas);
			setAreas((arr) => arr.filter((x) => x.key !== key));
		} else if (e) {
			drop(e.id, deleted.current.elements);
			setElements((arr) => arr.filter((x) => x.key !== key));
		} else if (z) {
			// cancellando la zona spariscono anche box/aree contenuti (CASCADE)
			const childOf = (s: RectShape) =>
				zoneAt(s.x, s.y, s.width, s.height)?.key === key;
			setBoxes((arr) =>
				arr.filter((bb) => {
					if (!childOf(bb)) return true;
					if (bb.id && !isTmp(bb.key)) deleted.current.boxes.push(bb.id);
					return false;
				})
			);
			setAreas((arr) =>
				arr.filter((aa) => {
					if (!childOf(aa)) return true;
					if (aa.id && !isTmp(aa.key)) deleted.current.areas.push(aa.id);
					return false;
				})
			);
			if (z.id) deleted.current.zones.push(z.id);
			setZones((arr) => arr.filter((x) => x.key !== key));
			if (activeZoneKey === key) setActiveZoneKey(null);
		}
		setSelectedKey(null);
	};

	const getSelected = ():
		| { kind: "box"; data: LBox }
		| { kind: "area"; data: LArea }
		| { kind: "zone"; data: LZone }
		| { kind: "element"; data: LElement }
		| null => {
		if (!selectedKey) return null;
		const b = boxes.find((x) => x.key === selectedKey);
		if (b) return { kind: "box", data: b };
		const a = areas.find((x) => x.key === selectedKey);
		if (a) return { kind: "area", data: a };
		const z = zones.find((x) => x.key === selectedKey);
		if (z) return { kind: "zone", data: z };
		const e = elements.find((x) => x.key === selectedKey);
		if (e) return { kind: "element", data: e };
		return null;
	};

	const onCopy = () => {
		const sel = getSelected();
		if (!sel) return;
		setClipboard(sel);
		toast.success("Copiato");
	};

	const onCut = () => {
		const sel = getSelected();
		if (!sel) return;
		setClipboard(sel);
		deleteSelected();
	};

	const onPaste = () => {
		if (!clipboard) return;
		const OFFSET = 1;
		if (clipboard.kind === "box") {
			const src = clipboard.data;
			const pos = clampToMap(
				src.x + OFFSET,
				src.y + OFFSET,
				src.width,
				src.height
			);
			const k = tmpKey("box");
			const zid = zoneIdForRect(pos, src.zone_id);
			setBoxes((arr) => [
				...arr,
				{
					...src,
					key: k,
					id: undefined,
					zone_id: zid,
					label: nextName(
						src.label,
						arr.map((b) => b.label)
					),
					x: pos.x,
					y: pos.y,
					width: pos.width,
					height: pos.height,
					occupants: [],
					status: "AVAILABLE",
					is_out_of_service: false,
				},
			]);
			setSelectedKey(k);
		} else if (clipboard.kind === "area") {
			const src = clipboard.data;
			const pos = clampToMap(
				src.x + OFFSET,
				src.y + OFFSET,
				src.width,
				src.height
			);
			const k = tmpKey("area");
			const zid = zoneIdForRect(pos, src.zone_id);
			setAreas((arr) => [
				...arr,
				{
					...src,
					key: k,
					id: undefined,
					zone_id: zid,
					name: nextName(
						src.name,
						arr.map((a) => a.name)
					),
					x: pos.x,
					y: pos.y,
					width: pos.width,
					height: pos.height,
				},
			]);
			setSelectedKey(k);
		} else if (clipboard.kind === "zone") {
			const src = clipboard.data;
			const pos = clampToMap(
				src.x + OFFSET,
				src.y + OFFSET,
				src.width,
				src.height
			);
			const zid = genId();
			setZones((arr) => [
				...arr,
				{
					...src,
					key: zid,
					id: zid,
					name: nextName(
						src.name,
						arr.map((z) => z.name)
					),
					x: pos.x,
					y: pos.y,
					width: pos.width,
					height: pos.height,
				},
			]);
			setSelectedKey(zid);
			setActiveZoneKey(zid);
		} else {
			const src = clipboard.data;
			const pos = clampToMap(
				src.x + OFFSET,
				src.y + OFFSET,
				src.width,
				src.height
			);
			const k = tmpKey("el");
			setElements((arr) => [
				...arr,
				{
					...src,
					key: k,
					id: undefined,
					x: pos.x,
					y: pos.y,
					width: pos.width,
					height: pos.height,
				},
			]);
			setSelectedKey(k);
		}
	};

	// area che contiene il centro del box; la più piccola se annidate
	const areaIdForBox = (b: LBox): string | null => {
		const cx = b.x + b.width / 2;
		const cy = b.y + b.height / 2;
		let best: LArea | null = null;
		for (const a of areas) {
			if (
				cx >= a.x &&
				cx <= a.x + a.width &&
				cy >= a.y &&
				cy <= a.y + a.height
			) {
				if (!best || a.width * a.height < best.width * best.height)
					best = a;
			}
		}
		if (!best) return null;
		if (isTmp(best.key)) return b.area_id ?? null;
		return best.id ?? null;
	};

	// zone_id (NOT NULL) da geometria; fallback allo zone_id memorizzato
	const zoneIdForRect = (
		s: { x: number; y: number; width: number; height: number },
		stored?: string | null
	): string | null => {
		const z = zoneAt(s.x, s.y, s.width, s.height);
		return z?.id ?? stored ?? null;
	};

	const handleSelectShape = (key: string | null) => {
		setTapStack([]);
		if (!key) {
			setSelectedKey(null);
			return;
		}
		if (zones.some((z) => z.key === key)) setActiveZoneKey(key);
		setSelectedKey(key);
	};

	const handleStackTap = (stack: CanvasShape[]) => setTapStack(stack);

	const selectFromStack = (s: CanvasShape) => {
		setTapStack([]);
		if (!editMode && s.kind === "box") {
			setAssignBoxKey(s.key);
		} else {
			handleSelectShape(s.key);
		}
	};

	const onSave = async () => {
		if (!mapId) return;
		const boxZone = boxes.map((b) => ({
			b,
			zid: zoneIdForRect(b, b.zone_id),
		}));
		const areaZone = areas.map((a) => ({
			a,
			zid: zoneIdForRect(a, a.zone_id),
		}));
		if (boxZone.some((x) => !x.zid) || areaZone.some((x) => !x.zid)) {
			toast.error("Ogni box/area deve stare dentro una zona");
			return;
		}
		// normalizzazione al save: ogni zona cresce per contenere i suoi box;
		// la mappa cresce per contenere tutto
		const grownZones = zones.map((z) => {
			const kids = boxZone.filter((x) => x.zid === z.id).map((x) => x.b);
			if (kids.length === 0) return z;
			const minX = Math.min(z.x, ...kids.map((b) => b.x));
			const minY = Math.min(z.y, ...kids.map((b) => b.y));
			const maxX = Math.max(
				z.x + z.width,
				...kids.map((b) => b.x + b.width)
			);
			const maxY = Math.max(
				z.y + z.height,
				...kids.map((b) => b.y + b.height)
			);
			return {
				...z,
				x: minX,
				y: minY,
				width: maxX - minX,
				height: maxY - minY,
			};
		});
		const right = (s: RectShape) => s.x + s.width;
		const bottom = (s: RectShape) => s.y + s.height;
		const allShapes: RectShape[] = [
			...grownZones,
			...areas,
			...boxes,
			...elements,
		];
		const finalW = Math.max(dims.width, 1, ...allShapes.map(right));
		const finalH = Math.max(dims.height, 1, ...allShapes.map(bottom));
		if (
			finalW !== savedDims.current.width ||
			finalH !== savedDims.current.height
		) {
			const upd = await updateMap({
				variables: {
					id: mapId,
					data: { width: finalW, height: finalH },
				},
			});
			if (!upd.data?.updateShelterMap?.success) {
				toast.error(
					upd.data?.updateShelterMap?.error?.message ??
						"Errore nel salvataggio della mappa"
				);
				return;
			}
		}
		const res = await saveLayout({
			variables: {
				map_id: mapId,
				data: {
					zones: grownZones.map((z) => ({
						// id sempre inviato: il backend fa upsert
						id: z.id,
						name: z.name,
						x: z.x,
						y: z.y,
						width: z.width,
						height: z.height,
						color: z.color,
					})),
					areas: areaZone.map(({ a, zid }) => ({
						id: isTmp(a.key) ? undefined : a.id,
						zone_id: zid!,
						name: a.name,
						area_type: a.area_type,
						x: a.x,
						y: a.y,
						width: a.width,
						height: a.height,
						color: a.color,
					})),
					boxes: boxZone.map(({ b, zid }) => ({
						id: isTmp(b.key) ? undefined : b.id,
						zone_id: zid!,
						// area ricalcolata dalla posizione (id o null)
						area_id: areaIdForBox(b),
						label: b.label,
						x: b.x,
						y: b.y,
						width: b.width,
						height: b.height,
						rotation: b.rotation,
						capacity: b.capacity,
					})),
					elements: elements.map((e) => ({
						id: isTmp(e.key) ? undefined : e.id,
						element_type: e.element_type,
						x: e.x,
						y: e.y,
						width: e.width,
						height: e.height,
						rotation: e.rotation,
						color: e.color,
						label: e.label,
					})),
					deleted_zone_ids: deleted.current.zones,
					deleted_area_ids: deleted.current.areas,
					deleted_box_ids: deleted.current.boxes,
					deleted_element_ids: deleted.current.elements,
				},
			},
		});
		const m = res.data?.saveShelterMapLayout?.map;
		if (!res.data?.saveShelterMapLayout?.success || !m) {
			toast.error(
				res.data?.saveShelterMapLayout?.error?.message ??
					"Errore nel salvataggio del layout"
			);
			return;
		}
		hydrate(m);
		setEditMode(false);
		setSelectedKey(null);
		toast.success("Mappa salvata");
	};

	// refetch + re-hydrate coi dati freschi (occupanti)
	const refreshMap = async () => {
		if (!mapId) return;
		const res = await loadMap({ variables: { id: mapId } });
		const m = res.data?.getShelterMap?.map;
		if (m) hydrate(m);
	};

	const doRelease = async (occId: string) => {
		const res = await releasePet({ variables: { occupancy_id: occId } });
		if (!res.data?.releasePetFromBox?.success) {
			toast.error(
				res.data?.releasePetFromBox?.error?.message ??
					"Errore nel rilascio"
			);
			return;
		}
		toast.success("Animale rilasciato");
		refreshMap();
	};

	const doAssign = async (boxRealId: string, shelterPetId: string) => {
		const res = await assignPet({
			variables: { box_id: boxRealId, shelter_pet_id: shelterPetId },
		});
		if (!res.data?.assignPetToBox?.success) {
			toast.error(
				res.data?.assignPetToBox?.error?.message ??
					"Errore nell'assegnazione"
			);
			return;
		}
		toast.success("Animale assegnato");
		refreshMap();
	};

	const locatePet = (shelterPetId: string) => {
		const box = boxes.find((b) =>
			b.occupants.some((o) => o.shelterPetId === shelterPetId)
		);
		setFindOpen(false);
		if (!box) {
			toast("Animale non assegnato a nessun box", { icon: "⚠️" });
			return;
		}
		setPulseKey(box.key);
		setTimeout(() => setPulseKey(null), 1600);
	};

	if (mapsLoading && !mapId) return <Spinner />;

	// --- no map yet ---
	if (!mapsLoading && maps.length === 0 && !mapId) {
		return (
			<CreateWrap>
				<EmptyText>Nessuna mappa per questo rifugio</EmptyText>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						createMap({
							variables: {
								data: {
									shelter_id: shelterId,
									name: newName,
									width: newW,
									height: newH,
								},
							},
							onCompleted: ({ createShelterMap }) => {
								const m = createShelterMap.map;
								if (!createShelterMap.success || !m) {
									toast.error(
										createShelterMap.error?.message ??
											"Errore nella creazione della mappa"
									);
									return;
								}
								setMapId(m.id);
								initializedFor.current = m.id;
								hydrate(m);
								toast.success("Mappa creata");
							},
							onError: () =>
								toast.error("Errore nella creazione della mappa"),
						});
					}}
				>
					<FormGrid>
						<Input
							label="Nome"
							value={newName}
							onChange={(e) => setNewName(e.target.value)}
							required
						/>
						<Input
							label="Larghezza (m)"
							type="number"
							min={1}
							step={0.5}
							value={newW}
							onChange={(e) => setNewW(parseFloat(e.target.value) || 1)}
						/>
						<Input
							label="Altezza (m)"
							type="number"
							min={1}
							step={0.5}
							value={newH}
							onChange={(e) => setNewH(parseFloat(e.target.value) || 1)}
						/>
					</FormGrid>
					<FormFoot>
						<Button type="submit" loading={creating}>
							Crea mappa
						</Button>
					</FormFoot>
				</form>
			</CreateWrap>
		);
	}

	const selBox = boxes.find((b) => b.key === selectedKey);
	const selArea = areas.find((a) => a.key === selectedKey);
	const selZone = zones.find((z) => z.key === selectedKey);
	const selEl = elements.find((e) => e.key === selectedKey);
	const selAny = selBox || selArea || selZone || selEl;
	const assignBox = boxes.find((b) => b.key === assignBoxKey);
	const assignedIds = new Set(
		boxes.flatMap((b) => b.occupants.map((o) => o.shelterPetId))
	);

	return (
		<Wrap>
			<Bar>
				<MapName>{fetchedMap?.name ?? "Mappa"}</MapName>
				{dirty && <DraftBadge>Modifiche non salvate</DraftBadge>}
				<BarSpace />
				{editMode ? (
					<>
						<Button variant="ghost" type="button" onClick={addZone}>
							+ Zona
						</Button>
						<Button variant="ghost" type="button" onClick={addBox}>
							+ Box
						</Button>
						<Button variant="ghost" type="button" onClick={addArea}>
							+ Area
						</Button>
						<Button variant="ghost" type="button" onClick={addElement}>
							+ Elemento
						</Button>
						<Button
							type="button"
							loading={saving || updatingMap}
							onClick={onSave}
						>
							Salva
						</Button>
						<Button
							variant="ghost"
							type="button"
							onClick={() => {
								setEditMode(false);
								setSelectedKey(null);
							}}
						>
							Vista
						</Button>
					</>
				) : (
					<Button
						variant="ghost"
						type="button"
						onClick={() => {
							setEditMode(true);
							setSelectedKey(null);
							setAssignBoxKey(null);
						}}
					>
						Modifica
					</Button>
				)}
			</Bar>

			<Layout>
				<CanvasCol>
					{dims.width > 0 && (
						<MapCanvas
							mapWidth={dims.width}
							mapHeight={dims.height}
							shapes={shapes}
							selectedKey={selectedKey}
							editMode={editMode}
							onSelectShape={handleSelectShape}
							onStackTap={handleStackTap}
							focusShape={focusShape}
							onTapBox={(k) => setAssignBoxKey(k)}
							onDragShape={dragShape}
							onMoveShape={moveShape}
							onResizeShape={resizeShape}
							hasClipboard={!!clipboard}
							onCopy={onCopy}
							onCut={onCut}
							onPaste={onPaste}
							selectAll={selectAll}
							onToggleSelectAll={() => setSelectAll((v) => !v)}
							onFindPet={() => setFindOpen((v) => !v)}
							pulseKey={pulseKey}
						/>
					)}
					<Legend>
						<L $c={STATUS_FILL.AVAILABLE}>Disponibile</L>
						<L $c={STATUS_FILL.OCCUPIED}>Occupato</L>
						<L $c={STATUS_FILL.FULL}>Pieno</L>
						<L $c={STATUS_FILL.OUT_OF_SERVICE}>Fuori servizio</L>
					</Legend>
					{editMode && (
						<MapDims>
							<Input
								label="Larghezza mappa (m)"
								type="number"
								step={0.5}
								key={`mw-${dims.width}`}
								defaultValue={Number(dims.width.toFixed(2))}
								onBlur={(e) =>
									setDims((d) => ({
										...d,
										width: Math.max(
											minMapDims().width,
											parseFloat(e.target.value) || 1
										),
									}))
								}
							/>
							<Input
								label="Altezza mappa (m)"
								type="number"
								step={0.5}
								key={`mh-${dims.height}`}
								defaultValue={Number(dims.height.toFixed(2))}
								onBlur={(e) =>
									setDims((d) => ({
										...d,
										height: Math.max(
											minMapDims().height,
											parseFloat(e.target.value) || 1
										),
									}))
								}
							/>
						</MapDims>
					)}
				</CanvasCol>

				<SideCol>
					{/* stack picker: elementi sovrapposti */}
					{tapStack.length > 1 && (
						<Panel>
							<PanelHead>
								<PanelTitle>Sovrapposti</PanelTitle>
								<StackClose onClick={() => setTapStack([])}>✕</StackClose>
							</PanelHead>
							{tapStack.map((s, i) => (
								<StackItem
									key={s.key}
									$active={s.key === selectedKey}
									onClick={() => selectFromStack(s)}
								>
									<StackDot $fill={s.fill} $stroke={s.stroke} />
									<StackLabel>{s.label || kindLabel(s.kind)}</StackLabel>
									{i === 0 && <StackTop>↑</StackTop>}
								</StackItem>
							))}
						</Panel>
					)}
					{/* props panel (edit mode) */}
					{editMode && selAny && (
						<Panel>
							<PanelTitle>Proprietà</PanelTitle>
							<PanelGrid>
								<Input
									label="Larghezza (m)"
									type="number"
									step={0.5}
									key={`sw-${selectedKey}`}
									defaultValue={Number(selAny.width.toFixed(2))}
									onBlur={(e) =>
										updateSelectedSize({
											width: Math.max(
												1,
												parseFloat(e.target.value) || 1
											),
										})
									}
								/>
								<Input
									label="Altezza (m)"
									type="number"
									step={0.5}
									key={`sh-${selectedKey}`}
									defaultValue={Number(selAny.height.toFixed(2))}
									onBlur={(e) =>
										updateSelectedSize({
											height: Math.max(
												1,
												parseFloat(e.target.value) || 1
											),
										})
									}
								/>
							</PanelGrid>
							{selBox && (
								<>
									<Input
										label="Etichetta"
										value={selBox.label}
										onChange={(e) =>
											setBoxes((arr) =>
												arr.map((b) =>
													b.key === selBox.key
														? { ...b, label: e.target.value }
														: b
												)
											)
										}
									/>
									<Input
										label="Capienza"
										type="number"
										min={1}
										value={selBox.capacity}
										onChange={(e) =>
											setBoxes((arr) =>
												arr.map((b) =>
													b.key === selBox.key
														? {
																...b,
																capacity: Math.max(
																	1,
																	parseInt(e.target.value) || 1
																),
															}
														: b
												)
											)
										}
									/>
								</>
							)}
							{selArea && (
								<>
									<Input
										label="Nome"
										value={selArea.name}
										onChange={(e) =>
											setAreas((arr) =>
												arr.map((a) =>
													a.key === selArea.key
														? { ...a, name: e.target.value }
														: a
												)
											)
										}
									/>
									<Select
										label="Tipo area"
										options={AREA_TYPE_OPTIONS}
										value={selArea.area_type}
										onChange={(e) =>
											setAreas((arr) =>
												arr.map((a) =>
													a.key === selArea.key
														? {
																...a,
																area_type: e.target
																	.value as AreaType,
															}
														: a
												)
											)
										}
									/>
									<Input
										label="Colore"
										type="color"
										value={(selArea.color || "#4caf50").slice(0, 7)}
										onChange={(e) =>
											setAreas((arr) =>
												arr.map((a) =>
													a.key === selArea.key
														? {
																...a,
																color: `${e.target.value}55`,
															}
														: a
												)
											)
										}
									/>
								</>
							)}
							{selZone && (
								<>
									<Input
										label="Nome zona"
										value={selZone.name}
										onChange={(e) =>
											setZones((arr) =>
												arr.map((z) =>
													z.key === selZone.key
														? { ...z, name: e.target.value }
														: z
												)
											)
										}
									/>
									<Input
										label="Colore"
										type="color"
										value={(() => {
											const c = selZone.color || "#3f51b5";
											return c.startsWith("#")
												? c.slice(0, 7)
												: "#3f51b5";
										})()}
										onChange={(e) =>
											setZones((arr) =>
												arr.map((z) =>
													z.key === selZone.key
														? {
																...z,
																color: `${e.target.value}22`,
															}
														: z
												)
											)
										}
									/>
								</>
							)}
							{selEl && (
								<>
									<Select
										label="Tipo elemento"
										options={ELEMENT_TYPE_OPTIONS}
										value={selEl.element_type}
										onChange={(e) =>
											setElements((arr) =>
												arr.map((el) =>
													el.key === selEl.key
														? {
																...el,
																element_type: e.target
																	.value as MapElementType,
															}
														: el
												)
											)
										}
									/>
									<Input
										label="Etichetta"
										value={selEl.label ?? ""}
										onChange={(e) =>
											setElements((arr) =>
												arr.map((el) =>
													el.key === selEl.key
														? { ...el, label: e.target.value }
														: el
												)
											)
										}
									/>
									<Input
										label="Rotazione (°)"
										type="number"
										step={5}
										value={selEl.rotation}
										onChange={(e) =>
											setElements((arr) =>
												arr.map((el) =>
													el.key === selEl.key
														? {
																...el,
																rotation:
																	parseFloat(e.target.value) ||
																	0,
															}
														: el
												)
											)
										}
									/>
								</>
							)}
							<Button
								variant="danger"
								type="button"
								onClick={deleteSelected}
							>
								Elimina
							</Button>
						</Panel>
					)}

					{/* assignment panel (view mode) */}
					{!editMode && assignBox && (
						<Panel>
							<PanelHead>
								<PanelTitle>{assignBox.label}</PanelTitle>
								<RowButton
									variant="ghost"
									onClick={() => setAssignBoxKey(null)}
								>
									Chiudi
								</RowButton>
							</PanelHead>
							{assignBox.occupants.length === 0 && (
								<PanelHint>Nessun animale nel box</PanelHint>
							)}
							{assignBox.occupants.map((o) => (
								<OccRow key={o.occId}>
									<span>{o.name}</span>
									<RowButton
										variant="danger"
										onClick={() => doRelease(o.occId)}
									>
										Rilascia
									</RowButton>
								</OccRow>
							))}
							{assignBox.id &&
								assignBox.occupants.length < assignBox.capacity && (
									<>
										<PanelTitle>Assegna animale</PanelTitle>
										{shelterPets
											.filter((sp) => !assignedIds.has(sp.id))
											.map((sp) => (
												<OccRow key={sp.id}>
													<span>{sp.pet?.name ?? "-"}</span>
													<RowButton
														variant="ghost"
														onClick={() =>
															doAssign(assignBox.id!, sp.id)
														}
													>
														Assegna
													</RowButton>
												</OccRow>
											))}
									</>
								)}
							{!assignBox.id && (
								<PanelHint>Salva la mappa prima di assegnare</PanelHint>
							)}
						</Panel>
					)}

					{/* find pet panel (view mode) */}
					{!editMode && findOpen && (
						<Panel>
							<PanelHead>
								<PanelTitle>Trova animale</PanelTitle>
								<RowButton
									variant="ghost"
									onClick={() => setFindOpen(false)}
								>
									Chiudi
								</RowButton>
							</PanelHead>
							{shelterPets.length === 0 && (
								<PanelHint>Nessun animale nel rifugio</PanelHint>
							)}
							{shelterPets.map((sp) => {
								const inBox = boxes.find((b) =>
									b.occupants.some((o) => o.shelterPetId === sp.id)
								);
								return (
									<OccRow key={sp.id}>
										<span>{sp.pet?.name ?? "-"}</span>
										{inBox ? (
											<RowButton
												variant="ghost"
												onClick={() => locatePet(sp.id)}
											>
												{inBox.label}
											</RowButton>
										) : (
											<Badge>Non assegnato</Badge>
										)}
									</OccRow>
								);
							})}
						</Panel>
					)}

					{!editMode && !assignBox && !findOpen && (
						<PanelHint>
							Clic su un box per assegnare/rilasciare animali. In
							modifica: clic seleziona, trascina sposta, clic prolungato
							ridimensiona.
						</PanelHint>
					)}
					{editMode && !selAny && (
						<PanelHint>
							Seleziona una forma per modificarne le proprietà. Clic
							prolungato per il ridimensionamento con maniglie.
						</PanelHint>
					)}
				</SideCol>
			</Layout>
		</Wrap>
	);
};

function kindLabel(kind: CanvasShape["kind"]): string {
	switch (kind) {
		case "zone": return "Zona";
		case "area": return "Area";
		case "box": return "Box";
		case "element": return "Elemento";
	}
}

const StackClose = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	font-size: 1.4rem;
	color: ${$color("dim")};
	padding: 0;
	line-height: 1;
	&:hover { color: ${$color("text")}; }
`;

const StackItem = styled.button<{ $active: boolean }>`
	display: flex;
	align-items: center;
	gap: ${$uw(0.5)};
	padding: ${$uw(0.5)} ${$uw(0.75)};
	border: 1px solid ${({ $active }) => ($active ? $color("primary") : $color("border"))};
	border-radius: 6px;
	background: ${({ $active }) => ($active ? "rgba(63,81,181,0.07)" : "transparent")};
	cursor: pointer;
	text-align: left;
	width: 100%;
`;

const StackDot = styled.span<{ $fill: string; $stroke: string }>`
	width: 12px;
	height: 12px;
	border-radius: 2px;
	flex-shrink: 0;
	background: ${({ $fill }) => $fill};
	border: 1.5px solid ${({ $stroke }) => $stroke};
`;

const StackLabel = styled.span`
	flex: 1;
	font-size: 1.3rem;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

const StackTop = styled.span`
	font-size: 1.1rem;
	color: ${$color("dim")};
`;

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(1)};
`;

const CreateWrap = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(1)};
`;

const Bar = styled.div`
	display: flex;
	align-items: center;
	gap: ${$uw(0.5)};
	flex-wrap: wrap;
`;

const MapName = styled.h3`
	margin: 0;
	font-size: 1.6rem;
	font-weight: 600;
	color: ${$color("text")};
`;

const DraftBadge = styled(Badge)`
	background: rgba(255, 159, 10, 0.18);
	color: #b25e00;
`;

const BarSpace = styled.div`
	flex: 1;
`;

const Layout = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: ${$uw(1)};
	@media (min-width: 1024px) {
		grid-template-columns: 1fr ${$uw(20)};
	}
`;

const CanvasCol = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(0.75)};
	min-width: 0;
`;

const SideCol = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(0.75)};
`;

const Panel = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(0.75)};
	border: 1px solid ${$color("border")};
	border-radius: 8px;
	padding: ${$uw(1)};
	background: ${$color("surface")};
`;

const PanelHead = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: ${$uw(0.5)};
`;

const PanelTitle = styled.p`
	margin: 0;
	font-weight: 600;
	color: ${$color("text")};
`;

const PanelGrid = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(0.5)};
`;

const PanelHint = styled.p`
	margin: 0;
	font-size: 1.3rem;
	color: ${$color("dim")};
`;

const OccRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: ${$uw(0.5)};
	font-size: 1.4rem;
	color: ${$color("text")};
`;

const MapDims = styled.div`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, ${$uw(12)}));
	gap: ${$uw(0.75)};
`;

const Legend = styled.div`
	display: flex;
	gap: ${$uw(1)};
	flex-wrap: wrap;
`;

const L = styled.span<{ $c: string }>`
	display: inline-flex;
	align-items: center;
	gap: ${$uw(0.4)};
	font-size: 1.2rem;
	color: ${$color("muted")};
	&::before {
		content: "";
		width: ${$uw(0.75)};
		height: ${$uw(0.75)};
		border-radius: 3px;
		background: ${({ $c }) => $c};
		border: 1px solid rgba(0, 0, 0, 0.25);
	}
`;
