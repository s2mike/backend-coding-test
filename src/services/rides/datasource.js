const request = require('superagent');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');
/**
 * Expects a filename in the format "recipe-name.json" and transforms it to "Recipe Name"
 * @param {*} filename
 */
const parseNameFromFileName = (filename) => {
  const [snakeCaseName] = filename.split('.');
  const words = snakeCaseName.split('-');

  return words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const fromResponse = (rawData) => ({
  name: parseNameFromFileName(rawData.name),
  filename: rawData.name,
  sha: rawData.sha,
});

const parseResponseBody = (body) => {
  const { content, encoding } = body;
  const buff = Buffer.from(content, encoding);
  return JSON.parse(buff.toString());
};

class RidesDatasource {
    async getRides() {
       
      db.all('SELECT * FROM Rides', function (err, rows) {
          if (err) {
              return res.send({
                  error_code: 'SERVER_ERROR',
                  message: 'Unknown error'
              });
          }

          if (rows.length === 0) {
              return res.send({
                  error_code: 'RIDES_NOT_FOUND_ERROR',
                  message: 'Could not find any rides'
              });
          }

          res.send(rows);
      });
  }

    async getRide(id) {
   
      db.all(`SELECT * FROM Rides WHERE rideID='${id}'`, function (err, rows) {
          if (err) {
              return res.send({
                  error_code: 'SERVER_ERROR',
                  message: 'Unknown error'
              });
          }

          if (rows.length === 0) {
              return res.send({
                  error_code: 'RIDES_NOT_FOUND_ERROR',
                  message: 'Could not find any rides'
              });
          }

          res.send(rows);
      });
  }
}

module.exports = RidesDatasource;