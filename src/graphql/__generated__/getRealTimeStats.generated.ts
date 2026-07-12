import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetRealTimeStatsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetRealTimeStatsQuery = { __typename?: 'Query', getRealTimeStatistic: { __typename?: 'RealTimeStatisticResult', success: boolean, statistics?: { __typename?: 'DailyStats', all_pets: number, all_users: number, active_users: number, active_users_percent: number } | null, error?: { __typename?: 'Error', code: string, message: string } | null } };


export const GetRealTimeStatsDocument = gql`
    query getRealTimeStats {
  getRealTimeStatistic {
    statistics {
      all_pets
      all_users
      active_users
      active_users_percent
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
 * __useGetRealTimeStatsQuery__
 *
 * To run a query within a React component, call `useGetRealTimeStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRealTimeStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRealTimeStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRealTimeStatsQuery(baseOptions?: Apollo.QueryHookOptions<GetRealTimeStatsQuery, GetRealTimeStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRealTimeStatsQuery, GetRealTimeStatsQueryVariables>(GetRealTimeStatsDocument, options);
      }
export function useGetRealTimeStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRealTimeStatsQuery, GetRealTimeStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRealTimeStatsQuery, GetRealTimeStatsQueryVariables>(GetRealTimeStatsDocument, options);
        }
export function useGetRealTimeStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRealTimeStatsQuery, GetRealTimeStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRealTimeStatsQuery, GetRealTimeStatsQueryVariables>(GetRealTimeStatsDocument, options);
        }
export type GetRealTimeStatsQueryHookResult = ReturnType<typeof useGetRealTimeStatsQuery>;
export type GetRealTimeStatsLazyQueryHookResult = ReturnType<typeof useGetRealTimeStatsLazyQuery>;
export type GetRealTimeStatsSuspenseQueryHookResult = ReturnType<typeof useGetRealTimeStatsSuspenseQuery>;
export type GetRealTimeStatsQueryResult = Apollo.QueryResult<GetRealTimeStatsQuery, GetRealTimeStatsQueryVariables>;