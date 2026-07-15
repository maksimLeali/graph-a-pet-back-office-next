"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import {
	useReactTable,
	getCoreRowModel,
	flexRender,
	type ColumnDef as TanstackColumnDef,
	type SortingState,
	type VisibilityState,
} from "@tanstack/react-table";

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

// il backend pagina/ordina/filtra: la tabella resta "manuale" su questi tre fronti
// (manualPagination/manualSorting) e usa TanStack solo per row model, resize e
// visibilità colonne, che sono invece client-side puri.
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
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [columnsMenuOpen, setColumnsMenuOpen] = useState(false);
	const columnsMenuRef = useRef<HTMLDivElement>(null);

	const totalPages = pagination?.total_pages ?? 1;
	const totalItems = pagination?.total_items ?? rows.length;

	useEffect(() => {
		if (!columnsMenuOpen) return;
		const onOutside = (e: MouseEvent) => {
			if (!columnsMenuRef.current?.contains(e.target as Node)) {
				setColumnsMenuOpen(false);
			}
		};
		document.addEventListener("mousedown", onOutside);
		return () => document.removeEventListener("mousedown", onOutside);
	}, [columnsMenuOpen]);

	const tanColumns = useMemo<TanstackColumnDef<T, unknown>[]>(
		() =>
			columns.map((c) => ({
				id: c.id,
				header: c.header,
				enableSorting: !!c.sortKey,
				enableResizing: true,
				size: c.width ? parseInt(c.width, 10) || 180 : 180,
				minSize: 60,
				cell: (info) => c.render(info.row.original),
			})),
		[columns]
	);

	const sorting: SortingState = useMemo(() => {
		if (!ordering.order_by) return [];
		const sorted = columns.find((c) => c.sortKey === ordering.order_by);
		return sorted ? [{ id: sorted.id, desc: ordering.order_direction === "desc" }] : [];
	}, [ordering, columns]);

	const table = useReactTable({
		data: rows,
		columns: tanColumns,
		state: {
			sorting,
			columnVisibility,
			pagination: { pageIndex: Math.max(page - 1, 0), pageSize },
		},
		manualSorting: true,
		manualPagination: true,
		pageCount: Math.max(totalPages, 1),
		enableColumnResizing: true,
		columnResizeMode: "onChange",
		onColumnVisibilityChange: setColumnVisibility,
		getRowId: rowKey,
		getCoreRowModel: getCoreRowModel(),
	});

	const toggleSort = (columnId: string) => {
		const sortKey = columns.find((c) => c.id === columnId)?.sortKey;
		if (!sortKey) return;
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

	const bodyRows = table.getRowModel().rows;
	const leafColumns = table.getAllLeafColumns();

	return (
		<Wrap>
			<Toolbar>
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

				<ColumnsMenu ref={columnsMenuRef}>
					<Button
						type="button"
						variant="ghost"
						onClick={() => setColumnsMenuOpen((o) => !o)}
					>
						Colonne
					</Button>
					{columnsMenuOpen && (
						<ColumnsDropdown>
							{leafColumns.map((column) => (
								<ColumnOption key={column.id}>
									<input
										type="checkbox"
										checked={column.getIsVisible()}
										onChange={column.getToggleVisibilityHandler()}
									/>
									{String(column.columnDef.header)}
								</ColumnOption>
							))}
						</ColumnsDropdown>
					)}
				</ColumnsMenu>
			</Toolbar>

			<TableWrap>
				<Table style={{ minWidth: table.getTotalSize() }}>
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<Th key={header.id} style={{ width: header.getSize() }}>
										{header.column.getCanSort() ? (
											<SortButton
												type="button"
												onClick={() => toggleSort(header.column.id)}
											>
												{flexRender(header.column.columnDef.header, header.getContext())}
												<SortArrow aria-hidden>
													{header.column.getIsSorted() === "asc"
														? "▲"
														: header.column.getIsSorted() === "desc"
															? "▼"
															: ""}
												</SortArrow>
											</SortButton>
										) : (
											flexRender(header.column.columnDef.header, header.getContext())
										)}
										{header.column.getCanResize() && (
											<Resizer
												onMouseDown={header.getResizeHandler()}
												onTouchStart={header.getResizeHandler()}
												$resizing={header.column.getIsResizing()}
											/>
										)}
									</Th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{loading ? (
							<tr>
								<td colSpan={leafColumns.length}>
									<Spinner />
								</td>
							</tr>
						) : bodyRows.length === 0 ? (
							<tr>
								<Empty colSpan={leafColumns.length}>Nessun risultato</Empty>
							</tr>
						) : (
							bodyRows.map((row) => (
								<Tr
									key={row.id}
									$clickable={!!onRowClick}
									onClick={onRowClick ? () => onRowClick(row.original) : undefined}
								>
									{row.getVisibleCells().map((cell) => (
										<Td key={cell.id} style={{ width: cell.column.getSize() }}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</Td>
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
						disabled={!table.getCanPreviousPage()}
						onClick={() => onPageChange(1)}
					>
						«
					</Button>
					<Button
						variant="ghost"
						disabled={!table.getCanPreviousPage()}
						onClick={() => onPageChange(page - 1)}
					>
						←
					</Button>
					<Button
						variant="ghost"
						disabled={!table.getCanNextPage()}
						onClick={() => onPageChange(page + 1)}
					>
						→
					</Button>
					<Button
						variant="ghost"
						disabled={!table.getCanNextPage()}
						onClick={() => onPageChange(Math.max(totalPages, 1))}
					>
						»
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

const Toolbar = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	justify-content: space-between;
	gap: ${$uw(0.5)};
`;

const SearchForm = styled.form`
	display: flex;
	gap: ${$uw(0.5)};
	> input {
		width: ${$uw(18)};
	}
`;

const ColumnsMenu = styled.div`
	position: relative;
`;

const ColumnsDropdown = styled.div`
	position: absolute;
	top: 100%;
	right: 0;
	z-index: 5;
	margin-top: ${$uw(0.4)};
	display: flex;
	min-width: ${$uw(12)};
	flex-direction: column;
	gap: ${$uw(0.4)};
	border: 1px solid ${$color("border-strong")};
	border-radius: ${$uw(0.6)};
	background: ${$color("card")};
	padding: ${$uw(0.75)};
	box-shadow: 0 ${$uw(0.5)} ${$uw(1.5)} ${$color("overlay")};
`;

const ColumnOption = styled.label`
	display: flex;
	align-items: center;
	gap: ${$uw(0.5)};
	cursor: pointer;
	font-size: 1.3rem;
	color: ${$color("text")};
	> input {
		accent-color: ${$color("primary")};
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
	table-layout: auto;
	> thead {
		background: ${$color("surface")};
	}
`;

const Th = styled.th`
	position: relative;
	padding: ${$uw(0.8)} ${$uw(1)};
	font-size: 1.2rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: ${$color("dim")};
	white-space: nowrap;
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

const Resizer = styled.div<{ $resizing: boolean }>`
	position: absolute;
	top: 0;
	right: 0;
	height: 100%;
	width: 5px;
	cursor: col-resize;
	user-select: none;
	touch-action: none;
	background: ${({ $resizing }) => ($resizing ? $color("primary") : "transparent")};
	&:hover {
		background: ${$color("primary")};
	}
`;

const Tr = styled.tr<{ $clickable: boolean }>`
	border-top: 1px solid ${$color("border")};
	transition: background 0.15s ease;
	${({ $clickable }) =>
		$clickable &&
		`cursor: pointer;
		&:hover { background: ${$color("surface")}; }`}
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
