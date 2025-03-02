const { Router } = require("express"); //מייבאים בנאי לראוטר
const singersRouter = new Router();      //יוצרים מופע חדש

//--------------קוד שיאפשר העלאת זמרים לשרת--------------
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/singers/');
    },
    filename: (req, file, cb) => {
        cb(null, 'singers-' + Date.now() + "-" + file.originalname);  //playback-78667454-hakolYaavor.mp3
    }
});

const upload = multer({ storage: storage });

//--------------קוד שיאפשר העלאת זמרים לשרת- סוף-------------

const { getsingersQuery, addsingersQuery, updatesingersQuery, deletesingersQuery } = require("../queries/singersQuery");


//שליפת רשימת הזמרים
singersRouter.get("/getsingers", async function (req, res) {
    try {
        const singers = await getsingersQuery();
        res.send(singers);
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }

})

singersRouter.post("/addSingers", upload.single('file'), async function (req, res) {
    const singers = req.body;
    singers.src= req.file.filename;

    console.log(singers);
    try {
        const result = await addsingersQuery(singers);
        res.send({ success: true, id: result.insertId });
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err)
    }

})
//אפשר לקבל את האי די כפרמטר אבל לא חובה כי אפשר לקבל אותו בתוך האובייקט לעדכון
// app.put("/products/:id", async function (req, res){}
singersRouter.put("/singers", async function (req, res) {
    // const id = req.params.id;
    const singers = req.body;

    try {
        const result = await updatesingersQuery(singers);
        res.send(result);
    }
    catch (err) {
        res.send(err);
    }

})

//localhost:8000/products/2 - למחוק את מוצר מספר 2
singersRouter.delete("/singers/:id", async function (req, res) {
    const id = req.params.id;

    try {
        const result = await deletesingersQuery(id);
        res.send(result);
    }
    catch (err) {
        res.send(err);
    }
})

module.exports = { singersRouter };


