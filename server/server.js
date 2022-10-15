const { json } = require('express')
const express = require('express')
const { Connection, Request } = require("tedious");
const app = express()
var jsonArray = [];
var connection;

app.get("/api", (req, res) => {
  res.json({ "users": ["userOne", "userTwo", "userThree"] })
})
//Uzywana jest biblioteka tedious ktora sluzy do polaczenia z azure sql
app.get("/testconn", async (req, res) => {

  
  // Create connection to database
  getQuestData(res);

  // console.log(jsonArray)

  // Attempt to connect and execute queries if connection goes through
  // This returns 3 rows

  
})
app.listen(5000, () => { console.log("Server started on port 5000") })


async function getQuestData(res) {

  const config = {
    authentication: {
      options: {
        userName: "quiz_reader",
        password: "wsmsjzOu!z"
      },
      type: "default"
    },
    server: "wsmsjz-learning-helper-tool-sqlsrv-dev.database.windows.net",
    options: {
      database: "learning_helper_tool_sqldb_dev", //update me
      encrypt: true
    }
  };

  connection = new Connection(config)

  await connection.connect(function (err) {
    if (err) {
      console.log(err);
      return;
    }
    else {
      const request = new Request(
        //`SELECT * FROM SampleTable`,
        "SELECT * FROM questions",
        (err, rowCount) => {
          if (err) {
            console.error(err.message);
          } else {
            console.log(`${rowCount} row(s) returned`);
            // res.json(jsonArray)
          }
        }
      );
      request.on("row", columns => {
        var rowObject = {};
        columns.forEach(column => {
          rowObject[column.metadata.colName] = column.value
        });
        jsonArray.push(rowObject);
      });

      connection.execSql(request);
      res.json(jsonArray)
    }
  })
}
