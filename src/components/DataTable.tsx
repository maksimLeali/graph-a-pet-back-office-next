"use client";

import { useState } from "react";
import styled from "styled-components";

import { $color, $uw } from "@/theme";

import { Spinner } from "./ui/Spinner";
import { StyledInput } from "./ui/Input";
import { Button } from "./ui/Button";

export type OrderDirection = "asc" | "desc";

export type Ordering = {
	order_by?: string;
	order_direction?: OrderDirection;
};

export type ColumnDef<T> = {
	id: string;
	header: string;
	/** chiave di ordinamento backend; assente = colonna non ordinabile */
	sortKey?: string;
	render: (row: T) => React.ReactNode;
	width?: string;
};

export type PaginationInfo = {
	total_items?: number | null;
	total_pages?: number | null;
	current_page?: number | null;
	page_size?: number | null;
};

type Props<T> = {
	columns: ColumnDef<T>[];
	rows: T[];
	rowKey: (row: T) => string;
	loading?: boolean;
	pagination?: PaginationInfo | null;
	page: number; // 1-based
	pageSize: number;
	pageSizes?: number[];
	ordering: Ordering;
	searchPlaceholder?: string;
	onPageChange: (page: number) => void;
	onPageSizeChange: (size: number) => void;
	onOrderingChange: (ordering: Ordering) => void;
	onSearch?: (text: string) => void;
	onRowClick?: (row: T) => void;
};

export function DataTable<T>({
	columns,
	rows,
	rowKey,
	loading,
	pagination,
	page,
	pageSize,
	pageSizes = [10, 30, 50],
	ordering,
	searchPlaceholder = "Cerca…",
	onPageChange,
	onPageSizeChange,
	onOrderingChange,
	onSearch,
	onRowClick,
}: Props<T>) {
	const [text, setText] = useState("");
	const totalPages = pagination?.total_pages ?? 1;
	const totalItems = pagination?.total_items ?? rows.length;

	const toggleSort = (sortKey: string) => {
		if (ordering.order_by !== sortKey) {
			onOrderingChange({ order_by: sortKey, order_direction: "asc" });
			return;
		}
		if (ordering.order_direction === "asc") {
			onOrderingChange({ order_by: sortKey, order_direction: "desc" });
			return;
		}
		onOrderingChange({});
	};

	return (
		<Wrap>
			{onSearch && (
				<SearchForm
					onSubmit={(e) => {
						e.preventDefault();
						onPageChange(1);
						onSearch(text.trim());
					}}
				>
					<StyledInput
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder={searchPlaceholder}
					/>
					<Button type="submit" variant="ghost">
						Cerca
					</Button>
				</SearchForm>
			)}

			<TableWrap>
				<Table>
					<thead>
						<tr>
							{columns.map((c) => (
								<Th key={c.id} style={c.width ? { width: c.width } : undefined}>
									{c.sortKey ? (
										<SortButton type="button" onClick={() => toggleSort(c.sortKey!)}>
											{c.header}
											<SortArrow aria-hidden>
												{ordering.order_by === c.sortKey
													? ordering.order_direction === "asc"
														? "▲"
														: "▼"
													: ""}
											</SortArrow>
										</SortButton>
									) : (
										c.header
									)}
								</Th>
							))}
						</tr>
					</thead>
					<tbody>
						{loading ? (
							<tr>
								<td colSpan={columns.length}>
									<Spinner />
								</td>
							</tr>
						) : rows.length === 0 ? (
							<tr>
								<Empty colSpan={columns.length}>Nessun risultato</Empty>
							</tr>
						) : (
							rows.map((row) => (
								<Tr
									key={rowKey(row)}
									$clickable={!!onRowClick}
									onClick={onRowClick ? () => onRowClick(row) : undefined}
								>
									{columns.map((c) => (
										<Td key={c.id}>{c.render(row)}</Td>
									))}
								</Tr>
							))
						)}
					</tbody>
				</Table>
			</TableWrap>

			<Footer>
				<span>
					{totalItems} risultati — pagina {page} di {Math.max(totalPages, 1)}
				</span>
				<FooterControls>
					<PageSizeSelect
						value={pageSize}
						onChange={(e) => {
							onPageSizeChange(Number(e.target.value));
							onPageChange(1);
						}}
					>
						{pageSizes.map((s) => (
							<option key={s} value={s}>
								{s} / pagina
							</option>
						))}
					</PageSizeSelect>
					<Button
						variant="ghost"
						disabled={page <= 1}
						onClick={() => onPageChange(page - 1)}
					>
						←
					</Button>
					<Button
						variant="ghost"
						disabled={page >= totalPages}
						onClick={() => onPageChange(page + 1)}
					>
						→
					</Button>
				</FooterControls>
			</Footer>
		</Wrap>
	);
}

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(1)};
`;

const SearchForm = styled.form`
	display: flex;
	gap: ${$uw(0.5)};
	> input {
		width: ${$uw(18)};
	}
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

const SortButton = styled.button`
	display: inline-flex;
	align-items: center;
	gap: ${$uw(0.25)};
	cursor: pointer;
	background: none;
	border: none;
	padding: 0;
	font: inherit;
	text-transform: inherit;
	letter-spacing: inherit;
	color: inherit;
	transition: color 0.15s ease;
	&:hover {
		color: ${$color("muted")};
	}
`;

const SortArrow = styled.span`
	color: ${$color("primary")};
`;

const Tr = styled.tr<{ $clickable: boolean }>`
	border-top: 1px solid ${$color("border")};
	transition: background 0.15s ease;
	${({ $clickable }) =>
		$clickable &&
		`cursor: pointer;
		&:hover { background: rgba(255, 255, 255, 0.03); }`}
`;

const Td = styled.td`
	padding: ${$uw(0.8)} ${$uw(1)};
	color: ${$color("muted")};
`;

const Empty = styled.td`
	padding: ${$uw(2.5)} ${$uw(1)};
	text-align: center;
	color: ${$color("dim")};
`;

const Footer = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: ${$uw(0.75)};
	font-size: 1.3rem;
	color: ${$color("muted")};
`;

const FooterControls = styled.div`
	display: flex;
	align-items: center;
	gap: ${$uw(0.5)};
`;

const PageSizeSelect = styled.select`
	cursor: pointer;
	border-radius: ${$uw(0.5)};
	border: 1px solid ${$color("border-strong")};
	background: ${$color("surface")};
	color: ${$color("text")};
	padding: ${$uw(0.4)} ${$uw(0.6)};
	font-size: 1.3rem;
`;
