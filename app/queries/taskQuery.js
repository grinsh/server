const { promiseQuery } = require("../sql");

async function getTasksQuery() {
    return await promiseQuery("SELECT * FROM project.tasks;");
}

async function addTaskQuery(task) {
    console.log("adddddddddddddddddd")
    let date=String(task.date);
    console.log(date)
    // return await promiseQuery(`INSERT INTO project.tasks (name,date,iduser,type) VALUES ('e', '2000-10-01', '1', 'ww');`)
    return await promiseQuery(`INSERT INTO project.tasks (content,date,iduser,type) VALUES ('${task.content}','${date}',${task.iduser},'${task.type}');`)
}


module.exports = {getTasksQuery,addTaskQuery}

