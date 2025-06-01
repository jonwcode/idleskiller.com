import React from "react";
import { Flex, Box } from "@common";
import css from "@css/skills/mining/miningIconStats.module.css";
export default function MiningIconStats() {
  return (
    <React.Fragment>
      <Flex column className={css.container}>
        <Box className={css.skillLvl}>Lvl 1</Box>
        <img src={`${__ASSETS__}images/pickaxe.png`} />
      </Flex>
    </React.Fragment>
  );
}
