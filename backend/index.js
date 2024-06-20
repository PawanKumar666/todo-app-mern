const express = require("express");
const todoSchema = require("./types");
const TodoModel = require("./models");

const app = express();

app.use(express.json());

app.get("/todos", async (req, res) => {
  const todos = await TodoModel.find({});
  res.status(200).send(todos);
});

app.post("/todo", async (req, res) => {
  const todoBody = todoSchema.safeParse(req.body);
  if (!todoBody.success) return res.status(500).send({ success: false });
  await TodoModel.create({
    title: todoBody.data.title,
    description: todoBody.data.description,
    completed: todoBody.data.completed,
  });
  res
    .status(200)
    .json({ success: true, message: "Todo created successfully!" });
});

app.post("/todo/:id", async (req, res) => {
  const id = req.params.id;
  // Check whether given id is present in table
  const todo = await TodoModel.findById({ _id: id });
  if (!todo) return res.status(500).message("Todo not found!");
  const updatedBody = todoSchema.safeParse(req.body);
  if (!updatedBody.success) return res.status(500).message("Data is invalid");
  await TodoModel.updateOne(
    { _id: id },
    {
      title: updatedBody.data.title,
      description: updatedBody.data.description,
      completed: updatedBody.data.completed,
    }
  );
  return res.status(200).message("Todo updated successfully!");
});

app.delete("/todo/:id", async (req, res) => {
  const id = req.params.id;
  // Check whether given id is present in table
  const targetTodo = await TodoModel.findById({ _id: id });
  if (!targetTodo) return res.status(500).message("Todo not found!");
  await TodoModel.deleteOne({ _id: id });
  return res.status(200).message("Todo deleted successfully!");
});

function errorHandlerMiddleware(err, req, res, next) {
  console.log(`Error : ${err}`);
  return res.status(500).message(err);
}
app.use(errorHandlerMiddleware);

module.exports = app;
