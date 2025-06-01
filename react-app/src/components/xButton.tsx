import { motion } from "framer-motion";
import { Box } from "@common/index";
import { useNavigate } from "react-router-dom";

export default function XButton() {
	const navigate = useNavigate();
	const handleClose = () => {
		sessionStorage.setItem("navigateBack", "true");
		setTimeout(() => {
			navigate(-1);
		}, 200);
	};

	return (
		<motion.div
			className="xbutton cursor-pointer"
			whileTap={{ scale: 0.9 }} // Slight tap effect
			onClick={handleClose}
		>
			<Box />
		</motion.div>
	);
}
