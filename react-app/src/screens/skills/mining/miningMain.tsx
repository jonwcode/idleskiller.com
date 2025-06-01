import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PlayerPhoto from "@/components/playerPhoto";
import Wrapper from "@common/wrapper";
import { Flex, Box } from "@common/index";
import css from "@css/skills/mining/miningSkill.module.css";
import StaminaBar from "@/components/staminaBar";

import Header from "@/components/header";
import BottomNav from "@/components/bottomNav";
import Button from "@/components/button";
import CircularProgressTimer from "@/components/cirularProgressTimer";
import ChooseRock from "@/screens/skills/mining/chooseRock";
import MiningIconStats from "./miningIconStats";

const MiningSkill = () => {
  const [chosenOre, setChosenOre] = useState("");

  // Get all necessary data

  return (
    <React.Fragment>
      <Header />
      <Wrapper className={css.screen}>
        <StaminaBar />
        <Flex mt={10}>
          <PlayerPhoto />
        </Flex>
        <MiningIconStats />

        <Flex
          column
          center
          style={{
            phone: { width: "97%", marginTop: "20px" },
            tablet: { width: "85%" },
            width: "80%",
          }}
          className={css.skillContainer}
        >
          <ChooseRock setChosenOre={setChosenOre} chosenOre={chosenOre} />
        </Flex>
        {/* <Button style={{ width: 200 }} className={css.actionButton}>
            Tap to start
          </Button> */}
        {/* <CircularProgressTimer /> */}

        <BottomNav />
      </Wrapper>
    </React.Fragment>
  );
};

export default MiningSkill;
