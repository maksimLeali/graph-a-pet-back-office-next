import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListPlatformShelterClaimRequestsBoQueryVariables = Types.Exact<{
  search?: Types.InputMaybe<Types.CommonSearch>;
}>;


export type ListPlatformShelterClaimRequestsBoQuery = { __typename?: 'Query', listPlatformShelterClaimRequests: { __typename?: 'PaginatedShelterClaimRequests', success?: boolean | null, error?: { __typename?: 'Error', code: string, message: string } | null, items: Array<{ __typename?: 'ShelterClaimRequest', id: string, created_at: string, status: Types.ShelterClaimRequestStatus, message?: string | null, proof_data?: any | null, decision_note?: string | null, reviewed_at?: string | null, shelter: { __typename?: 'Shelter', id: string, name: string, city: string, type: Types.ShelterType, verification_status: Types.ShelterVerificationStatus }, requester: { __typename?: 'User', id: string, first_name: string, last_name: string, email: string }, reviewed_by?: { __typename?: 'User', id: string, first_name: string, last_name: string } | null } | null>, pagination: { __typename?: 'Pagination', total_items?: number | null, total_pages?: number | null, current_page?: number | null, page_size?: number | null } } };

export type ApproveShelterClaimBoMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  decision_note?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type ApproveShelterClaimBoMutation = { __typename?: 'Mutation', approveShelterClaim: { __typename?: 'ShelterClaimRequestResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter_claim_request?: { __typename?: 'ShelterClaimRequest', id: string, status: Types.ShelterClaimRequestStatus } | null } };

export type RejectShelterClaimBoMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  decision_note?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type RejectShelterClaimBoMutation = { __typename?: 'Mutation', rejectShelterClaim: { __typename?: 'ShelterClaimRequestResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter_claim_request?: { __typename?: 'ShelterClaimRequest', id: string, status: Types.ShelterClaimRequestStatus } | null } };

export type RequestShelterClaimDocumentChangeBoMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  document_id: Types.Scalars['String']['input'];
  note?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type RequestShelterClaimDocumentChangeBoMutation = { __typename?: 'Mutation', requestShelterClaimDocumentChange: { __typename?: 'ShelterClaimRequestResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter_claim_request?: { __typename?: 'ShelterClaimRequest', id: string, status: Types.ShelterClaimRequestStatus, proof_data?: any | null } | null } };


export const ListPlatformShelterClaimRequestsBoDocument = gql`
    query listPlatformShelterClaimRequestsBO($search: CommonSearch) {
  listPlatformShelterClaimRequests(search: $search) {
    success
    error {
      code
      message
    }
    items {
      id
      created_at
      status
      message
      proof_data
      decision_note
      reviewed_at
      shelter {
        id
        name
        city
        type
        verification_status
      }
      requester {
        id
        first_name
        last_name
        email
      }
      reviewed_by {
        id
        first_name
        last_name
      }
    }
    pagination {
      total_items
      total_pages
      current_page
      page_size
    }
  }
}
    `;

/**
 * __useListPlatformShelterClaimRequestsBoQuery__
 *
 * To run a query within a React component, call `useListPlatformShelterClaimRequestsBoQuery` and pass it any options that fit your needs.
 * When your component renders, `useListPlatformShelterClaimRequestsBoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListPlatformShelterClaimRequestsBoQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useListPlatformShelterClaimRequestsBoQuery(baseOptions?: Apollo.QueryHookOptions<ListPlatformShelterClaimRequestsBoQuery, ListPlatformShelterClaimRequestsBoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListPlatformShelterClaimRequestsBoQuery, ListPlatformShelterClaimRequestsBoQueryVariables>(ListPlatformShelterClaimRequestsBoDocument, options);
      }
export function useListPlatformShelterClaimRequestsBoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListPlatformShelterClaimRequestsBoQuery, ListPlatformShelterClaimRequestsBoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListPlatformShelterClaimRequestsBoQuery, ListPlatformShelterClaimRequestsBoQueryVariables>(ListPlatformShelterClaimRequestsBoDocument, options);
        }
export function useListPlatformShelterClaimRequestsBoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListPlatformShelterClaimRequestsBoQuery, ListPlatformShelterClaimRequestsBoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListPlatformShelterClaimRequestsBoQuery, ListPlatformShelterClaimRequestsBoQueryVariables>(ListPlatformShelterClaimRequestsBoDocument, options);
        }
export type ListPlatformShelterClaimRequestsBoQueryHookResult = ReturnType<typeof useListPlatformShelterClaimRequestsBoQuery>;
export type ListPlatformShelterClaimRequestsBoLazyQueryHookResult = ReturnType<typeof useListPlatformShelterClaimRequestsBoLazyQuery>;
export type ListPlatformShelterClaimRequestsBoSuspenseQueryHookResult = ReturnType<typeof useListPlatformShelterClaimRequestsBoSuspenseQuery>;
export type ListPlatformShelterClaimRequestsBoQueryResult = Apollo.QueryResult<ListPlatformShelterClaimRequestsBoQuery, ListPlatformShelterClaimRequestsBoQueryVariables>;
export const ApproveShelterClaimBoDocument = gql`
    mutation approveShelterClaimBO($id: ID!, $decision_note: String) {
  approveShelterClaim(id: $id, decision_note: $decision_note) {
    success
    error {
      code
      message
    }
    shelter_claim_request {
      id
      status
    }
  }
}
    `;
export type ApproveShelterClaimBoMutationFn = Apollo.MutationFunction<ApproveShelterClaimBoMutation, ApproveShelterClaimBoMutationVariables>;

/**
 * __useApproveShelterClaimBoMutation__
 *
 * To run a mutation, you first call `useApproveShelterClaimBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveShelterClaimBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveShelterClaimBoMutation, { data, loading, error }] = useApproveShelterClaimBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      decision_note: // value for 'decision_note'
 *   },
 * });
 */
export function useApproveShelterClaimBoMutation(baseOptions?: Apollo.MutationHookOptions<ApproveShelterClaimBoMutation, ApproveShelterClaimBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveShelterClaimBoMutation, ApproveShelterClaimBoMutationVariables>(ApproveShelterClaimBoDocument, options);
      }
export type ApproveShelterClaimBoMutationHookResult = ReturnType<typeof useApproveShelterClaimBoMutation>;
export type ApproveShelterClaimBoMutationResult = Apollo.MutationResult<ApproveShelterClaimBoMutation>;
export type ApproveShelterClaimBoMutationOptions = Apollo.BaseMutationOptions<ApproveShelterClaimBoMutation, ApproveShelterClaimBoMutationVariables>;
export const RejectShelterClaimBoDocument = gql`
    mutation rejectShelterClaimBO($id: ID!, $decision_note: String) {
  rejectShelterClaim(id: $id, decision_note: $decision_note) {
    success
    error {
      code
      message
    }
    shelter_claim_request {
      id
      status
    }
  }
}
    `;
export type RejectShelterClaimBoMutationFn = Apollo.MutationFunction<RejectShelterClaimBoMutation, RejectShelterClaimBoMutationVariables>;

/**
 * __useRejectShelterClaimBoMutation__
 *
 * To run a mutation, you first call `useRejectShelterClaimBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectShelterClaimBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectShelterClaimBoMutation, { data, loading, error }] = useRejectShelterClaimBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      decision_note: // value for 'decision_note'
 *   },
 * });
 */
export function useRejectShelterClaimBoMutation(baseOptions?: Apollo.MutationHookOptions<RejectShelterClaimBoMutation, RejectShelterClaimBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectShelterClaimBoMutation, RejectShelterClaimBoMutationVariables>(RejectShelterClaimBoDocument, options);
      }
export type RejectShelterClaimBoMutationHookResult = ReturnType<typeof useRejectShelterClaimBoMutation>;
export type RejectShelterClaimBoMutationResult = Apollo.MutationResult<RejectShelterClaimBoMutation>;
export type RejectShelterClaimBoMutationOptions = Apollo.BaseMutationOptions<RejectShelterClaimBoMutation, RejectShelterClaimBoMutationVariables>;
export const RequestShelterClaimDocumentChangeBoDocument = gql`
    mutation requestShelterClaimDocumentChangeBO($id: ID!, $document_id: String!, $note: String) {
  requestShelterClaimDocumentChange(
    id: $id
    document_id: $document_id
    note: $note
  ) {
    success
    error {
      code
      message
    }
    shelter_claim_request {
      id
      status
      proof_data
    }
  }
}
    `;
export type RequestShelterClaimDocumentChangeBoMutationFn = Apollo.MutationFunction<RequestShelterClaimDocumentChangeBoMutation, RequestShelterClaimDocumentChangeBoMutationVariables>;

/**
 * __useRequestShelterClaimDocumentChangeBoMutation__
 *
 * To run a mutation, you first call `useRequestShelterClaimDocumentChangeBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestShelterClaimDocumentChangeBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestShelterClaimDocumentChangeBoMutation, { data, loading, error }] = useRequestShelterClaimDocumentChangeBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      document_id: // value for 'document_id'
 *      note: // value for 'note'
 *   },
 * });
 */
export function useRequestShelterClaimDocumentChangeBoMutation(baseOptions?: Apollo.MutationHookOptions<RequestShelterClaimDocumentChangeBoMutation, RequestShelterClaimDocumentChangeBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestShelterClaimDocumentChangeBoMutation, RequestShelterClaimDocumentChangeBoMutationVariables>(RequestShelterClaimDocumentChangeBoDocument, options);
      }
export type RequestShelterClaimDocumentChangeBoMutationHookResult = ReturnType<typeof useRequestShelterClaimDocumentChangeBoMutation>;
export type RequestShelterClaimDocumentChangeBoMutationResult = Apollo.MutationResult<RequestShelterClaimDocumentChangeBoMutation>;
export type RequestShelterClaimDocumentChangeBoMutationOptions = Apollo.BaseMutationOptions<RequestShelterClaimDocumentChangeBoMutation, RequestShelterClaimDocumentChangeBoMutationVariables>;