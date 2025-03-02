
const { getUsersQuery, updateUsersQuery } = require("../queries/usersQuery")

const nodemailer = require('nodemailer');  //יבוא הספריה שיודעת לשלוח אימייליים

//יצירת אובייקט שבתוכו מוגדר מי האימייל ששולח את ההודעות
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kolplay2024@gmail.com',
        // pass: 'nzya brao ekrq jjmk'
        pass: 's z s k l y y g u q y s v a j h'
    }
});

const testSendEmail = () => {
    sendEmail("naama3256@gmail.com", "try email sender", "success");
}



const sendNewPasswrodToEmail = async (to) => {

    //ליצור סיסמא חדשה
    const newPassword = generateSafePassword();

    // לשמור את הסיסמא החדשה למשתמש בדאטה בייס
    const allUsers = await getUsersQuery();
    console.log(allUsers);   
    const user = allUsers.find(u => {console.log(u.email + " " + to);
        return u.email == to
    });
    console.log("user", user);

    user.password = newPassword;
    console.log("update user", user);  

    const result = await updateUsersQuery(user);   
    console.log("result" ,result);

    //ליצור נושא ותוכן הודעה
    const subject = "בקשה לשיחזור סיסמא שהוצעה במערכת kol-play";
    const text = "סיסמתך היא : " + newPassword + " מומלץ לך להחליפה בכניסתך למערכת";

    //לשלוח ללקוח
    sendEmail(to, subject, text);
}

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


const sendEmail = (to, subject, text) => {

    const mailOptions = {
        from: 'naama3256@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent');
        }
    });
}


module.exports = { sendNewPasswrodToEmail, sendHTMLEmail }
