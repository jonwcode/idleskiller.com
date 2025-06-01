import React, { useState, ReactNode, useEffect } from "react";
import Context from "@store/context";
import assetsToBePreloaded from "@/assets-preload.js";
import {
  type appReady,
  type deviceInfo,
  type screen,
  type playerObjType,
} from "@/types/store";
import preloadAssets from "@hooks/preloadAssets";
import Loading from "@screens/loading";
import Initialize from "@store/services/initialize";
import { io, Socket } from "socket.io-client";
import useSendExpoMessage from "@/hooks/useSendExpoMessage";

export default function Provider({ children }: { children: ReactNode }) {
  const [loginStatus, setLoginStatus] = useState(false);
  const [screen, setScreen] = useState<screen>("home");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [playerObj, setPlayerObj] = useState<playerObjType>({
    name: null,
    avatar: null,
    gold: 0,
    stamina: 0,
    overall_exp: 0,
  });
  const [assets, setAssets] = useState<string[]>(assetsToBePreloaded);
  const [appReady, setAppReady] = useState<appReady>({
    assets: false,
    loginStatus: null,
    expoMsg: false,
    loading: true,
  });
  const [deviceInfo, setDeviceInfo] = useState<deviceInfo>(null);

  // Check players login status
  // Set the Players Object
  // Set the Device Info
  Initialize(setLoginStatus, setPlayerObj, setDeviceInfo);

  const sendExpoMessage = useSendExpoMessage;

  const vibrate = (time: number | "tap") => {
    sendExpoMessage({ type: "vibrate", time });
  };

  useEffect(() => {
    console.log(appReady);
    preloadAssets(assets).then(() => {
      // console.log(appReady);
      if (
        deviceInfo !== null &&
        deviceInfo.deviceType !== undefined &&
        deviceInfo?.osName !== undefined &&
        loginStatus !== null
      ) {
        setAppReady((prev) => {
          return { ...prev, expoMsg: true, assets: true, loginStatus: true };
        });

        // // Send the info to the server
        // const SocketIO = io("https://api.idleskiller.com", {
        // 	transports: ["websocket"],
        // 	withCredentials: true,
        // });

        // setSocket(SocketIO);

        // SocketIO.on("connect", () => {
        // 	console.log(SocketIO);
        // 	if (deviceInfo !== null) {
        // 		SocketIO.emit("registerDevice", deviceInfo);
        // 	} else {
        // 		SocketIO.disconnect();
        // 	}
        // });

        // return () => {
        // 	SocketIO.disconnect();
        // };
      }
    });
  }, [deviceInfo, assets, loginStatus]);

  // const isReady = useMemo(() => {
  // 	return appReady.assets && appReady.expoMsg && appReady.loginStatus !== null;
  // }, [appReady]);

  return (
    <div>
      <Context.Provider
        value={{
          vibrate,
          deviceInfo,
          loginStatus,
          socket,
          setLoginStatus,
          screen,
          setScreen,
          setAssets,
          assets,
          setAppReady,
          appReady,
          playerObj,
          setPlayerObj,
        }}
      >
        {appReady.expoMsg &&
        appReady.assets &&
        appReady.loginStatus &&
        appReady.loading ? (
          children
        ) : (
          <Loading setAppReady={setAppReady} />
        )}
      </Context.Provider>
    </div>
  );
}
