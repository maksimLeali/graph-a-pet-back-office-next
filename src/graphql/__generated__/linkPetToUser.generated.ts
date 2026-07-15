import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LinkPetToUserBoMutationVariables = Types.Exact<{
  userId: Types.Scalars['ID']['input'];
  petId: Types.Scalars['ID']['input'];
  custodyLevel?: Types.InputMaybe<Types.CustodyLevel>;
}>;


export type LinkPetToUserBoMutation = { __typename?: 'Mutation', linkPetToUser: { __typename?: 'OwnershipResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null } };


export const LinkPetToUserBoDocument = gql`
    mutation linkPetToUserBO($userId: ID!, $petId: ID!, $custodyLevel: CustodyLevel) {
  linkPetToUser(userId: $userId, petId: $petId, custodyLevel: $custodyLevel) {
    success
    error {
      code
      message
    }
  }
}
    `;
export type LinkPetToUserBoMutationFn = Apollo.MutationFunction<LinkPetToUserBoMutation, LinkPetToUserBoMutationVariables>;

/**
 * __useLinkPetToUserBoMutation__
 *
 * To run a mutation, you first call `useLinkPetToUserBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLinkPetToUserBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [linkPetToUserBoMutation, { data, loading, error }] = useLinkPetToUserBoMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      petId: // value for 'petId'
 *      custodyLevel: // value for 'custodyLevel'
 *   },
 * });
 */
export function useLinkPetToUserBoMutation(baseOptions?: Apollo.MutationHookOptions<LinkPetToUserBoMutation, LinkPetToUserBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LinkPetToUserBoMutation, LinkPetToUserBoMutationVariables>(LinkPetToUserBoDocument, options);
      }
export type LinkPetToUserBoMutationHookResult = ReturnType<typeof useLinkPetToUserBoMutation>;
export type LinkPetToUserBoMutationResult = Apollo.MutationResult<LinkPetToUserBoMutation>;
export type LinkPetToUserBoMutationOptions = Apollo.BaseMutationOptions<LinkPetToUserBoMutation, LinkPetToUserBoMutationVariables>;