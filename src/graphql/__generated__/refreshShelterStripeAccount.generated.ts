import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RefreshShelterStripeAccountMutationVariables = Types.Exact<{
  shelter_id: Types.Scalars['ID']['input'];
}>;


export type RefreshShelterStripeAccountMutation = { __typename?: 'Mutation', refreshShelterStripeAccount: { __typename?: 'StripeAccountRefreshResult', success: boolean, requirements?: Array<string> | null, error?: { __typename?: 'Error', code: string, message: string } | null, connected_account?: { __typename?: 'StripeConnectedAccount', id: string, onboarding_status: string, verification_status: string, charges_enabled: boolean, payouts_enabled: boolean, details_submitted: boolean, donations_enabled: boolean, environment: Types.ConnectedAccountEnvironment } | null } };


export const RefreshShelterStripeAccountDocument = gql`
    mutation refreshShelterStripeAccount($shelter_id: ID!) {
  refreshShelterStripeAccount(shelter_id: $shelter_id) {
    success
    error {
      code
      message
    }
    requirements
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
    `;
export type RefreshShelterStripeAccountMutationFn = Apollo.MutationFunction<RefreshShelterStripeAccountMutation, RefreshShelterStripeAccountMutationVariables>;

/**
 * __useRefreshShelterStripeAccountMutation__
 *
 * To run a mutation, you first call `useRefreshShelterStripeAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshShelterStripeAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshShelterStripeAccountMutation, { data, loading, error }] = useRefreshShelterStripeAccountMutation({
 *   variables: {
 *      shelter_id: // value for 'shelter_id'
 *   },
 * });
 */
export function useRefreshShelterStripeAccountMutation(baseOptions?: Apollo.MutationHookOptions<RefreshShelterStripeAccountMutation, RefreshShelterStripeAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshShelterStripeAccountMutation, RefreshShelterStripeAccountMutationVariables>(RefreshShelterStripeAccountDocument, options);
      }
export type RefreshShelterStripeAccountMutationHookResult = ReturnType<typeof useRefreshShelterStripeAccountMutation>;
export type RefreshShelterStripeAccountMutationResult = Apollo.MutationResult<RefreshShelterStripeAccountMutation>;
export type RefreshShelterStripeAccountMutationOptions = Apollo.BaseMutationOptions<RefreshShelterStripeAccountMutation, RefreshShelterStripeAccountMutationVariables>;