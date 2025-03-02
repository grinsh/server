const { promiseQuery } = require("../sql");

async function getordersongsQuery() {
    return await promiseQuery(`SELECT * FROM project.ordersongs`);
}

async function addordersongsQuery(ordersongs) {

    return await promiseQuery(`INSERT INTO ordersongs VALUES (0, ${ordersongs.idReshooma}, ${ordersongs.idSong} , ${ordersongs.idOrder});`)
}

async function updateordersongsQuery(ordersongs) {
    return await promiseQuery(`
                             UPDATE ordersongs
                             SET idReshooma=${ordersongs.idReshooma}, idSong=${ordersongs.idSong}, idOrder=${ordersongs.idOrder}
                             WHERE id = ${ordersongs.idReshooma};`);
}

async function deleteordersongsQuery(idordersongs) {
    return await promiseQuery(`DELETE 
                                FROM ordersongs 
                                 WHERE id = ${idordersongs};`);
}

module.exports = {getordersongsQuery,addordersongsQuery,updateordersongsQuery,deleteordersongsQuery}

