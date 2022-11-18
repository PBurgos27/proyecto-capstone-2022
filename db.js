import { createPool } from "mysql2/promise";

export const pool = createPool({
    host: 'ns52.hostgator.mx',
    port: 3306,
    user: 'geotekhp_user_capstone',
    password: 'user_capstone',
    database: 'geotekhp_db_proyec_final',
})