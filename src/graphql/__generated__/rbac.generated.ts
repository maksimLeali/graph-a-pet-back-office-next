import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListRbacRolesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ListRbacRolesQuery = { __typename?: 'Query', listRbacRoles: { __typename?: 'RbacRolesResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, roles: Array<{ __typename?: 'RbacRole', id: string, code: string, name: string, scope_type: string, is_system: boolean, grants_all_permissions: boolean, permissions: Array<string> }> } };

export type ListPermissionCatalogQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ListPermissionCatalogQuery = { __typename?: 'Query', listPermissionCatalog: Array<{ __typename?: 'RbacPermission', key: string, domain: string, scope_type: string, risk_level: string }> };

export type GetUserRbacRolesQueryVariables = Types.Exact<{
  user_id: Types.Scalars['ID']['input'];
}>;


export type GetUserRbacRolesQuery = { __typename?: 'Query', getUserRbacRoles: { __typename?: 'UserRbacResult', success: boolean, effective_platform_permissions: Array<string>, error?: { __typename?: 'Error', code: string, message: string } | null, assignments: Array<{ __typename?: 'UserRbacAssignment', id: string, role_id: string, role_code: string, role_name: string, scope_type: string, shelter_id?: string | null, status: string, valid_from?: string | null, valid_until?: string | null, assigned_at: string }> } };

export type CreateRbacRoleMutationVariables = Types.Exact<{
  input: Types.CreateRbacRoleInput;
}>;


export type CreateRbacRoleMutation = { __typename?: 'Mutation', createRbacRole: { __typename?: 'RbacRoleMutationResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, role?: { __typename?: 'RbacRole', id: string, code: string, name: string, scope_type: string, is_system: boolean, grants_all_permissions: boolean, permissions: Array<string> } | null } };

export type UpdateRbacRolePermissionsMutationVariables = Types.Exact<{
  input: Types.UpdateRbacRolePermissionsInput;
}>;


export type UpdateRbacRolePermissionsMutation = { __typename?: 'Mutation', updateRbacRolePermissions: { __typename?: 'RbacRoleMutationResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, role?: { __typename?: 'RbacRole', id: string, code: string, name: string, scope_type: string, is_system: boolean, grants_all_permissions: boolean, permissions: Array<string> } | null } };

export type ArchiveRbacRoleMutationVariables = Types.Exact<{
  role_id: Types.Scalars['ID']['input'];
}>;


export type ArchiveRbacRoleMutation = { __typename?: 'Mutation', archiveRbacRole: { __typename?: 'RbacRoleMutationResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, role?: { __typename?: 'RbacRole', id: string } | null } };

export type AssignRbacRoleToUserMutationVariables = Types.Exact<{
  user_id: Types.Scalars['ID']['input'];
  role_id: Types.Scalars['ID']['input'];
  shelter_id?: Types.InputMaybe<Types.Scalars['ID']['input']>;
}>;


export type AssignRbacRoleToUserMutation = { __typename?: 'Mutation', assignRbacRoleToUser: { __typename?: 'UserRbacAssignmentResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, assignment?: { __typename?: 'UserRbacAssignment', id: string, role_id: string, role_code: string, role_name: string, scope_type: string, shelter_id?: string | null, status: string, assigned_at: string } | null } };

export type RevokeRbacRoleAssignmentMutationVariables = Types.Exact<{
  assignment_id: Types.Scalars['ID']['input'];
}>;


export type RevokeRbacRoleAssignmentMutation = { __typename?: 'Mutation', revokeRbacRoleAssignment: { __typename?: 'UserRbacAssignmentResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, assignment?: { __typename?: 'UserRbacAssignment', id: string, status: string } | null } };


export const ListRbacRolesDocument = gql`
    query listRbacRoles {
  listRbacRoles {
    success
    error {
      code
      message
    }
    roles {
      id
      code
      name
      scope_type
      is_system
      grants_all_permissions
      permissions
    }
  }
}
    `;

/**
 * __useListRbacRolesQuery__
 *
 * To run a query within a React component, call `useListRbacRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListRbacRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListRbacRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useListRbacRolesQuery(baseOptions?: Apollo.QueryHookOptions<ListRbacRolesQuery, ListRbacRolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListRbacRolesQuery, ListRbacRolesQueryVariables>(ListRbacRolesDocument, options);
      }
export function useListRbacRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListRbacRolesQuery, ListRbacRolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListRbacRolesQuery, ListRbacRolesQueryVariables>(ListRbacRolesDocument, options);
        }
export function useListRbacRolesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListRbacRolesQuery, ListRbacRolesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListRbacRolesQuery, ListRbacRolesQueryVariables>(ListRbacRolesDocument, options);
        }
export type ListRbacRolesQueryHookResult = ReturnType<typeof useListRbacRolesQuery>;
export type ListRbacRolesLazyQueryHookResult = ReturnType<typeof useListRbacRolesLazyQuery>;
export type ListRbacRolesSuspenseQueryHookResult = ReturnType<typeof useListRbacRolesSuspenseQuery>;
export type ListRbacRolesQueryResult = Apollo.QueryResult<ListRbacRolesQuery, ListRbacRolesQueryVariables>;
export const ListPermissionCatalogDocument = gql`
    query listPermissionCatalog {
  listPermissionCatalog {
    key
    domain
    scope_type
    risk_level
  }
}
    `;

/**
 * __useListPermissionCatalogQuery__
 *
 * To run a query within a React component, call `useListPermissionCatalogQuery` and pass it any options that fit your needs.
 * When your component renders, `useListPermissionCatalogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListPermissionCatalogQuery({
 *   variables: {
 *   },
 * });
 */
export function useListPermissionCatalogQuery(baseOptions?: Apollo.QueryHookOptions<ListPermissionCatalogQuery, ListPermissionCatalogQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListPermissionCatalogQuery, ListPermissionCatalogQueryVariables>(ListPermissionCatalogDocument, options);
      }
export function useListPermissionCatalogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListPermissionCatalogQuery, ListPermissionCatalogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListPermissionCatalogQuery, ListPermissionCatalogQueryVariables>(ListPermissionCatalogDocument, options);
        }
export function useListPermissionCatalogSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListPermissionCatalogQuery, ListPermissionCatalogQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListPermissionCatalogQuery, ListPermissionCatalogQueryVariables>(ListPermissionCatalogDocument, options);
        }
export type ListPermissionCatalogQueryHookResult = ReturnType<typeof useListPermissionCatalogQuery>;
export type ListPermissionCatalogLazyQueryHookResult = ReturnType<typeof useListPermissionCatalogLazyQuery>;
export type ListPermissionCatalogSuspenseQueryHookResult = ReturnType<typeof useListPermissionCatalogSuspenseQuery>;
export type ListPermissionCatalogQueryResult = Apollo.QueryResult<ListPermissionCatalogQuery, ListPermissionCatalogQueryVariables>;
export const GetUserRbacRolesDocument = gql`
    query getUserRbacRoles($user_id: ID!) {
  getUserRbacRoles(user_id: $user_id) {
    success
    error {
      code
      message
    }
    assignments {
      id
      role_id
      role_code
      role_name
      scope_type
      shelter_id
      status
      valid_from
      valid_until
      assigned_at
    }
    effective_platform_permissions
  }
}
    `;

/**
 * __useGetUserRbacRolesQuery__
 *
 * To run a query within a React component, call `useGetUserRbacRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserRbacRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserRbacRolesQuery({
 *   variables: {
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useGetUserRbacRolesQuery(baseOptions: Apollo.QueryHookOptions<GetUserRbacRolesQuery, GetUserRbacRolesQueryVariables> & ({ variables: GetUserRbacRolesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserRbacRolesQuery, GetUserRbacRolesQueryVariables>(GetUserRbacRolesDocument, options);
      }
export function useGetUserRbacRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserRbacRolesQuery, GetUserRbacRolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserRbacRolesQuery, GetUserRbacRolesQueryVariables>(GetUserRbacRolesDocument, options);
        }
export function useGetUserRbacRolesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserRbacRolesQuery, GetUserRbacRolesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserRbacRolesQuery, GetUserRbacRolesQueryVariables>(GetUserRbacRolesDocument, options);
        }
export type GetUserRbacRolesQueryHookResult = ReturnType<typeof useGetUserRbacRolesQuery>;
export type GetUserRbacRolesLazyQueryHookResult = ReturnType<typeof useGetUserRbacRolesLazyQuery>;
export type GetUserRbacRolesSuspenseQueryHookResult = ReturnType<typeof useGetUserRbacRolesSuspenseQuery>;
export type GetUserRbacRolesQueryResult = Apollo.QueryResult<GetUserRbacRolesQuery, GetUserRbacRolesQueryVariables>;
export const CreateRbacRoleDocument = gql`
    mutation createRbacRole($input: CreateRbacRoleInput!) {
  createRbacRole(input: $input) {
    success
    error {
      code
      message
    }
    role {
      id
      code
      name
      scope_type
      is_system
      grants_all_permissions
      permissions
    }
  }
}
    `;
export type CreateRbacRoleMutationFn = Apollo.MutationFunction<CreateRbacRoleMutation, CreateRbacRoleMutationVariables>;

/**
 * __useCreateRbacRoleMutation__
 *
 * To run a mutation, you first call `useCreateRbacRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRbacRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRbacRoleMutation, { data, loading, error }] = useCreateRbacRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRbacRoleMutation(baseOptions?: Apollo.MutationHookOptions<CreateRbacRoleMutation, CreateRbacRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRbacRoleMutation, CreateRbacRoleMutationVariables>(CreateRbacRoleDocument, options);
      }
export type CreateRbacRoleMutationHookResult = ReturnType<typeof useCreateRbacRoleMutation>;
export type CreateRbacRoleMutationResult = Apollo.MutationResult<CreateRbacRoleMutation>;
export type CreateRbacRoleMutationOptions = Apollo.BaseMutationOptions<CreateRbacRoleMutation, CreateRbacRoleMutationVariables>;
export const UpdateRbacRolePermissionsDocument = gql`
    mutation updateRbacRolePermissions($input: UpdateRbacRolePermissionsInput!) {
  updateRbacRolePermissions(input: $input) {
    success
    error {
      code
      message
    }
    role {
      id
      code
      name
      scope_type
      is_system
      grants_all_permissions
      permissions
    }
  }
}
    `;
export type UpdateRbacRolePermissionsMutationFn = Apollo.MutationFunction<UpdateRbacRolePermissionsMutation, UpdateRbacRolePermissionsMutationVariables>;

/**
 * __useUpdateRbacRolePermissionsMutation__
 *
 * To run a mutation, you first call `useUpdateRbacRolePermissionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRbacRolePermissionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRbacRolePermissionsMutation, { data, loading, error }] = useUpdateRbacRolePermissionsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRbacRolePermissionsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRbacRolePermissionsMutation, UpdateRbacRolePermissionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRbacRolePermissionsMutation, UpdateRbacRolePermissionsMutationVariables>(UpdateRbacRolePermissionsDocument, options);
      }
export type UpdateRbacRolePermissionsMutationHookResult = ReturnType<typeof useUpdateRbacRolePermissionsMutation>;
export type UpdateRbacRolePermissionsMutationResult = Apollo.MutationResult<UpdateRbacRolePermissionsMutation>;
export type UpdateRbacRolePermissionsMutationOptions = Apollo.BaseMutationOptions<UpdateRbacRolePermissionsMutation, UpdateRbacRolePermissionsMutationVariables>;
export const ArchiveRbacRoleDocument = gql`
    mutation archiveRbacRole($role_id: ID!) {
  archiveRbacRole(role_id: $role_id) {
    success
    error {
      code
      message
    }
    role {
      id
    }
  }
}
    `;
export type ArchiveRbacRoleMutationFn = Apollo.MutationFunction<ArchiveRbacRoleMutation, ArchiveRbacRoleMutationVariables>;

/**
 * __useArchiveRbacRoleMutation__
 *
 * To run a mutation, you first call `useArchiveRbacRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveRbacRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveRbacRoleMutation, { data, loading, error }] = useArchiveRbacRoleMutation({
 *   variables: {
 *      role_id: // value for 'role_id'
 *   },
 * });
 */
export function useArchiveRbacRoleMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveRbacRoleMutation, ArchiveRbacRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveRbacRoleMutation, ArchiveRbacRoleMutationVariables>(ArchiveRbacRoleDocument, options);
      }
export type ArchiveRbacRoleMutationHookResult = ReturnType<typeof useArchiveRbacRoleMutation>;
export type ArchiveRbacRoleMutationResult = Apollo.MutationResult<ArchiveRbacRoleMutation>;
export type ArchiveRbacRoleMutationOptions = Apollo.BaseMutationOptions<ArchiveRbacRoleMutation, ArchiveRbacRoleMutationVariables>;
export const AssignRbacRoleToUserDocument = gql`
    mutation assignRbacRoleToUser($user_id: ID!, $role_id: ID!, $shelter_id: ID) {
  assignRbacRoleToUser(
    user_id: $user_id
    role_id: $role_id
    shelter_id: $shelter_id
  ) {
    success
    error {
      code
      message
    }
    assignment {
      id
      role_id
      role_code
      role_name
      scope_type
      shelter_id
      status
      assigned_at
    }
  }
}
    `;
export type AssignRbacRoleToUserMutationFn = Apollo.MutationFunction<AssignRbacRoleToUserMutation, AssignRbacRoleToUserMutationVariables>;

/**
 * __useAssignRbacRoleToUserMutation__
 *
 * To run a mutation, you first call `useAssignRbacRoleToUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignRbacRoleToUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignRbacRoleToUserMutation, { data, loading, error }] = useAssignRbacRoleToUserMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      role_id: // value for 'role_id'
 *      shelter_id: // value for 'shelter_id'
 *   },
 * });
 */
export function useAssignRbacRoleToUserMutation(baseOptions?: Apollo.MutationHookOptions<AssignRbacRoleToUserMutation, AssignRbacRoleToUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AssignRbacRoleToUserMutation, AssignRbacRoleToUserMutationVariables>(AssignRbacRoleToUserDocument, options);
      }
export type AssignRbacRoleToUserMutationHookResult = ReturnType<typeof useAssignRbacRoleToUserMutation>;
export type AssignRbacRoleToUserMutationResult = Apollo.MutationResult<AssignRbacRoleToUserMutation>;
export type AssignRbacRoleToUserMutationOptions = Apollo.BaseMutationOptions<AssignRbacRoleToUserMutation, AssignRbacRoleToUserMutationVariables>;
export const RevokeRbacRoleAssignmentDocument = gql`
    mutation revokeRbacRoleAssignment($assignment_id: ID!) {
  revokeRbacRoleAssignment(assignment_id: $assignment_id) {
    success
    error {
      code
      message
    }
    assignment {
      id
      status
    }
  }
}
    `;
export type RevokeRbacRoleAssignmentMutationFn = Apollo.MutationFunction<RevokeRbacRoleAssignmentMutation, RevokeRbacRoleAssignmentMutationVariables>;

/**
 * __useRevokeRbacRoleAssignmentMutation__
 *
 * To run a mutation, you first call `useRevokeRbacRoleAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRevokeRbacRoleAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [revokeRbacRoleAssignmentMutation, { data, loading, error }] = useRevokeRbacRoleAssignmentMutation({
 *   variables: {
 *      assignment_id: // value for 'assignment_id'
 *   },
 * });
 */
export function useRevokeRbacRoleAssignmentMutation(baseOptions?: Apollo.MutationHookOptions<RevokeRbacRoleAssignmentMutation, RevokeRbacRoleAssignmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RevokeRbacRoleAssignmentMutation, RevokeRbacRoleAssignmentMutationVariables>(RevokeRbacRoleAssignmentDocument, options);
      }
export type RevokeRbacRoleAssignmentMutationHookResult = ReturnType<typeof useRevokeRbacRoleAssignmentMutation>;
export type RevokeRbacRoleAssignmentMutationResult = Apollo.MutationResult<RevokeRbacRoleAssignmentMutation>;
export type RevokeRbacRoleAssignmentMutationOptions = Apollo.BaseMutationOptions<RevokeRbacRoleAssignmentMutation, RevokeRbacRoleAssignmentMutationVariables>;