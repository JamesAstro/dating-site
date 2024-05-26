"use client";
import { useRouter, usePathname } from "next/navigation";
import React, { Fragment, useEffect, ReactNode, useState } from "react";
import type { NavigationMenuProps } from "@/utils/types";
import Link from "next/link";

import Wrapper from "@/components/Wrapper";
import { tw } from "@/utils/style";

import Image from "next/image";
import Header from "../Header";
import NavigationBar from "../NavigationBar";

const PageContainer = (props: { className?: string; children: ReactNode }) => {
  const { className, children } = props;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Fragment>
      <header
        className={`fixed w-full z-[100] left-0 right-0 transition-all duration-300 ${
          isScrolled ? "bg-[#f5f5f5]" : "bg-transparent"
        }`}
      >
        <Wrapper>
          <div
            className={`flex flex-wrap justify-between ${
              isScrolled ? "py-2" : "py-2"
            } text-[#383838] items-center transition-all duration-300`}
          >
            <Header />
            <div className="flex justify-between flex-wrap items-center w-[720px]">
              <NavigationBar />

              <div className="flex items-center gap-x-2">
                <Link
                  href="/sign-up"
                  className="px-4 py-[5px] rounded-[3px] customButtonC text-secondary font-[500]"
                >
                  Signup
                </Link>
                <Link
                  href="/sign-in"
                  className="px-4 py-[5px] rounded-[3px] customButtonB text-secondary font-[500]"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </Wrapper>
      </header>
      <main className={tw("", className)}>{children}</main>
    </Fragment>
  );
};

export default PageContainer;
