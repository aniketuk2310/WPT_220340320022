
const express = require('express');
const app = express();


let dbparams = {
	host: "localhost",
	user: "root",
	database: "wpt",
	password: "cdac",
	port: 3306
}

const mysql = require("mysql2");
const connection = mysql.createConnection(dbparams);

app.use(express.static('abc'));


app.get("/getInfo", (req, res) => {
	console.log("running");
	let id = req.query.id;
	let output = { status: false, id: "", name: "", price: "" };
	connection.query("select name,price from books where id = ?", [id],
		(error, rows) => {
			if (error) {
				console.log(error);
			} else if (rows.length > 0) {
				console.log(rows);
				output.status = true;
				output.id = rows[0].id;
				output.name = rows[0].name;
				output.price = rows[0].price;
			}
			res.send(output);
		}
	)
});

app.get("/updateInfo", (req, res) => {
	console.log("running");
	let id = req.query.id;
	let price = req.query.price;
	let output = { status: false };
	connection.query("update books set price = ? where id = ?", [price, id],
		(error, rows) => {
			if (error) {
				console.log(error);
			} else if (rows.affectedRows > 0) {
				console.log(rows);
				output.status = true;
			}
			res.send(output);
		}
	)
});


app.listen(8081,()=>{
	console.log("server listening at port 8081...");
});

/*
select * from books;
+----+------+-------+
| id | name | price |
+----+------+-------+
|  1 | abc  |    50 |
|  2 | xyz  |   100 |
|  3 | pqr  |   150 |
+----+------+-------+
*/