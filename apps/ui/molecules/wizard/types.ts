export interface WizardStep {
  name: string;
  pageInfo?: string;
  additionalInfo?: string;
  component: React.ReactNode;
  validations: string[];
  step?: string;
}

export interface WizardProps {
  steps: WizardStep[];
  currentStepIndex: number;
  showProgress?: boolean;
  onNext?: () => void;
  isNextPending?: boolean;
}

export interface WizardPageProps {
  steps: WizardStep[];
  currentStepIndex: number;
}

export interface StepLayoutProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  children: React.ReactNode;
  onContinue?: () => void;
  continueText?: string;
  isSubmit?: boolean;
}


export interface ProgressBarProps {
  currentStep: number;
  labels: string[];
}
