const { promiseQuery } = require("../sql");

async function getuserQuery() {
    return await promiseQuery("SELECT * FROM user");
}

async function adduserQuery(user) {

    return await promiseQuery(`INSERT INTO user VALUES (0, '${user.name}',
                                                        '', '${user.email}',
                                                        '${user.password}',
                                                        '', 2);`)
}

async function updateuserQuery(user) {
    return await promiseQuery(`
                             UPDATE user
                             SET id=${user.id}, name='${user.name}',
                             tz='${user.tz}', email='${user.email}',
                             password='${user.password}',
                             phone='${user.phone}', status='${user.status}'
                             WHERE id = ${user.id};`);//בשתי השורות idהאם לשים את ה
}

async function deleteuserQuery(iduser) {
    return await promiseQuery(`DELETE 
                                FROM user 
                                 WHERE id = ${iduser};`);
}

module.exports = {getuserQuery,adduserQuery,updateuserQuery,deleteuserQuery}