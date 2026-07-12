"use client";

import {
	Chart as ChartJS,
	ArcElement,
	BarElement,
	CategoryScale,
	LinearScale,
	LineElement,
	PointElement,
	Legend,
	Tooltip,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
	ArcElement,
	BarElement,
	CategoryScale,
	LinearScale,
	LineElement,
	PointElement,
	Legend,
	Tooltip
);

// palette categorica fissa per il tema scuro del back office
export const CHART_COLORS = [
	"#34d399", // emerald
	"#60a5fa", // blue
	"#fbbf24", // amber
	"#f472b6", // pink
	"#a78bfa", // violet
];

const GRID = "rgba(255,255,255,0.07)";
const TICK = "#a1a1aa";

export type Series = {
	label: string;
	data: (number | null | undefined)[];
	color?: string;
};

const scaleOpts = {
	x: { ticks: { color: TICK }, grid: { display: false } },
	y: { ticks: { color: TICK }, grid: { color: GRID } },
};

const legendOpts = {
	labels: { color: TICK, usePointStyle: true, boxWidth: 8 },
};

export const LineChart: React.FC<{ labels: string[]; series: Series[] }> = ({
	labels,
	series,
}) => (
	<Line
		data={{
			labels,
			datasets: series.map((s, i) => ({
				label: s.label,
				data: s.data as number[],
				borderColor: s.color ?? CHART_COLORS[i % CHART_COLORS.length],
				backgroundColor: s.color ?? CHART_COLORS[i % CHART_COLORS.length],
				borderWidth: 2,
				pointRadius: 3,
				tension: 0.3,
				spanGaps: false,
			})),
		}}
		options={{
			responsive: true,
			maintainAspectRatio: false,
			interaction: { mode: "nearest", intersect: false },
			scales: scaleOpts,
			plugins: { legend: legendOpts },
		}}
	/>
);

export const BarChart: React.FC<{ labels: string[]; series: Series[] }> = ({
	labels,
	series,
}) => (
	<Bar
		data={{
			labels,
			datasets: series.map((s, i) => ({
				label: s.label,
				data: s.data as number[],
				backgroundColor: s.color ?? CHART_COLORS[i % CHART_COLORS.length],
				borderRadius: 4,
			})),
		}}
		options={{
			responsive: true,
			maintainAspectRatio: false,
			scales: scaleOpts,
			plugins: { legend: legendOpts },
		}}
	/>
);

export const DonutChart: React.FC<{
	labels: string[];
	data: number[];
	colors?: string[];
}> = ({ labels, data, colors }) => (
	<Doughnut
		data={{
			labels,
			datasets: [
				{
					data,
					backgroundColor: colors ?? CHART_COLORS,
					borderColor: "#09090b",
					borderWidth: 2,
				},
			],
		}}
		options={{
			responsive: true,
			maintainAspectRatio: false,
			plugins: { legend: { position: "bottom", ...legendOpts } },
		}}
	/>
);
