import { useEffect, useRef } from "react";

export default function useReady(func, deps) {
	const hasRun = useRef(new Map());

	useEffect(() => {
		const key = JSON.stringify(deps); // Convert dependencies to a key

		// Only run if this dependency key hasn't been seen before
		if (!hasRun.current.has(key)) {
			func(); // Execute function
			hasRun.current.set(key, true); // Mark this dependency change as "executed"
		}
	}, [deps]); // Make sure the effect depends on the dependencies

	return null;
}
