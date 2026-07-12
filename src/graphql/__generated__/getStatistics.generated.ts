import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetGroupedStatsQueryVariables = Types.Exact<{
  dateFrom: Types.Scalars['String']['input'];
  dateTo?: Types.InputMaybe<Types.Scalars['String']['input']>;
  group: Types.Scalars['String']['input'];
}>;


export type GetGroupedStatsQuery = { __typename?: 'Query', getGroupedStatistics: { __typename?: 'StatisticsResult', success: boolean, statistics?: { __typename?: 'Statistics', all_pets: Array<number>, all_users: Array<number>, active_users_min: Array<number>, active_users_mean: Array<number>, active_users_max: Array<number>, labels: Array<string> } | null, error?: { __typename?: 'Error', code: string, message: string } | null } };


export const GetGroupedStatsDocument = gql`
    query getGroupedStats($dateFrom: String!, $dateTo: String, $group: String!) {
  getGroupedStatistics(date_from: $dateFrom, date_to: $dateTo, group: $group) {
    statistics {
      all_pets
      all_users
      active_users_min
      active_users_mean
      active_users_max
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
 * __useGetGroupedStatsQuery__
 *
 * To run a query within a React component, call `useGetGroupedStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupedStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupedStatsQuery({
 *   variables: {
 *      dateFrom: // value for 'dateFrom'
 *      dateTo: // value for 'dateTo'
 *      group: // value for 'group'
 *   },
 * });
 */
export function useGetGroupedStatsQuery(baseOptions: Apollo.QueryHookOptions<GetGroupedStatsQuery, GetGroupedStatsQueryVariables> & ({ variables: GetGroupedStatsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGroupedStatsQuery, GetGroupedStatsQueryVariables>(GetGroupedStatsDocument, options);
      }
export function useGetGroupedStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGroupedStatsQuery, GetGroupedStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGroupedStatsQuery, GetGroupedStatsQueryVariables>(GetGroupedStatsDocument, options);
        }
export function useGetGroupedStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetGroupedStatsQuery, GetGroupedStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGroupedStatsQuery, GetGroupedStatsQueryVariables>(GetGroupedStatsDocument, options);
        }
export type GetGroupedStatsQueryHookResult = ReturnType<typeof useGetGroupedStatsQuery>;
export type GetGroupedStatsLazyQueryHookResult = ReturnType<typeof useGetGroupedStatsLazyQuery>;
export type GetGroupedStatsSuspenseQueryHookResult = ReturnType<typeof useGetGroupedStatsSuspenseQuery>;
export type GetGroupedStatsQueryResult = Apollo.QueryResult<GetGroupedStatsQuery, GetGroupedStatsQueryVariables>;