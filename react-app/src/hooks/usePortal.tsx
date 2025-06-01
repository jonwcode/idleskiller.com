import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
export default function UsePortal({ children }: { children: ReactNode }) {
	return (
		<React.Fragment>
			{ReactDOM.createPortal(children, document.getElementsByTagName("body")[0])}
		</React.Fragment>
	);
}
