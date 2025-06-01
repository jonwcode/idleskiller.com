import React, { useEffect, useRef, useState } from "react";
import css from "@cssc/passmeter.module.css";

type MeterRule = {
	pass: boolean;
	hint: string;
	ok: boolean;
};

type Meter = {
	upperCaseLetters: MeterRule;
	specialLetters: MeterRule;
	digits: MeterRule;
	lowerCaseLetters: MeterRule;
};

export default function PasswordMeter({
	value,
	setHint,
}: {
	value: string;
	setHint?: React.Dispatch<React.SetStateAction<string>>;
}) {
	const timeout = useRef<NodeJS.Timeout | number | null>(null);
	const passStr = useRef(0);
	const hintRef = useRef("");

	const [passStrength, setPassStrength] = useState(0);

	const handleMeterChange = () => {
		if (timeout.current !== null) {
			clearTimeout(timeout.current);
		}

		timeout.current = setTimeout(() => {
			// Okay, now lets simply test the password for
			// inputGroup.dataset.hint =
			//   'Password must be a minimum of 8 characters long.';

			if (value && value.length >= 1) {
				let meter = {
					upperCaseLetters: {
						pass: value.match(/(?=.*[A-Z].*[A-Z])/) ? true : false,
						hint: "Password hint: Have at least 2 uppercase..",
						ok: false,
					},

					specialLetters: {
						pass: value.match(/(?=.*[!@#$&*])/) ? true : false,
						hint: "Password hint: Add special letters.",
						ok: false,
					},
					digits: {
						pass: value.match(/(?=.*[0-9].*[0-9])/) ? true : false,
						hint: "Password hint: Add more numbers.",
						ok: false,
					},
					lowerCaseLetters: {
						pass: value.match(/(?=.*[a-z].*[a-z].*[a-z])/) ? true : false,
						hint: "Password: Add more lowercase letters.",
						ok: false,
					},
				};

				// Loop through the rules and judge the password

				passStr.current = 0;
				hintRef.current = "";

				for (let key in meter) {
					const rule = meter[key as keyof Meter];

					if (rule.pass === false) {
						hintRef.current = rule.hint;
					}
					if (rule.pass === true) {
						passStr.current = passStr.current + 1;
						rule.ok = true;
					} else if (passStr.current === 4 && rule.ok !== false && !rule.pass) {
						passStr.current = passStr.current - 1;
					}
				}
				// Set the new Password Strength
				setPassStrength(passStr.current);
				// Apply the hint
				if (hintRef.current !== undefined && setHint) {
					setHint(hintRef.current);
				}

				// Reset the rule.ok to false

				for (let key in meter) {
					let rule = meter[key as keyof Meter];

					rule.ok = false;
				}
			} else {
				setPassStrength(0);

				if (setHint) {
					setHint("");
				}
			}
		}, 1200);
	};

	useEffect(() => {
		passStr.current = passStrength;
		handleMeterChange();
	}, [value]);

	return (
		<div data-meter={passStrength} className={css.passMeter}>
			<span></span>
			<span></span>
		</div>
	);
}
