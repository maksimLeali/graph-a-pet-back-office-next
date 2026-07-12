import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetDashboardQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetDashboardQuery = { __typename?: 'Query', getDashboard: { __typename?: 'DashboardResult', success: boolean, dashboard?: { __typename?: 'Dashboard', all_pets: number, all_users: number, active_users: number, active_users_mean: number, active_users_percent: number, active_users_percent_stats: Array<number>, all_pet_stats: Array<number>, all_users_stats: Array<number>, active_users_stats: Array<number>, labels: Array<string> } | null, error?: { __typename?: 'Error', code: string, message: string } | null } };


export const GetDashboardDocument = gql`
    query getDashboard {
  getDashboard {
    dashboard {
      all_pets
      all_users
      active_users
      active_users_mean
      active_users_percent
      active_users_percent_stats
      all_pet_stats
      all_users_stats
      active_users_stats
      labels
    }
    success
    error {
      code
      message
    }
  }
}
    `;

/**
 * __useGetDashboardQuery__
 *
 * To run a query within a React component, call `useGetDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDashboardQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDashboardQuery(baseOptions?: Apollo.QueryHookOptions<GetDashboardQuery, GetDashboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDashboardQuery, GetDashboardQueryVariables>(GetDashboardDocument, options);
      }
export function useGetDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDashboardQuery, GetDashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDashboardQuery, GetDashboardQueryVariables>(GetDashboardDocument, options);
        }
export function useGetDashboardSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDashboardQuery, GetDashboardQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDashboardQuery, GetDashboardQueryVariables>(GetDashboardDocument, options);
        }
export type GetDashboardQueryHookResult = ReturnType<typeof useGetDashboardQuery>;
export type GetDashboardLazyQueryHookResult = ReturnType<typeof useGetDashboardLazyQuery>;
export type GetDashboardSuspenseQueryHookResult = ReturnType<typeof useGetDashboardSuspenseQuery>;
export type GetDashboardQueryResult = Apollo.QueryResult<GetDashboardQuery, GetDashboardQueryVariables>;