import * as Types from '../../types';

import { gql } from '@apollo/client';
import { UserTreatmentFragmentDoc } from './user-treatment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserTreatmentsQueryVariables = Types.Exact<{
  userId: Types.Scalars['String']['input'];
  page: Types.Scalars['Int']['input'];
}>;


export type GetUserTreatmentsQuery = { __typename?: 'Query', listTreatments: { __typename?: 'PaginatedTreatments', success?: boolean | null, error?: { __typename?: 'Error', code: string, message: string, extra?: string | null } | null, pagination: { __typename?: 'Pagination', page_size?: number | null, current_page?: number | null, total_pages?: number | null, total_items?: number | null }, items: Array<{ __typename?: 'Treatment', id: string, date: string, name: string, type: Types.TreatmentType, created_at: string, booster?: { __typename?: 'Treatment', name: string, date: string, id: string } | null, health_card?: { __typename?: 'HealthCard', pet: { __typename?: 'Pet', id: string, name: string } } | null } | null> } };


export const GetUserTreatmentsDocument = gql`
    query getUserTreatments($userId: String!, $page: Int!) {
  listTreatments(
    commonSearch: {page: $page, order_by: "date", filters: {join: [{key: "health_cards", value: {join: [{key: "pets", value: {join: [{key: "ownerships", value: {fixed: [{key: "user_id", value: $userId}]}}]}}]}}]}}
  ) {
    success
    error {
      code
      message
      extra
    }
    pagination {
      page_size
      current_page
      total_pages
      total_items
    }
    items {
      ...UserTreatment
    }
  }
}
    ${UserTreatmentFragmentDoc}`;

/**
 * __useGetUserTreatmentsQuery__
 *
 * To run a query within a React component, call `useGetUserTreatmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserTreatmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserTreatmentsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetUserTreatmentsQuery(baseOptions: Apollo.QueryHookOptions<GetUserTreatmentsQuery, GetUserTreatmentsQueryVariables> & ({ variables: GetUserTreatmentsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserTreatmentsQuery, GetUserTreatmentsQueryVariables>(GetUserTreatmentsDocument, options);
      }
export function useGetUserTreatmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserTreatmentsQuery, GetUserTreatmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserTreatmentsQuery, GetUserTreatmentsQueryVariables>(GetUserTreatmentsDocument, options);
        }
export function useGetUserTreatmentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserTreatmentsQuery, GetUserTreatmentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserTreatmentsQuery, GetUserTreatmentsQueryVariables>(GetUserTreatmentsDocument, options);
        }
export type GetUserTreatmentsQueryHookResult = ReturnType<typeof useGetUserTreatmentsQuery>;
export type GetUserTreatmentsLazyQueryHookResult = ReturnType<typeof useGetUserTreatmentsLazyQuery>;
export type GetUserTreatmentsSuspenseQueryHookResult = ReturnType<typeof useGetUserTreatmentsSuspenseQuery>;
export type GetUserTreatmentsQueryResult = Apollo.QueryResult<GetUserTreatmentsQuery, GetUserTreatmentsQueryVariables>;