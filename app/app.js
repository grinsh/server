const express = require('express');
const bodyparser = require('body-parser');
const cors = require("cors");


//ייבוא של האובייקט שמחבר לדאטה בייס
const { mysqlConnection } = require("./sql");


//    ייבוא ראוטרים  
const { orderRouter } = require("./routers/orderRouter");    //1
const { ordersongsRouter } = require("./routers/ordersongsRouter");    //2
const { playbackRouter } = require("./routers/playbackRouter");    //3
const { singersRouter } = require("./routers/singersRouter");    //4
const { songsRouter } = require("./routers/songsRouter");    //5
const { userRouter } = require("./routers/userRouter");    //6
const { TakanonRouter } = require("./routers/TakanonRouter");    //7
//const {emailRouter} = require("./routers/emailRouter");    //8
const { advertisingRouter } = require("./routers/advertisingRouter"); 
const { tasksRouter } = require("./routers/tasksRouter"); 


const app = express();

app.use('/public', express.static('public'));//מאפשר לגשת לקבציי אודיו, תמונות וכדומה


app.use(bodyparser.json());
app.use(cors());


app.use("/order", orderRouter)  //אז תעבור לראוטר order אם בבקשה יש את המילה 
app.use("/ordersongs", ordersongsRouter)  //אז תעבור לראוטר ordersongs אם בבקשה יש את המילה 
app.use("/playback", playbackRouter)  //אז תעבור לראוטר playback אם בבקשה יש את המילה 
app.use("/singers", singersRouter)  //אז תעבור לראוטר singers אם בבקשה יש את המילה 
app.use("/songs", songsRouter)  //אז תעבור לראוטר songs אם בבקשה יש את המילה 
app.use("/User", userRouter)  //אז תעבור לראוטר user אם בבקשה יש את המילה 
app.use("/Takanon", TakanonRouter)  //אז תעבור לראוטר Takanon אם בבקשה יש את המילה 
app.use("/ordersongsRouter", ordersongsRouter)  //אז תעבור לראוטר ordersongsRouter אם בבקשה יש את המילה 
// app.use("/emailRouter", emailRouter)  //אז תעבור לראוטר emailRouter אם בבקשה יש את המילה 
app.use("/advertising", advertisingRouter)
app.use("/tasks", tasksRouter)


const port = 8000;

app.listen(port, function (err) {
    if (err) {
        console.log("Error while starting server");
    }
    else {
        console.log("Server has been started at " + port);
    }
})

mysqlConnection.connect((err) => {
    if (!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!', err);
});

app.get('/hello', function (req, res) {
    res.send("good bye");
})

const nodemailer = require('nodemailer');//יבוא ספרייה לשליחת מיילים
//יצירת אובייקט שבו מוגדר מאיזה מייל נשלחו ההודעות
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kolplay2024@gmail.com',
        pass: 's z s k l y y g u q y s v a j h'
    }
});




// const sendNewPasswrodToEmail = async (to) => {

//     //ליצור סיסמא חדשה
//     const newPassword = generateSafePassword();

//     // לשמור את הסיסמא החדשה למשתמש בדאטה בייס
//     const allUsers = await getUsersQuery();
//     console.log(allUsers);   
//     const user = allUsers.find(u => {console.log(u.email + " " + to);
//         return u.email == to
//     });
//     console.log("user", user);

//     user.password = newPassword;
//     console.log("update user", user);  

//     const result = await updateUsersQuery(user);   
//     console.log("result" ,result);

//     //ליצור נושא ותוכן הודעה
//     const subject = "בקשה לשיחזור סיסמא שהוצעה במערכת kol-play";
//     const text = "סיסמתך היא : " + newPassword + " מומלץ לך להחליפה בכניסתך למערכת";

//     //לשלוח ללקוח
//     sendEmail(to, subject, text);
// }

// function generateSafePassword() {
//     const length = 12;
//     const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-"; // Include special characters for added security
//     let password = "";

