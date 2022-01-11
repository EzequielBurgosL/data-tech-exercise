const R = require("ramda")
const csv = require("csv-parser")
const fs = require("fs")

const {
  groupDataFieldByKey,
  addPredictedDateToFields,
  mapToObjectArray
} = require('./utils');

const makePredictions = seriesData => {
  // YOUR IMPLEMENTATION GOES HERE
  // PLEASE ADD ADDITIONAL FUNCTIONS AS REQUIRED

  // Convert "seriesData" into a new data structure to help process the data
  const groupedData = groupDataFieldByKey(seriesData, 'seriesid', 'date');
  
  // Add predicted date into each seriesid group
  const updatedGroupedData = addPredictedDateToFields(groupedData);

  // Return to initial data structure
  const result = mapToObjectArray(updatedGroupedData, 'seriesid', 'date');

  // Convert data to CSV or JSON format:
  JSON.stringify(result);
}

const main = () => {
  // Note that the below code is violating the principle of immutability but is used pragmatically 
  // for interaction with the csv-parser library.  Mutating an object should generally be avoided.
  const seriesData = []
  fs.createReadStream("dates.csv")
  .pipe(csv())
  .on("data", data => seriesData.push(data))
  .on("end", () => { makePredictions(seriesData) })
}

main();