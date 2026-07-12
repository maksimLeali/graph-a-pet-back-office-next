import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListShelterBoxesBoQueryVariables = Types.Exact<{
  search: Types.CommonSearch;
}>;


export type ListShelterBoxesBoQuery = { __typename?: 'Query', listShelterBoxes: { __typename?: 'PaginatedShelterBoxes', success?: boolean | null, error?: { __typename?: 'Error', code: string, message: string } | null, pagination: { __typename?: 'Pagination', total_items?: number | null, total_pages?: number | null, current_page?: number | null, page_size?: number | null }, items: Array<{ __typename?: 'ShelterBox', id: string, created_at: string, label: string, capacity: number, status: Types.BoxStatus, is_out_of_service: boolean, last_cleaned_at?: string | null, notes?: string | null, zone?: { __typename?: 'ShelterZone', id: string, name: string } | null, area?: { __typename?: 'ShelterArea', id: string, name: string } | null, current_occupants: Array<{ __typename?: 'ShelterPet', id: string, pet: { __typename?: 'Pet', id: string, name: string } }>, occupancy_history?: { __typename?: 'PaginatedBoxOccupancies', items: Array<{ __typename?: 'ShelterBoxOccupancy', id: string, entered_at: string, exited_at?: string | null, reason?: string | null, shelter_pet: { __typename?: 'ShelterPet', id: string, pet: { __typename?: 'Pet', id: string, name: string } }, moved_by?: { __typename?: 'User', id: string, first_name: string, last_name: string } | null } | null> } | null } | null> } };

export type UpdateShelterBoxBoMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  data: Types.ShelterBoxUpdate;
}>;


