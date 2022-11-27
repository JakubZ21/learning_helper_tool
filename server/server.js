const { json } = require('express');
const request = require('express');
const express = require('express');
const app = express();
const cors = require('cors');
const { type } = require('os');

app.use(express.json());
app.use(cors());

function connectToAzure() {
	var config = {
		authentication: {
			options: {
				userName: 'quiz_reader',
				password: 'wsmsjzOu!z',
			},
			type: 'default',
		},
		server: 'wsmsjz-learning-helper-tool-sqlsrv-dev.database.windows.net',
		options: {
			database: 'learning_helper_tool_sqldb_dev', //update me
			encrypt: true,
		},
	};
	return config;
}
function connectToAzureWriter() {
	var config = {
		authentication: {
			options: {
				userName: 'quiz_readwriter',
				password: 'wsmsjzOu!z',
			},
			type: 'default',
		},
		server: 'wsmsjz-learning-helper-tool-sqlsrv-dev.database.windows.net',
		options: {
			database: 'learning_helper_tool_sqldb_dev', //update me
			encrypt: true,
		},
	};
	return config;
}

app.get('/categories/getall', (req, res) => {
	var Connection = require('tedious').Connection;
	var Request = require('tedious').Request;
	var jsonArray = [];
	res.header('Access-Control-Allow-Origin', '*');

	const connection = new Connection(connectToAzure());
	connection.on('connect', function (err) {
		if (err) {
			console.log(err);
		} else {
			queryDatabase();
		}
	});
	connection.connect();
	const queryDatabase = function () {
		console.log('Reading rows from the Table...');
		// Read all rows from table
		const request = new Request('SELECT * FROM question_category', function (
			err,
			rowCount,
			rows
		) {
			console.log(rowCount + ' row(s) returned');
			res.json(jsonArray);
			jsonArray = [];
			connection.close();
		});
		request.on('row', function (columns) {
			var jsonRow = {};
			columns.forEach(function (column) {
				jsonRow[column.metadata.colName] = column.value;
			});
			jsonArray.push(jsonRow);
		});
		connection.execSql(request);
	};
});

app.put('/categories/addCategory', (req, res) => {
	var Connection = require('tedious').Connection;
	var Request = require('tedious').Request;
	if (typeof req.body.category_name !== 'undefined') {
		let category_name = req.body.category_name;
	} else {
		res.json('Category not defined');
	}

	const connection = new Connection(connectToAzureWriter());
	connection.on('connect', function (err) {
		if (err) {
			console.log(err);
		} else {
			queryDatabase();
		}
	});
	connection.connect();

	const queryDatabase = function () {
		console.log('Inserting question into questions');
		// Read all rows from table
		const request = new Request(
			`INSERT INTO question_category (category_name) values (${category_name})`,
			function (err, rowCount, rows) {
				console.log(rowCount + ' row(s) returned');
				if (typeof err !== 'undefined') {
					res.json('Insert complete');
				} else res.json(err);
				connection.close();
			}
		);
		connection.execSql(request);
	};
});

//API for Questions
qAPI();
//API for Quiz Register
quizRegisterAPI();

app.get('/ranking/getmine', (req, res) => {
	var Connection = require('tedious').Connection;
	var Request = require('tedious').Request;
	var jsonArray = [];
	res.header('Access-Control-Allow-Origin', '*');

	const connection = new Connection(connectToAzure());
	connection.on('connect', function (err) {
		if (err) {
			console.log(err);
		} else {
			queryDatabase();
		}
	});

	let user = ''
	if (typeof req.query.user_id === "undefined") res.json("Nie można znalezc uzytkownika")

	else {
		user = req.query.user_id

		connection.connect();
	}
	const queryDatabase = function () {
		console.log('Reading rows from the Table...');
		// Read all rows from table
		const request = new Request(`SELECT quiz_id, taken_when, score, max_score FROM vw_attempts WHERE takenby_id = ${user}`, function (
			err,
			rowCount,
			rows
		) {
			console.log(rowCount + ' row(s) returned');
			res.json(jsonArray);
			jsonArray = [];
			connection.close();
		});
		request.on('row', function (columns) {
			var jsonRow = {};
			columns.forEach(function (column) {
				jsonRow[column.metadata.colName] = column.value;
			});
			jsonArray.push(jsonRow);
		});
		connection.execSql(request);
	};
});

