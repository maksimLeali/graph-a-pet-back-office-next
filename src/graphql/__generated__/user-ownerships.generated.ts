import * as Types from '../../types';

import { gql } from '@apollo/client';
export type UserOwnershipsFragment = { __typename?: 'PaginatedOwnerships', success?: boolean | null, items: Array<{ __typename?: 'Ownership', id: string, custody_level: Types.CustodyLevel, pet: { __typename?: 'Pet', birthday?: string | null, chip_code?: string | null, diet?: Array<string | null> | null, disciplines?: Array<string | null> | null, gender?: Types.Gender | null, id: string, intollerance?: Array<string | null> | null, name: string, neutered?: boolean | null, temperament?: string | null, weight_kg?: number | null } } | null>, pagination: { __typename?: 'Pagination', current_page?: number | null, page_size?: number | null, total_items?: number | null, total_pages?: number | null } };

export const UserOwnershipsFragmentDoc = gql`
    fragment UserOwnerships on PaginatedOwnerships {
  items {
    id
    custody_level
    pet {
      birthday
      chip_code
      diet
      disciplines
      gender
      id
      intollerance
      name
      neutered
      temperament
      weight_kg
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