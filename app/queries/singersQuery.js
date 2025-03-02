const { promiseQuery } = require("../sql");

async function getsingersQuery() {
    return await promiseQuery("SELECT * FROM singers");
}

async function addsingersQuery(singers) {

    return await promiseQuery(`INSERT INTO singers(nameSinger, src) VALUES ('${singers.nameSinger}', '${singers.src}');`)
}

async function updatesingersQuery(singers) {
    return await promiseQuery(`
                             UPDATE singers
                             SET nameSinger='${singers.nameSinger}'
                             WHERE idSinger = ${singers.idSinger};`);//בשתי השורות idהאם לשים את ה
}

async function deletesingersQuery(singers) {
    return await promiseQuery(`DELETE 
                                FROM singers 
                                 WHERE id = ${singers};`);
}

module.exports = {getsingersQuery,addsingersQuery,updatesingersQuery,deletesingersQuery}

