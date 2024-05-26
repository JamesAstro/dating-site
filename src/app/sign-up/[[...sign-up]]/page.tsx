"use client";

import Wrapper from "@/components/Wrapper";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FirstStep, SecondStep } from "@/components";

interface Step {
  title: string;
  addElement: React.ComponentType<any>;
}

const steps: Step[] = [
  {
    title: "About You",
    addElement: FirstStep,
  },
  {
    title: "Login Credentials",
    addElement: SecondStep,
  },
];

const Signup: NextPage = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    steps.map(() => false)
  );

  const nextStep = () => {
    setCompletedSteps((prevCompletedSteps) => {
      const newCompletedSteps = [...prevCompletedSteps];
      newCompletedSteps[currentStep] = true;
      return newCompletedSteps;
    });
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const previousStep = () => {
    setCompletedSteps((prevCompletedSteps) => {
      const newCompletedSteps = [...prevCompletedSteps];
      newCompletedSteps[currentStep] = false;
      return newCompletedSteps;
    });
    setCurrentStep((prevStep: number) => prevStep - 1);
  };

  const resetStepsCampaign = () => {
    setCurrentStep(0);
  };
  const StepComponent = steps[currentStep]?.addElement;

  return (
    <div className=" bg-secondary ">
      <Wrapper className="min-h-screen flex  py-2  justify-center items-center flex-col">
        <Link href="/" className="w-[280px] block mb-5">
          <Image
            src="/logo.png"
            alt="Filipina Dream Girl logo"
            width={1000}
            height={1000}
            className="w-full h-full"
          />
        </Link>

        <div className=" w-[790px] max-w-full">
          {StepComponent && (
            <StepComponent
              nextStep={nextStep}
              previousStep={previousStep}
              resetStepsCampaign={resetStepsCampaign}
              title={steps[currentStep]?.title}
            />
          )}
        </div>

        {steps && (
          <ul className="mt-5 w-[790px] mx-auto flex justify-center items-center max-w-full">
            {steps.map((stepsItem: Step, index: number) => (
              <li
                role="button"
                aria-label="Close"
                aria-hidden="true"
                onClick={() => {
                  if (currentStep > index && currentStep != steps.length - 1) {
                    setCurrentStep(index);
                  }
                }}
                key={index}
                className={`w-[12px] h-[12px]  rounded-full border-[2px] border-solid border-[#ccc] ${
                  index <= currentStep && "bg-[#000]"
                }  `}
              ></li>
            ))}
          </ul>
        )}
      </Wrapper>
    </div>
  );
};

export default Signup;
