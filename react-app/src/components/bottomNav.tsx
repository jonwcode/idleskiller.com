import { useState, useContext, useEffect } from "react";
import Context from "@store/context";
import { Flex, Box } from "@common/index";
import { Link } from "react-router-dom";
import css from "@cssc/bottomNav.module.css";
import { useLocation } from "react-router-dom";
import { ReactComponent as CharacterIcon } from "@svg/character.svg";
import { ReactComponent as ShopIcon } from "@svg/shop.svg";
import { ReactComponent as SkillIcon } from "@svg/exp.svg";

export default function BottomNav() {
  const [classList, setClassList] = useState();
  const { setScreen, screen } = useContext(Context);

  const location = useLocation();

  const pathSegments = location.pathname.split("/").filter(Boolean); // Remove empty parts

  useEffect(() => {}, [setScreen, screen]);
  return (
    <Flex tag="nav" className={css.navContainer}>
      <Flex className={css.navMenu}>
        <Flex
          onClick={() => setScreen("home")}
          role="button"
          id="home"
          className={`${css.item} ${location === "/" && css.active}`}
          column
          style={{ padding: 5 }}
          vibrate="tap"
        >
          <Link to="/">
            <CharacterIcon />
            Character
          </Link>
        </Flex>
        <Flex
          role="button"
          id="shop"
          className={`${css.item} ${pathSegments[0] === "shop" && css.active}`}
          style={{ padding: 5 }}
          column
          vibrate="tap"
        >
          <ShopIcon />
          Shop
        </Flex>
        <Flex
          vibrate="tap"
          onClick={() => setScreen("train")}
          role="button"
          id="train"
          className={`${css.item} ${
            pathSegments[0] === "skills" && css.active
          }`}
          style={{ padding: 2 }}
          column
        >
          <Link to="/skills">
            <SkillIcon />
            Skills
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
