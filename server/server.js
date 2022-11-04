const { json } = require('express');
const request = require('express')
const express = require('express')
const app = express()
const cors = require('cors');

app.use(express.json());
app.use(cors());

function connectToAzure() {
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
function connectToAzureWriter() {
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
        }
    };
    return config;
}


app.get("/categories/getall", (req, res) => {
    var Connection = require('tedious').Connection;
    var Request = require('tedious').Request;
    var jsonArray = [];
    res.header("Access-Control-Allow-Origin", "*");

    const connection = new Connection(connectToAzure());
    connection.on('connect', function (err) {
        if (err) {
            console.log(err)
        } else {
            queryDatabase()
        }
    });
    connection.connect();
    const queryDatabase = function () {
        console.log('Reading rows from the Table...');
        // Read all rows from table
        const request = new Request(
            "SELECT * FROM question_category",
            function (err, rowCount, rows) {
                console.log(rowCount + ' row(s) returned');
                res.json(jsonArray)
                jsonArray = [];
                connection.close();
            }
        );
        request.on('row', function (columns) {
            var jsonRow = {};
            columns.forEach(function (column) {
                jsonRow[column.metadata.colName] = column.value;
            });
            jsonArray.push(jsonRow);
        });
        connection.execSql(request);
    }
});

//API for Questions
qAPI();
//API for Quiz Register
quizRegisterAPI();

app.put("/user/register", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    //const accountType = req.body.accountType;

    console.log(username, email, password);//, accountType);

    var Connection = require('tedious').Connection;
    var Request = require('tedious').Request;
    
    const connection = new Connection(connectToAzureWriter());
    connection.on('connect', function (err) {
        if (err) {
            console.log(err)
        } else {
            checkEmailExist();
        }
    });
    connection.connect();

    const checkEmailExist = function () {
        // Read all rows from table
        const request2 = new Request(
            "SELECT * FROM users WHERE email = '" + email + "'",
            function (err, rowCount, rows) {
                console.log(rowCount + ' row(s) returned');
                if(rowCount > 0) {
                    console.log("Email exist");
                    res.json({status: "Podany email istnieje"});
                } else {
                    queryDatabase();
                    res.json({status: "Poprawnie zarejestrowano"});
                }
            });
            connection.execSql(request2);
    }

    const queryDatabase = function () {
        console.log('Reading rows from the Table...');
        // Read all rows from table
        const request = new Request(
            `INSERT INTO users (username, email, user_type, password, registered_at) VALUES ('${username}', '${email}', 'REGULAR_USER', '${password}', CURRENT_TIMESTAMP)`,
            function (err, rowCount, rows) {
                console.log(rowCount + ' row(s) returned');
                connection.close();
            }
        );
        connection.execSql(request);
    }
})

//check user if exists in db -> return 1 if exists, 0 if not
app.post("/user/login", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    
    const email = req.body.email;
    const password = req.body.password;
    
    var Connection = require('tedious').Connection;
    var Request = require('tedious').Request;

    const connection = new Connection(connectToAzure());
    connection.on('connect', function (err) {
        if (err) {
            console.log(err)
        } else {
            queryDatabase()
        }
    });
    connection.connect();
    const queryDatabase = function () {
        console.log('Reading rows from the Table...');
        // Read all rows from table
        const request = new Request(
            "SELECT * FROM users WHERE email = '" + email + "' AND password = '" + password + "'",
            function (err, rowCount, rows) {
                console.log(rowCount + ' row(s) returned');
                if(rowCount > 0) {
                    res.json({status: "Zalogowano pomyślnie"});
                } else {
                    res.json({status: "Niepoprawny email lub hasło"});
                }
                connection.close();
            }
        );
        connection.execSql(request);
    }
})



app.listen(5000, () => { console.log("Server started on port 5000") })


