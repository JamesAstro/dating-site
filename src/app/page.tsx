"use client";
import Banner from "@/components/Homepage/Banner";
import PageContainer from "@/components/Homepage/PageContainer";
import Wrapper from "@/components/Wrapper";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  return (
    <PageContainer>
      <Banner />
      <div className="section2 bg-[#fff] h-[900px] w-full"></div>
    </PageContainer>
  );
}
