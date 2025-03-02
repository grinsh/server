const { promiseQuery } = require("../sql");

async function getAdvertisingQuery() {
    console.log("getAdvertisingQuery")
    return await promiseQuery("SELECT * FROM project.advertising");
}

async function addAdvertisingQuery(name) {
    console.log("addadvertisinggggggggggggggggggggg")
    return await promiseQuery(`INSERT INTO project.advertising VALUES (0, '${name}');`)
}

async function updateAdvertisingQuery(id) {
    return await promiseQuery(`
    UPDATE project.advertising SET name = 'misinayba.mp3' WHERE idadvertising =${id};`);
}

async function deleteAdvertisingQuery(id) {
    return await promiseQuery(`DELETE 
                                FROM project.advertising 
                                 WHERE idadvertising = ${id};`);
}

module.exports = {getAdvertisingQuery,addAdvertisingQuery,updateAdvertisingQuery,deleteAdvertisingQuery}

