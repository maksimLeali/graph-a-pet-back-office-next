import * as Types from '../../types';

import { gql } from '@apollo/client';
import { UserOwnershipsFragmentDoc } from './user-ownerships.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserOwnershipQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  commonSearch: Types.CommonSearch;
}>;


export type GetUserOwnershipQuery = { __typename?: 'Query', getUser: { __typename?: 'UserResult', success: boolean, user?: { __typename?: 'User', ownerships?: { __typename?: 'PaginatedOwnerships', success?: boolean | null, items: Array<{ __typename?: 'Ownership', id: string, custody_level: Types.CustodyLevel, pet: { __typename?: 'Pet', birthday?: string | null, chip_code?: string | null, diet?: Array<string | null> | null, disciplines?: Array<string | null> | null, gender?: Types.Gender | null, id: string, intollerance?: Array<string | null> | null, name: string, neutered?: boolean | null, temperament?: string | null, weight_kg?: number | null } } | null>, pagination: { __typename?: 'Pagination', current_page?: number | null, page_size?: number | null, total_items?: number | null, total_pages?: number | null } } | null } | null, error?: { __typename?: 'Error', code: string, message: string, extra?: string | null } | null } };


export const GetUserOwnershipDocument = gql`
    query getUserOwnership($id: ID!, $commonSearch: CommonSearch!) {
  getUser(id: $id) {
    user {
      ownerships(commonSearch: $commonSearch) {
        ...UserOwnerships
      }
    }
    success
    error {
      code
      message
      extra
    }
  }
}
    ${UserOwnershipsFragmentDoc}`;

/**
 * __useGetUserOwnershipQuery__
 *
 * To run a query within a React component, call `useGetUserOwnershipQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserOwnershipQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserOwnershipQuery({
 *   variables: {
 *      id: // value for 'id'
 *      commonSearch: // value for 'commonSearch'
 *   },
 * });
 */
export function useGetUserOwnershipQuery(baseOptions: Apollo.QueryHookOptions<GetUserOwnershipQuery, GetUserOwnershipQueryVariables> & ({ variables: GetUserOwnershipQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserOwnershipQuery, GetUserOwnershipQueryVariables>(GetUserOwnershipDocument, options);
      }
export function useGetUserOwnershipLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserOwnershipQuery, GetUserOwnershipQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserOwnershipQuery, GetUserOwnershipQueryVariables>(GetUserOwnershipDocument, options);
        }
export function useGetUserOwnershipSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserOwnershipQuery, GetUserOwnershipQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserOwnershipQuery, GetUserOwnershipQueryVariables>(GetUserOwnershipDocument, options);
        }
export type GetUserOwnershipQueryHookResult = ReturnType<typeof useGetUserOwnershipQuery>;
export type GetUserOwnershipLazyQueryHookResult = ReturnType<typeof useGetUserOwnershipLazyQuery>;
export type GetUserOwnershipSuspenseQueryHookResult = ReturnType<typeof useGetUserOwnershipSuspenseQuery>;
export type GetUserOwnershipQueryResult = Apollo.QueryResult<GetUserOwnershipQuery, GetUserOwnershipQueryVariables>;