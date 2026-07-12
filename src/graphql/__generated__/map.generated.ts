import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FullShelterMapBoFragment = { __typename?: 'ShelterMap', id: string, name: string, width: number, height: number, unit: Types.MapUnit, zones: Array<{ __typename?: 'ShelterZone', id: string, name: string, x: number, y: number, width: number, height: number, color?: string | null }>, areas: Array<{ __typename?: 'ShelterArea', id: string, name: string, area_type: Types.AreaType, x: number, y: number, width: number, height: number, color?: string | null, zone?: { __typename?: 'ShelterZone', id: string } | null }>, boxes: Array<{ __typename?: 'ShelterBox', id: string, label: string, x: number, y: number, width: number, height: number, rotation: number, capacity: number, status: Types.BoxStatus, is_out_of_service: boolean, area?: { __typename?: 'ShelterArea', id: string } | null, zone?: { __typename?: 'ShelterZone', id: string } | null, occupancy_history?: { __typename?: 'PaginatedBoxOccupancies', items: Array<{ __typename?: 'ShelterBoxOccupancy', id: string, exited_at?: string | null, shelter_pet: { __typename?: 'ShelterPet', id: string, pet: { __typename?: 'Pet', id: string, name: string } } } | null> } | null }>, elements: Array<{ __typename?: 'ShelterMapElement', id: string, element_type: Types.MapElementType, x: number, y: number, width: number, height: number, rotation: number, color?: string | null, label?: string | null }> };

export type ListShelterMapsBoQueryVariables = Types.Exact<{
  commonSearch?: Types.InputMaybe<Types.CommonSearch>;
}>;


export type ListShelterMapsBoQuery = { __typename?: 'Query', listShelterMaps: { __typename?: 'PaginatedShelterMaps', success?: boolean | null, error?: { __typename?: 'Error', code: string, message: string } | null, items: Array<{ __typename?: 'ShelterMap', id: string, name: string, width: number, height: number, unit: Types.MapUnit } | null> } };

