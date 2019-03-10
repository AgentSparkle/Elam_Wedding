const sql = require('mssql')
var dbConfig = {
    server: "elamwedding.database.windows.net",
    database: "ElamWedding",
    user: "aelam",
    password: "Password123",
    port: 1433,
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
};

const azurePromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then(logPool => {
    console.log('Connected to MSSQL')
    return logPool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, azurePromise
}