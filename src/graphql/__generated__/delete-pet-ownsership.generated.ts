import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeletePetOwnershipMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type DeletePetOwnershipMutation = { __typename?: 'Mutation', deleteOwnership: { __typename?: 'DeleteResult', success?: boolean | null, id?: string | null, error?: { __typename?: 'Error', code: string, extra?: string | null, message: string } | null } };


export const DeletePetOwnershipDocument = gql`
    mutation deletePetOwnership($id: ID!) {
  deleteOwnership(id: $id) {
    success
    id
    error {
      code
      extra
      message
    }
  }
}
    `;
export type DeletePetOwnershipMutationFn = Apollo.MutationFunction<DeletePetOwnershipMutation, DeletePetOwnershipMutationVariables>;

/**
 * __useDeletePetOwnershipMutation__
 *
 * To run a mutation, you first call `useDeletePetOwnershipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePetOwnershipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePetOwnershipMutation, { data, loading, error }] = useDeletePetOwnershipMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePetOwnershipMutation(baseOptions?: Apollo.MutationHookOptions<DeletePetOwnershipMutation, DeletePetOwnershipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePetOwnershipMutation, DeletePetOwnershipMutationVariables>(DeletePetOwnershipDocument, options);
      }
export type DeletePetOwnershipMutationHookResult = ReturnType<typeof useDeletePetOwnershipMutation>;
export type DeletePetOwnershipMutationResult = Apollo.MutationResult<DeletePetOwnershipMutation>;
export type DeletePetOwnershipMutationOptions = Apollo.BaseMutationOptions<DeletePetOwnershipMutation, DeletePetOwnershipMutationVariables>;