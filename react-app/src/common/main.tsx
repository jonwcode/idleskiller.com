import * as React from "react";
import Box from "@/common/box";

const Main = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => {
	return (
		<Box
			tag="main"
			style={{
				width: 1350,
				height: "100%",
				margin: "auto",
				...(style && { ...style }),
			}}
		>
			{children}
		</Box>
	);
};

export default Main;
