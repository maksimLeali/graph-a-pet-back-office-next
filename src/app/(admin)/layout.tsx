"use client";

import styled from "styled-components";

import { Sidebar } from "@/components/layout/Sidebar";
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

const Shell = styled.div`
	display: flex;
	min-height: 100dvh;
`;

const Column = styled.div`
	display: flex;
	min-width: 0;
	flex: 1;
	flex-direction: column;
`;

const Main = styled.main`
	flex: 1;
	overflow-y: auto;
	padding: ${$uw(1.5)};
`;
