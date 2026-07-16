import * as Types from '../../types';

import { gql } from '@apollo/client';
export type ListUserFragment = { __typename?: 'User', id: string, email: string, last_name: string, first_name: string, role: Types.UserRole, verified: boolean, created_at: string, pets_owned: number, pets_on_loan: number };

export const ListUserFragmentDoc = gql`
    fragment ListUser on User {
  id
  email
  last_name
  first_name
  role
  verified
  created_at
  pets_owned
  pets_on_loan
}
    `;