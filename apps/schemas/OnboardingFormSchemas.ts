import z from "zod";

export const emailSchema = z.email({
    message: "Enter a valid email address"
});

export const firstNameSchema = z.string().min(2, {
    message: "First name must be at least 2 characters"
}).regex(/^[A-Za-z]+$/, {
    message: "First name can only contain letters"
});

export const lastNameSchema = z.string().min(1, {
    message: "Last name must be at least 2 characters"
}).regex(/^[A-Za-z]+$/, {
    message: "Last name can only contain letters"
});

export const genderSchema = z.enum(["male", "female", "non_binary", "prefer_not_to_say"], {
    message: "Select a valid gender"
});

const currentYear = new Date().getFullYear();

export const dobSchema = z.object({
    month: z.string().min(1, "Month is required").regex(/^(0?[1-9]|1[0-2])$/, "Invalid month"),
    day: z.string().min(1, "Day is required").regex(/^(0?[1-9]|[12]\d|3[01])$/, "Invalid day"),
    year: z.string().min(1, "Year is required").regex(/^\d{4}$/, "Invalid year")
        .refine(val => +val >= 1900 && +val <= currentYear, "Invalid year"),
}).superRefine((data, ctx) => {
    const { month, day, year } = data;

    if (!month || !day || !year || year.length !== 4) return;

    const dob = new Date(+year, +month - 1, +day);
    const today = new Date();

    const isValidDate =
        dob.getFullYear() === +year &&
        dob.getMonth() === +month - 1 &&
        dob.getDate() === +day;

    if (!isValidDate) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invalid date",
            path: ["day"],
        });
        return;
    }

    const age = today.getFullYear() - dob.getFullYear();
    const hasBirthdayPassed =
        today.getMonth() > dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());

    const actualAge = hasBirthdayPassed ? age : age - 1;

    if (actualAge < 18) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "You must be at least 18 years old to claim.",
            path: ["year"],
        });
    }
});

export const zipCodeSchema = z.string().min(5, {
    message: "Zip code must be at least 5 characters"
}).max(10, {
    message: "Zip code must be at most 10 characters"
}).regex(/^\d{5}(-\d{4})?$/, {
    message: "Enter a valid zip code"
});

export const addressSchema = z.string().min(5, {
    message: "Address must be at least 5 characters"
}).max(100, {
    message: "Address must be at most 100 characters"
});

export const citySchema = z.string().min(2, {
    message: "City must be at least 2 characters"
}).max(50, {
    message: "City must be at most 50 characters"
}).regex(/^[A-Za-z\s]+$/, {
    message: "City can only contain letters and spaces"
});

export const stateSchema = z.string().min(2, {
    message: "State must be at least 2 characters"
}).max(50, {
    message: "State must be at most 50 characters"
}).regex(/^[A-Za-z\s]+$/, {
    message: "State can only contain letters and spaces"
});

export const phoneNumberSchema = z.string()
    .transform(val => val.replace(/\s+/g, ''))
    .pipe(
        z.string()
            .regex(/^\+?[1-9]\d{9,14}$/, {
                message: "Enter a valid phone number (e.g. +919876543210)"
            })
    );

const EmailFormSchema = z.object({
    email: emailSchema
});

const PersonalInfoFormSchema = z.object({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    gender: genderSchema,
    dob: dobSchema
});

const AddressInfoFormSchema = z.object({
    zipCode: zipCodeSchema,
    address: addressSchema,
    city: citySchema,
    state: stateSchema,
});

const ContactInfoFormSchema = z.object({
    phoneNumber: phoneNumberSchema
});


export const OnboardingFormSchema = z.object({
    ...EmailFormSchema.shape,
    ...PersonalInfoFormSchema.shape,
    ...AddressInfoFormSchema.shape,
    ...ContactInfoFormSchema.shape
});