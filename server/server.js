const { json, response } = require('express')
const express = require('express')
const { Connection, Request } = require("tedious");
const app = express()

app.get("/api", (req, res) => {
  
})

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

// var jsonArray = [];
var connection = new Connection(config)
var resp 
// res.json([])



//Uzywana jest biblioteka tedious ktora sluzy do polaczenia z azure sql
app.get("/testconn", (req, res) => {

  
  
  connection.on('connect', function(err)
  {
    if(err){
      console.log(err)
    }else
    {
      console.log("connected")
      resp = execSQL(res);
      console.log(resp)
    }
  })
  
  connection.connect()

  // Create connection to database
  // getQuestData(res);

  // console.log(jsonArray)

  // Attempt to connect and execute queries if connection goes through
  // This returns 3 rows
  
  // res.json(resp);
})

app.listen(5000, () => { console.log("Server started on port 5000") })


async function execSQL(res)
{
  const jsonArray = []
 await new Promise((resolve,reject) =>
 {
  const request = new Request(
    //`SELECT * FROM SampleTable`,
    "SELECT * FROM questions",
    (err, rowCount) => {
      if (err) {
        return reject(err);
      } else
      {
        console.log(rowCount+' rows')
      }     
    }); 
 
    
    request.on("row", columns => {
      var rowObject = {};
      columns.forEach(column => {
        rowObject[column.metadata.colName] = column.value
      });
      jsonArray.push(rowObject);
    });

  request.on('doneProc', function(rowCount, more, returnStatus, rows)
  {
    console.log("onDoneProc");
    return resolve(jsonArray);
  });

  connection.execSql(request)
  })
 

 
  res.json(jsonArray)
  return res
}

function getQuestData(res) {

  

  connection.connect(function (err) {
    if (err) {
      console.log(err);
      return;
    }
    else {
      
      

      connection.execSql(request);
      res.json(jsonArray)
    }
  })
}
