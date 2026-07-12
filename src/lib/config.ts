export const config = {
	graphqlUrl:
		process.env.NEXT_PUBLIC_GRAPHQL_URL ??
		"https://graph-a-pet.makso.me/graphql",
	baseFetchUrl:
		process.env.NEXT_PUBLIC_BASE_FETCH_URL ?? "https://graph-a-pet.makso.me",
};
