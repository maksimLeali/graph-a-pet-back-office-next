import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeletePetMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type DeletePetMutation = { __typename?: 'Mutation', deletePet: { __typename?: 'DeleteResult', id?: string | null, success?: boolean | null, error?: { __typename?: 'Error', extra?: string | null, code: string, message: string } | null } };


export const DeletePetDocument = gql`
    mutation deletePet($id: ID!) {
  deletePet(id: $id) {
    id
    success
    error {
      extra
      code
      message
    }
  }
}
    `;
export type DeletePetMutationFn = Apollo.MutationFunction<DeletePetMutation, DeletePetMutationVariables>;

/**
 * __useDeletePetMutation__
 *
 * To run a mutation, you first call `useDeletePetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePetMutation, { data, loading, error }] = useDeletePetMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePetMutation(baseOptions?: Apollo.MutationHookOptions<DeletePetMutation, DeletePetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePetMutation, DeletePetMutationVariables>(DeletePetDocument, options);
      }
export type DeletePetMutationHookResult = ReturnType<typeof useDeletePetMutation>;
export type DeletePetMutationResult = Apollo.MutationResult<DeletePetMutation>;
export type DeletePetMutationOptions = Apollo.BaseMutationOptions<DeletePetMutation, DeletePetMutationVariables>;