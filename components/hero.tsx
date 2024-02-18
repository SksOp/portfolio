import React from "react";
import NavItems from "./nav-items";
import { BackgroundGradientAnimation } from "./ui/bg-gradient";
import Image from "next/image";
import { jeju } from "@/lib/local-font-load";
import { cn } from "@/lib/utils";

function Hero() {
  return (
    <div className="w-screen p-10 min-h-screen flex flex-col justify-center items-center ">
      <div className="w-full max-w-6xl min-h-[30rem] lg:h-[30rem]  relative ">
        <BackgroundGradientAnimation containerClassName="absolute top-0 left-0 w-full h-full  rounded-lg overflow-hidden" />
        <div className="relative flex flex-col-reverse md:items-end md:flex-row  max-h-max  z-10 w-full h-full">
          <div
            className={cn(jeju.className, "flex-grow flex flex-col p-6 h-full")}
          >
            <h3>{"<SKS/>"}</h3>
            <div className="flex-grow" />
            <div>
              <h5 className="text-2xl md:text-4xl font-bold text-white opacity-70">
                You know the business
              </h5>
              <h4 className="text-4xl md:text-6xl font-bold text-white">
                I know the Chemistry
              </h4>
            </div>
          </div>
          <div className="h-[110%]">
            <Image
              src="/assets/hero_image.png"
              width={2000}
              height={2000}
              alt="Hero"
              className="h-full w-auto  "
            />
            <hr className="md:hidden border-red-600" />
          </div>
        </div>
      </div>
      <NavItems className="w-full  max-w-6xl p-6 gap-8" hideHome />
    </div>
  );
}

export default Hero;
