import { Flex, Box } from "@common/index";
import css from "@cssc/staminaBar.module.css";
import { ReactComponent as StaminaIcon } from "@/assets/svg/staminaIcon.svg";

export default function StaminaBar() {
	return (
		<Flex className={css.bar} middle>
			<StaminaIcon style={{ color: "#d7ddaf", width: 25, height: 25 }} />
			<Box
				data-percentage="100 / 60"
				className={css.innerBar}
				style={{
					width: "60%",
					height: "100%",
					maxHeight: "15px",
					textAlign: "center",
					lineHeight: "15px",
				}}
			></Box>
		</Flex>
	);
}
