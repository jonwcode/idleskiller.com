import React, { useContext, forwardRef } from "react";
import Context from "@/store/context";
import css from "./common.module.css";

/**
 * @template T
 * @param {object} param
 * @param {HTMLElement} param.tag
 * @param {object} param.style - css style
 * @param {React.CSSProperties} param.style.tiny - css Tiny Device styles
 * @param {React.CSSProperties} param.style.mobile - css Mobile Device styles
 * @param {React.CSSProperties} param.style.tablet - css Tablet Device styles
 * @param {React.CSSProperties} param.style.desktop - css Desktop Device styles
 * @param {React.CSSProperties} param.style.uhd - css UHD Device styles
 * @param {('red'|'green'|'blue'|'pink'|'purple'|'aqua'|'white'|'black'|'yellow'|boolean)} param.border
 * @param {boolean} param.fullWidth
 * @param {number} param.pr
 * @param {number} param.pl
 * @param {number} param.p
 * @param {number} param.m
 * @param {number} param.pt
 * @param {number} param.pb
 * @param {number} param.mt
 * @param {number} param.mb
 * @param {number} param.mr
 * @param {number} param.ml
 * @return {T}
 */
const Box = forwardRef(
	(
		{
			tag = "div",
			p,
			pr,
			pl,
			pt,
			pb,
			m,
			mt,
			mb,
			ml,
			mr,
			children,
			style = { tiny: {}, mobile: {}, tablet: {}, desktop: {}, uhd: {} },
			border,
			fullWidth,
			className,
			...rest
		},
		ref
	) => {
		const ctx = useContext(Context);

		const Tag = tag;

		// Border handling
		const borderColors = [
			"red",
			"blue",
			"green",
			"pink",
			"purple",
			"aqua",
			"yellow",
			"white",
			"black",
		];
		let borderStyle = border;
		if (typeof border === "string") {
			if (borderColors.includes(border)) {
				borderStyle = `1px solid ${border}`;
			}
		} else if (typeof border === "boolean") {
			borderStyle = "1px solid red";
		}

		const classList = className ? className : "";

		return (
			<Tag
				ref={ref}
				style={{
					...style,
					...(borderStyle && { border: borderStyle }),
					...(fullWidth && { width: "100%" }),
					...(pr && { paddingRight: pr }),
					...(pl && { paddingLeft: pl }),
					...(pt && { paddingTop: pt }),
					...(pb && { paddingBottom: pb }),
					...(p && { padding: p }),
					...(ml && { marginLeft: ml }),
					...(mr && { marginRight: mr }),
					...(mt && { marginTop: mt }),
					...(mb && { marginBottom: mb }),
					...(m && { margin: m }),
					...(ctx.device === "tiny" && style.tiny),
					...(ctx.device === "mobile" && style.mobile),
					...(ctx.device === "tablet" && style.tablet),
					...(ctx.device === "desktop" && style.desktop),
					...(ctx.device === "uhd" && style.uhd),
				}}
				{...rest}
				className={`${css.box} ${classList}`}
			>
				{children}
			</Tag>
		);
	}
);

export default Box;
