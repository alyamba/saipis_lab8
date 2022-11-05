const express = require("express")
const csv = require("csv-parser");
const fs = require('fs');

const { DATA_DB_PATH, formatNumbersInArray, sortNumbersInArray } = require("./utils");

const router = express.Router()

router.get('/', (_req, res) => {
  try {
    let result;
    fs.createReadStream(DATA_DB_PATH)
      .pipe(csv())
      .on("data", (data) => result = data)
      .on("end", () => {
        const formattedData = JSON.parse(result.mainArray)
        res.status(200).json({ status: "SUCCESS", res: formattedData });
      });
  } catch (error) {
    res.status(500).json({ error: { key: "server_error" } });
  }
});

router.get('/getFormattedArray', (req, res) => {
  try {
    const { digitsAfterDot } = req.query

    let result;
    fs.createReadStream(DATA_DB_PATH)
      .pipe(csv())
      .on("data", (data) => result = data)
      .on("end", () => {
        const formattedData = formatNumbersInArray(JSON.parse(result.mainArray), digitsAfterDot)
        res.status(200).json({ status: "SUCCESS", res: formattedData });
      });
  } catch (error) {
    res.status(500).json({ error: { key: "server_error" } });
  }
});

router.get('/getSortingArray', (req, res) => {
  try {
    const { sorting, digitsAfterDot } = req.query

    let result;
    fs.createReadStream(DATA_DB_PATH)
    .pipe(csv())
    .on("data", (data) => result = data)
    .on("end", () => {
      const formattedData = sortNumbersInArray(
        formatNumbersInArray(JSON.parse(result.mainArray), digitsAfterDot),
        sorting
      )
      res.status(200).json({ status: "SUCCESS", res: formattedData });
    });
  } catch (error) {
    res.status(500).json({ error: { key: "server_error" } });
  }

})

module.exports = router