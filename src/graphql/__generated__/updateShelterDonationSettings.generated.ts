import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateShelterDonationSettingsMutationVariables = Types.Exact<{
  shelter_id: Types.Scalars['ID']['input'];
  data: Types.ShelterDonationSettingsInput;
}>;


export type UpdateShelterDonationSettingsMutation = { __typename?: 'Mutation', updateShelterDonationSettings: { __typename?: 'ShelterDonationSettingsResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, settings?: { __typename?: 'ShelterDonationSettings', donations_enabled: boolean, default_pet_monthly_limit_cents: number, environment: string } | null } };


export const UpdateShelterDonationSettingsDocument = gql`
    mutation updateShelterDonationSettings($shelter_id: ID!, $data: ShelterDonationSettingsInput!) {
  updateShelterDonationSettings(shelter_id: $shelter_id, data: $data) {
    success
    error {
      code
      message
    }
    settings {
      donations_enabled
      default_pet_monthly_limit_cents
      environment
    }
  }
}
    `;
export type UpdateShelterDonationSettingsMutationFn = Apollo.MutationFunction<UpdateShelterDonationSettingsMutation, UpdateShelterDonationSettingsMutationVariables>;

/**
 * __useUpdateShelterDonationSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateShelterDonationSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateShelterDonationSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateShelterDonationSettingsMutation, { data, loading, error }] = useUpdateShelterDonationSettingsMutation({
 *   variables: {
 *      shelter_id: // value for 'shelter_id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateShelterDonationSettingsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateShelterDonationSettingsMutation, UpdateShelterDonationSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateShelterDonationSettingsMutation, UpdateShelterDonationSettingsMutationVariables>(UpdateShelterDonationSettingsDocument, options);
      }
export type UpdateShelterDonationSettingsMutationHookResult = ReturnType<typeof useUpdateShelterDonationSettingsMutation>;
export type UpdateShelterDonationSettingsMutationResult = Apollo.MutationResult<UpdateShelterDonationSettingsMutation>;
export type UpdateShelterDonationSettingsMutationOptions = Apollo.BaseMutationOptions<UpdateShelterDonationSettingsMutation, UpdateShelterDonationSettingsMutationVariables>;