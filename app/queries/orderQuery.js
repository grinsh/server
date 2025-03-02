const { promiseQuery } = require("../sql");

async function getorderQuery() {
    return await promiseQuery("SELECT * FROM project.order");
}

async function addorderQuery(order) {

    return await promiseQuery(`INSERT INTO project.order VALUES (0, '${order.dateOrder}', ${order.idUser}, ${order.idPlayBack}, '${order.nameUser}', '${order.namePlayBack}');`)
}

async function updateorderQuery(order) {
    return await promiseQuery(`
                             UPDATE order
                             SET id='${order.idOrder}', dateOrder='${order.dateOrder}', id='${order.idUser}'}
                             WHERE id = ${order.idOrder};`);
}

async function deleteorderQuery(idorder) {
    return await promiseQuery(`DELETE 
                                FROM order 
                                 WHERE id = ${idorder};`);
}

module.exports = {getorderQuery,addorderQuery,updateorderQuery,deleteorderQuery}

