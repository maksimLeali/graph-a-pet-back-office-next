import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreatePetBoMutationVariables = Types.Exact<{
  data: Types.PetCreate;
}>;


export type CreatePetBoMutation = { __typename?: 'Mutation', createPet: { __typename?: 'PetResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, pet?: { __typename?: 'Pet', id: string, name: string } | null } };


export const CreatePetBoDocument = gql`
    mutation createPetBO($data: PetCreate!) {
  createPet(data: $data) {
    success
    error {
      code
      message
    }
    pet {
      id
      name
    }
  }
}
    `;
export type CreatePetBoMutationFn = Apollo.MutationFunction<CreatePetBoMutation, CreatePetBoMutationVariables>;

/**
 * __useCreatePetBoMutation__
 *
 * To run a mutation, you first call `useCreatePetBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePetBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPetBoMutation, { data, loading, error }] = useCreatePetBoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePetBoMutation(baseOptions?: Apollo.MutationHookOptions<CreatePetBoMutation, CreatePetBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePetBoMutation, CreatePetBoMutationVariables>(CreatePetBoDocument, options);
      }
export type CreatePetBoMutationHookResult = ReturnType<typeof useCreatePetBoMutation>;
export type CreatePetBoMutationResult = Apollo.MutationResult<CreatePetBoMutation>;
export type CreatePetBoMutationOptions = Apollo.BaseMutationOptions<CreatePetBoMutation, CreatePetBoMutationVariables>;