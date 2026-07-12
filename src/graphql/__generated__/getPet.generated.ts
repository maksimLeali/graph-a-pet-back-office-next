import * as Types from '../../types';

import { gql } from '@apollo/client';
import { FullPetFragmentDoc } from './full-pet.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetPetQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type GetPetQuery = { __typename?: 'Query', getPet: { __typename?: 'PetResult', success: boolean, pet?: { __typename?: 'Pet', id: string, name: string, birthday?: string | null, neutered?: boolean | null, gender?: Types.Gender | null, weight_kg?: number | null, diet?: Array<string | null> | null, chip_code?: string | null, intollerance?: Array<string | null> | null, temperament?: string | null, disciplines?: Array<string | null> | null, breed?: string | null, coat_length?: Types.CoatLength | null, years?: number | null, ownerships?: { __typename?: 'PaginatedOwnerships', items: Array<{ __typename?: 'Ownership', id: string, user: { __typename?: 'User', first_name: string, last_name: string, id: string, email: string } } | null> } | null } | null, error?: { __typename?: 'Error', code: string, message: string } | null } };


export const GetPetDocument = gql`
    query getPet($id: ID!) {
  getPet(id: $id) {
    pet {
      ...FullPet
    }
    success
    error {
      code
      message
    }
  }
}
    ${FullPetFragmentDoc}`;

/**
 * __useGetPetQuery__
 *
 * To run a query within a React component, call `useGetPetQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPetQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPetQuery(baseOptions: Apollo.QueryHookOptions<GetPetQuery, GetPetQueryVariables> & ({ variables: GetPetQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPetQuery, GetPetQueryVariables>(GetPetDocument, options);
      }
export function useGetPetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPetQuery, GetPetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPetQuery, GetPetQueryVariables>(GetPetDocument, options);
        }
export function useGetPetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPetQuery, GetPetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPetQuery, GetPetQueryVariables>(GetPetDocument, options);
        }
export type GetPetQueryHookResult = ReturnType<typeof useGetPetQuery>;
export type GetPetLazyQueryHookResult = ReturnType<typeof useGetPetLazyQuery>;
export type GetPetSuspenseQueryHookResult = ReturnType<typeof useGetPetSuspenseQuery>;
export type GetPetQueryResult = Apollo.QueryResult<GetPetQuery, GetPetQueryVariables>;