import React, {
  useRef,
  useContext,
  useEffect,
  useState,
  forwardRef,
} from "react";
import { Box, Flex } from "@common/index";
import Context from "@store/context";
import { motion, Variants } from "framer-motion";

type DeviceStyle = React.CSSProperties & {
  bottomSpacing?: string | number;
};

type styleType = React.CSSProperties & {
  phone?: DeviceStyle;
  tablet?: DeviceStyle;
  bottomSpacing?: string | number;
};

const Wrapper = forwardRef(function (
  {
    children,
    className: cssClass,
    bottomSpacing,
    screenVariant,
    motionKey,
    style,
    ...rest
  }: {
    style?: styleType;
    children?: React.ReactNode;
    className?: string | (object & string);
    bottomSpacing?: number | string;
    screenVariant?: Variants | null;
    motionKey?: any;
  },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [height, setHeight] = useState(0);

  const { deviceInfo } = useContext(Context);
  useEffect(() => {
    if (wrapperRef.current) {
      setHeight(wrapperRef.current?.clientHeight);
    }
  }, [document.body, document.documentElement, bottomSpacing]);

  const wrapperRef = useRef<HTMLDivElement>();

  const phoneBottomSpacing = useRef<string | null>(null);
  const tabletBottomSpacing = useRef<string | null>(null);

  if (style?.phone && style?.phone.bottomSpacing) {
    phoneBottomSpacing.current =
      typeof style?.phone?.bottomSpacing !== "undefined" &&
      typeof style?.phone?.bottomSpacing === "string" &&
      !style?.phone?.bottomSpacing.indexOf("px")
        ? style.phone.bottomSpacing + "px"
        : style.phone.bottomSpacing + "px";
  }

  if (style?.tablet && style?.tablet.bottomSpacing) {
    tabletBottomSpacing.current =
      typeof style?.tablet?.bottomSpacing !== "undefined" &&
      typeof style?.tablet?.bottomSpacing === "string" &&
      !style?.tablet?.bottomSpacing.indexOf("px")
        ? style.tablet.bottomSpacing + "px"
        : style.tablet.bottomSpacing + "px";
  }

  return (
    <motion.div
      ref={ref}
      key={motionKey ? motionKey : null}
      {...(screenVariant && { variants: screenVariant })}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        width: "100%",
        overflowY: "auto",
        maxHeight: "calc(100vh + 200px)",
        minHeight: "100vh",
        paddingBottom: "200px",
        position: "relative",
        ...(style && { ...style }),
        ...(style?.phone?.bottomSpacing &&
          deviceInfo?.deviceType === "Phone" && {
            height: `calc(${height}px + ${phoneBottomSpacing.current})px`,
          }),
        ...(style?.tablet?.bottomSpacing &&
          deviceInfo?.deviceType === "Tablet" && {
            height: `calc(${height}px + ${tabletBottomSpacing.current})px`,
          }),
      }}
      className={cssClass}
      {...rest}
    >
      <Box style={{ paddingBottom: "100px", position: "relative" }}>
        {children}
      </Box>
    </motion.div>
  );
});

export default Wrapper;
