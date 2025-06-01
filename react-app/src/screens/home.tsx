import React, { useEffect, useState } from "react";
import Header from "@comp/header";
import PlayerInfo from "@comp/playerInfo";
import PlayerPhoto from "@comp/playerPhoto";
import BottomNav from "@/components/bottomNav";
import { Flex } from "@common/index";
import Wrapper from "@/common/wrapper";

export default function Home() {
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    // See if we can get the window.localStorage

    if (localStorage.getItem("fade")) {
      setAnimation(true);
      // Remove it from local storage

      localStorage.removeItem("fade");
    }
  }, []);

  const pageVariants = {
    initial: { opacity: 0 }, // Start completely off-screen
    animate: {
      opacity: 1,
      transition: { type: "ease", stiffness: 1200, damping: 40 },
    },
  };

  return (
    <Wrapper screenVariant={animation ? pageVariants : null}>
      <Header />
      <Flex style={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
        <Flex
          style={{
            phone: { width: "100%" },
            tablet: { width: 500 },
            width: 600,
          }}
          column
        >
          <PlayerPhoto style={{ marginTop: 20 }} />
          <PlayerInfo />
        </Flex>
      </Flex>
      <BottomNav />
    </Wrapper>
  );
}
