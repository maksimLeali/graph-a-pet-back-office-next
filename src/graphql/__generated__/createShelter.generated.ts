import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateShelterBoMutationVariables = Types.Exact<{
  data: Types.ShelterCreate;
}>;


export type CreateShelterBoMutation = { __typename?: 'Mutation', createShelter: { __typename?: 'ShelterResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter?: { __typename?: 'Shelter', id: string, name: string, city: string, type: Types.ShelterType, verification_status: Types.ShelterVerificationStatus } | null } };


export const CreateShelterBoDocument = gql`
    mutation createShelterBO($data: ShelterCreate!) {
  createShelter(data: $data) {
    success
    error {
      code
      message
    }
    shelter {
      id
      name
      city
      type
      verification_status
    }
  }
}
    `;
export type CreateShelterBoMutationFn = Apollo.MutationFunction<CreateShelterBoMutation, CreateShelterBoMutationVariables>;

/**
 * __useCreateShelterBoMutation__
 *
 * To run a mutation, you first call `useCreateShelterBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShelterBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShelterBoMutation, { data, loading, error }] = useCreateShelterBoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateShelterBoMutation(baseOptions?: Apollo.MutationHookOptions<CreateShelterBoMutation, CreateShelterBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateShelterBoMutation, CreateShelterBoMutationVariables>(CreateShelterBoDocument, options);
      }
export type CreateShelterBoMutationHookResult = ReturnType<typeof useCreateShelterBoMutation>;
export type CreateShelterBoMutationResult = Apollo.MutationResult<CreateShelterBoMutation>;
export type CreateShelterBoMutationOptions = Apollo.BaseMutationOptions<CreateShelterBoMutation, CreateShelterBoMutationVariables>;