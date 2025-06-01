import { deviceType } from "@/types/store";
import React, { useRef, useEffect } from "react";

type MediaQuery = {
  query: string;
  deviceName: deviceType;
};

const useMedia = (
  mediaQuery: MediaQuery[],
  setDevice: React.Dispatch<React.SetStateAction<deviceType>>,
) => {
  const currSetDevice = useRef<deviceType>(null);

  const checkMedia = () => {
    for (const mQuery of mediaQuery) {
      const mediaEvent = window.matchMedia(mQuery.query);

      if (mediaEvent.matches && currSetDevice.current !== mQuery.deviceName) {
        setDevice(mQuery.deviceName);
        currSetDevice.current = mQuery.deviceName;
      }
    }
  };

  useEffect(() => {
    // Run the initial check
    checkMedia();

    // Set up event listeners
    const listeners = mediaQuery.map((mQuery) => {
      const mediaEvent = window.matchMedia(mQuery.query);
      const listener = () => checkMedia();
      mediaEvent.addEventListener("change", listener);
      return { mediaEvent, listener };
    });

    // Clean up event listeners on unmount
    return () => {
      listeners.forEach(({ mediaEvent, listener }) => {
        mediaEvent.removeEventListener("change", listener);
      });
    };
  }, [mediaQuery]);

  return currSetDevice.current;
};

export default useMedia;
