import React from "react";
import { Flex, Box } from "@common/index";
import css from "@cssc/playerInfo.module.css";
import { ReactComponent as ClockIcon } from "@/assets/svg/clock.svg";
import { ReactComponent as TrophyIcon } from "@/assets/svg/trophy.svg";
import { ReactComponent as EXPIcon } from "@/assets/svg/expIcon.svg";

export default function PlayerInfo() {
	return (
		<React.Fragment>
			<Flex className={css.playerInfoContainer} style={{ paddingRight: 10, marginTop: 20 }}>
				{/* Basic Account Info */}
				<Flex className={css.playerInfoContainer} column>
					<Flex middle className={css.bg_dark}>
						<ClockIcon style={{ marginRight: 10 }} width={18} height={18} /> 12 hrs
					</Flex>
					<Flex middle className={css.bg_light}>
						<TrophyIcon style={{ marginRight: 10 }} width={27} height={27} /> 1
					</Flex>
					<Flex middle className={css.bg_dark}>
						<EXPIcon width={15} height={15} style={{ marginRight: 5 }} /> 1
					</Flex>
				</Flex>
			</Flex>
		</React.Fragment>
	);
}
