"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

import { useBackofficeAuth } from "@/contexts/BackofficeAuthContext";
import { accessLabel } from "@/lib/navigation/roleLabels";
import { $color, $uw } from "@/theme";

const SEARCH_THRESHOLD = 8;

/**
 * Switcher del rifugio corrente (topbar, area /shelters/*).
 * Il livello mostrato è SOLO informativo: l'autorizzazione passa dalle
 * permission del contesto. Il cambio è un cambio di tenant: naviga sulla
 * route del nuovo rifugio (sezione mantenuta se autorizzata) senza refresh.
 */
export const ShelterSwitcher: React.FC = () => {
	const { shelters, currentShelter, selectShelter, switching } =
		useBackofficeAuth();
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const wrapRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;
		const onDown = (e: MouseEvent) => {
			if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
		};
		document.addEventListener("mousedown", onDown);
		return () => document.removeEventListener("mousedown", onDown);
	}, [open]);

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return shelters;
		return shelters.filter((s) =>
			`${s.shelter.name} ${s.shelter.city ?? ""}`
				.toLowerCase()
				.includes(q)
		);
	}, [shelters, query]);

	if (!currentShelter) return null;

	// un solo rifugio (o ispezione platform senza rifugi propri):
	// nome senza dropdown; il livello mostrato è solo informativo
	if (
		shelters.length <= 1 &&
		(shelters.length === 0 ||
			shelters[0].shelter.id === currentShelter.shelter.id)
	) {
		return (
			<Static>
				<Name>{currentShelter.shelter.name}</Name>
				<Level>{accessLabel(currentShelter)}</Level>
			</Static>
		);
	}

	return (
		<Wrap ref={wrapRef}>
			<Trigger
				type="button"
				aria-haspopup="listbox"
				aria-expanded={open}
				disabled={switching}
				onClick={() => setOpen((v) => !v)}
			>
				<span>
					<Name>
						{switching ? "Cambio rifugio…" : currentShelter.shelter.name}
					</Name>
					<Level>{accessLabel(currentShelter)}</Level>
				</span>
				<Caret aria-hidden>▾</Caret>
			</Trigger>

			{open && (
				<Dropdown role="listbox">
					<DropTitle>Cambia rifugio</DropTitle>
					{shelters.length > SEARCH_THRESHOLD && (
						<Search
							autoFocus
							placeholder="Cerca rifugio…"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
					)}
					<Options>
						{filtered.map((s) => {
							const active =
								s.shelter.id === currentShelter.shelter.id;
							return (
								<OptionRow
									key={s.shelter.id}
									type="button"
									role="option"
									aria-selected={active}
									$active={active}
									onClick={() => {
										setOpen(false);
										setQuery("");
										if (!active) selectShelter(s.shelter.id);
									}}
								>
									<Check aria-hidden>{active ? "✓" : ""}</Check>
									<span>
										<Name>{s.shelter.name}</Name>
										<Level>{accessLabel(s)}</Level>
									</span>
								</OptionRow>
							);
						})}
						{filtered.length === 0 && (
							<EmptyText>Nessun rifugio trovato</EmptyText>
						)}
					</Options>
				</Dropdown>
			)}
		</Wrap>
	);
};

const Wrap = styled.div`
	position: relative;
`;

const Static = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: ${$uw(0.25)} ${$uw(0.6)};
`;

const Trigger = styled.button`
	display: flex;
	cursor: pointer;
	align-items: center;
	gap: ${$uw(0.5)};
	border: 1px solid ${$color("border")};
	background: ${$color("background")};
	border-radius: ${$uw(0.5)};
	padding: ${$uw(0.25)} ${$uw(0.6)};
	text-align: left;
	transition: border-color 0.15s ease;
	&:hover {
		border-color: ${$color("primary")};
	}
	&:disabled {
		cursor: progress;
		opacity: 0.7;
	}
`;

const Name = styled.span`
	display: block;
	font-size: 1.3rem;
	font-weight: 600;
	color: ${$color("text")};
`;

const Level = styled.span`
	display: block;
	font-size: 1.05rem;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: ${$color("muted")};
`;

const Caret = styled.span`
	font-size: 1.2rem;
	color: ${$color("muted")};
`;

const Dropdown = styled.div`
	position: absolute;
	top: calc(100% + ${$uw(0.25)});
	right: 0;
	z-index: 40; /* sopra sidebar (20), sotto eventuali modali */
	width: ${$uw(18)};
	max-height: ${$uw(20)};
	overflow-y: auto;
	border: 1px solid ${$color("border")};
	background: ${$color("card")};
	border-radius: ${$uw(0.5)};
	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
	padding: ${$uw(0.5)};
`;

const DropTitle = styled.span`
	display: block;
	padding: ${$uw(0.25)} ${$uw(0.5)};
	font-size: 1.05rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	color: ${$color("muted")};
`;

const Search = styled.input`
	width: 100%;
	margin: ${$uw(0.25)} 0;
	border: 1px solid ${$color("border")};
	background: ${$color("background")};
	border-radius: ${$uw(0.4)};
	padding: ${$uw(0.4)} ${$uw(0.6)};
	font-size: 1.3rem;
	color: ${$color("text")};
	&:focus {
		outline: none;
		border-color: ${$color("primary")};
	}
`;

const Options = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(0.15)};
`;

const OptionRow = styled.button<{ $active: boolean }>`
	display: flex;
	width: 100%;
	cursor: pointer;
	align-items: center;
	gap: ${$uw(0.5)};
	border: none;
	background: ${({ $active }) =>
		$active ? $color("primary-soft") : "transparent"};
	border-radius: ${$uw(0.4)};
	padding: ${$uw(0.4)} ${$uw(0.5)};
	text-align: left;
	&:hover {
		background: ${({ $active }) =>
			$active ? $color("primary-soft") : $color("surface")};
	}
`;

const Check = styled.span`
	width: ${$uw(0.9)};
	flex-shrink: 0;
	font-size: 1.3rem;
	color: ${$color("primary")};
`;

const EmptyText = styled.span`
	display: block;
	padding: ${$uw(0.5)};
	font-size: 1.3rem;
	color: ${$color("muted")};
`;
