const { Router } = require("express"); //מייבאים בנאי לראוטר
// const { getUserObj, updateUserObj } = require("../json/dbJSON");
const userRouter = new Router();      //יוצרים מופע חדש

const nodemailer = require('nodemailer');//יבוא ספרייה לשליחת מיילים
//יצירת אובייקט שבו מוגדר מאיזה מייל נשלחו ההודעות
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kolplay2024@gmail.com',
        pass: 's z s k l y y g u q y s v a j h'
    }
});

const { getuserQuery, adduserQuery, updateuserQuery, deleteuserQuery } = require("../queries/userQuery");


//שליפת רשימת המשתמשים
userRouter.get("/getuser", async function (req, res) {
    try {
        const user = await getuserQuery();
        res.send(user);
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }

})

userRouter.post("/addUser", async function (req, res) {
    const user = req.body;
    user.password = generateSafePassword()
    console.log(user);
    try {
        const result = await adduserQuery(user);

        //עכשיו רוצים לשלוח ללקוח מייל ורק אז להחזיר תגובה לריאקט
        // כל הטקסט בשורה אחת
        // const mailOptions = {
        //     from: 'kolplay2024@gmail.com',
        //     to: user.email,
        //     subject: 'מזל טוב! הינך חבר באתר kol-play',
        //     // subject: 'קיבלת סיסמה חדשה עבור אתר kol-play',
        //     // text: 'סיסמתך היא: ' + user.password
        //     text: 'שם משתמש: ' + user.name,
        //         'מספר זהות: ' + user.tz,
        //         'הסיסמה שלך: ' + user.password,
        //         'עליך לשמור את הסיסמה.',
        //         'תצטרך להקיש סיסמה בכל כניסה לאתר.',
        //         'הינך מסכים לתנאי תקנון האתר.'
        // };

    //html טקסט 
    const mailOptions = {
        from: 'kolplay2024@gmail.com',
        to: user.email,
        subject: 'מזל טוב! הינך חבר באתר kol-play',
        html: `
            <div style="text-align: right;">
                <p>שם משתמש: ${user.name}</p>
                <p>מספר זהות: ${user.tz}</p>
                <p>הסיסמה שלך: ${user.password}</p>
                <p>עליך לשמור את הסיסמה.</p>
                <p>תצטרך להקיש סיסמה בכל כניסה לאתר.</p>
                <p>הינך מסכים לתנאי תקנון האתר.</p>
            </div>
        `
    };    

        //פונקצייה שמופעלת אחרי שליחת המייל. תפקידה לבדוק האם היתה שגיאה או לא ולהגיב על כך
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.send({ success: true, id: result.insertId });
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err)
    }

})
//אפשר לקבל את האי די כפרמטר אבל לא חובה כי אפשר לקבל אותו בתוך האובייקט לעדכון
// app.put("/products/:id", async function (req, res){}
userRouter.put("/user", async function (req, res) {
    // const id = req.params.id;
    const user = req.body;

    try {
        const result = await updateuserQuery(user);
        res.send(result);
    }
    catch (err) {
        res.send(err);
    }

})

//localhost:8000/products/2 - למחוק את מוצר מספר 2
userRouter.delete("/user/:id", async function (req, res) {
    const id = req.params.id;

    try {
        const result = await deleteuserQuery(id);
        res.send(result);
    }
    catch (err) {
        res.send(err);
    }
})

userRouter.post("/login", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const users = await getuserQuery(); //מביאים את הרשימה של המשתמשים
    const currentUser = users.find(u => u.email == email && u.password == password);  //מחפשים משתמש מתאים לפרטים

    if (currentUser == undefined)
        res.send({ success: false, user: null });
    else
        res.send({ success: true, user: currentUser })

})

module.exports = { userRouter };

function generateSafePassword() {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-"; // Include special characters for added security
    let password = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    return password;
}