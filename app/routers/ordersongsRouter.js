const {Router}  = require("express"); //מייבאים בנאי לראוטר
const ordersongsRouter = new Router();      //יוצרים מופע חדש


const {getordersongsQuery, addordersongsQuery, updateordersongsQuery, deleteordersongsQuery} = require("../queries/ordersongsQuery");


//שליפת רשימת המוצרים
ordersongsRouter.get("/getordersongs", async function (req, res) {
    try {
        const ordersongs = await getordersongsQuery();
        res.send(ordersongs);
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }

})

ordersongsRouter.post("/addOrdersongs", async function (req, res) {
    const ordersongs = req.body;

    console.log(ordersongs);
    try {
        const result = await addordersongsQuery(order);
        res.send({ success: true, id: result.insertId });
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err)
    }

})
//אפשר לקבל את האי די כפרמטר אבל לא חובה כי אפשר לקבל אותו בתוך האובייקט לעדכון
// app.put("/products/:id", async function (req, res){}
ordersongsRouter.put("/ordersongs", async function (req, res) {
    // const id = req.params.id;
    const ordersongs = req.body;

    try{
        const result = await updateordersongsQuery(ordersongs);
        res.send(result);
    }
    catch(err){
        res.send(err);
    }

})

//localhost:8000/products/2 - למחוק את מוצר מספר 2
ordersongsRouter.delete("/ordersongs/:id", async function(req,res){
    const id = req.params.id;

    try{
        const result=  await deleteordersongsQuery(id);
    res.send(result);   
    }
    catch(err){
        res.send(err);
    }
})

module.exports = {ordersongsRouter};