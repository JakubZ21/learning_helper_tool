const request = require('express')
const express = require('express')
const app = express()

app.get("/api", (req,res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"]})
})
//Uzywana jest biblioteka tedious ktora sluzy do polaczenia z azure sql
app.get("/testconn", (req,res) => {
    var jsonArray = [];
    var Connection = require('tedious').Connection;
    var Request = require('tedious').Request;
    var config = {
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
    connection.on('connect', function(err) {
        if (err) {
            console.log(err)
        } else {
            queryDatabase()
        }
    });
    connection.connect();
    const queryDatabase = function() {
        console.log('Reading rows from the Table...');
        // Read all rows from table
        const request = new Request(
            "SELECT * FROM questions",
            function(err, rowCount, rows) {
                console.log(rowCount + ' row(s) returned');
                res.json({"users": jsonArray})
                jsonArray = [];
                connection.close();
            }
        );
        request.on('row', function(columns) {
            var jsonRow = {};
            columns.forEach(function(column) {
                jsonRow[column.metadata.colName] = column.value;
            });
            jsonArray.push(jsonRow);
        });
        connection.execSql(request);
    }
});

app.listen(5000, () => {console.log("Server started on port 5000")})