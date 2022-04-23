const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./db");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// LIST FOLDER METHODS (PHASE 2)

app.get("/", (req, res) => {
  const LISTS_QUERY = `SELECT * FROM u206558025_todoclient.lists`;
  connection.query(LISTS_QUERY, (err, response) => {
    if (err) {
      console.log(err);
    } else {
      res.send(response);
    }
  });
});

app.post("/deleteList", (req, res) => {
  const DELETE_LIST_QUERY = `DELETE FROM u206558025_todoclient.lists WHERE list_id = ${req.body.id}`;
  connection.query(DELETE_LIST_QUERY, (err) => {
    if (err) {
      console.log(err);
    }
  });
  const DELETE_ALL_ITEMS_QUERY = `DELETE FROM u206558025_todoclient.items WHERE list_id = ${req.body.id}`;
  connection.query(DELETE_ALL_ITEMS_QUERY, (err) => {
    if (err) {
      console.log(err);
    }
  });
});

app.post("/addList", (req, res) => {
  const ADD_QUERY = `INSERT INTO u206558025_todoclient.lists (name) VALUES ('${req.body.list}')`;
  connection.query(ADD_QUERY, (err) => {
    if (err) {
      console.log(err);
    }
  });
});

// SINGLE LIST METHODS (PHASE 1)

app.get("/getList", (req, res) => {
  const ITEM_QUERY = `SELECT * FROM u206558025_todoclient.items WHERE list_id = '${req.query.id}'`;
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
  const EDIT_QUERY = `UPDATE u206558025_todoclient.items SET name = '${req.body.name}' WHERE item_id = ${req.body.id};`;
  connection.query(EDIT_QUERY, (err, response) => {
    if (err) {
      console.log(err);
    }
  });
});

app.post("/addItem", (req, res) => {
  const ADD_QUERY = `INSERT INTO u206558025_todoclient.items (name, completed, list_id) VALUES ('${req.body.item}', '0', '${req.body.listId}')`;
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
