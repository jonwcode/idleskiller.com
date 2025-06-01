import React, { createContext } from "react";
import { Socket } from "socket.io-client";
import {
  type deviceInfo,
  type screen,
  type setScreen,
  type appReady,
  type appReadyDispatch,
  type playerObjType,
} from "@/types/store";

type contextType = {
  vibrate: (time: number | "tap") => void;
  deviceInfo: deviceInfo;
  loginStatus: boolean | null;
  socket: Socket | null;
  setLoginStatus: React.Dispatch<React.SetStateAction<boolean>>;
  screen: screen;
  setScreen: setScreen;
  setAppReady: appReadyDispatch;
  appReady: appReady;
  setAssets: React.Dispatch<React.SetStateAction<string[]>>;
  assets: string[];
  setPlayerObj: React.Dispatch<React.SetStateAction<playerObjType>>;
  playerObj: playerObjType;
};

const Context = createContext<contextType>({
  deviceInfo: {
    deviceType: null,
    osBuildId: null,
    osName: null,
  },
  appReady: {
    expoMsg: false,
    loginStatus: false,
    assets: false,
    loading: false,
  },
  vibrate: () => {},
  setAppReady: () => {},
  setAssets: () => {},
  assets: [],
  loginStatus: null,
  socket: null,
  setLoginStatus: () => {},
  screen: "",
  setScreen: () => {},
  playerObj: { name: null, avatar: null, gold: 0, overall_exp: 0, stamina: 0 },
  setPlayerObj: () => {},
});

export default Context;
