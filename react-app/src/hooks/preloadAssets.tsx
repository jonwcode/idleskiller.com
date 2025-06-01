const preloadAssets = (assets: string[]): Promise<void> => {
	return new Promise(resolve => {
		if (assets.length === 0) {
			resolve(); // No assets to load, resolve immediately
			return;
		}

		const imgLoadPromises = assets.map(
			src =>
				new Promise<void>(res => {
					const img = new Image();
					img.src = src;
					img.onload = () => res();
					img.onerror = () => res(); // Prevent blocking on errors
				})
		);

		Promise.all(imgLoadPromises).then(() => resolve());
	});
};

export default preloadAssets;
