import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListShelterDonationsQueryVariables = Types.Exact<{
  shelter_id: Types.Scalars['ID']['input'];
  commonSearch?: Types.InputMaybe<Types.CommonSearch>;
}>;


export type ListShelterDonationsQuery = { __typename?: 'Query', listShelterDonations: { __typename?: 'PaginatedDonations', success?: boolean | null, error?: { __typename?: 'Error', code: string, message: string } | null, pagination: { __typename?: 'Pagination', total_items?: number | null, total_pages?: number | null, current_page?: number | null, page_size?: number | null }, items: Array<{ __typename?: 'Donation', id: string, target_type: Types.DonationTargetType, pet_id?: string | null, donor_type: Types.DonorType, donor_email?: string | null, currency: string, gross_amount_cents: number, platform_fee_amount_cents: number, processing_fee_amount_cents?: number | null, shelter_net_amount_cents?: number | null, status: Types.DonationStatus, refund_status: Types.RefundStatus, dispute_status: Types.DisputeStatus, is_test: boolean, created_at: string } | null> } };


export const ListShelterDonationsDocument = gql`
    query listShelterDonations($shelter_id: ID!, $commonSearch: CommonSearch) {
  listShelterDonations(shelter_id: $shelter_id, commonSearch: $commonSearch) {
    success
    error {
      code
      message
    }
    pagination {
      total_items
      total_pages
      current_page
      page_size
    }
    items {
      id
      target_type
      pet_id
      donor_type
      donor_email
      currency
      gross_amount_cents
      platform_fee_amount_cents
      processing_fee_amount_cents
      shelter_net_amount_cents
      status
      refund_status
      dispute_status
      is_test
      created_at
    }
  }
}
    `;

/**
 * __useListShelterDonationsQuery__
 *
 * To run a query within a React component, call `useListShelterDonationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListShelterDonationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListShelterDonationsQuery({
 *   variables: {
 *      shelter_id: // value for 'shelter_id'
 *      commonSearch: // value for 'commonSearch'
 *   },
 * });
 */
export function useListShelterDonationsQuery(baseOptions: Apollo.QueryHookOptions<ListShelterDonationsQuery, ListShelterDonationsQueryVariables> & ({ variables: ListShelterDonationsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListShelterDonationsQuery, ListShelterDonationsQueryVariables>(ListShelterDonationsDocument, options);
      }
export function useListShelterDonationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListShelterDonationsQuery, ListShelterDonationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListShelterDonationsQuery, ListShelterDonationsQueryVariables>(ListShelterDonationsDocument, options);
        }
export function useListShelterDonationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListShelterDonationsQuery, ListShelterDonationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListShelterDonationsQuery, ListShelterDonationsQueryVariables>(ListShelterDonationsDocument, options);
        }
export type ListShelterDonationsQueryHookResult = ReturnType<typeof useListShelterDonationsQuery>;
export type ListShelterDonationsLazyQueryHookResult = ReturnType<typeof useListShelterDonationsLazyQuery>;
export type ListShelterDonationsSuspenseQueryHookResult = ReturnType<typeof useListShelterDonationsSuspenseQuery>;
export type ListShelterDonationsQueryResult = Apollo.QueryResult<ListShelterDonationsQuery, ListShelterDonationsQueryVariables>;