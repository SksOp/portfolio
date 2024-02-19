"use client";
import { cn } from "@/lib/utils";
import { Stage, withFilters, Sprite, Container } from "@pixi/react";
import { ClassValue } from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { DisplacementFilter, Point, Sprite as Sp, WRAP_MODES } from "pixi.js";
import { animate, easeInOut } from "framer-motion";

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
  const displacementSpriteRef = useRef<Sp>();
  const [renderFilter, setRenderFilter] = React.useState(false);

  React.useEffect(() => {
    if (!displacementSpriteRef.current) return;
    displacementSpriteRef.current.texture.baseTexture.wrapMode =
      WRAP_MODES.REPEAT;
    setRenderFilter(true);
  }, []);
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
            position={new Point(0, 0)}
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
