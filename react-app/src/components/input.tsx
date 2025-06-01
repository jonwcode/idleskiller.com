import React, { useState, useEffect, useRef, forwardRef } from "react";
import css from "@cssc/input.module.css";
import { Flex, Box } from "@/common";
import { ReactComponent as UserSVG } from "@/assets/svg/user.svg";
import { ReactComponent as EmailSVG } from "@/assets/svg/email.svg";
import { ReactComponent as PassSVG } from "@/assets/svg/pass.svg";
import { ReactComponent as Eye } from "@/assets/svg/eye.svg";
import { ReactComponent as EyeSlash } from "@/assets/svg/eyeSlash.svg";
import { ReactComponent as ErrorIcon } from "@/assets/svg/errorIcon.svg";
import PasswordMeter from "@comp/passwordMeter";

type inputTypes = React.InputHTMLAttributes<HTMLInputElement> & {
	name: string;
	value?: string | null | undefined;
	type: React.InputHTMLAttributes<HTMLInputElement>["type"];
	error?: { err: boolean | null; msg?: string };
	hint?: string;
	startIcon?: "username" | "password" | "email" | "account";
	togglePass?: boolean;
	width?: number | string;
	height?: number | string;
	focusLabelColor?: string;
	placeholder?: string;
	labelColor?: string;
	inputColor?: string;
	icon?: JSX.Element;
	backgroundColor?: string;
	style?: React.CSSProperties;
	passMeter?: boolean;
	onClick?: React.MouseEventHandler<HTMLInputElement>;
	ref?: React.RefObject<HTMLInputElement>;
};

