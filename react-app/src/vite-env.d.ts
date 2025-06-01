/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />

declare module "*.svg" {
	import React from "react";
	const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
	export { ReactComponent };
}
