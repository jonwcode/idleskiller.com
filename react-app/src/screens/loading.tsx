import React, { useEffect, useRef, useState } from "react";
import { type appReady } from "@ts/store.js";
import css from "@css/loading.module.css";
import { Box, Flex } from "@common/index";

export default function Loading({
	setAppReady,
}: {
	setAppReady: React.Dispatch<React.SetStateAction<appReady>>;
}) {
	const [show, setShow] = useState(false);
	const timeout = useRef<NodeJS.Timeout | null>(null);
	const initTimeout = useRef<NodeJS.Timeout | null>(null);
	useEffect(() => {
		initTimeout.current = setTimeout(() => {
			setAppReady(prev => ({ ...prev, loading: false }));
			setShow(true);
		}, 1000);

		timeout.current = setTimeout(() => {
			setAppReady(prev => ({ ...prev, loading: true }));
		}, 3000);

		return () => {
			if (initTimeout.current !== null) clearTimeout(initTimeout.current);

			if (timeout.current !== null) clearTimeout(timeout.current);
		};
	}, []);

	return (
		<React.Fragment>
			{show && (
				<Flex center middle column style={{ flex: 1, height: "100vh" }}>
					<Flex tag="h1">
						<Box pr={10}>Loading</Box> <Box mt={10} className={css.dots} />
					</Flex>
				</Flex>
			)}
		</React.Fragment>
	);
}