app.put('/sendscore', (req, res) => {
	var Connection = require('tedious').Connection;
	var Request = require('tedious').Request;
	res.header('Access-Control-Allow-Origin', '*');
	if (
		typeof req.body.score !== 'undefined' &&
		typeof req.body.maxScore !== 'undefined' &&
		typeof req.body.quiz_id !== 'undefined' &&
		typeof req.body.takenby !== 'undefined'
	) {
		var score = req.body.score;
		var maxScore = req.body.maxScore;
		var quiz_id = req.body.quiz_id;
		var takenby = req.body.takenby;
	} else {
		res.json('Data is not defined');
	}
	console.log(req.body)

	// const score = req.body.score;
	// console.log(req.body);
	// res.json({ 
	// 	score: score,
	// 	maxScore: maxScore,
	// 	quiz_id: quiz_id,
	// 	takenby: takenby,
	// 	status: 'ok', 
	// statusCode: 2 });

	const connection = new Connection(connectToAzureWriter());
	connection.on('connect', function (err) {
		if (err) {
			console.log(err);
		} else {
			queryDatabase();
		}
	});
	connection.connect();

	const queryDatabase = function () {
		console.log('Inserting attempt score');
		// Read all rows from table
		// console.log(`INSERT INTO attempts (takenby_id, quiz_id, taken_when, score, max_score) values (${takenby}, ${quiz_id}, CURRENTTIMESTAMP, ${score}, ${maxScore})`)
		const request = new Request(
			`INSERT INTO attempts (takenby_id, quiz_id, taken_when, score, max_score) values (${takenby}, ${quiz_id}, CURRENT_TIMESTAMP, ${score}, ${maxScore})`,
			function (err, rowCount, rows) {
				console.log(rowCount + ' row(s) returned');
				if (typeof err !== "undefined") {
					res.json("Insert complete")
				}
				else
					(
						res.json(err)
					)
				connection.close();
			}
		);
		connection.execSql(request);
	};
});

app.put('/user/register', (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');

	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;
	const userType = req.body.userType;

	const validateUsername = /^[A-Za-z0-9]{2,}$/;
	const validatePassword =
		/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/;
	const validateEmail = /^[a-z0-9]+(.[a-z0-9])*@[a-z0-9]+\.[a-z]{2,3}$/;

	if (!validateUsername.test(username)) {
		res.json({
			status: 'Nazwa użytkownika musi zawierac conajmniej 2 znaki!',
			statusCode: 1,
		});
		return;
	}
	if (!validateEmail.test(email)) {
		res.json({ status: 'Nieprawidlowy adres email!', statusCode: 3 });
		return;
	}
	if (!validatePassword.test(password)) {
		res.json({
			status:
				'Haslo musi zawierac conajmniej 5 znakow, 1 cyfre, 1 znak specjalny, 1 mała literę, 1 dużą literę!',
			statusCode: 1,
		});
		return;
	}
	if (userType == false) {
		res.json({ status: 'Nie wybrano rodzaju konta!', statusCode: 1 });
		return;
	}
	if (userType != 'REGULAR_USER' && userType != 'TEACHER_USER') {
		res.json({ status: 'Nieprawidlowy typ konta!', statusCode: 31 });
		return;
	}

	const crypto = require('crypto');
	const hashed = crypto.createHash('sha256').update(password).digest('hex');

	var Connection = require('tedious').Connection;
	var Request = require('tedious').Request;

	var usernameSent = "";
	var useridSent;

	const connection = new Connection(connectToAzureWriter());
	connection.on('connect', function (err) {
		if (err) {
			console.log(err);
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
				if (rowCount > 0) {
					console.log('Email exist');
					res.json({ status: 'Podany email istnieje', statusCode: 3 });
				} else {
					queryDatabase();
					// res.json({username: usernameSent, id: useridSent, status: 'Poprawnie zarejestrowano', statusCode: 2 });
				}
			}
		);
		connection.execSql(request2);
	};

	const queryDatabase = function () {
		console.log('Inserting users into the Table...');
		// Read all rows from table
		const request = new Request(
			`INSERT INTO users (username, email, user_type, password, registered_at) VALUES ('${username}', '${email}', '${userType}', '${hashed}', CURRENT_TIMESTAMP)`,
			function (err, rowCount, rows) {
				console.log(rowCount + ' row(s) returned');
				// connection.close();
				returnIdUsername()
			}
		);

		connection.execSql(request);
	};
	const returnIdUsername = function () {
		const request = new Request(
			"SELECT * FROM users WHERE email = '" +
			email +
			"' AND password = '" +
			hashed +
			"'",
			function (err, rowCount, rows) {
				console.log(rowCount + ' row(s) returned');
				res.json({ username: usernameSent, id: useridSent, status: 'Poprawnie zarejestrowano', statusCode: 2 });
				connection.close();
			}
		);
		request.on('row', function (columns) {
			useridSent = columns[0].value;
			usernameSent = columns[1].value;
		});
		connection.execSql(request)
	}
});

