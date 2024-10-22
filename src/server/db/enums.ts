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

export type TagGroupEnum = (typeof TagGroupArray)[number];
