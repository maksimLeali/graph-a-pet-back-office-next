export const formatCents = (cents: number, currency = "usd"): string =>
	new Intl.NumberFormat("it", { style: "currency", currency }).format(
		cents / 100
	);
