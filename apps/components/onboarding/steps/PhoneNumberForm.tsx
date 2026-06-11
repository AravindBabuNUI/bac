import { Input } from "@/ui/atoms";
import { StepLayout } from "@/ui/molecules/wizard";
import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";

const PhoneNumberForm = () => {
  const { control, getValues } = useFormContext();
  const firstName = getValues("firstName") || "there";
  return (
    <StepLayout
      title={`Last Step, ${firstName}!`}
      subtitle="Thanks! Please confirm your number"
    >
      <Input
        name="phoneNumber"
        control={control}
        label="PHONE NUMBER"
        type="tel"
        isRequired
      />
      <div className="mx-auto font-lato max-w-lg text-[13px] leading-[17px] text-disclaimer mt-2.5 text-justify">
        By selecting "Continue", I provide my ESIGN signature and express consent
        for GetnGoods, Unified Marketing Partners & its{" "}
        <a href="#" className="text-blue-500 underline" aria-label="Subsidiaries">
          Subsidiaries
        </a>
        , SnagnGoods, USMsg, MyJobMobile, OMG Sweeps, Best Day Ever Sweepstakes,
        FamilyRecoveryHub, Dollar-Sensei, CheckGo, Lendli, Benefitlink, Americas
        Health and Grant-Navigators to contact me at the phone number I provided
        for marketing and transactional messages, including personal finance,
        benefits & sweepstakes, via text and calls, which may use automated,
        manual, prerecorded, or AI technology, until I revoke consent. This
        applies even if my number is on a "Do Not Call" list. Consent is not
        required to to use this site or obtain goods/services.{" "}
        <a href="#" className="text-blue-500 underline" aria-label="Click here to proceed without providing consent">
          Click Here
        </a>{" "}
        to proceed without consent. I have read and agree to the{" "}
        <Link to="/terms" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
          Terms & Conditions
        </Link>
        , including mandatory arbitration, and for resolving disputes and TCPA
        claim.
      </div>
    </StepLayout>
  )
}

export default PhoneNumberForm;
