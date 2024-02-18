import { PATHS } from "@/configs/paths";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React from "react";

function NavItems({
  className,
  hideHome,
}: {
  className?: ClassValue;
  hideHome?: boolean;
}) {
  return (
    <div className={cn("flex gap-2", className)}>
      {!hideHome && <a href={PATHS.home}>Home</a>}
      <a href={PATHS.stalk}>Stalk</a>
      <a href={PATHS.blogs}>Blogs</a>
      <a href={PATHS.projects}>Projects</a>
      <a href={PATHS.skills}>Skills</a>
    </div>
  );
}

export default NavItems;
