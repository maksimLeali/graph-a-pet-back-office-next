import * as Types from '../../types';

import { gql } from '@apollo/client';
import { PetOwnershipsFragmentDoc } from './pet-ownerships.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetPetOwnershipQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  commonSearch: Types.CommonSearch;
}>;


export type GetPetOwnershipQuery = { __typename?: 'Query', getPet: { __typename?: 'PetResult', success: boolean, pet?: { __typename?: 'Pet', ownerships?: { __typename?: 'PaginatedOwnerships', success?: boolean | null, items: Array<{ __typename?: 'Ownership', id: string, custody_level: Types.CustodyLevel, user: { __typename?: 'User', first_name: string, last_name: string, email: string, id: string } } | null>, pagination: { __typename?: 'Pagination', current_page?: number | null, page_size?: number | null, total_items?: number | null, total_pages?: number | null } } | null } | null, error?: { __typename?: 'Error', code: string, message: string, extra?: string | null } | null } };


export const GetPetOwnershipDocument = gql`
    query getPetOwnership($id: ID!, $commonSearch: CommonSearch!) {
  getPet(id: $id) {
    pet {
      ownerships(commonSearch: $commonSearch) {
        ...PetOwnerships
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
    ${PetOwnershipsFragmentDoc}`;

/**
 * __useGetPetOwnershipQuery__
 *
 * To run a query within a React component, call `useGetPetOwnershipQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPetOwnershipQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPetOwnershipQuery({
 *   variables: {
 *      id: // value for 'id'
 *      commonSearch: // value for 'commonSearch'
 *   },
 * });
 */
export function useGetPetOwnershipQuery(baseOptions: Apollo.QueryHookOptions<GetPetOwnershipQuery, GetPetOwnershipQueryVariables> & ({ variables: GetPetOwnershipQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPetOwnershipQuery, GetPetOwnershipQueryVariables>(GetPetOwnershipDocument, options);
      }
export function useGetPetOwnershipLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPetOwnershipQuery, GetPetOwnershipQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPetOwnershipQuery, GetPetOwnershipQueryVariables>(GetPetOwnershipDocument, options);
        }
export function useGetPetOwnershipSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPetOwnershipQuery, GetPetOwnershipQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPetOwnershipQuery, GetPetOwnershipQueryVariables>(GetPetOwnershipDocument, options);
        }
export type GetPetOwnershipQueryHookResult = ReturnType<typeof useGetPetOwnershipQuery>;
export type GetPetOwnershipLazyQueryHookResult = ReturnType<typeof useGetPetOwnershipLazyQuery>;
export type GetPetOwnershipSuspenseQueryHookResult = ReturnType<typeof useGetPetOwnershipSuspenseQuery>;
export type GetPetOwnershipQueryResult = Apollo.QueryResult<GetPetOwnershipQuery, GetPetOwnershipQueryVariables>;