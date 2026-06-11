import { STATE_OPTIONS } from "@/constants/locationOptions";
import Input from "@/ui/atoms/input/Input";
import Select from "@/ui/atoms/select/Select";
import StepLayout from "@/ui/molecules/wizard/StepLayout";
import { useFormContext } from "react-hook-form";

const AddressInfoForm = () => {
  const { control, getValues, formState: { errors } } = useFormContext();
  const firstName = getValues("firstName") || "there";

  const hasAnyError = ['zipCode', 'address', 'city', 'state'].some(f => !!errors[f]);

  return (
    <StepLayout
      title={`Keep Going, ${firstName}!`}
      subtitle="Now we just need the basics"
      isDisabled={hasAnyError}
    >
      <Input
        name="zipCode"
        control={control}
        label="ZIP CODE"
      />
      <Input name="address" control={control} label="ADDRESS" />

      <div className="flex gap-4">
        <Input name="city" control={control} label="CITY" className="flex-1" />
        <Select
          name="state"
          control={control}
          label="STATE"
          options={STATE_OPTIONS}
          className="flex-1"
          placeholder="Select a state"
        />
      </div>
    </StepLayout>
  );
};

export default AddressInfoForm;
