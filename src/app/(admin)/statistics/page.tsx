"use client";

import { useMemo, useState } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import toast from "react-hot-toast";

import { useGetGroupedStatsQuery } from "@/graphql/__generated__/getStatistics.generated";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { LineChart, BarChart } from "@/components/charts";
import { $color, $uw } from "@/theme";

type Period = "day" | "week" | "month" | "year";

const PERIODS: { value: Period; label: string }[] = [
	{ value: "day", label: "Oggi" },
	{ value: "week", label: "Settimana" },
	{ value: "month", label: "Mese" },
	{ value: "year", label: "Anno" },
];

// stessa logica del vecchio back office: se il periodo corrente è appena
// iniziato si estende all'indietro per avere abbastanza punti dati
const rangeFor = (period: Period): { dateFrom: string; group: string } => {
	switch (period) {
		case "day":
			return { dateFrom: dayjs().startOf("day").toISOString(), group: "day" };
		case "week":
			return {
				dateFrom:
					dayjs().day() <= 1
						? dayjs().subtract(1, "week").toISOString()
						: dayjs().startOf("week").toISOString(),
				group: "day",
			};
		case "month":
			return {
				dateFrom:
					dayjs().date() <= 7
						? dayjs().subtract(1, "month").startOf("month").toISOString()
						: dayjs().startOf("month").toISOString(),
				group: "week",
			};
		case "year":
			return {
				dateFrom:
					dayjs().month() < 1
						? dayjs().subtract(1, "year").startOf("year").toISOString()
						: dayjs().startOf("year").toISOString(),
				group: "month",
			};
	}
};

export default function StatisticsPage() {
	const [period, setPeriod] = useState<Period>("year");
	const { dateFrom, group } = useMemo(() => rangeFor(period), [period]);

	const { data, loading } = useGetGroupedStatsQuery({
		variables: { dateFrom, dateTo: dayjs().toISOString(), group },
		onError: () => toast.error("Errore nel caricamento delle statistiche"),
	});

	const stats = data?.getGroupedStatistics?.statistics;

	const labels = (stats?.labels ?? []).map((l: string) =>
		dayjs(l).format(group === "month" ? "MMM YYYY" : "DD MMM")
	);
	const series = stats
		? [
				{ label: "Utenti attivi (media)", data: stats.active_users_mean },
				{ label: "Picco massimo", data: stats.active_users_max },
				{ label: "Picco minimo", data: stats.active_users_min },
			]
		: [];

	const maxPeak = Math.max(...(stats?.active_users_max ?? [0]));
	const minPeak = Math.min(...(stats?.active_users_min ?? [0]));
	const lastOf = (arr?: number[]) =>
		arr && arr.length > 0 ? arr[arr.length - 1] : 0;

	return (
		<Page>
			<PeriodTabs>
				{PERIODS.map((p) => (
					<PeriodTab
						key={p.value}
						type="button"
						$active={p.value === period}
						onClick={() => setPeriod(p.value)}
					>
						{p.label}
					</PeriodTab>
				))}
			</PeriodTabs>

			{loading || !stats ? (
				<Spinner />
			) : (
				<>
					<CardsGrid>
						<StatCard
							label="Picco massimo utenti attivi"
							value={maxPeak}
							desc="nel periodo selezionato"
						/>
						<StatCard
							label="Picco minimo utenti attivi"
							value={minPeak}
							desc="nel periodo selezionato"
						/>
						<StatCard label="Utenti totali" value={lastOf(stats.all_users)} />
						<StatCard label="Animali totali" value={lastOf(stats.all_pets)} />
					</CardsGrid>

					<Card title="Attività utenti">
						<ChartBox>
							{period === "day" ? (
								<BarChart labels={labels} series={series} />
							) : (
								<LineChart labels={labels} series={series} />
							)}
						</ChartBox>
					</Card>
				</>
			)}
		</Page>
	);
}

const Page = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(1.5)};
`;

const PeriodTabs = styled.div`
	display: flex;
	align-self: flex-start;
	gap: ${$uw(0.25)};
	border: 1px solid ${$color("border")};
	background: ${$color("surface")};
	border-radius: ${$uw(0.5)};
	padding: ${$uw(0.25)};
`;

const PeriodTab = styled.button<{ $active: boolean }>`
	cursor: pointer;
	border: none;
	border-radius: ${$uw(0.4)};
	padding: ${$uw(0.4)} ${$uw(1)};
	font-size: 1.4rem;
	font-weight: 500;
	transition: background 0.15s ease, color 0.15s ease;
	background: ${({ $active }) =>
		$active ? $color("primary") : "transparent"};
	color: ${({ $active }) =>
		$active ? $color("primary-contrast") : $color("muted")};
	&:hover {
		color: ${({ $active }) =>
			$active ? $color("primary-contrast") : $color("text")};
	}
`;

const CardsGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: ${$uw(1)};
	@media (min-width: 640px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media (min-width: 1280px) {
		grid-template-columns: repeat(4, 1fr);
	}
`;

const ChartBox = styled.div`
	height: ${$uw(25)};
	position: relative;
`;
