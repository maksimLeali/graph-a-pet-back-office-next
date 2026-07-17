"use client";

import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";

import { config } from "@/lib/config";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { StyledInput } from "@/components/ui/Input";
import { $color, $uw } from "@/theme";

type Nested = { [key: string]: string | Nested };
type Translations = Record<string, Nested>;

// { it: { a: { b: "x" } } } -> { "a.b": { it: "x" } }
const flatten = (obj: Nested, prefix = ""): Record<string, string> => {
	const out: Record<string, string> = {};
	for (const [key, value] of Object.entries(obj)) {
		const path = prefix ? `${prefix}.${key}` : key;
		if (typeof value === "string") out[path] = value;
		else Object.assign(out, flatten(value, path));
	}
	return out;
};

const unflatten = (flat: Record<string, string>): Nested => {
	const root: Nested = {};
	for (const [path, value] of Object.entries(flat)) {
		if (value === "") continue; // come il vecchio BO: le stringhe vuote non si salvano
		const parts = path.split(".");
		let node = root;
		parts.forEach((part, i) => {
			if (i === parts.length - 1) {
				node[part] = value;
				return;
			}
			if (typeof node[part] !== "object" || node[part] === null) {
				node[part] = {};
			}
			node = node[part] as Nested;
		});
	}
	return root;
};

const headers = () => ({
	"Content-Type": "application/json",
	Platform: "console",
	...(auth.getToken()
		? { Authorization: `Bearer ${auth.getToken()}` }
		: undefined),
});

export default function TranslationsPage() {
	const [languages, setLanguages] = useState<string[]>([]);
	// values[lang][flatKey] = testo
	const [values, setValues] = useState<Record<string, Record<string, string>>>(
		{}
	);
	const [filter, setFilter] = useState("");
	const [onlyMissing, setOnlyMissing] = useState(false);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		fetch(`${config.baseFetchUrl}/translations`, { headers: headers() })
			.then((res) => res.json())
			.then(({ data }: { data: Translations }) => {
				const langs = Object.keys(data);
				setLanguages(langs);
				setValues(
					Object.fromEntries(langs.map((l) => [l, flatten(data[l])]))
				);
			})
			.catch(() => toast.error("Errore nel caricamento delle traduzioni"))
			.finally(() => setLoading(false));
	}, []);

	const allKeys = useMemo(() => {
		const keys = new Set<string>();
		for (const lang of languages) {
			for (const key of Object.keys(values[lang] ?? {})) keys.add(key);
		}
		return [...keys].sort();
	}, [languages, values]);

	const visibleKeys = allKeys.filter((key) => {
		if (filter && !key.toLowerCase().includes(filter.toLowerCase()))
			return false;
		if (onlyMissing && languages.every((l) => (values[l]?.[key] ?? "") !== ""))
			return false;
		return true;
	});

	const missingCount = allKeys.filter((key) =>
		languages.some((l) => (values[l]?.[key] ?? "") === "")
	).length;

	const save = () => {
		setSaving(true);
		const payload = Object.fromEntries(
			languages.map((l) => [l, unflatten(values[l] ?? {})])
		);
		fetch(`${config.baseFetchUrl}/translations/update`, {
			method: "PUT",
			headers: headers(),
			body: JSON.stringify(payload),
		})
			.then((res) => {
				if (!res.ok) throw new Error();
				toast.success("Traduzioni salvate");
			})
			.catch(() => toast.error("Errore nel salvataggio"))
			.finally(() => setSaving(false));
	};

	if (loading) return <Spinner />;

	return (
		<Page>
			<Toolbar>
				<FilterInput
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
					placeholder="Filtra per chiave…"
				/>
				<MissingToggle>
					<input
						type="checkbox"
						checked={onlyMissing}
						onChange={(e) => setOnlyMissing(e.target.checked)}
					/>
					Solo mancanti ({missingCount})
				</MissingToggle>
				<Count>
					{visibleKeys.length} di {allKeys.length} chiavi
				</Count>
			</Toolbar>

			<TableWrap>
				<Table>
					<thead>
						<tr>
							<Th>Chiave</Th>
							{languages.map((l) => (
								<Th key={l}>{l}</Th>
							))}
						</tr>
					</thead>
					<tbody>
						{visibleKeys.map((key) => (
							<Tr key={key}>
								<KeyCell>{key}</KeyCell>
								{languages.map((lang) => {
									const val = values[lang]?.[key] ?? "";
									return (
										<InputCell key={lang}>
											<CellInput
												value={val}
												$missing={val === ""}
												onChange={(e) =>
													setValues((prev) => ({
														...prev,
														[lang]: {
															...prev[lang],
															[key]: e.target.value,
														},
													}))
												}
											/>
										</InputCell>
									);
								})}
							</Tr>
						))}
					</tbody>
				</Table>
			</TableWrap>

			<SaveFloat>
				<Button loading={saving} onClick={save}>
					Salva traduzioni
				</Button>
			</SaveFloat>
		</Page>
	);
}

const Page = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(1)};
	padding-bottom: ${$uw(5)};
`;

const Toolbar = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: ${$uw(0.75)};
`;

const FilterInput = styled(StyledInput)`
	width: ${$uw(18)};
`;

const MissingToggle = styled.label`
	display: flex;
	cursor: pointer;
	align-items: center;
	gap: ${$uw(0.5)};
	font-size: 1.3rem;
	color: ${$color("muted")};
	> input {
		accent-color: ${$color("primary")};
	}
`;

const Count = styled.span`
	margin-left: auto;
	font-size: 1.3rem;
	color: ${$color("dim")};
`;

const TableWrap = styled.div`
	overflow-x: auto;
	border: 1px solid ${$color("border")};
	border-radius: ${$uw(0.8)};
`;

const Table = styled.table`
	width: 100%;
	text-align: left;
	font-size: 1.4rem;
	border-collapse: collapse;
	> thead {
		background: ${$color("surface")};
	}
`;

const Th = styled.th`
	padding: ${$uw(0.8)} ${$uw(1)};
	font-size: 1.2rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: ${$color("dim")};
`;

const Tr = styled.tr`
	border-top: 1px solid ${$color("border")};
`;

const KeyCell = styled.td`
	max-width: ${$uw(16)};
	padding: ${$uw(0.5)} ${$uw(1)};
	font-family: var(--font-jetbrains-mono), monospace;
	font-size: 1.2rem;
	color: ${$color("muted")};
	word-break: break-all;
`;

const InputCell = styled.td`
	padding: ${$uw(0.3)} ${$uw(0.5)};
`;

const CellInput = styled.input<{ $missing: boolean }>`
	width: 100%;
	border-radius: ${$uw(0.4)};
	border: 1px solid
		${({ $missing }) => ($missing ? $color("warning") : $color("border"))};
	background: ${$color("surface")};
	padding: ${$uw(0.4)} ${$uw(0.6)};
	font-size: 1.3rem;
	color: ${$color("text")};
	outline: none;
	transition: border-color 0.15s ease;
	&:focus {
		border-color: ${$color("primary")};
	}
`;

const SaveFloat = styled.div`
	position: fixed;
	right: ${$uw(1.5)};
	bottom: ${$uw(1.5)};
`;
