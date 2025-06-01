import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrowIcon } from "@/assets/svg/backArrow.svg";

export default function BackArrow({ style }: { style?: React.CSSProperties }) {
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};
	return (
		<span onClick={handleGoBack} style={{ position: "relative", zIndex: "999999", ...style }}>
			<BackArrowIcon width="35" height="35" />
		</span>
	);
}
