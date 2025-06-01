import { FC } from "react";
export type deviceType =
  | "Phone"
  | "Tablet"
  | "TV"
  | "Desktop"
  | "Browser"
  | "unknown"
  | null;

export type playerObjType = {
  name: string | null;
  avatar: string | null;
  gold: number;
  overall_exp: number;
  stamina: number;
};

export type osName =
  | "Android"
  | "iOS"
  | "iPadOS"
  | "Windows"
  | "MacOS"
  | "Linux"
  | "Unknown"
  | null;

export type appReady = {
  loginStatus: boolean | null;
  assets: boolean;
  expoMsg: boolean;
  loading: boolean;
};

export type appReadyDispatch = React.Dispatch<React.SetStateAction<appReady>>;

export type screen = string | JSX.Element;
export type setScreen = React.Dispatch<
  React.SetStateAction<string | JSX.Element>
>;

export type deviceInfo = {
  deviceType: deviceType;
  osName: osName;
  osBuildId: string | null;
} | null;
