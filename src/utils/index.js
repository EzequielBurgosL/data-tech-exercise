const groupDataFieldByKey = (data = [], key = '', field = '') => {
  const groupedData = {};
  let currentKey;
  let previousKey;

  data.forEach(item => {
    currentKey = item[key];

    if (currentKey === previousKey) {
      groupedData[currentKey].push(item[field]);
    } else {
      groupedData[currentKey] = [item[field]];
    }

    previousKey = currentKey;
  });

  return groupedData;
}

const convertDateInTimestamp = (date = '') => new Date(date).getTime();
const convertDatesInTimestamps = (dates = []) => dates.map(date => convertDateInTimestamp(date));
const convertTimestampToISOString = (timestamp) => new Date(timestamp).toISOString().split('T')[0]

const add = (x, y) => x + y;
const sum = xs => xs.reduce(add, 0);
const average = xs => xs[0] === undefined ? NaN : sum(xs) / xs.length;

const delta = ([x, ...xs]) =>
  xs.reduce(([acc, last], x) => [[...acc, x - last], x], [[], x])[0];

const getAverageDateDistance = (dates = []) => {
  const timestamps = convertDatesInTimestamps(dates);

  return average(delta(convertDatesInTimestamps(timestamps)));
};

const addPredictedDateToFields = (dateSeriesById = {}) => {
  for (const key in dateSeriesById) {
    const dates = dateSeriesById[key] || [];
    const lastDate = dates[dates.length - 1];

    if (dates.length > 1) { // We can only try to predict samples with more than 1 item.
      const avgDateDistance = getAverageDateDistance(dates);
      const predictedDateTimestamp = convertDateInTimestamp(lastDate) + avgDateDistance;
      const predictedDate = convertTimestampToISOString(predictedDateTimestamp);

      dates.push(predictedDate);
    }
  }

  return dateSeriesById;
};

const mapToObjectArray = (map, key, value) => {
  const array = [];

  for (const mapKey in map) {
    for (const element of map[mapKey]) {
      const item = {};
      item[key] = mapKey;
      item[value] = element;

      array.push(item);
    }
  }

  return array;
};


module.exports = {
  groupDataFieldByKey,
  getAverageDateDistance,
  addPredictedDateToFields,
  mapToObjectArray
};