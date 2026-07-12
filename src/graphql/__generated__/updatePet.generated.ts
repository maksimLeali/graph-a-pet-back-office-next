import * as Types from '../../types';

import { gql } from '@apollo/client';
import { FullPetFragmentDoc } from './full-pet.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdatePetMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  data: Types.PetUpdate;
}>;


export type UpdatePetMutation = { __typename?: 'Mutation', updatePet: { __typename?: 'PetResult', success: boolean, pet?: { __typename?: 'Pet', id: string, name: string, birthday?: string | null, neutered?: boolean | null, gender?: Types.Gender | null, weight_kg?: number | null, diet?: Array<string | null> | null, chip_code?: string | null, intollerance?: Array<string | null> | null, temperament?: string | null, disciplines?: Array<string | null> | null, breed?: string | null, coat_length?: Types.CoatLength | null, years?: number | null, ownerships?: { __typename?: 'PaginatedOwnerships', items: Array<{ __typename?: 'Ownership', id: string, user: { __typename?: 'User', first_name: string, last_name: string, id: string, email: string } } | null> } | null } | null, error?: { __typename?: 'Error', message: string, code: string } | null } };


export const UpdatePetDocument = gql`
    mutation UpdatePet($id: ID!, $data: PetUpdate!) {
  updatePet(id: $id, data: $data) {
    pet {
      ...FullPet
    }
    success
    error {
      message
      code
    }
  }
}
    ${FullPetFragmentDoc}`;
export type UpdatePetMutationFn = Apollo.MutationFunction<UpdatePetMutation, UpdatePetMutationVariables>;

/**
 * __useUpdatePetMutation__
 *
 * To run a mutation, you first call `useUpdatePetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePetMutation, { data, loading, error }] = useUpdatePetMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdatePetMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePetMutation, UpdatePetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePetMutation, UpdatePetMutationVariables>(UpdatePetDocument, options);
      }
export type UpdatePetMutationHookResult = ReturnType<typeof useUpdatePetMutation>;
export type UpdatePetMutationResult = Apollo.MutationResult<UpdatePetMutation>;
export type UpdatePetMutationOptions = Apollo.BaseMutationOptions<UpdatePetMutation, UpdatePetMutationVariables>;