export type severityTypes = "info" | "trace" | "warning" | "alert" | "hackAttempt";

// Define message types
export type LogMessages =
	| "Login"
	| "LoggedOut"
	| "NewAccountCreated"
	| "PasswordChanged"
	| "FailedLoginAttempt"
	| "HackAttempt"
	| "UnauthorizedAction"
	| "500OrPageError";

export type detailsType = {
	details: string;
};
