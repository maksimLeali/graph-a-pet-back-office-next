"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";

import { $color, $uw } from "@/theme";

/**
 * Editor WYSIWYG minimale e senza dipendenze (contentEditable +
 * document.execCommand). L'HTML prodotto è volutamente semplice
 * (grassetto/corsivo/sottolineato, titoli, elenchi, link): viene comunque
 * ri-sanitizzato lato backend prima di essere salvato (utils/html_sanitize),
 * quindi qui non serve difendersi dall'input — serve solo produrre markup
 * pulito. Il paste è forzato a testo semplice per non trascinare stili.
 */

type Props = {
	value: string;
	onChange: (html: string) => void;
	placeholder?: string;
};

type Cmd = { icon: string; label: string; run: () => void; active?: () => boolean };

export const RichTextEditor: React.FC<Props> = ({ value, onChange, placeholder }) => {
	const ref = useRef<HTMLDivElement>(null);
	const [, force] = useState(0);

	// sincronizza il contenuto quando arriva/riparte dall'esterno (es. caricamento
	// async dello shelter) senza sovrascrivere ciò che l'utente sta digitando
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		if (document.activeElement === el) return;
		if (el.innerHTML !== value) el.innerHTML = value || "";
	}, [value]);

	const emit = useCallback(() => {
		const el = ref.current;
		if (!el) return;
		const html = el.innerHTML === "<br>" ? "" : el.innerHTML;
		onChange(html);
	}, [onChange]);

	const exec = (command: string, arg?: string) => {
		ref.current?.focus();
		document.execCommand(command, false, arg);
		emit();
		force((n) => n + 1);
	};

	const toggleBlock = (tag: string) => {
		const isActive = document.queryCommandValue("formatBlock").toLowerCase() === tag;
		exec("formatBlock", isActive ? "p" : tag);
	};

	const addLink = () => {
		const url = window.prompt("URL del link (https://…)");
		if (!url) return;
		exec("createLink", url);
	};

	const state = (cmd: string) => {
		try {
			return document.queryCommandState(cmd);
		} catch {
			return false;
		}
	};

	const commands: Cmd[] = [
		{ icon: "B", label: "Grassetto", run: () => exec("bold"), active: () => state("bold") },
		{ icon: "I", label: "Corsivo", run: () => exec("italic"), active: () => state("italic") },
		{ icon: "U", label: "Sottolineato", run: () => exec("underline"), active: () => state("underline") },
		{ icon: "H2", label: "Titolo", run: () => toggleBlock("h2") },
		{ icon: "H3", label: "Sottotitolo", run: () => toggleBlock("h3") },
		{ icon: "•", label: "Elenco puntato", run: () => exec("insertUnorderedList"), active: () => state("insertUnorderedList") },
		{ icon: "1.", label: "Elenco numerato", run: () => exec("insertOrderedList"), active: () => state("insertOrderedList") },
		{ icon: "❝", label: "Citazione", run: () => toggleBlock("blockquote") },
		{ icon: "🔗", label: "Link", run: addLink },
		{ icon: "⌫", label: "Rimuovi formattazione", run: () => exec("removeFormat") },
	];

	const onPaste = (e: React.ClipboardEvent) => {
		e.preventDefault();
		const text = e.clipboardData.getData("text/plain");
		document.execCommand("insertText", false, text);
		emit();
	};

	const isEmpty = !value || value === "<br>";

	return (
		<Wrap>
			<Toolbar>
				{commands.map((c) => (
					<ToolBtn
						key={c.label}
						type="button"
						title={c.label}
						aria-label={c.label}
						$active={!!c.active?.()}
						// mousedown+preventDefault: non perde la selezione nell'editor
						onMouseDown={(e) => {
							e.preventDefault();
							c.run();
						}}
					>
						{c.icon}
					</ToolBtn>
				))}
			</Toolbar>
			<EditableWrap>
				{isEmpty && placeholder && <Placeholder>{placeholder}</Placeholder>}
				<Editable
					ref={ref}
					contentEditable
					suppressContentEditableWarning
					role="textbox"
					aria-multiline="true"
					onInput={emit}
					onBlur={emit}
					onPaste={onPaste}
					onKeyUp={() => force((n) => n + 1)}
					onMouseUp={() => force((n) => n + 1)}
				/>
			</EditableWrap>
		</Wrap>
	);
};

const Wrap = styled.div`
	border: 1px solid ${$color("border")};
	border-radius: 10px;
	overflow: hidden;
	background: ${$color("surface")};
`;

const Toolbar = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: ${$uw(0.25)};
	padding: ${$uw(0.4)};
	border-bottom: 1px solid ${$color("border")};
	background: ${$color("card")};
`;

const ToolBtn = styled.button<{ $active: boolean }>`
	min-width: ${$uw(1.75)};
	height: ${$uw(1.75)};
	padding: 0 ${$uw(0.5)};
	border: 1px solid ${({ $active }) => ($active ? $color("primary") : "transparent")};
	border-radius: 6px;
	background: ${({ $active }) => ($active ? $color("primary-soft") : "transparent")};
	color: ${$color("text")};
	font-size: 1.3rem;
	font-weight: 700;
	cursor: pointer;
	&:hover {
		background: ${$color("primary-soft")};
	}
`;

const EditableWrap = styled.div`
	position: relative;
`;

const Placeholder = styled.div`
	position: absolute;
	top: ${$uw(0.75)};
	left: ${$uw(0.75)};
	pointer-events: none;
	color: ${$color("dim")};
	font-size: 1.4rem;
`;

const Editable = styled.div`
	min-height: ${$uw(9)};
	max-height: ${$uw(24)};
	overflow-y: auto;
	padding: ${$uw(0.75)};
	font-size: 1.4rem;
	line-height: 1.5;
	color: ${$color("text")};
	outline: none;

	h2 {
		font-size: 1.9rem;
		margin: ${$uw(0.75)} 0 ${$uw(0.5)};
	}
	h3 {
		font-size: 1.6rem;
		margin: ${$uw(0.5)} 0;
	}
	p {
		margin: 0 0 ${$uw(0.5)};
	}
	ul,
	ol {
		margin: 0 0 ${$uw(0.5)};
		padding-left: ${$uw(1.5)};
	}
	blockquote {
		margin: ${$uw(0.5)} 0;
		padding-left: ${$uw(0.75)};
		border-left: 3px solid ${$color("border-strong")};
		color: ${$color("muted")};
	}
	a {
		color: ${$color("primary")};
		text-decoration: underline;
	}
`;
