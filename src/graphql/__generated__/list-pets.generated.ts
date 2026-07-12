import * as Types from '../../types';

import { gql } from '@apollo/client';
export type SimplePetFragment = { __typename?: 'Pet', id: string, name: string, weight_kg?: number | null, birthday?: string | null, neutered?: boolean | null, chip_code?: string | null, gender?: Types.Gender | null, breed?: string | null, years?: number | null };

export const SimplePetFragmentDoc = gql`
    fragment SimplePet on Pet {
  id
  name
  weight_kg
  birthday
  neutered
  chip_code
  gender
  breed
  years
}
    `;