// const fs = require("fs");
// const { promisify } = require("util");

// const PATH = './app/json/UserConfig.json';

// const asyncReadFile = promisify(fs.readFile);   //  const text = await asyncReadFile('path')  // fs.readFile( PATH, function (content){  console.log(content);}  )
// const asyncWriteFile = promisify(fs.writeFile);   //  const text = await asyncReadFile('path')


// async function getUserObj() {
//     const UserDataJSON = await asyncReadFile(PATH);  //הפעלת הקריאה מהקובץ - מחזיר מחרוזת של ג'ייסון
//     const UserObj = JSON.parse(UserDataJSON);         //הפיכת המחרוזת של הג'ייבון לאובייקט שאפשר לעבוד איתו בג'אווה סקריפט
//     console.log(UserObj);
//     return UserObj;
// }

// async function updateUserObj(obj) {

//     const stringObj = JSON.stringify(obj);  //ממרים את האובייקט של האודות למחרוזת של ג'ייסון
//     await asyncWriteFile(PATH,stringObj);   //כותבים את הגי'סון החדש לתוך הקובץ וכך הוא נשמר
//     console.log("write new text to file");

// }

// module.exports = {getUserObj, updateUserObj};

