import ProgressBar from "./ProgressBar";
import type { WizardProps } from "./types";
import WizardPage from "./WizardPage";

const Wizard = ({
  showProgress = true,
  steps,
  currentStepIndex,
}: WizardProps) => {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      {showProgress && (
        <ProgressBar
          currentStep={currentStepIndex}
          labels={steps.map((s) => s.name)}
        />
      )}
      <div className="w-full">
        <WizardPage
          steps={steps}
          currentStepIndex={currentStepIndex}
        />
      </div>
    </div>
  );
};

export default Wizard;
