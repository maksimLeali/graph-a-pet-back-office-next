import * as Types from '../../types';

import { gql } from '@apollo/client';
export type FullPetFragment = { __typename?: 'Pet', id: string, name: string, birthday?: string | null, neutered?: boolean | null, gender?: Types.Gender | null, weight_kg?: number | null, diet?: Array<string | null> | null, chip_code?: string | null, intollerance?: Array<string | null> | null, temperament?: string | null, disciplines?: Array<string | null> | null, breed?: string | null, coat_length?: Types.CoatLength | null, years?: number | null, ownerships?: { __typename?: 'PaginatedOwnerships', items: Array<{ __typename?: 'Ownership', id: string, user: { __typename?: 'User', first_name: string, last_name: string, id: string, email: string } } | null> } | null };

export const FullPetFragmentDoc = gql`
    fragment FullPet on Pet {
  id
  name
  birthday
  neutered
  gender
  weight_kg
  diet
  chip_code
  intollerance
  temperament
  disciplines
  breed
  coat_length
  years
  ownerships(
    commonSearch: {filters: {fixed: [{key: "custody_level", value: "OWNER"}]}}
  ) {
    items {
      id
      user {
        first_name
        last_name
        id
        email
      }
    }
  }
}
    `;