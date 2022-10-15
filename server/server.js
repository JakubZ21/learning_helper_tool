const { json, response } = require('express')
const express = require('express')
const { Connection, Request } = require("tedious");
const app = express()

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


connection.on('connect', function(err)
{
  if(err){
    console.log(err)
  }else
  {
    console.log("connected")
    const resp = execSQL();
    console.log(resp[1]+"here")
  }
})

connection.connect()

// res.json([])


app.get("/api", (req, res) => {
  res.json({ "users": ["userOne", "userTwo", "userThree"] })
})
//Uzywana jest biblioteka tedious ktora sluzy do polaczenia z azure sql
app.get("/testconn", (req, res) => {

  


  // Create connection to database
  // getQuestData(res);

  // console.log(jsonArray)

  // Attempt to connect and execute queries if connection goes through
  // This returns 3 rows

  
})

app.listen(5000, () => { console.log("Server started on port 5000") })


function execSQL()
{

  request = new Request(
    //`SELECT * FROM SampleTable`,
    "SELECT * FROM questions",
    (err) => {
      if (err) {
        console.error(err.message);
      }     
    }
  );

  connection.execSql(request)
  var counter = 1 
  resp = {}
  request.on('row', function(columns)
  {
    resp[counter] = {}
    columns.forEach(function(column)
    {
      resp[counter][column.metadata.colName] = column.value
    });
    counter += 1;
  })
  request.on('done', 
  function (rowCount, more, rows) {console.log("done is called")});
  
  return resp
}

function getQuestData(res) {

  

  connection.connect(function (err) {
    if (err) {
      console.log(err);
      return;
    }
    else {
      
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
