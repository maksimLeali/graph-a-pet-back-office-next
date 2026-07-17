import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BackofficeAccessContextQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type BackofficeAccessContextQuery = { __typename?: 'Query', backofficeAccessContext: { __typename?: 'BackofficeAccessContext', platform_permissions: Array<string>, shelters: Array<{ __typename?: 'BackofficeShelterAccess', membership_status?: string | null, roles: Array<string>, permissions: Array<string>, access_mode: string, platform_override_active: boolean, shelter: { __typename?: 'Shelter', id: string, name: string, city: string, type: Types.ShelterType } }> } };


export const BackofficeAccessContextDocument = gql`
    query backofficeAccessContext {
  backofficeAccessContext {
    platform_permissions
    shelters {
      shelter {
        id
        name
        city
        type
      }
      membership_status
      roles
      permissions
      access_mode
      platform_override_active
    }
  }
}
    `;

/**
 * __useBackofficeAccessContextQuery__
 *
 * To run a query within a React component, call `useBackofficeAccessContextQuery` and pass it any options that fit your needs.
 * When your component renders, `useBackofficeAccessContextQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBackofficeAccessContextQuery({
 *   variables: {
 *   },
 * });
 */
export function useBackofficeAccessContextQuery(baseOptions?: Apollo.QueryHookOptions<BackofficeAccessContextQuery, BackofficeAccessContextQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BackofficeAccessContextQuery, BackofficeAccessContextQueryVariables>(BackofficeAccessContextDocument, options);
      }
export function useBackofficeAccessContextLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BackofficeAccessContextQuery, BackofficeAccessContextQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BackofficeAccessContextQuery, BackofficeAccessContextQueryVariables>(BackofficeAccessContextDocument, options);
        }
export function useBackofficeAccessContextSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BackofficeAccessContextQuery, BackofficeAccessContextQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BackofficeAccessContextQuery, BackofficeAccessContextQueryVariables>(BackofficeAccessContextDocument, options);
        }
export type BackofficeAccessContextQueryHookResult = ReturnType<typeof useBackofficeAccessContextQuery>;
export type BackofficeAccessContextLazyQueryHookResult = ReturnType<typeof useBackofficeAccessContextLazyQuery>;
export type BackofficeAccessContextSuspenseQueryHookResult = ReturnType<typeof useBackofficeAccessContextSuspenseQuery>;
export type BackofficeAccessContextQueryResult = Apollo.QueryResult<BackofficeAccessContextQuery, BackofficeAccessContextQueryVariables>;