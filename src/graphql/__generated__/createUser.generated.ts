import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateUserBoMutationVariables = Types.Exact<{
  data: Types.UserCreate;
}>;


export type CreateUserBoMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, user?: { __typename?: 'User', id: string, first_name: string, last_name: string, email: string } | null } };


export const CreateUserBoDocument = gql`
    mutation createUserBO($data: UserCreate!) {
  createUser(data: $data) {
    success
    error {
      code
      message
    }
    user {
      id
      first_name
      last_name
      email
    }
  }
}
    `;
export type CreateUserBoMutationFn = Apollo.MutationFunction<CreateUserBoMutation, CreateUserBoMutationVariables>;

/**
 * __useCreateUserBoMutation__
 *
 * To run a mutation, you first call `useCreateUserBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserBoMutation, { data, loading, error }] = useCreateUserBoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserBoMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserBoMutation, CreateUserBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserBoMutation, CreateUserBoMutationVariables>(CreateUserBoDocument, options);
      }
export type CreateUserBoMutationHookResult = ReturnType<typeof useCreateUserBoMutation>;
export type CreateUserBoMutationResult = Apollo.MutationResult<CreateUserBoMutation>;
export type CreateUserBoMutationOptions = Apollo.BaseMutationOptions<CreateUserBoMutation, CreateUserBoMutationVariables>;