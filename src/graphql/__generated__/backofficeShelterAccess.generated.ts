import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BackofficeShelterAccessQueryVariables = Types.Exact<{
  shelter_id: Types.Scalars['ID']['input'];
}>;


export type BackofficeShelterAccessQuery = { __typename?: 'Query', backofficeShelterAccess: { __typename?: 'BackofficeShelterAccess', membership_status?: string | null, roles: Array<string>, permissions: Array<string>, access_mode: string, platform_override_active: boolean, shelter: { __typename?: 'Shelter', id: string, name: string, city: string, type: Types.ShelterType } } };


export const BackofficeShelterAccessDocument = gql`
    query backofficeShelterAccess($shelter_id: ID!) {
  backofficeShelterAccess(shelter_id: $shelter_id) {
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
    `;

/**
 * __useBackofficeShelterAccessQuery__
 *
 * To run a query within a React component, call `useBackofficeShelterAccessQuery` and pass it any options that fit your needs.
 * When your component renders, `useBackofficeShelterAccessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBackofficeShelterAccessQuery({
 *   variables: {
 *      shelter_id: // value for 'shelter_id'
 *   },
 * });
 */
export function useBackofficeShelterAccessQuery(baseOptions: Apollo.QueryHookOptions<BackofficeShelterAccessQuery, BackofficeShelterAccessQueryVariables> & ({ variables: BackofficeShelterAccessQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BackofficeShelterAccessQuery, BackofficeShelterAccessQueryVariables>(BackofficeShelterAccessDocument, options);
      }
export function useBackofficeShelterAccessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BackofficeShelterAccessQuery, BackofficeShelterAccessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BackofficeShelterAccessQuery, BackofficeShelterAccessQueryVariables>(BackofficeShelterAccessDocument, options);
        }
export function useBackofficeShelterAccessSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BackofficeShelterAccessQuery, BackofficeShelterAccessQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BackofficeShelterAccessQuery, BackofficeShelterAccessQueryVariables>(BackofficeShelterAccessDocument, options);
        }
export type BackofficeShelterAccessQueryHookResult = ReturnType<typeof useBackofficeShelterAccessQuery>;
export type BackofficeShelterAccessLazyQueryHookResult = ReturnType<typeof useBackofficeShelterAccessLazyQuery>;
export type BackofficeShelterAccessSuspenseQueryHookResult = ReturnType<typeof useBackofficeShelterAccessSuspenseQuery>;
export type BackofficeShelterAccessQueryResult = Apollo.QueryResult<BackofficeShelterAccessQuery, BackofficeShelterAccessQueryVariables>;