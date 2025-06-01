export type errObjType = { err: null | boolean; msg: string };
export type errObj = {
	username: errObjType;
	password: errObjType;
	email: errObjType;
	avatar: errObjType;
};
