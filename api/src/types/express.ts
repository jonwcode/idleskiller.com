interface Request extends Request {
	deviceInfo: { osName: string; osBuildId: string; deviceType: string };
}
