import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListSheltersQueryVariables = Types.Exact<{
  search: Types.CommonSearch;
}>;


export type ListSheltersQuery = { __typename?: 'Query', listShelters: { __typename?: 'PaginatedShelters', success?: boolean | null, error?: { __typename?: 'Error', code: string, message: string } | null, pagination: { __typename?: 'Pagination', total_items?: number | null, total_pages?: number | null, current_page?: number | null, page_size?: number | null }, items: Array<{ __typename?: 'Shelter', id: string, name: string, city: string, province_code: string, type: Types.ShelterType, verification_status: Types.ShelterVerificationStatus, created_at: string } | null> } };

export type GetShelterQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type GetShelterQuery = { __typename?: 'Query', getShelter: { __typename?: 'ShelterResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter?: { __typename?: 'Shelter', id: string, name: string, street: string, street_number: string, city: string, province_code: string, postal_code: string, region?: string | null, district?: string | null, type: Types.ShelterType, verification_status: Types.ShelterVerificationStatus, visibility: Types.ShelterVisibility, accepts_volunteers: boolean, public_description?: string | null, public_story_html?: string | null, public_contact_email?: string | null, public_contact_phone?: string | null, created_at: string } | null } };

export type ListShelterPeopleQueryVariables = Types.Exact<{
  shelter_id: Types.Scalars['ID']['input'];
  search?: Types.InputMaybe<Types.CommonSearch>;
}>;


export type ListShelterPeopleQuery = { __typename?: 'Query', listShelterPeople: { __typename?: 'PaginatedShelterPeople', success?: boolean | null, error?: { __typename?: 'Error', code: string, message: string } | null, pagination: { __typename?: 'Pagination', total_items?: number | null, total_pages?: number | null, current_page?: number | null, page_size?: number | null }, items: Array<{ __typename?: 'ShelterPerson', id: string, created_at: string, first_name?: string | null, last_name?: string | null, email?: string | null, phone?: string | null, status: Types.ShelterPersonStatus, source: Types.ShelterPersonSource, notes?: string | null, user?: { __typename?: 'User', id: string, first_name: string, last_name: string, email: string } | null } | null> } };

export type ListShelterRolesBoQueryVariables = Types.Exact<{
  search: Types.CommonSearch;
}>;


export type ListShelterRolesBoQuery = { __typename?: 'Query', listShelterRoles: { __typename?: 'PaginatedShelterRoles', success?: boolean | null, error?: { __typename?: 'Error', code: string, message: string } | null, pagination: { __typename?: 'Pagination', total_items?: number | null, total_pages?: number | null, current_page?: number | null, page_size?: number | null }, items: Array<{ __typename?: 'ShelterRole', id: string, created_at: string, role: Types.RoleLevel, user: { __typename?: 'User', id: string, first_name: string, last_name: string, email: string } } | null> } };

export type ListShelterPetsBoQueryVariables = Types.Exact<{
  search: Types.CommonSearch;
}>;


export type ListShelterPetsBoQuery = { __typename?: 'Query', listShelterPets: { __typename?: 'PaginatedShelterPets', success?: boolean | null, error?: { __typename?: 'Error', code: string, message: string } | null, pagination: { __typename?: 'Pagination', total_items?: number | null, total_pages?: number | null, current_page?: number | null, page_size?: number | null }, items: Array<{ __typename?: 'ShelterPet', id: string, created_at: string, is_active: boolean, is_published: boolean, left_at?: string | null, assigned_members: Array<{ __typename?: 'User', id: string, first_name: string, last_name: string }>, assigned_shelter_people: Array<{ __typename?: 'ShelterPerson', id: string, first_name?: string | null, last_name?: string | null }>, shelter: { __typename?: 'Shelter', id: string, name: string }, pet: { __typename?: 'Pet', id: string, name: string, gender?: Types.Gender | null, breed?: string | null, birthday?: string | null, chip_code?: string | null } } | null> } };

export type ListShelterInventoryItemsBoQueryVariables = Types.Exact<{
  search: Types.CommonSearch;
}>;


export type ListShelterInventoryItemsBoQuery = { __typename?: 'Query', listShelterInventoryItems: { __typename?: 'PaginatedInventoryItems', success?: boolean | null, error?: { __typename?: 'Error', code: string, message: string } | null, pagination: { __typename?: 'Pagination', total_items?: number | null, total_pages?: number | null, current_page?: number | null, page_size?: number | null }, items: Array<{ __typename?: 'ShelterInventoryItem', id: string, name: string, category: Types.InventoryCategory, unit: string, minimum_threshold?: number | null, current_quantity: number, is_below_threshold: boolean, is_active: boolean, notes?: string | null } | null> } };

export type ListOperationalShelterWalksBoQueryVariables = Types.Exact<{
  shelter_id: Types.Scalars['ID']['input'];
}>;


export type ListOperationalShelterWalksBoQuery = { __typename?: 'Query', listOperationalShelterWalks: { __typename?: 'PaginatedShelterWalks', success?: boolean | null, error?: { __typename?: 'Error', code: string, message: string } | null, items: Array<{ __typename?: 'ShelterWalk', id: string, created_at: string, status: Types.ShelterWalkStatus, scheduled_at?: string | null, started_at?: string | null, ended_at?: string | null, duration_minutes?: number | null, notes?: string | null, shelter_pet: { __typename?: 'ShelterPet', id: string, pet: { __typename?: 'Pet', id: string, name: string } }, walker?: { __typename?: 'User', id: string, first_name: string, last_name: string } | null, walker_shelter_person?: { __typename?: 'ShelterPerson', id: string, first_name?: string | null, last_name?: string | null } | null } | null> } };

export type MyShelterAuthorizationBoQueryVariables = Types.Exact<{
  shelter_id: Types.Scalars['ID']['input'];
}>;


export type MyShelterAuthorizationBoQuery = { __typename?: 'Query', myShelterAuthorization: { __typename?: 'ShelterAuthorizationResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, authorization?: { __typename?: 'ShelterAuthorization', shelter_id: string, membership_status?: string | null, permissions: Array<string> } | null } };

export type ListOperationalShelterTasksBoQueryVariables = Types.Exact<{
  shelter_id: Types.Scalars['ID']['input'];
}>;


export type ListOperationalShelterTasksBoQuery = { __typename?: 'Query', listOperationalShelterTasks: { __typename?: 'PaginatedShelterTasks', success?: boolean | null, error?: { __typename?: 'Error', code: string, message: string } | null, items: Array<{ __typename?: 'ShelterTask', id: string, created_at: string, task_type: Types.ShelterTaskType, area?: string | null, status: Types.TaskStatus, scheduled_at?: string | null, scheduled_date?: string | null, is_recurring: boolean, notes?: string | null, shelter_pet?: { __typename?: 'ShelterPet', id: string, pet: { __typename?: 'Pet', id: string, name: string } } | null, assignees: Array<{ __typename?: 'User', id: string, first_name: string, last_name: string }>, assignee_shelter_people: Array<{ __typename?: 'ShelterPerson', id: string, first_name?: string | null, last_name?: string | null }> } | null> } };


export const ListSheltersDocument = gql`
    query listShelters($search: CommonSearch!) {
  listShelters(commonSearch: $search) {
    success
    error {
      code
      message
    }
    pagination {
      total_items
      total_pages
      current_page
      page_size
    }
    items {
      id
      name
      city
      province_code
      type
      verification_status
      created_at
    }
  }
}
    `;

/**
 * __useListSheltersQuery__
 *
 * To run a query within a React component, call `useListSheltersQuery` and pass it any options that fit your needs.
 * When your component renders, `useListSheltersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListSheltersQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useListSheltersQuery(baseOptions: Apollo.QueryHookOptions<ListSheltersQuery, ListSheltersQueryVariables> & ({ variables: ListSheltersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListSheltersQuery, ListSheltersQueryVariables>(ListSheltersDocument, options);
      }
export function useListSheltersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListSheltersQuery, ListSheltersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListSheltersQuery, ListSheltersQueryVariables>(ListSheltersDocument, options);
        }
export function useListSheltersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListSheltersQuery, ListSheltersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListSheltersQuery, ListSheltersQueryVariables>(ListSheltersDocument, options);
        }
export type ListSheltersQueryHookResult = ReturnType<typeof useListSheltersQuery>;
export type ListSheltersLazyQueryHookResult = ReturnType<typeof useListSheltersLazyQuery>;
export type ListSheltersSuspenseQueryHookResult = ReturnType<typeof useListSheltersSuspenseQuery>;
export type ListSheltersQueryResult = Apollo.QueryResult<ListSheltersQuery, ListSheltersQueryVariables>;
export const GetShelterDocument = gql`
    query getShelter($id: ID!) {
  getShelter(id: $id) {
    success
    error {
      code
      message
    }
    shelter {
      id
      name
      street
      street_number
      city
      province_code
      postal_code
      region
      district
      type
      verification_status
      visibility
      accepts_volunteers
      public_description
      public_story_html
      public_contact_email
      public_contact_phone
      created_at
    }
  }
}
    `;

/**
 * __useGetShelterQuery__
 *
 * To run a query within a React component, call `useGetShelterQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetShelterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetShelterQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetShelterQuery(baseOptions: Apollo.QueryHookOptions<GetShelterQuery, GetShelterQueryVariables> & ({ variables: GetShelterQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetShelterQuery, GetShelterQueryVariables>(GetShelterDocument, options);
      }
export function useGetShelterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetShelterQuery, GetShelterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetShelterQuery, GetShelterQueryVariables>(GetShelterDocument, options);
        }
export function useGetShelterSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetShelterQuery, GetShelterQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetShelterQuery, GetShelterQueryVariables>(GetShelterDocument, options);
        }
export type GetShelterQueryHookResult = ReturnType<typeof useGetShelterQuery>;
export type GetShelterLazyQueryHookResult = ReturnType<typeof useGetShelterLazyQuery>;
export type GetShelterSuspenseQueryHookResult = ReturnType<typeof useGetShelterSuspenseQuery>;
export type GetShelterQueryResult = Apollo.QueryResult<GetShelterQuery, GetShelterQueryVariables>;
export const ListShelterPeopleDocument = gql`
    query listShelterPeople($shelter_id: ID!, $search: CommonSearch) {
  listShelterPeople(shelter_id: $shelter_id, search: $search) {
    success
    error {
      code
      message
    }
    pagination {
      total_items
      total_pages
      current_page
      page_size
    }
    items {
      id
      created_at
      first_name
      last_name
      email
      phone
      status
      source
      notes
      user {
        id
        first_name
        last_name
        email
      }
    }
  }
}
    `;

/**
 * __useListShelterPeopleQuery__
 *
 * To run a query within a React component, call `useListShelterPeopleQuery` and pass it any options that fit your needs.
 * When your component renders, `useListShelterPeopleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListShelterPeopleQuery({
 *   variables: {
 *      shelter_id: // value for 'shelter_id'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useListShelterPeopleQuery(baseOptions: Apollo.QueryHookOptions<ListShelterPeopleQuery, ListShelterPeopleQueryVariables> & ({ variables: ListShelterPeopleQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListShelterPeopleQuery, ListShelterPeopleQueryVariables>(ListShelterPeopleDocument, options);
      }
export function useListShelterPeopleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListShelterPeopleQuery, ListShelterPeopleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListShelterPeopleQuery, ListShelterPeopleQueryVariables>(ListShelterPeopleDocument, options);
        }
export function useListShelterPeopleSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListShelterPeopleQuery, ListShelterPeopleQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListShelterPeopleQuery, ListShelterPeopleQueryVariables>(ListShelterPeopleDocument, options);
        }
export type ListShelterPeopleQueryHookResult = ReturnType<typeof useListShelterPeopleQuery>;
export type ListShelterPeopleLazyQueryHookResult = ReturnType<typeof useListShelterPeopleLazyQuery>;
export type ListShelterPeopleSuspenseQueryHookResult = ReturnType<typeof useListShelterPeopleSuspenseQuery>;
export type ListShelterPeopleQueryResult = Apollo.QueryResult<ListShelterPeopleQuery, ListShelterPeopleQueryVariables>;
export const ListShelterRolesBoDocument = gql`
    query listShelterRolesBO($search: CommonSearch!) {
  listShelterRoles(commonSearch: $search) {
    success
    error {
      code
      message
    }
    pagination {
      total_items
      total_pages
      current_page
      page_size
    }
    items {
      id
      created_at
      role
      user {
        id
        first_name
        last_name
        email
      }
    }
  }
}
    `;

/**
 * __useListShelterRolesBoQuery__
 *
 * To run a query within a React component, call `useListShelterRolesBoQuery` and pass it any options that fit your needs.
 * When your component renders, `useListShelterRolesBoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListShelterRolesBoQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useListShelterRolesBoQuery(baseOptions: Apollo.QueryHookOptions<ListShelterRolesBoQuery, ListShelterRolesBoQueryVariables> & ({ variables: ListShelterRolesBoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListShelterRolesBoQuery, ListShelterRolesBoQueryVariables>(ListShelterRolesBoDocument, options);
      }
export function useListShelterRolesBoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListShelterRolesBoQuery, ListShelterRolesBoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListShelterRolesBoQuery, ListShelterRolesBoQueryVariables>(ListShelterRolesBoDocument, options);
        }
export function useListShelterRolesBoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListShelterRolesBoQuery, ListShelterRolesBoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListShelterRolesBoQuery, ListShelterRolesBoQueryVariables>(ListShelterRolesBoDocument, options);
        }
export type ListShelterRolesBoQueryHookResult = ReturnType<typeof useListShelterRolesBoQuery>;
export type ListShelterRolesBoLazyQueryHookResult = ReturnType<typeof useListShelterRolesBoLazyQuery>;
export type ListShelterRolesBoSuspenseQueryHookResult = ReturnType<typeof useListShelterRolesBoSuspenseQuery>;
export type ListShelterRolesBoQueryResult = Apollo.QueryResult<ListShelterRolesBoQuery, ListShelterRolesBoQueryVariables>;
export const ListShelterPetsBoDocument = gql`
    query listShelterPetsBO($search: CommonSearch!) {
  listShelterPets(commonSearch: $search) {
    success
    error {
      code
      message
    }
    pagination {
      total_items
      total_pages
      current_page
      page_size
    }
    items {
      id
      created_at
      is_active
      is_published
      left_at
      assigned_members {
        id
        first_name
        last_name
      }
      assigned_shelter_people {
        id
        first_name
        last_name
      }
      shelter {
        id
        name
      }
      pet {
        id
        name
        gender
        breed
        birthday
        chip_code
      }
    }
  }
}
    `;

/**
 * __useListShelterPetsBoQuery__
 *
 * To run a query within a React component, call `useListShelterPetsBoQuery` and pass it any options that fit your needs.
 * When your component renders, `useListShelterPetsBoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListShelterPetsBoQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useListShelterPetsBoQuery(baseOptions: Apollo.QueryHookOptions<ListShelterPetsBoQuery, ListShelterPetsBoQueryVariables> & ({ variables: ListShelterPetsBoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListShelterPetsBoQuery, ListShelterPetsBoQueryVariables>(ListShelterPetsBoDocument, options);
      }
export function useListShelterPetsBoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListShelterPetsBoQuery, ListShelterPetsBoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListShelterPetsBoQuery, ListShelterPetsBoQueryVariables>(ListShelterPetsBoDocument, options);
        }
export function useListShelterPetsBoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListShelterPetsBoQuery, ListShelterPetsBoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListShelterPetsBoQuery, ListShelterPetsBoQueryVariables>(ListShelterPetsBoDocument, options);
        }
export type ListShelterPetsBoQueryHookResult = ReturnType<typeof useListShelterPetsBoQuery>;
export type ListShelterPetsBoLazyQueryHookResult = ReturnType<typeof useListShelterPetsBoLazyQuery>;
export type ListShelterPetsBoSuspenseQueryHookResult = ReturnType<typeof useListShelterPetsBoSuspenseQuery>;
export type ListShelterPetsBoQueryResult = Apollo.QueryResult<ListShelterPetsBoQuery, ListShelterPetsBoQueryVariables>;
export const ListShelterInventoryItemsBoDocument = gql`
    query listShelterInventoryItemsBO($search: CommonSearch!) {
  listShelterInventoryItems(commonSearch: $search) {
    success
    error {
      code
      message
    }
    pagination {
      total_items
      total_pages
      current_page
      page_size
    }
    items {
      id
      name
      category
      unit
      minimum_threshold
      current_quantity
      is_below_threshold
      is_active
      notes
    }
  }
}
    `;

/**
 * __useListShelterInventoryItemsBoQuery__
 *
 * To run a query within a React component, call `useListShelterInventoryItemsBoQuery` and pass it any options that fit your needs.
 * When your component renders, `useListShelterInventoryItemsBoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListShelterInventoryItemsBoQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useListShelterInventoryItemsBoQuery(baseOptions: Apollo.QueryHookOptions<ListShelterInventoryItemsBoQuery, ListShelterInventoryItemsBoQueryVariables> & ({ variables: ListShelterInventoryItemsBoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListShelterInventoryItemsBoQuery, ListShelterInventoryItemsBoQueryVariables>(ListShelterInventoryItemsBoDocument, options);
      }
export function useListShelterInventoryItemsBoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListShelterInventoryItemsBoQuery, ListShelterInventoryItemsBoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListShelterInventoryItemsBoQuery, ListShelterInventoryItemsBoQueryVariables>(ListShelterInventoryItemsBoDocument, options);
        }
export function useListShelterInventoryItemsBoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListShelterInventoryItemsBoQuery, ListShelterInventoryItemsBoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListShelterInventoryItemsBoQuery, ListShelterInventoryItemsBoQueryVariables>(ListShelterInventoryItemsBoDocument, options);
        }
export type ListShelterInventoryItemsBoQueryHookResult = ReturnType<typeof useListShelterInventoryItemsBoQuery>;
export type ListShelterInventoryItemsBoLazyQueryHookResult = ReturnType<typeof useListShelterInventoryItemsBoLazyQuery>;
export type ListShelterInventoryItemsBoSuspenseQueryHookResult = ReturnType<typeof useListShelterInventoryItemsBoSuspenseQuery>;
export type ListShelterInventoryItemsBoQueryResult = Apollo.QueryResult<ListShelterInventoryItemsBoQuery, ListShelterInventoryItemsBoQueryVariables>;
export const ListOperationalShelterWalksBoDocument = gql`
    query listOperationalShelterWalksBO($shelter_id: ID!) {
  listOperationalShelterWalks(shelter_id: $shelter_id) {
    success
    error {
      code
      message
    }
    items {
      id
      created_at
      status
      scheduled_at
      started_at
      ended_at
      duration_minutes
      notes
      shelter_pet {
        id
        pet {
          id
          name
        }
      }
      walker {
        id
        first_name
        last_name
      }
      walker_shelter_person {
        id
        first_name
        last_name
      }
    }
  }
}
    `;

/**
 * __useListOperationalShelterWalksBoQuery__
 *
 * To run a query within a React component, call `useListOperationalShelterWalksBoQuery` and pass it any options that fit your needs.
 * When your component renders, `useListOperationalShelterWalksBoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListOperationalShelterWalksBoQuery({
 *   variables: {
 *      shelter_id: // value for 'shelter_id'
 *   },
 * });
 */
export function useListOperationalShelterWalksBoQuery(baseOptions: Apollo.QueryHookOptions<ListOperationalShelterWalksBoQuery, ListOperationalShelterWalksBoQueryVariables> & ({ variables: ListOperationalShelterWalksBoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListOperationalShelterWalksBoQuery, ListOperationalShelterWalksBoQueryVariables>(ListOperationalShelterWalksBoDocument, options);
      }
export function useListOperationalShelterWalksBoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListOperationalShelterWalksBoQuery, ListOperationalShelterWalksBoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListOperationalShelterWalksBoQuery, ListOperationalShelterWalksBoQueryVariables>(ListOperationalShelterWalksBoDocument, options);
        }
export function useListOperationalShelterWalksBoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListOperationalShelterWalksBoQuery, ListOperationalShelterWalksBoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListOperationalShelterWalksBoQuery, ListOperationalShelterWalksBoQueryVariables>(ListOperationalShelterWalksBoDocument, options);
        }
export type ListOperationalShelterWalksBoQueryHookResult = ReturnType<typeof useListOperationalShelterWalksBoQuery>;
export type ListOperationalShelterWalksBoLazyQueryHookResult = ReturnType<typeof useListOperationalShelterWalksBoLazyQuery>;
export type ListOperationalShelterWalksBoSuspenseQueryHookResult = ReturnType<typeof useListOperationalShelterWalksBoSuspenseQuery>;
export type ListOperationalShelterWalksBoQueryResult = Apollo.QueryResult<ListOperationalShelterWalksBoQuery, ListOperationalShelterWalksBoQueryVariables>;
export const MyShelterAuthorizationBoDocument = gql`
    query myShelterAuthorizationBO($shelter_id: ID!) {
  myShelterAuthorization(shelter_id: $shelter_id) {
    success
    error {
      code
      message
    }
    authorization {
      shelter_id
      membership_status
      permissions
    }
  }
}
    `;

/**
 * __useMyShelterAuthorizationBoQuery__
 *
 * To run a query within a React component, call `useMyShelterAuthorizationBoQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyShelterAuthorizationBoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyShelterAuthorizationBoQuery({
 *   variables: {
 *      shelter_id: // value for 'shelter_id'
 *   },
 * });
 */
export function useMyShelterAuthorizationBoQuery(baseOptions: Apollo.QueryHookOptions<MyShelterAuthorizationBoQuery, MyShelterAuthorizationBoQueryVariables> & ({ variables: MyShelterAuthorizationBoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyShelterAuthorizationBoQuery, MyShelterAuthorizationBoQueryVariables>(MyShelterAuthorizationBoDocument, options);
      }
export function useMyShelterAuthorizationBoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyShelterAuthorizationBoQuery, MyShelterAuthorizationBoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyShelterAuthorizationBoQuery, MyShelterAuthorizationBoQueryVariables>(MyShelterAuthorizationBoDocument, options);
        }
export function useMyShelterAuthorizationBoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyShelterAuthorizationBoQuery, MyShelterAuthorizationBoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyShelterAuthorizationBoQuery, MyShelterAuthorizationBoQueryVariables>(MyShelterAuthorizationBoDocument, options);
        }
export type MyShelterAuthorizationBoQueryHookResult = ReturnType<typeof useMyShelterAuthorizationBoQuery>;
export type MyShelterAuthorizationBoLazyQueryHookResult = ReturnType<typeof useMyShelterAuthorizationBoLazyQuery>;
export type MyShelterAuthorizationBoSuspenseQueryHookResult = ReturnType<typeof useMyShelterAuthorizationBoSuspenseQuery>;
export type MyShelterAuthorizationBoQueryResult = Apollo.QueryResult<MyShelterAuthorizationBoQuery, MyShelterAuthorizationBoQueryVariables>;
export const ListOperationalShelterTasksBoDocument = gql`
    query listOperationalShelterTasksBO($shelter_id: ID!) {
  listOperationalShelterTasks(shelter_id: $shelter_id) {
    success
    error {
      code
      message
    }
    items {
      id
      created_at
      task_type
      area
      status
      scheduled_at
      scheduled_date
      is_recurring
      notes
      shelter_pet {
        id
        pet {
          id
          name
        }
      }
      assignees {
        id
        first_name
        last_name
      }
      assignee_shelter_people {
        id
        first_name
        last_name
      }
    }
  }
}
    `;

/**
 * __useListOperationalShelterTasksBoQuery__
 *
 * To run a query within a React component, call `useListOperationalShelterTasksBoQuery` and pass it any options that fit your needs.
 * When your component renders, `useListOperationalShelterTasksBoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListOperationalShelterTasksBoQuery({
 *   variables: {
 *      shelter_id: // value for 'shelter_id'
 *   },
 * });
 */
export function useListOperationalShelterTasksBoQuery(baseOptions: Apollo.QueryHookOptions<ListOperationalShelterTasksBoQuery, ListOperationalShelterTasksBoQueryVariables> & ({ variables: ListOperationalShelterTasksBoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListOperationalShelterTasksBoQuery, ListOperationalShelterTasksBoQueryVariables>(ListOperationalShelterTasksBoDocument, options);
      }
export function useListOperationalShelterTasksBoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListOperationalShelterTasksBoQuery, ListOperationalShelterTasksBoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListOperationalShelterTasksBoQuery, ListOperationalShelterTasksBoQueryVariables>(ListOperationalShelterTasksBoDocument, options);
        }
export function useListOperationalShelterTasksBoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListOperationalShelterTasksBoQuery, ListOperationalShelterTasksBoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListOperationalShelterTasksBoQuery, ListOperationalShelterTasksBoQueryVariables>(ListOperationalShelterTasksBoDocument, options);
        }
export type ListOperationalShelterTasksBoQueryHookResult = ReturnType<typeof useListOperationalShelterTasksBoQuery>;
export type ListOperationalShelterTasksBoLazyQueryHookResult = ReturnType<typeof useListOperationalShelterTasksBoLazyQuery>;
export type ListOperationalShelterTasksBoSuspenseQueryHookResult = ReturnType<typeof useListOperationalShelterTasksBoSuspenseQuery>;
export type ListOperationalShelterTasksBoQueryResult = Apollo.QueryResult<ListOperationalShelterTasksBoQuery, ListOperationalShelterTasksBoQueryVariables>;