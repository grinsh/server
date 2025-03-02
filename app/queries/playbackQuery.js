const { promiseQuery } = require("../sql");

async function getplaybackQuery() {
    return await promiseQuery("SELECT * FROM playback");
}

async function addplaybackQuery(playback) {
    return await promiseQuery(`INSERT INTO playback VALUES (0, '${playback.namePlayBack}', '' , 1  , '${playback.lengthPlayBack}', ${playback.price},  1,  0, '${playback.nameSinger}', '${playback.src}');`)
}

async function updateplaybackQuery(playback) {
    return await promiseQuery(`
                             UPDATE playback
                             SET name='${playback.nameplayback}', namesong='${playback.nameSong}', idsinger=${playback.idSinger}, lengthPlayBack=${playback.lengthPlayBack}, price=${playback.price}, idSongOrginal=${playback.idSongOrginal}, numOfListens=${playback.numOfListens}
                             WHERE id = ${playback.idplayback};`);
}

async function deleteplaybackQuery(idplayback) {
    return await promiseQuery(`DELETE 
                                FROM playback 
                                 WHERE id = ${idplayback};`);
}

module.exports = {getplaybackQuery,addplaybackQuery,updateplaybackQuery,deleteplaybackQuery}

