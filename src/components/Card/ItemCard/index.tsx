"use client";

import Link from "next/link";
import Image from "next/image";
import { tw } from "@/utils/style";

interface ItemCardProps {
  wrapperClassName?: string;
  className?: string;
  name: string;
  age: number;
  gender: string;
  hometown: string;
  image: string;
  bio?: string;
  status?: string;
}

const ItemCard = (props: ItemCardProps) => {
  const {
    className,
    wrapperClassName,
    age,
    name,
    hometown,
    image,
    bio,
    gender,
    status,
  } = props;
  return (
    <div className={tw("w-full", wrapperClassName)}>
      <div
        className={tw(
          "bg-secondary h-full flex flex-col justify-between shadow-[0px_0px_5px_rgba(0,0,0,0.2)] rounded-[8px]",
          className
        )}
      >
        <div className="w-full">
          <div className="w-full h-[165px] rounded-t-[8px] ">
            <Image
              src={image}
              alt={`image of ${name}`}
              width={1000}
              height={1000}
              className="w-full h-full object-cover rounded-t-[8px]"
            />
          </div>
          <div className="itemLine" />
          <div className="px-4 pt-4 bg-secondary w-full">
            <div className="flex items-center cabin w-full justify-between  text-[19px] font-[700] text-[#252525]">
              <div className="flex items-center w-full">
                <h2 className="max-w-[calc(100%-42px)] text-ellipsis overflow-hidden whitespace-nowrap">
                  {name}
                </h2>
                <h2>, {age}</h2>
              </div>
              <span
                className={tw(
                  "w-[12px]  h-[12px] flex-none  rounded-full ml-[5px]",
                  status == "online" ? "bg-[#2ec435]" : "bg-[#ccc]"
                )}
              ></span>
            </div>

            <h3 className="text-[#8d8d8d] font-[300] text-[13px] mt-[6px]">
              {gender} <span className="text-[11px]">|</span> {hometown}
            </h3>
          </div>
          <div className="pb-6 w-full mt-2 px-4">
            <p className="customP2 text-[#696969] text-[13px] ">{bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
