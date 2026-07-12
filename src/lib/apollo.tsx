"use client";

import {
	ApolloProvider,
	ApolloClient,
	ApolloLink,
	createHttpLink,
	InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import toast from "react-hot-toast";
import _ from "lodash";

import { config } from "./config";
import { auth } from "./auth";

const httpLink = createHttpLink({ uri: config.graphqlUrl });

const authLink = setContext((_op, { headers }) => {
	const token = auth.getToken();
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

// stesso pattern di graph-a-pet-app: 401/403 negli errori GraphQL -> logout
const unauthorizedLink = new ApolloLink((operation, forward) =>
	forward(operation).map((response) => {
		const code = _.get(response, "errors.0.extensions.code", "");
		if (["401", "403", 401, 403].includes(code as string | number)) {
			toast.error("Sessione scaduta");
			auth.logout();
			setTimeout(() => {
				window.location.href = "/login";
			}, 1200);
		}
		return response;
	})
);

export const apolloClient = new ApolloClient({
	link: unauthorizedLink.concat(authLink).concat(httpLink),
	cache: new InMemoryCache(),
});

export const ApolloWrapper: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
