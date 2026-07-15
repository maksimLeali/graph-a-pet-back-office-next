import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListPetDonationPoliciesQueryVariables = Types.Exact<{
  shelter_id: Types.Scalars['ID']['input'];
}>;


export type ListPetDonationPoliciesQuery = { __typename?: 'Query', listPetDonationPolicies: { __typename?: 'PetDonationPoliciesResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, items: Array<{ __typename?: 'PetDonationPolicy', id: string, pet_id: string, shelter_id: string, custom_monthly_limit_cents?: number | null, is_active: boolean, temporary_override_cents?: number | null, temporary_override_reason?: string | null, temporary_override_effective_at?: string | null, temporary_override_expires_at?: string | null, updated_at?: string | null } | null> } };


export const ListPetDonationPoliciesDocument = gql`
    query listPetDonationPolicies($shelter_id: ID!) {
  listPetDonationPolicies(shelter_id: $shelter_id) {
    success
    error {
      code
      message
    }
    items {
      id
      pet_id
      shelter_id
      custom_monthly_limit_cents
      is_active
      temporary_override_cents
      temporary_override_reason
      temporary_override_effective_at
      temporary_override_expires_at
      updated_at
    }
  }
}
    `;

/**
 * __useListPetDonationPoliciesQuery__
 *
 * To run a query within a React component, call `useListPetDonationPoliciesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListPetDonationPoliciesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListPetDonationPoliciesQuery({
 *   variables: {
 *      shelter_id: // value for 'shelter_id'
 *   },
 * });
 */
export function useListPetDonationPoliciesQuery(baseOptions: Apollo.QueryHookOptions<ListPetDonationPoliciesQuery, ListPetDonationPoliciesQueryVariables> & ({ variables: ListPetDonationPoliciesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListPetDonationPoliciesQuery, ListPetDonationPoliciesQueryVariables>(ListPetDonationPoliciesDocument, options);
      }
export function useListPetDonationPoliciesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListPetDonationPoliciesQuery, ListPetDonationPoliciesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListPetDonationPoliciesQuery, ListPetDonationPoliciesQueryVariables>(ListPetDonationPoliciesDocument, options);
        }
export function useListPetDonationPoliciesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListPetDonationPoliciesQuery, ListPetDonationPoliciesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListPetDonationPoliciesQuery, ListPetDonationPoliciesQueryVariables>(ListPetDonationPoliciesDocument, options);
        }
export type ListPetDonationPoliciesQueryHookResult = ReturnType<typeof useListPetDonationPoliciesQuery>;
export type ListPetDonationPoliciesLazyQueryHookResult = ReturnType<typeof useListPetDonationPoliciesLazyQuery>;
export type ListPetDonationPoliciesSuspenseQueryHookResult = ReturnType<typeof useListPetDonationPoliciesSuspenseQuery>;
export type ListPetDonationPoliciesQueryResult = Apollo.QueryResult<ListPetDonationPoliciesQuery, ListPetDonationPoliciesQueryVariables>;