"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setPersonalInfo } from "@/redux/reducer/signupSlice";
import Input from "@/components/Input";
import { subYears } from "date-fns";
import BirthdateSelector from "@/components/BirdthdateSelector";
import Button from "@/components/Button";
interface FirstStepProps {
  className?: string;
  nextStep: () => void;
  title?: string;
}

interface FormValues {
  name: string;
  birthdate: Date;
}

const FirstStep = (props: FirstStepProps) => {
  const { className, nextStep, title } = props;
  const dispatch = useAppDispatch();
  const signupState = useAppSelector((state) => state.signUp);
  const { personalInfo } = signupState;

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      name: signupState.personalInfo?.name ?? "",
      birthdate: new Date(signupState.personalInfo.birthdate) || new Date(),
    },
  });

  const handleFormSubmit = (data: FormValues) => {
    console.log(data);

    const datas = {
      personalInfo: {
        name: data.name,
        birthdate: data.birthdate,
      },
    };
    dispatch(setPersonalInfo(datas));
    nextStep();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex justify-between w-full flex-wrap"
    >
      <div className="w-[46%] rounded-l-[8px] overflow-hidden ">
        <Image
          src="/images/couple.jpg"
          alt="couple"
          width={363}
          height={415}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-[54%] px-5 py-6 pb-7 bg-secondary rounded-r-[8px]  shadow-[1px_1px_6px_rgba(0,0,0,0.18)]">
        <h2 className="text-[38px] text-center text-[#383838] font-[700] cabin">
          Signup
        </h2>
        <p className="mt-2 text-center text-[15px]  text-[#383838]">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-[500] underline hover:text-[#e50a4f]"
          >
            Login
          </Link>
        </p>
        <h3 className="text-center mt-2 text-[#585858] font-[600] text-[24px]">
          {title}
        </h3>
        <div className="mt-4">
          <div className="w-full">
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="text"
                  label="Name/Nickname"
                  value={value}
                  onChange={onChange}
                  isError={errors.name ? true : false}
                />
              )}
              rules={{
                required: "Name/Nickname is required",
              }}
            />
            {errors.name && (
              <p className="text-[13px] text-[#f85151]">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="mt-2 w-full">
            <Controller
              name="birthdate"
              control={control}
              rules={{
                required: "Birthdate is required",
                validate: (value) => {
                  const maxDate = subYears(new Date(), 18);
                  return (
                    (value && value <= maxDate) ||
                    "You must be at least 18 years old"
                  );
                },
              }}
              render={({ field: { onChange, value } }) => (
                <div>
                  <BirthdateSelector
                    value={value}
                    onChange={onChange}
                    label="BirthDate"
                  />
                  {errors.birthdate && (
                    <p className="text-[13px] text-[#f85151]">
                      {errors.birthdate.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        </div>
      </div>
      <div className="mt-5 w-full flex justify-end ">
        <Button type="submit" className="w-[110px] customButtonA py-2">
          Next
        </Button>
      </div>
    </form>
  );
};

export default FirstStep;
