import { View, StatusBar } from "react-native";
import SafeAreaView from "./components/safeAreaView";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import React, { useRef, useEffect, useState } from "react";
import OnMessage from "./utils/onMessage";

export default function App() {
  const webviewRef = useRef<WebView>(null);

  const onMessage = OnMessage(webviewRef);

  return (
    <SafeAreaView>
      <View style={{ flex: 1, width: "100%", height: "100%" }}>
        <WebView
          ref={webviewRef}
          originWhitelist={["*"]}
          style={{ flex: 1, width: "100%", height: "100%" }}
          javaScriptEnabled={true}
          onMessage={onMessage}
          source={{ uri: "http://app.idleskiller.com" }}
          webviewDebuggingEnabled={true}
          domStorageEnabled={true}
          androidLayerType="hardware"
          onLoad={() => console.log("WebView Loaded")}
        />
      </View>
      <StatusBar backgroundColor="#1c2834" />
    </SafeAreaView>
  );
}
