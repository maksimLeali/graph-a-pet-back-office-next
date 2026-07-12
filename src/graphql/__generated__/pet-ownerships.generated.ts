import * as Types from '../../types';

import { gql } from '@apollo/client';
export type PetOwnershipsFragment = { __typename?: 'PaginatedOwnerships', success?: boolean | null, items: Array<{ __typename?: 'Ownership', id: string, custody_level: Types.CustodyLevel, user: { __typename?: 'User', first_name: string, last_name: string, email: string, id: string } } | null>, pagination: { __typename?: 'Pagination', current_page?: number | null, page_size?: number | null, total_items?: number | null, total_pages?: number | null } };

export const PetOwnershipsFragmentDoc = gql`
    fragment PetOwnerships on PaginatedOwnerships {
  items {
    id
    custody_level
    user {
      first_name
      last_name
      email
      id
    }
  }
  success
  pagination {
    current_page
    page_size
    total_items
    total_pages
  }
}
    `;