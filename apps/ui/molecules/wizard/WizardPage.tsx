import type { WizardPageProps } from "./types";
function WizardPage(props: WizardPageProps) {
  const { steps, currentStepIndex = 0 } = props || {};

  const currentStep = steps[currentStepIndex];
  if (!currentStep) return null;

  const {
    pageInfo,
    additionalInfo: pageAdditionalInfo,
  } = currentStep || {};

  const hasPageHeader = pageAdditionalInfo || pageInfo;

  return (
    <div className="w-full bg-white shadow-card rounded-xl p-6 sm:p-8">
      {hasPageHeader && (
        <div className="mb-6 text-center">
          {pageAdditionalInfo && (
            <p className="text-muted text-[15px] mb-2">
              {pageAdditionalInfo}
            </p>
          )}
          {pageInfo && (
            <div className="text-xs text-label">{pageInfo}</div>
          )}
        </div>
      )}

      <div key={currentStepIndex} className="w-full animate-slide-up">
        {currentStep.component}
      </div>
    </div>
  );
}

export default WizardPage;
