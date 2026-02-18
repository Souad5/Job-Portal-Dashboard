import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Stepper from "../components/stepper/Stepper";
import StepJobDetails from "../components/form/StepJobsDetails";
import StepCompanyInfo from "../components/form/StepCompanyInfo";
import StepRequirements from "../components/form/StepRequirements";
import StepReview from "../components/form/StepReview";

import { JobFormValues } from "../types/job";
import Button from "../components/ui/Button";

export default function JobPostForm() {
  const [step, setStep] = useState(1);

  const methods = useForm<JobFormValues>({
    defaultValues: {
      type: "Full-time",
    },
  });

  const onSubmit = (data: JobFormValues) => {
    console.log("Job Posted:", data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="bg-white mx-4 my-6 px-4 py-6 rounded shadow-sm"
      >
        <Stepper currentStep={step} />

        {step === 1 && <StepJobDetails />}
        {step === 2 && <StepCompanyInfo />}
        {step === 3 && <StepRequirements />}
        {step === 4 && <StepReview />}

        <div className="flex items-center justify-end gap-4 mt-10">
          {step > 1 && (
            <Button
              value="Back"
              type="button"
              style={{}}
              onClick={() => setStep(step - 1)}
            ></Button>
          )}

          {step < 4 ? (
            <Button
              value="Continue"
              style={{}}
              type="button"
              onClick={() => setStep(step + 1)}
            ></Button>
          ) : (
            <Button
              onClick={() => {}}
              type="submit"
              value=" Publish Job"
              style={{}}
            ></Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
