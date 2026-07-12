import * as Types from '../../types';

import { gql } from '@apollo/client';
export type PetTreatmentFragment = { __typename?: 'Treatment', id: string, date: string, created_at: string, name: string, type: Types.TreatmentType, booster?: { __typename?: 'Treatment', name: string, date: string, id: string } | null };

export const PetTreatmentFragmentDoc = gql`
    fragment PetTreatment on Treatment {
  id
  date
  created_at
  name
  type
  booster {
    name
    date
    id
  }
}
    `;