//     for (let i = 0; i < length; i++) {
//         const randomIndex = Math.floor(Math.random() * charset.length);
//         password += charset[randomIndex];
//     }

//     return password;
// }



// const sendEmail = (to, subject, text) => {

//     const mailOptions = {
//         from: 'naama3256@gmail.com',
//         to: to,
//         subject: subject,
//         text: text
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log(error);
//             res.send('Error');
//         } else {
//             console.log('Email sent: ' + info.response);
//             res.send('Email sent');
//         }
//     });
// }


//מכאן עשיתי עם המורה
//אובייקט שמגדיר מה הפרטים של המייל
//פונקצייה ששולחת סיסמה חדשה
app.get('/sendEmail', (req, res) => {
    const mailOptions = {
        from: 'kolplay2024@gmail.com',
        to: 'naama3256@gmail.com',
        subject: 'User password',
        text: 'The user password is: ???'
    };

    //פונקצייה שמופעלת אחרי שליחת המייל. תפקידה לבדוק האם היתה שגיאה או לא ולהגיב על כך
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent');
        }
    });
});
//נשלח למנהל האתר פרטי ההזמנה ונשלח ללקוח אישור קבלת הזמנה רק בהזמנה אישית ולא בהזמנה רגילה
app.post('/sendOrderEmail', (req, res) => {
    console.log(req.body)

    //שליחת מייל למנהל האתר
    const mailOptions = {
        from: 'kolplay2024@gmail.com',
        to: 'kolplay2024@gmail.com',
        subject: ' הזמנה אישית חדשה מאת ' + req.body.UserName,
        text: ' פרטי ההזמנה: ' + req.body.SongName + " " + req.body.SingerName
        // text: 'This is a test email sent from Node.js'
    };

    //פונקצייה שמופעלת אחרי שליחת המייל. תפקידה לבדוק האם היתה שגיאה או לא ולהגיב על כך
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent');
        }
    });
    //מייל שנשלח ללקוח ממנהל האתר לאישור קבלת הזמנה סוג של מייל אוטומטי
    const mailOptions2 = {
        from: 'kolplay2024@gmail.com',
        to: req.body.email,
        subject: ' שלום ' + req.body.UserName + " הזמנתך התקבלה במערכת kol play ",
        text: 'ניצור איתך קשר בהקדם ונשמח לראותך שוב'
    };

    transporter.sendMail(mailOptions2, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent');
        }
    });
})

app.post("/sendNewPlayBack", (req, res) => {

    const mailOptions2 = {
        from: 'kolplay2024@gmail.com',
        to: req.body.email,
        subject: ' שלום ' + req.body.UserName + " הזמנתך התקבלה במערכת kol play ",
        // text: ' מצורף קובץ הפלייבק ' + body.namePlayBack + ' ' + body.src
        html: `
        <div style="text-align: right;">
        <p>שלום,</p>
        <p>הנה קובץ השמע שהזמנת:</p>
        </div>
        <audio controls>
            <source src="cid:audio-file" type="audio/mpeg">
        </audio>`,
        
        attachments: [
            {
                filename: req.body.src, // שם הקובץ
                path: 'public/playbacks/FullPlayBack/' + req.body.src,  // הנתיב לקובץ
                cid: 'audio-file' // זהו ה-CID שהגדרת בגוף ההודעה
            }
        ]
    };

    transporter.sendMail(mailOptions2, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent');
        }
    });

})


//html שליחת מייל עם
// const sendHTMLEmail = (to, subject) => {
//     const mailOptions = {
//         from: 'kolplay2024@gmail.com',
//         to: to,
//         subject: subject,
//         html: `
//         <p style="color:Red">Hello, this is an HTML email with a link:</p>
//         <p><a href="http://localhost:3000/login" target="_blank" >Click here</a> to visit our website.</p>
//         `
//     };
//     console.log(mailOptions);

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log(error);
//             res.send('Error');
//         } else {
//             console.log('Email sent: ' + info.response);
//             res.send('Email sent');
//         }
//     });
// }
