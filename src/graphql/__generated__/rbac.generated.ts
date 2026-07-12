import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;

// ---- shared fragment type ----
export type RbacRoleFragment = {
  __typename?: 'RbacRole';
  id: string;
  code: string;
  name: string;
  scope_type: string;
  is_system: boolean;
  grants_all_permissions: boolean;
  permissions: Array<string>;
};

export type ListRbacRolesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type ListRbacRolesQuery = {
  __typename?: 'Query';
  listRbacRoles: {
    __typename?: 'RbacRolesResult';
    success: boolean;
    error?: { __typename?: 'Error'; code: string; message: string } | null;
    roles: Array<{
      __typename?: 'RbacRole';
      id: string;
      code: string;
      name: string;
      scope_type: string;
      is_system: boolean;
      grants_all_permissions: boolean;
      permissions: Array<string>;
    }>;
  };
};

export type GetUserRbacRolesQueryVariables = Types.Exact<{
  user_id: Types.Scalars['ID']['input'];
}>;

export type GetUserRbacRolesQuery = {
  __typename?: 'Query';
  getUserRbacRoles: {
    __typename?: 'UserRbacResult';
    success: boolean;
    error?: { __typename?: 'Error'; code: string; message: string } | null;
    assignments: Array<{
      __typename?: 'UserRbacAssignment';
      role_code: string;
      role_name: string;
      scope_type: string;
      shelter_id?: string | null;
      status: string;
      valid_from?: string | null;
      valid_until?: string | null;
      assigned_at: string;
    }>;
    effective_platform_permissions: Array<string>;
  };
};

export type ListPermissionCatalogQueryVariables = Types.Exact<{ [key: string]: never }>;

export type ListPermissionCatalogQuery = {
  __typename?: 'Query';
  listPermissionCatalog: Array<{
    __typename?: 'RbacPermission';
    key: string;
    domain: string;
    scope_type: string;
    risk_level: string;
  }>;
};

export type CreateRbacRoleMutationVariables = Types.Exact<{
  input: {
    code: string;
    name: string;
    description?: string | null;
    scope_type: string;
    permission_keys: Array<string>;
  };
}>;

export type CreateRbacRoleMutation = {
  __typename?: 'Mutation';
  createRbacRole: {
    __typename?: 'RbacRoleMutationResult';
    success: boolean;
    error?: { __typename?: 'Error'; code: string; message: string } | null;
    role?: RbacRoleFragment | null;
  };
};

export type UpdateRbacRolePermissionsMutationVariables = Types.Exact<{
  input: { role_id: string; permission_keys: Array<string> };
}>;

export type UpdateRbacRolePermissionsMutation = {
  __typename?: 'Mutation';
  updateRbacRolePermissions: {
    __typename?: 'RbacRoleMutationResult';
    success: boolean;
    error?: { __typename?: 'Error'; code: string; message: string } | null;
    role?: RbacRoleFragment | null;
  };
};

export type ArchiveRbacRoleMutationVariables = Types.Exact<{
  role_id: Types.Scalars['ID']['input'];
}>;

export type ArchiveRbacRoleMutation = {
  __typename?: 'Mutation';
  archiveRbacRole: {
    __typename?: 'RbacRoleMutationResult';
    success: boolean;
    error?: { __typename?: 'Error'; code: string; message: string } | null;
    role?: { __typename?: 'RbacRole'; id: string } | null;
  };
};

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

export const CreateRbacRoleDocument = gql`
  mutation createRbacRole($input: CreateRbacRoleInput!) {
    createRbacRole(input: $input) {
      success
      error { code message }
      role {
        id code name scope_type is_system grants_all_permissions permissions
      }
    }
  }
`;

export const UpdateRbacRolePermissionsDocument = gql`
  mutation updateRbacRolePermissions($input: UpdateRbacRolePermissionsInput!) {
    updateRbacRolePermissions(input: $input) {
      success
      error { code message }
      role {
        id code name scope_type is_system grants_all_permissions permissions
      }
    }
  }
`;

export const ArchiveRbacRoleDocument = gql`
  mutation archiveRbacRole($role_id: ID!) {
    archiveRbacRole(role_id: $role_id) {
      success
      error { code message }
      role { id }
    }
  }
`;

