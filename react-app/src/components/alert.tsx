import React, { SetStateAction, useEffect } from "react";
import UsePortal from "@/hooks/usePortal";
import { Box, Flex } from "@common/index";
import css from "@cssc/alert.module.css";
import Button from "@/components/button";

interface ButtonOptions extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: any;
  buttonText: string;
  style?: { bgColor?: string; color?: string; border?: string };
}

interface alertType {
  show: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
  title: string;
  message: string;
  buttonDirection?: "column" | "row";
  acceptButton?: ButtonOptions;
  cancelButton?: ButtonOptions;
}

export default function Alert({
  show,
  setShow,
  title,
  message,
  buttonDirection = "column",
  acceptButton = { buttonText: "Confirm" } as ButtonOptions,
  cancelButton = { buttonText: "Cancel" } as ButtonOptions,
}: alertType) {
  const Portal = UsePortal;

  return (
    <React.Fragment>
      {show && (
        <Portal>
          <Box
            vibrate="tap"
            onClick={() => setShow(false)}
            className={css.overlay}
          />
          <Flex
            style={{
              phone: { width: "70%" },
              tablet: { width: "50%" },
              width: "50%",
            }}
            column
            className={css.container}
          >
            <Flex center style={{ flex: 1 }} column>
              <Flex
                style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
                center
                p={14}
                className={css.title}
              >
                {title}
              </Flex>

              <Flex
                middle
                center
                style={{
                  width: "100%",
                  alignContent: "center",
                }}
              >
                <Flex
                  center
                  pl={10}
                  style={{
                    flex: 1,
                    padding: 10,
                    margin: "0px auto",
                  }}
                >
                  <Box>{message}</Box>
                </Flex>
              </Flex>
            </Flex>
            <Flex
              style={{ flexDirection: buttonDirection, marginTop: 10 }}
              className={css.buttons}
            >
              <Button
                onClick={acceptButton.onClick}
                {...(acceptButton.style && {
                  style: {
                    backgroundColor: acceptButton.style.bgColor ?? "",
                    color: acceptButton.style.color ?? "",
                    border: acceptButton.style.border ?? "",
                  },
                })}
                name={acceptButton.buttonText}
              >
                {acceptButton.buttonText}
              </Button>
              <Button
                onClick={cancelButton.onClick}
                {...(cancelButton.style && {
                  style: {
                    backgroundColor: cancelButton.style.bgColor ?? "",
                    color: cancelButton.style.color ?? "",
                    border: cancelButton.style.border ?? "",
                  },
                })}
                name={cancelButton.buttonText}
              >
                {cancelButton.buttonText}
              </Button>
            </Flex>
          </Flex>
        </Portal>
      )}
    </React.Fragment>
  );
}
