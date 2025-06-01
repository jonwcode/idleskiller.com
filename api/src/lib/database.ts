import * as mysql from "mysql2";
import { ResultSetHeader } from "mysql2";
import verifyPassword from "@utils/password_verify";
import { resolve } from "path";
import { styleText } from "node:util";

type userType = {
	id?: number;
	email?: string;
	password?: string;
	f_name?: string;
	l_name?: string;
	failed_login_attempts?: number;
	createdAt?: number;
	updatedAt?: string;
};

class DB {
	pool: any;

	constructor() {
		this.pool = mysql
			.createPool({
				host: process.env.DB_HOST,
				user: process.env.DB_USER,
				password: process.env.DB_PASS,
				database: process.env.DB_NAME,
			})
			.promise();

		if (!this.pool) {
			throw new Error("Database connection failed");
		}
	}

	/**
	 * Executes a SQL query.
	 *
	 * @param {string} sql - The SQL query to execute.
	 * @param {Array} values - The values to be used in the query.
	 * @returns {Promise<Object>} - A promise that resolves to the result of the query.
	 */
	async query(sql: string, values) {
		const query = await this.pool.query(sql, values, (err, results) => {
			if (err) {
				console.error("Error executing query: ", err);
				return err;
			}
			resolve(results);
		});
		if (query[0].length === 0) {
			return {};
		}

		return query[0];
	}

	/**
	 * Retrieves a user by email or user ID.
	 *
	 * @param {string|number} identifier - The email address or user ID of the user.
	 * @returns {Promise<Object>} - A promise that resolves to the user object.
	 */
	async getUser(identifier: string | number): Promise<userType> {
		// The identifier can either be a string or a number,
		// a string we look up by email address, a number by user ID

		// if the identifier is a string, we look up by email address
		if (typeof identifier === "string") {
			const results = await this.pool.query("SELECT * FROM users WHERE username = ?", [
				identifier,
			]);

			if (results[0].length === 0) {
				console.error("User not found with the email address of: " + identifier);
				return {};
			} else {
				const user: userType = {};
				results[0].forEach((row: userType) => {
					Object.assign(user, row);
				});

				return user as userType;
			}
		}
		// If the identifier is a number, we look up by user ID
		else if (typeof identifier === "number") {
			const results = await this.pool.query("SELECT * FROM users WHERE player_id = ?", [
				identifier,
			]);

			if (results.length === 0) {
				console.error("User not found with the user ID of: " + identifier);
				return {};
			} else {
				const user = {};
				results[0].forEach((row: userType) => {
					Object.assign(user, row);
				});

				return user;
			}
		} else {
			return Promise.reject(
				new Error(
					"Invalid identifier: Must be type of string(username) or number(player_id)"
				)
			);
		}
	}

	/**
	 * Inserts a new record into the specified table.
	 *
	 * @param {string} table - The name of the table to insert into.
	 * @param {Object} values - An object representing the columns and their values.
	 * @returns {Promise<Object>} - A promise that resolves to the result of the query.
	 */

	async insert(
		table: string,
		values: object,
		insertCreatedAt = true
	): Promise<{
		affectedRows: number;
		success: boolean;
		message: string;
		insertId: number;
		numRows: number;
	}> {
		return new Promise(async (resolve, reject) => {
			const unixTimestamp = Math.floor(new Date().getTime() / 1000);

			insertCreatedAt
				? (values = { ...values, createdAt: unixTimestamp })
				: (values = { ...values });

			let sql = `INSERT INTO ${table} (`;
			const params: string[] = [];

			// Construct the columns and values
			Object.entries(values).forEach(([key, value], index) => {
				sql += `${key}`;
				if (index < Object.entries(values).length - 1) {
					sql += ", ";
				}
				params.push(value);
			});

			sql += ") VALUES (";
			params.forEach((_, index) => {
				sql += "?";
				if (index < params.length - 1) {
					sql += ", ";
				}
			});
			sql += ")";

			// Execute the query

			const [ResultSetHeader] = await this.pool.query(sql, params);

			const { affectedRows, info, insertId, fieldCount: numRows } = ResultSetHeader;

			if (affectedRows === 0) {
				resolve({ affectedRows, success: false, message: info, insertId, numRows });
			} else {
				resolve({ affectedRows, success: true, message: info, insertId, numRows });
			}
		});
	}
	/**
	 * Updates records in the specified table.
	 *
	 * @param {string} table - The name of the table to update.
	 * @param {Object} values - An object representing the columns and their new values.
	 * @param {Object} where - An object representing the conditions for the WHERE clause.
	 * @param {boolean} insertUpdatedAt - A timestamp of the time when it was updated.
	 * @param {boolean} debug - Console.logs the final SQL string for debugging
	 * @returns {Promise<Object>} - A promise that resolves to the result of the query.
	 */
	async update(
		table: string,
		values: object,
		where: object,
		insertUpdatedAt = true,
		debug: boolean = false
	): Promise<object | void> {
		return new Promise(async (resolve, reject) => {
			const unixTimestamp = Math.floor(new Date().getTime() / 1000);

			insertUpdatedAt
				? (values = { ...values, updatedAt: unixTimestamp })
				: (values = { ...values });

			let sql = `UPDATE ${table} SET `;
			const params: string[] = [];

			// Construct the SET clause
			Object.entries(values).forEach(([key, value], index) => {
				sql += `${key} = ?`;
				if (index < Object.entries(values).length - 1) {
					sql += ", ";
				}
				params.push(value);
			});

			// Construct the WHERE clause
			sql += " WHERE ";
			Object.entries(where).forEach(([key, condition], index) => {
				let operator = "=";
				let value;

				if (Array.isArray(condition)) {
					[operator, value] = condition;
				} else {
					value = condition;
				}

				sql += `${key} ${operator} ?`;
				if (index < Object.entries(where).length - 1) {
					sql += " AND ";
				}
				params.push(value);
			});

			// Execute the query

			const [ResultSetHeader] = await this.pool.query(sql, params);

			const { affectedRows, info } = ResultSetHeader;

			if (debug) {
				console.log("\n\n\n\n", styleText("yellow", sql), "\n\n\n\n");
				console.log("----------------------- Params -----------------------");
				console.log("\n");
				console.log(params);
				console.log("\n");
				console.log("----------------------Effected Rows-------------------");
				console.log(affectedRows);
				console.log("\n\n\n\n\n\n");
			}

			if (affectedRows === 0) {
				resolve({ success: false, message: info });
			} else {
				resolve({ success: true, message: info });
			}
		});
	}

	/**
	 * Closes the database connection pool.
	 *
	 * @returns {Promise<void>} - A promise that resolves when the pool is closed.
	 */

	async createLoginRecord(userID: number) {
		return new Promise(async (resolve, reject) => {});
	}

	async close() {
		return new Promise((resolve, reject) => {
			this.pool.end((err: mysql.QueryError) => {
				if (err) {
					return reject(err);
				}
				resolve(true);
			});
		});
	}
} // End of class

export default DB;
