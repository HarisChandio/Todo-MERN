const mongoose = require("mongoose");
require("dotenv").config();

try {
  mongoose.connect(process.env.DB_URL).then(() => {
    console.log("connected to mongo db");
  });
} catch (e) {
  console.log(e.errors);
}

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: {type: Boolean, default: false},
});

const Todo = mongoose.model("todos", todoSchema);

module.exports = Todo;
