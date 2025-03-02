const { Router } = require("express"); //מייבאים בנאי לראוטר
const advertisingRouter = new Router();      //יוצרים מופע חדש

// //--------------קוד שיאפשר העלאת קבצים לשרת--------------
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/playbacks/');
    },
    filename: (req, file, cb) => {
        cb(null, 'playback-' + Date.now() + "-" + file.originalname);  //playback-78667454-hakolYaavor.mp3
    }
});

const upload = multer({ storage: storage });


//--------------קוד שיאפשר העלאת קבצים לשרת- סוף-------------


const { getAdvertisingQuery, addAdvertisingQuery, updateAdvertisingQuery, deleteAdvertisingQuery } = require("../queries/advertisingQuery");


//שליפת רשימת פרסומות
advertisingRouter.get("/getadvertising", async function (req, res) {
    try {
        console.log("getadvertising")
        const advertising = await getAdvertisingQuery();
        res.send(advertising);
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }

})
//הוספת פרסומת
advertisingRouter.post("/addadvertising", async function (req, res) {
const addadvertising = req.body;
console.log("addadvertising")
console.log(req.body.name)
    try {
        const result = await addAdvertisingQuery(addadvertising.name);
        res.send({ success: true, id: result.insertId });
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err)
    }

})
//אפשר לקבל את האי די כפרמטר אבל לא חובה כי אפשר לקבל אותו בתוך האובייקט לעדכון
// app.put("/products/:id", async function (req, res){}
advertisingRouter.put("/updateadvertising", async function (req, res) {
    // const id = req.params.id;
    const advertising = req.body;

    try {
        const result = await updateplaybackQuery(advertising);
        res.send(result);
    }
    catch (err) {
        res.send(err);
    }

})

//localhost:8000/products/2 - למחוק את מוצר מספר 2
advertisingRouter.delete("/deleteadvertising/:id", async function (req, res) {
    const id = req.params.id;
    console.log("delete id:")
console.log(id)
    try {
        const result = await deleteAdvertisingQuery(id);
        res.send(result);
    }
    catch (err) {
        res.send(err);
    }
})

module.exports = { advertisingRouter };