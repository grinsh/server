const { Router } = require("express"); //מייבאים בנאי לראוטר
const tasksRouter = new Router();      //יוצרים מופע חדש

const { getTasksQuery, addTaskQuery } = require("../queries/taskQuery");


//שליפת רשימת פרסומות
tasksRouter.get("/gettasks", async function (req, res) {
    try {
        console.log("tasks")
        const tasks = await getTasksQuery();
        console.log(tasks)
        res.send(tasks);
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }

})
//הוספת פרסומת
tasksRouter.post("/addtask", async function (req, res) {
const task = req.body;
console.log("task")
console.log(req.body)
    try {
        const result = await addTaskQuery(task);
        res.send({ success: true, id: result.idtasks });
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err)
    }

})

module.exports = { tasksRouter };