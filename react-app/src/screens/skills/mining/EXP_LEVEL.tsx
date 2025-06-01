import React from "react";
import css from "@css/skills/mining/exp_level.module.css";
import { Flex, Box } from "@common/index";
import EXPLvlInfo from "@/components/skills/expLvlInfo";

export default function SkillInfo() {
  return (
    <React.Fragment>
      <Flex className={css.skillInfo}>
        <EXPLvlInfo
          styles={{
            skillImageColors: {
              background: "rgb(96, 86, 73)",
              gradientColor_1: "rgba(96, 86, 73, 1)",
              gradientColor_2: "rgba(131, 118, 106, 1)",
            },
            skillEXPColors: {
              color: "#ffffff",
              borderColor: "gold",
              backgroundColor: "rgba(125, 125, 125, 0.52)",
            },
          }}
          name="Mining"
          level="1"
          exp="0"
          skillImg={
            <img
              src={`${__ASSETS__}/images/pickaxe.png`}
              width="35"
              height="35"
            />
          }
        />
      </Flex>
    </React.Fragment>
  );
}
