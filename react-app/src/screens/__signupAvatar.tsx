import React, { useState, useRef } from "react";
import { Box, Flex } from "@common/index";
import Input from "@comp/input";

type setInputsType = {
	setInputs: React.Dispatch<
		React.SetStateAction<{
			username: string;
			password: string;
			email: string;
			gender: number;
			avatar: string;
		}>
	>;
	setAvatarRef: (val: string | null) => void;
	error: { err: boolean | null; msg: string };
};

const __signupAvatar = ({ setInputs, setAvatarRef, error }: setInputsType) => {
	const [gender, setGender] = useState(0);

	const handleClick = (evt: React.MouseEvent<HTMLInputElement>) => {
		const target = evt.currentTarget;
		const value = target.value;
		const name = target.name;

		const val = name === "gender" ? +value : value;
		name === "gender" && setGender(+val);
		name === "avatar" && setAvatarRef(value);

		setInputs(prev => {
			return { ...prev, [name]: val };
		});
	};

	const maleCharacters = useRef([
		"male1.png",
		"male2.png",
		"male3.png",
		"male4.png",
		"male5.png",
		"male6.png",
	]);

	const femaleCharacters = useRef([
		"female1.png",
		"female2.png",
		"female3.png",
		"female4.png",
		"female5.png",
		"female6.png",
	]);
	return (
		<React.Fragment>
			<Box mt={40} mb={10} style={{ margin: "10px 0px 7px 3px" }}>
				{error.msg ? (
					<span style={{ color: "var(--danger-color)" }}>{error.msg}</span>
				) : (
					"Choose a Avatar"
				)}
			</Box>
			<Flex
				column
				center
				style={{
					padding: "2px 20px 40px 20px",
					phone: { width: "100%" },
					width: "80%",
					border: "1px dashed rgba(67, 93, 118, 0.679)",
					borderRadius: 10,
				}}
			>
				<Flex
					row
					style={{
						margin: 20,
						width: 300,
						justifyContent: "space-around",
					}}
				>
					<Input
						type="radio"
						onClick={handleClick}
						name="gender"
						placeholder="Male"
						value="1"
					/>
					<Input
						value="2"
						type="radio"
						onClick={handleClick}
						name="gender"
						placeholder="Female"
					/>
				</Flex>

				<Box
					mt={20}
					style={{
						width: "95%",
						display: "grid",
						gap: "2rem",
						phone: {
							gridAutoColumns: "repeat(3, 1fr)",
							gridTemplateColumns: "repeat(3, 1fr)",
						},
						justifyItems: "center",
						gridAutoColumns: "repeat(3, 1fr)",
						gridTemplateColumns: "repeat(3, 1fr)",
					}}
				>
					{/*  Male Gender Icons */}
					{gender <= 1 &&
						maleCharacters.current.map(src => (
							<Box
								{...(!gender && {
									style: {
										width: "max-content",
										background: "rgb(27, 44, 60)",
										outline: "1px solid rgb(36, 56, 76)",
										border: "1px solid rgb(36, 56, 76)",
										borderRadius: 4,
										outlineOffset: 3,
										padding: 0,
										margin: 0,
									},
								})}
								key={src}
							>
								<Box
									style={{
										visibility: !gender ? "hidden" : "visible",
									}}
								>
									<Input
										key={src}
										backgroundColor="transparent !important"
										type="radio"
										name="avatar"
										onClick={handleClick}
										icon={
											<Box
												tag="img"
												style={{
													phone: {
														width: 32,
														height: 32,
													},
													tablet: {
														width: 45,
														height: 45,
													},
													width: 45,
													height: 45,
												}}
												src={`${__ASSETS__}/images/characters/${src}`}
											/>
										}
										value={src}
									/>
								</Box>
							</Box>
						))}

					{/* Female Gender Icons */}
					{gender === 2 &&
						femaleCharacters.current.map(src => (
							<Input
								key={src}
								backgroundColor="transparent !important"
								type="radio"
								name="avatar"
								onClick={handleClick}
								icon={
									<Box
										tag="img"
										style={{
											phone: { width: 32, height: 32 },
											tablet: { width: 45, height: 45 },
											width: 45,
											height: 45,
										}}
										src={`${__ASSETS__}/images/characters/${src}`}
									/>
								}
								value={src}
							/>
						))}
				</Box>
			</Flex>
		</React.Fragment>
	);
};

export default __signupAvatar;
