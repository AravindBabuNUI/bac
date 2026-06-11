import ProgressBar from "@/ui/molecules/wizard/ProgressBar";
import { STEPS } from "./steps/stepConfig";
import { Button } from "@/ui/atoms";

const YES_NO_OPTIONS = ["Yes, I'm feeling lucky!", "No, maybe next time."];

const SuccessPage = () => {
    return (
        <div className="w-full">
            <ProgressBar currentStep={STEPS.length} labels={STEPS.map((s) => s.name)} />
            <div className="text-center w-full bg-white shadow-card rounded-xl p-6 sm:p-8 mt-2">
                <h2 id="success-question" className="pt-2 text-2xl text-black mb-10 animate-bounce-in">
                    Welcome back! Are you feeling lucky today?
                </h2>

                <div
                    role="group"
                    aria-labelledby="success-question"
                    className="space-y-2.5 max-w-xs mx-auto"
                >
                    {YES_NO_OPTIONS.map((option) => (
                        <Button
                            key={option}
                            type="button"
                            variant="primary"
                            className="w-full text-xl py-4 rounded-lg! normal-case"
                        >
                            {option}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SuccessPage;