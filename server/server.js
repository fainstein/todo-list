const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./db");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  const ITEM_QUERY = `SELECT * FROM u206558025_todoclient.items`;
  connection.query(ITEM_QUERY, (err, response) => {
    if (err) {
      console.log(err);
    } else {
      res.send(response);
    }
  });
});

app.put("/completeItem", (req, res) => {
  const COMPLETE_QUERY = `UPDATE u206558025_todoclient.items SET completed = ${
    req.body.completed ? 1 : 0
  } WHERE item_id = ${req.body.id};`;
  connection.query(COMPLETE_QUERY, (err, response) => {
    if (err) {
      console.log(err);
    } 
  });
});

app.put("/editItem", (req, res) => {
  console.log(req.body);
  const EDIT_QUERY = `UPDATE u206558025_todoclient.items SET name = '${req.body.name}' WHERE item_id = ${req.body.id};`;
  connection.query(EDIT_QUERY, (err, response) => {
    if (err) {
      console.log(err);
    } 
  });
});

app.post("/addItem", (req, res) => {
  const ADD_QUERY = `INSERT INTO u206558025_todoclient.items (name, completed) VALUES ('${req.body.item}', '0')`;
  connection.query(ADD_QUERY, (err) => {
    if (err) {
      console.log(err);
    }
  });
});

app.post("/deleteItem", (req, res) => {
  const DELETE_QUERY = `DELETE FROM u206558025_todoclient.items WHERE item_id = ${req.body.id}`;
  connection.query(DELETE_QUERY, (err) => {
    if (err) {
      console.log(err);
    }
  });
});

app.listen(4000, () => {
  console.log("Server successfully running on port 4000");
});
