const express = require("express");
var cors = require("cors");
const app = express();

app.use(cors());

app.get("/", function (req, res) {
  res.send("Helo World");
});
app.get("/dog", function (req, res) {
  res.send({ sound: "멍멍" });
});
app.get("/cat", function (req, res) {
  res.send("고양이");
});

app.listen(3000);

const XLSX = require("xlsx");
const fs = require("fs");
const workbook = XLSX.readFile("xlsx/data.xlsx");

let worksheet = workbook.Sheets[workbook.SheetNames[0]];
data = [
  { id: "512", name: "son" },
  { id: "256", name: "lee" },
  { id: "123", name: "kmm" },
];
for (let num = 0; num < data.length; num++) {
  worksheet[`I${num + 7}`] = { v: data[num].id };
  worksheet[`J${num + 7}`] = { v: data[num].name };
}
const modifiedData = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
fs.writeFileSync("xlsx/data.xlsx", modifiedData);
