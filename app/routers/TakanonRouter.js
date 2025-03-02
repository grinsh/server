const { Router } = require("express");
const { getTakanonObj, updateTakanonObj } = require("../json/dbJSON");
const TakanonRouter = new Router();


TakanonRouter.get("/getTakanon", async function (req, res) {
    try {
        const Takanon = await getTakanonObj();
        res.send(Takanon);
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
})

TakanonRouter.put("/updateTakanon", async function (req, res) {
    const Takanon = req.body;
    try {
        await updateTakanonObj(Takanon);
        res.send({ success: true });
    }
    catch (err) {
        res.send(err)
    }
})

module.exports = { TakanonRouter };