"use client";

import { ItemCard } from "@/components";
import LayoutContainer from "@/components/LayoutContainer";
import Wrapper from "@/components/Wrapper";
import { DUMMY_GIRLS_DATA } from "@/utils/const";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
const Dashboard: NextPage = () => {
  return (
    <LayoutContainer>
      <div className="w-full flex flex-wrap gap-y-4">
        {DUMMY_GIRLS_DATA.map((item, index) => (
          <ItemCard
            key={index}
            name={item?.name}
            age={item?.age}
            bio={item?.bio}
            hometown={item?.hometown}
            image={item?.image}
            gender={item?.gender}
            status={item?.status}
            wrapperClassName="px-2 w-[20%]"
          />
        ))}
      </div>
    </LayoutContainer>
  );
};

export default Dashboard;
