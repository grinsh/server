const { Router } = require("express"); //מייבאים בנאי לראוטר
const songsRouter = new Router();      //יוצרים מופע חדש

//--------------קוד שיאפשר העלאת שירים לשרת--------------
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/songs/');
    },
    filename: (req, file, cb) => {
        cb(null, 'songs-' + Date.now() + "-" + file.originalname);  //playback-78667454-hakolYaavor.mp3
    }
});

const upload = multer({ storage: storage });

//--------------קוד שיאפשר העלאת שירים לשרת- סוף-------------

const { getsongsQuery, addsongsQuery, updatesongsQuery, deletesongsQuery } = require("../queries/songsQuery");

//שליפת רשימת השירים
songsRouter.get("/getsongs", async function (req, res) {
    try {
        const songs = await getsongsQuery();
        res.send(songs);
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }

})

songsRouter.post("/addSongs", upload.single('file'), async function (req, res) {
    const songs = req.body;
    songs.src = req.file.filename;
    console.log(songs);
    try {
        const result = await addsongsQuery(songs);
        res.send({ success: true, id: result.insertId });
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err)
    }

})
//אפשר לקבל את האי די כפרמטר אבל לא חובה כי אפשר לקבל אותו בתוך האובייקט לעדכון
// app.put("/products/:id", async function (req, res){}
songsRouter.put("/songs", async function (req, res) {
    // const id = req.params.id;
    const songs = req.body;

    try {
        const result = await updatesongsQuery(songs);
        res.send(result);
    }
    catch (err) {
        res.send(err);
    }

})

//localhost:8000/products/2 - למחוק את מוצר מספר 2
songsRouter.delete("/songs/:idSong", async function (req, res) {
    const id = req.params.id;

    try {
        const result = await deletesongsQuery(id);
        res.send(result);
    }
    catch (err) {
        res.send(err);
    }
})


//////////////////////////////////


//////////////////////////////////

module.exports = { songsRouter };