function qAPI() {
    //Uzywana jest biblioteka tedious ktora sluzy do polaczenia z azure sql
    app.get("/questions/getall", (req, res) => {
        var Connection = require('tedious').Connection;
        var Request = require('tedious').Request;
        var jsonArray = [];

        const connection = new Connection(connectToAzure());
        connection.on('connect', function (err) {
            if (err) {
                console.log(err)
            } else {
                queryDatabase()
            }
        });
        connection.connect();
        const queryDatabase = function () {
            console.log('Reading rows from the Table...');
            // Read all rows from table
            const request = new Request(
                "SELECT * FROM questions",
                function (err, rowCount, rows) {
                    console.log(rowCount + ' row(s) returned');
                    res.json(jsonArray)
                    jsonArray = [];
                    connection.close();
                }
            );
            request.on('row', function (columns) {
                var jsonRow = {};
                columns.forEach(function (column) {
                    jsonRow[column.metadata.colName] = column.value;
                });
                jsonArray.push(jsonRow);
            });
            connection.execSql(request);
        }
    });

    app.get("/questions/getcategory", (req, res) => {
        var Connection = require('tedious').Connection;
        var Request = require('tedious').Request;
        var jsonArray = [];
        res.header("Access-Control-Allow-Origin", "*");

        let categories = req.query.category
        let categorySQL = []
        categories.forEach(category => {
            categorySQL.push(category)

        });
        console.log("SELECT * FROM questions where category_id in (" + categorySQL.join(",") + ")")
        //Przykład jak wrzucic tabele koniecznie '[]' w ?category[]=1 inaczej nie zadziala funkcja foreach
        //http://localhost:5000/questions/getcategory?category[]=3&category[]=1

        const connection = new Connection(connectToAzure());
        connection.on('connect', function (err) {
            if (err) {
                console.log(err)
            } else {
                queryDatabase()
            }
        });
        connection.connect();
        const queryDatabase = function () {
            console.log('Reading rows from the Table...');
            // Read all rows from table
            const request = new Request(
                "SELECT * FROM questions where category_id in (" + categorySQL.join(",") + ")",
                function (err, rowCount, rows) {
                    console.log(rowCount + ' row(s) returned');
                    res.json(jsonArray)
                    jsonArray = [];
                    connection.close();
                }
            );
            request.on('row', function (columns) {
                var jsonRow = {};
                columns.forEach(function (column) {
                    jsonRow[column.metadata.colName] = column.value;
                });
                jsonArray.push(jsonRow);
            });
            connection.execSql(request);
        }
    });

    app.get("/questions/get10random", (req, res) => {
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
        connection.on('connect', function (err) {
            if (err) {
                console.log(err)
            } else {
                queryDatabase()
            }
        });
        connection.connect();
        const queryDatabase = function () {
            console.log('Reading rows from the Table...');
            // Read all rows from table
            const request = new Request(
                "SELECT TOP 10 * FROM questions ORDER BY NEWID()",
                function (err, rowCount, rows) {
                    console.log(rowCount + ' row(s) returned');
                    res.json(jsonArray)
                    jsonArray = [];
                    connection.close();
                }
            );
            request.on('row', function (columns) {
                var jsonRow = {};
                columns.forEach(function (column) {
                    jsonRow[column.metadata.colName] = column.value;
                });
                jsonArray.push(jsonRow);
            });
            connection.execSql(request);
        }
    });

    app.get("/questions/get10randomfromcat", (req, res) => {
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
        connection.on('connect', function (err) {
            if (err) {
                console.log(err)
            } else {
                queryDatabase()
            }
        });
        connection.connect();
        const queryDatabase = function () {
            console.log('Reading rows from the Table...');
            // Read all rows from table
            const request = new Request(
                "SELECT TOP 10 * FROM questions where category_id in (" + categorySQL.join(",") + ") ORDER BY NEWID()",
                function (err, rowCount, rows) {
                    console.log(rowCount + ' row(s) returned');
                    res.json(jsonArray)
                    jsonArray = [];
                    connection.close();
                }
            );
            request.on('row', function (columns) {
                var jsonRow = {};
                columns.forEach(function (column) {
                    jsonRow[column.metadata.colName] = column.value;
                });
                jsonArray.push(jsonRow);
            });
            connection.execSql(request);
        }
    });
}

