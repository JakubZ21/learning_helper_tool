const request = require('express')
const express = require('express')
const app = express()

function connectToAzure(){
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
    return config;
}
function connectToAzureWriter(){
    var config = {
      authentication: {
        options: {
          userName: "quiz_readwriter", 
          password: "wsmsjzOu!z" 
        },
        type: "default"
      },
      server: "wsmsjz-learning-helper-tool-sqlsrv-dev.database.windows.net", 
      options: {
        database: "learning_helper_tool_sqldb_dev", //update me
        encrypt: true,
        "requestTimeout": 0
      }
    };
    return config;
}



app.get("/api", (req,res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"]})
})

app.get("/categories/getall", (req,res) => {
    var Connection = require('tedious').Connection;
    var Request = require('tedious').Request;
    var jsonArray = [];
    res.header("Access-Control-Allow-Origin", "*");
    
    const connection = new Connection(connectToAzure());
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
            "SELECT * FROM question_category",
            function(err, rowCount, rows) {
                console.log(rowCount + ' row(s) returned');
                res.json(jsonArray)
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

qAPI();

app.get("/quiz/registernew", (req,res)=>{
    var Connection = require('tedious').Connection;
    var Request = require('tedious').Request;
    let code ="AAAAAA" 
    res.header("Access-Control-Allow-Origin", "*");
    
    
    
    const connection = new Connection(connectToAzureWriter());
    connection.on('connect', function(err) {
        if (err) {
            console.log(err)
            console.log("Err")
        } else {
            console.log("Connected")
            queryDatabase()
        }
    });
    connection.connect();
    console.log("Before Send")
    res.json(code);
    console.log("After send")

    const queryDatabase = function() {
        console.log('Reading rows from the Table...');
        // Read all rows from table
        // connection.beginTransaction(function(err)
        // {
        //     console.log("Starting Transaction")
        //     if(err){
        //         connection.rollbackTransaction(function(err)
        //         {
        //             console.log(err)
        //             console.log("Rolling back transaction")
        //         }
        //         )
        //     }
        //     else
        //     {
        //         console.log("Starting Request")
                const request = new Request(
                    
                    `
                    INSERT INTO quizes (created_when,created_by,question_count,quiz_mode)  values (CURRENT_TIMESTAMP,4,10,'NO TIME')
                    SELECT hashids.encode1(MAX(id)) FROM dbo.quizes
                    `,
                    function(err, rowCount, rows) {
                        console.log(rows)
                        console.log(rowCount + ' row(s) returned');
                        console.log(err)

                        connection.close();
                    }
                );

                request.on('row', function(columns) {
                    var jsonRow = {};
                    columns.forEach(function(column) {
                        jsonRow[column.metadata.colName] = column.value;
                        console.log(column.metadata.colName+" | "+column.value)
                    });
                    jsonArray.push(jsonRow);
                });
                
                connection.execSql(request);
                
    }
}) 


//weryfikacja danych w formularzu logowania
app.get("/checkuser", (req,res) => {
    var Connection = require('tedious').Connection;
    var Request = require('tedious').Request;
    
    const connection = new Connection(connectToAzure());
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
          // #TODO zmienic na parametry z formularza
            "SELECT * FROM users WHERE email = '" + "guest@zxc.pl" + "' AND password = '" + "guest" + "'",
            function(err, rowCount, rows) {
                console.log(rowCount + ' row(s) returned');
                res.json(rowCount);
                connection.close();
            }
        );
        connection.execSql(request);
    }
});

app.put("/user/register", (req,res)=>
{
    console.log(req.query)
})

app.post("/user/login", (req, res)=>{
let fakeuser = {
    username: "regularUser",
    password: "regularPwd",
    user_type: "REGULAR_USER",
    email: "regular_user@zxc.pl",
}
res.json(fakeuser);
})



app.listen(5000, () => {console.log("Server started on port 5000")})


function qAPI ()
{
//Uzywana jest biblioteka tedious ktora sluzy do polaczenia z azure sql
app.get("/questions/getall", (req,res) => {
    var Connection = require('tedious').Connection;
    var Request = require('tedious').Request;
    var jsonArray = [];
    
    const connection = new Connection(connectToAzure());
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
                res.json(jsonArray)
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

app.get("/questions/getcategory", (req,res) => {
    var Connection = require('tedious').Connection;
    var Request = require('tedious').Request;
    var jsonArray = [];
    res.header("Access-Control-Allow-Origin", "*");
    
    let categories = req.query.category
    let categorySQL = []
    categories.forEach(category => {
        categorySQL.push(category)
        
    });
    console.log("SELECT * FROM questions where category_id in ("+categorySQL.join(",")+")")
    //Przykład jak wrzucic tabele koniecznie '[]' w ?category[]=1 inaczej nie zadziala funkcja foreach
    //http://localhost:5000/questions/getcategory?category[]=3&category[]=1

    const connection = new Connection(connectToAzure());
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
            "SELECT * FROM questions where category_id in ("+categorySQL.join(",")+")",
            function(err, rowCount, rows) {
                console.log(rowCount + ' row(s) returned');
                res.json(jsonArray)
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

app.get("/questions/get10random", (req,res) => {
    var Connection = require('tedious').Connection;
    var Request = require('tedious').Request;
    var jsonArray = [];
    res.header("Access-Control-Allow-Origin", "*");
    
    // let categories = req.query.category
    // let categorySQL = []
    // categories.forEach(category => {
    //     categorySQL.push(category)
        
    // });
    //console.log("SELECT TOP 10 * FROM questions where category_id in ("+categorySQL.join(",")+")")
    
    const connection = new Connection(connectToAzure());
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
            "SELECT TOP 10 * FROM questions ORDER BY NEWID()",
            function(err, rowCount, rows) {
                console.log(rowCount + ' row(s) returned');
                res.json(jsonArray)
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

app.get("/questions/get10randomfromcat", (req,res) => {
    var Connection = require('tedious').Connection;
    var Request = require('tedious').Request;
    var jsonArray = [];
    res.header("Access-Control-Allow-Origin", "*");
    
    let categories = req.query.category
    let categorySQL = []
    categories.forEach(category => {
        categorySQL.push(category)
    });

    //console.log("SELECT TOP 10 * FROM questions where category_id in ("+categorySQL.join(",")+")")
    
    const connection = new Connection(connectToAzure());
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
            "SELECT TOP 10 * FROM questions where category_id in ("+categorySQL.join(",")+") ORDER BY NEWID()",
            function(err, rowCount, rows) {
                console.log(rowCount + ' row(s) returned');
                res.json(jsonArray)
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
}