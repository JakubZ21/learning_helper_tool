const express = require('express')
const app = express()

app.get("/api", (req,res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"]})
})
//Uzywana jest biblioteka tedious ktora sluzy do polaczenia z azure sql
app.get("/testconn", (req,res) => {

    const { Connection, Request } = require("tedious");

    // Create connection to database
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
    
    const connection = new Connection(config);
    const request = new Request(
        //`SELECT * FROM SampleTable`,
        "SELECT * FROM questions",
        (err, rowCount) => {
          if (err) {
            console.error(err.message);
          } else {
            console.log(`${rowCount} row(s) returned`);
          }
        }
      );
      var header = [];
      var table = [];
      var i = 0
      request.on("row", columns => {
        while (header.length != 7){
          header.push(columns[i].metadata.colName)
          i++;
        }
        let st = '';
        if(i == 7){
          header.forEach(item => st += item +'\t')
          i++;
        }
        console.log(st)
        columns.forEach(column => {
          table.push(column.value);
        });
        st = '';
        table.forEach(item => st += item +'\t')
        console.log(st);
        table = [];
      });
    
    // Attempt to connect and execute queries if connection goes through
    // This returns 3 rows
    connection.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        }
        connection.execSql(request);
        
    })
    res.json(connection.execSql(request))
})
app.listen(5000, () => {console.log("Server started on port 5000")})