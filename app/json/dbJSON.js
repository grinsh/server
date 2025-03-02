const fs = require("fs");
const { promisify } = require("util");

const PATH = './app/json/TakanonConfig.json';

const asyncReadFile = promisify(fs.readFile);   //  const text = await asyncReadFile('path')  // fs.readFile( PATH, function (content){  console.log(content);}  )
const asyncWriteFile = promisify(fs.writeFile);   //  const text = await asyncReadFile('path')


async function getTakanonObj() {
    const TakanonDataJSON = await asyncReadFile(PATH);  //הפעלת הקריאה מהקובץ - מחזיר מחרוזת של ג'ייסון
    const TakanonObj = JSON.parse(TakanonDataJSON);         //הפיכת המחרוזת של הג'ייבון לאובייקט שאפשר לעבוד איתו בג'אווה סקריפט
    console.log(TakanonObj);
    return TakanonObj;
}

async function updateTakanonObj(obj) {

    const stringObj = JSON.stringify(obj);  //ממרים את האובייקט של האודות למחרוזת של ג'ייסון
    await asyncWriteFile(PATH,stringObj);   //כותבים את הגי'סון החדש לתוך הקובץ וכך הוא נשמר
    console.log("write new text to file");

}

module.exports = {getTakanonObj, updateTakanonObj};

