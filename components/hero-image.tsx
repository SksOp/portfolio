"use client";
import { cn } from "@/lib/utils";
import { Stage, withFilters, Sprite, useTick } from "@pixi/react";
import { ClassValue } from "clsx";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { Container } from "@pixi/react";
import * as PIXI from "pixi.js";
import { AdjustmentFilter } from "@pixi/filter-adjustment";
import { DisplacementFilter } from "@pixi/filter-displacement";

const Filters = withFilters(Container, {
  displacement: DisplacementFilter,
});

const config = {
  displacement: {
    x: 1,
    y: 1,
  },
};

interface Size {
  width: number;
  height: number;
}
const sizeInitial: Size = {
  width: 347,
  height: 549,
};

const HeroImageRender = ({
  config,
  width,
  height,
}: {
  config?: any;
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

  return (
    <>
      <Sprite
        {...config}
        image="https://pixijs.io/examples/examples/assets/pixi-filters/displacement_map_repeat.jpg"
        ref={displacementSpriteRef}
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

export const HeroImage = ({ className }: { className?: ClassValue }) => {
  const [displacementConfig, setDisplacementConfig] = React.useState(
    config.displacement
  );
  const [size, setSize] = React.useState(sizeInitial);
  const ref = useRef(null);
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
      <HeroImageRender height={size.height} width={size.width} />
    </Stage>
  );
};
