import type { WizardStep } from "@/ui/molecules/wizard/types";
import EmailForm from "./EmailForm";
import PersonalInfoForm from "./PersonalInfoForm";
import AddressInfoForm from "./AddressInfoForm";
import PhoneNumberForm from "./PhoneNumberForm";

export const OnboardingStepsEnum = {
    Email: "Email",
    PersonalInfo: "Personal Info",
    AddressInfo: "Address Info",
    ContactInfo: "Contact Info"
} as const;

export type OnboardingStepsEnumType = typeof OnboardingStepsEnum[keyof typeof OnboardingStepsEnum];

export const STEPS: WizardStep[] = [
    {
        name: "Email",
        step: OnboardingStepsEnum.Email,
        component: <EmailForm />,
        validations: ["email"]
    },
    {
        name: "Personal Info",
        step: OnboardingStepsEnum.PersonalInfo,
        component: <PersonalInfoForm />,
        validations: ["firstName", "lastName", "dob.month", "dob.day", "dob.year", "gender"]
    },
    {
        name: "Address Info",
        step: OnboardingStepsEnum.AddressInfo,
        component: <AddressInfoForm />,
        validations: ["address", "state", "zipCode"]
    },
    {
        name: "Contact Info",
        step: OnboardingStepsEnum.ContactInfo,
        component: <PhoneNumberForm />,
        validations: ["phoneNumber"]
    },
];