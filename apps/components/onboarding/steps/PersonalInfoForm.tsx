import { DAY_OPTIONS, MONTH_OPTIONS, YEAR_OPTIONS } from "@/constants/dateOptions";
import { GENDER_OPTIONS } from "@/constants/genderOptions";
import { Input, Select } from "@/ui/atoms";
import StepLayout from "@/ui/molecules/wizard/StepLayout";
import { useFormContext } from "react-hook-form";

const PersonalInfoForm = () => {
  const { control, formState: { errors } } = useFormContext();
  const hasAnyError = ['firstName', 'lastName', 'dob.month', 'dob.day', 'dob.year', 'gender'].some(f => !!errors[f]);
  
  return (
    <StepLayout
      title="Welcome!"
      subtitle="Now we just need the basics"
      isDisabled={hasAnyError}
    >
      <Input
        name="firstName"
        control={control}
        label="FIRST NAME"
        isRequired
      />

      <Input
        name="lastName"
        control={control}
        label="LAST NAME"
        isRequired
      />

      <fieldset className="flex flex-col w-full">
        <legend className="block text-left font-lato text-sm font-bold tracking-widest text-muted uppercase mb-1.5">
          DATE OF BIRTH <span className="text-red-500">*</span>
        </legend>
        <div className="flex gap-4 w-full">
          <Select
            name="dob.month"
            control={control}
            placeholder="Month"
            options={MONTH_OPTIONS}
            className="w-full"
          />
          <Select
            name="dob.day"
            control={control}
            placeholder="Day"
            options={DAY_OPTIONS}
            className="w-full"
          />
          <Select
            name="dob.year"
            control={control}
            placeholder="Year"
            options={YEAR_OPTIONS}
            className="w-full"
          />
        </div>
      </fieldset>

      <Select
        name="gender"
        control={control}
        label="GENDER"
        placeholder="Select Gender"
        options={GENDER_OPTIONS}
        isRequired
      />
    </StepLayout>
  );
};

export default PersonalInfoForm;