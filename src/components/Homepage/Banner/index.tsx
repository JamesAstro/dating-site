"use client";

import Image from "next/image";
import Link from "next/link";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import Wrapper from "@/components/Wrapper";

const Banner = () => {
  return (
    <div className="banner bg-[#fcfcfc] pt-[125px] h-[720px] pb-[30px] w-full">
      <Wrapper>
        <div className="flex justify-between w-full ">
          <div className="w-[450px] mt-[90px]">
            <h2 className="text-[#1f1f1f] font-[700] cabin  text-[40px]">
              Want to Find your Filipina Dream Girl?
            </h2>
            <p className="text-[15px] mt-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s
            </p>
            <Link
              href="/sign-up"
              className="customButtonA flex text-center justify-center px-4 py-3 rounded font-[500] text-secondary mt-7 w-full"
            >
              Sign Up for Free
            </Link>
          </div>
          <div className="w-[530px] flex justify-between relative h-full">
            <span className="text-[25px] absolute right-[200px] top-0 text-[#ec3d88]">
              <GoHeartFill />
            </span>
            <span className="text-[25px] absolute right-[100px] top-[40px] text-[#f36e1d]">
              <GoHeartFill />
            </span>
            <span className="text-[20px] absolute right-[10px] top-[80px] text-[#ec3d88]">
              <GoHeart />
            </span>
            <span className="text-[38px] rotate-[20deg] absolute right-[-30px] top-[330px] text-[#ec3d88]">
              <GoHeart />
            </span>
            <span className="text-[25px] absolute left-[-110px] top-[50px] text-[#ec3d88]">
              <GoHeartFill />
            </span>
            <span className="text-[25px] absolute left-[-85px] top-[130px] text-[#f36e1d]">
              <GoHeartFill />
            </span>
            <span className="text-[20px] absolute left-[-50px] top-[210px] text-[#ec3d88]">
              <GoHeart />
            </span>
            <span className="text-[38px] rotate-[-20deg] absolute left-[-120px] top-[310px] text-[#ec3d88]">
              <GoHeart />
            </span>
            <span className="text-[25px] rotate-[-20deg] absolute left-[-80px] top-[410px] text-[#ccc]">
              <GoHeartFill />
            </span>
            <span className="text-[25px] rotate-[-20deg] absolute left-[-50px] top-[430px] text-[#f36e1d]">
              <GoHeartFill />
            </span>

            <div className="w-[250px] z-[2] absolute left-0 top-0 rotate-[-15deg] rounded-[10px] shadow-[0px_0px_6px_rgba(0,0,0,0.2)] bg-secondary">
              <div className="w-full h-[250px] overflow-hidden rounded-t-[10px]">
                <Image
                  src="/images/woman.jpg"
                  alt="woman"
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="itemLine" />
              <div className="w-full px-4 py-5 pb-6 rounded-b-[10px]">
                <h3 className="flex text-[17px] text-[#252525] cabin font-[700] items-center justify-between w-full">
                  Jane Doe,22
                  <span className="w-[8px] h-[8px] rounded-full bg-[#45f362]"></span>
                </h3>
                <h4 className="text-[13px] font-[300] mt-1 text-[#868686]">
                  female <span className="text-[11px]">|</span> Bohol,P
                </h4>
                <p className="mt-2 customP text-[13px] text-[#5a5a5a]">
                  Hello,🤗 I&apos;m looking for a companion. Someone with a big
                  personality but able to give me plenty of attention too
                </p>
              </div>
            </div>

            <div className="w-[250px] absolute right-[20px] rotate-[14deg] top-[110px] rounded-[10px] shadow-[0px_0px_6px_rgba(0,0,0,0.2)] bg-secondary">
              <div className="w-full h-[250px] overflow-hidden rounded-t-[10px]">
                <Image
                  src="/images/man.jpg"
                  alt="man"
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="itemLine" />
              <div className="w-full px-4 py-5 pb-6 rounded-b-[10px]">
                <h3 className="flex text-[17px] text-[#252525] cabin font-[700] items-center justify-between w-full">
                  John Doe, 40
                  <span className="w-[8px] h-[8px] rounded-full bg-[#45f362]"></span>
                </h3>
                <h4 className="text-[13px] font-[300] mt-1 text-[#868686]">
                  male <span className="text-[11px]">|</span> Berlin,DE
                </h4>
                <p className="mt-2 customP text-[13px] text-[#5a5a5a]">
                  Hello!! I wish you have a nice day, it is my pleasure to send
                  you a big greeting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Banner;
