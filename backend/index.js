  const express = require("express");
  const app = express();
  const cors = require("cors");
  app.use(express.json());
  app.use(cors())
  const { createTodo, updateTodo } = require("./types");
  const Todo = require("./db/db");

  //create a todo
  app.post("/todo", async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if (!parsedPayload.success) {
      res.status(411).json({
        msg: "wrong inputs",
      });
      return;
    }
    try {
      await Todo.create(parsedPayload.data);
      res.status(200).json({
        msg: "todo created",
        todo: parsedPayload.data.title,
      });
      console.log("created a todo");
    } catch (e) {
      res.status(500).json("couldnt ");
    }
  });

  //get todo
  app.get("/todos", async (req, res) => {
    try {
      const todos = await Todo.find({});
      res.status(200).json({
        todos: todos,
      });
      console.log(todos)
    } catch (error) {
      console.log(e.errors);
      res.status(500).send("server error");
    }
  });

  //mark a todo
  app.put("/completed", async (req, res) => {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if (!parsedPayload.success) {
      res.status(411).json({
        msg: "Incorrect Inputs",
      });
      
      return;
    }
    try {
      console.log(req.body.id);
      const todo = await Todo.updateOne(
        { _id: req.body.id },
        {
          $set: {
            completed: true,
          },
        }
      );
      res.status(200).json({
        msg: "Todo is marked completed",
      });
      console.log("todo makred")
      return;
    } catch (e) {
      res.status(500).json({
        msg: "server error",
      });
      console.log(e);
    }
  });

  app.listen(3000);
