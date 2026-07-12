import * as Types from '../../types';

import { gql } from '@apollo/client';
export type FullUserFragment = { __typename?: 'User', id: string, email: string, last_name: string, first_name: string, role: Types.UserRole, created_at: string, profile_picture?: { __typename?: 'Media', type: string, id: string } | null };

export const FullUserFragmentDoc = gql`
    fragment FullUser on User {
  id
  email
  last_name
  first_name
  role
  created_at
  profile_picture {
    type
    id
  }
}
    `;