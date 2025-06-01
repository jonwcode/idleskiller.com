import React, { useEffect } from "react";
import useReady from "@/hooks/useReady";
import { playerObjType, type deviceInfo } from "@/types/store";

export default function CheckLoginStatus(
  setLoginStatus: React.Dispatch<React.SetStateAction<boolean>>,
  setPlayerObj: React.Dispatch<React.SetStateAction<playerObjType>>,
  setDeviceInfo: React.Dispatch<React.SetStateAction<deviceInfo>>
) {
  const checkStatus = async () => {
    // Send to to the server to be verified

    const req = await fetch("/api/init", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "init",
    });

    const res = await req.json();

    setLoginStatus(res.success);
    setPlayerObj(res.player);
    setDeviceInfo(res.deviceInfo);
  };

  useReady(() => {
    checkStatus();
  }, []);

  return null;
}
