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

app.get("/api", (req,res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"]})
})

qAPI();

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
            "SELECT TOP 10 * FROM questions ORDER BY NEWID() )",
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
            "SELECT TOP 10 * FROM questions where category_id in ("+categorySQL.join(",")+") ORDER BY NEWID() )",
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