export function useListPermissionCatalogQuery(
  baseOptions?: Apollo.QueryHookOptions<ListPermissionCatalogQuery, ListPermissionCatalogQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ListPermissionCatalogQuery, ListPermissionCatalogQueryVariables>(
    ListPermissionCatalogDocument,
    options
  );
}
export type ListPermissionCatalogQueryHookResult = ReturnType<typeof useListPermissionCatalogQuery>;
export type ListPermissionCatalogQueryResult = Apollo.QueryResult<ListPermissionCatalogQuery, ListPermissionCatalogQueryVariables>;

export function useCreateRbacRoleMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateRbacRoleMutation, CreateRbacRoleMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateRbacRoleMutation, CreateRbacRoleMutationVariables>(
    CreateRbacRoleDocument,
    options
  );
}
export type CreateRbacRoleMutationHookResult = ReturnType<typeof useCreateRbacRoleMutation>;
export type CreateRbacRoleMutationResult = Apollo.MutationResult<CreateRbacRoleMutation>;

export function useUpdateRbacRolePermissionsMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateRbacRolePermissionsMutation, UpdateRbacRolePermissionsMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateRbacRolePermissionsMutation, UpdateRbacRolePermissionsMutationVariables>(
    UpdateRbacRolePermissionsDocument,
    options
  );
}
export type UpdateRbacRolePermissionsMutationHookResult = ReturnType<typeof useUpdateRbacRolePermissionsMutation>;
export type UpdateRbacRolePermissionsMutationResult = Apollo.MutationResult<UpdateRbacRolePermissionsMutation>;

export function useArchiveRbacRoleMutation(
  baseOptions?: Apollo.MutationHookOptions<ArchiveRbacRoleMutation, ArchiveRbacRoleMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ArchiveRbacRoleMutation, ArchiveRbacRoleMutationVariables>(
    ArchiveRbacRoleDocument,
    options
  );
}
export type ArchiveRbacRoleMutationHookResult = ReturnType<typeof useArchiveRbacRoleMutation>;
export type ArchiveRbacRoleMutationResult = Apollo.MutationResult<ArchiveRbacRoleMutation>;

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

export const GetUserRbacRolesDocument = gql`
  query getUserRbacRoles($user_id: ID!) {
    getUserRbacRoles(user_id: $user_id) {
      success
      error {
        code
        message
      }
      assignments {
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

export function useListRbacRolesQuery(
  baseOptions?: Apollo.QueryHookOptions<ListRbacRolesQuery, ListRbacRolesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ListRbacRolesQuery, ListRbacRolesQueryVariables>(
    ListRbacRolesDocument,
    options
  );
}
export function useListRbacRolesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ListRbacRolesQuery, ListRbacRolesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ListRbacRolesQuery, ListRbacRolesQueryVariables>(
    ListRbacRolesDocument,
    options
  );
}
export type ListRbacRolesQueryHookResult = ReturnType<typeof useListRbacRolesQuery>;
export type ListRbacRolesLazyQueryHookResult = ReturnType<typeof useListRbacRolesLazyQuery>;
export type ListRbacRolesQueryResult = Apollo.QueryResult<
  ListRbacRolesQuery,
  ListRbacRolesQueryVariables
>;

export function useGetUserRbacRolesQuery(
  baseOptions: Apollo.QueryHookOptions<GetUserRbacRolesQuery, GetUserRbacRolesQueryVariables> &
    (
      | { variables: GetUserRbacRolesQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserRbacRolesQuery, GetUserRbacRolesQueryVariables>(
    GetUserRbacRolesDocument,
    options
  );
}
export function useGetUserRbacRolesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserRbacRolesQuery, GetUserRbacRolesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserRbacRolesQuery, GetUserRbacRolesQueryVariables>(
    GetUserRbacRolesDocument,
    options
  );
}
export type GetUserRbacRolesQueryHookResult = ReturnType<typeof useGetUserRbacRolesQuery>;
export type GetUserRbacRolesLazyQueryHookResult = ReturnType<typeof useGetUserRbacRolesLazyQuery>;
export type GetUserRbacRolesQueryResult = Apollo.QueryResult<
  GetUserRbacRolesQuery,
  GetUserRbacRolesQueryVariables
>;
