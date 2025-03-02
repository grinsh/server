const { Router } = require("express"); //מייבאים בנאי לראוטר
const playbackRouter = new Router();      //יוצרים מופע חדש

//--------------קוד שיאפשר העלאת קבצים לשרת--------------
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


const { getplaybackQuery, addplaybackQuery, updateplaybackQuery, deleteplaybackQuery } = require("../queries/playbackQuery");


//שליפת רשימת הפלייבקים
playbackRouter.get("/getplayback", async function (req, res) {
    try {
        const playback = await getplaybackQuery();
        res.send(playback);
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }

})

playbackRouter.post("/AddPlayback", upload.single('file'), async function (req, res) {
//שגיאה התרחשה
    console.log(req.body);
    const playback = req.body;    

    //src לשם שנתנו לקובץ השמע בתיקיה files-כאן נצטרך לשנות את ה
    playback.srcExample = req.file.filename;
    console.log(playback);

    try {
        const result = await addplaybackQuery(playback);
        res.send({ success: true, id: result.insertId });
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err)
    }

})
//אפשר לקבל את האי די כפרמטר אבל לא חובה כי אפשר לקבל אותו בתוך האובייקט לעדכון
// app.put("/products/:id", async function (req, res){}
playbackRouter.put("/playback", async function (req, res) {
    // const id = req.params.id;
    const playback = req.body;

    try {
        const result = await updateplaybackQuery(playback);
        res.send(result);
    }
    catch (err) {
        res.send(err);
    }

})

//localhost:8000/products/2 - למחוק את מוצר מספר 2
playbackRouter.delete("/playback/:id", async function (req, res) {
    const id = req.params.id;

    try {
        const result = await deleteplaybackQuery(id);
        res.send(result);
    }
    catch (err) {
        res.send(err);
    }
})

module.exports = { playbackRouter };