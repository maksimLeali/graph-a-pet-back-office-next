import * as Types from '../../types';

import { gql } from '@apollo/client';
export type UserTreatmentFragment = { __typename?: 'Treatment', id: string, date: string, name: string, type: Types.TreatmentType, created_at: string, booster?: { __typename?: 'Treatment', name: string, date: string, id: string } | null, health_card?: { __typename?: 'HealthCard', pet: { __typename?: 'Pet', id: string, name: string } } | null };

export const UserTreatmentFragmentDoc = gql`
    fragment UserTreatment on Treatment {
  id
  date
  name
  type
  created_at
  booster {
    name
    date
    id
  }
  health_card {
    pet {
      id
      name
    }
  }
}
    `;