const Input = forwardRef<HTMLInputElement, inputTypes>(
	(
		{
			name,
			value,
			backgroundColor,
			labelColor,
			inputColor,
			type,
			error,
			hint: inputHint,
			startIcon,
			togglePass = false,
			width,
			height,
			focusLabelColor,
			style,
			placeholder = "",
			icon: iconImage,
			passMeter,
			onChange,
			onClick: handleClick,
			...rest
		},
		ref
	) => {
		const [startSVG, setStartSVG] = useState<undefined | React.ReactNode>();
		const [inputType, setInputType] = useState(type);
		const [passToggleSVG, setPassToggleSVG] = useState(<Eye />);
		const [inputGroupClasses, setInputGroupClasses] = useState(`${css.inputGroup}`);
		const [hint, setHint] = useState(inputHint ?? "");
		const [showPassMeter, setShowPassMeter] = useState(false);

		useEffect(() => {
			if (
				(error && error?.msg && error?.msg.length >= 1) ||
				(error?.err && error?.err !== null)
			) {
				setInputGroupClasses(`${css.inputGroup} ${css.inputGroupError}`);
			} else {
				setInputGroupClasses(`${css.inputGroup}`);
			}
		}, [error]);

		useEffect(() => {
			if (passMeter && type === "password") {
				setShowPassMeter(true);
			}
		}, [passMeter]);

		const icon = useRef<null | string>(null);
		// Switch between the icons
		useEffect(() => {
			if (startIcon && icon.current !== startSVG) {
				switch (startIcon) {
					case "email":
						setStartSVG(<EmailSVG />);
						break;
					case "password":
						setStartSVG(<PassSVG />);
						break;
					case "username":
						setStartSVG(<UserSVG />);
						break;
					case "account":
						setStartSVG(<UserSVG />);
						break;
				}
			}
		}, []);

		const handleIcon = (evt: React.KeyboardEvent<HTMLInputElement>) => {
			const emailRegex =
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			const userRegex = /^[A-Za-z0-9]+(?:.[A-Za-z0-9]+)*$/;

			const val = evt.currentTarget.value;

			if (startIcon === "account") {
				if (val.match(emailRegex)) {
					setStartSVG(<EmailSVG />);
					icon.current = "email";
				} else if (val.match(userRegex)) {
					setStartSVG(<UserSVG />);
					icon.current = "username";
				}
			}
		};

		const handleTogglePass = () => {
			if (inputType === "password") {
				setInputType("text");
				setPassToggleSVG(<EyeSlash />);
			} else {
				setInputType("password");
				setPassToggleSVG(<Eye />);
			}
		};

		const handleCheckBox = (evt: React.MouseEvent<HTMLInputElement>) => {
			if (handleClick) {
				handleClick(evt as React.MouseEvent<HTMLInputElement>);
			}
			const target = evt.currentTarget as HTMLInputElement;
			console.log(target.name);

			const input = document.getElementsByTagName("input");

			// Uncheck all

			for (let i = 0; i < input.length; i++) {
				if (
					input[i].type === "checkbox" &&
					input[i].dataset.id === "InputComponentRadioCheckbox" &&
					input[i].name === target.name
				) {
					input[i].checked = false;
				}
			}

			target.checked = true;
		};

		return (
			<Flex
				{...(style && { style: style })}
				{...(width && { style: { width: width, ...style } })}
				{...(backgroundColor && { style: { "--inputBackground-color": backgroundColor } })}
				{...(error && error.err && { "data-error": true })}
				{...(type === "radio" && {
					style: {
						paddingTop: "0px !important",
						"--minHeight": "35px",
						"--paddingTop": "0px",
					},
				})}
				className={inputGroupClasses}
			>
				{showPassMeter && value && <PasswordMeter setHint={setHint} value={value} />}
				<Flex
					{...(!startSVG && { style: { display: "none" } })}
					middle
					center
					pr={5}
					pl={5}
					className={css.startIcon}
				>
					{startSVG && startSVG}
				</Flex>
				<Flex
					tag="label"
					htmlFor={name}
					data-placeholder={placeholder}
					className={css.floatingLabel}
					middle
					style={{
						"--size": "27px",
						...(labelColor && { "--label-color": labelColor }),
						...(focusLabelColor && { "--inputFocused-color": focusLabelColor }),
					}}
				>
					<Box
						tag="input"
						placeholder={placeholder}
						{...(ref && { ref: ref })}
						spellCheck={false}
						{...(type !== "radio" && { required: true })}
						autoCorrect="off"
						autoCapitalize="off"
						onKeyUp={handleIcon}
						onChange={onChange}
						name={name}
						value={value}
						{...(placeholder.length > 0 && { style: { paddingTop: 7 } })}
						{...(type === "radio" && { style: { display: "none" } })} // Hide the input if it's a radio
						type={inputType}
						{...rest}
					/>
					{/* Radio Input here */}
					{/* 
					Working on creating a radio button,
					input is already hidden just need our own styles
					now	
				*/}
					{type === "radio" && (
						<Flex middle className={css.radioInputContainer}>
							<input
								name={name}
								type="checkbox"
								data-id="InputComponentRadioCheckbox"
								value={value}
								onClick={evt => handleCheckBox(evt)}
								className={`${css.radioCheckBox}`}
							/>
							<Box
								style={{ marginLeft: 5, marginRight: 5 }}
								className={css.radioInput}
							></Box>
							<Flex middle center p={5} style={{ marginLeft: 4 }}>
								{placeholder || iconImage}
							</Flex>
						</Flex>
					)}

					{/* Toggle Password Code Starts */}
					{togglePass && (
						<Flex
							onClick={handleTogglePass}
							center
							middle
							style={{ cursor: "pointer", "--size": "25px", zIndex: 10 }}
							pr={5}
						>
							{passToggleSVG}
						</Flex>
					)}
				</Flex>
				{!error?.msg && hint && hint.length >= 1 && (
					<Flex className={css.inputGroupHintContainer}>{hint}</Flex>
				)}
				{error &&
					error.msg &&
					error.msg.trim().length >= 1 &&
					error.err &&
					error?.err !== null && (
						<Flex
							middle
							style={{ "--size": "15px", color: "var(--danger-color)" }}
							className={css.inputGroupErrorContainer}
						>
							<ErrorIcon />{" "}
							<Box style={{ marginLeft: 5 }} tag="span">
								{error.msg}
							</Box>
						</Flex>
					)}
			</Flex>
		);
	}
);

export default Input;
