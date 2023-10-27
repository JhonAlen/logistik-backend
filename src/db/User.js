import sql from "mssql";

const sqlConfig = {
    user: process.env.USER_BD,
    password: process.env.PASSWORD_BD,
    server: process.env.SERVER_BD,
    database: process.env.NAME_BD,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

const verifyIfUsernameExists = async (xlogin) => {
    try {
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request()
            .input('xlogin', sql.NVarChar, xlogin)
            .query('select cusuario, xnombre, xlogin from seusuarios where xlogin = @xlogin')
        return { 
            result: result 
        };
    }
    catch (error) {
        return { error: error.message }
    }
}

const verifyIfPasswordMatchs = async (xlogin, xclave) => {
    try {
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request()
            .input('xlogin', sql.NVarChar, xlogin)
            .input('xclave', sql.NVarChar, xclave)
            .query('select cusuario from seusuarios where xlogin = @xlogin and xcontrasena = @xclave')
        return { result: result };
    }
    catch (error) {
        return { error: error.message };
    }
}

const getOneUser = async (xlogin) => {
    try {
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request()
           .input('xlogin', sql.NVarChar, xlogin)
           .query('select * from seusuarios where xlogin = @xlogin')
        if (result.rowsAffected < 1) {
            return false;
        }
        return result.recordset[0];
    }
    catch (error) {
        return { error: error.message };
    }
}

export default {
    verifyIfUsernameExists,
    verifyIfPasswordMatchs,
    getOneUser
}