//check user if exists in db -> return 1 if exists, 0 if not
app.post('/user/login', (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');

	const email = req.body.email;
	const password = req.body.password;

	//const validatePassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/;
	const validateEmail = /^[a-z0-9]+(.[a-z0-9])*@[a-z0-9]+\.[a-z]{2,3}$/;

	/*if(!validatePassword.test(password)){
		res.json({status: "Haslo musi zawierac conajmniej 5 znakow, 1 cyfre, 1 znak specjalny, 1 mała literę, 1 dużą literę!", statusCode: 1});
		return;
	}*/
	if (!validateEmail.test(email)) {
		res.json({ status: 'Nieprawidlowy adres email!', statusCode: 3 });
		return;
	}

	const crypto = require('crypto');
	const hashed = crypto.createHash('sha256').update(password).digest('hex');

	var Connection = require('tedious').Connection;
	var Request = require('tedious').Request;

	let username = ""
	let userid = ""
	let user_type = ""

	const connection = new Connection(connectToAzure());
	connection.on('connect', function (err) {
		if (err) {
			console.log(err);
		} else {
			queryDatabase();
		}
	});
	connection.connect();
	const queryDatabase = function () {
		console.log('Reading rows from the Table...');
		// Read all rows from table
		const request = new Request(
			"SELECT * FROM users WHERE email = '" +
			email +
			"' AND password = '" +
			hashed +
			"'",
			function (err, rowCount, rows) {
				console.log(rowCount + ' row(s) returned');
				if (rowCount > 0) {
					res.json({ username: username, id: userid, user_type: user_type, status: 'Zalogowano pomyślnie', statusCode: 2 });
				} else {
					res.json({ status: 'Niepoprawny email lub hasło', statusCode: 3 });
				}
				connection.close();
			}
		);
		request.on('row', function (columns) {
			userid = columns[0].value;
			username = columns[1].value;
			user_type = columns[3].value;
		});
		connection.execSql(request);
	};
});

app.listen(5000, () => {
	console.log('Server started on port 5000');
});

