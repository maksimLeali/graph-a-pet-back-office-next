import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export enum AreaType {
  Common = 'COMMON',
  Kennel = 'KENNEL',
  Medical = 'MEDICAL',
  Office = 'OFFICE',
  Other = 'OTHER',
  Outdoor = 'OUTDOOR',
  Playground = 'PLAYGROUND',
  Quarantine = 'QUARANTINE',
  Storage = 'STORAGE'
}

export enum BoxStatus {
  Available = 'AVAILABLE',
  Full = 'FULL',
  NeedsCleaning = 'NEEDS_CLEANING',
  Occupied = 'OCCUPIED',
  OutOfService = 'OUT_OF_SERVICE'
}

export type ChangeShelterInput = {
  pet_id: Scalars['ID']['input'];
  shelter_id_from: Scalars['ID']['input'];
  shelter_id_to: Scalars['ID']['input'];
};

export enum CoatLength {
  Hairless = 'HAIRLESS',
  Long = 'LONG',
  Medium = 'MEDIUM',
  Short = 'SHORT'
}

export type Code = {
  __typename?: 'Code';
  code: Scalars['String']['output'];
  created_at: Scalars['String']['output'];
  created_by: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  ref_id: Scalars['ID']['output'];
  ref_table: Scalars['String']['output'];
  scope: Scalars['String']['output'];
  valid: Scalars['Boolean']['output'];
};

export type CodeCreate = {
  code: Scalars['String']['input'];
  ref_id: Scalars['String']['input'];
  ref_table: Scalars['String']['input'];
};

export type CodeResult = {
  __typename?: 'CodeResult';
  code?: Maybe<Code>;
  error?: Maybe<Error>;
  success: Scalars['Boolean']['output'];
};

export type CodeValidationResult = {
  __typename?: 'CodeValidationResult';
  code?: Maybe<Code>;
  error?: Maybe<Error>;
  is_valid?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CommonSearch = {
  filters?: InputMaybe<DeepFilters>;
  order_by?: InputMaybe<Scalars['String']['input']>;
  order_direction?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  page_size?: InputMaybe<Scalars['Int']['input']>;
};

export type Coordinates = {
  __typename?: 'Coordinates';
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
};

export type CreatePersonalWorkspaceInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  contacts?: InputMaybe<Array<InputMaybe<ShelterContactInput>>>;
  district?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  postal_code?: InputMaybe<Scalars['String']['input']>;
  province_code?: InputMaybe<Scalars['String']['input']>;
  region?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  street_number?: InputMaybe<Scalars['String']['input']>;
};

export type CreateShelterPersonInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  shelter_id: Scalars['ID']['input'];
  source?: InputMaybe<ShelterPersonSource>;
  status?: InputMaybe<ShelterPersonStatus>;
  user_id?: InputMaybe<Scalars['ID']['input']>;
};

export type Cure = {
  __typename?: 'Cure';
  created_at: Scalars['String']['output'];
  date: Scalars['String']['output'];
  frequency_times?: Maybe<Scalars['Int']['output']>;
  frequency_unit?: Maybe<FrequencyUnit>;
  frequency_value?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  treatment: MinTreatment;
};

