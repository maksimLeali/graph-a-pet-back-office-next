import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetShelterDonationSettingsQueryVariables = Types.Exact<{
  shelter_id: Types.Scalars['ID']['input'];
}>;


export type GetShelterDonationSettingsQuery = { __typename?: 'Query', getShelterDonationSettings: { __typename?: 'ShelterDonationSettingsResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, settings?: { __typename?: 'ShelterDonationSettings', donations_enabled: boolean, default_pet_monthly_limit_cents: number, environment: string, connected_account?: { __typename?: 'StripeConnectedAccount', id: string, onboarding_status: string, verification_status: string, charges_enabled: boolean, payouts_enabled: boolean, details_submitted: boolean, donations_enabled: boolean, environment: Types.ConnectedAccountEnvironment } | null } | null } };


export const GetShelterDonationSettingsDocument = gql`
    query getShelterDonationSettings($shelter_id: ID!) {
  getShelterDonationSettings(shelter_id: $shelter_id) {
    success
    error {
      code
      message
    }
    settings {
      donations_enabled
      default_pet_monthly_limit_cents
      environment
      connected_account {
        id
        onboarding_status
        verification_status
        charges_enabled
        payouts_enabled
        details_submitted
        donations_enabled
        environment
      }
    }
  }
}
    `;

/**
 * __useGetShelterDonationSettingsQuery__
 *
 * To run a query within a React component, call `useGetShelterDonationSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetShelterDonationSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetShelterDonationSettingsQuery({
 *   variables: {
 *      shelter_id: // value for 'shelter_id'
 *   },
 * });
 */
export function useGetShelterDonationSettingsQuery(baseOptions: Apollo.QueryHookOptions<GetShelterDonationSettingsQuery, GetShelterDonationSettingsQueryVariables> & ({ variables: GetShelterDonationSettingsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetShelterDonationSettingsQuery, GetShelterDonationSettingsQueryVariables>(GetShelterDonationSettingsDocument, options);
      }
export function useGetShelterDonationSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetShelterDonationSettingsQuery, GetShelterDonationSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetShelterDonationSettingsQuery, GetShelterDonationSettingsQueryVariables>(GetShelterDonationSettingsDocument, options);
        }
export function useGetShelterDonationSettingsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetShelterDonationSettingsQuery, GetShelterDonationSettingsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetShelterDonationSettingsQuery, GetShelterDonationSettingsQueryVariables>(GetShelterDonationSettingsDocument, options);
        }
export type GetShelterDonationSettingsQueryHookResult = ReturnType<typeof useGetShelterDonationSettingsQuery>;
export type GetShelterDonationSettingsLazyQueryHookResult = ReturnType<typeof useGetShelterDonationSettingsLazyQuery>;
export type GetShelterDonationSettingsSuspenseQueryHookResult = ReturnType<typeof useGetShelterDonationSettingsSuspenseQuery>;
export type GetShelterDonationSettingsQueryResult = Apollo.QueryResult<GetShelterDonationSettingsQuery, GetShelterDonationSettingsQueryVariables>;