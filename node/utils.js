const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");

const DATA_DB_PATH = "./db/data.csv";
const DATA_DB_PATH1 = "./db/data1.csv";
const DATA_DB_PATH2 = "./db/data2.csv";

const getFilledArray = () => {
  let array = [[], [], [], [], [], [], [], [], [], []];

  for (let j = 0; j < array.length; j++) {
    for (let i = 0; i < 10; i++) {
      array[j][i] = +(Math.random() * (101 - 10) + 10);
    }
  }

  return array;
};

const formatNumbersInArray = (array, digitsAfterDot) =>
  array?.map((arr) => arr.map((el) => +el.toFixed(+digitsAfterDot)));

const sortNumbersInArray = (array, sorting) => {
  if (sorting === "asc") {
    return array?.map((arr) => arr.sort((a, b) => a - b));
  } else if (sorting === "desc") {
    return array?.map((arr) => arr.sort((a, b) => b - a));
  } else {
    return array;
  }
};

const initializeDataBase = () => {
  fs.exists(DATA_DB_PATH, (isExists) => {
    if (!isExists) {
      const csvWriter = createCsvWriter({
        path: DATA_DB_PATH,
        header: [{ id: "array", title: "mainArray" }],
      });

      const data = getFilledArray();

      const initialData = [
        {
          array: JSON.stringify(data),
        },
      ];

      csvWriter.writeRecords(initialData).then(() => {
        console.log("...Done");
      });
    }
  });

  fs.exists(DATA_DB_PATH1, (isExists) => {
    if (!isExists) {
      const csvWriter = createCsvWriter({
        path: DATA_DB_PATH1,
        header: [{ id: "array", title: "arrayAscending" }],
      });

      const data = sortNumbersInArray(getFilledArray(), "asc");

      const initialData = [
        {
          array: JSON.stringify(data),
        },
      ];

      csvWriter.writeRecords(initialData).then(() => {
        console.log("...Done");
      });
    }
  });

  fs.exists(DATA_DB_PATH2, (isExists) => {
    if (!isExists) {
      const csvWriter = createCsvWriter({
        path: DATA_DB_PATH2,
        header: [{ id: "array", title: "arrayDescending" }],
      });

      const data = sortNumbersInArray(getFilledArray(), "desc");

      const initialData = [
        {
          array: JSON.stringify(data),
        },
      ];

      csvWriter.writeRecords(initialData).then(() => {
        console.log("...Done");
      });
    }
  });
};

module.exports = {
  DATA_DB_PATH,
  DATA_DB_PATH1,
  DATA_DB_PATH2,
  initializeDataBase,
  formatNumbersInArray,
  sortNumbersInArray,
};
