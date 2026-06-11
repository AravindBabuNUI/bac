import type { ProgressBarProps } from "./types";
import BAG_LOGO from "@assets/bag_logo.svg";
import CASH from "@assets/cash.webp";

const ProgressBar = ({ currentStep, labels }: ProgressBarProps) => {
  return (
    <div className="w-full bg-white rounded-[11px] p-3 shadow-card">
      <div className="flex flex-col items-center">
        <img src={BAG_LOGO} alt="Benefits Access Center Logo" className="h-6 mb-4" />
        <img
          src={CASH}
          alt="Money pile"
          className="h-24 object-contain mb-6 pointer-events-none"
        />
        <ol
          aria-label="Form progress"
          aria-live="polite"
          aria-atomic="true"
          className="flex justify-center gap-2 w-full max-w-xs list-none p-0 m-0"
        >
          {labels.map((label, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isActive = index <= currentStep;
            return (
              <li
                key={index}
                aria-current={isCurrent ? "step" : undefined}
                aria-label={
                  isCurrent
                    ? `Current step: ${label}`
                    : isCompleted
                    ? `Completed: ${label}`
                    : `Upcoming: ${label}`
                }
                className={`h-2 flex-1 rounded-[30px] ${
                  isActive ? "bg-progress-active" : "bg-progress-inactive"
                }`}
              />
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default ProgressBar;