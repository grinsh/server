//ייבוא הספריה שיודעת להפעיל שאילתות על הדאטה בייס 
const mysql = require('mysql2');
const util = require("util");

//יצירת אובייקט חכם שמחובר לדאטה בייס הרצוי
const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "project",
    multipleStatements: true
});

//נשתמש בפונקציה promiseQuery כדי ליצור תחבריר ברור יותר לשאילתות
const promiseQuery = (sqlScript) => {
    return util.promisify(mysqlConnection.query).call(mysqlConnection, sqlScript);
}

module.exports = {mysqlConnection, promiseQuery}
