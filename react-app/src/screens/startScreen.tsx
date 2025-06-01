import React, { useState, useEffect } from "react";
import Logo from "@comp/logo";
import Wrapper from "@/common/wrapper";
import { Box, Flex } from "@common/index";
import css from "@css/startScreen.module.css";
import GoogleCaptcha from "react-google-recaptcha";
import { Link } from "react-router-dom";
import Hr from "@comp/hr";

export default function StartScreen() {
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    // alert(sessionStorage.getItem("navigateBack"));
    if (sessionStorage.getItem("navigateBack") === "true") {
      setAnimation(true);
      sessionStorage.removeItem("navigateBack");
      console.log("goes here");
    }
  }, []);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  const pageVariants = {
    initial: { x: animation ? "100%" : 0, y: "0", opacity: 0 }, // Start completely off-screen
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
    // exit: {
    //   opacity: 1,
    //   transition: { type: "spring", stiffness: 300, damping: 20 },
    // }, // Slide out to the left
  };

  return (
    <React.Fragment>
      <Wrapper
        screenVariant={pageVariants}
        motionKey={animation ? "animate" : "static"}
        className={css.screen}
      >
        <Flex fullWidth center middle>
          <Logo />
        </Flex>
        <Flex p={30}>
          <Flex fullWidth center tag="h2">
            Nothing better then not having to work to gain levels. Behold, I
            give you Idle Skilling!
          </Flex>
        </Flex>
        <Flex fullWidth column style={{ position: "fixed", top: "40%" }}>
          <form method="post" onSubmit={handleSubmit}>
            <Flex fullWidth center column className={css.buttonContainer}>
              <Link to="/signup">Signup</Link>
              <Hr mb={50} mt={50} text="Or" />
              <Link to="/login">Login</Link>
            </Flex>
            <GoogleCaptcha
              sitekey="6Lcm8eIqAAAAAOIYhB5w99g4fVr9OmnRQ0Bi8BkJ"
              size="invisible"
              theme="dark"
            />
          </form>
        </Flex>
      </Wrapper>
    </React.Fragment>
  );
}
