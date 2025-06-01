import React, { useEffect, useState, useRef } from "react";
import { ReactComponent as CogIcon } from "@svg/cog.svg";
import { Box, Flex } from "@common/index";
import css from "@cssc/playerSettings.module.css";
import { Link } from "react-router-dom";
import Logout from "@screens/logout";

export default function UserSettings() {
  const dropDownMenuRef = useRef<HTMLDivElement>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const handleClosingMenu = (evt: MouseEvent) => {
      if (
        dropDownMenuRef.current &&
        !dropDownMenuRef.current.contains(evt.target as Node) &&
        showMenu
      ) {
        setShowMenu(false);
        console.log("using this");
      }
    };

    document.addEventListener("mousedown", handleClosingMenu);

    return () => {
      document.removeEventListener("mousedown", handleClosingMenu);
    };
  }, [showMenu]);

  const handleLogout = (evt) => {
    evt.preventDefault();
    setShowMenu(false);
    setShowAlert(true);
  };

  return (
    <React.Fragment>
      <Flex ref={dropDownMenuRef}>
        <Box onClick={() => setShowMenu((prev) => !prev)} vibrate="tap">
          <CogIcon className={css.cogIcon} />
        </Box>
        {showMenu && (
          <Flex column className={css.menuContainer}>
            <Flex className={css.titleBar}>Player Settings</Flex>
            <Flex>
              <Link onClick={handleLogout} to="">
                Logout
              </Link>
            </Flex>
            
          </Flex>
        )}
        <Logout setShowAlert={setShowAlert} showAlert={showAlert} />
      </Flex>
    </React.Fragment>
  );
}
