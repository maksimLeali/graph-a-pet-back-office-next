import * as Types from '../../types';

import { gql } from '@apollo/client';
import { PetTreatmentFragmentDoc } from './pet-treatment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetPetTreatmentsQueryVariables = Types.Exact<{
  petId: Types.Scalars['String']['input'];
  page: Types.Scalars['Int']['input'];
}>;


export type GetPetTreatmentsQuery = { __typename?: 'Query', listTreatments: { __typename?: 'PaginatedTreatments', success?: boolean | null, error?: { __typename?: 'Error', code: string, message: string, extra?: string | null } | null, pagination: { __typename?: 'Pagination', page_size?: number | null, current_page?: number | null, total_pages?: number | null, total_items?: number | null }, items: Array<{ __typename?: 'Treatment', id: string, date: string, created_at: string, name: string, type: Types.TreatmentType, booster?: { __typename?: 'Treatment', name: string, date: string, id: string } | null } | null> } };


export const GetPetTreatmentsDocument = gql`
    query getPetTreatments($petId: String!, $page: Int!) {
  listTreatments(
    commonSearch: {page: $page, order_by: "date", filters: {join: [{key: "health_cards", value: {join: [{key: "pets", value: {join: [{key: "ownerships", value: {fixed: [{key: "pet_id", value: $petId}]}}]}}]}}]}}
  ) {
    success
    error {
      code
      message
      extra
    }
    pagination {
      page_size
      current_page
      total_pages
      total_items
    }
    items {
      ...PetTreatment
    }
  }
}
    ${PetTreatmentFragmentDoc}`;

/**
 * __useGetPetTreatmentsQuery__
 *
 * To run a query within a React component, call `useGetPetTreatmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPetTreatmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPetTreatmentsQuery({
 *   variables: {
 *      petId: // value for 'petId'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetPetTreatmentsQuery(baseOptions: Apollo.QueryHookOptions<GetPetTreatmentsQuery, GetPetTreatmentsQueryVariables> & ({ variables: GetPetTreatmentsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPetTreatmentsQuery, GetPetTreatmentsQueryVariables>(GetPetTreatmentsDocument, options);
      }
export function useGetPetTreatmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPetTreatmentsQuery, GetPetTreatmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPetTreatmentsQuery, GetPetTreatmentsQueryVariables>(GetPetTreatmentsDocument, options);
        }
export function useGetPetTreatmentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPetTreatmentsQuery, GetPetTreatmentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPetTreatmentsQuery, GetPetTreatmentsQueryVariables>(GetPetTreatmentsDocument, options);
        }
export type GetPetTreatmentsQueryHookResult = ReturnType<typeof useGetPetTreatmentsQuery>;
export type GetPetTreatmentsLazyQueryHookResult = ReturnType<typeof useGetPetTreatmentsLazyQuery>;
export type GetPetTreatmentsSuspenseQueryHookResult = ReturnType<typeof useGetPetTreatmentsSuspenseQuery>;
export type GetPetTreatmentsQueryResult = Apollo.QueryResult<GetPetTreatmentsQuery, GetPetTreatmentsQueryVariables>;