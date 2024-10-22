"use client";

import React, { SVGProps } from "react";
import * as Icons from "@phosphor-icons/react";

type IconProps = SVGProps<SVGSVGElement> & {
  name: keyof typeof Icons;
  size?: number;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
};

export const PhosphorIcon = ({ name, size, ...props }: IconProps) => {
  const IconComponent = Icons[name] as React.FC;

  if (!IconComponent) return <></>;
  return (
    <IconComponent
      {...(size ? { width: size, height: size } : {})}
      {...props}
    />
  );
};
