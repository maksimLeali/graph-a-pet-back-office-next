import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdatePetDonationLimitMutationVariables = Types.Exact<{
  data: Types.PetDonationLimitInput;
}>;


export type UpdatePetDonationLimitMutation = { __typename?: 'Mutation', updatePetDonationLimit: { __typename?: 'PetDonationPolicyResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, policy?: { __typename?: 'PetDonationPolicy', id: string, pet_id: string, shelter_id: string, custom_monthly_limit_cents?: number | null, is_active: boolean, updated_at?: string | null } | null } };


export const UpdatePetDonationLimitDocument = gql`
    mutation updatePetDonationLimit($data: PetDonationLimitInput!) {
  updatePetDonationLimit(data: $data) {
    success
    error {
      code
      message
    }
    policy {
      id
      pet_id
      shelter_id
      custom_monthly_limit_cents
      is_active
      updated_at
    }
  }
}
    `;
export type UpdatePetDonationLimitMutationFn = Apollo.MutationFunction<UpdatePetDonationLimitMutation, UpdatePetDonationLimitMutationVariables>;

/**
 * __useUpdatePetDonationLimitMutation__
 *
 * To run a mutation, you first call `useUpdatePetDonationLimitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePetDonationLimitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePetDonationLimitMutation, { data, loading, error }] = useUpdatePetDonationLimitMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdatePetDonationLimitMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePetDonationLimitMutation, UpdatePetDonationLimitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePetDonationLimitMutation, UpdatePetDonationLimitMutationVariables>(UpdatePetDonationLimitDocument, options);
      }
export type UpdatePetDonationLimitMutationHookResult = ReturnType<typeof useUpdatePetDonationLimitMutation>;
export type UpdatePetDonationLimitMutationResult = Apollo.MutationResult<UpdatePetDonationLimitMutation>;
export type UpdatePetDonationLimitMutationOptions = Apollo.BaseMutationOptions<UpdatePetDonationLimitMutation, UpdatePetDonationLimitMutationVariables>;