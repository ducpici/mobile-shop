export type User = {
  id: 1;
  name: string;
  email: string;
  avatar: string;
  dob: Date | string;
  gender: Gender;
  companyAddress: string;
  homeAddress: string;
};

export enum Gender {
  Male = 1,
  Female = 0,
}

export const GenderLabel: Record<Gender, string> = {
  [Gender.Male]: "Male",
  [Gender.Female]: "Female",
};
