import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const transition = (Component: React.ComponentType) => (props: any) =>
	(
		<>
			<motion.div
				className="slide-down"
				initial={{ y: "-100%", x: "0", opacity: 0 }}
				animate={{ y: 0, x: 0, opacity: 1 }}
				exit={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.4 }}
			>
				<Component {...props} />
			</motion.div>
		</>
	);

export default transition;