export type UpdateShelterBoxBoMutation = { __typename?: 'Mutation', updateShelterBox: { __typename?: 'ShelterBoxResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, box?: { __typename?: 'ShelterBox', id: string } | null } };

export type MarkBoxCleanedBoMutationVariables = Types.Exact<{
  box_id: Types.Scalars['ID']['input'];
}>;


export type MarkBoxCleanedBoMutation = { __typename?: 'Mutation', markBoxCleaned: { __typename?: 'ShelterBoxResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, box?: { __typename?: 'ShelterBox', id: string, last_cleaned_at?: string | null, status: Types.BoxStatus } | null } };

export type DeleteShelterBoxBoMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type DeleteShelterBoxBoMutation = { __typename?: 'Mutation', deleteShelterBox: { __typename?: 'DeleteResult', success?: boolean | null, id?: string | null, error?: { __typename?: 'Error', code: string, message: string } | null } };

export type MovePetBetweenBoxesBoMutationVariables = Types.Exact<{
  shelter_pet_id: Types.Scalars['ID']['input'];
  to_box_id: Types.Scalars['ID']['input'];
  reason?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type MovePetBetweenBoxesBoMutation = { __typename?: 'Mutation', movePetBetweenBoxes: { __typename?: 'ShelterBoxOccupancyResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, occupancy?: { __typename?: 'ShelterBoxOccupancy', id: string } | null } };


export const ListShelterBoxesBoDocument = gql`
    query listShelterBoxesBO($search: CommonSearch!) {
  listShelterBoxes(commonSearch: $search) {
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
      label
      capacity
      status
      is_out_of_service
      last_cleaned_at
      notes
      zone {
        id
        name
      }
      area {
        id
        name
      }
      current_occupants {
        id
        pet {
          id
          name
        }
      }
      occupancy_history(
        commonSearch: {page: 0, page_size: 20, order_by: "entered_at", order_direction: "desc"}
      ) {
        items {
          id
          entered_at
          exited_at
          reason
          shelter_pet {
            id
            pet {
              id
              name
            }
          }
          moved_by {
            id
            first_name
            last_name
          }
        }
      }
    }
  }
}
    `;

/**
 * __useListShelterBoxesBoQuery__
 *
 * To run a query within a React component, call `useListShelterBoxesBoQuery` and pass it any options that fit your needs.
 * When your component renders, `useListShelterBoxesBoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListShelterBoxesBoQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useListShelterBoxesBoQuery(baseOptions: Apollo.QueryHookOptions<ListShelterBoxesBoQuery, ListShelterBoxesBoQueryVariables> & ({ variables: ListShelterBoxesBoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListShelterBoxesBoQuery, ListShelterBoxesBoQueryVariables>(ListShelterBoxesBoDocument, options);
      }
export function useListShelterBoxesBoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListShelterBoxesBoQuery, ListShelterBoxesBoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListShelterBoxesBoQuery, ListShelterBoxesBoQueryVariables>(ListShelterBoxesBoDocument, options);
        }
export function useListShelterBoxesBoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListShelterBoxesBoQuery, ListShelterBoxesBoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListShelterBoxesBoQuery, ListShelterBoxesBoQueryVariables>(ListShelterBoxesBoDocument, options);
        }
export type ListShelterBoxesBoQueryHookResult = ReturnType<typeof useListShelterBoxesBoQuery>;
export type ListShelterBoxesBoLazyQueryHookResult = ReturnType<typeof useListShelterBoxesBoLazyQuery>;
export type ListShelterBoxesBoSuspenseQueryHookResult = ReturnType<typeof useListShelterBoxesBoSuspenseQuery>;
export type ListShelterBoxesBoQueryResult = Apollo.QueryResult<ListShelterBoxesBoQuery, ListShelterBoxesBoQueryVariables>;
export const UpdateShelterBoxBoDocument = gql`
    mutation updateShelterBoxBO($id: ID!, $data: ShelterBoxUpdate!) {
  updateShelterBox(id: $id, data: $data) {
    success
    error {
      code
      message
    }
    box {
      id
    }
  }
}
    `;
export type UpdateShelterBoxBoMutationFn = Apollo.MutationFunction<UpdateShelterBoxBoMutation, UpdateShelterBoxBoMutationVariables>;

/**
 * __useUpdateShelterBoxBoMutation__
 *
 * To run a mutation, you first call `useUpdateShelterBoxBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateShelterBoxBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateShelterBoxBoMutation, { data, loading, error }] = useUpdateShelterBoxBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateShelterBoxBoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateShelterBoxBoMutation, UpdateShelterBoxBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateShelterBoxBoMutation, UpdateShelterBoxBoMutationVariables>(UpdateShelterBoxBoDocument, options);
      }
export type UpdateShelterBoxBoMutationHookResult = ReturnType<typeof useUpdateShelterBoxBoMutation>;
export type UpdateShelterBoxBoMutationResult = Apollo.MutationResult<UpdateShelterBoxBoMutation>;
export type UpdateShelterBoxBoMutationOptions = Apollo.BaseMutationOptions<UpdateShelterBoxBoMutation, UpdateShelterBoxBoMutationVariables>;
export const MarkBoxCleanedBoDocument = gql`
    mutation markBoxCleanedBO($box_id: ID!) {
  markBoxCleaned(box_id: $box_id) {
    success
    error {
      code
      message
    }
    box {
      id
      last_cleaned_at
      status
    }
  }
}
    `;
export type MarkBoxCleanedBoMutationFn = Apollo.MutationFunction<MarkBoxCleanedBoMutation, MarkBoxCleanedBoMutationVariables>;

/**
 * __useMarkBoxCleanedBoMutation__
 *
 * To run a mutation, you first call `useMarkBoxCleanedBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkBoxCleanedBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markBoxCleanedBoMutation, { data, loading, error }] = useMarkBoxCleanedBoMutation({
 *   variables: {
 *      box_id: // value for 'box_id'
 *   },
 * });
 */
export function useMarkBoxCleanedBoMutation(baseOptions?: Apollo.MutationHookOptions<MarkBoxCleanedBoMutation, MarkBoxCleanedBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkBoxCleanedBoMutation, MarkBoxCleanedBoMutationVariables>(MarkBoxCleanedBoDocument, options);
      }
export type MarkBoxCleanedBoMutationHookResult = ReturnType<typeof useMarkBoxCleanedBoMutation>;
export type MarkBoxCleanedBoMutationResult = Apollo.MutationResult<MarkBoxCleanedBoMutation>;
export type MarkBoxCleanedBoMutationOptions = Apollo.BaseMutationOptions<MarkBoxCleanedBoMutation, MarkBoxCleanedBoMutationVariables>;
export const DeleteShelterBoxBoDocument = gql`
    mutation deleteShelterBoxBO($id: ID!) {
  deleteShelterBox(id: $id) {
    success
    error {
      code
      message
    }
    id
  }
}
    `;
export type DeleteShelterBoxBoMutationFn = Apollo.MutationFunction<DeleteShelterBoxBoMutation, DeleteShelterBoxBoMutationVariables>;

/**
 * __useDeleteShelterBoxBoMutation__
 *
 * To run a mutation, you first call `useDeleteShelterBoxBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteShelterBoxBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteShelterBoxBoMutation, { data, loading, error }] = useDeleteShelterBoxBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteShelterBoxBoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteShelterBoxBoMutation, DeleteShelterBoxBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteShelterBoxBoMutation, DeleteShelterBoxBoMutationVariables>(DeleteShelterBoxBoDocument, options);
      }
export type DeleteShelterBoxBoMutationHookResult = ReturnType<typeof useDeleteShelterBoxBoMutation>;
export type DeleteShelterBoxBoMutationResult = Apollo.MutationResult<DeleteShelterBoxBoMutation>;
export type DeleteShelterBoxBoMutationOptions = Apollo.BaseMutationOptions<DeleteShelterBoxBoMutation, DeleteShelterBoxBoMutationVariables>;
export const MovePetBetweenBoxesBoDocument = gql`
    mutation movePetBetweenBoxesBO($shelter_pet_id: ID!, $to_box_id: ID!, $reason: String) {
  movePetBetweenBoxes(
    shelter_pet_id: $shelter_pet_id
    to_box_id: $to_box_id
    reason: $reason
  ) {
    success
    error {
      code
      message
    }
    occupancy {
      id
    }
  }
}
    `;
export type MovePetBetweenBoxesBoMutationFn = Apollo.MutationFunction<MovePetBetweenBoxesBoMutation, MovePetBetweenBoxesBoMutationVariables>;

/**
 * __useMovePetBetweenBoxesBoMutation__
 *
 * To run a mutation, you first call `useMovePetBetweenBoxesBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMovePetBetweenBoxesBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [movePetBetweenBoxesBoMutation, { data, loading, error }] = useMovePetBetweenBoxesBoMutation({
 *   variables: {
 *      shelter_pet_id: // value for 'shelter_pet_id'
 *      to_box_id: // value for 'to_box_id'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useMovePetBetweenBoxesBoMutation(baseOptions?: Apollo.MutationHookOptions<MovePetBetweenBoxesBoMutation, MovePetBetweenBoxesBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MovePetBetweenBoxesBoMutation, MovePetBetweenBoxesBoMutationVariables>(MovePetBetweenBoxesBoDocument, options);
      }
export type MovePetBetweenBoxesBoMutationHookResult = ReturnType<typeof useMovePetBetweenBoxesBoMutation>;
export type MovePetBetweenBoxesBoMutationResult = Apollo.MutationResult<MovePetBetweenBoxesBoMutation>;
export type MovePetBetweenBoxesBoMutationOptions = Apollo.BaseMutationOptions<MovePetBetweenBoxesBoMutation, MovePetBetweenBoxesBoMutationVariables>;