export type GetShelterMapBoQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type GetShelterMapBoQuery = { __typename?: 'Query', getShelterMap: { __typename?: 'ShelterMapResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, map?: { __typename?: 'ShelterMap', id: string, name: string, width: number, height: number, unit: Types.MapUnit, zones: Array<{ __typename?: 'ShelterZone', id: string, name: string, x: number, y: number, width: number, height: number, color?: string | null }>, areas: Array<{ __typename?: 'ShelterArea', id: string, name: string, area_type: Types.AreaType, x: number, y: number, width: number, height: number, color?: string | null, zone?: { __typename?: 'ShelterZone', id: string } | null }>, boxes: Array<{ __typename?: 'ShelterBox', id: string, label: string, x: number, y: number, width: number, height: number, rotation: number, capacity: number, status: Types.BoxStatus, is_out_of_service: boolean, area?: { __typename?: 'ShelterArea', id: string } | null, zone?: { __typename?: 'ShelterZone', id: string } | null, occupancy_history?: { __typename?: 'PaginatedBoxOccupancies', items: Array<{ __typename?: 'ShelterBoxOccupancy', id: string, exited_at?: string | null, shelter_pet: { __typename?: 'ShelterPet', id: string, pet: { __typename?: 'Pet', id: string, name: string } } } | null> } | null }>, elements: Array<{ __typename?: 'ShelterMapElement', id: string, element_type: Types.MapElementType, x: number, y: number, width: number, height: number, rotation: number, color?: string | null, label?: string | null }> } | null } };

export type CreateShelterMapBoMutationVariables = Types.Exact<{
  data: Types.ShelterMapCreate;
}>;


export type CreateShelterMapBoMutation = { __typename?: 'Mutation', createShelterMap: { __typename?: 'ShelterMapResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, map?: { __typename?: 'ShelterMap', id: string, name: string, width: number, height: number, unit: Types.MapUnit, zones: Array<{ __typename?: 'ShelterZone', id: string, name: string, x: number, y: number, width: number, height: number, color?: string | null }>, areas: Array<{ __typename?: 'ShelterArea', id: string, name: string, area_type: Types.AreaType, x: number, y: number, width: number, height: number, color?: string | null, zone?: { __typename?: 'ShelterZone', id: string } | null }>, boxes: Array<{ __typename?: 'ShelterBox', id: string, label: string, x: number, y: number, width: number, height: number, rotation: number, capacity: number, status: Types.BoxStatus, is_out_of_service: boolean, area?: { __typename?: 'ShelterArea', id: string } | null, zone?: { __typename?: 'ShelterZone', id: string } | null, occupancy_history?: { __typename?: 'PaginatedBoxOccupancies', items: Array<{ __typename?: 'ShelterBoxOccupancy', id: string, exited_at?: string | null, shelter_pet: { __typename?: 'ShelterPet', id: string, pet: { __typename?: 'Pet', id: string, name: string } } } | null> } | null }>, elements: Array<{ __typename?: 'ShelterMapElement', id: string, element_type: Types.MapElementType, x: number, y: number, width: number, height: number, rotation: number, color?: string | null, label?: string | null }> } | null } };

export type UpdateShelterMapBoMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  data: Types.ShelterMapUpdate;
}>;


export type UpdateShelterMapBoMutation = { __typename?: 'Mutation', updateShelterMap: { __typename?: 'ShelterMapResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, map?: { __typename?: 'ShelterMap', id: string, name: string, width: number, height: number, unit: Types.MapUnit, zones: Array<{ __typename?: 'ShelterZone', id: string, name: string, x: number, y: number, width: number, height: number, color?: string | null }>, areas: Array<{ __typename?: 'ShelterArea', id: string, name: string, area_type: Types.AreaType, x: number, y: number, width: number, height: number, color?: string | null, zone?: { __typename?: 'ShelterZone', id: string } | null }>, boxes: Array<{ __typename?: 'ShelterBox', id: string, label: string, x: number, y: number, width: number, height: number, rotation: number, capacity: number, status: Types.BoxStatus, is_out_of_service: boolean, area?: { __typename?: 'ShelterArea', id: string } | null, zone?: { __typename?: 'ShelterZone', id: string } | null, occupancy_history?: { __typename?: 'PaginatedBoxOccupancies', items: Array<{ __typename?: 'ShelterBoxOccupancy', id: string, exited_at?: string | null, shelter_pet: { __typename?: 'ShelterPet', id: string, pet: { __typename?: 'Pet', id: string, name: string } } } | null> } | null }>, elements: Array<{ __typename?: 'ShelterMapElement', id: string, element_type: Types.MapElementType, x: number, y: number, width: number, height: number, rotation: number, color?: string | null, label?: string | null }> } | null } };

export type SaveShelterMapLayoutBoMutationVariables = Types.Exact<{
  map_id: Types.Scalars['ID']['input'];
  data: Types.ShelterMapLayoutInput;
}>;


export type SaveShelterMapLayoutBoMutation = { __typename?: 'Mutation', saveShelterMapLayout: { __typename?: 'ShelterMapResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, map?: { __typename?: 'ShelterMap', id: string, name: string, width: number, height: number, unit: Types.MapUnit, zones: Array<{ __typename?: 'ShelterZone', id: string, name: string, x: number, y: number, width: number, height: number, color?: string | null }>, areas: Array<{ __typename?: 'ShelterArea', id: string, name: string, area_type: Types.AreaType, x: number, y: number, width: number, height: number, color?: string | null, zone?: { __typename?: 'ShelterZone', id: string } | null }>, boxes: Array<{ __typename?: 'ShelterBox', id: string, label: string, x: number, y: number, width: number, height: number, rotation: number, capacity: number, status: Types.BoxStatus, is_out_of_service: boolean, area?: { __typename?: 'ShelterArea', id: string } | null, zone?: { __typename?: 'ShelterZone', id: string } | null, occupancy_history?: { __typename?: 'PaginatedBoxOccupancies', items: Array<{ __typename?: 'ShelterBoxOccupancy', id: string, exited_at?: string | null, shelter_pet: { __typename?: 'ShelterPet', id: string, pet: { __typename?: 'Pet', id: string, name: string } } } | null> } | null }>, elements: Array<{ __typename?: 'ShelterMapElement', id: string, element_type: Types.MapElementType, x: number, y: number, width: number, height: number, rotation: number, color?: string | null, label?: string | null }> } | null } };

export type AssignPetToBoxBoMutationVariables = Types.Exact<{
  box_id: Types.Scalars['ID']['input'];
  shelter_pet_id: Types.Scalars['ID']['input'];
  reason?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type AssignPetToBoxBoMutation = { __typename?: 'Mutation', assignPetToBox: { __typename?: 'ShelterBoxOccupancyResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, occupancy?: { __typename?: 'ShelterBoxOccupancy', id: string } | null } };

export type ReleasePetFromBoxBoMutationVariables = Types.Exact<{
  occupancy_id: Types.Scalars['ID']['input'];
  reason?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type ReleasePetFromBoxBoMutation = { __typename?: 'Mutation', releasePetFromBox: { __typename?: 'ShelterBoxOccupancyResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, occupancy?: { __typename?: 'ShelterBoxOccupancy', id: string } | null } };

export const FullShelterMapBoFragmentDoc = gql`
    fragment FullShelterMapBO on ShelterMap {
  id
  name
  width
  height
  unit
  zones {
    id
    name
    x
    y
    width
    height
    color
  }
  areas {
    id
    name
    area_type
    x
    y
    width
    height
    color
    zone {
      id
    }
  }
  boxes {
    id
    label
    x
    y
    width
    height
    rotation
    capacity
    status
    is_out_of_service
    area {
      id
    }
    zone {
      id
    }
    occupancy_history {
      items {
        id
        exited_at
        shelter_pet {
          id
          pet {
            id
            name
          }
        }
      }
    }
  }
  elements {
    id
    element_type
    x
    y
    width
    height
    rotation
    color
    label
  }
}
    `;
export const ListShelterMapsBoDocument = gql`
    query listShelterMapsBO($commonSearch: CommonSearch) {
  listShelterMaps(commonSearch: $commonSearch) {
    success
    error {
      code
      message
    }
    items {
      id
      name
      width
      height
      unit
    }
  }
}
    `;

/**
 * __useListShelterMapsBoQuery__
 *
 * To run a query within a React component, call `useListShelterMapsBoQuery` and pass it any options that fit your needs.
 * When your component renders, `useListShelterMapsBoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListShelterMapsBoQuery({
 *   variables: {
 *      commonSearch: // value for 'commonSearch'
 *   },
 * });
 */
export function useListShelterMapsBoQuery(baseOptions?: Apollo.QueryHookOptions<ListShelterMapsBoQuery, ListShelterMapsBoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListShelterMapsBoQuery, ListShelterMapsBoQueryVariables>(ListShelterMapsBoDocument, options);
      }
export function useListShelterMapsBoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListShelterMapsBoQuery, ListShelterMapsBoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListShelterMapsBoQuery, ListShelterMapsBoQueryVariables>(ListShelterMapsBoDocument, options);
        }
export function useListShelterMapsBoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListShelterMapsBoQuery, ListShelterMapsBoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListShelterMapsBoQuery, ListShelterMapsBoQueryVariables>(ListShelterMapsBoDocument, options);
        }
export type ListShelterMapsBoQueryHookResult = ReturnType<typeof useListShelterMapsBoQuery>;
export type ListShelterMapsBoLazyQueryHookResult = ReturnType<typeof useListShelterMapsBoLazyQuery>;
export type ListShelterMapsBoSuspenseQueryHookResult = ReturnType<typeof useListShelterMapsBoSuspenseQuery>;
export type ListShelterMapsBoQueryResult = Apollo.QueryResult<ListShelterMapsBoQuery, ListShelterMapsBoQueryVariables>;
export const GetShelterMapBoDocument = gql`
    query getShelterMapBO($id: ID!) {
  getShelterMap(id: $id) {
    success
    error {
      code
      message
    }
    map {
      ...FullShelterMapBO
    }
  }
}
    ${FullShelterMapBoFragmentDoc}`;

/**
 * __useGetShelterMapBoQuery__
 *
 * To run a query within a React component, call `useGetShelterMapBoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetShelterMapBoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetShelterMapBoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetShelterMapBoQuery(baseOptions: Apollo.QueryHookOptions<GetShelterMapBoQuery, GetShelterMapBoQueryVariables> & ({ variables: GetShelterMapBoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetShelterMapBoQuery, GetShelterMapBoQueryVariables>(GetShelterMapBoDocument, options);
      }
export function useGetShelterMapBoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetShelterMapBoQuery, GetShelterMapBoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetShelterMapBoQuery, GetShelterMapBoQueryVariables>(GetShelterMapBoDocument, options);
        }
export function useGetShelterMapBoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetShelterMapBoQuery, GetShelterMapBoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetShelterMapBoQuery, GetShelterMapBoQueryVariables>(GetShelterMapBoDocument, options);
        }
export type GetShelterMapBoQueryHookResult = ReturnType<typeof useGetShelterMapBoQuery>;
export type GetShelterMapBoLazyQueryHookResult = ReturnType<typeof useGetShelterMapBoLazyQuery>;
export type GetShelterMapBoSuspenseQueryHookResult = ReturnType<typeof useGetShelterMapBoSuspenseQuery>;
export type GetShelterMapBoQueryResult = Apollo.QueryResult<GetShelterMapBoQuery, GetShelterMapBoQueryVariables>;
export const CreateShelterMapBoDocument = gql`
    mutation createShelterMapBO($data: ShelterMapCreate!) {
  createShelterMap(data: $data) {
    success
    error {
      code
      message
    }
    map {
      ...FullShelterMapBO
    }
  }
}
    ${FullShelterMapBoFragmentDoc}`;
export type CreateShelterMapBoMutationFn = Apollo.MutationFunction<CreateShelterMapBoMutation, CreateShelterMapBoMutationVariables>;

/**
 * __useCreateShelterMapBoMutation__
 *
 * To run a mutation, you first call `useCreateShelterMapBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShelterMapBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShelterMapBoMutation, { data, loading, error }] = useCreateShelterMapBoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateShelterMapBoMutation(baseOptions?: Apollo.MutationHookOptions<CreateShelterMapBoMutation, CreateShelterMapBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateShelterMapBoMutation, CreateShelterMapBoMutationVariables>(CreateShelterMapBoDocument, options);
      }
export type CreateShelterMapBoMutationHookResult = ReturnType<typeof useCreateShelterMapBoMutation>;
export type CreateShelterMapBoMutationResult = Apollo.MutationResult<CreateShelterMapBoMutation>;
export type CreateShelterMapBoMutationOptions = Apollo.BaseMutationOptions<CreateShelterMapBoMutation, CreateShelterMapBoMutationVariables>;
export const UpdateShelterMapBoDocument = gql`
    mutation updateShelterMapBO($id: ID!, $data: ShelterMapUpdate!) {
  updateShelterMap(id: $id, data: $data) {
    success
    error {
      code
      message
    }
    map {
      ...FullShelterMapBO
    }
  }
}
    ${FullShelterMapBoFragmentDoc}`;
export type UpdateShelterMapBoMutationFn = Apollo.MutationFunction<UpdateShelterMapBoMutation, UpdateShelterMapBoMutationVariables>;

/**
 * __useUpdateShelterMapBoMutation__
 *
 * To run a mutation, you first call `useUpdateShelterMapBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateShelterMapBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateShelterMapBoMutation, { data, loading, error }] = useUpdateShelterMapBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateShelterMapBoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateShelterMapBoMutation, UpdateShelterMapBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateShelterMapBoMutation, UpdateShelterMapBoMutationVariables>(UpdateShelterMapBoDocument, options);
      }
export type UpdateShelterMapBoMutationHookResult = ReturnType<typeof useUpdateShelterMapBoMutation>;
export type UpdateShelterMapBoMutationResult = Apollo.MutationResult<UpdateShelterMapBoMutation>;
export type UpdateShelterMapBoMutationOptions = Apollo.BaseMutationOptions<UpdateShelterMapBoMutation, UpdateShelterMapBoMutationVariables>;
export const SaveShelterMapLayoutBoDocument = gql`
    mutation saveShelterMapLayoutBO($map_id: ID!, $data: ShelterMapLayoutInput!) {
  saveShelterMapLayout(map_id: $map_id, data: $data) {
    success
    error {
      code
      message
    }
    map {
      ...FullShelterMapBO
    }
  }
}
    ${FullShelterMapBoFragmentDoc}`;
export type SaveShelterMapLayoutBoMutationFn = Apollo.MutationFunction<SaveShelterMapLayoutBoMutation, SaveShelterMapLayoutBoMutationVariables>;

/**
 * __useSaveShelterMapLayoutBoMutation__
 *
 * To run a mutation, you first call `useSaveShelterMapLayoutBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveShelterMapLayoutBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveShelterMapLayoutBoMutation, { data, loading, error }] = useSaveShelterMapLayoutBoMutation({
 *   variables: {
 *      map_id: // value for 'map_id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSaveShelterMapLayoutBoMutation(baseOptions?: Apollo.MutationHookOptions<SaveShelterMapLayoutBoMutation, SaveShelterMapLayoutBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveShelterMapLayoutBoMutation, SaveShelterMapLayoutBoMutationVariables>(SaveShelterMapLayoutBoDocument, options);
      }
export type SaveShelterMapLayoutBoMutationHookResult = ReturnType<typeof useSaveShelterMapLayoutBoMutation>;
export type SaveShelterMapLayoutBoMutationResult = Apollo.MutationResult<SaveShelterMapLayoutBoMutation>;
export type SaveShelterMapLayoutBoMutationOptions = Apollo.BaseMutationOptions<SaveShelterMapLayoutBoMutation, SaveShelterMapLayoutBoMutationVariables>;
export const AssignPetToBoxBoDocument = gql`
    mutation assignPetToBoxBO($box_id: ID!, $shelter_pet_id: ID!, $reason: String) {
  assignPetToBox(
    box_id: $box_id
    shelter_pet_id: $shelter_pet_id
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
export type AssignPetToBoxBoMutationFn = Apollo.MutationFunction<AssignPetToBoxBoMutation, AssignPetToBoxBoMutationVariables>;

/**
 * __useAssignPetToBoxBoMutation__
 *
 * To run a mutation, you first call `useAssignPetToBoxBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignPetToBoxBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignPetToBoxBoMutation, { data, loading, error }] = useAssignPetToBoxBoMutation({
 *   variables: {
 *      box_id: // value for 'box_id'
 *      shelter_pet_id: // value for 'shelter_pet_id'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useAssignPetToBoxBoMutation(baseOptions?: Apollo.MutationHookOptions<AssignPetToBoxBoMutation, AssignPetToBoxBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AssignPetToBoxBoMutation, AssignPetToBoxBoMutationVariables>(AssignPetToBoxBoDocument, options);
      }
export type AssignPetToBoxBoMutationHookResult = ReturnType<typeof useAssignPetToBoxBoMutation>;
export type AssignPetToBoxBoMutationResult = Apollo.MutationResult<AssignPetToBoxBoMutation>;
export type AssignPetToBoxBoMutationOptions = Apollo.BaseMutationOptions<AssignPetToBoxBoMutation, AssignPetToBoxBoMutationVariables>;
export const ReleasePetFromBoxBoDocument = gql`
    mutation releasePetFromBoxBO($occupancy_id: ID!, $reason: String) {
  releasePetFromBox(occupancy_id: $occupancy_id, reason: $reason) {
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
export type ReleasePetFromBoxBoMutationFn = Apollo.MutationFunction<ReleasePetFromBoxBoMutation, ReleasePetFromBoxBoMutationVariables>;

/**
 * __useReleasePetFromBoxBoMutation__
 *
 * To run a mutation, you first call `useReleasePetFromBoxBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReleasePetFromBoxBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [releasePetFromBoxBoMutation, { data, loading, error }] = useReleasePetFromBoxBoMutation({
 *   variables: {
 *      occupancy_id: // value for 'occupancy_id'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useReleasePetFromBoxBoMutation(baseOptions?: Apollo.MutationHookOptions<ReleasePetFromBoxBoMutation, ReleasePetFromBoxBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReleasePetFromBoxBoMutation, ReleasePetFromBoxBoMutationVariables>(ReleasePetFromBoxBoDocument, options);
      }
export type ReleasePetFromBoxBoMutationHookResult = ReturnType<typeof useReleasePetFromBoxBoMutation>;
export type ReleasePetFromBoxBoMutationResult = Apollo.MutationResult<ReleasePetFromBoxBoMutation>;
export type ReleasePetFromBoxBoMutationOptions = Apollo.BaseMutationOptions<ReleasePetFromBoxBoMutation, ReleasePetFromBoxBoMutationVariables>;