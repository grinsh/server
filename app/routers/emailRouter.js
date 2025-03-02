//מייבאים בנאי לראוטר
const { Router } = require("express");

const { sendNewPasswrodToEmail, testSendEmail, sendHTMLEmail} = require("../actions/emailActions");

//יוצרת מופע
const emailRouter = new Router();


//body = {to, subject, text}
emailRouter.post("/sendNewPasswrodToEmail", async (req, res) => {

    const { email } = req.body;
    try {
        const result = await sendNewPasswrodToEmail(email);
        // await testSendEmail()
        res.send(result);
    }
    catch(err){
        res.status(500).send(err);
    }
})

//html שליחת מייל עם 
emailRouter.get("/sendHTMLEmail", async (req, res) => {

    // const { email } = req.body;
    try {
        const result = await sendHTMLEmail("נעמה שריר החמודה");
        // await testSendEmail()
        res.send(result);
    }
    catch(err){
        res.status(500).send(err);
    }
})

module.exports = { emailRouter };

