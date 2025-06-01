import * as mysql from "mysql2";
class DB {
    pool;
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
    // async query(sql, values) {
    //    const query = await this.pool.query(sql, values, (err, results) => {
    //       if (err) {
    //         return reject(err);
    //       }
    //       resolve(results);
    //     });
    //     return query;
    // }
    /**
     * Retrieves a user by email or user ID.
     *
     * @param {string|number} identifier - The email address or user ID of the user.
     * @returns {Promise<Object>} - A promise that resolves to the user object.
     */
    async getUser(identifier) {
        // The identifier can either be a string or a number,
        // a string we look up by email address, a number by user ID
        // if the identifier is a string, we look up by email address
        if (typeof identifier === "string") {
            const results = await this.pool.query("SELECT * FROM users WHERE email = ?", [identifier]);
            if (results[0].length === 0) {
                console.error("User not found with the email address of: " + identifier);
                return {};
            }
            else {
                const user = {};
                results[0].forEach((row) => {
                    Object.assign(user, row);
                });
                return user;
            }
        }
        // If the identifier is a number, we look up by user ID
        else if (typeof identifier === "number") {
            const results = await this.pool.query("SELECT * FROM users WHERE id = ?", [identifier]);
            if (results.length === 0) {
                console.error("User not found with the user ID of: " + identifier);
                return {};
            }
            else {
                const user = {};
                results[0].forEach((row) => {
                    Object.assign(user, row);
                });
                return user;
            }
        }
        else {
            return Promise.reject(new Error("Invalid identifier: Must be type of string(email) or number(user_id)"));
        }
    }
    /**
     * Updates records in the specified table.
     *
     * @param {string} table - The name of the table to update.
     * @param {Object} values - An object representing the columns and their new values.
     * @param {Object} where - An object representing the conditions for the WHERE clause.
     * @returns {Promise<Object>} - A promise that resolves to the result of the query.
     */
    async update(table, values, where) {
        return new Promise(async (resolve, reject) => {
            let sql = `UPDATE ${table} SET `;
            const params = [];
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
                }
                else {
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
            if (affectedRows === 0) {
                resolve({ success: false, message: info });
            }
            else {
                resolve({ success: true, message: info });
            }
        });
    }
    /**
     * Closes the database connection pool.
     *
     * @returns {Promise<void>} - A promise that resolves when the pool is closed.
     */
    async createLoginRecord(userID) {
        return new Promise(async (resolve, reject) => { });
    }
    async close() {
        return new Promise((resolve, reject) => {
            this.pool.end((err) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            });
        });
    }
} // End of class
export default DB;
//# sourceMappingURL=database.js.map