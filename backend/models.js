const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOOSE_URL);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

const todoModelSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  completed: { type: Boolean, default: false },
});
const todoModel = mongoose.model("todos", todoModelSchema);

module.exports = { todoModel };
