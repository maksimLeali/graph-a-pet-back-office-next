import * as Types from '../../types';

import { gql } from '@apollo/client';
import { SimplePetFragmentDoc } from './list-pets.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetPaginatedPetsQueryVariables = Types.Exact<{
  search: Types.CommonSearch;
}>;


export type GetPaginatedPetsQuery = { __typename?: 'Query', listPets: { __typename?: 'PaginatedPets', success: boolean, pagination: { __typename?: 'Pagination', total_items?: number | null, total_pages?: number | null, current_page?: number | null, page_size?: number | null }, error?: { __typename?: 'Error', message: string, code: string, extra?: string | null } | null, items: Array<{ __typename?: 'Pet', id: string, name: string, weight_kg?: number | null, birthday?: string | null, neutered?: boolean | null, chip_code?: string | null, gender?: Types.Gender | null, breed?: string | null, years?: number | null } | null> } };


export const GetPaginatedPetsDocument = gql`
    query getPaginatedPets($search: CommonSearch!) {
  listPets(commonSearch: $search) {
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
      ...SimplePet
    }
  }
}
    ${SimplePetFragmentDoc}`;

/**
 * __useGetPaginatedPetsQuery__
 *
 * To run a query within a React component, call `useGetPaginatedPetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaginatedPetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaginatedPetsQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useGetPaginatedPetsQuery(baseOptions: Apollo.QueryHookOptions<GetPaginatedPetsQuery, GetPaginatedPetsQueryVariables> & ({ variables: GetPaginatedPetsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaginatedPetsQuery, GetPaginatedPetsQueryVariables>(GetPaginatedPetsDocument, options);
      }
export function useGetPaginatedPetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaginatedPetsQuery, GetPaginatedPetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaginatedPetsQuery, GetPaginatedPetsQueryVariables>(GetPaginatedPetsDocument, options);
        }
export function useGetPaginatedPetsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPaginatedPetsQuery, GetPaginatedPetsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPaginatedPetsQuery, GetPaginatedPetsQueryVariables>(GetPaginatedPetsDocument, options);
        }
export type GetPaginatedPetsQueryHookResult = ReturnType<typeof useGetPaginatedPetsQuery>;
export type GetPaginatedPetsLazyQueryHookResult = ReturnType<typeof useGetPaginatedPetsLazyQuery>;
export type GetPaginatedPetsSuspenseQueryHookResult = ReturnType<typeof useGetPaginatedPetsSuspenseQuery>;
export type GetPaginatedPetsQueryResult = Apollo.QueryResult<GetPaginatedPetsQuery, GetPaginatedPetsQueryVariables>;