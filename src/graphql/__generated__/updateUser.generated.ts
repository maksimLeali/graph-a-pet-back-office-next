import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateUserBoMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  data: Types.UserUpdate;
}>;


export type UpdateUserBoMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UserResult', success: boolean, user?: { __typename?: 'User', id: string, verified: boolean } | null, error?: { __typename?: 'Error', code: string, message: string } | null } };


export const UpdateUserBoDocument = gql`
    mutation updateUserBO($id: ID!, $data: UserUpdate!) {
  updateUser(id: $id, data: $data) {
    success
    user {
      id
      verified
    }
    error {
      code
      message
    }
  }
}
    `;
export type UpdateUserBoMutationFn = Apollo.MutationFunction<UpdateUserBoMutation, UpdateUserBoMutationVariables>;

/**
 * __useUpdateUserBoMutation__
 *
 * To run a mutation, you first call `useUpdateUserBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserBoMutation, { data, loading, error }] = useUpdateUserBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserBoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserBoMutation, UpdateUserBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserBoMutation, UpdateUserBoMutationVariables>(UpdateUserBoDocument, options);
      }
export type UpdateUserBoMutationHookResult = ReturnType<typeof useUpdateUserBoMutation>;
export type UpdateUserBoMutationResult = Apollo.MutationResult<UpdateUserBoMutation>;
export type UpdateUserBoMutationOptions = Apollo.BaseMutationOptions<UpdateUserBoMutation, UpdateUserBoMutationVariables>;