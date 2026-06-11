import { useFormContext } from "react-hook-form";
import CASH from "@assets/cash.webp";
import { Input, Button } from "@/ui/atoms";

const EmailForm = () => {
  const { control, formState: {errors} } = useFormContext();
  const hasError = !!errors["email"];
  return (
    <div className="text-center space-y-8 pt-5 pb-6">
      <p className="text-primary pt-13 font-fira font-bold text-2xl md:text-5xl leading-10">
        Find Your Unclaimed Money
      </p>
      <img
        src={CASH}
        alt="Unclaimed Money Pile"
        className="h-[122px] mx-auto object-contain pointer-events-none"
      />
      <p className="pt-6.5 font-lato font-bold text-[20px] text-muted leading-6">
        Get your free, made-for-you guide to unclaimed money, savings, and cash
        opportunities
      </p>
      <Input control={control} label="Email" name="email" isRequired />
      <div className="mt-8 flex justify-center w-full max-w-lg mx-auto">
        <Button variant="secondary" rounded type="submit" className="w-full" disabled={hasError}>
          GET MY GUIDE
        </Button>
      </div>
    </div>
  );
};

export default EmailForm;