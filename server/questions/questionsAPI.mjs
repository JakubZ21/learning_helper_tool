const request = require('express')
const express = require('express')
const app = express()

export function qAPI ()
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
}