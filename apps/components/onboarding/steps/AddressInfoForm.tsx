import { STATE_OPTIONS } from "@/common/options/locationOptions";
import Input from "@/ui/atoms/input/Input";
import Select from "@/ui/atoms/select/Select";
import StepLayout from "@/ui/molecules/wizard/StepLayout";
import { useFormContext } from "react-hook-form";

const AddressInfoForm = () => {
  const { control, getValues } = useFormContext();
  const firstName = getValues("firstName") || "there";
  return (
    <StepLayout
      title={`Keep Going, ${firstName}!`}
      subtitle="Now we just need the basics"
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
  )
}

export default AddressInfoForm;