function qAPI() {
	//Uzywana jest biblioteka tedious ktora sluzy do polaczenia z azure sql
	app.put('/questions/addQuestion', (req, res) => {
		var Connection = require('tedious').Connection;
		var Request = require('tedious').Request;
		let content, answer_1, answer_2, answer_3, answer_correct, category_id, created_by
		// res.header('Access-Control-Allow-Origin', '*');
		if (
			typeof req.body.question_content !== 'undefined' &&
			typeof req.body.answer_1 !== 'undefined' &&
			typeof req.body.answer_2 !== 'undefined' &&
			typeof req.body.answer_3 !== 'undefined' &&
			typeof req.body.answer_correct !== 'undefined' &&
			typeof req.body.category_id !== 'undefined' &&
			typeof req.body.created_by !== 'undefined'
		) {
			content = req.body.question_content;
			answer_1 = req.body.answer_1;
			answer_2 = req.body.answer_2;
			answer_3 = req.body.answer_3;
			answer_correct = req.body.answer_correct;
			category_id = req.body.category_id;
			created_by = req.body.created_by;
			// console.log("correct")
		} else {
			res.json("Data not correct")
		}
		// console.log(content)
		//"INSERT INTO questions (qusetion_content, answer_1, answer_2, answer_3, answer_correct, created_by, category_id)"
		const connection = new Connection(connectToAzureWriter());
		connection.on('connect', function (err) {
			if (err) {
				console.log(err);
			} else {
				queryDatabase();
			}
		});
		connection.connect();

		const queryDatabase = function () {
			console.log('Inserting question into questions');
			// Read all rows from table
			const request = new Request(
				`INSERT INTO questions (question_content, answer_1, answer_2, answer_3, answer_correct, created_by, category_id) values ('${content}', '${answer_1}', '${answer_2}', '${answer_3}', '${answer_correct}', ${created_by}, ${category_id})`,
				function (err, rowCount, rows) {
					console.log(rowCount + ' row(s) returned');
					if (typeof err !== 'undefined') {
						res.json('Insert complete');
					} else res.json(err);
					connection.close();
				}
			);
			connection.execSql(request);
		};
	});

	app.get('/questions/getall', (req, res) => {
		var Connection = require('tedious').Connection;
		var Request = require('tedious').Request;
		var jsonArray = [];

		const connection = new Connection(connectToAzure());
		connection.on('connect', function (err) {
			if (err) {
				console.log(err);
			} else {
				queryDatabase();
			}
		});
		connection.connect();
		const queryDatabase = function () {
			console.log('Reading rows from the Table...');
			// Read all rows from table
			const request = new Request('SELECT * FROM questions', function (
				err,
				rowCount,
				rows
			) {
				console.log(rowCount + ' row(s) returned');
				res.json(jsonArray);
				jsonArray = [];
				connection.close();
			});
			request.on('row', function (columns) {
				var jsonRow = {};
				columns.forEach(function (column) {
					jsonRow[column.metadata.colName] = column.value;
				});
				jsonArray.push(jsonRow);
			});
			connection.execSql(request);
		};
	});

	app.get('/questions/getcategory', (req, res) => {
		var Connection = require('tedious').Connection;
		var Request = require('tedious').Request;
		var jsonArray = [];
		res.header('Access-Control-Allow-Origin', '*');

		let categories = req.query.category;
		let categorySQL = [];
		categories.forEach((category) => {
			categorySQL.push(category);
		});
		console.log(
			'SELECT * FROM questions where category_id in (' +
			categorySQL.join(',') +
			')'
		);
		//Przykład jak wrzucic tabele koniecznie '[]' w ?category[]=1 inaczej nie zadziala funkcja foreach
		//http://localhost:5000/questions/getcategory?category[]=3&category[]=1

		const connection = new Connection(connectToAzure());
		connection.on('connect', function (err) {
			if (err) {
				console.log(err);
			} else {
				queryDatabase();
			}
		});
		connection.connect();
		const queryDatabase = function () {
			console.log('Reading rows from the Table...');
			// Read all rows from table
			const request = new Request(
				'SELECT * FROM questions where category_id in (' +
				categorySQL.join(',') +
				')',
				function (err, rowCount, rows) {
					console.log(rowCount + ' row(s) returned');
					res.json(jsonArray);
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
		};
	});

	app.get('/questions/get10random', (req, res) => {
		var Connection = require('tedious').Connection;
		var Request = require('tedious').Request;
		var jsonArray = [];
		res.header('Access-Control-Allow-Origin', '*');

		// let categories = req.query.category
		// let categorySQL = []
		// categories.forEach(category => {
		//     categorySQL.push(category)

		// });
		//console.log("SELECT TOP 10 * FROM questions where category_id in ("+categorySQL.join(",")+")")

		const connection = new Connection(connectToAzure());
		connection.on('connect', function (err) {
			if (err) {
				console.log(err);
			} else {
				queryDatabase();
			}
		});
		connection.connect();
		const queryDatabase = function () {
			console.log('Reading rows from the Table...');
			// Read all rows from table
			const request = new Request(
				'SELECT TOP 10 * FROM questions ORDER BY NEWID()',
				function (err, rowCount, rows) {
					console.log(rowCount + ' row(s) returned');
					res.json(jsonArray);
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
		};
	});

	app.get('/questions/get10randomfromcat', (req, res) => {
		var Connection = require('tedious').Connection;
		var Request = require('tedious').Request;
		var jsonArray = [];
		res.header('Access-Control-Allow-Origin', '*');

		let categories = req.query.category;
		let categorySQL = [];
		categories.forEach((category) => {
			categorySQL.push(category);
		});

		//console.log("SELECT TOP 10 * FROM questions where category_id in ("+categorySQL.join(",")+")")

		//console.log("SELECT TOP 10 * FROM questions where category_id in ("+categorySQL.join(",")+")")

		const connection = new Connection(connectToAzure());
		connection.on('connect', function (err) {
			if (err) {
				console.log(err);
			} else {
				queryDatabase();
			}
		});
		connection.connect();
		const queryDatabase = function () {
			console.log('Reading rows from the Table...');
			// Read all rows from table
			const request = new Request(
				'SELECT TOP 10 * FROM questions where category_id in (' +
				categorySQL.join(',') +
				') ORDER BY NEWID()',
				function (err, rowCount, rows) {
					console.log(rowCount + ' row(s) returned');
					res.json(jsonArray);
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
		};
	});

	app.post('/questions/getqueswithcode', (req, res) => {
		var Connection = require('tedious').Connection;
		var Request = require('tedious').Request;
		var jsonArray = [];
		res.header('Access-Control-Allow-Origin', '*');

		let quiz_code;
		if (typeof req.query.quiz_code == 'undefined') {
			res.json('quiz_code not defined');
			return 0;
		} else quiz_code = req.query.quiz_code;

		//console.log("SELECT TOP 10 * FROM questions where category_id in ("+categorySQL.join(",")+")")

		const connection = new Connection(connectToAzure());
		connection.on('connect', function (err) {
			if (err) {
				console.log(err);
			} else {
				queryDatabase();
			}
		});
		connection.connect();
		const queryDatabase = function () {
			console.log('Reading rows from the Table...');
			// Read all rows from table
			const request = new Request(
				"SELECT  *  FROM [dbo].[vw_quiz_associated_questions] where [quiz_code] ='" +
				quiz_code +
				"' ORDER BY NEWID()",
				function (err, rowCount, rows) {
					console.log(rowCount + ' row(s) returned');
					res.json(jsonArray);
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
		};
	});
}

function quizRegisterAPI() {
	app.get('/quiz/getQuizId', (req, res) => {
		var Connection = require('tedious').Connection;
		var Request = require('tedious').Request;
		let code = req.query.quiz_code;
		let jsonArray = [];
		res.header('Access-Control-Allow-Origin', '*');
		const connection = new Connection(connectToAzure());
		connection.on('connect', function (err) {
			if (err) {
				console.log(err);
			} else {
				queryDatabase();
			}
		});
		connection.connect();
		const queryDatabase = function () {
			console.log('Reading rows from the Table...');
			// Read all rows from table
			const request = new Request(
				"SELECT TOP 1 id FROM vw_quizes where quiz_code='" + code + "'",
				function (err, rowCount, rows) {
					console.log(rowCount + ' row(s) returned');
					res.json(jsonArray);
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
		};
	});

	app.put('/quiz/registernew', (req, res) => {
		var Connection = require('tedious').Connection;
		var Request = require('tedious').Request;
		let code = '';
		res.header('Access-Control-Allow-Origin', '*');

		//Depends on the passed category like ?category[]=1&category[]=3
		let categories = req.query.category;
		let categorySQL = [];

		let numQuest = 10
		if (typeof req.query.numQuest !== "undefined") numQuest = req.query.numQuest
		let type = "NO TIME"
		if (typeof req.query.gameType !== "undefined") type = req.query.gameType

		const connection = new Connection(connectToAzureWriter());
		connection.on('connect', function (err) {
			if (err) {
				console.log(err);
			} else {
				console.log('Connected');
				connection.beginTransaction(function (err) {
					if (err) {
						connection.rollbackTransaction(function (err) {
							console.log(err);
							console.log('Rolling back transaction');
						});
					} else {
						console.log('Executing insert, fetching code');
						insertQuizReturnCode();
					}
					console.log('Finalized Transaction');
				}, 'add_quiz');
			}
		});

		connection.connect();
		console.log('Sending Request');

		const insertQuizReturnCode = function () {
			console.log('Inserting and reading code from the Table...');
			// Read all rows from table
			let quiz_id = undefined;
			const request = new Request(
				`
                INSERT INTO quizes (created_when,created_by,question_count,quiz_mode)  values (CURRENT_TIMESTAMP,4,${numQuest},'${type}')
                SELECT hashids.encode1(MAX(id)) as code, MAX(id) as Id FROM dbo.quizes
                `,
				function (err, rowCount, rows) {
					console.log(rowCount + ' row(s) returned');
					res.json(code);
					typeof err === 'undefined'
						? console.log('Successfully inserted quiz and returned quiz code')
						: console.log(err);
				}
			);

			request.on('row', function (columns) {
				let json = {};
				columns.forEach(function (column) {
					if (column.metadata.colName == 'code') {
						json[column.metadata.colName] = column.value;
					} else if (column.metadata.colName == 'Id') {
						quiz_id = column.value;
						console.log('quizid = ' + quiz_id);
					}
				});
				code = json;
			});

			connection.execSql(request);
			request.on('requestCompleted', function () {
				console.log('Request completed setting assigning questionsToQuiz');
				selectQuestionsForQuiz(quiz_id);
			});

			connection.on('end', function () {
				console.log('Ending connection');
			});
		};

		const selectQuestionsForQuiz = function (quiz_id) {
			console.log(`Reading random ${numQuest} rows from the Table...`);
			let sqlQuery = '';
			let jsonArray = [];

			// Read all rows from table
			if (typeof req.query.category === 'undefined') {
				console.log('Categories were not selected');
				sqlQuery = `SELECT TOP ${numQuest} id FROM questions ORDER BY NEWID()`;
			} else {
				console.log('Categories were selected');
				categories.forEach((category) => {
					categorySQL.push(category);
				});
				sqlQuery =
					`SELECT TOP ${numQuest} id FROM questions where category_id in (` +
					categorySQL.join(',') +
					') ORDER BY NEWID()';
			}
			console.log(sqlQuery);

			const request = new Request(sqlQuery, function (err, rowCount, rows) {
				console.log(rowCount + ' row(s) returned');
				typeof err === 'undefined'
					? console.log(`Successfully fetched ${numQuest} random questions`)
					: console.log(err);
			});
			request.on('row', function (columns) {
				var jsonRow = {};
				columns.forEach(function (column) {
					jsonRow[column.metadata.colName] = column.value;
				});
				jsonArray.push(jsonRow);
			});
			request.on('requestCompleted', function () {
				console.log('Request completed populating bridge table...');
				// console.log(jsonArray)
				populateBridgeTable(quiz_id, jsonArray);
				jsonArray = [];
			});
			connection.execSql(request);
		};
		const populateBridgeTable = function (quiz_id, question_ids) {
			let arrayIds = [];
			question_ids.forEach((id) => {
				arrayIds.push('(' + quiz_id + ', ' + id.id + ')');
			});
			question_ids = undefined;
			console.log(arrayIds);
			let sqlQuery =
				'INSERT INTO [dbo].[quiz_questions_bridge] (quiz_id, question_id) VALUES ';
			sqlQuery += arrayIds.join(',');
			// console.log(sqlQuery)
			const request = new Request(sqlQuery, function (err, rowCount, rows) {
				console.log(rowCount + ' row(s) returned');
				typeof err === 'undefined'
					? console.log('Successfully inserted assignemnt data to database')
					: console.log(err);
				connection.commitTransaction(function (error) {
					console.log('Trying to close connection');
					typeof error === 'undefined'
						? connection.close()
						: console.log('error' + error);
				});
			});

			console.log('Executing request');
			connection.execSql(request);
		};
	});
}
