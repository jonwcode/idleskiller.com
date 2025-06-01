// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
import swc from "vite-plugin-swc";
var vite_config_default = defineConfig({
	define: {
		__ASSETS__: JSON.stringify("https://assets.idleskiller.com/"),
	},
	plugins: [
		react(),
		svgr({
			svgrOptions: { exportType: "named", ref: true, svgo: false, titleProp: true },
			include: "**/*.svg",
		}),
		swc(),
	],
	resolve: {
		alias: {
			"@": path.resolve("/var/www/idleskiller.com/react-app", "src"),
			"@store": `${"/var/www/idleskiller.com/react-app"}/src/store`,
			"@common": `${"/var/www/idleskiller.com/react-app"}/src/common`,
			"@hooks": `${"/var/www/idleskiller.com/react-app"}/src/hooks`,
			"@comp": `${"/var/www/idleskiller.com/react-app"}/src/components/`,
			"@cssc": `${"/var/www/idleskiller.com/react-app"}/src/styles/components/`,
			"@css": `${"/var/www/idleskiller.com/react-app"}/src/styles/`,
			"@svg": `${"/var/www/idleskiller.com/react-app"}/src/assets/svg/`,
			"@assets": `${"/var/www/idleskiller.com/react-app"}/src/assets/`,
			"@screens": `${"/var/www/idleskiller.com/react-app"}/src/screens/`,
			"@ts": `${"/var/www/idleskiller.com/react-app"}/src/types`,
		},
	},
	server: {
		host: "0.0.0.0",
		port: 3001,
		cors: {
			origin: ["https://app.idleskiller.com"],
			credentials: true,
		},
		proxy: {
			"/api": {
				target: "https://api.idleskiller.com",
				changeOrigin: true,
				rewrite: path2 => path2.replace(/^\/api/, ""),
			},
		},
	},
});
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgc3ZnciBmcm9tIFwidml0ZS1wbHVnaW4tc3ZnclwiO1xuaW1wb3J0ICogYXMgdXJsIGZyb20gXCJ1cmxcIjtcbmltcG9ydCB7IGRpcm5hbWUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCBzd2MgZnJvbSBcInZpdGUtcGx1Z2luLXN3Y1wiO1xuXG4vLyBodHRwczovL3ZpdGUuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG5cdGRlZmluZToge1xuXHRcdF9fQVNTRVRTX186IEpTT04uc3RyaW5naWZ5KFwiaHR0cHM6Ly9hc3NldHMuaWRsZXNraWxsZXIuY29tL1wiKSxcblx0fSxcblx0cGx1Z2luczogW1xuXHRcdHJlYWN0KCksXG5cdFx0c3Zncih7XG5cdFx0XHQvLyBzdmdyIG9wdGlvbnM6IGh0dHBzOi8vcmVhY3Qtc3Znci5jb20vZG9jcy9vcHRpb25zL1xuXHRcdFx0c3Znck9wdGlvbnM6IHsgZXhwb3J0VHlwZTogXCJuYW1lZFwiLCByZWY6IHRydWUsIHN2Z286IGZhbHNlLCB0aXRsZVByb3A6IHRydWUgfSxcblx0XHRcdGluY2x1ZGU6IFwiKiovKi5zdmdcIixcblx0XHR9KSxcblx0XHRzd2MoKSxcblx0XSxcblx0cmVzb2x2ZToge1xuXHRcdGFsaWFzOiB7XG5cdFx0XHRcIkBcIjogcGF0aC5yZXNvbHZlKFwiL3Zhci93d3cvaWRsZXNraWxsZXIuY29tL3JlYWN0LWFwcFwiLCBcInNyY1wiKSxcblx0XHRcdFwiQHN0b3JlXCI6IGAke1wiL3Zhci93d3cvaWRsZXNraWxsZXIuY29tL3JlYWN0LWFwcFwifS9zcmMvc3RvcmVgLFxuXHRcdFx0XCJAY29tbW9uXCI6IGAke1wiL3Zhci93d3cvaWRsZXNraWxsZXIuY29tL3JlYWN0LWFwcFwifS9zcmMvY29tbW9uYCxcblx0XHRcdFwiQGhvb2tzXCI6IGAke1wiL3Zhci93d3cvaWRsZXNraWxsZXIuY29tL3JlYWN0LWFwcFwifS9zcmMvaG9va3NgLFxuXHRcdFx0XCJAY29tcFwiOiBgJHtcIi92YXIvd3d3L2lkbGVza2lsbGVyLmNvbS9yZWFjdC1hcHBcIn0vc3JjL2NvbXBvbmVudHNgLFxuXHRcdFx0XCJAY3NzY1wiOiBgJHtcIi92YXIvd3d3L2lkbGVza2lsbGVyLmNvbS9yZWFjdC1hcHBcIn0vc3JjL3N0eWxlcy9jb21wb25lbnRzL2AsXG5cdFx0XHRcIkBjc3NcIjogYCR7XCIvdmFyL3d3dy9pZGxlc2tpbGxlci5jb20vcmVhY3QtYXBwXCJ9L3NyYy9zdHlsZXMvYCxcblx0XHRcdFwiQHN2Z1wiOiBgJHtcIi92YXIvd3d3L2lkbGVza2lsbGVyLmNvbS9yZWFjdC1hcHBcIn0vc3JjL2Fzc2V0cy9zdmcvYCxcblx0XHRcdFwiQHNjcmVlbnNcIjogYCR7XCIvdmFyL3d3dy9pZGxlc2tpbGxlci5jb20vcmVhY3QtYXBwXCJ9L3NyYy9zY3JlZW5zL2AsXG5cdFx0XHRcIkB0eXBlc1wiOiBgJHtcIi92YXIvd3d3L2lkbGVza2lsbGVyLmNvbS9yZWFjdC1hcHBcIn0vc3JjL3R5cGVzYCxcblx0XHR9LFxuXHR9LFxuXHRzZXJ2ZXI6IHtcblx0XHRob3N0OiBcIjAuMC4wLjBcIixcblx0XHRwb3J0OiAzMDAxLFxuXHRcdGNvcnM6IHtcblx0XHRcdG9yaWdpbjogW1wiaHR0cHM6Ly9hcHAuaWRsZXNraWxsZXIuY29tXCJdLCAvLyBTcGVjaWZ5IGFsbG93ZWQgb3JpZ2luc1xuXHRcdFx0Y3JlZGVudGlhbHM6IHRydWUsXG5cdFx0fSxcblx0XHRwcm94eToge1xuXHRcdFx0XCIvYXBpXCI6IHtcblx0XHRcdFx0dGFyZ2V0OiBcImh0dHBzOi8vYXBpLmlkbGVza2lsbGVyLmNvbVwiLFxuXHRcdFx0XHRjaGFuZ2VPcmlnaW46IHRydWUsXG5cdFx0XHRcdHJld3JpdGU6IHBhdGggPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgXCJcIiksXG5cdFx0XHR9LFxuXHRcdH0sXG5cdH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBR0EsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDM0IsUUFBUTtBQUFBLElBQ1AsWUFBWSxLQUFLLFVBQVU7QUFBQTtBQUFBLEVBRTVCLFNBQVM7QUFBQSxJQUNSO0FBQUEsSUFDQSxLQUFLO0FBQUEsTUFFSixhQUFhLEVBQUUsWUFBWSxTQUFTLEtBQUssTUFBTSxNQUFNLE9BQU8sV0FBVztBQUFBLE1BQ3ZFLFNBQVM7QUFBQTtBQUFBLElBRVY7QUFBQTtBQUFBLEVBRUQsU0FBUztBQUFBLElBQ1IsT0FBTztBQUFBLE1BQ04sS0FBSyxLQUFLLFFBQVEsc0NBQXNDO0FBQUEsTUFDeEQsVUFBVSxHQUFHO0FBQUEsTUFDYixXQUFXLEdBQUc7QUFBQSxNQUNkLFVBQVUsR0FBRztBQUFBLE1BQ2IsU0FBUyxHQUFHO0FBQUEsTUFDWixTQUFTLEdBQUc7QUFBQSxNQUNaLFFBQVEsR0FBRztBQUFBLE1BQ1gsUUFBUSxHQUFHO0FBQUEsTUFDWCxZQUFZLEdBQUc7QUFBQSxNQUNmLFVBQVUsR0FBRztBQUFBO0FBQUE7QUFBQSxFQUdmLFFBQVE7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxNQUNMLFFBQVEsQ0FBQztBQUFBLE1BQ1QsYUFBYTtBQUFBO0FBQUEsSUFFZCxPQUFPO0FBQUEsTUFDTixRQUFRO0FBQUEsUUFDUCxRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxTQUFTLFdBQVEsTUFBSyxRQUFRLFVBQVU7QUFBQTtBQUFBO0FBQUE7QUFBQTsiLAogICJuYW1lcyI6IFtdCn0K
