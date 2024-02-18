import React from "react";
import NavItems from "./nav-items";
import { BackgroundGradientAnimation } from "./ui/bg-gradient";
import Image from "next/image";
import { jeju } from "@/lib/local-font-load";
import { cn } from "@/lib/utils";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { MovingBorder } from "./ui/moving-border";

function Hero() {
  return (
    <div className="max-w-screen p-10 min-h-screen flex flex-col justify-center items-center ">
      <CardContainer className="w-full max-w-6xl min-h-[30rem] lg:h-[30rem]  relative cursor-pointer ">
        <div className="absolute h-full rounded-lg  w-full overflow-hidden inset-0">
          <MovingBorder duration={8000} rx="0%" ry="0">
            <div
              className={cn(
                " h-60 w-60  opacity-[0.8] bg-[radial-gradient(red_20%,transparent_60%)]"
              )}
            />
          </MovingBorder>
        </div>
        <BackgroundGradientAnimation containerClassName="absolute m-[2px] top-0 left-0  rounded-lg overflow-hidden w-[calc(100%_-_4px)] h-[calc(100%_-_4px)] " />
        <CardBody className="relative group/card flex flex-col-reverse md:items-end md:flex-row  max-h-max  z-10 w-full h-full">
          <CardItem
            translateZ="20"
            className={cn(jeju.className, "flex-grow flex flex-col p-6 h-full")}
          >
            <h3 className="hidden md:block">{"<SKS/>"}</h3>
            <CardItem translateZ="20" className="hidden md:block">
              <h3 className="text-2xl  group-hover:text-red-600 md:text-4xl font-bold mt-6 opacity-70">
                Nerd,
              </h3>
              <h3 className="text-2xl md:text-4xl font-bold opacity-70">
                that no one asked for
              </h3>
            </CardItem>
            <div className="flex-grow" />
            <div>
              <h5 className="text-2xl md:text-4xl font-bold opacity-70">
                You know the business
              </h5>
              <h4 className="text-4xl md:text-6xl font-bold">
                I know the Chemistry
              </h4>
            </div>
          </CardItem>
          <CardItem
            translateZ="40"
            className="md:h-[110%]  w-full md:w-auto mb-[2px]"
          >
            <Image
              src="/assets/hero_image.png"
              width={2000}
              height={2000}
              alt="Hero"
              className="h-full max-h-[50vh] md:max-h-none w-full md:w-auto object-scale-down"
            />
            <hr className="md:hidden border-red-600" />
          </CardItem>
          <h3 className="md:hidden p-6">{"<SKS/>"}</h3>
        </CardBody>
      </CardContainer>
      <NavItems className="w-full  max-w-6xl p-2 gap-8" hideHome />
    </div>
  );
}

export default Hero;