function quizRegisterAPI(){

    app.put("/quiz/registernew", (req, res) => {
        var Connection = require('tedious').Connection;
        var Request = require('tedious').Request;
        let code = ""
        res.header("Access-Control-Allow-Origin", "*");
    
        //Depends on the passed category like ?category[]=1&category[]=3
        let categories = req.query.category
        let categorySQL = []
    
    
    
        const connection = new Connection(connectToAzureWriter());
        connection.on('connect', function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log("Connected")
                connection.beginTransaction(function (err) {
    
                    if (err) {
                        connection.rollbackTransaction(function (err) {
                            console.log(err)
                            console.log("Rolling back transaction")
                        })
                    }
                    else {
                        console.log("Executing insert, fetching code")
                        insertQuizReturnCode()
    
    
    
                    }
                    console.log("Finalized Transaction")
                }, "add_quiz")
    
            }
        });
    
        connection.connect();
        console.log("Sending Request")
    
        const insertQuizReturnCode = function () {
            console.log('Inserting and reading code from the Table...');
            // Read all rows from table
            let quiz_id = undefined
            const request = new Request(
    
                `
                INSERT INTO quizes (created_when,created_by,question_count,quiz_mode)  values (CURRENT_TIMESTAMP,4,10,'NO TIME')
                SELECT hashids.encode1(MAX(id)) as code, MAX(id) as Id FROM dbo.quizes
                `
                ,
                function (err, rowCount, rows) {
                    console.log(rowCount + ' row(s) returned');
                    res.json(code);
                    typeof err === "undefined" ? console.log("Successfully inserted quiz and returned quiz code") : console.log(err) ;
                }
            );
    
            request.on('row', function (columns) {
                let json = {}
                columns.forEach(function (column) {
                    if (column.metadata.colName == 'code') {
                        json[column.metadata.colName] = column.value;
                    }
                    else if (column.metadata.colName == 'Id') {
                        quiz_id = column.value;
                        console.log("quizid = " + quiz_id)
                    }
                });
                code = json;
            });
    
            connection.execSql(request);
            request.on('requestCompleted', function () {
                console.log("Request completed setting assigning questionsToQuiz")
                selectQuestionsForQuiz(quiz_id)
            })
    
            connection.on('end', function () {
                console.log('Ending connection')
            })
        }
    
        const selectQuestionsForQuiz = function (quiz_id) {
    
            console.log('Reading random 10 rows from the Table...');
            let sqlQuery = ""
            let jsonArray = []
    
            // Read all rows from table
            if (typeof req.query.category === 'undefined') {
                console.log("Categories were not selected")
                sqlQuery = "SELECT TOP 10 id FROM questions ORDER BY NEWID()"
            } else {
                console.log("Categories were selected")
                categories.forEach(category => {
                    categorySQL.push(category)
                });
                sqlQuery = "SELECT TOP 10 id FROM questions where category_id in (" + categorySQL.join(",") + ") ORDER BY NEWID()"
            }
            console.log(sqlQuery)
    
    
            const request = new Request(
                sqlQuery,
                function (err, rowCount, rows) {
                    console.log(rowCount + ' row(s) returned');
                    typeof err === "undefined" ?  console.log("Successfully fetched 10 random questions") : console.log(err) ;
                }
            );
            request.on('row', function (columns) {
                var jsonRow = {};
                columns.forEach(function (column) {
                    jsonRow[column.metadata.colName] = column.value;
                });
                jsonArray.push(jsonRow);
            });
            request.on('requestCompleted', function () {
                console.log("Request completed populating bridge table...")
                // console.log(jsonArray)
                populateBridgeTable(quiz_id, jsonArray);
                jsonArray = [];
    
            })
            connection.execSql(request);
        }
        const populateBridgeTable = function (quiz_id, question_ids) {
            let arrayIds = []
            question_ids.forEach(id => {
                arrayIds.push("(" + quiz_id + ", " + id.id + ")")
            });
            question_ids = undefined;
            console.log(arrayIds)
            let sqlQuery = "INSERT INTO [dbo].[quiz_questions_bridge] (quiz_id, question_id) VALUES "
            sqlQuery += arrayIds.join(',')
            // console.log(sqlQuery)
            const request = new Request(
                sqlQuery,
                function (err, rowCount, rows) {
                    console.log(rowCount + ' row(s) returned');
                    typeof err === "undefined" ? console.log("Successfully inserted assignemnt data to database") : console.log(err);
                    connection.commitTransaction(function (error) {
                        console.log("Trying to close connection")
                        typeof error === "undefined" ? connection.close() : console.log("error" + error) ;
                    })
    
                }
            );
    
            console.log("Executing request");
            connection.execSql(request);
    
        }
    })
    
}