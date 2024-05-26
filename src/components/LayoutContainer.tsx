"use client";

import React, { Fragment, ReactNode } from "react";

import { useClerk } from "@clerk/nextjs";

import { tw } from "@/utils/style";
import Header from "./Header";
import WrapContainer from "./WrapContainer";

const LayoutContainer = (props: {
  className?: string;
  children: ReactNode;
}) => {
  const { className, children } = props;
  const { signOut } = useClerk();

  return (
    <Fragment>
      <header className="fixed py-2 w-full z-[100] left-0 right-0 bg-secondary shadow-[0px_0px_10px_rgba(0,0,0,0.05)]">
        <WrapContainer>
          <div className="flex flex-wrap justify-between items-center">
            <Header />
            <button
              onClick={() => signOut({ redirectUrl: "/sign-in" })}
              className="px-4 py-[5px] h-full rounded-[3px] customButtonB text-secondary font-[500]"
            >
              Logout
            </button>
          </div>
        </WrapContainer>
      </header>
      <main
        className={tw(
          "min-h-[100vh] pt-[115px] pb-[25px] bg-[#f9f9f9]",
          className
        )}
      >
        <WrapContainer>{children}</WrapContainer>
      </main>
    </Fragment>
  );
};

export default LayoutContainer;
