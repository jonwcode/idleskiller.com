import { Flex, Box } from "@common/index";
import { ReactComponent as EXPIcon } from "@/assets/svg/exp.svg";

export default function Logo() {
	return (
		<Flex
			style={{
				width: "max-content",
				height: "calc(max-content + 10px)",
				alignItems: "flex-end",
				position: "relative",
				fontFamily: "LogoFont",
				fontSize: "2rem",
				margin: 10,
				textShadow: "0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.3)",
			}}
			center
			column
		>
			<Box style={{ order: 2 }}>Idle Skiller</Box>
			<EXPIcon
				style={{
					position: "relative",
				}}
				width="15px"
				height="15px"
			/>
		</Flex>
	);
}
