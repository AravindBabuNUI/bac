export const Genders = {
    Male: 'male',
    Female: 'female',
    NonBinary: 'non_binary',
    PreferNotToSay: 'prefer_not_to_say',
} as const;

export type GenderEnum = typeof Genders[keyof typeof Genders]

export interface OnboardingFormData {
    email: string;
    firstName: string;
    lastName: string;
    dob: { month: string; day: string; year: string; };
    phoneNumber: string;
    gender: GenderEnum;
    zipCode: string;
    address: string;
    city: string;
    state: string;
}