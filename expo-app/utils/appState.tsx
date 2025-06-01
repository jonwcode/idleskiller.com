import { useEffect, useState } from "react";
import { AppState, AppStateStatus, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IDLE_THRESHOLD = 60000; // 60 seconds (1 minute)

const AppLifecycleTracker = () => {
  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState
  );
  const [isFreshStart, setIsFreshStart] = useState<boolean>(false);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (appState === "background" && nextAppState === "active") {
        try {
          // Retrieve last background timestamp
          const lastBackgroundTime = await AsyncStorage.getItem(
            "lastBackgroundTime"
          );
          const now = Date.now();

          if (
            lastBackgroundTime &&
            now - Number(lastBackgroundTime) > IDLE_THRESHOLD
          ) {
            console.log(
              "App was in the background for a long time, treating as a fresh start."
            );
            setIsFreshStart(true);
          } else {
            console.log("App resumed quickly.");
            setIsFreshStart(false);
          }
        } catch (error) {
          console.error("Error retrieving last background time:", error);
        }
      }

      if (nextAppState === "background") {
        try {
          await AsyncStorage.setItem("lastBackgroundTime", String(Date.now()));
        } catch (error) {
          console.error("Error saving background timestamp:", error);
        }
      }

      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [appState]);

  return null;
};

export default AppLifecycleTracker;