export type CureCreate = {
  date: Scalars['String']['input'];
  frequency_times?: InputMaybe<Scalars['Int']['input']>;
  frequency_unit?: InputMaybe<FrequencyUnit>;
  frequency_value?: InputMaybe<Scalars['Int']['input']>;
  health_card_id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  notes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CureResult = {
  __typename?: 'CureResult';
  cure?: Maybe<Cure>;
  error?: Maybe<Error>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type CureUpdate = {
  date?: InputMaybe<Scalars['String']['input']>;
  frequency_times?: InputMaybe<Scalars['Int']['input']>;
  frequency_unit?: InputMaybe<FrequencyUnit>;
  frequency_value?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export enum CustodyLevel {
  Owner = 'OWNER',
  PetSitter = 'PET_SITTER',
  SubOwner = 'SUB_OWNER'
}

export type DailyStats = {
  __typename?: 'DailyStats';
  active_users: Scalars['Int']['output'];
  active_users_percent: Scalars['Float']['output'];
  all_pets: Scalars['Int']['output'];
  all_reports: Scalars['Int']['output'];
  all_users: Scalars['Int']['output'];
  daily_reports: Scalars['Int']['output'];
};

export type DamnatioMemoriae = {
  __typename?: 'DamnatioMemoriae';
  created_at: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  original_data?: Maybe<Scalars['JSON']['output']>;
  original_table: Scalars['String']['output'];
};

export type DamnatioMemoriaeResult = {
  __typename?: 'DamnatioMemoriaeResult';
  DamnatioMemoriae?: Maybe<DamnatioMemoriae>;
  error?: Maybe<Error>;
  success: Scalars['Boolean']['output'];
};

export type Dashboard = {
  __typename?: 'Dashboard';
  active_users: Scalars['Int']['output'];
  active_users_mean: Scalars['Int']['output'];
  active_users_percent: Scalars['Float']['output'];
  active_users_percent_stats: Array<Scalars['Float']['output']>;
  active_users_stats: Array<Scalars['Int']['output']>;
  all_pet_stats: Array<Scalars['Int']['output']>;
  all_pets: Scalars['Int']['output'];
  all_users: Scalars['Int']['output'];
  all_users_stats: Array<Scalars['Int']['output']>;
  labels: Array<Scalars['String']['output']>;
};

export type DashboardResult = {
  __typename?: 'DashboardResult';
  dashboard?: Maybe<Dashboard>;
  error?: Maybe<Error>;
  success: Scalars['Boolean']['output'];
};

export type DeepFilters = {
  and?: InputMaybe<DeepFilters>;
  fixed?: InputMaybe<Array<InputMaybe<FixedFilter>>>;
  join?: InputMaybe<Array<InputMaybe<Join>>>;
  lists?: InputMaybe<Array<InputMaybe<ListFilter>>>;
  not?: InputMaybe<DeepFilters>;
  or?: InputMaybe<DeepFilters>;
  ranges?: InputMaybe<Array<InputMaybe<RangeFilter>>>;
  search?: InputMaybe<SearchFilter>;
};

export type DefaultResult = {
  __typename?: 'DefaultResult';
  error?: Maybe<Error>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteResult = {
  __typename?: 'DeleteResult';
  error?: Maybe<Error>;
  id?: Maybe<Scalars['ID']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type Error = {
  __typename?: 'Error';
  code: Scalars['String']['output'];
  errorCode?: Maybe<Scalars['String']['output']>;
  extra?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

export type Filters = {
  fixed?: InputMaybe<Array<InputMaybe<FixedFilter>>>;
  join?: InputMaybe<Array<InputMaybe<Join>>>;
  lists?: InputMaybe<Array<InputMaybe<ListFilter>>>;
  ranges?: InputMaybe<Array<InputMaybe<RangeFilter>>>;
  search?: InputMaybe<Array<InputMaybe<SearchFilter>>>;
};

export type FixedFilter = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export enum FrequencyUnit {
  Daily = 'DAILY',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY',
  Yearly = 'YEARLY'
}

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  NotSaid = 'NOT_SAID'
}

export type GenericResult = {
  __typename?: 'GenericResult';
  error?: Maybe<Error>;
  success: Scalars['Boolean']['output'];
};

export type HealthCard = {
  __typename?: 'HealthCard';
  id: Scalars['ID']['output'];
  notes: Array<Maybe<Scalars['String']['output']>>;
  pet: Pet;
  treatments: PaginatedTreatments;
};


export type HealthCardTreatmentsArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};

export type HealthCardCreate = {
  pet_id: Scalars['ID']['input'];
};

export type HealthCardResult = {
  __typename?: 'HealthCardResult';
  error?: Maybe<Error>;
  health_card?: Maybe<HealthCard>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type HealthCardUpdate = {
  notes: Array<InputMaybe<Scalars['String']['input']>>;
};

export enum InventoryCategory {
  Equipment = 'EQUIPMENT',
  FoodDry = 'FOOD_DRY',
  FoodWet = 'FOOD_WET',
  Hygiene = 'HYGIENE',
  Medicine = 'MEDICINE',
  Other = 'OTHER'
}

/** just see */
export type Join = {
  key: Scalars['String']['input'];
  value: DeepFilters;
};

export type ListFilter = {
  key?: InputMaybe<Scalars['String']['input']>;
  value: Array<InputMaybe<Scalars['String']['input']>>;
};

export type MainColor = {
  __typename?: 'MainColor';
  color: Scalars['String']['output'];
  contrast: Scalars['String']['output'];
};

export type MainColorCreate = {
  color: Scalars['String']['input'];
  contrast?: InputMaybe<Scalars['String']['input']>;
};

export enum MapElementType {
  Bench = 'BENCH',
  Door = 'DOOR',
  FeedingPoint = 'FEEDING_POINT',
  Gate = 'GATE',
  Other = 'OTHER',
  Tree = 'TREE',
  Wall = 'WALL',
  WaterPoint = 'WATER_POINT'
}

export enum MapUnit {
  Meters = 'METERS',
  Pixels = 'PIXELS'
}

export type Media = {
  __typename?: 'Media';
  id: Scalars['ID']['output'];
  main_color?: Maybe<MainColor>;
  main_colors?: Maybe<Array<MainColor>>;
  ref_id: Scalars['String']['output'];
  scope: Scalars['String']['output'];
  type: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type MediaCreate = {
  main_color?: InputMaybe<MainColorCreate>;
  main_colors?: InputMaybe<Array<InputMaybe<MainColorCreate>>>;
  ref_id: Scalars['String']['input'];
  scope: Scalars['String']['input'];
  type: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type MediaResult = {
  __typename?: 'MediaResult';
  error?: Maybe<Error>;
  media?: Maybe<Media>;
  success: Scalars['Boolean']['output'];
};

export type MediaUpdate = {
  main_color?: InputMaybe<MainColorCreate>;
  main_colors?: InputMaybe<Array<InputMaybe<MainColorCreate>>>;
  ref_id?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type MinTreatment = {
  __typename?: 'MinTreatment';
  date: Scalars['String']['output'];
  duration?: Maybe<TreatmentDuration>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: TreatmentType;
};

export enum MovementType {
  Adjustment = 'ADJUSTMENT',
  Consumption = 'CONSUMPTION',
  Donation = 'DONATION',
  Restock = 'RESTOCK',
  Waste = 'WASTE'
}

export type Mutation = {
  __typename?: 'Mutation';
  acceptPetOwnershipInvite: OwnershipResult;
  acceptShelterInvite: ShelterInviteResult;
  acceptShelterOwnershipTransfer: ShelterOwnershipTransferResult;
  addPet: PetResult;
  addPetToMe: PetAddedResult;
  addPetToUser: PetAddedResult;
  approveShelterClaim: ShelterClaimRequestResult;
  archiveShelterInventoryItem: ShelterInventoryItemResult;
  archiveShelterPerson: ShelterPersonResult;
  assignPetToBox: ShelterBoxOccupancyResult;
  cancelShelterClaim: ShelterClaimRequestResult;
  cancelShelterOwnershipTransfer: ShelterOwnershipTransferResult;
  cancelShelterWalk: ShelterWalkResult;
  changeShelter: ShelterPetResult;
  checkCode: CodeValidationResult;
  completeShelterTask: ShelterTaskResult;
  completeShelterWalk: ShelterWalkResult;
  createCode: CodeResult;
  createCure: CureResult;
  createHealthCard: HealthCardResult;
  createMedia: MediaResult;
  createPersonalWorkspace: ShelterResult;
  createPet: PetResult;
  createPetWeight: PetWeightResult;
  createReport: ReportResult;
  createShelter: ShelterResult;
  createShelterArea: ShelterAreaResult;
  createShelterBox: ShelterBoxResult;
  createShelterInventoryItem: ShelterInventoryItemResult;
  createShelterInventoryMovement: ShelterInventoryMovementResult;
  createShelterInvite: ShelterInviteResult;
  createShelterMap: ShelterMapResult;
  createShelterMapElement: ShelterMapElementResult;
  createShelterPerson: ShelterPersonResult;
  createShelterPet: ShelterPetResult;
  createShelterPets: ShelterPetsResult;
  createShelterPetsWithData: ShelterPetsResult;
  createShelterRole: ShelterRoleResult;
  createShelterTask: ShelterTaskResult;
  createShelterWalk: ShelterWalkResult;
  createShelterWalkRating: ShelterWalkRatingResult;
  createShelterZone: ShelterZoneResult;
  createTreatment: TreatmentResult;
  createUser: UserResult;
  createWalk: WalkResult;
  createWalkRating: WalkRatingResult;
  deleteCure: DeleteResult;
  deleteOwnership: DeleteResult;
  deletePet: DeleteResult;
  deleteShelter: DeleteResult;
  deleteShelterArea: DeleteResult;
  deleteShelterBox: DeleteResult;
  deleteShelterInventoryItem: DeleteResult;
  deleteShelterMap: DeleteResult;
  deleteShelterMapElement: DeleteResult;
  deleteShelterPet: DeleteResult;
  deleteShelterRole: DeleteResult;
  deleteShelterTask: DeleteResult;
  deleteShelterWalk: DeleteResult;
  deleteShelterZone: DeleteResult;
  deleteTreatment: DeleteResult;
  deleteUser: DeleteResult;
  deleteWalk: DeleteResult;
  deleteWalkRating: DeleteResult;
  dismissNotification: NotificationResult;
  invitePetOwnership: OwnershipResult;
  linkPetToMe: OwnershipResult;
  linkPetToUser: OwnershipResult;
  linkShelterPersonToUser: ShelterPersonResult;
  login: NewTokenResult;
  logout: Scalars['Boolean']['output'];
  markAllNotificationsAsRead: NotificationResult;
  markBoxCleaned: ShelterBoxResult;
  markNotificationAsRead: NotificationResult;
  movePetBetweenBoxes: ShelterBoxOccupancyResult;
  refreshToken: NewTokenResult;
  rejectPetOwnershipInvite: OwnershipResult;
  rejectShelterClaim: ShelterClaimRequestResult;
  rejectShelterInvite: ShelterInviteResult;
  rejectShelterOwnershipTransfer: ShelterOwnershipTransferResult;
  releasePetFromBox: ShelterBoxOccupancyResult;
  requestShelterClaim: ShelterClaimRequestResult;
  requestShelterOwnershipTransfer: ShelterOwnershipTransferResult;
  resendCode: GenericResult;
  respondToReport: ReportResult;
  restoreMemoriae: RestoredResult;
  saveShelterMapLayout: ShelterMapResult;
  setBoxOutOfService: ShelterBoxResult;
  setShelterWalkManualDuration: ShelterWalkResult;
  signUp: UserResult;
  skipShelterTask: ShelterTaskResult;
  startShelterWalk: ShelterWalkResult;
  updateCure: CureResult;
  updateHealthCard: HealthCardResult;
  updateMe: UserResult;
  updateMedia: MediaResult;
  updateOwnership: OwnershipResult;
  updatePet: PetResult;
  updateReport: ReportResult;
  updateShelter: ShelterResult;
  updateShelterArea: ShelterAreaResult;
  updateShelterBox: ShelterBoxResult;
  updateShelterInventoryItem: ShelterInventoryItemResult;
  updateShelterMap: ShelterMapResult;
  updateShelterMapElement: ShelterMapElementResult;
  updateShelterPerson: ShelterPersonResult;
  updateShelterRole: ShelterRoleResult;
  updateShelterTask: ShelterTaskResult;
  updateShelterWalk: ShelterWalkResult;
  updateShelterZone: ShelterZoneResult;
  updateTreatment: TreatmentResult;
  updateUser: UserResult;
  updateWalk: WalkResult;
  updateWalkRating: WalkRatingResult;
  verifyUser: NewTokenResult;
};


export type MutationAcceptPetOwnershipInviteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAcceptShelterInviteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAcceptShelterOwnershipTransferArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAddPetArgs = {
  pet: PetCreate;
};


export type MutationAddPetToMeArgs = {
  custodyLevel?: InputMaybe<CustodyLevel>;
  pet: PetCreate;
};


export type MutationAddPetToUserArgs = {
  custodyLevel?: InputMaybe<CustodyLevel>;
  pet: PetCreate;
  userId: Scalars['String']['input'];
};


export type MutationApproveShelterClaimArgs = {
  decision_note?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};


export type MutationArchiveShelterInventoryItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationArchiveShelterPersonArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAssignPetToBoxArgs = {
  box_id: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
  shelter_pet_id: Scalars['ID']['input'];
};


export type MutationCancelShelterClaimArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCancelShelterOwnershipTransferArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCancelShelterWalkArgs = {
  id: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
};


export type MutationChangeShelterArgs = {
  data: ChangeShelterInput;
};


export type MutationCheckCodeArgs = {
  code: Scalars['String']['input'];
};


export type MutationCompleteShelterTaskArgs = {
  id: Scalars['ID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCompleteShelterWalkArgs = {
  id: Scalars['ID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateCodeArgs = {
  data: CodeCreate;
};


export type MutationCreateCureArgs = {
  data: CureCreate;
};


export type MutationCreateHealthCardArgs = {
  data: HealthCardCreate;
};


export type MutationCreateMediaArgs = {
  data: MediaCreate;
};


export type MutationCreatePersonalWorkspaceArgs = {
  data: CreatePersonalWorkspaceInput;
};


export type MutationCreatePetArgs = {
  data: PetCreate;
};


export type MutationCreatePetWeightArgs = {
  data: PetWeightCreate;
};


export type MutationCreateReportArgs = {
  data: ReportCreate;
};


export type MutationCreateShelterArgs = {
  data: ShelterCreate;
};


export type MutationCreateShelterAreaArgs = {
  data: ShelterAreaCreate;
};


export type MutationCreateShelterBoxArgs = {
  data: ShelterBoxCreate;
};


export type MutationCreateShelterInventoryItemArgs = {
  data: ShelterInventoryItemCreate;
};


export type MutationCreateShelterInventoryMovementArgs = {
  data: ShelterInventoryMovementCreate;
};


export type MutationCreateShelterInviteArgs = {
  data: ShelterInviteCreate;
};


export type MutationCreateShelterMapArgs = {
  data: ShelterMapCreate;
};


export type MutationCreateShelterMapElementArgs = {
  data: ShelterMapElementCreate;
};


export type MutationCreateShelterPersonArgs = {
  data: CreateShelterPersonInput;
};


export type MutationCreateShelterPetArgs = {
  data: ShelterPetCreate;
};


export type MutationCreateShelterPetsArgs = {
  data: ShelterPetsCreate;
};


export type MutationCreateShelterPetsWithDataArgs = {
  data: ShelterPetsWithDataCreate;
};


export type MutationCreateShelterRoleArgs = {
  data: ShelterRoleCreate;
};


export type MutationCreateShelterTaskArgs = {
  data: ShelterTaskCreate;
};


export type MutationCreateShelterWalkArgs = {
  data: ShelterWalkCreate;
};


export type MutationCreateShelterWalkRatingArgs = {
  data: ShelterWalkRatingCreate;
};


export type MutationCreateShelterZoneArgs = {
  data: ShelterZoneCreate;
};


export type MutationCreateTreatmentArgs = {
  data: TreatmentCreate;
};


export type MutationCreateUserArgs = {
  data: UserCreate;
};


export type MutationCreateWalkArgs = {
  data: WalkCreate;
};


export type MutationCreateWalkRatingArgs = {
  data: WalkRatingCreate;
};


export type MutationDeleteCureArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteOwnershipArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePetArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteShelterArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteShelterAreaArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteShelterBoxArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteShelterInventoryItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteShelterMapArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteShelterMapElementArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteShelterPetArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteShelterRoleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteShelterTaskArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteShelterWalkArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteShelterZoneArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTreatmentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteWalkArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteWalkRatingArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDismissNotificationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationInvitePetOwnershipArgs = {
  custodyLevel: CustodyLevel;
  petId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationLinkPetToMeArgs = {
  custodyLevel?: InputMaybe<CustodyLevel>;
  petId: Scalars['ID']['input'];
};


export type MutationLinkPetToUserArgs = {
  custodyLevel?: InputMaybe<CustodyLevel>;
  petId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationLinkShelterPersonToUserArgs = {
  person_id: Scalars['ID']['input'];
  user_id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationMarkBoxCleanedArgs = {
  box_id: Scalars['ID']['input'];
};


export type MutationMarkNotificationAsReadArgs = {
  id: Scalars['ID']['input'];
};


export type MutationMovePetBetweenBoxesArgs = {
  reason?: InputMaybe<Scalars['String']['input']>;
  shelter_pet_id: Scalars['ID']['input'];
  to_box_id: Scalars['ID']['input'];
};


export type MutationRejectPetOwnershipInviteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRejectShelterClaimArgs = {
  decision_note?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};


export type MutationRejectShelterInviteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRejectShelterOwnershipTransferArgs = {
  id: Scalars['ID']['input'];
};


export type MutationReleasePetFromBoxArgs = {
  occupancy_id: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRequestShelterClaimArgs = {
  data: ShelterClaimInput;
  shelter_id: Scalars['ID']['input'];
};


export type MutationRequestShelterOwnershipTransferArgs = {
  new_role_for_previous_owner?: InputMaybe<RoleLevel>;
  shelter_id: Scalars['ID']['input'];
  to_user_id: Scalars['ID']['input'];
};


export type MutationResendCodeArgs = {
  email: Scalars['String']['input'];
};


export type MutationRespondToReportArgs = {
  id: Scalars['ID']['input'];
  reporter: ReporterCreate;
};


export type MutationRestoreMemoriaeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSaveShelterMapLayoutArgs = {
  data: ShelterMapLayoutInput;
  map_id: Scalars['ID']['input'];
};


export type MutationSetBoxOutOfServiceArgs = {
  box_id: Scalars['ID']['input'];
  out_of_service: Scalars['Boolean']['input'];
};


export type MutationSetShelterWalkManualDurationArgs = {
  duration_minutes: Scalars['Int']['input'];
  id: Scalars['ID']['input'];
};


export type MutationSignUpArgs = {
  data: UserCreate;
};


export type MutationSkipShelterTaskArgs = {
  id: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
};


export type MutationStartShelterWalkArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateCureArgs = {
  data: CureUpdate;
  id: Scalars['ID']['input'];
};


export type MutationUpdateHealthCardArgs = {
  data: HealthCardUpdate;
  id: Scalars['ID']['input'];
};


export type MutationUpdateMeArgs = {
  data: UserUpdate;
};


export type MutationUpdateMediaArgs = {
  data: MediaUpdate;
  id: Scalars['ID']['input'];
};


export type MutationUpdateOwnershipArgs = {
  data: OwnershipUpdate;
  id: Scalars['ID']['input'];
};


export type MutationUpdatePetArgs = {
  data: PetUpdate;
  id: Scalars['ID']['input'];
};


export type MutationUpdateReportArgs = {
  data: ReportUpdate;
  id: Scalars['ID']['input'];
};


export type MutationUpdateShelterArgs = {
  data: ShelterUpdate;
  id: Scalars['ID']['input'];
};


export type MutationUpdateShelterAreaArgs = {
  data: ShelterAreaUpdate;
  id: Scalars['ID']['input'];
};


export type MutationUpdateShelterBoxArgs = {
  data: ShelterBoxUpdate;
  id: Scalars['ID']['input'];
};


export type MutationUpdateShelterInventoryItemArgs = {
  data: ShelterInventoryItemUpdate;
  id: Scalars['ID']['input'];
};


export type MutationUpdateShelterMapArgs = {
  data: ShelterMapUpdate;
  id: Scalars['ID']['input'];
};


export type MutationUpdateShelterMapElementArgs = {
  data: ShelterMapElementUpdate;
  id: Scalars['ID']['input'];
};


export type MutationUpdateShelterPersonArgs = {
  data: UpdateShelterPersonInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateShelterRoleArgs = {
  data: ShelterRoleUpdate;
  id: Scalars['ID']['input'];
};


export type MutationUpdateShelterTaskArgs = {
  data: ShelterTaskUpdate;
  id: Scalars['ID']['input'];
};


export type MutationUpdateShelterWalkArgs = {
  data: ShelterWalkUpdate;
  id: Scalars['ID']['input'];
};


export type MutationUpdateShelterZoneArgs = {
  data: ShelterZoneUpdate;
  id: Scalars['ID']['input'];
};


export type MutationUpdateTreatmentArgs = {
  data: TreatmentUpdate;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUserArgs = {
  data: UserUpdate;
  id: Scalars['ID']['input'];
};


export type MutationUpdateWalkArgs = {
  data: WalkUpdate;
  id: Scalars['ID']['input'];
};


export type MutationUpdateWalkRatingArgs = {
  data: WalkRatingUpdate;
  id: Scalars['ID']['input'];
};


export type MutationVerifyUserArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
};

export type MyShelterDashboard = {
  __typename?: 'MyShelterDashboard';
  in_progress_walk_count: Scalars['Int']['output'];
  inventory_alerts: Array<MyShelterDashboardInventoryAlert>;
  low_stock_count: Scalars['Int']['output'];
  out_of_stock_count: Scalars['Int']['output'];
  overdue_task_count: Scalars['Int']['output'];
  task_count: Scalars['Int']['output'];
  tasks: Array<MyShelterDashboardTask>;
  walk_count: Scalars['Int']['output'];
  walks: Array<MyShelterDashboardWalk>;
};

export type MyShelterDashboardInventoryAlert = {
  __typename?: 'MyShelterDashboardInventoryAlert';
  action_url: Scalars['String']['output'];
  current_quantity: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  minimum_threshold?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  shelter_id: Scalars['ID']['output'];
  shelter_name: Scalars['String']['output'];
  status: ShelterInventoryAlertStatus;
};

export type MyShelterDashboardResult = {
  __typename?: 'MyShelterDashboardResult';
  dashboard?: Maybe<MyShelterDashboard>;
  error?: Maybe<Error>;
  success: Scalars['Boolean']['output'];
};

export type MyShelterDashboardTask = {
  __typename?: 'MyShelterDashboardTask';
  action_url: Scalars['String']['output'];
  area?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  is_overdue: Scalars['Boolean']['output'];
  scheduled_at?: Maybe<Scalars['String']['output']>;
  shelter_id: Scalars['ID']['output'];
  shelter_name: Scalars['String']['output'];
  status: TaskStatus;
  task_type: ShelterTaskType;
};

export type MyShelterDashboardWalk = {
  __typename?: 'MyShelterDashboardWalk';
  action_url: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  pet_name: Scalars['String']['output'];
  scheduled_at?: Maybe<Scalars['String']['output']>;
  shelter_id: Scalars['ID']['output'];
  shelter_name: Scalars['String']['output'];
  status: ShelterWalkStatus;
};

export type NewOwnership = {
  __typename?: 'NewOwnership';
  ownership: Ownership;
  pet: Pet;
};

export type NewTokenResult = {
  __typename?: 'NewTokenResult';
  error?: Maybe<Error>;
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type Notification = {
  __typename?: 'Notification';
  action_url?: Maybe<Scalars['String']['output']>;
  actor_user_id?: Maybe<Scalars['ID']['output']>;
  created_at: Scalars['String']['output'];
  dedupe_key?: Maybe<Scalars['String']['output']>;
  dismissed_at?: Maybe<Scalars['String']['output']>;
  entity_id?: Maybe<Scalars['ID']['output']>;
  entity_type?: Maybe<NotificationEntityType>;
  expires_at?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  message?: Maybe<Scalars['String']['output']>;
  payload?: Maybe<Scalars['JSON']['output']>;
  pet_id?: Maybe<Scalars['ID']['output']>;
  priority: NotificationPriority;
  read_at?: Maybe<Scalars['String']['output']>;
  scheduled_at?: Maybe<Scalars['String']['output']>;
  shelter_id?: Maybe<Scalars['ID']['output']>;
  status: NotificationStatus;
  title: Scalars['String']['output'];
  type: NotificationType;
  updated_at?: Maybe<Scalars['String']['output']>;
  user_id: Scalars['ID']['output'];
};

export enum NotificationEntityType {
  Ownership = 'OWNERSHIP',
  Pet = 'PET',
  Shelter = 'SHELTER',
  ShelterInvite = 'SHELTER_INVITE',
  ShelterJoinRequest = 'SHELTER_JOIN_REQUEST',
  ShelterOwnershipTransfer = 'SHELTER_OWNERSHIP_TRANSFER',
  ShelterTask = 'SHELTER_TASK',
  Treatment = 'TREATMENT'
}

export enum NotificationPriority {
  High = 'HIGH',
  Low = 'LOW',
  Normal = 'NORMAL',
  Urgent = 'URGENT'
}

export type NotificationResult = {
  __typename?: 'NotificationResult';
  error?: Maybe<Error>;
  notification?: Maybe<Notification>;
  success: Scalars['Boolean']['output'];
};

export enum NotificationStatus {
  Dismissed = 'DISMISSED',
  Expired = 'EXPIRED',
  Read = 'READ',
  Unread = 'UNREAD'
}

export enum NotificationType {
  PetBirthday = 'PET_BIRTHDAY',
  PetOwnershipInvite = 'PET_OWNERSHIP_INVITE',
  ShelterInvite = 'SHELTER_INVITE',
  ShelterJoinRequest = 'SHELTER_JOIN_REQUEST',
  ShelterOwnershipTransfer = 'SHELTER_OWNERSHIP_TRANSFER',
  ShelterTaskInstance = 'SHELTER_TASK_INSTANCE',
  TreatmentReminder = 'TREATMENT_REMINDER'
}

export type Ownership = {
  __typename?: 'Ownership';
  custody_level: CustodyLevel;
  id: Scalars['ID']['output'];
  pet: Pet;
  status: OwnershipStatus;
  user: User;
};

export type OwnershipResult = {
  __typename?: 'OwnershipResult';
  error?: Maybe<Error>;
  ownership?: Maybe<Ownership>;
  success: Scalars['Boolean']['output'];
};

export enum OwnershipStatus {
  Accepted = 'ACCEPTED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type OwnershipUpdate = {
  custody_level: CustodyLevel;
};

export type OwnershipsResult = {
  __typename?: 'OwnershipsResult';
  error?: Maybe<Error>;
  ownerships: Array<Maybe<Ownership>>;
  success: Scalars['Boolean']['output'];
};

export type PaginatedBoxOccupancies = {
  __typename?: 'PaginatedBoxOccupancies';
  error?: Maybe<Error>;
  items: Array<Maybe<ShelterBoxOccupancy>>;
  pagination: Pagination;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type PaginatedCodes = {
  __typename?: 'PaginatedCodes';
  error?: Maybe<Error>;
  items: Array<Maybe<Code>>;
  pagination: Pagination;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type PaginatedCures = {
  __typename?: 'PaginatedCures';
  error?: Maybe<Error>;
  items: Array<Maybe<Cure>>;
  pagination: Pagination;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type PaginatedDamnationesMemoriae = {
  __typename?: 'PaginatedDamnationesMemoriae';
  error?: Maybe<Error>;
  items: Array<Maybe<DamnatioMemoriae>>;
  pagination: Pagination;
  success: Scalars['Boolean']['output'];
};

export type PaginatedHealthCards = {
  __typename?: 'PaginatedHealthCards';
  error?: Maybe<Error>;
  items: Array<Maybe<HealthCard>>;
  pagination: Pagination;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type PaginatedInventoryItems = {
  __typename?: 'PaginatedInventoryItems';
  error?: Maybe<Error>;
  items: Array<Maybe<ShelterInventoryItem>>;
  pagination: Pagination;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type PaginatedInventoryMovements = {
  __typename?: 'PaginatedInventoryMovements';
  error?: Maybe<Error>;
  items: Array<Maybe<ShelterInventoryMovement>>;
  pagination: Pagination;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type PaginatedMapElements = {
  __typename?: 'PaginatedMapElements';
  error?: Maybe<Error>;
  items: Array<Maybe<ShelterMapElement>>;
  pagination: Pagination;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type PaginatedMedias = {
  __typename?: 'PaginatedMedias';
  error?: Maybe<Error>;
  items: Array<Maybe<Media>>;
  pagination: Pagination;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type PaginatedNotifications = {
  __typename?: 'PaginatedNotifications';
  error?: Maybe<Error>;
  items: Array<Maybe<Notification>>;
  pagination: Pagination;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type PaginatedOwnerships = {
  __typename?: 'PaginatedOwnerships';
  error?: Maybe<Error>;
  items: Array<Maybe<Ownership>>;
  pagination: Pagination;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type PaginatedPets = {
  __typename?: 'PaginatedPets';
  error?: Maybe<Error>;
  items: Array<Maybe<Pet>>;
  pagination: Pagination;
  success: Scalars['Boolean']['output'];
};

export type PaginatedPublicShelters = {
  __typename?: 'PaginatedPublicShelters';
  error?: Maybe<Error>;
  items: Array<Maybe<PublicShelter>>;
  pagination: Pagination;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type PaginatedReports = {
  __typename?: 'PaginatedReports';
  error?: Maybe<Error>;
  items: Array<Maybe<Report>>;
  pagination: Pagination;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type PaginatedShelterAreas = {
  __typename?: 'PaginatedShelterAreas';
  error?: Maybe<Error>;
  items: Array<Maybe<ShelterArea>>;
  pagination: Pagination;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type PaginatedShelterBoxes = {
  __typename?: 'PaginatedShelterBoxes';
  error?: Maybe<Error>;
  items: Array<Maybe<ShelterBox>>;
  pagination: Pagination;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type PaginatedShelterClaimRequests = {
  __typename?: 'PaginatedShelterClaimRequests';
  error?: Maybe<Error>;
  items: Array<Maybe<ShelterClaimRequest>>;
  pagination: Pagination;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type PaginatedShelterMaps = {
  __typename?: 'PaginatedShelterMaps';
  error?: Maybe<Error>;
  items: Array<Maybe<ShelterMap>>;
  pagination: Pagination;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type PaginatedShelterOwnershipTransfers = {
  __typename?: 'PaginatedShelterOwnershipTransfers';
  error?: Maybe<Error>;
  items: Array<Maybe<ShelterOwnershipTransfer>>;
  pagination: Pagination;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type PaginatedShelterPeople = {
  __typename?: 'PaginatedShelterPeople';
  error?: Maybe<Error>;
  items: Array<Maybe<ShelterPerson>>;
  pagination: Pagination;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type PaginatedShelterPets = {
  __typename?: 'PaginatedShelterPets';
  error?: Maybe<Error>;
  items: Array<Maybe<ShelterPet>>;
  pagination: Pagination;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type PaginatedShelterRoles = {
  __typename?: 'PaginatedShelterRoles';
  error?: Maybe<Error>;
  items: Array<Maybe<ShelterRole>>;
  pagination: Pagination;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type PaginatedShelterTasks = {
  __typename?: 'PaginatedShelterTasks';
  error?: Maybe<Error>;
  items: Array<Maybe<ShelterTask>>;
  pagination: Pagination;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type PaginatedShelterWalks = {
  __typename?: 'PaginatedShelterWalks';
  error?: Maybe<Error>;
  items: Array<Maybe<ShelterWalk>>;
  pagination: Pagination;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type PaginatedShelterZones = {
  __typename?: 'PaginatedShelterZones';
  error?: Maybe<Error>;
  items: Array<Maybe<ShelterZone>>;
  pagination: Pagination;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type PaginatedShelters = {
  __typename?: 'PaginatedShelters';
  error?: Maybe<Error>;
  items: Array<Maybe<Shelter>>;
  pagination: Pagination;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type PaginatedTreatments = {
  __typename?: 'PaginatedTreatments';
  error?: Maybe<Error>;
  items: Array<Maybe<Treatment>>;
  pagination: Pagination;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  error?: Maybe<Error>;
  items: Array<Maybe<User>>;
  pagination: Pagination;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type PaginatedWalkRatings = {
  __typename?: 'PaginatedWalkRatings';
  error?: Maybe<Error>;
  items: Array<Maybe<WalkRating>>;
  pagination: Pagination;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type PaginatedWalks = {
  __typename?: 'PaginatedWalks';
  error?: Maybe<Error>;
  items: Array<Maybe<Walk>>;
  pagination: Pagination;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/** how a list is owganized by how many items has been found, in which page we are, the number of element per page and how many pages there are */
export type Pagination = {
  __typename?: 'Pagination';
  current_page?: Maybe<Scalars['Int']['output']>;
  page_size?: Maybe<Scalars['Int']['output']>;
  total_items?: Maybe<Scalars['Int']['output']>;
  total_pages?: Maybe<Scalars['Int']['output']>;
};

export type Pet = {
  __typename?: 'Pet';
  birthday?: Maybe<Scalars['String']['output']>;
  breed?: Maybe<Scalars['String']['output']>;
  chip_code?: Maybe<Scalars['String']['output']>;
  coat_length?: Maybe<CoatLength>;
  diet?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  disciplines?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  gender?: Maybe<Gender>;
  health_card?: Maybe<HealthCard>;
  id: Scalars['ID']['output'];
  intollerance?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  main_picture?: Maybe<Media>;
  name: Scalars['String']['output'];
  neutered?: Maybe<Scalars['Boolean']['output']>;
  ownerships?: Maybe<PaginatedOwnerships>;
  pictures?: Maybe<PaginatedMedias>;
  report?: Maybe<Report>;
  temperament?: Maybe<Scalars['String']['output']>;
  weight_kg?: Maybe<Scalars['Float']['output']>;
  years?: Maybe<Scalars['Int']['output']>;
};


export type PetOwnershipsArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};


export type PetPicturesArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};

export type PetAddedResult = {
  __typename?: 'PetAddedResult';
  data?: Maybe<NewOwnership>;
  error?: Maybe<Error>;
  success: Scalars['Boolean']['output'];
};

export type PetCreate = {
  birthday?: InputMaybe<Scalars['String']['input']>;
  breed?: InputMaybe<Scalars['String']['input']>;
  chip_code?: InputMaybe<Scalars['String']['input']>;
  coat_length?: InputMaybe<CoatLength>;
  diet?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  disciplines?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  gender?: InputMaybe<Gender>;
  intollerance?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name: Scalars['String']['input'];
  neutered?: InputMaybe<Scalars['Boolean']['input']>;
  temperament?: InputMaybe<Scalars['String']['input']>;
  weight_kg?: InputMaybe<Scalars['Float']['input']>;
};

export enum PetFamily {
  Birds = 'BIRDS',
  Canine = 'CANINE',
  Feline = 'FELINE',
  Fish = 'FISH',
  Reptile = 'REPTILE'
}

export type PetResult = {
  __typename?: 'PetResult';
  error?: Maybe<Error>;
  pet?: Maybe<Pet>;
  success: Scalars['Boolean']['output'];
};

export type PetUpdate = {
  birthday?: InputMaybe<Scalars['String']['input']>;
  breed?: InputMaybe<Scalars['String']['input']>;
  chip_code?: InputMaybe<Scalars['String']['input']>;
  coat_length?: InputMaybe<CoatLength>;
  diet?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  disciplines?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  gender?: InputMaybe<Gender>;
  intollerance?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  neutered?: InputMaybe<Scalars['Boolean']['input']>;
  temperament?: InputMaybe<Scalars['String']['input']>;
  weight_kg?: InputMaybe<Scalars['Float']['input']>;
};

export type PetWeight = {
  __typename?: 'PetWeight';
  created_at: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  pet_id: Scalars['ID']['output'];
  weight_kg: Scalars['Float']['output'];
};

export type PetWeightChartData = {
  __typename?: 'PetWeightChartData';
  data: Array<Maybe<Scalars['Float']['output']>>;
  labels: Array<Scalars['String']['output']>;
};

export type PetWeightChartResult = {
  __typename?: 'PetWeightChartResult';
  chart?: Maybe<PetWeightChartData>;
  error?: Maybe<Error>;
  success: Scalars['Boolean']['output'];
};

export type PetWeightCreate = {
  pet_id: Scalars['ID']['input'];
  weight_kg: Scalars['Float']['input'];
};

export type PetWeightResult = {
  __typename?: 'PetWeightResult';
  error?: Maybe<Error>;
  success: Scalars['Boolean']['output'];
  weight?: Maybe<PetWeight>;
};

export type PetsResult = {
  __typename?: 'PetsResult';
  error?: Maybe<Error>;
  pets: Array<Maybe<Pet>>;
  success: Scalars['Boolean']['output'];
};

export type PublicShelter = {
  __typename?: 'PublicShelter';
  accepts_volunteers: Scalars['Boolean']['output'];
  city?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  logo_media_id?: Maybe<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
  public_contact_email?: Maybe<Scalars['String']['output']>;
  public_contact_phone?: Maybe<Scalars['String']['output']>;
  public_description?: Maybe<Scalars['String']['output']>;
  public_lat?: Maybe<Scalars['Float']['output']>;
  public_lng?: Maybe<Scalars['Float']['output']>;
  public_location_label?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Scalars['String']['output']>;
};

export type PublicShelterSearchInput = {
  accepts_volunteers?: InputMaybe<Scalars['Boolean']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  page_size?: InputMaybe<Scalars['Int']['input']>;
  province_code?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  discoverShelters: PaginatedPublicShelters;
  getCode: CodeResult;
  getCure: Cure;
  getCurrentBoxForPet: ShelterBoxResult;
  getDamnatioMemoriae?: Maybe<DamnatioMemoriaeResult>;
  getDashboard: DashboardResult;
  getGroupedStatistics: StatisticsResult;
  getHealthCard?: Maybe<HealthCardResult>;
  getLatestPetWeight: PetWeightResult;
  getMedia: MediaResult;
  getMyShelterDashboard: MyShelterDashboardResult;
  getOrCreateCode?: Maybe<CodeResult>;
  getOwnership: OwnershipResult;
  getPet: PetResult;
  getPetWalkingStats: WalkRatingChartResult;
  getPetWeightStats: PetWeightChartResult;
  getPublicShelter?: Maybe<PublicShelter>;
  getRealTimeStatistic: RealTimeStatisticResult;
  getReport?: Maybe<ReportResult>;
  getShelter: ShelterResult;
  getShelterArea: ShelterAreaResult;
  getShelterBox: ShelterBoxResult;
  getShelterInventoryItem: ShelterInventoryItemResult;
  getShelterInvite: ShelterInviteResult;
  getShelterMap: ShelterMapResult;
  getShelterMapElement: ShelterMapElementResult;
  getShelterOperationalDashboard: ShelterOperationalDashboardResult;
  getShelterPerson?: Maybe<ShelterPerson>;
  getShelterPet: ShelterPetResult;
  getShelterPetWalkingStats: WalkRatingChartResult;
  getShelterRole: ShelterRoleResult;
  getShelterTask: ShelterTaskResult;
  getShelterWalk: ShelterWalkResult;
  getShelterZone: ShelterZoneResult;
  getTreatment?: Maybe<TreatmentResult>;
  getUnreadNotificationCount: Scalars['Int']['output'];
  getUser: UserResult;
  getUserDashboard: UserDashboardResult;
  getWalk: Walk;
  getWalkRating: WalkRatingResult;
  listCodes: PaginatedCodes;
  listCures: PaginatedCures;
  listDamnationesMemoriae?: Maybe<PaginatedDamnationesMemoriae>;
  listHealthCards: PaginatedHealthCards;
  listLowStockItems: PaginatedInventoryItems;
  listMedias: PaginatedMedias;
  listMyNotifications: PaginatedNotifications;
  listMyOwnershipTransfers: PaginatedShelterOwnershipTransfers;
  listMyPets: PaginatedPets;
  listMyShelterClaimRequests: PaginatedShelterClaimRequests;
  listMyTreatments: PaginatedTreatments;
  listOperationalShelterTasks: PaginatedShelterTasks;
  listOperationalShelterWalks: PaginatedShelterWalks;
  listOwnerships: PaginatedOwnerships;
  listPets: PaginatedPets;
  listPetsNeedingWalk: PaginatedShelterPets;
  listReports: PaginatedReports;
  listShelterAreas: PaginatedShelterAreas;
  listShelterBoxOccupancies: PaginatedBoxOccupancies;
  listShelterBoxes: PaginatedShelterBoxes;
  listShelterClaimRequests: PaginatedShelterClaimRequests;
  listShelterInventoryItems: PaginatedInventoryItems;
  listShelterInventoryMovements: PaginatedInventoryMovements;
  listShelterKpiHistory: ShelterKpiHistoryResult;
  listShelterMapElements: PaginatedMapElements;
  listShelterMaps: PaginatedShelterMaps;
  listShelterOwnershipTransfers: PaginatedShelterOwnershipTransfers;
  listShelterPeople: PaginatedShelterPeople;
  listShelterPets: PaginatedShelterPets;
  listShelterRoles: PaginatedShelterRoles;
  listShelterTasks: PaginatedShelterTasks;
  listShelterWalks: PaginatedShelterWalks;
  listShelterZones: PaginatedShelterZones;
  listShelters: PaginatedShelters;
  listTreatments: PaginatedTreatments;
  listUsers: PaginatedUsers;
  listWalkRatings: PaginatedWalkRatings;
  listWalks: PaginatedWalks;
  me: UserResult;
  myShelterAuthorization: ShelterAuthorizationResult;
};


export type QueryDiscoverSheltersArgs = {
  search?: InputMaybe<PublicShelterSearchInput>;
};


export type QueryGetCodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetCureArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetCurrentBoxForPetArgs = {
  shelter_pet_id: Scalars['ID']['input'];
};


export type QueryGetDamnatioMemoriaeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetGroupedStatisticsArgs = {
  date_from: Scalars['String']['input'];
  date_to?: InputMaybe<Scalars['String']['input']>;
  group?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetHealthCardArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetLatestPetWeightArgs = {
  pet_id: Scalars['ID']['input'];
};


export type QueryGetMediaArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetMyShelterDashboardArgs = {
  date_from: Scalars['String']['input'];
  date_to: Scalars['String']['input'];
};


export type QueryGetOrCreateCodeArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  ref_id: Scalars['String']['input'];
  ref_table: Scalars['String']['input'];
};


export type QueryGetOwnershipArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPetArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPetWalkingStatsArgs = {
  period: StatsPeriod;
  pet_id: Scalars['ID']['input'];
};


export type QueryGetPetWeightStatsArgs = {
  period: StatsPeriod;
  pet_id: Scalars['ID']['input'];
};


export type QueryGetPublicShelterArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetReportArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetShelterArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetShelterAreaArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetShelterBoxArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetShelterInventoryItemArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetShelterInviteArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetShelterMapArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetShelterMapElementArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetShelterOperationalDashboardArgs = {
  shelter_id: Scalars['ID']['input'];
};


export type QueryGetShelterPersonArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetShelterPetArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetShelterPetWalkingStatsArgs = {
  period: StatsPeriod;
  shelter_pet_id: Scalars['ID']['input'];
};


export type QueryGetShelterRoleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetShelterTaskArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetShelterWalkArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetShelterZoneArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetTreatmentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetWalkArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetWalkRatingArgs = {
  id: Scalars['ID']['input'];
};


export type QueryListCodesArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};


export type QueryListCuresArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};


export type QueryListDamnationesMemoriaeArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};


export type QueryListHealthCardsArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};


export type QueryListLowStockItemsArgs = {
  shelter_id: Scalars['ID']['input'];
};


export type QueryListMediasArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};


export type QueryListMyNotificationsArgs = {
  search?: InputMaybe<CommonSearch>;
};


export type QueryListMyOwnershipTransfersArgs = {
  search?: InputMaybe<CommonSearch>;
};


export type QueryListMyPetsArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};


export type QueryListMyShelterClaimRequestsArgs = {
  search?: InputMaybe<CommonSearch>;
};


export type QueryListMyTreatmentsArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};


export type QueryListOperationalShelterTasksArgs = {
  shelter_id: Scalars['ID']['input'];
};


export type QueryListOperationalShelterWalksArgs = {
  shelter_id: Scalars['ID']['input'];
};


export type QueryListOwnershipsArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};


export type QueryListPetsArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};


export type QueryListPetsNeedingWalkArgs = {
  hours?: InputMaybe<Scalars['Int']['input']>;
  shelter_id: Scalars['ID']['input'];
};


export type QueryListReportsArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};


export type QueryListShelterAreasArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};


export type QueryListShelterBoxOccupanciesArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};


export type QueryListShelterBoxesArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};


export type QueryListShelterClaimRequestsArgs = {
  search?: InputMaybe<CommonSearch>;
  shelter_id: Scalars['ID']['input'];
};


export type QueryListShelterInventoryItemsArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};


export type QueryListShelterInventoryMovementsArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};


export type QueryListShelterKpiHistoryArgs = {
  days?: InputMaybe<Scalars['Int']['input']>;
  shelter_id: Scalars['ID']['input'];
};


export type QueryListShelterMapElementsArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};


export type QueryListShelterMapsArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};


export type QueryListShelterOwnershipTransfersArgs = {
  search?: InputMaybe<CommonSearch>;
  shelter_id: Scalars['ID']['input'];
};


export type QueryListShelterPeopleArgs = {
  search?: InputMaybe<CommonSearch>;
  shelter_id: Scalars['ID']['input'];
};


export type QueryListShelterPetsArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};


export type QueryListShelterRolesArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};


export type QueryListShelterTasksArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};


export type QueryListShelterWalksArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};


export type QueryListShelterZonesArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};


export type QueryListSheltersArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};


export type QueryListTreatmentsArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};


export type QueryListUsersArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};


export type QueryListWalkRatingsArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};


export type QueryListWalksArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};


export type QueryMyShelterAuthorizationArgs = {
  shelter_id: Scalars['ID']['input'];
};

export type RangeFilter = {
  key: Scalars['String']['input'];
  value?: InputMaybe<RangeFilterValue>;
};

export type RangeFilterValue = {
  max?: InputMaybe<Scalars['String']['input']>;
  min?: InputMaybe<Scalars['String']['input']>;
};

export type RealTimeStatisticResult = {
  __typename?: 'RealTimeStatisticResult';
  error?: Maybe<Error>;
  statistics?: Maybe<DailyStats>;
  success: Scalars['Boolean']['output'];
};

export type Recurrence = {
  __typename?: 'Recurrence';
  freq: RecurrenceFreq;
  interval: Scalars['Int']['output'];
  start_at?: Maybe<Scalars['String']['output']>;
  time_of_day?: Maybe<Scalars['String']['output']>;
  week_ordinal?: Maybe<Scalars['Int']['output']>;
  weekdays?: Maybe<Array<Weekday>>;
};

export enum RecurrenceFreq {
  Daily = 'DAILY',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY'
}

export type RecurrenceInput = {
  freq: RecurrenceFreq;
  interval?: InputMaybe<Scalars['Int']['input']>;
  start_at?: InputMaybe<Scalars['String']['input']>;
  time_of_day?: InputMaybe<Scalars['String']['input']>;
  week_ordinal?: InputMaybe<Scalars['Int']['input']>;
  weekdays?: InputMaybe<Array<Weekday>>;
};

export type Report = {
  __typename?: 'Report';
  coordinates: Coordinates;
  created_at: Scalars['String']['output'];
  date: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  medias?: Maybe<Array<Maybe<Media>>>;
  notes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  pet?: Maybe<Pet>;
  place: Scalars['String']['output'];
  reporter: Reporter;
  responders: Array<Maybe<Reporter>>;
  type: ReportType;
  updated_at: Scalars['String']['output'];
};

export type ReportCreate = {
  date?: InputMaybe<Scalars['String']['input']>;
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  notes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pet_id?: InputMaybe<Scalars['String']['input']>;
  place: Scalars['String']['input'];
  reporter: ReporterCreate;
  type: ReportType;
};

export type ReportResult = {
  __typename?: 'ReportResult';
  error?: Maybe<Error>;
  report?: Maybe<Report>;
  success: Scalars['Boolean']['output'];
};

export enum ReportType {
  Found = 'FOUND',
  Missing = 'MISSING'
}

export type ReportUpdate = {
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  place?: InputMaybe<Scalars['String']['input']>;
  responders?: InputMaybe<Array<InputMaybe<ReporterCreate>>>;
};

export type Reporter = {
  __typename?: 'Reporter';
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  last_name: Scalars['String']['output'];
  user_id?: Maybe<Scalars['String']['output']>;
};

export type ReporterCreate = {
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  user_id?: InputMaybe<Scalars['String']['input']>;
};

export type RestoredResult = {
  __typename?: 'RestoredResult';
  error?: Maybe<Error>;
  restored?: Maybe<Scalars['JSON']['output']>;
  success: Scalars['Boolean']['output'];
  table?: Maybe<Scalars['String']['output']>;
};

export enum RoleLevel {
  Manager = 'MANAGER',
  Owner = 'OWNER',
  Staff = 'STAFF',
  Volunteer = 'VOLUNTEER'
}

export type SearchFilter = {
  fields?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type Shelter = {
  __typename?: 'Shelter';
  accepts_volunteers: Scalars['Boolean']['output'];
  city: Scalars['String']['output'];
  contacts?: Maybe<Array<Maybe<ShelterContact>>>;
  created_at: Scalars['String']['output'];
  district?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  pets?: Maybe<PaginatedShelterPets>;
  postal_code: Scalars['String']['output'];
  province_code: Scalars['String']['output'];
  public_contact_email?: Maybe<Scalars['String']['output']>;
  public_contact_phone?: Maybe<Scalars['String']['output']>;
  public_description?: Maybe<Scalars['String']['output']>;
  public_lat?: Maybe<Scalars['Float']['output']>;
  public_lng?: Maybe<Scalars['Float']['output']>;
  public_location_label?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Scalars['String']['output']>;
  roles?: Maybe<PaginatedShelterRoles>;
  street: Scalars['String']['output'];
  street_number: Scalars['String']['output'];
  type: ShelterType;
  verification_status: ShelterVerificationStatus;
  visibility: ShelterVisibility;
};


export type ShelterPetsArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};


export type ShelterRolesArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};

export type ShelterArea = {
  __typename?: 'ShelterArea';
  area_type: AreaType;
  boxes: Array<ShelterBox>;
  color?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['String']['output'];
  height: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  map_id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  width: Scalars['Float']['output'];
  x: Scalars['Float']['output'];
  y: Scalars['Float']['output'];
  zone?: Maybe<ShelterZone>;
  zone_id: Scalars['ID']['output'];
};

export type ShelterAreaCreate = {
  area_type: AreaType;
  color?: InputMaybe<Scalars['String']['input']>;
  height: Scalars['Float']['input'];
  map_id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  width: Scalars['Float']['input'];
  x: Scalars['Float']['input'];
  y: Scalars['Float']['input'];
  zone_id: Scalars['ID']['input'];
};

export type ShelterAreaResult = {
  __typename?: 'ShelterAreaResult';
  area?: Maybe<ShelterArea>;
  error?: Maybe<Error>;
  success: Scalars['Boolean']['output'];
};

export type ShelterAreaUpdate = {
  area_type?: InputMaybe<AreaType>;
  color?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
  x?: InputMaybe<Scalars['Float']['input']>;
  y?: InputMaybe<Scalars['Float']['input']>;
  zone_id?: InputMaybe<Scalars['ID']['input']>;
};

export type ShelterAreaUpsert = {
  area_type: AreaType;
  color?: InputMaybe<Scalars['String']['input']>;
  height: Scalars['Float']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  width: Scalars['Float']['input'];
  x: Scalars['Float']['input'];
  y: Scalars['Float']['input'];
  zone_id: Scalars['ID']['input'];
};

export type ShelterAuthorization = {
  __typename?: 'ShelterAuthorization';
  membership_status?: Maybe<Scalars['String']['output']>;
  permissions: Array<Scalars['String']['output']>;
  shelter_id: Scalars['ID']['output'];
};

export type ShelterAuthorizationResult = {
  __typename?: 'ShelterAuthorizationResult';
  authorization?: Maybe<ShelterAuthorization>;
  error?: Maybe<Error>;
  success: Scalars['Boolean']['output'];
};

export type ShelterBox = {
  __typename?: 'ShelterBox';
  area?: Maybe<ShelterArea>;
  capacity: Scalars['Int']['output'];
  created_at: Scalars['String']['output'];
  current_occupants: Array<ShelterPet>;
  height: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  is_out_of_service: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  last_cleaned_at?: Maybe<Scalars['String']['output']>;
  map_id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  occupancy_history?: Maybe<PaginatedBoxOccupancies>;
  rotation: Scalars['Float']['output'];
  status: BoxStatus;
  width: Scalars['Float']['output'];
  x: Scalars['Float']['output'];
  y: Scalars['Float']['output'];
  zone?: Maybe<ShelterZone>;
  zone_id: Scalars['ID']['output'];
};


export type ShelterBoxOccupancy_HistoryArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};

export type ShelterBoxCreate = {
  area_id?: InputMaybe<Scalars['ID']['input']>;
  capacity?: InputMaybe<Scalars['Int']['input']>;
  height: Scalars['Float']['input'];
  label: Scalars['String']['input'];
  map_id: Scalars['ID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  rotation?: InputMaybe<Scalars['Float']['input']>;
  width: Scalars['Float']['input'];
  x: Scalars['Float']['input'];
  y: Scalars['Float']['input'];
  zone_id: Scalars['ID']['input'];
};

export type ShelterBoxOccupancy = {
  __typename?: 'ShelterBoxOccupancy';
  box: ShelterBox;
  created_at: Scalars['String']['output'];
  entered_at: Scalars['String']['output'];
  exited_at?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  moved_by?: Maybe<User>;
  reason?: Maybe<Scalars['String']['output']>;
  shelter_pet: ShelterPet;
};

export type ShelterBoxOccupancyResult = {
  __typename?: 'ShelterBoxOccupancyResult';
  error?: Maybe<Error>;
  occupancy?: Maybe<ShelterBoxOccupancy>;
  success: Scalars['Boolean']['output'];
};

export type ShelterBoxResult = {
  __typename?: 'ShelterBoxResult';
  box?: Maybe<ShelterBox>;
  error?: Maybe<Error>;
  success: Scalars['Boolean']['output'];
};

export type ShelterBoxUpdate = {
  area_id?: InputMaybe<Scalars['ID']['input']>;
  capacity?: InputMaybe<Scalars['Int']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  is_out_of_service?: InputMaybe<Scalars['Boolean']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  rotation?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
  x?: InputMaybe<Scalars['Float']['input']>;
  y?: InputMaybe<Scalars['Float']['input']>;
  zone_id?: InputMaybe<Scalars['ID']['input']>;
};

export type ShelterBoxUpsert = {
  area_id?: InputMaybe<Scalars['ID']['input']>;
  capacity?: InputMaybe<Scalars['Int']['input']>;
  height: Scalars['Float']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  label: Scalars['String']['input'];
  rotation?: InputMaybe<Scalars['Float']['input']>;
  width: Scalars['Float']['input'];
  x: Scalars['Float']['input'];
  y: Scalars['Float']['input'];
  zone_id: Scalars['ID']['input'];
};

export type ShelterClaimInput = {
  message?: InputMaybe<Scalars['String']['input']>;
  proof_data?: InputMaybe<Scalars['JSON']['input']>;
};

export type ShelterClaimRequest = {
  __typename?: 'ShelterClaimRequest';
  created_at: Scalars['String']['output'];
  decision_note?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  message?: Maybe<Scalars['String']['output']>;
  proof_data?: Maybe<Scalars['JSON']['output']>;
  requester: User;
  reviewed_at?: Maybe<Scalars['String']['output']>;
  reviewed_by?: Maybe<User>;
  shelter: Shelter;
  status: ShelterClaimRequestStatus;
  updated_at?: Maybe<Scalars['String']['output']>;
};

export type ShelterClaimRequestResult = {
  __typename?: 'ShelterClaimRequestResult';
  error?: Maybe<Error>;
  shelter_claim_request?: Maybe<ShelterClaimRequest>;
  success: Scalars['Boolean']['output'];
};

export enum ShelterClaimRequestStatus {
  Approved = 'APPROVED',
  Cancelled = 'CANCELLED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type ShelterContact = {
  __typename?: 'ShelterContact';
  type?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type ShelterContactInput = {
  type: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type ShelterCreate = {
  city: Scalars['String']['input'];
  contacts?: InputMaybe<Array<InputMaybe<ShelterContactInput>>>;
  district?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  postal_code: Scalars['String']['input'];
  province_code: Scalars['String']['input'];
  region?: InputMaybe<Scalars['String']['input']>;
  street: Scalars['String']['input'];
  street_number: Scalars['String']['input'];
};

export enum ShelterInventoryAlertStatus {
  LowStock = 'LOW_STOCK',
  OutOfStock = 'OUT_OF_STOCK'
}

export type ShelterInventoryItem = {
  __typename?: 'ShelterInventoryItem';
  archived_at?: Maybe<Scalars['String']['output']>;
  archived_by?: Maybe<User>;
  category: InventoryCategory;
  created_at: Scalars['String']['output'];
  current_quantity: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  is_active: Scalars['Boolean']['output'];
  is_below_threshold: Scalars['Boolean']['output'];
  minimum_threshold?: Maybe<Scalars['Float']['output']>;
  movements?: Maybe<PaginatedInventoryMovements>;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  shelter: Shelter;
  unit: Scalars['String']['output'];
};


export type ShelterInventoryItemMovementsArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};

export type ShelterInventoryItemCreate = {
  category: InventoryCategory;
  initial_quantity?: InputMaybe<Scalars['Float']['input']>;
  minimum_threshold?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  shelter_id: Scalars['ID']['input'];
  unit: Scalars['String']['input'];
};

export type ShelterInventoryItemResult = {
  __typename?: 'ShelterInventoryItemResult';
  error?: Maybe<Error>;
  item?: Maybe<ShelterInventoryItem>;
  success: Scalars['Boolean']['output'];
};

export type ShelterInventoryItemUpdate = {
  category?: InputMaybe<InventoryCategory>;
  minimum_threshold?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
};

export type ShelterInventoryMovement = {
  __typename?: 'ShelterInventoryMovement';
  created_at: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  item: ShelterInventoryItem;
  movement_type: MovementType;
  notes?: Maybe<Scalars['String']['output']>;
  quantity: Scalars['Float']['output'];
  registered_by: User;
};

export type ShelterInventoryMovementCreate = {
  allow_negative?: InputMaybe<Scalars['Boolean']['input']>;
  item_id: Scalars['ID']['input'];
  movement_type: MovementType;
  notes?: InputMaybe<Scalars['String']['input']>;
  quantity: Scalars['Float']['input'];
};

export type ShelterInventoryMovementResult = {
  __typename?: 'ShelterInventoryMovementResult';
  error?: Maybe<Error>;
  movement?: Maybe<ShelterInventoryMovement>;
  success: Scalars['Boolean']['output'];
};

export type ShelterInvite = {
  __typename?: 'ShelterInvite';
  created_at: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  invited_by?: Maybe<User>;
  role: RoleLevel;
  shelter: Shelter;
  status: ShelterInviteStatus;
  user: User;
};

export type ShelterInviteCreate = {
  role: RoleLevel;
  shelter_id: Scalars['ID']['input'];
  user_id: Scalars['ID']['input'];
};

export type ShelterInviteResult = {
  __typename?: 'ShelterInviteResult';
  error?: Maybe<Error>;
  shelter_invite?: Maybe<ShelterInvite>;
  success: Scalars['Boolean']['output'];
};

export enum ShelterInviteStatus {
  Accepted = 'ACCEPTED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type ShelterKpiHistoryResult = {
  __typename?: 'ShelterKpiHistoryResult';
  error?: Maybe<Error>;
  items: Array<Maybe<ShelterKpiSnapshot>>;
  success: Scalars['Boolean']['output'];
};

export type ShelterKpiSnapshot = {
  __typename?: 'ShelterKpiSnapshot';
  boxes_free: Scalars['Int']['output'];
  boxes_full: Scalars['Int']['output'];
  boxes_occupied: Scalars['Int']['output'];
  boxes_out_of_service: Scalars['Int']['output'];
  boxes_total: Scalars['Int']['output'];
  date: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  low_stock_count: Scalars['Int']['output'];
  pets_needing_walk: Scalars['Int']['output'];
  pets_total: Scalars['Int']['output'];
  pets_without_box: Scalars['Int']['output'];
  shelter_id: Scalars['ID']['output'];
  tasks_completed_today: Scalars['Int']['output'];
  tasks_due_this_week: Scalars['Int']['output'];
  tasks_overdue: Scalars['Int']['output'];
  tasks_pending: Scalars['Int']['output'];
  tasks_recurring: Scalars['Int']['output'];
  tasks_total: Scalars['Int']['output'];
  walks_completed_today: Scalars['Int']['output'];
  walks_planned_today: Scalars['Int']['output'];
};

export type ShelterMap = {
  __typename?: 'ShelterMap';
  areas: Array<ShelterArea>;
  background_media?: Maybe<Media>;
  boxes: Array<ShelterBox>;
  created_at: Scalars['String']['output'];
  elements: Array<ShelterMapElement>;
  height: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  shelter: Shelter;
  unit: MapUnit;
  width: Scalars['Float']['output'];
  zones: Array<ShelterZone>;
};

export type ShelterMapCreate = {
  background_media_id?: InputMaybe<Scalars['ID']['input']>;
  height: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  shelter_id: Scalars['ID']['input'];
  unit?: InputMaybe<MapUnit>;
  width: Scalars['Float']['input'];
};

export type ShelterMapElement = {
  __typename?: 'ShelterMapElement';
  color?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['String']['output'];
  element_type: MapElementType;
  height: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  label?: Maybe<Scalars['String']['output']>;
  map_id: Scalars['ID']['output'];
  rotation: Scalars['Float']['output'];
  width: Scalars['Float']['output'];
  x: Scalars['Float']['output'];
  y: Scalars['Float']['output'];
};

export type ShelterMapElementCreate = {
  color?: InputMaybe<Scalars['String']['input']>;
  element_type: MapElementType;
  height: Scalars['Float']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
  map_id: Scalars['ID']['input'];
  rotation?: InputMaybe<Scalars['Float']['input']>;
  width: Scalars['Float']['input'];
  x: Scalars['Float']['input'];
  y: Scalars['Float']['input'];
};

export type ShelterMapElementResult = {
  __typename?: 'ShelterMapElementResult';
  element?: Maybe<ShelterMapElement>;
  error?: Maybe<Error>;
  success: Scalars['Boolean']['output'];
};

export type ShelterMapElementUpdate = {
  color?: InputMaybe<Scalars['String']['input']>;
  element_type?: InputMaybe<MapElementType>;
  height?: InputMaybe<Scalars['Float']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  rotation?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
  x?: InputMaybe<Scalars['Float']['input']>;
  y?: InputMaybe<Scalars['Float']['input']>;
};

export type ShelterMapElementUpsert = {
  color?: InputMaybe<Scalars['String']['input']>;
  element_type: MapElementType;
  height: Scalars['Float']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  rotation?: InputMaybe<Scalars['Float']['input']>;
  width: Scalars['Float']['input'];
  x: Scalars['Float']['input'];
  y: Scalars['Float']['input'];
};

export type ShelterMapLayoutInput = {
  areas: Array<ShelterAreaUpsert>;
  boxes: Array<ShelterBoxUpsert>;
  deleted_area_ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  deleted_box_ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  deleted_element_ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  deleted_zone_ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  elements?: InputMaybe<Array<ShelterMapElementUpsert>>;
  zones?: InputMaybe<Array<ShelterZoneUpsert>>;
};

export type ShelterMapResult = {
  __typename?: 'ShelterMapResult';
  error?: Maybe<Error>;
  map?: Maybe<ShelterMap>;
  success: Scalars['Boolean']['output'];
};

export type ShelterMapUpdate = {
  background_media_id?: InputMaybe<Scalars['ID']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<MapUnit>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type ShelterOperationalDashboard = {
  __typename?: 'ShelterOperationalDashboard';
  boxes_available: Scalars['Int']['output'];
  boxes_free: Scalars['Int']['output'];
  boxes_full: Scalars['Int']['output'];
  boxes_needing_cleaning: Scalars['Int']['output'];
  boxes_occupied: Scalars['Int']['output'];
  boxes_out_of_service: Scalars['Int']['output'];
  boxes_total: Scalars['Int']['output'];
  low_stock_count: Scalars['Int']['output'];
  low_stock_items: Array<ShelterInventoryItem>;
  occupancy_rate: Scalars['Float']['output'];
  pets_needing_walk: Scalars['Int']['output'];
  pets_total: Scalars['Int']['output'];
  pets_without_box: Scalars['Int']['output'];
  shelter_id: Scalars['ID']['output'];
  tasks_completed_today: Scalars['Int']['output'];
  tasks_due_this_week: Scalars['Int']['output'];
  tasks_overdue: Scalars['Int']['output'];
  tasks_pending: Scalars['Int']['output'];
  tasks_recurring: Scalars['Int']['output'];
  tasks_skipped_today: Scalars['Int']['output'];
  tasks_total: Scalars['Int']['output'];
  walks_completed_today: Scalars['Int']['output'];
  walks_in_progress: Scalars['Int']['output'];
  walks_planned_today: Scalars['Int']['output'];
};

export type ShelterOperationalDashboardResult = {
  __typename?: 'ShelterOperationalDashboardResult';
  dashboard?: Maybe<ShelterOperationalDashboard>;
  error?: Maybe<Error>;
  success: Scalars['Boolean']['output'];
};

export type ShelterOwnershipTransfer = {
  __typename?: 'ShelterOwnershipTransfer';
  accepted_at?: Maybe<Scalars['String']['output']>;
  cancelled_at?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['String']['output'];
  expires_at?: Maybe<Scalars['String']['output']>;
  from_user: User;
  id: Scalars['ID']['output'];
  new_role_for_previous_owner?: Maybe<RoleLevel>;
  rejected_at?: Maybe<Scalars['String']['output']>;
  shelter: Shelter;
  status: ShelterOwnershipTransferStatus;
  to_user: User;
  updated_at?: Maybe<Scalars['String']['output']>;
};

export type ShelterOwnershipTransferResult = {
  __typename?: 'ShelterOwnershipTransferResult';
  error?: Maybe<Error>;
  shelter_ownership_transfer?: Maybe<ShelterOwnershipTransfer>;
  success: Scalars['Boolean']['output'];
};

export enum ShelterOwnershipTransferStatus {
  Accepted = 'ACCEPTED',
  Cancelled = 'CANCELLED',
  Expired = 'EXPIRED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type ShelterPerson = {
  __typename?: 'ShelterPerson';
  archived_at?: Maybe<Scalars['String']['output']>;
  archived_by?: Maybe<User>;
  created_at: Scalars['String']['output'];
  created_by?: Maybe<User>;
  email?: Maybe<Scalars['String']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  last_name?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  shelter: Shelter;
  source: ShelterPersonSource;
  status: ShelterPersonStatus;
  updated_at?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type ShelterPersonResult = {
  __typename?: 'ShelterPersonResult';
  error?: Maybe<Error>;
  shelter_person?: Maybe<ShelterPerson>;
  success: Scalars['Boolean']['output'];
};

export enum ShelterPersonSource {
  Import = 'IMPORT',
  Invite = 'INVITE',
  Manual = 'MANUAL',
  Visit = 'VISIT',
  VolunteerRequest = 'VOLUNTEER_REQUEST'
}

export enum ShelterPersonStatus {
  ActiveUser = 'ACTIVE_USER',
  Archived = 'ARCHIVED',
  PendingInvite = 'PENDING_INVITE',
  Visitor = 'VISITOR',
  Volunteer = 'VOLUNTEER'
}

export type ShelterPet = {
  __typename?: 'ShelterPet';
  created_at: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  is_active: Scalars['Boolean']['output'];
  left_at?: Maybe<Scalars['String']['output']>;
  pet: Pet;
  shelter: Shelter;
};

export type ShelterPetCreate = {
  pet_id: Scalars['ID']['input'];
  shelter_id: Scalars['ID']['input'];
};

export type ShelterPetData = {
  birthday: Scalars['String']['input'];
  breed?: InputMaybe<Scalars['String']['input']>;
  chip_code?: InputMaybe<Scalars['String']['input']>;
  coat_length?: InputMaybe<CoatLength>;
  gender?: InputMaybe<Gender>;
  name: Scalars['String']['input'];
  neutered?: InputMaybe<Scalars['Boolean']['input']>;
  temperament?: InputMaybe<Scalars['String']['input']>;
  weight_kg?: InputMaybe<Scalars['Float']['input']>;
};

export type ShelterPetResult = {
  __typename?: 'ShelterPetResult';
  error?: Maybe<Error>;
  shelter_pet?: Maybe<ShelterPet>;
  success: Scalars['Boolean']['output'];
};

export type ShelterPetsCreate = {
  pet_ids: Array<Scalars['ID']['input']>;
  shelter_id: Scalars['ID']['input'];
};

export type ShelterPetsResult = {
  __typename?: 'ShelterPetsResult';
  error?: Maybe<Error>;
  shelter_pets?: Maybe<Array<Maybe<ShelterPet>>>;
  success: Scalars['Boolean']['output'];
};

export type ShelterPetsWithDataCreate = {
  pets: Array<ShelterPetData>;
  shelter_id: Scalars['ID']['input'];
};

export type ShelterResult = {
  __typename?: 'ShelterResult';
  error?: Maybe<Error>;
  shelter?: Maybe<Shelter>;
  success: Scalars['Boolean']['output'];
};

export type ShelterRole = {
  __typename?: 'ShelterRole';
  created_at: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  role: RoleLevel;
  shelter: Shelter;
  user: User;
};

export type ShelterRoleCreate = {
  role: RoleLevel;
  shelter_id: Scalars['ID']['input'];
  user_id: Scalars['ID']['input'];
};

export type ShelterRoleResult = {
  __typename?: 'ShelterRoleResult';
  error?: Maybe<Error>;
  shelter_role?: Maybe<ShelterRole>;
  success: Scalars['Boolean']['output'];
};

export type ShelterRoleUpdate = {
  role?: InputMaybe<RoleLevel>;
};

export type ShelterTask = {
  __typename?: 'ShelterTask';
  area?: Maybe<Scalars['String']['output']>;
  assignee_shelter_people: Array<ShelterPerson>;
  assignees: Array<User>;
  completed_at?: Maybe<Scalars['String']['output']>;
  completed_by?: Maybe<User>;
  created_at: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  is_recurring: Scalars['Boolean']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  recurrence?: Maybe<Recurrence>;
  scheduled_at?: Maybe<Scalars['String']['output']>;
  scheduled_date?: Maybe<Scalars['String']['output']>;
  shelter: Shelter;
  shelter_pet?: Maybe<ShelterPet>;
  skipped_at?: Maybe<Scalars['String']['output']>;
  skipped_by?: Maybe<User>;
  status: TaskStatus;
  task_type: ShelterTaskType;
};

export type ShelterTaskCreate = {
  area?: InputMaybe<Scalars['String']['input']>;
  assignee_ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  assignee_shelter_person_ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  is_recurring?: InputMaybe<Scalars['Boolean']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  recurrence?: InputMaybe<RecurrenceInput>;
  scheduled_at?: InputMaybe<Scalars['String']['input']>;
  shelter_box_id?: InputMaybe<Scalars['ID']['input']>;
  shelter_id: Scalars['ID']['input'];
  shelter_pet_id?: InputMaybe<Scalars['ID']['input']>;
  task_type: ShelterTaskType;
};

export type ShelterTaskResult = {
  __typename?: 'ShelterTaskResult';
  error?: Maybe<Error>;
  shelter_task?: Maybe<ShelterTask>;
  success: Scalars['Boolean']['output'];
};

export enum ShelterTaskType {
  Cleaning = 'CLEANING',
  DeepCleaning = 'DEEP_CLEANING',
  Feeding = 'FEEDING',
  Grooming = 'GROOMING',
  Medication = 'MEDICATION',
  Other = 'OTHER'
}

export type ShelterTaskUpdate = {
  area?: InputMaybe<Scalars['String']['input']>;
  assignee_ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  assignee_shelter_person_ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  is_recurring?: InputMaybe<Scalars['Boolean']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  recurrence?: InputMaybe<RecurrenceInput>;
  scheduled_at?: InputMaybe<Scalars['String']['input']>;
  task_type?: InputMaybe<ShelterTaskType>;
};

export enum ShelterType {
  OfficialShelter = 'OFFICIAL_SHELTER',
  PersonalWorkspace = 'PERSONAL_WORKSPACE'
}

export type ShelterUpdate = {
  accepts_volunteers?: InputMaybe<Scalars['Boolean']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  contacts?: InputMaybe<Array<InputMaybe<ShelterContactInput>>>;
  district?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  postal_code?: InputMaybe<Scalars['String']['input']>;
  province_code?: InputMaybe<Scalars['String']['input']>;
  public_contact_email?: InputMaybe<Scalars['String']['input']>;
  public_contact_phone?: InputMaybe<Scalars['String']['input']>;
  public_description?: InputMaybe<Scalars['String']['input']>;
  public_lat?: InputMaybe<Scalars['Float']['input']>;
  public_lng?: InputMaybe<Scalars['Float']['input']>;
  public_location_label?: InputMaybe<Scalars['String']['input']>;
  region?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  street_number?: InputMaybe<Scalars['String']['input']>;
};

export enum ShelterVerificationStatus {
  PendingClaim = 'PENDING_CLAIM',
  Rejected = 'REJECTED',
  Unverified = 'UNVERIFIED',
  Verified = 'VERIFIED'
}

export enum ShelterVisibility {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
  Unlisted = 'UNLISTED'
}

export type ShelterWalk = {
  __typename?: 'ShelterWalk';
  cancelled_at?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['String']['output'];
  duration_minutes?: Maybe<Scalars['Int']['output']>;
  ended_at?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  ratings?: Maybe<Array<Maybe<ShelterWalkRating>>>;
  scheduled_at?: Maybe<Scalars['String']['output']>;
  shelter_pet: ShelterPet;
  started_at?: Maybe<Scalars['String']['output']>;
  status: ShelterWalkStatus;
  walker?: Maybe<User>;
  walker_shelter_person?: Maybe<ShelterPerson>;
};

export type ShelterWalkCreate = {
  notes?: InputMaybe<Scalars['String']['input']>;
  scheduled_at?: InputMaybe<Scalars['String']['input']>;
  shelter_person_id?: InputMaybe<Scalars['ID']['input']>;
  shelter_pet_id: Scalars['ID']['input'];
  walker_id?: InputMaybe<Scalars['ID']['input']>;
};

export type ShelterWalkRating = {
  __typename?: 'ShelterWalkRating';
  created_at: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  rating: Scalars['Int']['output'];
  type: WalkRatingType;
  walk: ShelterWalk;
};

export type ShelterWalkRatingCreate = {
  rating: Scalars['Int']['input'];
  type: WalkRatingType;
  walk_id: Scalars['ID']['input'];
};

export type ShelterWalkRatingResult = {
  __typename?: 'ShelterWalkRatingResult';
  error?: Maybe<Error>;
  success: Scalars['Boolean']['output'];
  walk_rating?: Maybe<ShelterWalkRating>;
};

export type ShelterWalkResult = {
  __typename?: 'ShelterWalkResult';
  error?: Maybe<Error>;
  shelter_walk?: Maybe<ShelterWalk>;
  success: Scalars['Boolean']['output'];
};

export enum ShelterWalkStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Planned = 'PLANNED'
}

export type ShelterWalkUpdate = {
  notes?: InputMaybe<Scalars['String']['input']>;
  scheduled_at?: InputMaybe<Scalars['String']['input']>;
};

export type ShelterZone = {
  __typename?: 'ShelterZone';
  areas: Array<ShelterArea>;
  boxes: Array<ShelterBox>;
  color?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['String']['output'];
  height: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  map_id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  width: Scalars['Float']['output'];
  x: Scalars['Float']['output'];
  y: Scalars['Float']['output'];
};

export type ShelterZoneCreate = {
  color?: InputMaybe<Scalars['String']['input']>;
  height: Scalars['Float']['input'];
  map_id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  width: Scalars['Float']['input'];
  x: Scalars['Float']['input'];
  y: Scalars['Float']['input'];
};

export type ShelterZoneResult = {
  __typename?: 'ShelterZoneResult';
  error?: Maybe<Error>;
  success: Scalars['Boolean']['output'];
  zone?: Maybe<ShelterZone>;
};

export type ShelterZoneUpdate = {
  color?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
  x?: InputMaybe<Scalars['Float']['input']>;
  y?: InputMaybe<Scalars['Float']['input']>;
};

export type ShelterZoneUpsert = {
  color?: InputMaybe<Scalars['String']['input']>;
  height: Scalars['Float']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  width: Scalars['Float']['input'];
  x: Scalars['Float']['input'];
  y: Scalars['Float']['input'];
};

export type Statistic = {
  __typename?: 'Statistic';
  all_active_users: Scalars['Int']['output'];
  all_pets: Scalars['Int']['output'];
  all_user: Scalars['Int']['output'];
  date: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type StatisticResult = {
  __typename?: 'StatisticResult';
  error?: Maybe<Error>;
  statistic?: Maybe<Statistic>;
  success: Scalars['Boolean']['output'];
};

export type Statistics = {
  __typename?: 'Statistics';
  active_users_max: Array<Scalars['Float']['output']>;
  active_users_mean: Array<Scalars['Float']['output']>;
  active_users_min: Array<Scalars['Float']['output']>;
  all_pets: Array<Scalars['Float']['output']>;
  all_users: Array<Scalars['Float']['output']>;
  labels: Array<Scalars['String']['output']>;
};

export type StatisticsResult = {
  __typename?: 'StatisticsResult';
  error?: Maybe<Error>;
  statistics?: Maybe<Statistics>;
  success: Scalars['Boolean']['output'];
};

export enum StatsPeriod {
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY',
  Yearly = 'YEARLY'
}

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
};

export enum TaskStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Overdue = 'OVERDUE',
  Pending = 'PENDING',
  Skipped = 'SKIPPED'
}

export type Treatment = {
  __typename?: 'Treatment';
  booster?: Maybe<Treatment>;
  created_at: Scalars['String']['output'];
  date: Scalars['String']['output'];
  duration?: Maybe<TreatmentDuration>;
  health_card?: Maybe<HealthCard>;
  id: Scalars['ID']['output'];
  logs?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  name: Scalars['String']['output'];
  related?: Maybe<Array<Maybe<MinTreatment>>>;
  type: TreatmentType;
};

export type TreatmentCreate = {
  booster_date?: InputMaybe<Scalars['String']['input']>;
  date: Scalars['String']['input'];
  duration?: InputMaybe<TreatmentDuration>;
  health_card_id: Scalars['ID']['input'];
  logs?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name: Scalars['String']['input'];
  type: TreatmentType;
};

export type TreatmentResult = {
  __typename?: 'TreatmentResult';
  error?: Maybe<Error>;
  success?: Maybe<Scalars['Boolean']['output']>;
  treatment?: Maybe<Treatment>;
};

export enum TreatmentType {
  Antiparasitic = 'ANTIPARASITIC',
  Check = 'CHECK',
  Cure = 'CURE',
  Operation = 'OPERATION',
  Reminder = 'REMINDER',
  Tablet = 'TABLET',
  Training = 'TRAINING',
  Vaccine = 'VACCINE',
  Walk = 'WALK'
}

export type TreatmentUpdate = {
  booster_date?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  delete_old?: InputMaybe<Scalars['Boolean']['input']>;
  logs?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  treatmentDuration?: InputMaybe<TreatmentDuration>;
  type?: InputMaybe<TreatmentType>;
};

export type UpdateShelterPersonInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  source?: InputMaybe<ShelterPersonSource>;
  status?: InputMaybe<ShelterPersonStatus>;
};

export type User = {
  __typename?: 'User';
  created_at: Scalars['String']['output'];
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  last_activity?: Maybe<Scalars['String']['output']>;
  last_name: Scalars['String']['output'];
  ownerships?: Maybe<PaginatedOwnerships>;
  pets_on_loan: Scalars['Int']['output'];
  pets_owned: Scalars['Int']['output'];
  profile_picture?: Maybe<Media>;
  reports?: Maybe<PaginatedReports>;
  role: UserRole;
};


export type UserOwnershipsArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};


export type UserReportsArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};

export type UserCreate = {
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserDashboard = {
  __typename?: 'UserDashboard';
  ownerships?: Maybe<PaginatedOwnerships>;
  reports?: Maybe<PaginatedReports>;
  user_id?: Maybe<Scalars['String']['output']>;
};


export type UserDashboardOwnershipsArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};


export type UserDashboardReportsArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};

export type UserDashboardResult = {
  __typename?: 'UserDashboardResult';
  dashboard?: Maybe<UserDashboard>;
  error?: Maybe<Error>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UserResult = {
  __typename?: 'UserResult';
  error?: Maybe<Error>;
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export type UserUpdate = {
  email?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  last_activity?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
};

export type UsersResult = {
  __typename?: 'UsersResult';
  error?: Maybe<Error>;
  success: Scalars['Boolean']['output'];
  users: Array<Maybe<User>>;
};

export type Walk = {
  __typename?: 'Walk';
  created_at: Scalars['String']['output'];
  date: Scalars['String']['output'];
  distance_km: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  ratings?: Maybe<PaginatedWalkRatings>;
  treatment: MinTreatment;
};


export type WalkRatingsArgs = {
  commonSearch?: InputMaybe<CommonSearch>;
};

export type WalkCreate = {
  date: Scalars['String']['input'];
  distance_km: Scalars['Float']['input'];
  duration?: InputMaybe<TreatmentDuration>;
  health_card_id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type WalkRating = {
  __typename?: 'WalkRating';
  created_at: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  rating: Scalars['Int']['output'];
  type: WalkRatingType;
  walk: Walk;
};

export type WalkRatingChartData = {
  __typename?: 'WalkRatingChartData';
  labels: Array<Scalars['String']['output']>;
  series: Array<WalkRatingSeries>;
};

export type WalkRatingChartResult = {
  __typename?: 'WalkRatingChartResult';
  chart?: Maybe<WalkRatingChartData>;
  error?: Maybe<Error>;
  success: Scalars['Boolean']['output'];
};

export type WalkRatingCreate = {
  rating: Scalars['Int']['input'];
  type: WalkRatingType;
  walk_id: Scalars['ID']['input'];
};

export type WalkRatingResult = {
  __typename?: 'WalkRatingResult';
  error?: Maybe<Error>;
  success: Scalars['Boolean']['output'];
  walk_rating?: Maybe<WalkRating>;
};

export type WalkRatingSeries = {
  __typename?: 'WalkRatingSeries';
  data: Array<Maybe<Scalars['Float']['output']>>;
  type: WalkRatingType;
};

export enum WalkRatingType {
  Aggression = 'AGGRESSION',
  Behavior = 'BEHAVIOR',
  Calm = 'CALM',
  LeashPulling = 'LEASH_PULLING',
  Overall = 'OVERALL'
}

export type WalkRatingUpdate = {
  rating?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<WalkRatingType>;
};

export type WalkResult = {
  __typename?: 'WalkResult';
  error?: Maybe<Error>;
  success?: Maybe<Scalars['Boolean']['output']>;
  walk?: Maybe<Walk>;
};

export type WalkUpdate = {
  date?: InputMaybe<Scalars['String']['input']>;
  distance_km?: InputMaybe<Scalars['Float']['input']>;
  duration?: InputMaybe<TreatmentDuration>;
  notes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export enum Weekday {
  Fri = 'FRI',
  Mon = 'MON',
  Sat = 'SAT',
  Sun = 'SUN',
  Thu = 'THU',
  Tue = 'TUE',
  Wed = 'WED'
}

export enum TreatmentDuration {
  HalfHour = 'HALF_HOUR',
  Hour = 'HOUR',
  HourAndHalf = 'HOUR_AND_HALF',
  QuarterHour = 'QUARTER_HOUR',
  TenMinutes = 'TEN_MINUTES',
  ThreeQuarter = 'THREE_QUARTER',
  TwoHours = 'TWO_HOURS'
}

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'NewTokenResult', token?: string | null, error?: { __typename?: 'Error', code: string, message: string, extra?: string | null } | null, user?: { __typename?: 'User', id: string, role: UserRole, first_name: string, last_name: string, email: string } | null } };

export type GetDashboardQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDashboardQuery = { __typename?: 'Query', getDashboard: { __typename?: 'DashboardResult', success: boolean, dashboard?: { __typename?: 'Dashboard', all_pets: number, all_users: number, active_users: number, active_users_mean: number, active_users_percent: number, active_users_percent_stats: Array<number>, all_pet_stats: Array<number>, all_users_stats: Array<number>, active_users_stats: Array<number>, labels: Array<string> } | null, error?: { __typename?: 'Error', code: string, message: string } | null } };

export type GetRealTimeStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRealTimeStatsQuery = { __typename?: 'Query', getRealTimeStatistic: { __typename?: 'RealTimeStatisticResult', success: boolean, statistics?: { __typename?: 'DailyStats', all_pets: number, all_users: number, active_users: number, active_users_percent: number } | null, error?: { __typename?: 'Error', code: string, message: string } | null } };

export type AddPetToUserBoMutationVariables = Exact<{
  pet: PetCreate;
  userId: Scalars['String']['input'];
  custodyLevel?: InputMaybe<CustodyLevel>;
}>;


export type AddPetToUserBoMutation = { __typename?: 'Mutation', addPetToUser: { __typename?: 'PetAddedResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, data?: { __typename?: 'NewOwnership', pet: { __typename?: 'Pet', id: string, name: string }, ownership: { __typename?: 'Ownership', id: string } } | null } };

export type DeletePetOwnershipMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeletePetOwnershipMutation = { __typename?: 'Mutation', deleteOwnership: { __typename?: 'DeleteResult', success?: boolean | null, id?: string | null, error?: { __typename?: 'Error', code: string, extra?: string | null, message: string } | null } };

export type DeletePetMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeletePetMutation = { __typename?: 'Mutation', deletePet: { __typename?: 'DeleteResult', id?: string | null, success?: boolean | null, error?: { __typename?: 'Error', extra?: string | null, code: string, message: string } | null } };

export type FullPetFragment = { __typename?: 'Pet', id: string, name: string, birthday?: string | null, neutered?: boolean | null, gender?: Gender | null, weight_kg?: number | null, diet?: Array<string | null> | null, chip_code?: string | null, intollerance?: Array<string | null> | null, temperament?: string | null, disciplines?: Array<string | null> | null, breed?: string | null, coat_length?: CoatLength | null, years?: number | null, ownerships?: { __typename?: 'PaginatedOwnerships', items: Array<{ __typename?: 'Ownership', id: string, user: { __typename?: 'User', first_name: string, last_name: string, id: string, email: string } } | null> } | null };

export type GetPaginatedPetsQueryVariables = Exact<{
  search: CommonSearch;
}>;


export type GetPaginatedPetsQuery = { __typename?: 'Query', listPets: { __typename?: 'PaginatedPets', success: boolean, pagination: { __typename?: 'Pagination', total_items?: number | null, total_pages?: number | null, current_page?: number | null, page_size?: number | null }, error?: { __typename?: 'Error', message: string, code: string, extra?: string | null } | null, items: Array<{ __typename?: 'Pet', id: string, name: string, weight_kg?: number | null, birthday?: string | null, neutered?: boolean | null, chip_code?: string | null, gender?: Gender | null, breed?: string | null, years?: number | null } | null> } };

export type GetPetQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPetQuery = { __typename?: 'Query', getPet: { __typename?: 'PetResult', success: boolean, pet?: { __typename?: 'Pet', id: string, name: string, birthday?: string | null, neutered?: boolean | null, gender?: Gender | null, weight_kg?: number | null, diet?: Array<string | null> | null, chip_code?: string | null, intollerance?: Array<string | null> | null, temperament?: string | null, disciplines?: Array<string | null> | null, breed?: string | null, coat_length?: CoatLength | null, years?: number | null, ownerships?: { __typename?: 'PaginatedOwnerships', items: Array<{ __typename?: 'Ownership', id: string, user: { __typename?: 'User', first_name: string, last_name: string, id: string, email: string } } | null> } | null } | null, error?: { __typename?: 'Error', code: string, message: string } | null } };

export type GetPetOwnershipQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  commonSearch: CommonSearch;
}>;


export type GetPetOwnershipQuery = { __typename?: 'Query', getPet: { __typename?: 'PetResult', success: boolean, pet?: { __typename?: 'Pet', ownerships?: { __typename?: 'PaginatedOwnerships', success?: boolean | null, items: Array<{ __typename?: 'Ownership', id: string, custody_level: CustodyLevel, user: { __typename?: 'User', first_name: string, last_name: string, email: string, id: string } } | null>, pagination: { __typename?: 'Pagination', current_page?: number | null, page_size?: number | null, total_items?: number | null, total_pages?: number | null } } | null } | null, error?: { __typename?: 'Error', code: string, message: string, extra?: string | null } | null } };

export type GetPetTreatmentsQueryVariables = Exact<{
  petId: Scalars['String']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetPetTreatmentsQuery = { __typename?: 'Query', listTreatments: { __typename?: 'PaginatedTreatments', success?: boolean | null, error?: { __typename?: 'Error', code: string, message: string, extra?: string | null } | null, pagination: { __typename?: 'Pagination', page_size?: number | null, current_page?: number | null, total_pages?: number | null, total_items?: number | null }, items: Array<{ __typename?: 'Treatment', id: string, date: string, created_at: string, name: string, type: TreatmentType, booster?: { __typename?: 'Treatment', name: string, date: string, id: string } | null } | null> } };

export type SimplePetFragment = { __typename?: 'Pet', id: string, name: string, weight_kg?: number | null, birthday?: string | null, neutered?: boolean | null, chip_code?: string | null, gender?: Gender | null, breed?: string | null, years?: number | null };

export type PetOwnershipsFragment = { __typename?: 'PaginatedOwnerships', success?: boolean | null, items: Array<{ __typename?: 'Ownership', id: string, custody_level: CustodyLevel, user: { __typename?: 'User', first_name: string, last_name: string, email: string, id: string } } | null>, pagination: { __typename?: 'Pagination', current_page?: number | null, page_size?: number | null, total_items?: number | null, total_pages?: number | null } };

export type PetTreatmentFragment = { __typename?: 'Treatment', id: string, date: string, created_at: string, name: string, type: TreatmentType, booster?: { __typename?: 'Treatment', name: string, date: string, id: string } | null };

export type UpdatePetMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: PetUpdate;
}>;


export type UpdatePetMutation = { __typename?: 'Mutation', updatePet: { __typename?: 'PetResult', success: boolean, pet?: { __typename?: 'Pet', id: string, name: string, birthday?: string | null, neutered?: boolean | null, gender?: Gender | null, weight_kg?: number | null, diet?: Array<string | null> | null, chip_code?: string | null, intollerance?: Array<string | null> | null, temperament?: string | null, disciplines?: Array<string | null> | null, breed?: string | null, coat_length?: CoatLength | null, years?: number | null, ownerships?: { __typename?: 'PaginatedOwnerships', items: Array<{ __typename?: 'Ownership', id: string, user: { __typename?: 'User', first_name: string, last_name: string, id: string, email: string } } | null> } | null } | null, error?: { __typename?: 'Error', message: string, code: string } | null } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me: { __typename?: 'UserResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string, extra?: string | null } | null, user?: { __typename?: 'User', id: string, first_name: string, last_name: string, email: string, role: UserRole } | null } };

export type UpdateMeMutationVariables = Exact<{
  data: UserUpdate;
}>;


export type UpdateMeMutation = { __typename?: 'Mutation', updateMe: { __typename?: 'UserResult', user?: { __typename?: 'User', id: string, first_name: string, last_name: string, email: string, created_at: string } | null, error?: { __typename?: 'Error', code: string, message: string } | null } };

export type ListShelterBoxesBoQueryVariables = Exact<{
  search: CommonSearch;
}>;


export type ListShelterBoxesBoQuery = { __typename?: 'Query', listShelterBoxes: { __typename?: 'PaginatedShelterBoxes', success?: boolean | null, error?: { __typename?: 'Error', code: string, message: string } | null, pagination: { __typename?: 'Pagination', total_items?: number | null, total_pages?: number | null, current_page?: number | null, page_size?: number | null }, items: Array<{ __typename?: 'ShelterBox', id: string, created_at: string, label: string, capacity: number, status: BoxStatus, is_out_of_service: boolean, last_cleaned_at?: string | null, notes?: string | null, zone?: { __typename?: 'ShelterZone', id: string, name: string } | null, area?: { __typename?: 'ShelterArea', id: string, name: string } | null, current_occupants: Array<{ __typename?: 'ShelterPet', id: string, pet: { __typename?: 'Pet', id: string, name: string } }>, occupancy_history?: { __typename?: 'PaginatedBoxOccupancies', items: Array<{ __typename?: 'ShelterBoxOccupancy', id: string, entered_at: string, exited_at?: string | null, reason?: string | null, shelter_pet: { __typename?: 'ShelterPet', id: string, pet: { __typename?: 'Pet', id: string, name: string } }, moved_by?: { __typename?: 'User', id: string, first_name: string, last_name: string } | null } | null> } | null } | null> } };

export type UpdateShelterBoxBoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: ShelterBoxUpdate;
}>;


export type UpdateShelterBoxBoMutation = { __typename?: 'Mutation', updateShelterBox: { __typename?: 'ShelterBoxResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, box?: { __typename?: 'ShelterBox', id: string } | null } };

export type MarkBoxCleanedBoMutationVariables = Exact<{
  box_id: Scalars['ID']['input'];
}>;


export type MarkBoxCleanedBoMutation = { __typename?: 'Mutation', markBoxCleaned: { __typename?: 'ShelterBoxResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, box?: { __typename?: 'ShelterBox', id: string, last_cleaned_at?: string | null, status: BoxStatus } | null } };

export type DeleteShelterBoxBoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteShelterBoxBoMutation = { __typename?: 'Mutation', deleteShelterBox: { __typename?: 'DeleteResult', success?: boolean | null, id?: string | null, error?: { __typename?: 'Error', code: string, message: string } | null } };

export type MovePetBetweenBoxesBoMutationVariables = Exact<{
  shelter_pet_id: Scalars['ID']['input'];
  to_box_id: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
}>;


export type MovePetBetweenBoxesBoMutation = { __typename?: 'Mutation', movePetBetweenBoxes: { __typename?: 'ShelterBoxOccupancyResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, occupancy?: { __typename?: 'ShelterBoxOccupancy', id: string } | null } };

export type FullShelterMapBoFragment = { __typename?: 'ShelterMap', id: string, name: string, width: number, height: number, unit: MapUnit, zones: Array<{ __typename?: 'ShelterZone', id: string, name: string, x: number, y: number, width: number, height: number, color?: string | null }>, areas: Array<{ __typename?: 'ShelterArea', id: string, name: string, area_type: AreaType, x: number, y: number, width: number, height: number, color?: string | null, zone?: { __typename?: 'ShelterZone', id: string } | null }>, boxes: Array<{ __typename?: 'ShelterBox', id: string, label: string, x: number, y: number, width: number, height: number, rotation: number, capacity: number, status: BoxStatus, is_out_of_service: boolean, area?: { __typename?: 'ShelterArea', id: string } | null, zone?: { __typename?: 'ShelterZone', id: string } | null, occupancy_history?: { __typename?: 'PaginatedBoxOccupancies', items: Array<{ __typename?: 'ShelterBoxOccupancy', id: string, exited_at?: string | null, shelter_pet: { __typename?: 'ShelterPet', id: string, pet: { __typename?: 'Pet', id: string, name: string } } } | null> } | null }>, elements: Array<{ __typename?: 'ShelterMapElement', id: string, element_type: MapElementType, x: number, y: number, width: number, height: number, rotation: number, color?: string | null, label?: string | null }> };

export type ListShelterMapsBoQueryVariables = Exact<{
  commonSearch?: InputMaybe<CommonSearch>;
}>;


export type ListShelterMapsBoQuery = { __typename?: 'Query', listShelterMaps: { __typename?: 'PaginatedShelterMaps', success?: boolean | null, error?: { __typename?: 'Error', code: string, message: string } | null, items: Array<{ __typename?: 'ShelterMap', id: string, name: string, width: number, height: number, unit: MapUnit } | null> } };

export type GetShelterMapBoQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetShelterMapBoQuery = { __typename?: 'Query', getShelterMap: { __typename?: 'ShelterMapResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, map?: { __typename?: 'ShelterMap', id: string, name: string, width: number, height: number, unit: MapUnit, zones: Array<{ __typename?: 'ShelterZone', id: string, name: string, x: number, y: number, width: number, height: number, color?: string | null }>, areas: Array<{ __typename?: 'ShelterArea', id: string, name: string, area_type: AreaType, x: number, y: number, width: number, height: number, color?: string | null, zone?: { __typename?: 'ShelterZone', id: string } | null }>, boxes: Array<{ __typename?: 'ShelterBox', id: string, label: string, x: number, y: number, width: number, height: number, rotation: number, capacity: number, status: BoxStatus, is_out_of_service: boolean, area?: { __typename?: 'ShelterArea', id: string } | null, zone?: { __typename?: 'ShelterZone', id: string } | null, occupancy_history?: { __typename?: 'PaginatedBoxOccupancies', items: Array<{ __typename?: 'ShelterBoxOccupancy', id: string, exited_at?: string | null, shelter_pet: { __typename?: 'ShelterPet', id: string, pet: { __typename?: 'Pet', id: string, name: string } } } | null> } | null }>, elements: Array<{ __typename?: 'ShelterMapElement', id: string, element_type: MapElementType, x: number, y: number, width: number, height: number, rotation: number, color?: string | null, label?: string | null }> } | null } };

export type CreateShelterMapBoMutationVariables = Exact<{
  data: ShelterMapCreate;
}>;


export type CreateShelterMapBoMutation = { __typename?: 'Mutation', createShelterMap: { __typename?: 'ShelterMapResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, map?: { __typename?: 'ShelterMap', id: string, name: string, width: number, height: number, unit: MapUnit, zones: Array<{ __typename?: 'ShelterZone', id: string, name: string, x: number, y: number, width: number, height: number, color?: string | null }>, areas: Array<{ __typename?: 'ShelterArea', id: string, name: string, area_type: AreaType, x: number, y: number, width: number, height: number, color?: string | null, zone?: { __typename?: 'ShelterZone', id: string } | null }>, boxes: Array<{ __typename?: 'ShelterBox', id: string, label: string, x: number, y: number, width: number, height: number, rotation: number, capacity: number, status: BoxStatus, is_out_of_service: boolean, area?: { __typename?: 'ShelterArea', id: string } | null, zone?: { __typename?: 'ShelterZone', id: string } | null, occupancy_history?: { __typename?: 'PaginatedBoxOccupancies', items: Array<{ __typename?: 'ShelterBoxOccupancy', id: string, exited_at?: string | null, shelter_pet: { __typename?: 'ShelterPet', id: string, pet: { __typename?: 'Pet', id: string, name: string } } } | null> } | null }>, elements: Array<{ __typename?: 'ShelterMapElement', id: string, element_type: MapElementType, x: number, y: number, width: number, height: number, rotation: number, color?: string | null, label?: string | null }> } | null } };

export type UpdateShelterMapBoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: ShelterMapUpdate;
}>;


export type UpdateShelterMapBoMutation = { __typename?: 'Mutation', updateShelterMap: { __typename?: 'ShelterMapResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, map?: { __typename?: 'ShelterMap', id: string, name: string, width: number, height: number, unit: MapUnit, zones: Array<{ __typename?: 'ShelterZone', id: string, name: string, x: number, y: number, width: number, height: number, color?: string | null }>, areas: Array<{ __typename?: 'ShelterArea', id: string, name: string, area_type: AreaType, x: number, y: number, width: number, height: number, color?: string | null, zone?: { __typename?: 'ShelterZone', id: string } | null }>, boxes: Array<{ __typename?: 'ShelterBox', id: string, label: string, x: number, y: number, width: number, height: number, rotation: number, capacity: number, status: BoxStatus, is_out_of_service: boolean, area?: { __typename?: 'ShelterArea', id: string } | null, zone?: { __typename?: 'ShelterZone', id: string } | null, occupancy_history?: { __typename?: 'PaginatedBoxOccupancies', items: Array<{ __typename?: 'ShelterBoxOccupancy', id: string, exited_at?: string | null, shelter_pet: { __typename?: 'ShelterPet', id: string, pet: { __typename?: 'Pet', id: string, name: string } } } | null> } | null }>, elements: Array<{ __typename?: 'ShelterMapElement', id: string, element_type: MapElementType, x: number, y: number, width: number, height: number, rotation: number, color?: string | null, label?: string | null }> } | null } };

export type SaveShelterMapLayoutBoMutationVariables = Exact<{
  map_id: Scalars['ID']['input'];
  data: ShelterMapLayoutInput;
}>;


export type SaveShelterMapLayoutBoMutation = { __typename?: 'Mutation', saveShelterMapLayout: { __typename?: 'ShelterMapResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, map?: { __typename?: 'ShelterMap', id: string, name: string, width: number, height: number, unit: MapUnit, zones: Array<{ __typename?: 'ShelterZone', id: string, name: string, x: number, y: number, width: number, height: number, color?: string | null }>, areas: Array<{ __typename?: 'ShelterArea', id: string, name: string, area_type: AreaType, x: number, y: number, width: number, height: number, color?: string | null, zone?: { __typename?: 'ShelterZone', id: string } | null }>, boxes: Array<{ __typename?: 'ShelterBox', id: string, label: string, x: number, y: number, width: number, height: number, rotation: number, capacity: number, status: BoxStatus, is_out_of_service: boolean, area?: { __typename?: 'ShelterArea', id: string } | null, zone?: { __typename?: 'ShelterZone', id: string } | null, occupancy_history?: { __typename?: 'PaginatedBoxOccupancies', items: Array<{ __typename?: 'ShelterBoxOccupancy', id: string, exited_at?: string | null, shelter_pet: { __typename?: 'ShelterPet', id: string, pet: { __typename?: 'Pet', id: string, name: string } } } | null> } | null }>, elements: Array<{ __typename?: 'ShelterMapElement', id: string, element_type: MapElementType, x: number, y: number, width: number, height: number, rotation: number, color?: string | null, label?: string | null }> } | null } };

export type AssignPetToBoxBoMutationVariables = Exact<{
  box_id: Scalars['ID']['input'];
  shelter_pet_id: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
}>;


export type AssignPetToBoxBoMutation = { __typename?: 'Mutation', assignPetToBox: { __typename?: 'ShelterBoxOccupancyResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, occupancy?: { __typename?: 'ShelterBoxOccupancy', id: string } | null } };

export type ReleasePetFromBoxBoMutationVariables = Exact<{
  occupancy_id: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
}>;


export type ReleasePetFromBoxBoMutation = { __typename?: 'Mutation', releasePetFromBox: { __typename?: 'ShelterBoxOccupancyResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, occupancy?: { __typename?: 'ShelterBoxOccupancy', id: string } | null } };

export type CreateShelterPersonBoMutationVariables = Exact<{
  data: CreateShelterPersonInput;
}>;


export type CreateShelterPersonBoMutation = { __typename?: 'Mutation', createShelterPerson: { __typename?: 'ShelterPersonResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter_person?: { __typename?: 'ShelterPerson', id: string } | null } };

export type ArchiveShelterPersonBoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ArchiveShelterPersonBoMutation = { __typename?: 'Mutation', archiveShelterPerson: { __typename?: 'ShelterPersonResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter_person?: { __typename?: 'ShelterPerson', id: string } | null } };

export type CreateShelterInviteBoMutationVariables = Exact<{
  data: ShelterInviteCreate;
}>;


export type CreateShelterInviteBoMutation = { __typename?: 'Mutation', createShelterInvite: { __typename?: 'ShelterInviteResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter_invite?: { __typename?: 'ShelterInvite', id: string, status: ShelterInviteStatus } | null } };

export type CreateShelterRoleBoMutationVariables = Exact<{
  data: ShelterRoleCreate;
}>;


export type CreateShelterRoleBoMutation = { __typename?: 'Mutation', createShelterRole: { __typename?: 'ShelterRoleResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter_role?: { __typename?: 'ShelterRole', id: string } | null } };

export type UpdateShelterRoleBoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: ShelterRoleUpdate;
}>;


export type UpdateShelterRoleBoMutation = { __typename?: 'Mutation', updateShelterRole: { __typename?: 'ShelterRoleResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter_role?: { __typename?: 'ShelterRole', id: string, role: RoleLevel } | null } };

export type DeleteShelterRoleBoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteShelterRoleBoMutation = { __typename?: 'Mutation', deleteShelterRole: { __typename?: 'DeleteResult', success?: boolean | null, id?: string | null, error?: { __typename?: 'Error', code: string, message: string } | null } };

export type CreateShelterPetsWithDataBoMutationVariables = Exact<{
  data: ShelterPetsWithDataCreate;
}>;


export type CreateShelterPetsWithDataBoMutation = { __typename?: 'Mutation', createShelterPetsWithData: { __typename?: 'ShelterPetsResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter_pets?: Array<{ __typename?: 'ShelterPet', id: string } | null> | null } };

export type CreateShelterPetBoMutationVariables = Exact<{
  data: ShelterPetCreate;
}>;


export type CreateShelterPetBoMutation = { __typename?: 'Mutation', createShelterPet: { __typename?: 'ShelterPetResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter_pet?: { __typename?: 'ShelterPet', id: string } | null } };

export type DeleteShelterPetBoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteShelterPetBoMutation = { __typename?: 'Mutation', deleteShelterPet: { __typename?: 'DeleteResult', success?: boolean | null, id?: string | null, error?: { __typename?: 'Error', code: string, message: string } | null } };

export type CreateShelterInventoryItemBoMutationVariables = Exact<{
  data: ShelterInventoryItemCreate;
}>;


export type CreateShelterInventoryItemBoMutation = { __typename?: 'Mutation', createShelterInventoryItem: { __typename?: 'ShelterInventoryItemResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, item?: { __typename?: 'ShelterInventoryItem', id: string } | null } };

export type CreateShelterInventoryMovementBoMutationVariables = Exact<{
  data: ShelterInventoryMovementCreate;
}>;


export type CreateShelterInventoryMovementBoMutation = { __typename?: 'Mutation', createShelterInventoryMovement: { __typename?: 'ShelterInventoryMovementResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, movement?: { __typename?: 'ShelterInventoryMovement', id: string } | null } };

export type ArchiveShelterInventoryItemBoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ArchiveShelterInventoryItemBoMutation = { __typename?: 'Mutation', archiveShelterInventoryItem: { __typename?: 'ShelterInventoryItemResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, item?: { __typename?: 'ShelterInventoryItem', id: string } | null } };

export type DeleteShelterInventoryItemBoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteShelterInventoryItemBoMutation = { __typename?: 'Mutation', deleteShelterInventoryItem: { __typename?: 'DeleteResult', success?: boolean | null, id?: string | null, error?: { __typename?: 'Error', code: string, message: string } | null } };

export type CreateShelterWalkBoMutationVariables = Exact<{
  data: ShelterWalkCreate;
}>;


export type CreateShelterWalkBoMutation = { __typename?: 'Mutation', createShelterWalk: { __typename?: 'ShelterWalkResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter_walk?: { __typename?: 'ShelterWalk', id: string } | null } };

export type StartShelterWalkBoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type StartShelterWalkBoMutation = { __typename?: 'Mutation', startShelterWalk: { __typename?: 'ShelterWalkResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter_walk?: { __typename?: 'ShelterWalk', id: string, status: ShelterWalkStatus } | null } };

export type CompleteShelterWalkBoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
}>;


export type CompleteShelterWalkBoMutation = { __typename?: 'Mutation', completeShelterWalk: { __typename?: 'ShelterWalkResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter_walk?: { __typename?: 'ShelterWalk', id: string, status: ShelterWalkStatus } | null } };

export type CancelShelterWalkBoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
}>;


export type CancelShelterWalkBoMutation = { __typename?: 'Mutation', cancelShelterWalk: { __typename?: 'ShelterWalkResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter_walk?: { __typename?: 'ShelterWalk', id: string, status: ShelterWalkStatus } | null } };

export type DeleteShelterWalkBoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteShelterWalkBoMutation = { __typename?: 'Mutation', deleteShelterWalk: { __typename?: 'DeleteResult', success?: boolean | null, id?: string | null, error?: { __typename?: 'Error', code: string, message: string } | null } };

export type CreateShelterTaskBoMutationVariables = Exact<{
  data: ShelterTaskCreate;
}>;


export type CreateShelterTaskBoMutation = { __typename?: 'Mutation', createShelterTask: { __typename?: 'ShelterTaskResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter_task?: { __typename?: 'ShelterTask', id: string } | null } };

export type CompleteShelterTaskBoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
}>;


export type CompleteShelterTaskBoMutation = { __typename?: 'Mutation', completeShelterTask: { __typename?: 'ShelterTaskResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter_task?: { __typename?: 'ShelterTask', id: string, status: TaskStatus } | null } };

export type SkipShelterTaskBoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
}>;


export type SkipShelterTaskBoMutation = { __typename?: 'Mutation', skipShelterTask: { __typename?: 'ShelterTaskResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter_task?: { __typename?: 'ShelterTask', id: string, status: TaskStatus } | null } };

export type DeleteShelterTaskBoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteShelterTaskBoMutation = { __typename?: 'Mutation', deleteShelterTask: { __typename?: 'DeleteResult', success?: boolean | null, id?: string | null, error?: { __typename?: 'Error', code: string, message: string } | null } };

export type ListSheltersQueryVariables = Exact<{
  search: CommonSearch;
}>;


export type ListSheltersQuery = { __typename?: 'Query', listShelters: { __typename?: 'PaginatedShelters', success?: boolean | null, error?: { __typename?: 'Error', code: string, message: string } | null, pagination: { __typename?: 'Pagination', total_items?: number | null, total_pages?: number | null, current_page?: number | null, page_size?: number | null }, items: Array<{ __typename?: 'Shelter', id: string, name: string, city: string, province_code: string, type: ShelterType, verification_status: ShelterVerificationStatus, created_at: string } | null> } };

export type GetShelterQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetShelterQuery = { __typename?: 'Query', getShelter: { __typename?: 'ShelterResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, shelter?: { __typename?: 'Shelter', id: string, name: string, street: string, street_number: string, city: string, province_code: string, postal_code: string, region?: string | null, type: ShelterType, verification_status: ShelterVerificationStatus, visibility: ShelterVisibility, accepts_volunteers: boolean, public_contact_email?: string | null, public_contact_phone?: string | null, created_at: string } | null } };

export type ListShelterPeopleQueryVariables = Exact<{
  shelter_id: Scalars['ID']['input'];
  search?: InputMaybe<CommonSearch>;
}>;


export type ListShelterPeopleQuery = { __typename?: 'Query', listShelterPeople: { __typename?: 'PaginatedShelterPeople', success?: boolean | null, error?: { __typename?: 'Error', code: string, message: string } | null, pagination: { __typename?: 'Pagination', total_items?: number | null, total_pages?: number | null, current_page?: number | null, page_size?: number | null }, items: Array<{ __typename?: 'ShelterPerson', id: string, created_at: string, first_name?: string | null, last_name?: string | null, email?: string | null, phone?: string | null, status: ShelterPersonStatus, source: ShelterPersonSource, notes?: string | null, user?: { __typename?: 'User', id: string, first_name: string, last_name: string, email: string } | null } | null> } };

export type ListShelterRolesBoQueryVariables = Exact<{
  search: CommonSearch;
}>;


export type ListShelterRolesBoQuery = { __typename?: 'Query', listShelterRoles: { __typename?: 'PaginatedShelterRoles', success?: boolean | null, error?: { __typename?: 'Error', code: string, message: string } | null, pagination: { __typename?: 'Pagination', total_items?: number | null, total_pages?: number | null, current_page?: number | null, page_size?: number | null }, items: Array<{ __typename?: 'ShelterRole', id: string, created_at: string, role: RoleLevel, user: { __typename?: 'User', id: string, first_name: string, last_name: string, email: string } } | null> } };

export type ListShelterPetsBoQueryVariables = Exact<{
  search: CommonSearch;
}>;


export type ListShelterPetsBoQuery = { __typename?: 'Query', listShelterPets: { __typename?: 'PaginatedShelterPets', success?: boolean | null, error?: { __typename?: 'Error', code: string, message: string } | null, pagination: { __typename?: 'Pagination', total_items?: number | null, total_pages?: number | null, current_page?: number | null, page_size?: number | null }, items: Array<{ __typename?: 'ShelterPet', id: string, created_at: string, is_active: boolean, left_at?: string | null, pet: { __typename?: 'Pet', id: string, name: string, gender?: Gender | null, breed?: string | null, birthday?: string | null, chip_code?: string | null } } | null> } };

export type ListShelterInventoryItemsBoQueryVariables = Exact<{
  search: CommonSearch;
}>;


export type ListShelterInventoryItemsBoQuery = { __typename?: 'Query', listShelterInventoryItems: { __typename?: 'PaginatedInventoryItems', success?: boolean | null, error?: { __typename?: 'Error', code: string, message: string } | null, pagination: { __typename?: 'Pagination', total_items?: number | null, total_pages?: number | null, current_page?: number | null, page_size?: number | null }, items: Array<{ __typename?: 'ShelterInventoryItem', id: string, name: string, category: InventoryCategory, unit: string, minimum_threshold?: number | null, current_quantity: number, is_below_threshold: boolean, is_active: boolean, notes?: string | null } | null> } };

export type ListOperationalShelterWalksBoQueryVariables = Exact<{
  shelter_id: Scalars['ID']['input'];
}>;


export type ListOperationalShelterWalksBoQuery = { __typename?: 'Query', listOperationalShelterWalks: { __typename?: 'PaginatedShelterWalks', success?: boolean | null, error?: { __typename?: 'Error', code: string, message: string } | null, items: Array<{ __typename?: 'ShelterWalk', id: string, created_at: string, status: ShelterWalkStatus, scheduled_at?: string | null, started_at?: string | null, ended_at?: string | null, duration_minutes?: number | null, notes?: string | null, shelter_pet: { __typename?: 'ShelterPet', id: string, pet: { __typename?: 'Pet', id: string, name: string } }, walker?: { __typename?: 'User', id: string, first_name: string, last_name: string } | null, walker_shelter_person?: { __typename?: 'ShelterPerson', id: string, first_name?: string | null, last_name?: string | null } | null } | null> } };

export type MyShelterAuthorizationBoQueryVariables = Exact<{
  shelter_id: Scalars['ID']['input'];
}>;


export type MyShelterAuthorizationBoQuery = { __typename?: 'Query', myShelterAuthorization: { __typename?: 'ShelterAuthorizationResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, authorization?: { __typename?: 'ShelterAuthorization', shelter_id: string, membership_status?: string | null, permissions: Array<string> } | null } };

export type ListOperationalShelterTasksBoQueryVariables = Exact<{
  shelter_id: Scalars['ID']['input'];
}>;


export type ListOperationalShelterTasksBoQuery = { __typename?: 'Query', listOperationalShelterTasks: { __typename?: 'PaginatedShelterTasks', success?: boolean | null, error?: { __typename?: 'Error', code: string, message: string } | null, items: Array<{ __typename?: 'ShelterTask', id: string, created_at: string, task_type: ShelterTaskType, area?: string | null, status: TaskStatus, scheduled_at?: string | null, scheduled_date?: string | null, is_recurring: boolean, notes?: string | null, shelter_pet?: { __typename?: 'ShelterPet', id: string, pet: { __typename?: 'Pet', id: string, name: string } } | null, assignees: Array<{ __typename?: 'User', id: string, first_name: string, last_name: string }>, assignee_shelter_people: Array<{ __typename?: 'ShelterPerson', id: string, first_name?: string | null, last_name?: string | null }> } | null> } };

export type GetGroupedStatsQueryVariables = Exact<{
  dateFrom: Scalars['String']['input'];
  dateTo?: InputMaybe<Scalars['String']['input']>;
  group: Scalars['String']['input'];
}>;


export type GetGroupedStatsQuery = { __typename?: 'Query', getGroupedStatistics: { __typename?: 'StatisticsResult', success: boolean, statistics?: { __typename?: 'Statistics', all_pets: Array<number>, all_users: Array<number>, active_users_min: Array<number>, active_users_mean: Array<number>, active_users_max: Array<number>, labels: Array<string> } | null, error?: { __typename?: 'Error', code: string, message: string } | null } };

export type CreateUserBoMutationVariables = Exact<{
  data: UserCreate;
}>;


export type CreateUserBoMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserResult', success: boolean, error?: { __typename?: 'Error', code: string, message: string } | null, user?: { __typename?: 'User', id: string, first_name: string, last_name: string, email: string } | null } };

export type FullUserFragment = { __typename?: 'User', id: string, email: string, last_name: string, first_name: string, role: UserRole, created_at: string, profile_picture?: { __typename?: 'Media', type: string, id: string } | null };

export type GetPaginatedUsersQueryVariables = Exact<{
  search: CommonSearch;
}>;


export type GetPaginatedUsersQuery = { __typename?: 'Query', listUsers: { __typename?: 'PaginatedUsers', success?: boolean | null, pagination: { __typename?: 'Pagination', total_items?: number | null, total_pages?: number | null, current_page?: number | null, page_size?: number | null }, error?: { __typename?: 'Error', message: string, code: string, extra?: string | null } | null, items: Array<{ __typename?: 'User', id: string, email: string, last_name: string, first_name: string, role: UserRole, created_at: string, pets_owned: number, pets_on_loan: number } | null> } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'UserResult', success: boolean, user?: { __typename?: 'User', id: string, email: string, last_name: string, first_name: string, role: UserRole, created_at: string, profile_picture?: { __typename?: 'Media', type: string, id: string } | null } | null, error?: { __typename?: 'Error', code: string, message: string, extra?: string | null } | null } };

export type GetUserOwnershipQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  commonSearch: CommonSearch;
}>;


export type GetUserOwnershipQuery = { __typename?: 'Query', getUser: { __typename?: 'UserResult', success: boolean, user?: { __typename?: 'User', ownerships?: { __typename?: 'PaginatedOwnerships', success?: boolean | null, items: Array<{ __typename?: 'Ownership', id: string, custody_level: CustodyLevel, pet: { __typename?: 'Pet', birthday?: string | null, chip_code?: string | null, diet?: Array<string | null> | null, disciplines?: Array<string | null> | null, gender?: Gender | null, id: string, intollerance?: Array<string | null> | null, name: string, neutered?: boolean | null, temperament?: string | null, weight_kg?: number | null } } | null>, pagination: { __typename?: 'Pagination', current_page?: number | null, page_size?: number | null, total_items?: number | null, total_pages?: number | null } } | null } | null, error?: { __typename?: 'Error', code: string, message: string, extra?: string | null } | null } };

export type GetUserTreatmentsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetUserTreatmentsQuery = { __typename?: 'Query', listTreatments: { __typename?: 'PaginatedTreatments', success?: boolean | null, error?: { __typename?: 'Error', code: string, message: string, extra?: string | null } | null, pagination: { __typename?: 'Pagination', page_size?: number | null, current_page?: number | null, total_pages?: number | null, total_items?: number | null }, items: Array<{ __typename?: 'Treatment', id: string, date: string, name: string, type: TreatmentType, created_at: string, booster?: { __typename?: 'Treatment', name: string, date: string, id: string } | null, health_card?: { __typename?: 'HealthCard', pet: { __typename?: 'Pet', id: string, name: string } } | null } | null> } };

export type ListUserFragment = { __typename?: 'User', id: string, email: string, last_name: string, first_name: string, role: UserRole, created_at: string, pets_owned: number, pets_on_loan: number };

export type UserOwnershipsFragment = { __typename?: 'PaginatedOwnerships', success?: boolean | null, items: Array<{ __typename?: 'Ownership', id: string, custody_level: CustodyLevel, pet: { __typename?: 'Pet', birthday?: string | null, chip_code?: string | null, diet?: Array<string | null> | null, disciplines?: Array<string | null> | null, gender?: Gender | null, id: string, intollerance?: Array<string | null> | null, name: string, neutered?: boolean | null, temperament?: string | null, weight_kg?: number | null } } | null>, pagination: { __typename?: 'Pagination', current_page?: number | null, page_size?: number | null, total_items?: number | null, total_pages?: number | null } };

export type UserTreatmentFragment = { __typename?: 'Treatment', id: string, date: string, name: string, type: TreatmentType, created_at: string, booster?: { __typename?: 'Treatment', name: string, date: string, id: string } | null, health_card?: { __typename?: 'HealthCard', pet: { __typename?: 'Pet', id: string, name: string } } | null };

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
export const FullShelterMapBoFragmentDoc = gql`
    fragment FullShelterMapBO on ShelterMap {
  id
  name
  width
  height
  unit
  zones {
    id
    name
    x
    y
    width
    height
    color
  }
  areas {
    id
    name
    area_type
    x
    y
    width
    height
    color
    zone {
      id
    }
  }
  boxes {
    id
    label
    x
    y
    width
    height
    rotation
    capacity
    status
    is_out_of_service
    area {
      id
    }
    zone {
      id
    }
    occupancy_history {
      items {
        id
        exited_at
        shelter_pet {
          id
          pet {
            id
            name
          }
        }
      }
    }
  }
  elements {
    id
    element_type
    x
    y
    width
    height
    rotation
    color
    label
  }
}
    `;
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
export const ListUserFragmentDoc = gql`
    fragment ListUser on User {
  id
  email
  last_name
  first_name
  role
  created_at
  pets_owned
  pets_on_loan
}
    `;
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
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    error {
      code
      message
      extra
    }
    user {
      id
      role
      first_name
      last_name
      email
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GetDashboardDocument = gql`
    query getDashboard {
  getDashboard {
    dashboard {
      all_pets
      all_users
      active_users
      active_users_mean
      active_users_percent
      active_users_percent_stats
      all_pet_stats
      all_users_stats
      active_users_stats
      labels
    }
    success
    error {
      code
      message
    }
  }
}
    `;

/**
 * __useGetDashboardQuery__
 *
 * To run a query within a React component, call `useGetDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDashboardQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDashboardQuery(baseOptions?: Apollo.QueryHookOptions<GetDashboardQuery, GetDashboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDashboardQuery, GetDashboardQueryVariables>(GetDashboardDocument, options);
      }
export function useGetDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDashboardQuery, GetDashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDashboardQuery, GetDashboardQueryVariables>(GetDashboardDocument, options);
        }
export function useGetDashboardSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDashboardQuery, GetDashboardQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDashboardQuery, GetDashboardQueryVariables>(GetDashboardDocument, options);
        }
export type GetDashboardQueryHookResult = ReturnType<typeof useGetDashboardQuery>;
export type GetDashboardLazyQueryHookResult = ReturnType<typeof useGetDashboardLazyQuery>;
export type GetDashboardSuspenseQueryHookResult = ReturnType<typeof useGetDashboardSuspenseQuery>;
export type GetDashboardQueryResult = Apollo.QueryResult<GetDashboardQuery, GetDashboardQueryVariables>;
export const GetRealTimeStatsDocument = gql`
    query getRealTimeStats {
  getRealTimeStatistic {
    statistics {
      all_pets
      all_users
      active_users
      active_users_percent
    }
    success
    error {
      code
      message
    }
  }
}
    `;

/**
 * __useGetRealTimeStatsQuery__
 *
 * To run a query within a React component, call `useGetRealTimeStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRealTimeStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRealTimeStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRealTimeStatsQuery(baseOptions?: Apollo.QueryHookOptions<GetRealTimeStatsQuery, GetRealTimeStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRealTimeStatsQuery, GetRealTimeStatsQueryVariables>(GetRealTimeStatsDocument, options);
      }
export function useGetRealTimeStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRealTimeStatsQuery, GetRealTimeStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRealTimeStatsQuery, GetRealTimeStatsQueryVariables>(GetRealTimeStatsDocument, options);
        }
export function useGetRealTimeStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRealTimeStatsQuery, GetRealTimeStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRealTimeStatsQuery, GetRealTimeStatsQueryVariables>(GetRealTimeStatsDocument, options);
        }
export type GetRealTimeStatsQueryHookResult = ReturnType<typeof useGetRealTimeStatsQuery>;
export type GetRealTimeStatsLazyQueryHookResult = ReturnType<typeof useGetRealTimeStatsLazyQuery>;
export type GetRealTimeStatsSuspenseQueryHookResult = ReturnType<typeof useGetRealTimeStatsSuspenseQuery>;
export type GetRealTimeStatsQueryResult = Apollo.QueryResult<GetRealTimeStatsQuery, GetRealTimeStatsQueryVariables>;
export const AddPetToUserBoDocument = gql`
    mutation addPetToUserBO($pet: PetCreate!, $userId: String!, $custodyLevel: CustodyLevel) {
  addPetToUser(pet: $pet, userId: $userId, custodyLevel: $custodyLevel) {
    success
    error {
      code
      message
    }
    data {
      pet {
        id
        name
      }
      ownership {
        id
      }
    }
  }
}
    `;
export type AddPetToUserBoMutationFn = Apollo.MutationFunction<AddPetToUserBoMutation, AddPetToUserBoMutationVariables>;

/**
 * __useAddPetToUserBoMutation__
 *
 * To run a mutation, you first call `useAddPetToUserBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPetToUserBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPetToUserBoMutation, { data, loading, error }] = useAddPetToUserBoMutation({
 *   variables: {
 *      pet: // value for 'pet'
 *      userId: // value for 'userId'
 *      custodyLevel: // value for 'custodyLevel'
 *   },
 * });
 */
export function useAddPetToUserBoMutation(baseOptions?: Apollo.MutationHookOptions<AddPetToUserBoMutation, AddPetToUserBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPetToUserBoMutation, AddPetToUserBoMutationVariables>(AddPetToUserBoDocument, options);
      }
export type AddPetToUserBoMutationHookResult = ReturnType<typeof useAddPetToUserBoMutation>;
export type AddPetToUserBoMutationResult = Apollo.MutationResult<AddPetToUserBoMutation>;
export type AddPetToUserBoMutationOptions = Apollo.BaseMutationOptions<AddPetToUserBoMutation, AddPetToUserBoMutationVariables>;
export const DeletePetOwnershipDocument = gql`
    mutation deletePetOwnership($id: ID!) {
  deleteOwnership(id: $id) {
    success
    id
    error {
      code
      extra
      message
    }
  }
}
    `;
export type DeletePetOwnershipMutationFn = Apollo.MutationFunction<DeletePetOwnershipMutation, DeletePetOwnershipMutationVariables>;

/**
 * __useDeletePetOwnershipMutation__
 *
 * To run a mutation, you first call `useDeletePetOwnershipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePetOwnershipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePetOwnershipMutation, { data, loading, error }] = useDeletePetOwnershipMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePetOwnershipMutation(baseOptions?: Apollo.MutationHookOptions<DeletePetOwnershipMutation, DeletePetOwnershipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePetOwnershipMutation, DeletePetOwnershipMutationVariables>(DeletePetOwnershipDocument, options);
      }
export type DeletePetOwnershipMutationHookResult = ReturnType<typeof useDeletePetOwnershipMutation>;
export type DeletePetOwnershipMutationResult = Apollo.MutationResult<DeletePetOwnershipMutation>;
export type DeletePetOwnershipMutationOptions = Apollo.BaseMutationOptions<DeletePetOwnershipMutation, DeletePetOwnershipMutationVariables>;
export const DeletePetDocument = gql`
    mutation deletePet($id: ID!) {
  deletePet(id: $id) {
    id
    success
    error {
      extra
      code
      message
    }
  }
}
    `;
export type DeletePetMutationFn = Apollo.MutationFunction<DeletePetMutation, DeletePetMutationVariables>;

/**
 * __useDeletePetMutation__
 *
 * To run a mutation, you first call `useDeletePetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePetMutation, { data, loading, error }] = useDeletePetMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePetMutation(baseOptions?: Apollo.MutationHookOptions<DeletePetMutation, DeletePetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePetMutation, DeletePetMutationVariables>(DeletePetDocument, options);
      }
export type DeletePetMutationHookResult = ReturnType<typeof useDeletePetMutation>;
export type DeletePetMutationResult = Apollo.MutationResult<DeletePetMutation>;
export type DeletePetMutationOptions = Apollo.BaseMutationOptions<DeletePetMutation, DeletePetMutationVariables>;
export const GetPaginatedPetsDocument = gql`
    query getPaginatedPets($search: CommonSearch!) {
  listPets(commonSearch: $search) {
    pagination {
      total_items
      total_pages
      current_page
      page_size
    }
    success
    error {
      message
      code
      extra
    }
    items {
      ...SimplePet
    }
  }
}
    ${SimplePetFragmentDoc}`;

/**
 * __useGetPaginatedPetsQuery__
 *
 * To run a query within a React component, call `useGetPaginatedPetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaginatedPetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaginatedPetsQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useGetPaginatedPetsQuery(baseOptions: Apollo.QueryHookOptions<GetPaginatedPetsQuery, GetPaginatedPetsQueryVariables> & ({ variables: GetPaginatedPetsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaginatedPetsQuery, GetPaginatedPetsQueryVariables>(GetPaginatedPetsDocument, options);
      }
export function useGetPaginatedPetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaginatedPetsQuery, GetPaginatedPetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaginatedPetsQuery, GetPaginatedPetsQueryVariables>(GetPaginatedPetsDocument, options);
        }
export function useGetPaginatedPetsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPaginatedPetsQuery, GetPaginatedPetsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPaginatedPetsQuery, GetPaginatedPetsQueryVariables>(GetPaginatedPetsDocument, options);
        }
export type GetPaginatedPetsQueryHookResult = ReturnType<typeof useGetPaginatedPetsQuery>;
export type GetPaginatedPetsLazyQueryHookResult = ReturnType<typeof useGetPaginatedPetsLazyQuery>;
export type GetPaginatedPetsSuspenseQueryHookResult = ReturnType<typeof useGetPaginatedPetsSuspenseQuery>;
export type GetPaginatedPetsQueryResult = Apollo.QueryResult<GetPaginatedPetsQuery, GetPaginatedPetsQueryVariables>;
export const GetPetDocument = gql`
    query getPet($id: ID!) {
  getPet(id: $id) {
    pet {
      ...FullPet
    }
    success
    error {
      code
      message
    }
  }
}
    ${FullPetFragmentDoc}`;

/**
 * __useGetPetQuery__
 *
 * To run a query within a React component, call `useGetPetQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPetQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPetQuery(baseOptions: Apollo.QueryHookOptions<GetPetQuery, GetPetQueryVariables> & ({ variables: GetPetQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPetQuery, GetPetQueryVariables>(GetPetDocument, options);
      }
export function useGetPetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPetQuery, GetPetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPetQuery, GetPetQueryVariables>(GetPetDocument, options);
        }
export function useGetPetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPetQuery, GetPetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPetQuery, GetPetQueryVariables>(GetPetDocument, options);
        }
export type GetPetQueryHookResult = ReturnType<typeof useGetPetQuery>;
export type GetPetLazyQueryHookResult = ReturnType<typeof useGetPetLazyQuery>;
export type GetPetSuspenseQueryHookResult = ReturnType<typeof useGetPetSuspenseQuery>;
export type GetPetQueryResult = Apollo.QueryResult<GetPetQuery, GetPetQueryVariables>;
export const GetPetOwnershipDocument = gql`
    query getPetOwnership($id: ID!, $commonSearch: CommonSearch!) {
  getPet(id: $id) {
    pet {
      ownerships(commonSearch: $commonSearch) {
        ...PetOwnerships
      }
    }
    success
    error {
      code
      message
      extra
    }
  }
}
    ${PetOwnershipsFragmentDoc}`;

/**
 * __useGetPetOwnershipQuery__
 *
 * To run a query within a React component, call `useGetPetOwnershipQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPetOwnershipQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPetOwnershipQuery({
 *   variables: {
 *      id: // value for 'id'
 *      commonSearch: // value for 'commonSearch'
 *   },
 * });
 */
export function useGetPetOwnershipQuery(baseOptions: Apollo.QueryHookOptions<GetPetOwnershipQuery, GetPetOwnershipQueryVariables> & ({ variables: GetPetOwnershipQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPetOwnershipQuery, GetPetOwnershipQueryVariables>(GetPetOwnershipDocument, options);
      }
export function useGetPetOwnershipLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPetOwnershipQuery, GetPetOwnershipQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPetOwnershipQuery, GetPetOwnershipQueryVariables>(GetPetOwnershipDocument, options);
        }
export function useGetPetOwnershipSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPetOwnershipQuery, GetPetOwnershipQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPetOwnershipQuery, GetPetOwnershipQueryVariables>(GetPetOwnershipDocument, options);
        }
export type GetPetOwnershipQueryHookResult = ReturnType<typeof useGetPetOwnershipQuery>;
export type GetPetOwnershipLazyQueryHookResult = ReturnType<typeof useGetPetOwnershipLazyQuery>;
export type GetPetOwnershipSuspenseQueryHookResult = ReturnType<typeof useGetPetOwnershipSuspenseQuery>;
export type GetPetOwnershipQueryResult = Apollo.QueryResult<GetPetOwnershipQuery, GetPetOwnershipQueryVariables>;
export const GetPetTreatmentsDocument = gql`
    query getPetTreatments($petId: String!, $page: Int!) {
  listTreatments(
    commonSearch: {page: $page, order_by: "date", filters: {join: [{key: "health_cards", value: {join: [{key: "pets", value: {join: [{key: "ownerships", value: {fixed: [{key: "pet_id", value: $petId}]}}]}}]}}]}}
  ) {
    success
    error {
      code
      message
      extra
    }
    pagination {
      page_size
      current_page
      total_pages
      total_items
    }
    items {
      ...PetTreatment
    }
  }
}
    ${PetTreatmentFragmentDoc}`;

/**
 * __useGetPetTreatmentsQuery__
 *
 * To run a query within a React component, call `useGetPetTreatmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPetTreatmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPetTreatmentsQuery({
 *   variables: {
 *      petId: // value for 'petId'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetPetTreatmentsQuery(baseOptions: Apollo.QueryHookOptions<GetPetTreatmentsQuery, GetPetTreatmentsQueryVariables> & ({ variables: GetPetTreatmentsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPetTreatmentsQuery, GetPetTreatmentsQueryVariables>(GetPetTreatmentsDocument, options);
      }
export function useGetPetTreatmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPetTreatmentsQuery, GetPetTreatmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPetTreatmentsQuery, GetPetTreatmentsQueryVariables>(GetPetTreatmentsDocument, options);
        }
export function useGetPetTreatmentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPetTreatmentsQuery, GetPetTreatmentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPetTreatmentsQuery, GetPetTreatmentsQueryVariables>(GetPetTreatmentsDocument, options);
        }
export type GetPetTreatmentsQueryHookResult = ReturnType<typeof useGetPetTreatmentsQuery>;
export type GetPetTreatmentsLazyQueryHookResult = ReturnType<typeof useGetPetTreatmentsLazyQuery>;
export type GetPetTreatmentsSuspenseQueryHookResult = ReturnType<typeof useGetPetTreatmentsSuspenseQuery>;
export type GetPetTreatmentsQueryResult = Apollo.QueryResult<GetPetTreatmentsQuery, GetPetTreatmentsQueryVariables>;
export const UpdatePetDocument = gql`
    mutation UpdatePet($id: ID!, $data: PetUpdate!) {
  updatePet(id: $id, data: $data) {
    pet {
      ...FullPet
    }
    success
    error {
      message
      code
    }
  }
}
    ${FullPetFragmentDoc}`;
export type UpdatePetMutationFn = Apollo.MutationFunction<UpdatePetMutation, UpdatePetMutationVariables>;

/**
 * __useUpdatePetMutation__
 *
 * To run a mutation, you first call `useUpdatePetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePetMutation, { data, loading, error }] = useUpdatePetMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdatePetMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePetMutation, UpdatePetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePetMutation, UpdatePetMutationVariables>(UpdatePetDocument, options);
      }
export type UpdatePetMutationHookResult = ReturnType<typeof useUpdatePetMutation>;
export type UpdatePetMutationResult = Apollo.MutationResult<UpdatePetMutation>;
export type UpdatePetMutationOptions = Apollo.BaseMutationOptions<UpdatePetMutation, UpdatePetMutationVariables>;
export const GetMeDocument = gql`
    query getMe {
  me {
    success
    error {
      code
      message
      extra
    }
    user {
      id
      first_name
      last_name
      email
      role
    }
  }
}
    `;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export function useGetMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeSuspenseQueryHookResult = ReturnType<typeof useGetMeSuspenseQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const UpdateMeDocument = gql`
    mutation updateMe($data: UserUpdate!) {
  updateMe(data: $data) {
    user {
      id
      first_name
      last_name
      email
      created_at
    }
    error {
      code
      message
    }
  }
}
    `;
export type UpdateMeMutationFn = Apollo.MutationFunction<UpdateMeMutation, UpdateMeMutationVariables>;

/**
 * __useUpdateMeMutation__
 *
 * To run a mutation, you first call `useUpdateMeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMeMutation, { data, loading, error }] = useUpdateMeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateMeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMeMutation, UpdateMeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMeMutation, UpdateMeMutationVariables>(UpdateMeDocument, options);
      }
export type UpdateMeMutationHookResult = ReturnType<typeof useUpdateMeMutation>;
export type UpdateMeMutationResult = Apollo.MutationResult<UpdateMeMutation>;
export type UpdateMeMutationOptions = Apollo.BaseMutationOptions<UpdateMeMutation, UpdateMeMutationVariables>;
export const ListShelterBoxesBoDocument = gql`
    query listShelterBoxesBO($search: CommonSearch!) {
  listShelterBoxes(commonSearch: $search) {
    success
    error {
      code
      message
    }
    pagination {
      total_items
      total_pages
      current_page
      page_size
    }
    items {
      id
      created_at
      label
      capacity
      status
      is_out_of_service
      last_cleaned_at
      notes
      zone {
        id
        name
      }
      area {
        id
        name
      }
      current_occupants {
        id
        pet {
          id
          name
        }
      }
      occupancy_history(
        commonSearch: {page: 0, page_size: 20, order_by: "entered_at", order_direction: "desc"}
      ) {
        items {
          id
          entered_at
          exited_at
          reason
          shelter_pet {
            id
            pet {
              id
              name
            }
          }
          moved_by {
            id
            first_name
            last_name
          }
        }
      }
    }
  }
}
    `;

/**
 * __useListShelterBoxesBoQuery__
 *
 * To run a query within a React component, call `useListShelterBoxesBoQuery` and pass it any options that fit your needs.
 * When your component renders, `useListShelterBoxesBoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListShelterBoxesBoQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useListShelterBoxesBoQuery(baseOptions: Apollo.QueryHookOptions<ListShelterBoxesBoQuery, ListShelterBoxesBoQueryVariables> & ({ variables: ListShelterBoxesBoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListShelterBoxesBoQuery, ListShelterBoxesBoQueryVariables>(ListShelterBoxesBoDocument, options);
      }
export function useListShelterBoxesBoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListShelterBoxesBoQuery, ListShelterBoxesBoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListShelterBoxesBoQuery, ListShelterBoxesBoQueryVariables>(ListShelterBoxesBoDocument, options);
        }
export function useListShelterBoxesBoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListShelterBoxesBoQuery, ListShelterBoxesBoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListShelterBoxesBoQuery, ListShelterBoxesBoQueryVariables>(ListShelterBoxesBoDocument, options);
        }
export type ListShelterBoxesBoQueryHookResult = ReturnType<typeof useListShelterBoxesBoQuery>;
export type ListShelterBoxesBoLazyQueryHookResult = ReturnType<typeof useListShelterBoxesBoLazyQuery>;
export type ListShelterBoxesBoSuspenseQueryHookResult = ReturnType<typeof useListShelterBoxesBoSuspenseQuery>;
export type ListShelterBoxesBoQueryResult = Apollo.QueryResult<ListShelterBoxesBoQuery, ListShelterBoxesBoQueryVariables>;
export const UpdateShelterBoxBoDocument = gql`
    mutation updateShelterBoxBO($id: ID!, $data: ShelterBoxUpdate!) {
  updateShelterBox(id: $id, data: $data) {
    success
    error {
      code
      message
    }
    box {
      id
    }
  }
}
    `;
export type UpdateShelterBoxBoMutationFn = Apollo.MutationFunction<UpdateShelterBoxBoMutation, UpdateShelterBoxBoMutationVariables>;

/**
 * __useUpdateShelterBoxBoMutation__
 *
 * To run a mutation, you first call `useUpdateShelterBoxBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateShelterBoxBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateShelterBoxBoMutation, { data, loading, error }] = useUpdateShelterBoxBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateShelterBoxBoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateShelterBoxBoMutation, UpdateShelterBoxBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateShelterBoxBoMutation, UpdateShelterBoxBoMutationVariables>(UpdateShelterBoxBoDocument, options);
      }
export type UpdateShelterBoxBoMutationHookResult = ReturnType<typeof useUpdateShelterBoxBoMutation>;
export type UpdateShelterBoxBoMutationResult = Apollo.MutationResult<UpdateShelterBoxBoMutation>;
export type UpdateShelterBoxBoMutationOptions = Apollo.BaseMutationOptions<UpdateShelterBoxBoMutation, UpdateShelterBoxBoMutationVariables>;
export const MarkBoxCleanedBoDocument = gql`
    mutation markBoxCleanedBO($box_id: ID!) {
  markBoxCleaned(box_id: $box_id) {
    success
    error {
      code
      message
    }
    box {
      id
      last_cleaned_at
      status
    }
  }
}
    `;
export type MarkBoxCleanedBoMutationFn = Apollo.MutationFunction<MarkBoxCleanedBoMutation, MarkBoxCleanedBoMutationVariables>;

/**
 * __useMarkBoxCleanedBoMutation__
 *
 * To run a mutation, you first call `useMarkBoxCleanedBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkBoxCleanedBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markBoxCleanedBoMutation, { data, loading, error }] = useMarkBoxCleanedBoMutation({
 *   variables: {
 *      box_id: // value for 'box_id'
 *   },
 * });
 */
export function useMarkBoxCleanedBoMutation(baseOptions?: Apollo.MutationHookOptions<MarkBoxCleanedBoMutation, MarkBoxCleanedBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkBoxCleanedBoMutation, MarkBoxCleanedBoMutationVariables>(MarkBoxCleanedBoDocument, options);
      }
export type MarkBoxCleanedBoMutationHookResult = ReturnType<typeof useMarkBoxCleanedBoMutation>;
export type MarkBoxCleanedBoMutationResult = Apollo.MutationResult<MarkBoxCleanedBoMutation>;
export type MarkBoxCleanedBoMutationOptions = Apollo.BaseMutationOptions<MarkBoxCleanedBoMutation, MarkBoxCleanedBoMutationVariables>;
export const DeleteShelterBoxBoDocument = gql`
    mutation deleteShelterBoxBO($id: ID!) {
  deleteShelterBox(id: $id) {
    success
    error {
      code
      message
    }
    id
  }
}
    `;
export type DeleteShelterBoxBoMutationFn = Apollo.MutationFunction<DeleteShelterBoxBoMutation, DeleteShelterBoxBoMutationVariables>;

/**
 * __useDeleteShelterBoxBoMutation__
 *
 * To run a mutation, you first call `useDeleteShelterBoxBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteShelterBoxBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteShelterBoxBoMutation, { data, loading, error }] = useDeleteShelterBoxBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteShelterBoxBoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteShelterBoxBoMutation, DeleteShelterBoxBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteShelterBoxBoMutation, DeleteShelterBoxBoMutationVariables>(DeleteShelterBoxBoDocument, options);
      }
export type DeleteShelterBoxBoMutationHookResult = ReturnType<typeof useDeleteShelterBoxBoMutation>;
export type DeleteShelterBoxBoMutationResult = Apollo.MutationResult<DeleteShelterBoxBoMutation>;
export type DeleteShelterBoxBoMutationOptions = Apollo.BaseMutationOptions<DeleteShelterBoxBoMutation, DeleteShelterBoxBoMutationVariables>;
export const MovePetBetweenBoxesBoDocument = gql`
    mutation movePetBetweenBoxesBO($shelter_pet_id: ID!, $to_box_id: ID!, $reason: String) {
  movePetBetweenBoxes(
    shelter_pet_id: $shelter_pet_id
    to_box_id: $to_box_id
    reason: $reason
  ) {
    success
    error {
      code
      message
    }
    occupancy {
      id
    }
  }
}
    `;
export type MovePetBetweenBoxesBoMutationFn = Apollo.MutationFunction<MovePetBetweenBoxesBoMutation, MovePetBetweenBoxesBoMutationVariables>;

/**
 * __useMovePetBetweenBoxesBoMutation__
 *
 * To run a mutation, you first call `useMovePetBetweenBoxesBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMovePetBetweenBoxesBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [movePetBetweenBoxesBoMutation, { data, loading, error }] = useMovePetBetweenBoxesBoMutation({
 *   variables: {
 *      shelter_pet_id: // value for 'shelter_pet_id'
 *      to_box_id: // value for 'to_box_id'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useMovePetBetweenBoxesBoMutation(baseOptions?: Apollo.MutationHookOptions<MovePetBetweenBoxesBoMutation, MovePetBetweenBoxesBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MovePetBetweenBoxesBoMutation, MovePetBetweenBoxesBoMutationVariables>(MovePetBetweenBoxesBoDocument, options);
      }
export type MovePetBetweenBoxesBoMutationHookResult = ReturnType<typeof useMovePetBetweenBoxesBoMutation>;
export type MovePetBetweenBoxesBoMutationResult = Apollo.MutationResult<MovePetBetweenBoxesBoMutation>;
export type MovePetBetweenBoxesBoMutationOptions = Apollo.BaseMutationOptions<MovePetBetweenBoxesBoMutation, MovePetBetweenBoxesBoMutationVariables>;
export const ListShelterMapsBoDocument = gql`
    query listShelterMapsBO($commonSearch: CommonSearch) {
  listShelterMaps(commonSearch: $commonSearch) {
    success
    error {
      code
      message
    }
    items {
      id
      name
      width
      height
      unit
    }
  }
}
    `;

/**
 * __useListShelterMapsBoQuery__
 *
 * To run a query within a React component, call `useListShelterMapsBoQuery` and pass it any options that fit your needs.
 * When your component renders, `useListShelterMapsBoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListShelterMapsBoQuery({
 *   variables: {
 *      commonSearch: // value for 'commonSearch'
 *   },
 * });
 */
export function useListShelterMapsBoQuery(baseOptions?: Apollo.QueryHookOptions<ListShelterMapsBoQuery, ListShelterMapsBoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListShelterMapsBoQuery, ListShelterMapsBoQueryVariables>(ListShelterMapsBoDocument, options);
      }
export function useListShelterMapsBoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListShelterMapsBoQuery, ListShelterMapsBoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListShelterMapsBoQuery, ListShelterMapsBoQueryVariables>(ListShelterMapsBoDocument, options);
        }
export function useListShelterMapsBoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListShelterMapsBoQuery, ListShelterMapsBoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListShelterMapsBoQuery, ListShelterMapsBoQueryVariables>(ListShelterMapsBoDocument, options);
        }
export type ListShelterMapsBoQueryHookResult = ReturnType<typeof useListShelterMapsBoQuery>;
export type ListShelterMapsBoLazyQueryHookResult = ReturnType<typeof useListShelterMapsBoLazyQuery>;
export type ListShelterMapsBoSuspenseQueryHookResult = ReturnType<typeof useListShelterMapsBoSuspenseQuery>;
export type ListShelterMapsBoQueryResult = Apollo.QueryResult<ListShelterMapsBoQuery, ListShelterMapsBoQueryVariables>;
export const GetShelterMapBoDocument = gql`
    query getShelterMapBO($id: ID!) {
  getShelterMap(id: $id) {
    success
    error {
      code
      message
    }
    map {
      ...FullShelterMapBO
    }
  }
}
    ${FullShelterMapBoFragmentDoc}`;

/**
 * __useGetShelterMapBoQuery__
 *
 * To run a query within a React component, call `useGetShelterMapBoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetShelterMapBoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetShelterMapBoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetShelterMapBoQuery(baseOptions: Apollo.QueryHookOptions<GetShelterMapBoQuery, GetShelterMapBoQueryVariables> & ({ variables: GetShelterMapBoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetShelterMapBoQuery, GetShelterMapBoQueryVariables>(GetShelterMapBoDocument, options);
      }
export function useGetShelterMapBoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetShelterMapBoQuery, GetShelterMapBoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetShelterMapBoQuery, GetShelterMapBoQueryVariables>(GetShelterMapBoDocument, options);
        }
export function useGetShelterMapBoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetShelterMapBoQuery, GetShelterMapBoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetShelterMapBoQuery, GetShelterMapBoQueryVariables>(GetShelterMapBoDocument, options);
        }
export type GetShelterMapBoQueryHookResult = ReturnType<typeof useGetShelterMapBoQuery>;
export type GetShelterMapBoLazyQueryHookResult = ReturnType<typeof useGetShelterMapBoLazyQuery>;
export type GetShelterMapBoSuspenseQueryHookResult = ReturnType<typeof useGetShelterMapBoSuspenseQuery>;
export type GetShelterMapBoQueryResult = Apollo.QueryResult<GetShelterMapBoQuery, GetShelterMapBoQueryVariables>;
export const CreateShelterMapBoDocument = gql`
    mutation createShelterMapBO($data: ShelterMapCreate!) {
  createShelterMap(data: $data) {
    success
    error {
      code
      message
    }
    map {
      ...FullShelterMapBO
    }
  }
}
    ${FullShelterMapBoFragmentDoc}`;
export type CreateShelterMapBoMutationFn = Apollo.MutationFunction<CreateShelterMapBoMutation, CreateShelterMapBoMutationVariables>;

/**
 * __useCreateShelterMapBoMutation__
 *
 * To run a mutation, you first call `useCreateShelterMapBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShelterMapBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShelterMapBoMutation, { data, loading, error }] = useCreateShelterMapBoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateShelterMapBoMutation(baseOptions?: Apollo.MutationHookOptions<CreateShelterMapBoMutation, CreateShelterMapBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateShelterMapBoMutation, CreateShelterMapBoMutationVariables>(CreateShelterMapBoDocument, options);
      }
export type CreateShelterMapBoMutationHookResult = ReturnType<typeof useCreateShelterMapBoMutation>;
export type CreateShelterMapBoMutationResult = Apollo.MutationResult<CreateShelterMapBoMutation>;
export type CreateShelterMapBoMutationOptions = Apollo.BaseMutationOptions<CreateShelterMapBoMutation, CreateShelterMapBoMutationVariables>;
export const UpdateShelterMapBoDocument = gql`
    mutation updateShelterMapBO($id: ID!, $data: ShelterMapUpdate!) {
  updateShelterMap(id: $id, data: $data) {
    success
    error {
      code
      message
    }
    map {
      ...FullShelterMapBO
    }
  }
}
    ${FullShelterMapBoFragmentDoc}`;
export type UpdateShelterMapBoMutationFn = Apollo.MutationFunction<UpdateShelterMapBoMutation, UpdateShelterMapBoMutationVariables>;

/**
 * __useUpdateShelterMapBoMutation__
 *
 * To run a mutation, you first call `useUpdateShelterMapBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateShelterMapBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateShelterMapBoMutation, { data, loading, error }] = useUpdateShelterMapBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateShelterMapBoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateShelterMapBoMutation, UpdateShelterMapBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateShelterMapBoMutation, UpdateShelterMapBoMutationVariables>(UpdateShelterMapBoDocument, options);
      }
export type UpdateShelterMapBoMutationHookResult = ReturnType<typeof useUpdateShelterMapBoMutation>;
export type UpdateShelterMapBoMutationResult = Apollo.MutationResult<UpdateShelterMapBoMutation>;
export type UpdateShelterMapBoMutationOptions = Apollo.BaseMutationOptions<UpdateShelterMapBoMutation, UpdateShelterMapBoMutationVariables>;
export const SaveShelterMapLayoutBoDocument = gql`
    mutation saveShelterMapLayoutBO($map_id: ID!, $data: ShelterMapLayoutInput!) {
  saveShelterMapLayout(map_id: $map_id, data: $data) {
    success
    error {
      code
      message
    }
    map {
      ...FullShelterMapBO
    }
  }
}
    ${FullShelterMapBoFragmentDoc}`;
export type SaveShelterMapLayoutBoMutationFn = Apollo.MutationFunction<SaveShelterMapLayoutBoMutation, SaveShelterMapLayoutBoMutationVariables>;

/**
 * __useSaveShelterMapLayoutBoMutation__
 *
 * To run a mutation, you first call `useSaveShelterMapLayoutBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveShelterMapLayoutBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveShelterMapLayoutBoMutation, { data, loading, error }] = useSaveShelterMapLayoutBoMutation({
 *   variables: {
 *      map_id: // value for 'map_id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSaveShelterMapLayoutBoMutation(baseOptions?: Apollo.MutationHookOptions<SaveShelterMapLayoutBoMutation, SaveShelterMapLayoutBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveShelterMapLayoutBoMutation, SaveShelterMapLayoutBoMutationVariables>(SaveShelterMapLayoutBoDocument, options);
      }
export type SaveShelterMapLayoutBoMutationHookResult = ReturnType<typeof useSaveShelterMapLayoutBoMutation>;
export type SaveShelterMapLayoutBoMutationResult = Apollo.MutationResult<SaveShelterMapLayoutBoMutation>;
export type SaveShelterMapLayoutBoMutationOptions = Apollo.BaseMutationOptions<SaveShelterMapLayoutBoMutation, SaveShelterMapLayoutBoMutationVariables>;
export const AssignPetToBoxBoDocument = gql`
    mutation assignPetToBoxBO($box_id: ID!, $shelter_pet_id: ID!, $reason: String) {
  assignPetToBox(
    box_id: $box_id
    shelter_pet_id: $shelter_pet_id
    reason: $reason
  ) {
    success
    error {
      code
      message
    }
    occupancy {
      id
    }
  }
}
    `;
export type AssignPetToBoxBoMutationFn = Apollo.MutationFunction<AssignPetToBoxBoMutation, AssignPetToBoxBoMutationVariables>;

/**
 * __useAssignPetToBoxBoMutation__
 *
 * To run a mutation, you first call `useAssignPetToBoxBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignPetToBoxBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignPetToBoxBoMutation, { data, loading, error }] = useAssignPetToBoxBoMutation({
 *   variables: {
 *      box_id: // value for 'box_id'
 *      shelter_pet_id: // value for 'shelter_pet_id'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useAssignPetToBoxBoMutation(baseOptions?: Apollo.MutationHookOptions<AssignPetToBoxBoMutation, AssignPetToBoxBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AssignPetToBoxBoMutation, AssignPetToBoxBoMutationVariables>(AssignPetToBoxBoDocument, options);
      }
export type AssignPetToBoxBoMutationHookResult = ReturnType<typeof useAssignPetToBoxBoMutation>;
export type AssignPetToBoxBoMutationResult = Apollo.MutationResult<AssignPetToBoxBoMutation>;
export type AssignPetToBoxBoMutationOptions = Apollo.BaseMutationOptions<AssignPetToBoxBoMutation, AssignPetToBoxBoMutationVariables>;
export const ReleasePetFromBoxBoDocument = gql`
    mutation releasePetFromBoxBO($occupancy_id: ID!, $reason: String) {
  releasePetFromBox(occupancy_id: $occupancy_id, reason: $reason) {
    success
    error {
      code
      message
    }
    occupancy {
      id
    }
  }
}
    `;
export type ReleasePetFromBoxBoMutationFn = Apollo.MutationFunction<ReleasePetFromBoxBoMutation, ReleasePetFromBoxBoMutationVariables>;

/**
 * __useReleasePetFromBoxBoMutation__
 *
 * To run a mutation, you first call `useReleasePetFromBoxBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReleasePetFromBoxBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [releasePetFromBoxBoMutation, { data, loading, error }] = useReleasePetFromBoxBoMutation({
 *   variables: {
 *      occupancy_id: // value for 'occupancy_id'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useReleasePetFromBoxBoMutation(baseOptions?: Apollo.MutationHookOptions<ReleasePetFromBoxBoMutation, ReleasePetFromBoxBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReleasePetFromBoxBoMutation, ReleasePetFromBoxBoMutationVariables>(ReleasePetFromBoxBoDocument, options);
      }
export type ReleasePetFromBoxBoMutationHookResult = ReturnType<typeof useReleasePetFromBoxBoMutation>;
export type ReleasePetFromBoxBoMutationResult = Apollo.MutationResult<ReleasePetFromBoxBoMutation>;
export type ReleasePetFromBoxBoMutationOptions = Apollo.BaseMutationOptions<ReleasePetFromBoxBoMutation, ReleasePetFromBoxBoMutationVariables>;
export const CreateShelterPersonBoDocument = gql`
    mutation createShelterPersonBO($data: CreateShelterPersonInput!) {
  createShelterPerson(data: $data) {
    success
    error {
      code
      message
    }
    shelter_person {
      id
    }
  }
}
    `;
export type CreateShelterPersonBoMutationFn = Apollo.MutationFunction<CreateShelterPersonBoMutation, CreateShelterPersonBoMutationVariables>;

/**
 * __useCreateShelterPersonBoMutation__
 *
 * To run a mutation, you first call `useCreateShelterPersonBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShelterPersonBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShelterPersonBoMutation, { data, loading, error }] = useCreateShelterPersonBoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateShelterPersonBoMutation(baseOptions?: Apollo.MutationHookOptions<CreateShelterPersonBoMutation, CreateShelterPersonBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateShelterPersonBoMutation, CreateShelterPersonBoMutationVariables>(CreateShelterPersonBoDocument, options);
      }
export type CreateShelterPersonBoMutationHookResult = ReturnType<typeof useCreateShelterPersonBoMutation>;
export type CreateShelterPersonBoMutationResult = Apollo.MutationResult<CreateShelterPersonBoMutation>;
export type CreateShelterPersonBoMutationOptions = Apollo.BaseMutationOptions<CreateShelterPersonBoMutation, CreateShelterPersonBoMutationVariables>;
export const ArchiveShelterPersonBoDocument = gql`
    mutation archiveShelterPersonBO($id: ID!) {
  archiveShelterPerson(id: $id) {
    success
    error {
      code
      message
    }
    shelter_person {
      id
    }
  }
}
    `;
export type ArchiveShelterPersonBoMutationFn = Apollo.MutationFunction<ArchiveShelterPersonBoMutation, ArchiveShelterPersonBoMutationVariables>;

/**
 * __useArchiveShelterPersonBoMutation__
 *
 * To run a mutation, you first call `useArchiveShelterPersonBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveShelterPersonBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveShelterPersonBoMutation, { data, loading, error }] = useArchiveShelterPersonBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArchiveShelterPersonBoMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveShelterPersonBoMutation, ArchiveShelterPersonBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveShelterPersonBoMutation, ArchiveShelterPersonBoMutationVariables>(ArchiveShelterPersonBoDocument, options);
      }
export type ArchiveShelterPersonBoMutationHookResult = ReturnType<typeof useArchiveShelterPersonBoMutation>;
export type ArchiveShelterPersonBoMutationResult = Apollo.MutationResult<ArchiveShelterPersonBoMutation>;
export type ArchiveShelterPersonBoMutationOptions = Apollo.BaseMutationOptions<ArchiveShelterPersonBoMutation, ArchiveShelterPersonBoMutationVariables>;
export const CreateShelterInviteBoDocument = gql`
    mutation createShelterInviteBO($data: ShelterInviteCreate!) {
  createShelterInvite(data: $data) {
    success
    error {
      code
      message
    }
    shelter_invite {
      id
      status
    }
  }
}
    `;
export type CreateShelterInviteBoMutationFn = Apollo.MutationFunction<CreateShelterInviteBoMutation, CreateShelterInviteBoMutationVariables>;

/**
 * __useCreateShelterInviteBoMutation__
 *
 * To run a mutation, you first call `useCreateShelterInviteBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShelterInviteBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShelterInviteBoMutation, { data, loading, error }] = useCreateShelterInviteBoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateShelterInviteBoMutation(baseOptions?: Apollo.MutationHookOptions<CreateShelterInviteBoMutation, CreateShelterInviteBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateShelterInviteBoMutation, CreateShelterInviteBoMutationVariables>(CreateShelterInviteBoDocument, options);
      }
export type CreateShelterInviteBoMutationHookResult = ReturnType<typeof useCreateShelterInviteBoMutation>;
export type CreateShelterInviteBoMutationResult = Apollo.MutationResult<CreateShelterInviteBoMutation>;
export type CreateShelterInviteBoMutationOptions = Apollo.BaseMutationOptions<CreateShelterInviteBoMutation, CreateShelterInviteBoMutationVariables>;
export const CreateShelterRoleBoDocument = gql`
    mutation createShelterRoleBO($data: ShelterRoleCreate!) {
  createShelterRole(data: $data) {
    success
    error {
      code
      message
    }
    shelter_role {
      id
    }
  }
}
    `;
export type CreateShelterRoleBoMutationFn = Apollo.MutationFunction<CreateShelterRoleBoMutation, CreateShelterRoleBoMutationVariables>;

/**
 * __useCreateShelterRoleBoMutation__
 *
 * To run a mutation, you first call `useCreateShelterRoleBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShelterRoleBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShelterRoleBoMutation, { data, loading, error }] = useCreateShelterRoleBoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateShelterRoleBoMutation(baseOptions?: Apollo.MutationHookOptions<CreateShelterRoleBoMutation, CreateShelterRoleBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateShelterRoleBoMutation, CreateShelterRoleBoMutationVariables>(CreateShelterRoleBoDocument, options);
      }
export type CreateShelterRoleBoMutationHookResult = ReturnType<typeof useCreateShelterRoleBoMutation>;
export type CreateShelterRoleBoMutationResult = Apollo.MutationResult<CreateShelterRoleBoMutation>;
export type CreateShelterRoleBoMutationOptions = Apollo.BaseMutationOptions<CreateShelterRoleBoMutation, CreateShelterRoleBoMutationVariables>;
export const UpdateShelterRoleBoDocument = gql`
    mutation updateShelterRoleBO($id: ID!, $data: ShelterRoleUpdate!) {
  updateShelterRole(id: $id, data: $data) {
    success
    error {
      code
      message
    }
    shelter_role {
      id
      role
    }
  }
}
    `;
export type UpdateShelterRoleBoMutationFn = Apollo.MutationFunction<UpdateShelterRoleBoMutation, UpdateShelterRoleBoMutationVariables>;

/**
 * __useUpdateShelterRoleBoMutation__
 *
 * To run a mutation, you first call `useUpdateShelterRoleBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateShelterRoleBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateShelterRoleBoMutation, { data, loading, error }] = useUpdateShelterRoleBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateShelterRoleBoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateShelterRoleBoMutation, UpdateShelterRoleBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateShelterRoleBoMutation, UpdateShelterRoleBoMutationVariables>(UpdateShelterRoleBoDocument, options);
      }
export type UpdateShelterRoleBoMutationHookResult = ReturnType<typeof useUpdateShelterRoleBoMutation>;
export type UpdateShelterRoleBoMutationResult = Apollo.MutationResult<UpdateShelterRoleBoMutation>;
export type UpdateShelterRoleBoMutationOptions = Apollo.BaseMutationOptions<UpdateShelterRoleBoMutation, UpdateShelterRoleBoMutationVariables>;
export const DeleteShelterRoleBoDocument = gql`
    mutation deleteShelterRoleBO($id: ID!) {
  deleteShelterRole(id: $id) {
    success
    error {
      code
      message
    }
    id
  }
}
    `;
export type DeleteShelterRoleBoMutationFn = Apollo.MutationFunction<DeleteShelterRoleBoMutation, DeleteShelterRoleBoMutationVariables>;

/**
 * __useDeleteShelterRoleBoMutation__
 *
 * To run a mutation, you first call `useDeleteShelterRoleBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteShelterRoleBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteShelterRoleBoMutation, { data, loading, error }] = useDeleteShelterRoleBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteShelterRoleBoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteShelterRoleBoMutation, DeleteShelterRoleBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteShelterRoleBoMutation, DeleteShelterRoleBoMutationVariables>(DeleteShelterRoleBoDocument, options);
      }
export type DeleteShelterRoleBoMutationHookResult = ReturnType<typeof useDeleteShelterRoleBoMutation>;
export type DeleteShelterRoleBoMutationResult = Apollo.MutationResult<DeleteShelterRoleBoMutation>;
export type DeleteShelterRoleBoMutationOptions = Apollo.BaseMutationOptions<DeleteShelterRoleBoMutation, DeleteShelterRoleBoMutationVariables>;
export const CreateShelterPetsWithDataBoDocument = gql`
    mutation createShelterPetsWithDataBO($data: ShelterPetsWithDataCreate!) {
  createShelterPetsWithData(data: $data) {
    success
    error {
      code
      message
    }
    shelter_pets {
      id
    }
  }
}
    `;
export type CreateShelterPetsWithDataBoMutationFn = Apollo.MutationFunction<CreateShelterPetsWithDataBoMutation, CreateShelterPetsWithDataBoMutationVariables>;

/**
 * __useCreateShelterPetsWithDataBoMutation__
 *
 * To run a mutation, you first call `useCreateShelterPetsWithDataBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShelterPetsWithDataBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShelterPetsWithDataBoMutation, { data, loading, error }] = useCreateShelterPetsWithDataBoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateShelterPetsWithDataBoMutation(baseOptions?: Apollo.MutationHookOptions<CreateShelterPetsWithDataBoMutation, CreateShelterPetsWithDataBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateShelterPetsWithDataBoMutation, CreateShelterPetsWithDataBoMutationVariables>(CreateShelterPetsWithDataBoDocument, options);
      }
export type CreateShelterPetsWithDataBoMutationHookResult = ReturnType<typeof useCreateShelterPetsWithDataBoMutation>;
export type CreateShelterPetsWithDataBoMutationResult = Apollo.MutationResult<CreateShelterPetsWithDataBoMutation>;
export type CreateShelterPetsWithDataBoMutationOptions = Apollo.BaseMutationOptions<CreateShelterPetsWithDataBoMutation, CreateShelterPetsWithDataBoMutationVariables>;
export const CreateShelterPetBoDocument = gql`
    mutation createShelterPetBO($data: ShelterPetCreate!) {
  createShelterPet(data: $data) {
    success
    error {
      code
      message
    }
    shelter_pet {
      id
    }
  }
}
    `;
export type CreateShelterPetBoMutationFn = Apollo.MutationFunction<CreateShelterPetBoMutation, CreateShelterPetBoMutationVariables>;

/**
 * __useCreateShelterPetBoMutation__
 *
 * To run a mutation, you first call `useCreateShelterPetBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShelterPetBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShelterPetBoMutation, { data, loading, error }] = useCreateShelterPetBoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateShelterPetBoMutation(baseOptions?: Apollo.MutationHookOptions<CreateShelterPetBoMutation, CreateShelterPetBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateShelterPetBoMutation, CreateShelterPetBoMutationVariables>(CreateShelterPetBoDocument, options);
      }
export type CreateShelterPetBoMutationHookResult = ReturnType<typeof useCreateShelterPetBoMutation>;
export type CreateShelterPetBoMutationResult = Apollo.MutationResult<CreateShelterPetBoMutation>;
export type CreateShelterPetBoMutationOptions = Apollo.BaseMutationOptions<CreateShelterPetBoMutation, CreateShelterPetBoMutationVariables>;
export const DeleteShelterPetBoDocument = gql`
    mutation deleteShelterPetBO($id: ID!) {
  deleteShelterPet(id: $id) {
    success
    error {
      code
      message
    }
    id
  }
}
    `;
export type DeleteShelterPetBoMutationFn = Apollo.MutationFunction<DeleteShelterPetBoMutation, DeleteShelterPetBoMutationVariables>;

/**
 * __useDeleteShelterPetBoMutation__
 *
 * To run a mutation, you first call `useDeleteShelterPetBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteShelterPetBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteShelterPetBoMutation, { data, loading, error }] = useDeleteShelterPetBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteShelterPetBoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteShelterPetBoMutation, DeleteShelterPetBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteShelterPetBoMutation, DeleteShelterPetBoMutationVariables>(DeleteShelterPetBoDocument, options);
      }
export type DeleteShelterPetBoMutationHookResult = ReturnType<typeof useDeleteShelterPetBoMutation>;
export type DeleteShelterPetBoMutationResult = Apollo.MutationResult<DeleteShelterPetBoMutation>;
export type DeleteShelterPetBoMutationOptions = Apollo.BaseMutationOptions<DeleteShelterPetBoMutation, DeleteShelterPetBoMutationVariables>;
export const CreateShelterInventoryItemBoDocument = gql`
    mutation createShelterInventoryItemBO($data: ShelterInventoryItemCreate!) {
  createShelterInventoryItem(data: $data) {
    success
    error {
      code
      message
    }
    item {
      id
    }
  }
}
    `;
export type CreateShelterInventoryItemBoMutationFn = Apollo.MutationFunction<CreateShelterInventoryItemBoMutation, CreateShelterInventoryItemBoMutationVariables>;

/**
 * __useCreateShelterInventoryItemBoMutation__
 *
 * To run a mutation, you first call `useCreateShelterInventoryItemBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShelterInventoryItemBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShelterInventoryItemBoMutation, { data, loading, error }] = useCreateShelterInventoryItemBoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateShelterInventoryItemBoMutation(baseOptions?: Apollo.MutationHookOptions<CreateShelterInventoryItemBoMutation, CreateShelterInventoryItemBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateShelterInventoryItemBoMutation, CreateShelterInventoryItemBoMutationVariables>(CreateShelterInventoryItemBoDocument, options);
      }
export type CreateShelterInventoryItemBoMutationHookResult = ReturnType<typeof useCreateShelterInventoryItemBoMutation>;
export type CreateShelterInventoryItemBoMutationResult = Apollo.MutationResult<CreateShelterInventoryItemBoMutation>;
export type CreateShelterInventoryItemBoMutationOptions = Apollo.BaseMutationOptions<CreateShelterInventoryItemBoMutation, CreateShelterInventoryItemBoMutationVariables>;
export const CreateShelterInventoryMovementBoDocument = gql`
    mutation createShelterInventoryMovementBO($data: ShelterInventoryMovementCreate!) {
  createShelterInventoryMovement(data: $data) {
    success
    error {
      code
      message
    }
    movement {
      id
    }
  }
}
    `;
export type CreateShelterInventoryMovementBoMutationFn = Apollo.MutationFunction<CreateShelterInventoryMovementBoMutation, CreateShelterInventoryMovementBoMutationVariables>;

/**
 * __useCreateShelterInventoryMovementBoMutation__
 *
 * To run a mutation, you first call `useCreateShelterInventoryMovementBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShelterInventoryMovementBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShelterInventoryMovementBoMutation, { data, loading, error }] = useCreateShelterInventoryMovementBoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateShelterInventoryMovementBoMutation(baseOptions?: Apollo.MutationHookOptions<CreateShelterInventoryMovementBoMutation, CreateShelterInventoryMovementBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateShelterInventoryMovementBoMutation, CreateShelterInventoryMovementBoMutationVariables>(CreateShelterInventoryMovementBoDocument, options);
      }
export type CreateShelterInventoryMovementBoMutationHookResult = ReturnType<typeof useCreateShelterInventoryMovementBoMutation>;
export type CreateShelterInventoryMovementBoMutationResult = Apollo.MutationResult<CreateShelterInventoryMovementBoMutation>;
export type CreateShelterInventoryMovementBoMutationOptions = Apollo.BaseMutationOptions<CreateShelterInventoryMovementBoMutation, CreateShelterInventoryMovementBoMutationVariables>;
export const ArchiveShelterInventoryItemBoDocument = gql`
    mutation archiveShelterInventoryItemBO($id: ID!) {
  archiveShelterInventoryItem(id: $id) {
    success
    error {
      code
      message
    }
    item {
      id
    }
  }
}
    `;
export type ArchiveShelterInventoryItemBoMutationFn = Apollo.MutationFunction<ArchiveShelterInventoryItemBoMutation, ArchiveShelterInventoryItemBoMutationVariables>;

/**
 * __useArchiveShelterInventoryItemBoMutation__
 *
 * To run a mutation, you first call `useArchiveShelterInventoryItemBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveShelterInventoryItemBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveShelterInventoryItemBoMutation, { data, loading, error }] = useArchiveShelterInventoryItemBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArchiveShelterInventoryItemBoMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveShelterInventoryItemBoMutation, ArchiveShelterInventoryItemBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveShelterInventoryItemBoMutation, ArchiveShelterInventoryItemBoMutationVariables>(ArchiveShelterInventoryItemBoDocument, options);
      }
export type ArchiveShelterInventoryItemBoMutationHookResult = ReturnType<typeof useArchiveShelterInventoryItemBoMutation>;
export type ArchiveShelterInventoryItemBoMutationResult = Apollo.MutationResult<ArchiveShelterInventoryItemBoMutation>;
export type ArchiveShelterInventoryItemBoMutationOptions = Apollo.BaseMutationOptions<ArchiveShelterInventoryItemBoMutation, ArchiveShelterInventoryItemBoMutationVariables>;
export const DeleteShelterInventoryItemBoDocument = gql`
    mutation deleteShelterInventoryItemBO($id: ID!) {
  deleteShelterInventoryItem(id: $id) {
    success
    error {
      code
      message
    }
    id
  }
}
    `;
export type DeleteShelterInventoryItemBoMutationFn = Apollo.MutationFunction<DeleteShelterInventoryItemBoMutation, DeleteShelterInventoryItemBoMutationVariables>;

/**
 * __useDeleteShelterInventoryItemBoMutation__
 *
 * To run a mutation, you first call `useDeleteShelterInventoryItemBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteShelterInventoryItemBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteShelterInventoryItemBoMutation, { data, loading, error }] = useDeleteShelterInventoryItemBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteShelterInventoryItemBoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteShelterInventoryItemBoMutation, DeleteShelterInventoryItemBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteShelterInventoryItemBoMutation, DeleteShelterInventoryItemBoMutationVariables>(DeleteShelterInventoryItemBoDocument, options);
      }
export type DeleteShelterInventoryItemBoMutationHookResult = ReturnType<typeof useDeleteShelterInventoryItemBoMutation>;
export type DeleteShelterInventoryItemBoMutationResult = Apollo.MutationResult<DeleteShelterInventoryItemBoMutation>;
export type DeleteShelterInventoryItemBoMutationOptions = Apollo.BaseMutationOptions<DeleteShelterInventoryItemBoMutation, DeleteShelterInventoryItemBoMutationVariables>;
export const CreateShelterWalkBoDocument = gql`
    mutation createShelterWalkBO($data: ShelterWalkCreate!) {
  createShelterWalk(data: $data) {
    success
    error {
      code
      message
    }
    shelter_walk {
      id
    }
  }
}
    `;
export type CreateShelterWalkBoMutationFn = Apollo.MutationFunction<CreateShelterWalkBoMutation, CreateShelterWalkBoMutationVariables>;

/**
 * __useCreateShelterWalkBoMutation__
 *
 * To run a mutation, you first call `useCreateShelterWalkBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShelterWalkBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShelterWalkBoMutation, { data, loading, error }] = useCreateShelterWalkBoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateShelterWalkBoMutation(baseOptions?: Apollo.MutationHookOptions<CreateShelterWalkBoMutation, CreateShelterWalkBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateShelterWalkBoMutation, CreateShelterWalkBoMutationVariables>(CreateShelterWalkBoDocument, options);
      }
export type CreateShelterWalkBoMutationHookResult = ReturnType<typeof useCreateShelterWalkBoMutation>;
export type CreateShelterWalkBoMutationResult = Apollo.MutationResult<CreateShelterWalkBoMutation>;
export type CreateShelterWalkBoMutationOptions = Apollo.BaseMutationOptions<CreateShelterWalkBoMutation, CreateShelterWalkBoMutationVariables>;
export const StartShelterWalkBoDocument = gql`
    mutation startShelterWalkBO($id: ID!) {
  startShelterWalk(id: $id) {
    success
    error {
      code
      message
    }
    shelter_walk {
      id
      status
    }
  }
}
    `;
export type StartShelterWalkBoMutationFn = Apollo.MutationFunction<StartShelterWalkBoMutation, StartShelterWalkBoMutationVariables>;

/**
 * __useStartShelterWalkBoMutation__
 *
 * To run a mutation, you first call `useStartShelterWalkBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartShelterWalkBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startShelterWalkBoMutation, { data, loading, error }] = useStartShelterWalkBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStartShelterWalkBoMutation(baseOptions?: Apollo.MutationHookOptions<StartShelterWalkBoMutation, StartShelterWalkBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartShelterWalkBoMutation, StartShelterWalkBoMutationVariables>(StartShelterWalkBoDocument, options);
      }
export type StartShelterWalkBoMutationHookResult = ReturnType<typeof useStartShelterWalkBoMutation>;
export type StartShelterWalkBoMutationResult = Apollo.MutationResult<StartShelterWalkBoMutation>;
export type StartShelterWalkBoMutationOptions = Apollo.BaseMutationOptions<StartShelterWalkBoMutation, StartShelterWalkBoMutationVariables>;
export const CompleteShelterWalkBoDocument = gql`
    mutation completeShelterWalkBO($id: ID!, $notes: String) {
  completeShelterWalk(id: $id, notes: $notes) {
    success
    error {
      code
      message
    }
    shelter_walk {
      id
      status
    }
  }
}
    `;
export type CompleteShelterWalkBoMutationFn = Apollo.MutationFunction<CompleteShelterWalkBoMutation, CompleteShelterWalkBoMutationVariables>;

/**
 * __useCompleteShelterWalkBoMutation__
 *
 * To run a mutation, you first call `useCompleteShelterWalkBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteShelterWalkBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeShelterWalkBoMutation, { data, loading, error }] = useCompleteShelterWalkBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      notes: // value for 'notes'
 *   },
 * });
 */
export function useCompleteShelterWalkBoMutation(baseOptions?: Apollo.MutationHookOptions<CompleteShelterWalkBoMutation, CompleteShelterWalkBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteShelterWalkBoMutation, CompleteShelterWalkBoMutationVariables>(CompleteShelterWalkBoDocument, options);
      }
export type CompleteShelterWalkBoMutationHookResult = ReturnType<typeof useCompleteShelterWalkBoMutation>;
export type CompleteShelterWalkBoMutationResult = Apollo.MutationResult<CompleteShelterWalkBoMutation>;
export type CompleteShelterWalkBoMutationOptions = Apollo.BaseMutationOptions<CompleteShelterWalkBoMutation, CompleteShelterWalkBoMutationVariables>;
export const CancelShelterWalkBoDocument = gql`
    mutation cancelShelterWalkBO($id: ID!, $reason: String) {
  cancelShelterWalk(id: $id, reason: $reason) {
    success
    error {
      code
      message
    }
    shelter_walk {
      id
      status
    }
  }
}
    `;
export type CancelShelterWalkBoMutationFn = Apollo.MutationFunction<CancelShelterWalkBoMutation, CancelShelterWalkBoMutationVariables>;

/**
 * __useCancelShelterWalkBoMutation__
 *
 * To run a mutation, you first call `useCancelShelterWalkBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelShelterWalkBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelShelterWalkBoMutation, { data, loading, error }] = useCancelShelterWalkBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useCancelShelterWalkBoMutation(baseOptions?: Apollo.MutationHookOptions<CancelShelterWalkBoMutation, CancelShelterWalkBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelShelterWalkBoMutation, CancelShelterWalkBoMutationVariables>(CancelShelterWalkBoDocument, options);
      }
export type CancelShelterWalkBoMutationHookResult = ReturnType<typeof useCancelShelterWalkBoMutation>;
export type CancelShelterWalkBoMutationResult = Apollo.MutationResult<CancelShelterWalkBoMutation>;
export type CancelShelterWalkBoMutationOptions = Apollo.BaseMutationOptions<CancelShelterWalkBoMutation, CancelShelterWalkBoMutationVariables>;
export const DeleteShelterWalkBoDocument = gql`
    mutation deleteShelterWalkBO($id: ID!) {
  deleteShelterWalk(id: $id) {
    success
    error {
      code
      message
    }
    id
  }
}
    `;
export type DeleteShelterWalkBoMutationFn = Apollo.MutationFunction<DeleteShelterWalkBoMutation, DeleteShelterWalkBoMutationVariables>;

/**
 * __useDeleteShelterWalkBoMutation__
 *
 * To run a mutation, you first call `useDeleteShelterWalkBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteShelterWalkBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteShelterWalkBoMutation, { data, loading, error }] = useDeleteShelterWalkBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteShelterWalkBoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteShelterWalkBoMutation, DeleteShelterWalkBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteShelterWalkBoMutation, DeleteShelterWalkBoMutationVariables>(DeleteShelterWalkBoDocument, options);
      }
export type DeleteShelterWalkBoMutationHookResult = ReturnType<typeof useDeleteShelterWalkBoMutation>;
export type DeleteShelterWalkBoMutationResult = Apollo.MutationResult<DeleteShelterWalkBoMutation>;
export type DeleteShelterWalkBoMutationOptions = Apollo.BaseMutationOptions<DeleteShelterWalkBoMutation, DeleteShelterWalkBoMutationVariables>;
export const CreateShelterTaskBoDocument = gql`
    mutation createShelterTaskBO($data: ShelterTaskCreate!) {
  createShelterTask(data: $data) {
    success
    error {
      code
      message
    }
    shelter_task {
      id
    }
  }
}
    `;
export type CreateShelterTaskBoMutationFn = Apollo.MutationFunction<CreateShelterTaskBoMutation, CreateShelterTaskBoMutationVariables>;

/**
 * __useCreateShelterTaskBoMutation__
 *
 * To run a mutation, you first call `useCreateShelterTaskBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShelterTaskBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShelterTaskBoMutation, { data, loading, error }] = useCreateShelterTaskBoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateShelterTaskBoMutation(baseOptions?: Apollo.MutationHookOptions<CreateShelterTaskBoMutation, CreateShelterTaskBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateShelterTaskBoMutation, CreateShelterTaskBoMutationVariables>(CreateShelterTaskBoDocument, options);
      }
export type CreateShelterTaskBoMutationHookResult = ReturnType<typeof useCreateShelterTaskBoMutation>;
export type CreateShelterTaskBoMutationResult = Apollo.MutationResult<CreateShelterTaskBoMutation>;
export type CreateShelterTaskBoMutationOptions = Apollo.BaseMutationOptions<CreateShelterTaskBoMutation, CreateShelterTaskBoMutationVariables>;
export const CompleteShelterTaskBoDocument = gql`
    mutation completeShelterTaskBO($id: ID!, $notes: String) {
  completeShelterTask(id: $id, notes: $notes) {
    success
    error {
      code
      message
    }
    shelter_task {
      id
      status
    }
  }
}
    `;
export type CompleteShelterTaskBoMutationFn = Apollo.MutationFunction<CompleteShelterTaskBoMutation, CompleteShelterTaskBoMutationVariables>;

/**
 * __useCompleteShelterTaskBoMutation__
 *
 * To run a mutation, you first call `useCompleteShelterTaskBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteShelterTaskBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeShelterTaskBoMutation, { data, loading, error }] = useCompleteShelterTaskBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      notes: // value for 'notes'
 *   },
 * });
 */
export function useCompleteShelterTaskBoMutation(baseOptions?: Apollo.MutationHookOptions<CompleteShelterTaskBoMutation, CompleteShelterTaskBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteShelterTaskBoMutation, CompleteShelterTaskBoMutationVariables>(CompleteShelterTaskBoDocument, options);
      }
export type CompleteShelterTaskBoMutationHookResult = ReturnType<typeof useCompleteShelterTaskBoMutation>;
export type CompleteShelterTaskBoMutationResult = Apollo.MutationResult<CompleteShelterTaskBoMutation>;
export type CompleteShelterTaskBoMutationOptions = Apollo.BaseMutationOptions<CompleteShelterTaskBoMutation, CompleteShelterTaskBoMutationVariables>;
export const SkipShelterTaskBoDocument = gql`
    mutation skipShelterTaskBO($id: ID!, $reason: String) {
  skipShelterTask(id: $id, reason: $reason) {
    success
    error {
      code
      message
    }
    shelter_task {
      id
      status
    }
  }
}
    `;
export type SkipShelterTaskBoMutationFn = Apollo.MutationFunction<SkipShelterTaskBoMutation, SkipShelterTaskBoMutationVariables>;

/**
 * __useSkipShelterTaskBoMutation__
 *
 * To run a mutation, you first call `useSkipShelterTaskBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSkipShelterTaskBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [skipShelterTaskBoMutation, { data, loading, error }] = useSkipShelterTaskBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useSkipShelterTaskBoMutation(baseOptions?: Apollo.MutationHookOptions<SkipShelterTaskBoMutation, SkipShelterTaskBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SkipShelterTaskBoMutation, SkipShelterTaskBoMutationVariables>(SkipShelterTaskBoDocument, options);
      }
export type SkipShelterTaskBoMutationHookResult = ReturnType<typeof useSkipShelterTaskBoMutation>;
export type SkipShelterTaskBoMutationResult = Apollo.MutationResult<SkipShelterTaskBoMutation>;
export type SkipShelterTaskBoMutationOptions = Apollo.BaseMutationOptions<SkipShelterTaskBoMutation, SkipShelterTaskBoMutationVariables>;
export const DeleteShelterTaskBoDocument = gql`
    mutation deleteShelterTaskBO($id: ID!) {
  deleteShelterTask(id: $id) {
    success
    error {
      code
      message
    }
    id
  }
}
    `;
export type DeleteShelterTaskBoMutationFn = Apollo.MutationFunction<DeleteShelterTaskBoMutation, DeleteShelterTaskBoMutationVariables>;

/**
 * __useDeleteShelterTaskBoMutation__
 *
 * To run a mutation, you first call `useDeleteShelterTaskBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteShelterTaskBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteShelterTaskBoMutation, { data, loading, error }] = useDeleteShelterTaskBoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteShelterTaskBoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteShelterTaskBoMutation, DeleteShelterTaskBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteShelterTaskBoMutation, DeleteShelterTaskBoMutationVariables>(DeleteShelterTaskBoDocument, options);
      }
export type DeleteShelterTaskBoMutationHookResult = ReturnType<typeof useDeleteShelterTaskBoMutation>;
export type DeleteShelterTaskBoMutationResult = Apollo.MutationResult<DeleteShelterTaskBoMutation>;
export type DeleteShelterTaskBoMutationOptions = Apollo.BaseMutationOptions<DeleteShelterTaskBoMutation, DeleteShelterTaskBoMutationVariables>;
export const ListSheltersDocument = gql`
    query listShelters($search: CommonSearch!) {
  listShelters(commonSearch: $search) {
    success
    error {
      code
      message
    }
    pagination {
      total_items
      total_pages
      current_page
      page_size
    }
    items {
      id
      name
      city
      province_code
      type
      verification_status
      created_at
    }
  }
}
    `;

/**
 * __useListSheltersQuery__
 *
 * To run a query within a React component, call `useListSheltersQuery` and pass it any options that fit your needs.
 * When your component renders, `useListSheltersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListSheltersQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useListSheltersQuery(baseOptions: Apollo.QueryHookOptions<ListSheltersQuery, ListSheltersQueryVariables> & ({ variables: ListSheltersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListSheltersQuery, ListSheltersQueryVariables>(ListSheltersDocument, options);
      }
export function useListSheltersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListSheltersQuery, ListSheltersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListSheltersQuery, ListSheltersQueryVariables>(ListSheltersDocument, options);
        }
export function useListSheltersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListSheltersQuery, ListSheltersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListSheltersQuery, ListSheltersQueryVariables>(ListSheltersDocument, options);
        }
export type ListSheltersQueryHookResult = ReturnType<typeof useListSheltersQuery>;
export type ListSheltersLazyQueryHookResult = ReturnType<typeof useListSheltersLazyQuery>;
export type ListSheltersSuspenseQueryHookResult = ReturnType<typeof useListSheltersSuspenseQuery>;
export type ListSheltersQueryResult = Apollo.QueryResult<ListSheltersQuery, ListSheltersQueryVariables>;
export const GetShelterDocument = gql`
    query getShelter($id: ID!) {
  getShelter(id: $id) {
    success
    error {
      code
      message
    }
    shelter {
      id
      name
      street
      street_number
      city
      province_code
      postal_code
      region
      type
      verification_status
      visibility
      accepts_volunteers
      public_contact_email
      public_contact_phone
      created_at
    }
  }
}
    `;

/**
 * __useGetShelterQuery__
 *
 * To run a query within a React component, call `useGetShelterQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetShelterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetShelterQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetShelterQuery(baseOptions: Apollo.QueryHookOptions<GetShelterQuery, GetShelterQueryVariables> & ({ variables: GetShelterQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetShelterQuery, GetShelterQueryVariables>(GetShelterDocument, options);
      }
export function useGetShelterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetShelterQuery, GetShelterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetShelterQuery, GetShelterQueryVariables>(GetShelterDocument, options);
        }
export function useGetShelterSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetShelterQuery, GetShelterQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetShelterQuery, GetShelterQueryVariables>(GetShelterDocument, options);
        }
export type GetShelterQueryHookResult = ReturnType<typeof useGetShelterQuery>;
export type GetShelterLazyQueryHookResult = ReturnType<typeof useGetShelterLazyQuery>;
export type GetShelterSuspenseQueryHookResult = ReturnType<typeof useGetShelterSuspenseQuery>;
export type GetShelterQueryResult = Apollo.QueryResult<GetShelterQuery, GetShelterQueryVariables>;
export const ListShelterPeopleDocument = gql`
    query listShelterPeople($shelter_id: ID!, $search: CommonSearch) {
  listShelterPeople(shelter_id: $shelter_id, search: $search) {
    success
    error {
      code
      message
    }
    pagination {
      total_items
      total_pages
      current_page
      page_size
    }
    items {
      id
      created_at
      first_name
      last_name
      email
      phone
      status
      source
      notes
      user {
        id
        first_name
        last_name
        email
      }
    }
  }
}
    `;

/**
 * __useListShelterPeopleQuery__
 *
 * To run a query within a React component, call `useListShelterPeopleQuery` and pass it any options that fit your needs.
 * When your component renders, `useListShelterPeopleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListShelterPeopleQuery({
 *   variables: {
 *      shelter_id: // value for 'shelter_id'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useListShelterPeopleQuery(baseOptions: Apollo.QueryHookOptions<ListShelterPeopleQuery, ListShelterPeopleQueryVariables> & ({ variables: ListShelterPeopleQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListShelterPeopleQuery, ListShelterPeopleQueryVariables>(ListShelterPeopleDocument, options);
      }
export function useListShelterPeopleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListShelterPeopleQuery, ListShelterPeopleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListShelterPeopleQuery, ListShelterPeopleQueryVariables>(ListShelterPeopleDocument, options);
        }
export function useListShelterPeopleSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListShelterPeopleQuery, ListShelterPeopleQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListShelterPeopleQuery, ListShelterPeopleQueryVariables>(ListShelterPeopleDocument, options);
        }
export type ListShelterPeopleQueryHookResult = ReturnType<typeof useListShelterPeopleQuery>;
export type ListShelterPeopleLazyQueryHookResult = ReturnType<typeof useListShelterPeopleLazyQuery>;
export type ListShelterPeopleSuspenseQueryHookResult = ReturnType<typeof useListShelterPeopleSuspenseQuery>;
export type ListShelterPeopleQueryResult = Apollo.QueryResult<ListShelterPeopleQuery, ListShelterPeopleQueryVariables>;
export const ListShelterRolesBoDocument = gql`
    query listShelterRolesBO($search: CommonSearch!) {
  listShelterRoles(commonSearch: $search) {
    success
    error {
      code
      message
    }
    pagination {
      total_items
      total_pages
      current_page
      page_size
    }
    items {
      id
      created_at
      role
      user {
        id
        first_name
        last_name
        email
      }
    }
  }
}
    `;

/**
 * __useListShelterRolesBoQuery__
 *
 * To run a query within a React component, call `useListShelterRolesBoQuery` and pass it any options that fit your needs.
 * When your component renders, `useListShelterRolesBoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListShelterRolesBoQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useListShelterRolesBoQuery(baseOptions: Apollo.QueryHookOptions<ListShelterRolesBoQuery, ListShelterRolesBoQueryVariables> & ({ variables: ListShelterRolesBoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListShelterRolesBoQuery, ListShelterRolesBoQueryVariables>(ListShelterRolesBoDocument, options);
      }
export function useListShelterRolesBoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListShelterRolesBoQuery, ListShelterRolesBoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListShelterRolesBoQuery, ListShelterRolesBoQueryVariables>(ListShelterRolesBoDocument, options);
        }
export function useListShelterRolesBoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListShelterRolesBoQuery, ListShelterRolesBoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListShelterRolesBoQuery, ListShelterRolesBoQueryVariables>(ListShelterRolesBoDocument, options);
        }
export type ListShelterRolesBoQueryHookResult = ReturnType<typeof useListShelterRolesBoQuery>;
export type ListShelterRolesBoLazyQueryHookResult = ReturnType<typeof useListShelterRolesBoLazyQuery>;
export type ListShelterRolesBoSuspenseQueryHookResult = ReturnType<typeof useListShelterRolesBoSuspenseQuery>;
export type ListShelterRolesBoQueryResult = Apollo.QueryResult<ListShelterRolesBoQuery, ListShelterRolesBoQueryVariables>;
export const ListShelterPetsBoDocument = gql`
    query listShelterPetsBO($search: CommonSearch!) {
  listShelterPets(commonSearch: $search) {
    success
    error {
      code
      message
    }
    pagination {
      total_items
      total_pages
      current_page
      page_size
    }
    items {
      id
      created_at
      is_active
      left_at
      pet {
        id
        name
        gender
        breed
        birthday
        chip_code
      }
    }
  }
}
    `;

/**
 * __useListShelterPetsBoQuery__
 *
 * To run a query within a React component, call `useListShelterPetsBoQuery` and pass it any options that fit your needs.
 * When your component renders, `useListShelterPetsBoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListShelterPetsBoQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useListShelterPetsBoQuery(baseOptions: Apollo.QueryHookOptions<ListShelterPetsBoQuery, ListShelterPetsBoQueryVariables> & ({ variables: ListShelterPetsBoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListShelterPetsBoQuery, ListShelterPetsBoQueryVariables>(ListShelterPetsBoDocument, options);
      }
export function useListShelterPetsBoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListShelterPetsBoQuery, ListShelterPetsBoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListShelterPetsBoQuery, ListShelterPetsBoQueryVariables>(ListShelterPetsBoDocument, options);
        }
export function useListShelterPetsBoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListShelterPetsBoQuery, ListShelterPetsBoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListShelterPetsBoQuery, ListShelterPetsBoQueryVariables>(ListShelterPetsBoDocument, options);
        }
export type ListShelterPetsBoQueryHookResult = ReturnType<typeof useListShelterPetsBoQuery>;
export type ListShelterPetsBoLazyQueryHookResult = ReturnType<typeof useListShelterPetsBoLazyQuery>;
export type ListShelterPetsBoSuspenseQueryHookResult = ReturnType<typeof useListShelterPetsBoSuspenseQuery>;
export type ListShelterPetsBoQueryResult = Apollo.QueryResult<ListShelterPetsBoQuery, ListShelterPetsBoQueryVariables>;
export const ListShelterInventoryItemsBoDocument = gql`
    query listShelterInventoryItemsBO($search: CommonSearch!) {
  listShelterInventoryItems(commonSearch: $search) {
    success
    error {
      code
      message
    }
    pagination {
      total_items
      total_pages
      current_page
      page_size
    }
    items {
      id
      name
      category
      unit
      minimum_threshold
      current_quantity
      is_below_threshold
      is_active
      notes
    }
  }
}
    `;

/**
 * __useListShelterInventoryItemsBoQuery__
 *
 * To run a query within a React component, call `useListShelterInventoryItemsBoQuery` and pass it any options that fit your needs.
 * When your component renders, `useListShelterInventoryItemsBoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListShelterInventoryItemsBoQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useListShelterInventoryItemsBoQuery(baseOptions: Apollo.QueryHookOptions<ListShelterInventoryItemsBoQuery, ListShelterInventoryItemsBoQueryVariables> & ({ variables: ListShelterInventoryItemsBoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListShelterInventoryItemsBoQuery, ListShelterInventoryItemsBoQueryVariables>(ListShelterInventoryItemsBoDocument, options);
      }
export function useListShelterInventoryItemsBoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListShelterInventoryItemsBoQuery, ListShelterInventoryItemsBoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListShelterInventoryItemsBoQuery, ListShelterInventoryItemsBoQueryVariables>(ListShelterInventoryItemsBoDocument, options);
        }
export function useListShelterInventoryItemsBoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListShelterInventoryItemsBoQuery, ListShelterInventoryItemsBoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListShelterInventoryItemsBoQuery, ListShelterInventoryItemsBoQueryVariables>(ListShelterInventoryItemsBoDocument, options);
        }
export type ListShelterInventoryItemsBoQueryHookResult = ReturnType<typeof useListShelterInventoryItemsBoQuery>;
export type ListShelterInventoryItemsBoLazyQueryHookResult = ReturnType<typeof useListShelterInventoryItemsBoLazyQuery>;
export type ListShelterInventoryItemsBoSuspenseQueryHookResult = ReturnType<typeof useListShelterInventoryItemsBoSuspenseQuery>;
export type ListShelterInventoryItemsBoQueryResult = Apollo.QueryResult<ListShelterInventoryItemsBoQuery, ListShelterInventoryItemsBoQueryVariables>;
export const ListOperationalShelterWalksBoDocument = gql`
    query listOperationalShelterWalksBO($shelter_id: ID!) {
  listOperationalShelterWalks(shelter_id: $shelter_id) {
    success
    error {
      code
      message
    }
    items {
      id
      created_at
      status
      scheduled_at
      started_at
      ended_at
      duration_minutes
      notes
      shelter_pet {
        id
        pet {
          id
          name
        }
      }
      walker {
        id
        first_name
        last_name
      }
      walker_shelter_person {
        id
        first_name
        last_name
      }
    }
  }
}
    `;

/**
 * __useListOperationalShelterWalksBoQuery__
 *
 * To run a query within a React component, call `useListOperationalShelterWalksBoQuery` and pass it any options that fit your needs.
 * When your component renders, `useListOperationalShelterWalksBoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListOperationalShelterWalksBoQuery({
 *   variables: {
 *      shelter_id: // value for 'shelter_id'
 *   },
 * });
 */
export function useListOperationalShelterWalksBoQuery(baseOptions: Apollo.QueryHookOptions<ListOperationalShelterWalksBoQuery, ListOperationalShelterWalksBoQueryVariables> & ({ variables: ListOperationalShelterWalksBoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListOperationalShelterWalksBoQuery, ListOperationalShelterWalksBoQueryVariables>(ListOperationalShelterWalksBoDocument, options);
      }
export function useListOperationalShelterWalksBoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListOperationalShelterWalksBoQuery, ListOperationalShelterWalksBoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListOperationalShelterWalksBoQuery, ListOperationalShelterWalksBoQueryVariables>(ListOperationalShelterWalksBoDocument, options);
        }
export function useListOperationalShelterWalksBoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListOperationalShelterWalksBoQuery, ListOperationalShelterWalksBoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListOperationalShelterWalksBoQuery, ListOperationalShelterWalksBoQueryVariables>(ListOperationalShelterWalksBoDocument, options);
        }
export type ListOperationalShelterWalksBoQueryHookResult = ReturnType<typeof useListOperationalShelterWalksBoQuery>;
export type ListOperationalShelterWalksBoLazyQueryHookResult = ReturnType<typeof useListOperationalShelterWalksBoLazyQuery>;
export type ListOperationalShelterWalksBoSuspenseQueryHookResult = ReturnType<typeof useListOperationalShelterWalksBoSuspenseQuery>;
export type ListOperationalShelterWalksBoQueryResult = Apollo.QueryResult<ListOperationalShelterWalksBoQuery, ListOperationalShelterWalksBoQueryVariables>;
export const MyShelterAuthorizationBoDocument = gql`
    query myShelterAuthorizationBO($shelter_id: ID!) {
  myShelterAuthorization(shelter_id: $shelter_id) {
    success
    error {
      code
      message
    }
    authorization {
      shelter_id
      membership_status
      permissions
    }
  }
}
    `;

/**
 * __useMyShelterAuthorizationBoQuery__
 *
 * To run a query within a React component, call `useMyShelterAuthorizationBoQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyShelterAuthorizationBoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyShelterAuthorizationBoQuery({
 *   variables: {
 *      shelter_id: // value for 'shelter_id'
 *   },
 * });
 */
export function useMyShelterAuthorizationBoQuery(baseOptions: Apollo.QueryHookOptions<MyShelterAuthorizationBoQuery, MyShelterAuthorizationBoQueryVariables> & ({ variables: MyShelterAuthorizationBoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyShelterAuthorizationBoQuery, MyShelterAuthorizationBoQueryVariables>(MyShelterAuthorizationBoDocument, options);
      }
export function useMyShelterAuthorizationBoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyShelterAuthorizationBoQuery, MyShelterAuthorizationBoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyShelterAuthorizationBoQuery, MyShelterAuthorizationBoQueryVariables>(MyShelterAuthorizationBoDocument, options);
        }
export function useMyShelterAuthorizationBoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyShelterAuthorizationBoQuery, MyShelterAuthorizationBoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyShelterAuthorizationBoQuery, MyShelterAuthorizationBoQueryVariables>(MyShelterAuthorizationBoDocument, options);
        }
export type MyShelterAuthorizationBoQueryHookResult = ReturnType<typeof useMyShelterAuthorizationBoQuery>;
export type MyShelterAuthorizationBoLazyQueryHookResult = ReturnType<typeof useMyShelterAuthorizationBoLazyQuery>;
export type MyShelterAuthorizationBoSuspenseQueryHookResult = ReturnType<typeof useMyShelterAuthorizationBoSuspenseQuery>;
export type MyShelterAuthorizationBoQueryResult = Apollo.QueryResult<MyShelterAuthorizationBoQuery, MyShelterAuthorizationBoQueryVariables>;
export const ListOperationalShelterTasksBoDocument = gql`
    query listOperationalShelterTasksBO($shelter_id: ID!) {
  listOperationalShelterTasks(shelter_id: $shelter_id) {
    success
    error {
      code
      message
    }
    items {
      id
      created_at
      task_type
      area
      status
      scheduled_at
      scheduled_date
      is_recurring
      notes
      shelter_pet {
        id
        pet {
          id
          name
        }
      }
      assignees {
        id
        first_name
        last_name
      }
      assignee_shelter_people {
        id
        first_name
        last_name
      }
    }
  }
}
    `;

/**
 * __useListOperationalShelterTasksBoQuery__
 *
 * To run a query within a React component, call `useListOperationalShelterTasksBoQuery` and pass it any options that fit your needs.
 * When your component renders, `useListOperationalShelterTasksBoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListOperationalShelterTasksBoQuery({
 *   variables: {
 *      shelter_id: // value for 'shelter_id'
 *   },
 * });
 */
export function useListOperationalShelterTasksBoQuery(baseOptions: Apollo.QueryHookOptions<ListOperationalShelterTasksBoQuery, ListOperationalShelterTasksBoQueryVariables> & ({ variables: ListOperationalShelterTasksBoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListOperationalShelterTasksBoQuery, ListOperationalShelterTasksBoQueryVariables>(ListOperationalShelterTasksBoDocument, options);
      }
export function useListOperationalShelterTasksBoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListOperationalShelterTasksBoQuery, ListOperationalShelterTasksBoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListOperationalShelterTasksBoQuery, ListOperationalShelterTasksBoQueryVariables>(ListOperationalShelterTasksBoDocument, options);
        }
export function useListOperationalShelterTasksBoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListOperationalShelterTasksBoQuery, ListOperationalShelterTasksBoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListOperationalShelterTasksBoQuery, ListOperationalShelterTasksBoQueryVariables>(ListOperationalShelterTasksBoDocument, options);
        }
export type ListOperationalShelterTasksBoQueryHookResult = ReturnType<typeof useListOperationalShelterTasksBoQuery>;
export type ListOperationalShelterTasksBoLazyQueryHookResult = ReturnType<typeof useListOperationalShelterTasksBoLazyQuery>;
export type ListOperationalShelterTasksBoSuspenseQueryHookResult = ReturnType<typeof useListOperationalShelterTasksBoSuspenseQuery>;
export type ListOperationalShelterTasksBoQueryResult = Apollo.QueryResult<ListOperationalShelterTasksBoQuery, ListOperationalShelterTasksBoQueryVariables>;
export const GetGroupedStatsDocument = gql`
    query getGroupedStats($dateFrom: String!, $dateTo: String, $group: String!) {
  getGroupedStatistics(date_from: $dateFrom, date_to: $dateTo, group: $group) {
    statistics {
      all_pets
      all_users
      active_users_min
      active_users_mean
      active_users_max
      labels
    }
    success
    error {
      code
      message
    }
  }
}
    `;

/**
 * __useGetGroupedStatsQuery__
 *
 * To run a query within a React component, call `useGetGroupedStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupedStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupedStatsQuery({
 *   variables: {
 *      dateFrom: // value for 'dateFrom'
 *      dateTo: // value for 'dateTo'
 *      group: // value for 'group'
 *   },
 * });
 */
export function useGetGroupedStatsQuery(baseOptions: Apollo.QueryHookOptions<GetGroupedStatsQuery, GetGroupedStatsQueryVariables> & ({ variables: GetGroupedStatsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGroupedStatsQuery, GetGroupedStatsQueryVariables>(GetGroupedStatsDocument, options);
      }
export function useGetGroupedStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGroupedStatsQuery, GetGroupedStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGroupedStatsQuery, GetGroupedStatsQueryVariables>(GetGroupedStatsDocument, options);
        }
export function useGetGroupedStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetGroupedStatsQuery, GetGroupedStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGroupedStatsQuery, GetGroupedStatsQueryVariables>(GetGroupedStatsDocument, options);
        }
export type GetGroupedStatsQueryHookResult = ReturnType<typeof useGetGroupedStatsQuery>;
export type GetGroupedStatsLazyQueryHookResult = ReturnType<typeof useGetGroupedStatsLazyQuery>;
export type GetGroupedStatsSuspenseQueryHookResult = ReturnType<typeof useGetGroupedStatsSuspenseQuery>;
export type GetGroupedStatsQueryResult = Apollo.QueryResult<GetGroupedStatsQuery, GetGroupedStatsQueryVariables>;
export const CreateUserBoDocument = gql`
    mutation createUserBO($data: UserCreate!) {
  createUser(data: $data) {
    success
    error {
      code
      message
    }
    user {
      id
      first_name
      last_name
      email
    }
  }
}
    `;
export type CreateUserBoMutationFn = Apollo.MutationFunction<CreateUserBoMutation, CreateUserBoMutationVariables>;

/**
 * __useCreateUserBoMutation__
 *
 * To run a mutation, you first call `useCreateUserBoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserBoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserBoMutation, { data, loading, error }] = useCreateUserBoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserBoMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserBoMutation, CreateUserBoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserBoMutation, CreateUserBoMutationVariables>(CreateUserBoDocument, options);
      }
export type CreateUserBoMutationHookResult = ReturnType<typeof useCreateUserBoMutation>;
export type CreateUserBoMutationResult = Apollo.MutationResult<CreateUserBoMutation>;
export type CreateUserBoMutationOptions = Apollo.BaseMutationOptions<CreateUserBoMutation, CreateUserBoMutationVariables>;
export const GetPaginatedUsersDocument = gql`
    query getPaginatedUsers($search: CommonSearch!) {
  listUsers(commonSearch: $search) {
    pagination {
      total_items
      total_pages
      current_page
      page_size
    }
    success
    error {
      message
      code
      extra
    }
    items {
      ...ListUser
    }
  }
}
    ${ListUserFragmentDoc}`;

/**
 * __useGetPaginatedUsersQuery__
 *
 * To run a query within a React component, call `useGetPaginatedUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaginatedUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaginatedUsersQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useGetPaginatedUsersQuery(baseOptions: Apollo.QueryHookOptions<GetPaginatedUsersQuery, GetPaginatedUsersQueryVariables> & ({ variables: GetPaginatedUsersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaginatedUsersQuery, GetPaginatedUsersQueryVariables>(GetPaginatedUsersDocument, options);
      }
export function useGetPaginatedUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaginatedUsersQuery, GetPaginatedUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaginatedUsersQuery, GetPaginatedUsersQueryVariables>(GetPaginatedUsersDocument, options);
        }
export function useGetPaginatedUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPaginatedUsersQuery, GetPaginatedUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPaginatedUsersQuery, GetPaginatedUsersQueryVariables>(GetPaginatedUsersDocument, options);
        }
export type GetPaginatedUsersQueryHookResult = ReturnType<typeof useGetPaginatedUsersQuery>;
export type GetPaginatedUsersLazyQueryHookResult = ReturnType<typeof useGetPaginatedUsersLazyQuery>;
export type GetPaginatedUsersSuspenseQueryHookResult = ReturnType<typeof useGetPaginatedUsersSuspenseQuery>;
export type GetPaginatedUsersQueryResult = Apollo.QueryResult<GetPaginatedUsersQuery, GetPaginatedUsersQueryVariables>;
export const GetUserDocument = gql`
    query getUser($id: ID!) {
  getUser(id: $id) {
    user {
      ...FullUser
    }
    success
    error {
      code
      message
      extra
    }
  }
}
    ${FullUserFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables> & ({ variables: GetUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetUserOwnershipDocument = gql`
    query getUserOwnership($id: ID!, $commonSearch: CommonSearch!) {
  getUser(id: $id) {
    user {
      ownerships(commonSearch: $commonSearch) {
        ...UserOwnerships
      }
    }
    success
    error {
      code
      message
      extra
    }
  }
}
    ${UserOwnershipsFragmentDoc}`;

/**
 * __useGetUserOwnershipQuery__
 *
 * To run a query within a React component, call `useGetUserOwnershipQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserOwnershipQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserOwnershipQuery({
 *   variables: {
 *      id: // value for 'id'
 *      commonSearch: // value for 'commonSearch'
 *   },
 * });
 */
export function useGetUserOwnershipQuery(baseOptions: Apollo.QueryHookOptions<GetUserOwnershipQuery, GetUserOwnershipQueryVariables> & ({ variables: GetUserOwnershipQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserOwnershipQuery, GetUserOwnershipQueryVariables>(GetUserOwnershipDocument, options);
      }
export function useGetUserOwnershipLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserOwnershipQuery, GetUserOwnershipQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserOwnershipQuery, GetUserOwnershipQueryVariables>(GetUserOwnershipDocument, options);
        }
export function useGetUserOwnershipSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserOwnershipQuery, GetUserOwnershipQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserOwnershipQuery, GetUserOwnershipQueryVariables>(GetUserOwnershipDocument, options);
        }
export type GetUserOwnershipQueryHookResult = ReturnType<typeof useGetUserOwnershipQuery>;
export type GetUserOwnershipLazyQueryHookResult = ReturnType<typeof useGetUserOwnershipLazyQuery>;
export type GetUserOwnershipSuspenseQueryHookResult = ReturnType<typeof useGetUserOwnershipSuspenseQuery>;
export type GetUserOwnershipQueryResult = Apollo.QueryResult<GetUserOwnershipQuery, GetUserOwnershipQueryVariables>;
export const GetUserTreatmentsDocument = gql`
    query getUserTreatments($userId: String!, $page: Int!) {
  listTreatments(
    commonSearch: {page: $page, order_by: "date", filters: {join: [{key: "health_cards", value: {join: [{key: "pets", value: {join: [{key: "ownerships", value: {fixed: [{key: "user_id", value: $userId}]}}]}}]}}]}}
  ) {
    success
    error {
      code
      message
      extra
    }
    pagination {
      page_size
      current_page
      total_pages
      total_items
    }
    items {
      ...UserTreatment
    }
  }
}
    ${UserTreatmentFragmentDoc}`;

/**
 * __useGetUserTreatmentsQuery__
 *
 * To run a query within a React component, call `useGetUserTreatmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserTreatmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserTreatmentsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetUserTreatmentsQuery(baseOptions: Apollo.QueryHookOptions<GetUserTreatmentsQuery, GetUserTreatmentsQueryVariables> & ({ variables: GetUserTreatmentsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserTreatmentsQuery, GetUserTreatmentsQueryVariables>(GetUserTreatmentsDocument, options);
      }
export function useGetUserTreatmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserTreatmentsQuery, GetUserTreatmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserTreatmentsQuery, GetUserTreatmentsQueryVariables>(GetUserTreatmentsDocument, options);
        }
export function useGetUserTreatmentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserTreatmentsQuery, GetUserTreatmentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserTreatmentsQuery, GetUserTreatmentsQueryVariables>(GetUserTreatmentsDocument, options);
        }
export type GetUserTreatmentsQueryHookResult = ReturnType<typeof useGetUserTreatmentsQuery>;
export type GetUserTreatmentsLazyQueryHookResult = ReturnType<typeof useGetUserTreatmentsLazyQuery>;
export type GetUserTreatmentsSuspenseQueryHookResult = ReturnType<typeof useGetUserTreatmentsSuspenseQuery>;
export type GetUserTreatmentsQueryResult = Apollo.QueryResult<GetUserTreatmentsQuery, GetUserTreatmentsQueryVariables>;