"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setLoginInfo } from "@/redux/reducer/signupSlice";
import Input from "@/components/Input";
import { subYears } from "date-fns";
import BirthdateSelector from "@/components/BirdthdateSelector";
import Button from "@/components/Button";
import { useSignUp } from "@clerk/nextjs";
import type { FormEvent } from "react";
import { BiErrorAlt } from "react-icons/bi";
import { FaCircleCheck } from "react-icons/fa6";

interface SecondStepProps {
  className?: string;
  nextStep: () => void;
  previousStep: () => void;
  title?: string;
}

interface FormValues {
  email: string;
  password: string;
  rePassword: string;
}

const SecondStep = (props: SecondStepProps) => {
  const { className, nextStep, previousStep, title } = props;

  const signupState = useAppSelector((state) => state.signUp);
  const { loginInfo, personalInfo, password } = signupState;

  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loadingCode, setLoadingCode] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [errorCode2, setErrorCode2] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [seconds, setSeconds] = useState<number>(100);
  const [retry, setTry] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  const formattedBirthdate = personalInfo?.birthdate?.toLocaleDateString(
    "en-US",
    {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }
  );

  useEffect(() => {
    if (seconds > 0 && pendingVerification) {
      const timer = setTimeout(() => {
        setTry(false);
        setSeconds(seconds - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setTry(true);
    }
  }, [seconds, pendingVerification]);

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: signupState.loginInfo?.email ?? "",
      password: signupState.password ?? "",
      rePassword: "",
    },
  });

  const handleFormSubmit = async (data: FormValues) => {
    setLoading(true);
    const password = data.password;
    const rePassword = data.rePassword;
    if (password != rePassword) {
      setPasswordMatchError("Passwords do not match");
      setLoading(false);
      return;
    }
    if (!isLoaded) {
      return;
    }

    const datas = {
      loginInfo: {
        email: data.email,
      },
      password: data.password,
    };
    dispatch(setLoginInfo(datas));
    try {
      const { status: signUpStatus } = await signUp.create({
        emailAddress: data?.email,
        password: data?.password,
        firstName: personalInfo.name,
        unsafeMetadata: {
          birthday: formattedBirthdate,
        },
      });

      console.log(signUpStatus);
      // send the email.
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      // change the UI to our pending section.
      setPendingVerification(true);
      document.body.classList.add("modal-open");
    } catch (err: unknown) {
      console.error(JSON.stringify(err, null, 2));
      setShowErrorModal(true);
      const errorEmails = JSON.parse(JSON.stringify(err, null, 2));
      const longMessage = errorEmails.errors[0].longMessage;
      setErrorEmail(longMessage);
    }
    setLoading(false);
  };

  const resendVerification = async () => {
    await signUp?.prepareEmailAddressVerification({ strategy: "email_code" });
    setSeconds(100);
    setTry(false);
  };

  const onPressVerify = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingCode(true);
    document.body.classList.remove("modal-open");
    if (!isLoaded) {
      setLoadingCode(false);
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status !== "complete") {
        console.log(
          "JSON.stringify(completeSignUp, null, 2)",
          JSON.stringify(completeSignUp, null, 2)
        );
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      console.error(JSON.stringify(err, null, 2));
      const errorCodes = JSON.parse(JSON.stringify(err, null, 2));
      console.log("errorCodes", errorCodes);
      const longMessage = errorCodes.errors[0].longMessage;
      const longMessage2 = errorCodes.errors[0].message;
      setErrorCode(longMessage);
      setErrorCode2(longMessage2);
      setLoadingCode(false);
    }
  };

  function closeModal() {
    setShowErrorModal(false);
  }

  const [passwordMatchError, setPasswordMatchError] = useState("");
  return (
    <>
      {showErrorModal && (
        <>
          <div className="fixed left-0 right-0 top-0 z-[199] h-screen w-full bg-[rgba(0,0,0,0.93)]"></div>
          <div className="bg-primary xs:w-[90%] fixed left-0 right-0 top-[50%] z-[200] mx-auto my-auto translate-y-[-50%] rounded-[10px] px-5 pb-6 pt-6 shadow-[0px_0px_9px_rgba(255,255,255,0.5)] sm:w-[450px]">
            <h3 className="mb-3 flex justify-center text-center">
              <BiErrorAlt className="text-[35px] text-[#f85151]" />
            </h3>
            <h2 className="text-secondary mb-3 text-center text-[22px] font-[500] uppercase">
              ERROR!
            </h2>
            <p className="text-center text-[15px] font-[500] text-[#f85151]">
              {errorEmail}
            </p>
            <p className="text-secondary mt-2 text-center text-[15px] font-[500]">
              Please Go back to the Input Field that making it error!
            </p>
            <button
              type="button"
              onClick={closeModal}
              className="customButtonA text-secondary mt-3 w-full rounded-[5px] px-5 py-2 text-[18px] font-[500] hover:opacity-[0.9]"
            >
              Close
            </button>
          </div>
        </>
      )}

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
                name="email"
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <Input
                    type="email"
                    label="Email"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    isError={errors.email ? true : false}
                  />
                )}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
              />
              {errors.email && (
                <p className="text-[13px] text-[#f85151]">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <Controller
                name="password"
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <Input
                    type="password"
                    label="Password"
                    value={value}
                    onChange={onChange}
                    isPassword={true}
                    onBlur={onBlur}
                    isError={errors.password ? true : false}
                  />
                )}
                rules={{
                  required: "Password is required",
                  maxLength: {
                    value: 100,
                    message: "Maximum password length is 100",
                  },
                  minLength: {
                    value: 8,
                    message: "Minimum password length is 8",
                  },
                }}
              />
              {errors.password && (
                <p className="text-[13px] text-[#f85151]">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className=" xs:mt-5 2sm:mt-2 w-full sm:mt-3">
              <Controller
                name="rePassword"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="password"
                    label="Re-Type Password"
                    value={value}
                    onChange={onChange}
                    isPassword={true}
                    isError={errors.rePassword ? true : false}
                  />
                )}
                rules={{
                  required: "Re-Type Password is required",
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                }}
              />
              {errors.rePassword && (
                <p className="text-[13px] text-[#f85151]">
                  {errors.rePassword.message}
                </p>
              )}
              {passwordMatchError && (
                <p className="text-[13px] text-[#f85151]">
                  {passwordMatchError}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-5 w-full flex justify-between ">
          <Button
            onClick={() => {
              previousStep();
            }}
            type="submit"
            className="w-[110px] customButtonC py-2"
          >
            Back
          </Button>
          <Button
            loading={loading}
            type="submit"
            className="w-[110px] customButtonA py-2 "
            loaderClassName="static"
          >
            Submit
          </Button>
        </div>
      </form>
      {pendingVerification && (
        <>
          <div className="fixed left-0 right-0 top-0 z-[199] h-screen w-full bg-[rgba(0,0,0,0.95)]"></div>
          <div className="bg-primary xs:w-[90%] fixed left-0 right-0 top-[50%] z-[200] mx-auto my-auto translate-y-[-50%] rounded-[10px] px-5 pb-10 pt-7 shadow-[0px_0px_9px_rgba(255,255,255,0.5)] sm:w-[450px]">
            <h2 className="text-secondary xs:text-[22px] mb-3 text-center font-[600]  sm:text-[27px]">
              Verification Code
            </h2>
            <p className="flex text-[13px] mb-3 text-[#d4d4d4] bg-[#131313]   px-2 py-2 gap-x-2">
              <FaCircleCheck className="text-[19px] flex-none text-[#3ba132]" />
              A verification code has been sent to yout email account. Please
              check your email.
            </p>
            <form
              className="flex w-full flex-col justify-center"
              onSubmit={onPressVerify}
            >
              <input
                className="border-primary bg-secondary text-primary w-full rounded-[8px] border-[1px] border-solid px-4 py-4 placeholder:text-[#9c9c9c]"
                value={code}
                placeholder="Code Here..."
                onChange={(e) => setCode(e.target.value)}
              />
              <p className="mt-2 text-center text-[15px] text-[#f54b4b]">
                {!errorCode ? errorCode2 : errorCode}
              </p>
              <div className="mb-1 flex justify-center p-3">
                {retry ? (
                  <button
                    type="button"
                    onClick={resendVerification}
                    className="text-secondary mt-3  underline hover:font-[500]"
                  >
                    Resend verification code
                  </button>
                ) : (
                  <p className=" text-center text-white">
                    Resend verification code ({seconds})
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={loadingCode}
                className={`customButtonA   disabled:cursor-not-allowed disabled:pointer-events-none  text-secondary relative mx-auto my-0 mt-7 min-h-[55px] w-[100%] rounded-[8px] px-4 py-3 text-[17px] font-[600] hover:opacity-[0.7] ${
                  loadingCode && "cursor-not-allowed customButtonC"
                }`}
              >
                {!loadingCode ? (
                  " Verify Email"
                ) : (
                  <span className="loading loading-spinner text-primary "></span>
                )}
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default SecondStep;
