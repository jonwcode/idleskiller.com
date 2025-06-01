import { useRef } from "react";
import { type deviceType } from "@ts/box";
import { Box } from "@common/index";
export default function Hr({
	text,
	width,
	colorBottom,
	colorTop,
	mb,
	mt,
	style: CSSStyle,
}: {
	mb?: string | number;
	mt?: string | number;
	text?: string;
	width?: string | number;
	colorTop?: string;
	colorBottom?: string;
	style?: deviceType;
}) {
	const hrWidth = !width ? "75%" : width;
	const borderTop = `1px solid ${!colorTop ? "#25415f" : colorTop}`;
	const borderBottom = `1px solid ${!colorBottom ? "#202020" : colorBottom}`;

	return (
		<Box
			tag="fieldset"
			style={{
				width: hrWidth,
				lineHeight: 0,
				padding: 0,
				marginBottom: 20,
				...(mb && { marginBottom: mb }),
				...(mt && { marginTop: mt }),
				borderBottom: borderBottom,
				borderLeft: 0,
				borderRight: 0,
				borderTop: borderTop,
				...(CSSStyle && { ...CSSStyle }),
			}}
		>
			{text && (
				<legend style={{ textAlign: "center", paddingLeft: 5, paddingRight: 5 }}>
					{text}
				</legend>
			)}
		</Box>
	);
}
