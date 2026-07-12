"use client";

import dayjs from "dayjs";
import styled from "styled-components";
import toast from "react-hot-toast";

import { useGetDashboardQuery } from "@/graphql/__generated__/getDashboard.generated";
import { useGetRealTimeStatsQuery } from "@/graphql/__generated__/getRealTimeStats.generated";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { LineChart, DonutChart, CHART_COLORS } from "@/components/charts";
import { $uw } from "@/theme";

export default function DashboardPage() {
	const { data: dashData } = useGetDashboardQuery({
		onError: () => toast.error("Errore nel caricamento della dashboard"),
	});
	const { data: rtData } = useGetRealTimeStatsQuery({
		pollInterval: 10000,
		onError: () => toast.error("Errore nel caricamento delle statistiche"),
	});

	const dashboard = dashData?.getDashboard?.dashboard;
	const realTime = rtData?.getRealTimeStatistic?.statistics;

	if (!dashboard || !realTime) return <Spinner />;

	const lastActive =
		dashboard.active_users_stats[dashboard.active_users_stats.length - 1] ?? 0;

	return (
		<Page>
			<CardsGrid>
				<StatCard
					label="Utenti totali"
					value={realTime.all_users}
					compareValue={dashboard.all_users}
					desc="vs inizio giornata"
				/>
				<StatCard
					label="Utenti attivi"
					value={realTime.active_users}
					compareValue={dashboard.active_users}
					desc="vs media"
				/>
				<StatCard
					label="Utenti attivi"
					value={realTime.active_users_percent}
					compareValue={dashboard.active_users_percent}
					unit="%"
					desc="vs media"
				/>
				<StatCard
					label="Animali totali"
					value={realTime.all_pets}
					compareValue={dashboard.all_pets}
					desc="vs inizio giornata"
				/>
			</CardsGrid>

			<ChartsGrid>
				<Card title="Attività utenti giornaliera">
					<ChartBox>
						<DonutChart
							labels={["Utenti attivi (media)", "Utenti inattivi"]}
							data={[
								dashboard.active_users_mean,
								dashboard.all_users - dashboard.active_users_mean,
							]}
							colors={[CHART_COLORS[0], "#3f3f46"]}
						/>
					</ChartBox>
				</Card>

				<Card title="Attività utenti mensile">
					<ChartBox>
						<LineChart
							labels={dashboard.labels
								.map((l: string) => dayjs(l).format("DD MMM"))
								.concat("Ora")}
							series={[
								{
									label: "Utenti totali",
									data: [...dashboard.all_users_stats, null],
								},
								{
									label: "Utenti attivi",
									data: [...dashboard.active_users_stats, null],
								},
								{
									label: "Animali totali",
									data: [...dashboard.all_pet_stats, null],
								},
								{
									label: "Attivi ora",
									data: [
										...dashboard.active_users_stats.map(
											(v: number, i: number) =>
												i === dashboard.active_users_stats.length - 1
													? v
													: null
										),
										realTime.active_users,
									],
									color:
										lastActive < realTime.active_users
											? "#4ade80"
											: "#f87171",
								},
							]}
						/>
					</ChartBox>
				</Card>
			</ChartsGrid>
		</Page>
	);
}

const Page = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(1.5)};
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

const ChartsGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: ${$uw(1.5)};
	@media (min-width: 1280px) {
		grid-template-columns: repeat(2, 1fr);
	}
`;

const ChartBox = styled.div`
	height: ${$uw(21)};
	position: relative;
`;
