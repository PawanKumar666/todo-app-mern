require("dotenv").config(); // Loads env variables

const express = require("express");
const { todoSchema } = require("./types");
const { todoModel } = require("./models");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors()); // Very insecure

app.get("/todos", async (req, res) => {
  const todos = await todoModel.find({});
  res.status(200).send(todos);
});

app.post("/todo", async (req, res) => {
  const todoBody = todoSchema.safeParse(req.body);
  if (!todoBody.success) return res.status(500).send({ success: false });
  await todoModel.create({
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
  console.log("id", id)
  // Check whether given id is present in table
  const todo = await todoModel.findById({ _id: id });
  if (!todo) return res.status(500).send("Todo not found!");
  console.log("req.body", req.body)
  const updatedBody = todoSchema.safeParse(req.body);
  if (!updatedBody.success) return res.status(500).send(updatedBody);
  console.log("updateBody", updatedBody)
  await todoModel.updateOne(
    { _id: id },
    {
      title: updatedBody.data.title,
      description: updatedBody.data.description,
      completed: updatedBody.data.completed,
    }
  );
  return res.status(200).send({"message": "Todo updated successfully!"});
});

app.delete("/todo/:id", async (req, res) => {
  const id = req.params.id;
  // Check whether given id is present in table
  const targetTodo = await todoModel.findById({ _id: id });
  if (!targetTodo) return res.status(500).send("Todo not found!");
  await todoModel.deleteOne({ _id: id });
  return res.status(200).send("Todo deleted successfully!");
});

function errorHandlerMiddleware(err, req, res, next) {
  console.log(`Error : ${err}`);
  return res.status(500).send(err);
}
app.use(errorHandlerMiddleware);

app.listen(3000, () => {
  console.log(`Server started on port 3000!`);
});
