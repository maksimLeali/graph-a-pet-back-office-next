"use client";

import styled from "styled-components";

import { Sidebar, SIDEBAR_WIDTH } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { $uw } from "@/theme";

export default function AdminLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<Shell>
			<Sidebar />
			<Column>
				<Topbar />
				<Main>{children}</Main>
			</Column>
		</Shell>
	);
}

// Sidebar è position:fixed (vedi Sidebar.tsx): Shell resta ancorato al viewport
// e non scrolla mai, solo Main scrolla il proprio contenuto.
const Shell = styled.div`
	height: 100dvh;
	overflow: hidden;
`;

const Column = styled.div`
	display: flex;
	height: 100%;
	min-width: 0;
	margin-left: ${SIDEBAR_WIDTH};
	flex-direction: column;
`;

const Main = styled.main`
	flex: 1;
	min-height: 0;
	overflow-y: auto;
	overflow-x: hidden;
	padding: ${$uw(1.5)};
`;
