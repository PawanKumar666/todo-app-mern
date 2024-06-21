const zod = require("zod");

const todoSchema = zod.object({
  title: zod.string().min(3).max(50),
  description: zod.string(),
  // completed: zod.boolean(),
});

module.exports = { todoSchema };
