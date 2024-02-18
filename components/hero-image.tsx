"use client";
import { cn } from "@/lib/utils";
import { Stage, withFilters, Sprite, useTick } from "@pixi/react";
import { ClassValue } from "clsx";
import Image from "next/image";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Container } from "@pixi/react";
import * as PIXI from "pixi.js";
import { AdjustmentFilter } from "@pixi/filter-adjustment";
import { DisplacementFilter } from "@pixi/filter-displacement";
import { animate, easeInOut, motion, motionValue } from "framer-motion";
import * as dat from "dat.gui";

const Filters = withFilters(Container, {
  displacement: DisplacementFilter,
});

interface Size {
  width: number;
  height: number;
}

const HeroImageRender = ({
  config,
  width,
  height,
}: {
  config: any;
  width: number;
  height: number;
}) => {
  const displacementSpriteRef = useRef<PIXI.Sprite>();
  const [renderFilter, setRenderFilter] = React.useState(false);

  React.useEffect(() => {
    if (!displacementSpriteRef.current) return;
    displacementSpriteRef.current.texture.baseTexture.wrapMode =
      PIXI.WRAP_MODES.REPEAT;
    setRenderFilter(true);
  }, []);
  // console.log({ ...config, width, height }, renderFilter);
  return (
    <>
      <Sprite
        {...config.displacement}
        image="https://pixijs.io/examples/examples/assets/pixi-filters/displacement_map_repeat.jpg"
        ref={displacementSpriteRef}
        width={width}
        height={height}
        animate={{
          x: 100,
          y: 100,
        }}
      />
      {renderFilter && displacementSpriteRef.current && (
        <Filters
          displacement={{
            construct: [displacementSpriteRef.current],
          }}
        >
          <Sprite
            image="/assets/hero_image.png"
            width={width}
            height={height}
            position={new PIXI.Point(0, 0)}
          />
        </Filters>
      )}
    </>
  );
};

const sizeInitial: Size = {
  width: 347,
  height: 549,
};
const config = {
  displacement: {
    x: 1,
    y: 1,
  },
};

export const HeroImage = ({
  className,
  trigger,
}: {
  className?: ClassValue;
  trigger?: boolean;
}) => {
  const [size, setSize] = useState(sizeInitial); // Example initial size
  const ref = useRef(null);

  // Initial displacement state
  const [displacement, setDisplacement] = useState(config.displacement);

  useEffect(() => {
    animate(0, 300, {
      duration: 0.5,
      onUpdate: (value) => {
        setDisplacement((config: { x: number; y: number }) => ({
          x: value,
          y: value + 100,
        }));
      },
      ease: easeInOut,
    });
  }, [trigger]);

  // useEffect(() => {
  //   const g = new dat.GUI();
  //   const displacement = g.addFolder("Displacement");
  //   displacement.open();
  //   displacement
  //     .add(config.displacement, "x", 0, 1000)
  //     .onChange((value: number) =>
  //       setDisplacement((config: { x: number; y: number }) => ({
  //         ...config,
  //         x: value,
  //       }))
  //     );
  //   displacement
  //     .add(config.displacement, "y", 0, 1000)
  //     .onChange((value: number) =>
  //       setDisplacement((config: { x: number; y: number }) => ({
  //         ...config,
  //         y: value,
  //       }))
  //     );
  //   return () => {
  //     g.destroy();
  //   };
  // }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > sizeInitial.width) {
        setSize(sizeInitial);
        return;
      }
      setSize({
        width: window.innerWidth - 10,
        height: window.innerHeight - 10,
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    // change the toggleAction from none to auto from css using js
    const canvas = document.querySelector(".canvas-hero");
    if (canvas) {
      // @ts-ignore
      canvas.style.touchAction = "auto";
    }
  }, []);
  return (
    <Stage
      className={cn(className, "canvas-hero")}
      width={size.width}
      height={size.height}
      options={{ backgroundAlpha: 0 }}
      ref={ref}
    >
      <HeroImageRender
        config={{
          displacement,
        }}
        height={size.height}
        width={size.width}
      />
    </Stage>
  );
};
