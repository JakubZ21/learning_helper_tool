const { json, response } = require('express')
const express = require('express')
const { Connection, Request } = require("tedious");
const app = express()

app.get("/testconn", (req, res) => {

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
  
  var jsonArray = [];
  var connection = new Connection(config)
  
  
  
  
  connection.connect((err) => {
    if (err) {
      console.log('Connection Failed');
      throw err;
    }
  
    executeStatement();
  });
  
  function executeStatement() {
    const request = new Request('select * from questions', (err, rowCount) => {
      if (err) {
        throw err;
      }
  
      console.log('DONE!');
      connection.close();
    });
  
    // Emits a 'DoneInProc' event when completed.
    request.on('row', (columns) => {
      columns.forEach((column) => {
        if (column.value === null) {
          console.log('NULL');
        } else {
          console.log(column.value);
        }
      });
    });
  
    request.on('done', (rowCount) => {
      console.log('Done is called!');
    });
  
    request.on('doneInProc', (rowCount, more) => {
      console.log(rowCount + ' rows returned');
    });
  
    // In SQL Server 2000 you may need: connection.execSqlBatch(request);
    connection.execSql(request);
  }
  
  res.json({ "users": ["userOne", "userTwo", "userThree"] })
})


