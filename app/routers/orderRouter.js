const {Router}  = require("express"); //מייבאים בנאי לראוטר
const orderRouter = new Router();      //יוצרים מופע חדש


const {getorderQuery, addorderQuery, updateorderQuery, deleteorderQuery} = require("../queries/orderQuery");


//שליפת רשימת המוצרים
orderRouter.get("/getorder", async function (req, res) {
    try {
        const order = await getorderQuery();
        res.send(order);
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }

})

orderRouter.post("/addOrder", async function (req, res) {
    const order = req.body;

    console.log(order);
    try {
        const result = await addorderQuery(order);
        res.send({ success: true, id: result.insertId });
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err)
    }

})
//אפשר לקבל את האי די כפרמטר אבל לא חובה כי אפשר לקבל אותו בתוך האובייקט לעדכון
// app.put("/products/:id", async function (req, res){}
orderRouter.put("/order", async function (req, res) {
    // const id = req.params.id;
    const order = req.body;

    try{
        const result = await updateorderQuery(order);
        res.send(result);
    }
    catch(err){
        res.send(err);
    }

})

//localhost:8000/products/2 - למחוק את מוצר מספר 2
orderRouter.delete("/order/:id", async function(req,res){
    const id = req.params.id;

    try{
        const result=  await deleteorderQuery(id);
    res.send(result);   
    }
    catch(err){
        res.send(err);
    }
})

module.exports = {orderRouter};


