import React, { useEffect, useContext } from "react";
import Context from "@store/context";
import { Flex, Box } from "@common/index";
import css from "@cssc/playerPhoto.module.css";

export default function PlayerPhoto({
  style,
}: {
  style?: React.CSSProperties;
}) {
  const ctx = useContext(Context);

  return (
    <Flex
      className={css.playerPhoto}
      style={{
        ...(style && { ...style }),
        overflow: "hidden",
        width: 90,
        height: 90,
        fontSize: 11,
      }}
      center
    >
      <img
        style={{ backgroundSize: "contain" }}
        src={`${import.meta.env.VITE_IMG_URI}/characters/${
          ctx.playerObj.avatar
        }`}
      />
    </Flex>
  );
}
