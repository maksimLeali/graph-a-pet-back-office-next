import * as Types from '../../types';

import { gql } from '@apollo/client';
import { ListUserFragmentDoc } from './list-user.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetPaginatedUsersQueryVariables = Types.Exact<{
  search: Types.CommonSearch;
}>;


export type GetPaginatedUsersQuery = { __typename?: 'Query', listUsers: { __typename?: 'PaginatedUsers', success?: boolean | null, pagination: { __typename?: 'Pagination', total_items?: number | null, total_pages?: number | null, current_page?: number | null, page_size?: number | null }, error?: { __typename?: 'Error', message: string, code: string, extra?: string | null } | null, items: Array<{ __typename?: 'User', id: string, email: string, last_name: string, first_name: string, role: Types.UserRole, created_at: string, pets_owned: number, pets_on_loan: number } | null> } };


export const GetPaginatedUsersDocument = gql`
    query getPaginatedUsers($search: CommonSearch!) {
  listUsers(commonSearch: $search) {
    pagination {
      total_items
      total_pages
      current_page
      page_size
    }
    success
    error {
      message
      code
      extra
    }
    items {
      ...ListUser
    }
  }
}
    ${ListUserFragmentDoc}`;

/**
 * __useGetPaginatedUsersQuery__
 *
 * To run a query within a React component, call `useGetPaginatedUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaginatedUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaginatedUsersQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useGetPaginatedUsersQuery(baseOptions: Apollo.QueryHookOptions<GetPaginatedUsersQuery, GetPaginatedUsersQueryVariables> & ({ variables: GetPaginatedUsersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaginatedUsersQuery, GetPaginatedUsersQueryVariables>(GetPaginatedUsersDocument, options);
      }
export function useGetPaginatedUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaginatedUsersQuery, GetPaginatedUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaginatedUsersQuery, GetPaginatedUsersQueryVariables>(GetPaginatedUsersDocument, options);
        }
export function useGetPaginatedUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPaginatedUsersQuery, GetPaginatedUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPaginatedUsersQuery, GetPaginatedUsersQueryVariables>(GetPaginatedUsersDocument, options);
        }
export type GetPaginatedUsersQueryHookResult = ReturnType<typeof useGetPaginatedUsersQuery>;
export type GetPaginatedUsersLazyQueryHookResult = ReturnType<typeof useGetPaginatedUsersLazyQuery>;
export type GetPaginatedUsersSuspenseQueryHookResult = ReturnType<typeof useGetPaginatedUsersSuspenseQuery>;
export type GetPaginatedUsersQueryResult = Apollo.QueryResult<GetPaginatedUsersQuery, GetPaginatedUsersQueryVariables>;