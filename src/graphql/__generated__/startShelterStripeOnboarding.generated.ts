import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StartShelterStripeOnboardingMutationVariables = Types.Exact<{
  shelter_id: Types.Scalars['ID']['input'];
  refresh_url: Types.Scalars['String']['input'];
  return_url: Types.Scalars['String']['input'];
}>;


export type StartShelterStripeOnboardingMutation = { __typename?: 'Mutation', startShelterStripeOnboarding: { __typename?: 'StripeOnboardingResult', success: boolean, onboarding_url?: string | null, error?: { __typename?: 'Error', code: string, message: string } | null, connected_account?: { __typename?: 'StripeConnectedAccount', id: string, onboarding_status: string, verification_status: string, charges_enabled: boolean, payouts_enabled: boolean, details_submitted: boolean, donations_enabled: boolean, environment: Types.ConnectedAccountEnvironment } | null } };


export const StartShelterStripeOnboardingDocument = gql`
    mutation startShelterStripeOnboarding($shelter_id: ID!, $refresh_url: String!, $return_url: String!) {
  startShelterStripeOnboarding(
    shelter_id: $shelter_id
    refresh_url: $refresh_url
    return_url: $return_url
  ) {
    success
    error {
      code
      message
    }
    onboarding_url
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
export type StartShelterStripeOnboardingMutationFn = Apollo.MutationFunction<StartShelterStripeOnboardingMutation, StartShelterStripeOnboardingMutationVariables>;

/**
 * __useStartShelterStripeOnboardingMutation__
 *
 * To run a mutation, you first call `useStartShelterStripeOnboardingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartShelterStripeOnboardingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startShelterStripeOnboardingMutation, { data, loading, error }] = useStartShelterStripeOnboardingMutation({
 *   variables: {
 *      shelter_id: // value for 'shelter_id'
 *      refresh_url: // value for 'refresh_url'
 *      return_url: // value for 'return_url'
 *   },
 * });
 */
export function useStartShelterStripeOnboardingMutation(baseOptions?: Apollo.MutationHookOptions<StartShelterStripeOnboardingMutation, StartShelterStripeOnboardingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartShelterStripeOnboardingMutation, StartShelterStripeOnboardingMutationVariables>(StartShelterStripeOnboardingDocument, options);
      }
export type StartShelterStripeOnboardingMutationHookResult = ReturnType<typeof useStartShelterStripeOnboardingMutation>;
export type StartShelterStripeOnboardingMutationResult = Apollo.MutationResult<StartShelterStripeOnboardingMutation>;
export type StartShelterStripeOnboardingMutationOptions = Apollo.BaseMutationOptions<StartShelterStripeOnboardingMutation, StartShelterStripeOnboardingMutationVariables>;