import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListFundingNeedsQueryVariables = Types.Exact<{
  shelter_id: Types.Scalars['ID']['input'];
  status?: Types.InputMaybe<Types.FundingNeedStatus>;
}>;


export type ListFundingNeedsQuery = { __typename?: 'Query', listFundingNeeds: { __typename?: 'PetFundingNeedsResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, items: Array<{ __typename?: 'PetFundingNeed', id: string, shelter_id: string, pet_id?: string | null, title: string, description?: string | null, category?: string | null, currency: string, target_amount_cents: number, collected_amount_cents: number, remaining_amount_cents: number, status: Types.FundingNeedStatus, urgency: Types.FundingNeedUrgency, is_recurring_monthly: boolean, last_reset_at?: string | null, closed_at?: string | null, created_at: string } | null> } };

export type CreateFundingNeedMutationVariables = Types.Exact<{
  data: Types.FundingNeedCreateInput;
}>;


export type CreateFundingNeedMutation = { __typename?: 'Mutation', createFundingNeed: { __typename?: 'PetFundingNeedResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, funding_need?: { __typename?: 'PetFundingNeed', id: string } | null } };

export type UpdateFundingNeedMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  data: Types.FundingNeedUpdateInput;
}>;


export type UpdateFundingNeedMutation = { __typename?: 'Mutation', updateFundingNeed: { __typename?: 'PetFundingNeedResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, funding_need?: { __typename?: 'PetFundingNeed', id: string } | null } };

export type CloseFundingNeedMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type CloseFundingNeedMutation = { __typename?: 'Mutation', closeFundingNeed: { __typename?: 'PetFundingNeedResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, funding_need?: { __typename?: 'PetFundingNeed', id: string } | null } };


export const ListFundingNeedsDocument = gql`
    query listFundingNeeds($shelter_id: ID!, $status: FundingNeedStatus) {
  listFundingNeeds(shelter_id: $shelter_id, status: $status) {
    success
    error {
      code
      message
    }
    items {
      id
      shelter_id
      pet_id
      title
      description
      category
      currency
      target_amount_cents
      collected_amount_cents
      remaining_amount_cents
      status
      urgency
      is_recurring_monthly
      last_reset_at
      closed_at
      created_at
    }
  }
}
    `;

/**
 * __useListFundingNeedsQuery__
 *
 * To run a query within a React component, call `useListFundingNeedsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListFundingNeedsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListFundingNeedsQuery({
 *   variables: {
 *      shelter_id: // value for 'shelter_id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useListFundingNeedsQuery(baseOptions: Apollo.QueryHookOptions<ListFundingNeedsQuery, ListFundingNeedsQueryVariables> & ({ variables: ListFundingNeedsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListFundingNeedsQuery, ListFundingNeedsQueryVariables>(ListFundingNeedsDocument, options);
      }
export function useListFundingNeedsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListFundingNeedsQuery, ListFundingNeedsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListFundingNeedsQuery, ListFundingNeedsQueryVariables>(ListFundingNeedsDocument, options);
        }
export function useListFundingNeedsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListFundingNeedsQuery, ListFundingNeedsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListFundingNeedsQuery, ListFundingNeedsQueryVariables>(ListFundingNeedsDocument, options);
        }
export type ListFundingNeedsQueryHookResult = ReturnType<typeof useListFundingNeedsQuery>;
export type ListFundingNeedsLazyQueryHookResult = ReturnType<typeof useListFundingNeedsLazyQuery>;
export type ListFundingNeedsSuspenseQueryHookResult = ReturnType<typeof useListFundingNeedsSuspenseQuery>;
export type ListFundingNeedsQueryResult = Apollo.QueryResult<ListFundingNeedsQuery, ListFundingNeedsQueryVariables>;
export const CreateFundingNeedDocument = gql`
    mutation createFundingNeed($data: FundingNeedCreateInput!) {
  createFundingNeed(data: $data) {
    success
    error {
      code
      message
    }
    funding_need {
      id
    }
  }
}
    `;
export type CreateFundingNeedMutationFn = Apollo.MutationFunction<CreateFundingNeedMutation, CreateFundingNeedMutationVariables>;

/**
 * __useCreateFundingNeedMutation__
 *
 * To run a mutation, you first call `useCreateFundingNeedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFundingNeedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFundingNeedMutation, { data, loading, error }] = useCreateFundingNeedMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateFundingNeedMutation(baseOptions?: Apollo.MutationHookOptions<CreateFundingNeedMutation, CreateFundingNeedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFundingNeedMutation, CreateFundingNeedMutationVariables>(CreateFundingNeedDocument, options);
      }
export type CreateFundingNeedMutationHookResult = ReturnType<typeof useCreateFundingNeedMutation>;
export type CreateFundingNeedMutationResult = Apollo.MutationResult<CreateFundingNeedMutation>;
export type CreateFundingNeedMutationOptions = Apollo.BaseMutationOptions<CreateFundingNeedMutation, CreateFundingNeedMutationVariables>;
export const UpdateFundingNeedDocument = gql`
    mutation updateFundingNeed($id: ID!, $data: FundingNeedUpdateInput!) {
  updateFundingNeed(id: $id, data: $data) {
    success
    error {
      code
      message
    }
    funding_need {
      id
    }
  }
}
    `;
export type UpdateFundingNeedMutationFn = Apollo.MutationFunction<UpdateFundingNeedMutation, UpdateFundingNeedMutationVariables>;

/**
 * __useUpdateFundingNeedMutation__
 *
 * To run a mutation, you first call `useUpdateFundingNeedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFundingNeedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFundingNeedMutation, { data, loading, error }] = useUpdateFundingNeedMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateFundingNeedMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFundingNeedMutation, UpdateFundingNeedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFundingNeedMutation, UpdateFundingNeedMutationVariables>(UpdateFundingNeedDocument, options);
      }
export type UpdateFundingNeedMutationHookResult = ReturnType<typeof useUpdateFundingNeedMutation>;
export type UpdateFundingNeedMutationResult = Apollo.MutationResult<UpdateFundingNeedMutation>;
export type UpdateFundingNeedMutationOptions = Apollo.BaseMutationOptions<UpdateFundingNeedMutation, UpdateFundingNeedMutationVariables>;
export const CloseFundingNeedDocument = gql`
    mutation closeFundingNeed($id: ID!) {
  closeFundingNeed(id: $id) {
    success
    error {
      code
      message
    }
    funding_need {
      id
    }
  }
}
    `;
export type CloseFundingNeedMutationFn = Apollo.MutationFunction<CloseFundingNeedMutation, CloseFundingNeedMutationVariables>;

/**
 * __useCloseFundingNeedMutation__
 *
 * To run a mutation, you first call `useCloseFundingNeedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCloseFundingNeedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closeFundingNeedMutation, { data, loading, error }] = useCloseFundingNeedMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCloseFundingNeedMutation(baseOptions?: Apollo.MutationHookOptions<CloseFundingNeedMutation, CloseFundingNeedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CloseFundingNeedMutation, CloseFundingNeedMutationVariables>(CloseFundingNeedDocument, options);
      }
export type CloseFundingNeedMutationHookResult = ReturnType<typeof useCloseFundingNeedMutation>;
export type CloseFundingNeedMutationResult = Apollo.MutationResult<CloseFundingNeedMutation>;
export type CloseFundingNeedMutationOptions = Apollo.BaseMutationOptions<CloseFundingNeedMutation, CloseFundingNeedMutationVariables>;