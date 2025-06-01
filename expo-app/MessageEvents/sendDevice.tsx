import { useRef, useEffect, useState } from "react";
import WebView from "react-native-webview";

import * as Device from "expo-device";
export default function SendDevice(
  webviewRef: React.RefObject<WebView<{}>>,
  webviewReady: boolean
) {
  const deviceType = useRef(
    JSON.stringify({
      deviceType:
        Device.deviceType === 1
          ? "Phone"
          : Device.deviceType === 2
          ? "Tablet"
          : Device.deviceType === 3
          ? "TV"
          : Device.deviceType === 4
          ? "Desktop"
          : "Unknown",
      OS: Device.osName,
      deviceBuildId: Device.osBuildId,
    })
  );

  useEffect(() => {
    console.log(deviceType.current);
    if (webviewRef.current && webviewReady) {
      webviewRef.current?.postMessage(deviceType.current);
    }
  }, [webviewReady]);
  return null;
}
