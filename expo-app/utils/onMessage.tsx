import React, { useRef, useState, useEffect } from "react";
import { Vibration, Platform } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import SendDevice from "../MessageEvents/sendDevice";

import * as Haptics from "expo-haptics";
import * as Device from "expo-device";

export default function OnMessage(webviewRef: React.RefObject<WebView<{}>>) {
  const [webviewReady, setWebviewReady] = useState(false);

  const onMessage = (evt: WebViewMessageEvent): void => {
    const data = JSON.parse(evt.nativeEvent.data);

    const handleVibrate = (waitTime: number | "tap") => {
      const wait = waitTime === "tap" ? 3 : waitTime;
      Vibration.vibrate(wait);
    };

    if (data.type === "ready") {
      setWebviewReady(true);
    }

    //  vibrate when event is sent
    if (data.type === "vibrate") {
      if (Platform.OS === "android") {
        handleVibrate(data.time);
      } else {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      }
    }

    // Scroll webview to the bottom
    if (data.type === "scrollWebViewToBottom") {
      // Scroll the page to the bottom
      const script = `
      setTimeout(() => {
        var lastElement = document.body.lastElementChild;
        if (lastElement) {
          lastElement.scrollIntoView({ behavior: "smooth", block: "end" });
        } else {
          window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
        }
      }, 100);
      true;
    `;
      webviewRef.current?.injectJavaScript(script);
    }
  };

  return onMessage;
}
