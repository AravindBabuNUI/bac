import { Button } from "@/ui/atoms";
import type { StepLayoutProps } from "./types";

const StepLayout = ({
  title,
  subtitle,
  children,
  onContinue,
  continueText = "CONTINUE",
  isSubmit = true,
  isDisabled = false
}: StepLayoutProps) => {
  return (
    <div
      role="group"
      aria-labelledby="step-title"
      className="flex flex-col animate-step-slide-in"
    >
      <div className="text-center font-bold mb-6">
        <h2 id="step-title" className="font-fira text-2xl md:text-4xl leading-10 text-primary mb-2">
          {title}
        </h2>
        <p className="font-lato text-muted text-[19px] leading-6">{subtitle}</p>
      </div>

      <div className="space-y-4 mb-6">{children}</div>

      <Button
        type={isSubmit ? "submit" : "button"}
        className="w-full max-w-lg mx-auto"
        onClick={!isSubmit ? onContinue : undefined}
        variant="secondary"
        rounded
        disabled={!!isDisabled}
      >
        {continueText}
      </Button>
    </div>
  );
};

export default StepLayout;
