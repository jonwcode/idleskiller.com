import React, { useState } from "react";
import css from "@css/skills/mining/chooseRock.module.css";
import SliderActionButton from "@comp/skills/sliderActionButton";
import { Flex, Box } from "@common/index";

import { ReactComponent as StaminaIcon } from "@svg/staminaIcon.svg";

export default function ChooseRock({ setChosenOre, chosenOre }) {
  return (
    <React.Fragment>
      <Flex column center className={css.chooseOreWrapper}>
        <Flex center className={css.titleBar}>
          <Box style={{ fontSize: "2rem", position: "relative", top: "-10px" }}>
            Choose a rock to mine
          </Box>
        </Flex>
        <Flex column className={css.selectContainer}>
          {/* Coal */}
          <Flex row className={css.item} tabIndex={0}>
            <SliderActionButton
              icon={`${__ASSETS__}/images/icons/mining/coal.webp`}
              name="Coal"
            >
              <Flex id="itemMainGroup" column>
                <Flex bottom>
                  {/* Item Title Group */}
                  <Flex column>
                    <Flex center className={css.itemTitle}>
                      Coal
                    </Flex>
                    <img
                      src={`${__ASSETS__}/images/icons/mining/coal.webp`}
                      width="60"
                      height="60"
                    />
                  </Flex>
                  {/* End */}
                  <Flex mb={20} ml={10}>
                    <Box className={css.itemStat}>
                      Lvl. <b>1</b>
                    </Box>
                    <Box className={css.itemStat}>
                      EXP <b>5</b>
                    </Box>
                    <Flex middle center className={css.itemStat}>
                      <StaminaIcon
                        width={18}
                        height={18}
                        style={{ marginRight: 3 }}
                      />
                      <b>1</b>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>

              <Flex mr={10} middle right style={{ flex: 1 }}>
                <Box className={css.pointerArrow}></Box>
              </Flex>
            </SliderActionButton>
          </Flex>
          {/* Cobalite Ore */}
          <Flex
            onClick={() => setChosenOre("cobalite")}
            tabIndex={0}
            data-disabled
            className={css.item}
            data-title="Cobalite"
          >
            <img
              src={`${__ASSETS__}/images/icons/mining/cobalite.png`}
              width="45"
            />
          </Flex>
        </Flex>
      </Flex>
    </React.Fragment>
  );
}
