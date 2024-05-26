"use client";
import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import React, { SyntheticEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSignIn, useAuth } from "@clerk/nextjs";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { tw } from "@/utils/style";

const ForgotPassword: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [complete, setComplete] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [requestError, setRequestError] = useState("");
  const [seconds, setSeconds] = useState<number>(100);
  const [retry, setTry] = useState<boolean>(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  useEffect(() => {
    if (seconds > 0 && successfulCreation && !complete) {
      const timer = setTimeout(() => {
        setTry(false);
        setSeconds(seconds - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setTry(true);
    }
  }, [seconds, successfulCreation, !complete]);

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    router.push("/dashboard");
  }

  async function create(e: SyntheticEvent) {
    e.preventDefault();
    setRequestError("");
    setLoading(true);
    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then((_) => {
        setSuccessfulCreation(true);
      })
      .catch((err) => {
        setRequestError(err.errors[0].longMessage);
        console.error("error", err.errors[0].longMessage);
      });
    setLoading(false);
  }

  const resendVerification = async () => {
    await signIn?.create({
      strategy: "reset_password_email_code",
      identifier: email,
    });
    setSeconds(100);
    setTry(false);
  };

  async function reset(e: SyntheticEvent) {
    e.preventDefault();
    setRequestError("");
    setLoading(true);
    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })
      .then((result) => {
        if (result.status === "needs_second_factor") {
          setSecondFactor(true);
        } else if (result.status === "complete") {
          setActive({ session: result.createdSessionId });
          setComplete(true);
        } else {
          console.log(result);
        }
      })
      .catch((err) => {
        setRequestError(err.errors[0].longMessage);
        console.error("error", err.errors[0].longMessage);
      });
    setLoading(false);
  }
  function onBackHandle() {
    setSuccessfulCreation(false);
    setComplete(false);
    setRequestError("");
  }

  return (
    <div className="bg-secondary flex min-h-screen items-center justify-center">
      <div className=" xs:items-unset relative mx-auto my-0 flex min-h-screen w-full max-w-[1400px] flex-wrap justify-center sm:items-center  ">
        <div className="xs:pt-9 xs:w-full flex flex-col items-center sm:w-auto ">
          <Link href="/" className="w-[280px] block ">
            <Image
              src="/logo.png"
              alt="Filipina Dream Girl logo"
              width={1000}
              height={1000}
              className="w-full h-full"
            />
          </Link>

          <div className="bg-secondary xs:mt-0 xs:w-full xs:flex-1 xs: xs:h-full xs:min-h-[unset]  flex flex-col  px-7 py-7 sm:mt-0 sm:h-auto sm:min-h-[322.14px] sm:w-[510px] sm:flex-none ">
            {!successfulCreation && !complete && (
              <h1 className="text-primary text-center text-[30px] font-[600]">
                Forgot Password ?
              </h1>
            )}
            {successfulCreation && !complete && (
              <h1 className="text-primary text-center text-[30px] font-[600]">
                Reset Password
              </h1>
            )}
            <form
              className="mt-4 flex flex-col"
              onSubmit={!successfulCreation ? create : reset}
            >
              {!successfulCreation && !complete && (
                <>
                  <label
                    htmlFor="email"
                    className="text-primary text-center text-[18px]"
                  >
                    Please provide your email to reset your password.
                  </label>
                  {requestError && (
                    <p className="text-center text-[16px] text-[#ff0000] ">
                      {requestError}
                    </p>
                  )}
                  <input
                    className="text-primary border-primary 2xs:text-[15px] xs:text-[14px] mt-2 w-full rounded-[5px] border-[1px] border-solid px-4 py-3 placeholder:text-[15px]  placeholder:font-light placeholder:text-[#aaa] sm:text-[16px]"
                    type="email"
                    placeholder="e.g john@doe.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <button
                    disabled={loading}
                    className={tw(
                      "customButtonA text-secondary relative  mt-6 w-full rounded-[8px] px-4 py-3 text-[18px] disabled:pointer-events-none disabled:cursor-not-allowed ",
                      loading && "customButtonC"
                    )}
                  >
                    Proceed
                    {loading && (
                      <span className="transalate-y-[-50%] loading loading-spinner text-secondary absolute right-[14px] top-[28%]"></span>
                    )}
                  </button>
                  <div className="flex w-full justify-center">
                    <Link
                      href="/sign-in"
                      className="text-primary mt-3 text-center font-[400] underline hover:font-[500]"
                    >
                      Return to Sign In
                    </Link>
                  </div>
                </>
              )}

              {successfulCreation && !complete && (
                <>
                  <h2 className="text-primary mb-2  text-[16px] leading-[125%]">
                    Please enter 6 digit reset code that have been sent to your
                    email address.
                  </h2>
                  {requestError && (
                    <p className="text-center text-[16px] text-[#ff0000] ">
                      {requestError}
                    </p>
                  )}
                  <label
                    htmlFor="password"
                    className="text-primary text-[17px] font-[500]"
                  >
                    Reset password code
                  </label>
                  <input
                    className="text-primary border-primary 2xs:text-[15px] xs:text-[14px] mt-1 w-full rounded-[5px] border-[1px] border-solid px-4 py-3 placeholder:text-[15px] placeholder:font-light placeholder:text-[#aaa] sm:text-[16px]"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                  <label
                    htmlFor="password"
                    className="text-primary mt-1 text-[17px] font-[500]"
                  >
                    New password
                  </label>
                  <div className="relative mt-1">
                    <input
                      className="text-primary border-primary  2xs:text-[15px] xs:text-[14px] w-full rounded-[5px] border-[1px] border-solid px-4 py-3 placeholder:text-[15px]  placeholder:font-light placeholder:text-[#aaa] sm:text-[16px]"
                      type={!showPassword ? "password" : "text"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {showPassword ? (
                      <FaEye
                        className="absolute right-[10px] top-[50%] translate-y-[-50%] cursor-pointer text-[24px] text-[#676767] "
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <FaEyeSlash
                        className="absolute right-[10px] top-[50%] translate-y-[-50%] cursor-pointer text-[24px] text-[#676767] "
                        onClick={togglePasswordVisibility}
                      />
                    )}
                  </div>
                  <div className="mt-3 flex justify-center">
                    {retry ? (
                      <button
                        type="button"
                        onClick={resendVerification}
                        className="text-primary underline hover:font-[500]"
                      >
                        Resend verification code
                      </button>
                    ) : (
                      <p className=" text-primary text-center">
                        Resend verification code ({seconds})
                      </p>
                    )}
                  </div>
                  <button
                    disabled={loading}
                    className={tw(
                      "customButtonA text-secondary relative  mt-3 w-full rounded-[8px] px-4 py-3 text-[18px] disabled:pointer-events-none disabled:cursor-not-allowed ",
                      loading && "customButtonC"
                    )}
                  >
                    {loading ? "Processing..." : "Reset"}
                    {loading && (
                      <span className="transalate-y-[-50%] loading loading-spinner text-secondary absolute right-[14px] top-[28%]"></span>
                    )}
                  </button>
                  <div className="flex w-full justify-center">
                    <button
                      onClick={onBackHandle}
                      className="text-primary focus-visible:none mt-2 bg-none text-[17px] font-[400] underline hover:font-[500]"
                    >
                      Go Back
                    </button>
                  </div>
                </>
              )}

              {complete && (
                <div className="flex flex-col items-center justify-center">
                  <span>
                    <BsFillCheckCircleFill className="text-[38px] text-[#3ebd68]" />
                  </span>

                  <p className="text-primary 2xs:text-[23px] xs:text-[21px] mt-2 text-center font-[500] leading-[110%] sm:text-[26px]">
                    You successfully changed your password
                  </p>
                  <h3 className="text-primary mt-5 text-[16px]">
                    Signing in....
                  </h3>
                  <span className="loading loading-ring text-primary  loading-lg mt-2"></span>
                </div>
              )}
              {secondFactor && "2FA is required, this UI does not handle that"}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
