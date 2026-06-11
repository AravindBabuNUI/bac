import type { OnboardingFormData } from "@/types/OnboardingForm.type";
import { Wizard } from "@/ui/molecules/wizard";
import { useForm, FormProvider } from "react-hook-form";
import { OnboardingStepsEnum, STEPS, type OnboardingStepsEnumType } from "./steps/stepConfig";
import { OnboardingFormSchema } from "@/schemas/OnboardingFormSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type SyntheticEvent } from "react";
import SuccessPage from "./SuccessPage";
import { ONBOARDING_DEFAULT_VALUES } from "@/constants/onboardingFormDefaults";

const OnboardingForm = () => {
    const [currentStep, setCurrentStep] = useState<OnboardingStepsEnumType>(OnboardingStepsEnum.Email);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const methods = useForm<OnboardingFormData>({
        mode: "onChange",
        defaultValues: ONBOARDING_DEFAULT_VALUES,
        resolver: zodResolver(OnboardingFormSchema),
    })
    const { trigger } = methods;

    const currentStepIndex = STEPS.findIndex(step => step.step === currentStep);

    const handleNext = async () => {
        console.log('Current step index: ', currentStepIndex);
        const fieldsToValidate = STEPS[currentStepIndex].validations;
        const isStepValid = fieldsToValidate
            ? await trigger(fieldsToValidate as (keyof OnboardingFormData)[])
            : true;

        if (isStepValid) {
            const nextIndex = Math.min(currentStepIndex + 1, STEPS.length - 1);
            setCurrentStep(STEPS[nextIndex].step as OnboardingStepsEnumType);
        }
    };
    
    const onHandleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        console.log("Submitting form...", currentStep, currentStepIndex, isSubmitted);
        event.preventDefault();
        if (currentStepIndex === STEPS.length - 1) {
            setIsSubmitted(true);
            console.log("Final step reached, validating entire form...");
        }
        else {
            handleNext()
            console.log("Current form values: ", methods.getValues());
            console.log('Form submitted successfully!');
        }
    }
    return isSubmitted ? <SuccessPage /> :
        (<FormProvider {...methods}>
            <form onSubmit={onHandleSubmit}>
                <Wizard steps={STEPS} currentStepIndex={currentStepIndex} showProgress={currentStepIndex > 0} />
            </form>
        </FormProvider>

        )
}

export default OnboardingForm;
