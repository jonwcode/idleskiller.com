import React, { useContext } from "react";
import Context from "@store/context";
import { Flex, Box } from "@common/index";
import css from "@cssc/header.module.css";
import PlayerSettings from "@comp/playerSettings";

export const Header = () => {
  const ctx = useContext(Context);
  return (
    <React.Fragment>
      <Flex
        style={{ justifyContent: "space-between" }}
        tag="header"
        className={css.header}
      >
        <Flex style={{ textTransform: "capitalize" }}>
          {ctx.playerObj.name}
        </Flex>
        <Flex>
          <PlayerSettings />
        </Flex>
      </Flex>
    </React.Fragment>
  );
};
export default Header;
