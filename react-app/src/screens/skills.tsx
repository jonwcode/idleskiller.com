import React from "react";
import css from "@css/skills.module.css";
import { Flex, Box } from "@common/index";
import BottomNav from "@/components/bottomNav";
import { Link } from "react-router-dom";
import Header from "@/components/header";

export default function Train() {
  return (
    <React.Fragment>
      <Header />
      <Box className={css.gridLayout}>
        <Link style={{}} to="/skills/mining">
          <Flex
            column
            style={{
              flex: 1,
              alignItems: "center",
              height: 220,
              width: 220,
              phone: { width: 150, height: 150 },
              tablet: { width: 250, height: 200 },
              background: "#635712",
            }}
            className={css.skillBox}
          >
            <Flex className={css.skillTitle} middle center>
              Mining
            </Flex>
            <Flex
              center
              middle
              style={{
                phone: { height: "50%" },
                tablet: { height: "50%" },
                height: "50%",
                width: "70%",
                background: "rgba(63, 61, 52, 0.24)",
                borderRadius: 20,
                margin: 10,
              }}
            >
              <Box
                tag="img"
                style={{ phone: { width: 100 }, tablet: { width: 120 } }}
                width="120px"
                height="120px"
                src={`${__ASSETS__}/images/pickaxe.png`}
              />
            </Flex>
            <Flex style={{ flex: 1, width: "100%", height: "30%" }}>
              <Flex
                className={css.statusButton}
                style={{ flex: 1 }}
                middle
                center
              >
                Inactive
              </Flex>
            </Flex>
          </Flex>
        </Link>
        {/* Woodcutting Skill */}
        <Link to="/woodcutting">
          <Flex
            column
            style={{
              flex: 1,
              alignItems: "center",
              height: 200,
              width: 220,
              phone: { width: 150, height: 150 },
              tablet: { width: 250, height: 200 },
              background: "#10322f",
            }}
            className={css.skillBox}
          >
            <Flex className={css.skillTitle} center>
              Woodcutting
            </Flex>
            <Flex
              center
              middle
              style={{
                phone: { height: "50%" },
                tablet: { height: "50%" },
                height: "50%",
                width: "70%",
                background: "rgba(17, 124, 49, 0.07)",
                borderRadius: 20,
                margin: 10,
              }}
            >
              <Box
                tag="img"
                style={{ phone: { width: 100 }, tablet: { width: 120 } }}
                width="120px"
                height="120px"
                src={`${__ASSETS__}/images/tree.png`}
              />
            </Flex>
            <Flex style={{ flex: 1, width: "100%", height: "30%" }}>
              <Flex
                className={css.statusButton}
                style={{ flex: 1, alignItems: "stretch" }}
                middle
                center
              >
                Inactive
              </Flex>
            </Flex>
          </Flex>
        </Link>
      </Box>
      <BottomNav />
    </React.Fragment>
  );
}
