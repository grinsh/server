const { promiseQuery } = require("../sql");

async function getsongsQuery() {
    return await promiseQuery("SELECT * FROM songs");
}

async function addsongsQuery(songs) {

    // return await promiseQuery(`INSERT INTO songs VALUES (0, ${songs.idSinger}, '${songs.nameSinger}', '${songs.lengthSongOrginal}');`)
    return await promiseQuery(`INSERT INTO songs VALUES (0, '${songs.nameSong}', '${songs.lengthSongOrginal}', '${songs.nameSinger}', '${songs.src}');`)

}

async function updatesongsQuery(songs) {
    //UPDATE `sweet_style`.`sweets` SET `kosher` = 'milky' WHERE `code` = 73; -- מבנה של עדכון לעזר
    return await promiseQuery(`
        UPDATE project.songs
        SET src='${songs.src}'
        WHERE id = ${songs.idSong};`);//בשתי השורות idהאם לשים את ה
    // return await promiseQuery(`
    //                          UPDATE songs
    //                          SET idSingers=${songs.idSongs}, nameSong='${songs.nameSong}', lengthSongOrginal='${songs.lengthSongOrginal}'
    //                          WHERE id = ${songs.idSongs};`);//בשתי השורות idהאם לשים את ה
}

async function deletesongsQuery(idsongs) {
    return await promiseQuery(`DELETE 
                                FROM project.songs 
                                 WHERE idSong = ${idsongs.idSong};`);
}

module.exports = {getsongsQuery,addsongsQuery,updatesongsQuery,deletesongsQuery}

