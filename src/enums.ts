export const TagGroupArray = [
  "teacher_gender",
  "accepted_male_students",
  "accepted_female_students",
  "class_participation",
  "class_format",
  "class_fee",
  "class_schedule",
  "others",
] as const;
export type TagGroupType = (typeof TagGroupArray)[number];

export const UserRoleArray = ["individual", "organization", "admin"] as const;
export enum UserRole {
  Admin = "admin",
  Individual = "individual",
  Organization = "organization",
}
export type UserRoleType = (typeof UserRoleArray)[number];

export const GenderArray = ["male", "female"] as const;
export type GenderType = (typeof GenderArray)[number];
