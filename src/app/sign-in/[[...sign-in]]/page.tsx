"use client";
import type { FormEvent } from "react";
import Wrapper from "@/components/Wrapper";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { resetSignupState } from "@/redux/reducer/signupSlice";
import { useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Signin: NextPage = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(resetSignupState());
  }, [dispatch]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        await setActive({
          session: result.createdSessionId,
        });
        router.push("/dashboard");
      } else {
        /*Investigate why the login hasn't completed */
        console.log(result);
        alert(result);
        setLoading(false);
      }
    } catch (err: any) {
      console.error("error", err.errors[0].longMessage);
      setError(err.errors[0].longMessage);
      setLoading(false);
    }
  };

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

        <div className="flex text-[0] justify-between w-[790px]">
          <div className="w-[46%] rounded-l-[8px] overflow-hidden ">
            <Image
              src="/images/couple.jpg"
              alt="couple"
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
            />
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-[54%] px-5 py-6 pb-7 bg-secondary rounded-r-[8px]  shadow-[1px_1px_6px_rgba(0,0,0,0.18)]"
          >
            <h2 className="text-[35px] text-center text-[#383838] font-[700] cabin">
              Login
            </h2>
            <div className="mt-4">
              <Input
                type="email"
                label="Email"
                placeholder="johndoe@gmail.com"
                value={emailAddress}
                onChange={setEmailAddress}
              />
              <Input
                type="password"
                label="Password"
                value={password}
                onChange={setPassword}
              />
              <Link
                href="/forgotPassword"
                className="inline-block mt-1 underline text-[15px] text-[#707070]"
              >
                Forgot Password?
              </Link>

              {error && (
                <p className="mt-1 text-center text-[13px] text-[#ff0000]">
                  {error}
                </p>
              )}
              <Button
                disabled={loading}
                loading={loading}
                type="submit"
                className="customButtonA mt-6"
              >
                Login
              </Button>
              <p className="text-[15px] text-[#707070] mt-2">
                Don't have an account?
              </p>
              <Link
                href="/sign-up"
                className="inline-block  underline text-[15px] text-[#707070]"
              >
                Signup and become a member now
              </Link>
            </div>
          </form>
        </div>
      </Wrapper>
    </div>
  );
};

export default Signin;
