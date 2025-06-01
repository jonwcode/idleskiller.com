import React, { useContext } from "react";
import Context from "@store/context";
import HomeScreen from "@/screens/home";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MiningSkill from "@/screens/skills/mining/miningMain";
import Skills from "@/screens/skills";
import Login from "@screens/login";
import Signup from "@screens/signup";
import StartScreen from "@screens/startScreen";
import Logout from "@screens/logout";

function App() {
  const location = useLocation();
  const ctx = useContext(Context);

  return (
    <React.Fragment>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {!ctx.loginStatus ? (
            <>
              <Route
                index
                element={ctx.loginStatus ? <HomeScreen /> : <StartScreen />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          ) : (
            <Route path="*" element={<HomeScreen />} />
          )}
          {/* Conditionally render protected routes */}
          {ctx.loginStatus ? (
            <>
              <Route path="/skills" element={<Skills />} />
              <Route path="/skills/mining" element={<MiningSkill />} />
              <Route path="/logout" element={<Logout />} />
            </>
          ) : (
            <Route path="*" element={<Login />} />
          )}
        </Routes>
      </AnimatePresence>
    </React.Fragment>
  );
}

export default App;
