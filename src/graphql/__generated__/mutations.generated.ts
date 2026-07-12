import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateShelterPersonBoMutationVariables = Types.Exact<{
  data: Types.CreateShelterPersonInput;
}>;


export type CreateShelterPersonBoMutation = { __typename?: 'Mutation', createShelterPerson: { __typename?: 'ShelterPersonResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter_person?: { __typename?: 'ShelterPerson', id: string } | null } };

export type ArchiveShelterPersonBoMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type ArchiveShelterPersonBoMutation = { __typename?: 'Mutation', archiveShelterPerson: { __typename?: 'ShelterPersonResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter_person?: { __typename?: 'ShelterPerson', id: string } | null } };

export type CreateShelterInviteBoMutationVariables = Types.Exact<{
  data: Types.ShelterInviteCreate;
}>;


export type CreateShelterInviteBoMutation = { __typename?: 'Mutation', createShelterInvite: { __typename?: 'ShelterInviteResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter_invite?: { __typename?: 'ShelterInvite', id: string, status: Types.ShelterInviteStatus } | null } };

export type CreateShelterRoleBoMutationVariables = Types.Exact<{
  data: Types.ShelterRoleCreate;
}>;


export type CreateShelterRoleBoMutation = { __typename?: 'Mutation', createShelterRole: { __typename?: 'ShelterRoleResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter_role?: { __typename?: 'ShelterRole', id: string } | null } };

export type UpdateShelterRoleBoMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  data: Types.ShelterRoleUpdate;
}>;


export type UpdateShelterRoleBoMutation = { __typename?: 'Mutation', updateShelterRole: { __typename?: 'ShelterRoleResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter_role?: { __typename?: 'ShelterRole', id: string, role: Types.RoleLevel } | null } };

export type DeleteShelterRoleBoMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type DeleteShelterRoleBoMutation = { __typename?: 'Mutation', deleteShelterRole: { __typename?: 'DeleteResult', success?: boolean | null, id?: string | null, error?: { __typename?: 'Error', code: string, message: string } | null } };

export type CreateShelterPetsWithDataBoMutationVariables = Types.Exact<{
  data: Types.ShelterPetsWithDataCreate;
}>;


export type CreateShelterPetsWithDataBoMutation = { __typename?: 'Mutation', createShelterPetsWithData: { __typename?: 'ShelterPetsResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter_pets?: Array<{ __typename?: 'ShelterPet', id: string } | null> | null } };

export type CreateShelterPetBoMutationVariables = Types.Exact<{
  data: Types.ShelterPetCreate;
}>;


export type CreateShelterPetBoMutation = { __typename?: 'Mutation', createShelterPet: { __typename?: 'ShelterPetResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter_pet?: { __typename?: 'ShelterPet', id: string } | null } };

export type DeleteShelterPetBoMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type DeleteShelterPetBoMutation = { __typename?: 'Mutation', deleteShelterPet: { __typename?: 'DeleteResult', success?: boolean | null, id?: string | null, error?: { __typename?: 'Error', code: string, message: string } | null } };

export type CreateShelterInventoryItemBoMutationVariables = Types.Exact<{
  data: Types.ShelterInventoryItemCreate;
}>;


export type CreateShelterInventoryItemBoMutation = { __typename?: 'Mutation', createShelterInventoryItem: { __typename?: 'ShelterInventoryItemResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, item?: { __typename?: 'ShelterInventoryItem', id: string } | null } };

export type CreateShelterInventoryMovementBoMutationVariables = Types.Exact<{
  data: Types.ShelterInventoryMovementCreate;
}>;


export type CreateShelterInventoryMovementBoMutation = { __typename?: 'Mutation', createShelterInventoryMovement: { __typename?: 'ShelterInventoryMovementResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, movement?: { __typename?: 'ShelterInventoryMovement', id: string } | null } };

export type ArchiveShelterInventoryItemBoMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type ArchiveShelterInventoryItemBoMutation = { __typename?: 'Mutation', archiveShelterInventoryItem: { __typename?: 'ShelterInventoryItemResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, item?: { __typename?: 'ShelterInventoryItem', id: string } | null } };

export type DeleteShelterInventoryItemBoMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type DeleteShelterInventoryItemBoMutation = { __typename?: 'Mutation', deleteShelterInventoryItem: { __typename?: 'DeleteResult', success?: boolean | null, id?: string | null, error?: { __typename?: 'Error', code: string, message: string } | null } };

export type CreateShelterWalkBoMutationVariables = Types.Exact<{
  data: Types.ShelterWalkCreate;
}>;


export type CreateShelterWalkBoMutation = { __typename?: 'Mutation', createShelterWalk: { __typename?: 'ShelterWalkResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter_walk?: { __typename?: 'ShelterWalk', id: string } | null } };

export type StartShelterWalkBoMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type StartShelterWalkBoMutation = { __typename?: 'Mutation', startShelterWalk: { __typename?: 'ShelterWalkResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter_walk?: { __typename?: 'ShelterWalk', id: string, status: Types.ShelterWalkStatus } | null } };

export type CompleteShelterWalkBoMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  notes?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type CompleteShelterWalkBoMutation = { __typename?: 'Mutation', completeShelterWalk: { __typename?: 'ShelterWalkResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter_walk?: { __typename?: 'ShelterWalk', id: string, status: Types.ShelterWalkStatus } | null } };

export type CancelShelterWalkBoMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  reason?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type CancelShelterWalkBoMutation = { __typename?: 'Mutation', cancelShelterWalk: { __typename?: 'ShelterWalkResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter_walk?: { __typename?: 'ShelterWalk', id: string, status: Types.ShelterWalkStatus } | null } };

export type DeleteShelterWalkBoMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type DeleteShelterWalkBoMutation = { __typename?: 'Mutation', deleteShelterWalk: { __typename?: 'DeleteResult', success?: boolean | null, id?: string | null, error?: { __typename?: 'Error', code: string, message: string } | null } };

export type CreateShelterTaskBoMutationVariables = Types.Exact<{
  data: Types.ShelterTaskCreate;
}>;


export type CreateShelterTaskBoMutation = { __typename?: 'Mutation', createShelterTask: { __typename?: 'ShelterTaskResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter_task?: { __typename?: 'ShelterTask', id: string } | null } };

export type CompleteShelterTaskBoMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  notes?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type CompleteShelterTaskBoMutation = { __typename?: 'Mutation', completeShelterTask: { __typename?: 'ShelterTaskResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter_task?: { __typename?: 'ShelterTask', id: string, status: Types.TaskStatus } | null } };

export type SkipShelterTaskBoMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  reason?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type SkipShelterTaskBoMutation = { __typename?: 'Mutation', skipShelterTask: { __typename?: 'ShelterTaskResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter_task?: { __typename?: 'ShelterTask', id: string, status: Types.TaskStatus } | null } };

export type DeleteShelterTaskBoMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type DeleteShelterTaskBoMutation = { __typename?: 'Mutation', deleteShelterTask: { __typename?: 'DeleteResult', success?: boolean | null, id?: string | null, error?: { __typename?: 'Error', code: string, message: string } | null } };


export const CreateShelterPersonBoDocument = gql`
    mutation createShelterPersonBO($data: CreateShelterPersonInput!) {
  createShelterPerson(data: $data) {
    success
    error {
      code
      message
    }
    shelter_person {
      id
    }
  }
}
    `;
export type CreateShelterPersonBoMutationFn = Apollo.MutationFunction<CreateShelterPersonBoMutation, CreateShelterPersonBoMutationVariables>;

/**
 * __useCreateShelterPersonBoMutation__
 *
 * To run a mutation, you first call `useCreateShelterPersonBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShelterPersonBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShelterPersonBoMutation, { data, loading, error }] = useCreateShelterPersonBoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateShelterPersonBoMutation(baseOptions?: Apollo.MutationHookOptions<CreateShelterPersonBoMutation, CreateShelterPersonBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateShelterPersonBoMutation, CreateShelterPersonBoMutationVariables>(CreateShelterPersonBoDocument, options);
      }
export type CreateShelterPersonBoMutationHookResult = ReturnType<typeof useCreateShelterPersonBoMutation>;
export type CreateShelterPersonBoMutationResult = Apollo.MutationResult<CreateShelterPersonBoMutation>;
export type CreateShelterPersonBoMutationOptions = Apollo.BaseMutationOptions<CreateShelterPersonBoMutation, CreateShelterPersonBoMutationVariables>;
export const ArchiveShelterPersonBoDocument = gql`
    mutation archiveShelterPersonBO($id: ID!) {
  archiveShelterPerson(id: $id) {
    success
    error {
      code
      message
    }
    shelter_person {
      id
    }
  }
}
    `;
export type ArchiveShelterPersonBoMutationFn = Apollo.MutationFunction<ArchiveShelterPersonBoMutation, ArchiveShelterPersonBoMutationVariables>;

/**
 * __useArchiveShelterPersonBoMutation__
 *
 * To run a mutation, you first call `useArchiveShelterPersonBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveShelterPersonBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveShelterPersonBoMutation, { data, loading, error }] = useArchiveShelterPersonBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArchiveShelterPersonBoMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveShelterPersonBoMutation, ArchiveShelterPersonBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveShelterPersonBoMutation, ArchiveShelterPersonBoMutationVariables>(ArchiveShelterPersonBoDocument, options);
      }
export type ArchiveShelterPersonBoMutationHookResult = ReturnType<typeof useArchiveShelterPersonBoMutation>;
export type ArchiveShelterPersonBoMutationResult = Apollo.MutationResult<ArchiveShelterPersonBoMutation>;
export type ArchiveShelterPersonBoMutationOptions = Apollo.BaseMutationOptions<ArchiveShelterPersonBoMutation, ArchiveShelterPersonBoMutationVariables>;
export const CreateShelterInviteBoDocument = gql`
    mutation createShelterInviteBO($data: ShelterInviteCreate!) {
  createShelterInvite(data: $data) {
    success
    error {
      code
      message
    }
    shelter_invite {
      id
      status
    }
  }
}
    `;
export type CreateShelterInviteBoMutationFn = Apollo.MutationFunction<CreateShelterInviteBoMutation, CreateShelterInviteBoMutationVariables>;

/**
 * __useCreateShelterInviteBoMutation__
 *
 * To run a mutation, you first call `useCreateShelterInviteBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShelterInviteBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShelterInviteBoMutation, { data, loading, error }] = useCreateShelterInviteBoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateShelterInviteBoMutation(baseOptions?: Apollo.MutationHookOptions<CreateShelterInviteBoMutation, CreateShelterInviteBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateShelterInviteBoMutation, CreateShelterInviteBoMutationVariables>(CreateShelterInviteBoDocument, options);
      }
export type CreateShelterInviteBoMutationHookResult = ReturnType<typeof useCreateShelterInviteBoMutation>;
export type CreateShelterInviteBoMutationResult = Apollo.MutationResult<CreateShelterInviteBoMutation>;
export type CreateShelterInviteBoMutationOptions = Apollo.BaseMutationOptions<CreateShelterInviteBoMutation, CreateShelterInviteBoMutationVariables>;
export const CreateShelterRoleBoDocument = gql`
    mutation createShelterRoleBO($data: ShelterRoleCreate!) {
  createShelterRole(data: $data) {
    success
    error {
      code
      message
    }
    shelter_role {
      id
    }
  }
}
    `;
export type CreateShelterRoleBoMutationFn = Apollo.MutationFunction<CreateShelterRoleBoMutation, CreateShelterRoleBoMutationVariables>;

/**
 * __useCreateShelterRoleBoMutation__
 *
 * To run a mutation, you first call `useCreateShelterRoleBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShelterRoleBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShelterRoleBoMutation, { data, loading, error }] = useCreateShelterRoleBoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateShelterRoleBoMutation(baseOptions?: Apollo.MutationHookOptions<CreateShelterRoleBoMutation, CreateShelterRoleBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateShelterRoleBoMutation, CreateShelterRoleBoMutationVariables>(CreateShelterRoleBoDocument, options);
      }
export type CreateShelterRoleBoMutationHookResult = ReturnType<typeof useCreateShelterRoleBoMutation>;
export type CreateShelterRoleBoMutationResult = Apollo.MutationResult<CreateShelterRoleBoMutation>;
export type CreateShelterRoleBoMutationOptions = Apollo.BaseMutationOptions<CreateShelterRoleBoMutation, CreateShelterRoleBoMutationVariables>;
export const UpdateShelterRoleBoDocument = gql`
    mutation updateShelterRoleBO($id: ID!, $data: ShelterRoleUpdate!) {
  updateShelterRole(id: $id, data: $data) {
    success
    error {
      code
      message
    }
    shelter_role {
      id
      role
    }
  }
}
    `;
export type UpdateShelterRoleBoMutationFn = Apollo.MutationFunction<UpdateShelterRoleBoMutation, UpdateShelterRoleBoMutationVariables>;

/**
 * __useUpdateShelterRoleBoMutation__
 *
 * To run a mutation, you first call `useUpdateShelterRoleBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateShelterRoleBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateShelterRoleBoMutation, { data, loading, error }] = useUpdateShelterRoleBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateShelterRoleBoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateShelterRoleBoMutation, UpdateShelterRoleBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateShelterRoleBoMutation, UpdateShelterRoleBoMutationVariables>(UpdateShelterRoleBoDocument, options);
      }
export type UpdateShelterRoleBoMutationHookResult = ReturnType<typeof useUpdateShelterRoleBoMutation>;
export type UpdateShelterRoleBoMutationResult = Apollo.MutationResult<UpdateShelterRoleBoMutation>;
export type UpdateShelterRoleBoMutationOptions = Apollo.BaseMutationOptions<UpdateShelterRoleBoMutation, UpdateShelterRoleBoMutationVariables>;
export const DeleteShelterRoleBoDocument = gql`
    mutation deleteShelterRoleBO($id: ID!) {
  deleteShelterRole(id: $id) {
    success
    error {
      code
      message
    }
    id
  }
}
    `;
export type DeleteShelterRoleBoMutationFn = Apollo.MutationFunction<DeleteShelterRoleBoMutation, DeleteShelterRoleBoMutationVariables>;

/**
 * __useDeleteShelterRoleBoMutation__
 *
 * To run a mutation, you first call `useDeleteShelterRoleBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteShelterRoleBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteShelterRoleBoMutation, { data, loading, error }] = useDeleteShelterRoleBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteShelterRoleBoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteShelterRoleBoMutation, DeleteShelterRoleBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteShelterRoleBoMutation, DeleteShelterRoleBoMutationVariables>(DeleteShelterRoleBoDocument, options);
      }
export type DeleteShelterRoleBoMutationHookResult = ReturnType<typeof useDeleteShelterRoleBoMutation>;
export type DeleteShelterRoleBoMutationResult = Apollo.MutationResult<DeleteShelterRoleBoMutation>;
export type DeleteShelterRoleBoMutationOptions = Apollo.BaseMutationOptions<DeleteShelterRoleBoMutation, DeleteShelterRoleBoMutationVariables>;
export const CreateShelterPetsWithDataBoDocument = gql`
    mutation createShelterPetsWithDataBO($data: ShelterPetsWithDataCreate!) {
  createShelterPetsWithData(data: $data) {
    success
    error {
      code
      message
    }
    shelter_pets {
      id
    }
  }
}
    `;
export type CreateShelterPetsWithDataBoMutationFn = Apollo.MutationFunction<CreateShelterPetsWithDataBoMutation, CreateShelterPetsWithDataBoMutationVariables>;

/**
 * __useCreateShelterPetsWithDataBoMutation__
 *
 * To run a mutation, you first call `useCreateShelterPetsWithDataBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShelterPetsWithDataBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShelterPetsWithDataBoMutation, { data, loading, error }] = useCreateShelterPetsWithDataBoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateShelterPetsWithDataBoMutation(baseOptions?: Apollo.MutationHookOptions<CreateShelterPetsWithDataBoMutation, CreateShelterPetsWithDataBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateShelterPetsWithDataBoMutation, CreateShelterPetsWithDataBoMutationVariables>(CreateShelterPetsWithDataBoDocument, options);
      }
export type CreateShelterPetsWithDataBoMutationHookResult = ReturnType<typeof useCreateShelterPetsWithDataBoMutation>;
export type CreateShelterPetsWithDataBoMutationResult = Apollo.MutationResult<CreateShelterPetsWithDataBoMutation>;
export type CreateShelterPetsWithDataBoMutationOptions = Apollo.BaseMutationOptions<CreateShelterPetsWithDataBoMutation, CreateShelterPetsWithDataBoMutationVariables>;
export const CreateShelterPetBoDocument = gql`
    mutation createShelterPetBO($data: ShelterPetCreate!) {
  createShelterPet(data: $data) {
    success
    error {
      code
      message
    }
    shelter_pet {
      id
    }
  }
}
    `;
export type CreateShelterPetBoMutationFn = Apollo.MutationFunction<CreateShelterPetBoMutation, CreateShelterPetBoMutationVariables>;

/**
 * __useCreateShelterPetBoMutation__
 *
 * To run a mutation, you first call `useCreateShelterPetBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShelterPetBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShelterPetBoMutation, { data, loading, error }] = useCreateShelterPetBoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateShelterPetBoMutation(baseOptions?: Apollo.MutationHookOptions<CreateShelterPetBoMutation, CreateShelterPetBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateShelterPetBoMutation, CreateShelterPetBoMutationVariables>(CreateShelterPetBoDocument, options);
      }
export type CreateShelterPetBoMutationHookResult = ReturnType<typeof useCreateShelterPetBoMutation>;
export type CreateShelterPetBoMutationResult = Apollo.MutationResult<CreateShelterPetBoMutation>;
export type CreateShelterPetBoMutationOptions = Apollo.BaseMutationOptions<CreateShelterPetBoMutation, CreateShelterPetBoMutationVariables>;
export const DeleteShelterPetBoDocument = gql`
    mutation deleteShelterPetBO($id: ID!) {
  deleteShelterPet(id: $id) {
    success
    error {
      code
      message
    }
    id
  }
}
    `;
export type DeleteShelterPetBoMutationFn = Apollo.MutationFunction<DeleteShelterPetBoMutation, DeleteShelterPetBoMutationVariables>;

/**
 * __useDeleteShelterPetBoMutation__
 *
 * To run a mutation, you first call `useDeleteShelterPetBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteShelterPetBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteShelterPetBoMutation, { data, loading, error }] = useDeleteShelterPetBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteShelterPetBoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteShelterPetBoMutation, DeleteShelterPetBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteShelterPetBoMutation, DeleteShelterPetBoMutationVariables>(DeleteShelterPetBoDocument, options);
      }
export type DeleteShelterPetBoMutationHookResult = ReturnType<typeof useDeleteShelterPetBoMutation>;
export type DeleteShelterPetBoMutationResult = Apollo.MutationResult<DeleteShelterPetBoMutation>;
export type DeleteShelterPetBoMutationOptions = Apollo.BaseMutationOptions<DeleteShelterPetBoMutation, DeleteShelterPetBoMutationVariables>;
export const CreateShelterInventoryItemBoDocument = gql`
    mutation createShelterInventoryItemBO($data: ShelterInventoryItemCreate!) {
  createShelterInventoryItem(data: $data) {
    success
    error {
      code
      message
    }
    item {
      id
    }
  }
}
    `;
export type CreateShelterInventoryItemBoMutationFn = Apollo.MutationFunction<CreateShelterInventoryItemBoMutation, CreateShelterInventoryItemBoMutationVariables>;

/**
 * __useCreateShelterInventoryItemBoMutation__
 *
 * To run a mutation, you first call `useCreateShelterInventoryItemBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShelterInventoryItemBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShelterInventoryItemBoMutation, { data, loading, error }] = useCreateShelterInventoryItemBoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateShelterInventoryItemBoMutation(baseOptions?: Apollo.MutationHookOptions<CreateShelterInventoryItemBoMutation, CreateShelterInventoryItemBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateShelterInventoryItemBoMutation, CreateShelterInventoryItemBoMutationVariables>(CreateShelterInventoryItemBoDocument, options);
      }
export type CreateShelterInventoryItemBoMutationHookResult = ReturnType<typeof useCreateShelterInventoryItemBoMutation>;
export type CreateShelterInventoryItemBoMutationResult = Apollo.MutationResult<CreateShelterInventoryItemBoMutation>;
export type CreateShelterInventoryItemBoMutationOptions = Apollo.BaseMutationOptions<CreateShelterInventoryItemBoMutation, CreateShelterInventoryItemBoMutationVariables>;
export const CreateShelterInventoryMovementBoDocument = gql`
    mutation createShelterInventoryMovementBO($data: ShelterInventoryMovementCreate!) {
  createShelterInventoryMovement(data: $data) {
    success
    error {
      code
      message
    }
    movement {
      id
    }
  }
}
    `;
export type CreateShelterInventoryMovementBoMutationFn = Apollo.MutationFunction<CreateShelterInventoryMovementBoMutation, CreateShelterInventoryMovementBoMutationVariables>;

/**
 * __useCreateShelterInventoryMovementBoMutation__
 *
 * To run a mutation, you first call `useCreateShelterInventoryMovementBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShelterInventoryMovementBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShelterInventoryMovementBoMutation, { data, loading, error }] = useCreateShelterInventoryMovementBoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateShelterInventoryMovementBoMutation(baseOptions?: Apollo.MutationHookOptions<CreateShelterInventoryMovementBoMutation, CreateShelterInventoryMovementBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateShelterInventoryMovementBoMutation, CreateShelterInventoryMovementBoMutationVariables>(CreateShelterInventoryMovementBoDocument, options);
      }
export type CreateShelterInventoryMovementBoMutationHookResult = ReturnType<typeof useCreateShelterInventoryMovementBoMutation>;
export type CreateShelterInventoryMovementBoMutationResult = Apollo.MutationResult<CreateShelterInventoryMovementBoMutation>;
export type CreateShelterInventoryMovementBoMutationOptions = Apollo.BaseMutationOptions<CreateShelterInventoryMovementBoMutation, CreateShelterInventoryMovementBoMutationVariables>;
export const ArchiveShelterInventoryItemBoDocument = gql`
    mutation archiveShelterInventoryItemBO($id: ID!) {
  archiveShelterInventoryItem(id: $id) {
    success
    error {
      code
      message
    }
    item {
      id
    }
  }
}
    `;
export type ArchiveShelterInventoryItemBoMutationFn = Apollo.MutationFunction<ArchiveShelterInventoryItemBoMutation, ArchiveShelterInventoryItemBoMutationVariables>;

/**
 * __useArchiveShelterInventoryItemBoMutation__
 *
 * To run a mutation, you first call `useArchiveShelterInventoryItemBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveShelterInventoryItemBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveShelterInventoryItemBoMutation, { data, loading, error }] = useArchiveShelterInventoryItemBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArchiveShelterInventoryItemBoMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveShelterInventoryItemBoMutation, ArchiveShelterInventoryItemBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveShelterInventoryItemBoMutation, ArchiveShelterInventoryItemBoMutationVariables>(ArchiveShelterInventoryItemBoDocument, options);
      }
export type ArchiveShelterInventoryItemBoMutationHookResult = ReturnType<typeof useArchiveShelterInventoryItemBoMutation>;
export type ArchiveShelterInventoryItemBoMutationResult = Apollo.MutationResult<ArchiveShelterInventoryItemBoMutation>;
export type ArchiveShelterInventoryItemBoMutationOptions = Apollo.BaseMutationOptions<ArchiveShelterInventoryItemBoMutation, ArchiveShelterInventoryItemBoMutationVariables>;
export const DeleteShelterInventoryItemBoDocument = gql`
    mutation deleteShelterInventoryItemBO($id: ID!) {
  deleteShelterInventoryItem(id: $id) {
    success
    error {
      code
      message
    }
    id
  }
}
    `;
export type DeleteShelterInventoryItemBoMutationFn = Apollo.MutationFunction<DeleteShelterInventoryItemBoMutation, DeleteShelterInventoryItemBoMutationVariables>;

/**
 * __useDeleteShelterInventoryItemBoMutation__
 *
 * To run a mutation, you first call `useDeleteShelterInventoryItemBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteShelterInventoryItemBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteShelterInventoryItemBoMutation, { data, loading, error }] = useDeleteShelterInventoryItemBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteShelterInventoryItemBoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteShelterInventoryItemBoMutation, DeleteShelterInventoryItemBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteShelterInventoryItemBoMutation, DeleteShelterInventoryItemBoMutationVariables>(DeleteShelterInventoryItemBoDocument, options);
      }
export type DeleteShelterInventoryItemBoMutationHookResult = ReturnType<typeof useDeleteShelterInventoryItemBoMutation>;
export type DeleteShelterInventoryItemBoMutationResult = Apollo.MutationResult<DeleteShelterInventoryItemBoMutation>;
export type DeleteShelterInventoryItemBoMutationOptions = Apollo.BaseMutationOptions<DeleteShelterInventoryItemBoMutation, DeleteShelterInventoryItemBoMutationVariables>;
export const CreateShelterWalkBoDocument = gql`
    mutation createShelterWalkBO($data: ShelterWalkCreate!) {
  createShelterWalk(data: $data) {
    success
    error {
      code
      message
    }
    shelter_walk {
      id
    }
  }
}
    `;
export type CreateShelterWalkBoMutationFn = Apollo.MutationFunction<CreateShelterWalkBoMutation, CreateShelterWalkBoMutationVariables>;

/**
 * __useCreateShelterWalkBoMutation__
 *
 * To run a mutation, you first call `useCreateShelterWalkBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShelterWalkBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShelterWalkBoMutation, { data, loading, error }] = useCreateShelterWalkBoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateShelterWalkBoMutation(baseOptions?: Apollo.MutationHookOptions<CreateShelterWalkBoMutation, CreateShelterWalkBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateShelterWalkBoMutation, CreateShelterWalkBoMutationVariables>(CreateShelterWalkBoDocument, options);
      }
export type CreateShelterWalkBoMutationHookResult = ReturnType<typeof useCreateShelterWalkBoMutation>;
export type CreateShelterWalkBoMutationResult = Apollo.MutationResult<CreateShelterWalkBoMutation>;
export type CreateShelterWalkBoMutationOptions = Apollo.BaseMutationOptions<CreateShelterWalkBoMutation, CreateShelterWalkBoMutationVariables>;
export const StartShelterWalkBoDocument = gql`
    mutation startShelterWalkBO($id: ID!) {
  startShelterWalk(id: $id) {
    success
    error {
      code
      message
    }
    shelter_walk {
      id
      status
    }
  }
}
    `;
export type StartShelterWalkBoMutationFn = Apollo.MutationFunction<StartShelterWalkBoMutation, StartShelterWalkBoMutationVariables>;

/**
 * __useStartShelterWalkBoMutation__
 *
 * To run a mutation, you first call `useStartShelterWalkBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartShelterWalkBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startShelterWalkBoMutation, { data, loading, error }] = useStartShelterWalkBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStartShelterWalkBoMutation(baseOptions?: Apollo.MutationHookOptions<StartShelterWalkBoMutation, StartShelterWalkBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartShelterWalkBoMutation, StartShelterWalkBoMutationVariables>(StartShelterWalkBoDocument, options);
      }
export type StartShelterWalkBoMutationHookResult = ReturnType<typeof useStartShelterWalkBoMutation>;
export type StartShelterWalkBoMutationResult = Apollo.MutationResult<StartShelterWalkBoMutation>;
export type StartShelterWalkBoMutationOptions = Apollo.BaseMutationOptions<StartShelterWalkBoMutation, StartShelterWalkBoMutationVariables>;
export const CompleteShelterWalkBoDocument = gql`
    mutation completeShelterWalkBO($id: ID!, $notes: String) {
  completeShelterWalk(id: $id, notes: $notes) {
    success
    error {
      code
      message
    }
    shelter_walk {
      id
      status
    }
  }
}
    `;
export type CompleteShelterWalkBoMutationFn = Apollo.MutationFunction<CompleteShelterWalkBoMutation, CompleteShelterWalkBoMutationVariables>;

/**
 * __useCompleteShelterWalkBoMutation__
 *
 * To run a mutation, you first call `useCompleteShelterWalkBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteShelterWalkBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeShelterWalkBoMutation, { data, loading, error }] = useCompleteShelterWalkBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      notes: // value for 'notes'
 *   },
 * });
 */
export function useCompleteShelterWalkBoMutation(baseOptions?: Apollo.MutationHookOptions<CompleteShelterWalkBoMutation, CompleteShelterWalkBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteShelterWalkBoMutation, CompleteShelterWalkBoMutationVariables>(CompleteShelterWalkBoDocument, options);
      }
export type CompleteShelterWalkBoMutationHookResult = ReturnType<typeof useCompleteShelterWalkBoMutation>;
export type CompleteShelterWalkBoMutationResult = Apollo.MutationResult<CompleteShelterWalkBoMutation>;
export type CompleteShelterWalkBoMutationOptions = Apollo.BaseMutationOptions<CompleteShelterWalkBoMutation, CompleteShelterWalkBoMutationVariables>;
export const CancelShelterWalkBoDocument = gql`
    mutation cancelShelterWalkBO($id: ID!, $reason: String) {
  cancelShelterWalk(id: $id, reason: $reason) {
    success
    error {
      code
      message
    }
    shelter_walk {
      id
      status
    }
  }
}
    `;
export type CancelShelterWalkBoMutationFn = Apollo.MutationFunction<CancelShelterWalkBoMutation, CancelShelterWalkBoMutationVariables>;

/**
 * __useCancelShelterWalkBoMutation__
 *
 * To run a mutation, you first call `useCancelShelterWalkBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelShelterWalkBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelShelterWalkBoMutation, { data, loading, error }] = useCancelShelterWalkBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useCancelShelterWalkBoMutation(baseOptions?: Apollo.MutationHookOptions<CancelShelterWalkBoMutation, CancelShelterWalkBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelShelterWalkBoMutation, CancelShelterWalkBoMutationVariables>(CancelShelterWalkBoDocument, options);
      }
export type CancelShelterWalkBoMutationHookResult = ReturnType<typeof useCancelShelterWalkBoMutation>;
export type CancelShelterWalkBoMutationResult = Apollo.MutationResult<CancelShelterWalkBoMutation>;
export type CancelShelterWalkBoMutationOptions = Apollo.BaseMutationOptions<CancelShelterWalkBoMutation, CancelShelterWalkBoMutationVariables>;
export const DeleteShelterWalkBoDocument = gql`
    mutation deleteShelterWalkBO($id: ID!) {
  deleteShelterWalk(id: $id) {
    success
    error {
      code
      message
    }
    id
  }
}
    `;
export type DeleteShelterWalkBoMutationFn = Apollo.MutationFunction<DeleteShelterWalkBoMutation, DeleteShelterWalkBoMutationVariables>;

/**
 * __useDeleteShelterWalkBoMutation__
 *
 * To run a mutation, you first call `useDeleteShelterWalkBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteShelterWalkBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteShelterWalkBoMutation, { data, loading, error }] = useDeleteShelterWalkBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteShelterWalkBoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteShelterWalkBoMutation, DeleteShelterWalkBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteShelterWalkBoMutation, DeleteShelterWalkBoMutationVariables>(DeleteShelterWalkBoDocument, options);
      }
export type DeleteShelterWalkBoMutationHookResult = ReturnType<typeof useDeleteShelterWalkBoMutation>;
export type DeleteShelterWalkBoMutationResult = Apollo.MutationResult<DeleteShelterWalkBoMutation>;
export type DeleteShelterWalkBoMutationOptions = Apollo.BaseMutationOptions<DeleteShelterWalkBoMutation, DeleteShelterWalkBoMutationVariables>;
export const CreateShelterTaskBoDocument = gql`
    mutation createShelterTaskBO($data: ShelterTaskCreate!) {
  createShelterTask(data: $data) {
    success
    error {
      code
      message
    }
    shelter_task {
      id
    }
  }
}
    `;
export type CreateShelterTaskBoMutationFn = Apollo.MutationFunction<CreateShelterTaskBoMutation, CreateShelterTaskBoMutationVariables>;

/**
 * __useCreateShelterTaskBoMutation__
 *
 * To run a mutation, you first call `useCreateShelterTaskBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShelterTaskBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShelterTaskBoMutation, { data, loading, error }] = useCreateShelterTaskBoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateShelterTaskBoMutation(baseOptions?: Apollo.MutationHookOptions<CreateShelterTaskBoMutation, CreateShelterTaskBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateShelterTaskBoMutation, CreateShelterTaskBoMutationVariables>(CreateShelterTaskBoDocument, options);
      }
export type CreateShelterTaskBoMutationHookResult = ReturnType<typeof useCreateShelterTaskBoMutation>;
export type CreateShelterTaskBoMutationResult = Apollo.MutationResult<CreateShelterTaskBoMutation>;
export type CreateShelterTaskBoMutationOptions = Apollo.BaseMutationOptions<CreateShelterTaskBoMutation, CreateShelterTaskBoMutationVariables>;
export const CompleteShelterTaskBoDocument = gql`
    mutation completeShelterTaskBO($id: ID!, $notes: String) {
  completeShelterTask(id: $id, notes: $notes) {
    success
    error {
      code
      message
    }
    shelter_task {
      id
      status
    }
  }
}
    `;
export type CompleteShelterTaskBoMutationFn = Apollo.MutationFunction<CompleteShelterTaskBoMutation, CompleteShelterTaskBoMutationVariables>;

/**
 * __useCompleteShelterTaskBoMutation__
 *
 * To run a mutation, you first call `useCompleteShelterTaskBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteShelterTaskBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeShelterTaskBoMutation, { data, loading, error }] = useCompleteShelterTaskBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      notes: // value for 'notes'
 *   },
 * });
 */
export function useCompleteShelterTaskBoMutation(baseOptions?: Apollo.MutationHookOptions<CompleteShelterTaskBoMutation, CompleteShelterTaskBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteShelterTaskBoMutation, CompleteShelterTaskBoMutationVariables>(CompleteShelterTaskBoDocument, options);
      }
export type CompleteShelterTaskBoMutationHookResult = ReturnType<typeof useCompleteShelterTaskBoMutation>;
export type CompleteShelterTaskBoMutationResult = Apollo.MutationResult<CompleteShelterTaskBoMutation>;
export type CompleteShelterTaskBoMutationOptions = Apollo.BaseMutationOptions<CompleteShelterTaskBoMutation, CompleteShelterTaskBoMutationVariables>;
export const SkipShelterTaskBoDocument = gql`
    mutation skipShelterTaskBO($id: ID!, $reason: String) {
  skipShelterTask(id: $id, reason: $reason) {
    success
    error {
      code
      message
    }
    shelter_task {
      id
      status
    }
  }
}
    `;
export type SkipShelterTaskBoMutationFn = Apollo.MutationFunction<SkipShelterTaskBoMutation, SkipShelterTaskBoMutationVariables>;

/**
 * __useSkipShelterTaskBoMutation__
 *
 * To run a mutation, you first call `useSkipShelterTaskBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSkipShelterTaskBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [skipShelterTaskBoMutation, { data, loading, error }] = useSkipShelterTaskBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useSkipShelterTaskBoMutation(baseOptions?: Apollo.MutationHookOptions<SkipShelterTaskBoMutation, SkipShelterTaskBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SkipShelterTaskBoMutation, SkipShelterTaskBoMutationVariables>(SkipShelterTaskBoDocument, options);
      }
export type SkipShelterTaskBoMutationHookResult = ReturnType<typeof useSkipShelterTaskBoMutation>;
export type SkipShelterTaskBoMutationResult = Apollo.MutationResult<SkipShelterTaskBoMutation>;
export type SkipShelterTaskBoMutationOptions = Apollo.BaseMutationOptions<SkipShelterTaskBoMutation, SkipShelterTaskBoMutationVariables>;
export const DeleteShelterTaskBoDocument = gql`
    mutation deleteShelterTaskBO($id: ID!) {
  deleteShelterTask(id: $id) {
    success
    error {
      code
      message
    }
    id
  }
}
    `;
export type DeleteShelterTaskBoMutationFn = Apollo.MutationFunction<DeleteShelterTaskBoMutation, DeleteShelterTaskBoMutationVariables>;

/**
 * __useDeleteShelterTaskBoMutation__
 *
 * To run a mutation, you first call `useDeleteShelterTaskBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteShelterTaskBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteShelterTaskBoMutation, { data, loading, error }] = useDeleteShelterTaskBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteShelterTaskBoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteShelterTaskBoMutation, DeleteShelterTaskBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteShelterTaskBoMutation, DeleteShelterTaskBoMutationVariables>(DeleteShelterTaskBoDocument, options);
      }
export type DeleteShelterTaskBoMutationHookResult = ReturnType<typeof useDeleteShelterTaskBoMutation>;
export type DeleteShelterTaskBoMutationResult = Apollo.MutationResult<DeleteShelterTaskBoMutation>;
export type DeleteShelterTaskBoMutationOptions = Apollo.BaseMutationOptions<DeleteShelterTaskBoMutation, DeleteShelterTaskBoMutationVariables>;