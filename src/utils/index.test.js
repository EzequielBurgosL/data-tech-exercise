const { expect } = require('chai');
const {
  addPredictedDateToFields,
  getAverageDateDistance,
  groupDataFieldByKey,
  mapToObjectArray
} = require('./index');

describe('Utils', () => {
  describe('groupDataFieldByKey', () => {
    it('should group data by key and create an array of dates for each user', () => {
      const key = 'id';
      const field = 'date';
      const dataExample = [
        {
          id: 'user_1',
          date: '2020-01-22'
        },
        {
          id: 'user_1',
          date: '2020-02-21'
        },
        {
          id: 'user_2',
          date: '2020-03-20'
        },
        {
          id: 'user_3',
          date: '2020-04-22'
        },
        {
          id: 'user_3',
          date: '2020-05-23'
        },
        {
          id: 'user_3',
          date: '2020-06-22'
        }
      ];
      const result = groupDataFieldByKey(dataExample, key, field);

      expect(result).to.deep.equal({
        user_1: ['2020-01-22', '2020-02-21'],
        user_2: ['2020-03-20'],
        user_3: ['2020-04-22', '2020-05-23', '2020-06-22'],
      });
    });
  });

  describe('getAverageDateDistance', () => {
    it('should get average date distance (in ms) from an array of dates sample', () => {
      const dates = ['2020-04-22', '2020-05-23', '2020-06-22'];
      const result = getAverageDateDistance(dates);
      const expectedResult = 2635200000; // A month aprox (2592000000ms => 1000 * 60 * 60 * 24 * 30)

      expect(result).to.deep.equal(expectedResult);
    });
  });

  describe('addPredictedDateToFields', () => {
    it('should add predicted date to each user dates array', () => {
      const dateSeriesById = {
        user_1: ['2020-01-22', '2020-02-21'],
        user_2: ['2020-03-20'],
        user_3: ['2020-04-22', '2020-05-23', '2020-06-22'],
      };
      const result = addPredictedDateToFields(dateSeriesById);

      expect(result).to.deep.equal({
        user_1: ['2020-01-22', '2020-02-21', '2020-03-22'], // Added date '2020-03-22'
        user_2: ['2020-03-20'],
        user_3: ['2020-04-22', '2020-05-23', '2020-06-22', '2020-07-22'], // Added date '2020-07-22'
      });
    })
  })

  describe('mapToObjectArray', () => {
    it('should convert map of arrays into an array of objects', () => {
      const map = {
        user_1: ['2020-01-22', '2020-02-21', '2020-03-22'],
        user_2: ['2020-03-20'],
        user_3: ['2020-04-22', '2020-05-23', '2020-06-22', '2020-07-22'],
      }
      const key = 'id';
      const value = 'date'
      const result = mapToObjectArray(map, key, value);

      expect(result).to.deep.equal([
        {
          id: 'user_1',
          date: '2020-01-22'
        },
        {
          id: 'user_1',
          date: '2020-02-21'
        },
        {
          id: 'user_1',
          date: '2020-03-22' // Predicted date
        },
        {
          id: 'user_2',
          date: '2020-03-20'
        },
        {
          id: 'user_3',
          date: '2020-04-22'
        },
        {
          id: 'user_3',
          date: '2020-05-23'
        },
        {
          id: 'user_3',
          date: '2020-06-22'
        },
        {
          id: 'user_3',
          date: '2020-07-22' // Predicted date
        }
      ]);
    });
  });
});