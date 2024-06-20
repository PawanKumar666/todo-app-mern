const mongoose = require("mongoose");

mongoose.connect("your_mongo_url");

const TodoModelSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  completed: { type: Boolean, default: false, required: true },
});
const TodoModel = mongoose.model("Todos", TodoModelSchema);

module.exports = { TodoModel };
