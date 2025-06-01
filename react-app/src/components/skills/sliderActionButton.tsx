import React, { useState, useRef, useEffect, ReactNode } from "react";
import { ReactComponent as StartIcon } from "@svg/start.svg";
import { ReactComponent as InspectIcon } from "@svg/magnifyingGlass.svg";
import { ReactComponent as CloseIcon } from "@svg/close.svg";
import { Flex, Box } from "@common";
import css from "@cssc/skills/sliderContainer.module.css";
import Button from "@comp/button";
export default function SliderActionButton({
  children,
  icon,
  name,
}: {
  children: ReactNode;
  icon?: string;
  name: string;
}) {
  const [sliderContainerClasses, setSliderContainerClasses] = useState(
    `${css.sliderContainer}`
  );
  const [actionContainerClasses, setActionContainerClasses] = useState(
    `${css.actionContainer}`
  );
  const [slide, setSlide] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleAction = () => {
    if (!slide) {
      console.log("goes here!");
      setSliderContainerClasses(`${css.sliderContainer} ${css.slideContainer}`);
      setActionContainerClasses(
        `${css.actionContainer} ${css.actionContainerSlide}`
      );
    } else {
      setSliderContainerClasses(`${css.sliderContainer}`);
      setActionContainerClasses(`${"css.actionContainer"}`);
    }

    setSlide((prev) => !prev);
  };

  const handleClose = () => {
    setSliderContainerClasses(`${css.sliderContainer}`);
    setActionContainerClasses(`${css.actionContainer}`);
    setSlide((prev) => !prev);
  };

  return (
    <React.Fragment>
      <Flex ref={containerRef} column className={css.container}>
        <Flex center className={actionContainerClasses}>
          <Flex
            style={{
              background: "#182027",
              height: "60px",
              width: "60px",
            }}
          >
            <img src={icon} style={{ width: "100%", height: "100%" }} />
          </Flex>
          <Flex style={{ width: "100%" }} column>
            <Flex row>
              {/* Start Button */}
              <Flex>
                <Button
                  style={{ display: "flex", flexDirection: "column" }}
                  className={css.buttonStyle}
                >
                  <label
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "50%",
                      transform: "translate(-50%, -100%)",
                      zIndex: 3,
                      color: "#ffffff",
                      fontSize: 9,
                    }}
                  >
                    Start
                  </label>
                  <StartIcon width="25px" style={{ marginLeft: 3 }} />
                </Button>
                {/* Inspect Button */}
              </Flex>
              <Flex>
                <Button
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  className={css.buttonStyle}
                >
                  <label
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "50%",
                      transform: "translate(-50%, -100%)",
                      zIndex: 3,
                      color: "#ffffff",
                      fontSize: 9,
                    }}
                  >
                    Inspect
                  </label>
                  <InspectIcon width="25px" />
                </Button>
                <Button
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  className={css.buttonStyle}
                >
                  <label
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "50%",
                      transform: "translate(-50%, -100%)",
                      zIndex: 3,
                      color: "#ffffff",
                      fontSize: 9,
                    }}
                  >
                    Inspect
                  </label>
                  <CloseIcon
                    onClick={handleClose}
                    color="#955d5d"
                    width="25px"
                  />
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex className={sliderContainerClasses} onClick={handleAction}>
          {children}
        </Flex>
      </Flex>
    </React.Fragment>
  );
}
