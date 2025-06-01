import React, { useContext } from "react";
import svgr from "vite-plugin-svgr";
import { Flex, Box } from "@common/index";
import Context from "@/store/context";

interface ButtonType {
  name?: string;
  onClick?: () => void;
  vibrate?: boolean;
  style?: React.CSSProperties;
  className?: string | object;
  children?: React.ReactNode;
}

export default function Button({
  name,
  onClick: click = () => {},
  vibrate = true,
  children,
  ...rest
}: ButtonType) {
  const ctx = useContext(Context);

  const handleOnClick = () => {
    if (vibrate) {
      ctx.vibrate(5);
    }

    click();
  };
  return (
    <Box
      tag="button"
      name={name}
      {...(click !== null && { onClick: handleOnClick })}
      {...rest}
    >
      {children}
    </Box>
  );
}
