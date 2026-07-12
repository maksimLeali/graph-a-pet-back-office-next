import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddPetToUserBoMutationVariables = Types.Exact<{
  pet: Types.PetCreate;
  userId: Types.Scalars['String']['input'];
  custodyLevel?: Types.InputMaybe<Types.CustodyLevel>;
}>;


export type AddPetToUserBoMutation = { __typename?: 'Mutation', addPetToUser: { __typename?: 'PetAddedResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, data?: { __typename?: 'NewOwnership', pet: { __typename?: 'Pet', id: string, name: string }, ownership: { __typename?: 'Ownership', id: string } } | null } };


export const AddPetToUserBoDocument = gql`
    mutation addPetToUserBO($pet: PetCreate!, $userId: String!, $custodyLevel: CustodyLevel) {
  addPetToUser(pet: $pet, userId: $userId, custodyLevel: $custodyLevel) {
    success
    error {
      code
      message
    }
    data {
      pet {
        id
        name
      }
      ownership {
        id
      }
    }
  }
}
    `;
export type AddPetToUserBoMutationFn = Apollo.MutationFunction<AddPetToUserBoMutation, AddPetToUserBoMutationVariables>;

/**
 * __useAddPetToUserBoMutation__
 *
 * To run a mutation, you first call `useAddPetToUserBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPetToUserBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPetToUserBoMutation, { data, loading, error }] = useAddPetToUserBoMutation({
 *   variables: {
 *      pet: // value for 'pet'
 *      userId: // value for 'userId'
 *      custodyLevel: // value for 'custodyLevel'
 *   },
 * });
 */
export function useAddPetToUserBoMutation(baseOptions?: Apollo.MutationHookOptions<AddPetToUserBoMutation, AddPetToUserBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPetToUserBoMutation, AddPetToUserBoMutationVariables>(AddPetToUserBoDocument, options);
      }
export type AddPetToUserBoMutationHookResult = ReturnType<typeof useAddPetToUserBoMutation>;
export type AddPetToUserBoMutationResult = Apollo.MutationResult<AddPetToUserBoMutation>;
export type AddPetToUserBoMutationOptions = Apollo.BaseMutationOptions<AddPetToUserBoMutation, AddPetToUserBoMutationVariables>;