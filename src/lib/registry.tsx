"use client";

import { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

import { css } from "@/theme";

// variabili CSS della griglia lemaks + palette (client-only:
// @lemaks/grid_system non è importabile da un server component)
const ThemeVars = () => (
	<style id="lemaks-theme" dangerouslySetInnerHTML={{ __html: css }} />
);

// SSR registry per styled-components (pattern ufficiale Next App Router)
export function StyledComponentsRegistry({
	children,
}: {
	children: React.ReactNode;
}) {
	const [sheet] = useState(() => new ServerStyleSheet());

	useServerInsertedHTML(() => {
		const styles = sheet.getStyleElement();
		sheet.instance.clearTag();
		return <>{styles}</>;
	});

	if (typeof window !== "undefined")
		return (
			<>
				<ThemeVars />
				{children}
			</>
		);

	return (
		<StyleSheetManager sheet={sheet.instance}>
			<ThemeVars />
			{children}
		</StyleSheetManager>
	);
}
